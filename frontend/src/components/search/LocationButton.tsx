import { LocateFixed, Loader2 } from "lucide-react";

interface LocationButtonProps {
  onClick: () => void;
  loading: boolean;
}

export function LocationButton({ onClick, loading }: LocationButtonProps) {
  return (
    <button
      data-testid="button-geolocate"
      onClick={onClick}
      disabled={loading}
      className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-200 font-medium py-2.5 px-4 rounded-xl transition-all duration-200 text-sm border border-slate-600 hover:border-slate-500 whitespace-nowrap"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <LocateFixed className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />
      )}
      <span className="hidden sm:inline">{loading ? "Locating…" : "My Location"}</span>
    </button>
  );
}
