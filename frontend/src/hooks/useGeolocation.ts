import { useState, useCallback } from "react";
import { GeoLocation } from "@/types";

interface GeolocationState {
  location: GeoLocation | null;
  loading: boolean;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    loading: false,
    error: null,
  });

  const getLocation = useCallback((): Promise<GeoLocation> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const err = "Geolocation is not supported by your browser.";
        setState((prev) => ({ ...prev, error: err }));
        reject(new Error(err));
        return;
      }

      setState({ location: null, loading: true, error: null });

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc: GeoLocation = {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            name: "My Location",
            country: "",
          };
          setState({ location: loc, loading: false, error: null });
          resolve(loc);
        },
        (err) => {
          let message: string;
          switch (err.code) {
            case err.PERMISSION_DENIED:
              message = "Location access denied. Please allow location or search manually.";
              break;
            case err.POSITION_UNAVAILABLE:
              message = "Location unavailable. Please search manually.";
              break;
            case err.TIMEOUT:
              message = "Location request timed out. Please try again.";
              break;
            default:
              message = "Failed to get location.";
          }
          setState({ location: null, loading: false, error: message });
          reject(new Error(message));
        }
      );
    });
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return { ...state, getLocation, clearError };
}
