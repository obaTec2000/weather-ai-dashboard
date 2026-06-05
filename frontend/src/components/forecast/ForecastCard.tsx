import { WeatherIcon } from "@/components/weather/WeatherIcon";
import { TemperatureUnit } from "@/types";
import { formatTemperatureShort } from "@/utils/temperature";

interface ForecastCardProps {
  date: string;
  day: string;
  high: number;
  low: number;
  condition: string;
  unit: TemperatureUnit;
  index: number;
}

export function ForecastCard({ day, high, low, condition, unit, index }: ForecastCardProps) {
  const isToday = index === 0;

  return (
    <div
      data-testid={`card-forecast-${index}`}
      className="group flex flex-col items-center gap-3 bg-slate-800/60 backdrop-blur-md rounded-2xl p-4 border border-slate-700/60 hover:border-cyan-500/30 hover:bg-slate-700/50 transition-all duration-200 hover:scale-[1.03] cursor-default shadow-lg"
    >
      <span
        className={`text-xs font-semibold uppercase tracking-wider ${
          isToday ? "text-cyan-400" : "text-slate-400"
        }`}
      >
        {isToday ? "Today" : day}
      </span>

      <div className="p-3 rounded-xl bg-slate-700/50 group-hover:bg-slate-600/50 transition-colors">
        <WeatherIcon
          condition={condition}
          size={28}
          className={`${isToday ? "text-cyan-300" : "text-slate-300"} transition-colors`}
        />
      </div>

      <p className="text-xs text-slate-500 text-center line-clamp-1 w-full">{condition}</p>

      <div className="flex items-center gap-2 mt-auto">
        <span
          data-testid={`text-forecast-high-${index}`}
          className="text-white font-bold text-sm"
        >
          {formatTemperatureShort(high, unit)}
        </span>
        <span className="w-px h-3 bg-slate-600" />
        <span
          data-testid={`text-forecast-low-${index}`}
          className="text-slate-400 text-sm"
        >
          {formatTemperatureShort(low, unit)}
        </span>
      </div>
    </div>
  );
}
