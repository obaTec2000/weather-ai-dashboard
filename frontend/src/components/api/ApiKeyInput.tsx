import { useState } from "react";
import { Eye, EyeOff, Save, CheckCircle2, XCircle } from "lucide-react";

interface ApiKeyInputProps {
  apiKey: string;
  onSaveKey: (key: string) => void;
}

export function ApiKeyInput({ apiKey, onSaveKey }: ApiKeyInputProps) {
  const [inputValue, setInputValue] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  const isActive = apiKey.length > 0;

  const handleSave = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onSaveKey(trimmed);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
  };

  return (
    <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
      <div
        data-testid="status-api-key"
        className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border shrink-0 ${
          isActive
            ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
            : "text-red-400 bg-red-500/10 border-red-500/20"
        }`}
      >
        {isActive ? (
          <>
            <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} />
            Key Active
          </>
        ) : (
          <>
            <XCircle className="w-3.5 h-3.5" strokeWidth={2} />
            Key Required
          </>
        )}
      </div>

      <div className="relative flex-1 min-w-[200px]">
        <input
          data-testid="input-api-key"
          type={showKey ? "text" : "password"}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="wai_your_api_key_here"
          className="w-full bg-slate-900/60 border border-slate-700 rounded-xl pl-4 pr-10 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
        />
        <button
          data-testid="button-toggle-key-visibility"
          onClick={() => setShowKey((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
          aria-label={showKey ? "Hide key" : "Show key"}
        >
          {showKey ? (
            <EyeOff className="w-4 h-4" strokeWidth={1.5} />
          ) : (
            <Eye className="w-4 h-4" strokeWidth={1.5} />
          )}
        </button>
      </div>

      <button
        data-testid="button-save-key"
        onClick={handleSave}
        className={`flex items-center gap-1.5 text-sm font-semibold py-2 px-4 rounded-xl transition-all duration-200 shrink-0 ${
          saved
            ? "bg-emerald-500 text-white"
            : "bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-600 text-slate-900"
        }`}
      >
        <Save className="w-4 h-4" strokeWidth={2} />
        {saved ? "Saved!" : "Save Key"}
      </button>
    </div>
  );
}
