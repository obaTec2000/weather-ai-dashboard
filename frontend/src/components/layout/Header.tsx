import { CloudSun } from "lucide-react";
import { ApiKeyInput } from "@/components/api/ApiKeyInput";

interface HeaderProps {
  apiKey: string;
  onSaveKey: (key: string) => void;
}

export function Header({ apiKey, onSaveKey }: HeaderProps) {
  return (
    <header className="w-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="flex items-center gap-3 shrink-0">
          <div className="p-2.5 rounded-2xl bg-cyan-500/12 border border-cyan-500/20">
            <CloudSun className="w-7 h-7 text-cyan-400" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight leading-tight">
              Weather-AI Dashboard
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Real-time forecasts &amp; Gemini AI insights
            </p>
          </div>
        </div>

        <ApiKeyInput apiKey={apiKey} onSaveKey={onSaveKey} />
      </div>
    </header>
  );
}
