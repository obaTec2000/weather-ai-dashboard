import { useState, useCallback } from "react";
import { WeatherData } from "@/types";
import { fetchWeather } from "@/services/weatherApi";

interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

export function useWeather(apiKey: string) {
  const [state, setState] = useState<WeatherState>({
    data: null,
    loading: false,
    error: null,
  });

  const load = useCallback(
    async (lat: number, lon: number, retryCount = 0) => {
      if (!apiKey) {
        setState((prev) => ({
          ...prev,
          error: "API key is required. Please enter your Weather-AI API key.",
        }));
        return;
      }

      setState({ data: null, loading: true, error: null });

      try {
        const data = await fetchWeather(lat, lon, apiKey);
        setState({ data, loading: false, error: null });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An unexpected error occurred.";

        const isRetryable =
          !message.includes("Invalid API key") &&
          !message.includes("quota exceeded") &&
          !message.includes("Invalid coordinates");

        if (retryCount < 2 && isRetryable) {
          setTimeout(() => load(lat, lon, retryCount + 1), 2000 * (retryCount + 1));
          return;
        }

        setState({ data: null, loading: false, error: message });
      }
    },
    [apiKey]
  );

  const retry = useCallback(
    (lat: number, lon: number) => load(lat, lon),
    [load]
  );

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return { data: state.data, loading: state.loading, error: state.error, load, retry, clearError };
}
