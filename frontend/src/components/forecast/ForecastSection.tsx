import { CalendarDays } from "lucide-react";
import { ForecastCard } from "./ForecastCard";
import { WeatherForecast, TemperatureUnit } from "@/types";

interface ForecastSectionProps {
  forecast: WeatherForecast;
  unit: TemperatureUnit;
}

export function ForecastSection({ forecast, unit }: ForecastSectionProps) {
  const days = forecast.daily.slice(0, 5);

  if (days.length === 0) return null;

  return (
    <div data-testid="section-forecast">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-widest">
          5-Day Forecast
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {days.map((day, i) => (
          <ForecastCard
            key={day.date || i}
            date={day.date}
            day={day.day}
            high={day.high}
            low={day.low}
            condition={day.condition}
            unit={unit}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
