import { AlertCircle, RefreshCw, KeyRound, ZapOff } from "lucide-react";

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
}

type AlertVariant = "auth" | "quota" | "error";

function getVariant(message: string): AlertVariant {
  if (message.includes("Invalid API key")) return "auth";
  if (message.includes("quota exceeded")) return "quota";
  return "error";
}

const variantStyles: Record<AlertVariant, { bg: string; border: string; text: string; icon: string }> = {
  auth: {
    bg: "bg-amber-500/8",
    border: "border-amber-500/25",
    text: "text-amber-300",
    icon: "text-amber-400",
  },
  quota: {
    bg: "bg-violet-500/8",
    border: "border-violet-500/25",
    text: "text-violet-300",
    icon: "text-violet-400",
  },
  error: {
    bg: "bg-red-500/8",
    border: "border-red-500/25",
    text: "text-red-300",
    icon: "text-red-400",
  },
};

const variantIcons: Record<AlertVariant, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  auth: KeyRound,
  quota: ZapOff,
  error: AlertCircle,
};

export function ErrorAlert({ message, onRetry }: ErrorAlertProps) {
  const variant = getVariant(message);
  const styles = variantStyles[variant];
  const Icon = variantIcons[variant];
  const showRetry = onRetry && variant === "error";

  return (
    <div
      data-testid="error-alert"
      className={`flex items-start gap-3 p-4 rounded-2xl border ${styles.bg} ${styles.border}`}
    >
      <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${styles.icon}`} strokeWidth={1.5} />
      <p className={`flex-1 text-sm font-medium ${styles.text}`}>{message}</p>
      {showRetry && (
        <button
          data-testid="button-retry"
          onClick={onRetry}
          className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-700/80 hover:bg-slate-600 px-3 py-1.5 rounded-lg transition-colors shrink-0 border border-slate-600"
        >
          <RefreshCw className="w-3 h-3" strokeWidth={2} />
          Retry
        </button>
      )}
    </div>
  );
}
