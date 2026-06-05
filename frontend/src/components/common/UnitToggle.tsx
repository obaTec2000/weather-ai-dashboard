import { TemperatureUnit } from "@/types";

interface UnitToggleProps {
  unit: TemperatureUnit;
  onToggle: () => void;
}

export function UnitToggle({ unit, onToggle }: UnitToggleProps) {
  return (
    <button
      data-testid="button-unit-toggle"
      onClick={onToggle}
      className="flex items-center gap-0 bg-slate-700/70 border border-slate-600/60 rounded-xl overflow-hidden text-sm font-semibold transition-all hover:border-cyan-500/40 mb-2"
      aria-label="Toggle temperature unit"
    >
      <span
        className={`px-3 py-1.5 transition-colors ${
          unit === "metric"
            ? "bg-cyan-500 text-slate-900"
            : "text-slate-400 hover:text-slate-200"
        }`}
      >
        °C
      </span>
      <span
        className={`px-3 py-1.5 transition-colors ${
          unit === "imperial"
            ? "bg-cyan-500 text-slate-900"
            : "text-slate-400 hover:text-slate-200"
        }`}
      >
        °F
      </span>
    </button>
  );
}
