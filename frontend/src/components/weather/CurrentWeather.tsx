import { MapPin } from "lucide-react";
import { WeatherData, TemperatureUnit } from "@/types";
import { WeatherTheme } from "@/utils/weatherTheme";
import { WeatherIcon } from "./WeatherIcon";
import { WeatherStats } from "./WeatherStats";
import { UnitToggle } from "@/components/common/UnitToggle";
import { formatTemperature } from "@/utils/temperature";
import { formatFullDate } from "@/utils/helpers";

interface CurrentWeatherProps {
  data: WeatherData;
  unit: TemperatureUnit;
  onToggleUnit: () => void;
  theme: WeatherTheme;
}

export function CurrentWeather({ data, unit, onToggleUnit, theme }: CurrentWeatherProps) {
  const { current, location } = data;

  return (
    <div
      data-testid="card-current-weather"
      className="relative overflow-hidden backdrop-blur-md rounded-3xl p-7 shadow-2xl transition-all duration-700"
      style={{
        background: theme.cardGradient,
        border: `1px solid ${theme.cardBorder}`,
      }}
    >
      {/* Decorative glow orbs — dynamic per theme */}
      <div
        className="absolute -top-12 -right-12 w-52 h-52 rounded-full blur-3xl pointer-events-none transition-colors duration-700"
        style={{ background: theme.glow1 }}
      />
      <div
        className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-colors duration-700"
        style={{ background: theme.glow2 }}
      />

      <div className="relative flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Left — temperature block */}
        <div className="flex-1">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
            <MapPin className="w-3.5 h-3.5" strokeWidth={2} style={{ color: theme.iconColor }} />
            <span data-testid="text-location-name" className="font-medium">
              {location.name}
              {location.country ? `, ${location.country}` : ""}
            </span>
          </div>

          <div className="flex items-end gap-4 flex-wrap">
            <span
              data-testid="text-temperature"
              className="text-[72px] font-bold text-white leading-none tracking-tight"
            >
              {formatTemperature(current.temperature, unit)}
            </span>
            <UnitToggle unit={unit} onToggle={onToggleUnit} />
          </div>

          <p
            data-testid="text-condition"
            className="text-xl text-slate-300 mt-2 font-medium"
          >
            {current.condition}
          </p>
          <p className="text-slate-500 text-sm mt-1">{formatFullDate()}</p>
        </div>

        {/* Right — weather icon */}
        <div className="flex items-center justify-center sm:justify-end">
          <div
            className="p-5 rounded-2xl transition-colors duration-700"
            style={{
              background: theme.iconBg,
              border: `1px solid ${theme.iconBorder}`,
            }}
          >
            <WeatherIcon
              condition={current.condition}
              size={64}
              className="transition-colors duration-700"
              style={{ color: theme.iconColor }}
            />
          </div>
        </div>
      </div>

      <WeatherStats
        humidity={current.humidity}
        wind_speed={current.wind_speed}
        feels_like={current.feels_like}
        unit={unit}
        statBg={theme.statBg}
        accentColor={theme.iconColor}
      />
    </div>
  );
}
