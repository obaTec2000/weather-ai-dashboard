import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div
      data-testid="loading-spinner"
      className="flex flex-col items-center justify-center py-24 gap-4"
    >
      <div className="relative">
        <div className="w-14 h-14 rounded-full border-2 border-slate-700" />
        <Loader2 className="w-14 h-14 animate-spin text-cyan-400 absolute inset-0" strokeWidth={1.5} />
      </div>
      <div className="text-center">
        <p className="text-slate-300 text-sm font-medium">Fetching weather data</p>
        <p className="text-slate-500 text-xs mt-1">Powered by Weather-AI</p>
      </div>
    </div>
  );
}
