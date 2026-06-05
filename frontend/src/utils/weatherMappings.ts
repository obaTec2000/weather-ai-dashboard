export type WeatherIconKey =
  | "sun"
  | "cloud-sun"
  | "cloud"
  | "cloud-rain"
  | "cloud-drizzle"
  | "cloud-lightning"
  | "cloud-snow"
  | "cloud-fog"
  | "wind"
  | "default";

export function conditionToIconKey(condition: string): WeatherIconKey {
  const c = condition.toLowerCase();

  if (c.includes("thunder") || c.includes("storm") || c.includes("lightning")) {
    return "cloud-lightning";
  }
  if (c.includes("blizzard") || c.includes("snow") || c.includes("sleet") || c.includes("flurr")) {
    return "cloud-snow";
  }
  if (c.includes("heavy rain") || c.includes("downpour") || c.includes("shower")) {
    return "cloud-rain";
  }
  if (c.includes("drizzle") || c.includes("light rain") || c.includes("sprinkle")) {
    return "cloud-drizzle";
  }
  if (c.includes("rain")) {
    return "cloud-rain";
  }
  if (c.includes("fog") || c.includes("mist") || c.includes("haze") || c.includes("smoke")) {
    return "cloud-fog";
  }
  if (c.includes("overcast")) {
    return "cloud";
  }
  if (
    c.includes("partly cloudy") ||
    c.includes("mostly cloudy") ||
    c.includes("partly sunny") ||
    c.includes("broken") ||
    c.includes("scattered")
  ) {
    return "cloud-sun";
  }
  if (c.includes("cloudy")) {
    return "cloud";
  }
  if (c.includes("wind") || c.includes("breezy") || c.includes("gust")) {
    return "wind";
  }
  if (
    c.includes("sunny") ||
    c.includes("clear") ||
    c.includes("fair") ||
    c.includes("bright")
  ) {
    return "sun";
  }

  return "default";
}
