import { WeatherData, WeatherAlert, AlertSeverity } from "@/types";
import { DEFAULT_FORECAST_DAYS } from "@/utils/constants";

type RawRecord = Record<string, unknown>;

export async function fetchWeather(
  lat: number,
  lon: number,
  apiKey: string,
  days: number = DEFAULT_FORECAST_DAYS
): Promise<WeatherData> {
  const params = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    days: days.toString(),
    units: "metric",
    ai: "true",
  });

const response = await fetch(`https://weather-ai-backend-wl9y.onrender.com/api/weather?${params}`, {
      headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    switch (response.status) {
      case 401:
        throw new Error("Invalid API key. Please check and re-enter.");
      case 429:
        throw new Error("Monthly quota exceeded. Try again next month or upgrade plan.");
      case 400:
        throw new Error("Invalid coordinates. Please try a different city.");
      case 500:
      case 503:
        throw new Error("Weather-AI service temporarily unavailable. Please try again.");
      default:
        throw new Error(`Request failed with status ${response.status}.`);
    }
  }

  const raw: RawRecord = await response.json();
  console.log("📡 Weather-AI API Response:", raw);
  return parseWeatherResponse(raw, lat, lon);
}

function normaliseSeverity(raw: unknown): AlertSeverity {
  const s = String(raw ?? "").toLowerCase();
  if (s.includes("extreme") || s.includes("emergency")) return "extreme";
  if (s.includes("warn")) return "warning";
  if (s.includes("watch")) return "watch";
  return "advisory";
}

function parseAlerts(raw: RawRecord): WeatherAlert[] {
  const rawAlerts =
    (raw.alerts as RawRecord[]) ??
    (raw.warnings as RawRecord[]) ??
    (raw.active_alerts as RawRecord[]) ??
    [];

  if (!Array.isArray(rawAlerts)) return [];

  return rawAlerts.slice(0, 5).map((a) => ({
    title: (a.title as string) ?? (a.event as string) ?? (a.type as string) ?? "Weather Alert",
    description:
      (a.description as string) ?? (a.detail as string) ?? (a.text as string) ?? "",
    severity: normaliseSeverity(
      (a.severity as string) ?? (a.level as string) ?? (a.type as string)
    ),
    type: (a.type as string) ?? undefined,
    expires: (a.expires as string) ?? (a.end as string) ?? undefined,
  }));
}

function getWeatherDescription(conditionCode: string): string {
  const conditionMap: Record<string, string> = {
    "0": "Clear Sky",
    "1": "Mainly Clear", 
    "2": "Partly Cloudy",
    "3": "Overcast",
    "45": "Foggy",
    "51": "Light Drizzle",
    "53": "Moderate Drizzle",
    "55": "Heavy Drizzle",
    "61": "Light Rain",
    "63": "Moderate Rain",
    "65": "Heavy Rain",
    "80": "Light Showers",
    "81": "Moderate Showers",
    "82": "Heavy Showers",
    "95": "Thunderstorm",
  };
  return conditionMap[conditionCode] || "Partly Cloudy";
}

function parseWeatherResponse(raw: RawRecord, lat: number, lon: number): WeatherData {
  // Extract data from the API response
  const current = (raw.current as RawRecord) ?? {};
  const dailyArray = (raw.daily as RawRecord[]) ?? [];
  const ai = (raw.ai as RawRecord) ?? {};
  const locationData = (raw.location as RawRecord) ?? {};
  
  // Current weather - using actual fields from your API response
  const temperature = (current.temperature as number) ?? 0;
  const windSpeed = (current.wind_speed as number) ?? 0;
  const conditionCode = String((current.condition_code as string) ?? "2");
  const condition = getWeatherDescription(conditionCode);
  
  // Location info - API doesn't provide city name, so use coordinates
  const country = (locationData.country as string) ?? "";
  const latFixed = Math.abs(lat).toFixed(2);
  const lonFixed = Math.abs(lon).toFixed(2);
  const latDir = lat >= 0 ? 'N' : 'S';
  const lonDir = lon >= 0 ? 'E' : 'W';
  const locationName = `${latFixed}°${latDir}, ${lonFixed}°${lonDir}`;
  
  // Default values for missing data
  const humidity = 65; // Default humidity since API doesn't provide it
  const feelsLike = temperature; // Use temperature as feels-like

  // Parse 5-day forecast
  const forecastDays = dailyArray.slice(0, 5).map((day) => {
    const dateStr = (day.date as string) ?? "";
    const date = new Date(dateStr);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const dayConditionCode = String((day.condition_code as string) ?? "2");
    
    return {
      date: dateStr,
      day: dayName,
      high: Math.round((day.temp_max as number) ?? 0),
      low: Math.round((day.temp_min as number) ?? 0),
      condition: getWeatherDescription(dayConditionCode),
      precipitationChance: (day.precipitation_probability as number) ?? 0,
    };
  });

  // Get or generate AI summary
  let aiSummary = (ai.summary as string) ?? "";
  if (!aiSummary) {
    const today = forecastDays[0];
    if (today.precipitationChance > 70) {
      aiSummary = `⚠️ High chance of rain today (${today.precipitationChance}%). Consider carrying an umbrella.`;
    } else if (temperature > 30) {
      aiSummary = `☀️ Hot conditions with ${Math.round(temperature)}°C. Stay hydrated and avoid midday sun.`;
    } else {
      aiSummary = `🌤️ ${condition} with temperatures around ${Math.round(temperature)}°C. Pleasant weather conditions.`;
    }
  }

  return {
    current: {
      temperature: Math.round(temperature),
      condition: condition,
      humidity: humidity,
      wind_speed: Math.round(windSpeed),
      feels_like: Math.round(feelsLike),
      uv_index: undefined,
      visibility: undefined,
      pressure: undefined,
      icon: current.icon as string | undefined,
    },
    forecast: {
      daily: forecastDays,
    },
    ai: {
      summary: aiSummary,
    },
    location: {
      name: locationName,
      country: country,
      lat: lat,
      lon: lon,
    },
    alerts: parseAlerts(raw),
  };
}