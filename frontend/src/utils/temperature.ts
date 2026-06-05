import { TemperatureUnit } from "@/types";

export function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9) / 5 + 32);
}

export function fahrenheitToCelsius(fahrenheit: number): number {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}

export function formatTemperature(celsius: number, unit: TemperatureUnit): string {
  if (unit === "imperial") {
    return `${celsiusToFahrenheit(celsius)}°F`;
  }
  return `${celsius}°C`;
}

export function formatTemperatureShort(celsius: number, unit: TemperatureUnit): string {
  if (unit === "imperial") {
    return `${celsiusToFahrenheit(celsius)}°`;
  }
  return `${celsius}°`;
}

export function formatWindSpeed(kmh: number, unit: TemperatureUnit): string {
  if (unit === "imperial") {
    return `${Math.round(kmh * 0.621371)} mph`;
  }
  return `${kmh} km/h`;
}
