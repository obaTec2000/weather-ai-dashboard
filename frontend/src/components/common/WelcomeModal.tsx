import { useState, useEffect } from 'react';
import { Key, ExternalLink, X, AlertCircle } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveKey: (key: string) => void;
  hasKey: boolean;
}

export function WelcomeModal({ isOpen, onClose, onSaveKey, hasKey }: WelcomeModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Don't show modal if user already has a key
  useEffect(() => {
    if (hasKey && isOpen) {
      onClose();
    }
  }, [hasKey, isOpen, onClose]);

  if (!isOpen) return null;

  const handleSaveKey = async () => {
    if (!apiKey.trim()) {
      setError('Please enter your API key');
      return;
    }

    if (!apiKey.startsWith('wai_')) {
      setError('Invalid API key format. Key should start with "wai_"');
      return;
    }

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      onSaveKey(apiKey);
      setIsLoading(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-800 rounded-2xl max-w-md w-full shadow-2xl border border-slate-700 overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500/20 to-violet-500/20 p-6 border-b border-slate-700">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="bg-cyan-500/20 p-2 rounded-xl">
                <Key className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Welcome to WeatherAI-Dashboard!</h2>
                <p className="text-slate-400 text-sm mt-1">Real-time weather + AI insights</p>
              </div>
            </div>
            <button
            title={'close'}
              onClick={onClose}
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-slate-300 mb-4">
            To use this dashboard, you'll need a free Weather-AI API key.
          </p>

          <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
            <p className="text-sm text-slate-400 mb-3">How to get your free API key:</p>
            <ol className="text-sm text-slate-300 space-y-2 list-decimal list-inside">
              <li>Go to <a 
                href="https://weather-ai.co" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline inline-flex items-center gap-1"
              >
                weather-ai.co <ExternalLink className="w-3 h-3" />
              </a></li>
              <li>Sign up for a free account</li>
              <li>Navigate to Dashboard → API Keys</li>
              <li>Generate a new key (starts with <code className="bg-slate-700 px-1 py-0.5 rounded text-xs">wai_</code>)</li>
              <li>Copy the key and paste it below</li>
            </ol>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Enter your API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setError('');
                }}
                placeholder="wai_your_api_key_here"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                onKeyDown={(e) => e.key === 'Enter' && handleSaveKey()}
              />
              {error && (
                <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {error}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSaveKey}
                disabled={isLoading}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200"
              >
                {isLoading ? 'Validating...' : 'Save & Continue'}
              </button>
              <button
                onClick={onClose}
                className="px-4 bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium py-3 rounded-xl transition-all duration-200"
              >
                Skip
              </button>
            </div>

            <p className="text-xs text-slate-500 text-center mt-4">
                Free plan includes 1,000 requests/month — enough for testing!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}