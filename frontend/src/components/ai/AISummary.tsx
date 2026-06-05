import { Sparkles } from "lucide-react";

interface AISummaryProps {
  summary: string;
}

export function AISummary({ summary }: AISummaryProps) {
  if (!summary) return null;

  return (
    <div
      data-testid="card-ai-summary"
      className="relative overflow-hidden bg-gradient-to-r from-cyan-500/8 to-violet-500/8 rounded-2xl border border-slate-700/60 shadow-xl"
    >
      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-cyan-400 to-violet-500 rounded-l-2xl" />
      <div className="px-6 py-5 pl-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg bg-violet-500/15 border border-violet-500/20">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          </div>
          <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">
            AI Weather Summary
          </span>
        </div>
        <p
          data-testid="text-ai-summary"
          className="text-slate-200 text-sm leading-relaxed italic"
        >
          {summary}
        </p>
      </div>
    </div>
  );
}
