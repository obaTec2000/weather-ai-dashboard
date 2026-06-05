import { GeoLocation } from "@/types";
import { NOMINATIM_BASE_URL } from "@/utils/constants";

type NominatimResult = {
  lat: string;
  lon: string;
  name: string;
  display_name: string;
};

export async function searchCity(cityName: string): Promise<GeoLocation> {
  const url = `${NOMINATIM_BASE_URL}/search?format=json&q=${encodeURIComponent(cityName)}&limit=1`;

  const response = await fetch(url, {
    headers: {
      "Accept-Language": "en",
      "User-Agent": "WeatherAIDashboard/1.0",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to search for city. Please try again.");
  }

  const data: NominatimResult[] = await response.json();

  if (!data || data.length === 0) {
    throw new Error(`City "${cityName}" not found. Please try a different name.`);
  }

  const result = data[0];
  const parts = result.display_name.split(",");
  const country = parts[parts.length - 1]?.trim() ?? "";

  return {
    lat: parseFloat(result.lat),
    lon: parseFloat(result.lon),
    name: result.name || cityName,
    country,
  };
}
