import { Droplets, Wind, Thermometer } from "lucide-react";
import { TemperatureUnit } from "@/types";
import { formatTemperature, formatWindSpeed } from "@/utils/temperature";

interface WeatherStatsProps {
  humidity: number;
  wind_speed: number;
  feels_like: number;
  unit: TemperatureUnit;
  statBg?: string;
  accentColor?: string;
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  testId: string;
  statBg?: string;
}

function StatItem({ icon, label, value, testId, statBg }: StatItemProps) {
  return (
    <div
      className="flex flex-col gap-2 rounded-2xl p-4 border border-slate-700/40 transition-colors duration-700"
      style={{ background: statBg ?? "rgba(15,23,42,0.40)" }}
    >
      <div className="flex items-center gap-2 text-slate-400">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
      </div>
      <span data-testid={testId} className="text-white font-semibold text-lg">
        {value}
      </span>
    </div>
  );
}

export function WeatherStats({
  humidity,
  wind_speed,
  feels_like,
  unit,
  statBg,
  accentColor = "#22D3EE",
}: WeatherStatsProps) {
  const iconStyle = { color: accentColor };

  return (
    <div className="grid grid-cols-3 gap-3 mt-6">
      <StatItem
        icon={<Droplets className="w-4 h-4 transition-colors duration-700" strokeWidth={1.5} style={iconStyle} />}
        label="Humidity"
        value={`${humidity}%`}
        testId="text-humidity"
        statBg={statBg}
      />
      <StatItem
        icon={<Wind className="w-4 h-4 transition-colors duration-700" strokeWidth={1.5} style={iconStyle} />}
        label="Wind"
        value={formatWindSpeed(wind_speed, unit)}
        testId="text-wind-speed"
        statBg={statBg}
      />
      <StatItem
        icon={<Thermometer className="w-4 h-4 transition-colors duration-700" strokeWidth={1.5} style={iconStyle} />}
        label="Feels Like"
        value={formatTemperature(feels_like, unit)}
        testId="text-feels-like"
        statBg={statBg}
      />
    </div>
  );
}
