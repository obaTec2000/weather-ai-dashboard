export type TemperatureUnit = "metric" | "imperial";
export type AlertSeverity = "advisory" | "watch" | "warning" | "extreme";

export interface CurrentWeather {
  temperature: number;
  condition: string;
  humidity: number;
  wind_speed: number;
  feels_like: number;
  uv_index?: number;
  visibility?: number;
  pressure?: number;
  icon?: string;
}

export interface DailyForecast {
  date: string;
  day: string;
  high: number;
  low: number;
  condition: string;
}

export interface WeatherForecast {
  daily: DailyForecast[];
}

export interface AISummary {
  summary: string;
}

export interface WeatherAlert {
  title: string;
  description: string;
  severity: AlertSeverity;
  type?: string;
  expires?: string;
}

export interface WeatherLocation {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface WeatherData {
  current: CurrentWeather;
  forecast: WeatherForecast;
  ai: AISummary;
  location: WeatherLocation;
  alerts: WeatherAlert[];
}

export interface GeoLocation {
  lat: number;
  lon: number;
  name: string;
  country: string;
}

export interface ApiError {
  status: number;
  message: string;
}
