import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  CloudSnow,
  CloudFog,
  Wind,
} from "lucide-react";
import { CSSProperties } from "react";
import { conditionToIconKey, WeatherIconKey } from "@/utils/weatherMappings";

interface WeatherIconProps {
  condition: string;
  className?: string;
  style?: CSSProperties;
  size?: number;
}

const iconMap: Record<
  WeatherIconKey,
  React.ComponentType<{ className?: string; style?: CSSProperties; size?: number; strokeWidth?: number }>
> = {
  sun: Sun,
  "cloud-sun": CloudSun,
  cloud: Cloud,
  "cloud-rain": CloudRain,
  "cloud-drizzle": CloudDrizzle,
  "cloud-lightning": CloudLightning,
  "cloud-snow": CloudSnow,
  "cloud-fog": CloudFog,
  wind: Wind,
  default: CloudSun,
};

export function WeatherIcon({ condition, className = "", style, size = 24 }: WeatherIconProps) {
  const key = conditionToIconKey(condition);
  const Icon = iconMap[key];
  return <Icon className={className} style={style} size={size} strokeWidth={1.5} />;
}
