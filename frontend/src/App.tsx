import { useState, useCallback, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { SearchBar } from "@/components/search/SearchBar";
import { CurrentWeather } from "@/components/weather/CurrentWeather";
import { AISummary } from "@/components/ai/AISummary";
import { ForecastSection } from "@/components/forecast/ForecastSection";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorAlert } from "@/components/common/ErrorAlert";
import { WelcomeModal } from "@/components/common/WelcomeModal";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useWeather } from "@/hooks/useWeather";
import { useUnitPreference } from "@/hooks/useUnitPreference";
import { getWeatherTheme } from "@/utils/weatherTheme";
import { GeoLocation } from "@/types";
import { API_KEY_STORAGE_KEY } from "@/utils/constants";
import { CloudSun, KeyRound, Search } from "lucide-react";

export default function App() {
  const [apiKey, setApiKey] = useLocalStorage<string>(API_KEY_STORAGE_KEY, "");
  const [currentLocation, setCurrentLocation] = useState<GeoLocation | null>(null);
  const [unit, toggleUnit] = useUnitPreference();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const { data, loading, error, load, clearError } = useWeather(apiKey);

  const theme = getWeatherTheme(data?.current.condition ?? "");

  // Check if we should show the welcome modal
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (!apiKey && !hasSeenWelcome) {
      setShowWelcomeModal(true);
    }
  }, [apiKey]);

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem("hasSeenWelcome", "true");
    setShowWelcomeModal(false);
  };

  const handleCloseModal = () => {
    setShowWelcomeModal(false);
    localStorage.setItem("hasSeenWelcome", "true");
  };

  const handleLocationSelect = useCallback(
    (location: GeoLocation) => {
      setCurrentLocation(location);
      clearError();
      load(location.lat, location.lon);
    },
    [load, clearError]
  );

  const handleRetry = useCallback(() => {
    if (currentLocation) load(currentLocation.lat, currentLocation.lon);
  }, [currentLocation, load]);

  const displayLocation = data?.location
    ? {
        lat: data.location.lat,
        lon: data.location.lon,
        name: data.location.name,
        country: data.location.country,
      }
    : currentLocation;

  const hasSearched = loading || !!data || !!error;

  return (
    <>
      <div className="min-h-screen bg-[#0F172A] relative">
        {/* Subtle dot-grid texture */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Dynamic ambient glow — fades in when weather data is available */}
        <div
          className="fixed inset-0 pointer-events-none transition-all duration-1000"
          style={{ background: data ? theme.ambientGlow : "transparent" }}
        />

        <Container>
          <Header apiKey={apiKey} onSaveKey={setApiKey} />

          <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-5 border border-slate-700/60 shadow-xl">
            <SearchBar
              onLocationSelect={handleLocationSelect}
              currentLocation={displayLocation}
            />
          </div>

          {loading && <LoadingSpinner />}

          {error && !loading && (
            <ErrorAlert message={error} onRetry={handleRetry} />
          )}

          {data && !loading && !error && (
            <div className="space-y-4">
              <CurrentWeather
                data={data}
                unit={unit}
                onToggleUnit={toggleUnit}
                theme={theme}
              />
              {data.ai.summary && <AISummary summary={data.ai.summary} />}
              {data.forecast.daily.length > 0 && (
                <div className="bg-slate-800/30 rounded-2xl p-5 border border-slate-700/40 shadow-xl">
                  <ForecastSection forecast={data.forecast} unit={unit} />
                </div>
              )}
            </div>
          )}

          {!hasSearched && <WelcomeScreen hasApiKey={apiKey.length > 0} />}
        </Container>
      </div>

      {/* Welcome Modal */}
      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={handleCloseModal}
        onSaveKey={handleSaveApiKey}
        hasKey={!!apiKey}
      />
    </>
  );
}

function WelcomeScreen({ hasApiKey }: { hasApiKey: boolean }) {
  return (
    <div
      data-testid="card-welcome"
      className="flex flex-col items-center justify-center py-16 gap-6 text-center"
    >
      <div className="relative">
        <div className="w-24 h-24 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
          <CloudSun className="w-12 h-12 text-cyan-400" strokeWidth={1.2} />
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-violet-500/80 border-2 border-[#0F172A] flex items-center justify-center">
          <span className="text-white text-[9px] font-bold">AI</span>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Welcome to Weather-AI</h2>
        <p className="text-slate-400 mt-2 max-w-sm text-sm leading-relaxed">
          Real-time weather data with Gemini AI-powered insights for any city worldwide.
        </p>
      </div>

      <div className="flex flex-col gap-2.5 text-sm text-slate-400 w-full max-w-sm">
        {!hasApiKey && (
          <div className="flex items-center gap-3 bg-slate-800/60 rounded-xl px-4 py-3 border border-slate-700/60 text-left">
            <KeyRound className="w-4 h-4 text-amber-400 shrink-0" strokeWidth={1.5} />
            <span className="text-slate-300">Enter your Weather-AI API key above</span>
          </div>
        )}
        <div className="flex items-center gap-3 bg-slate-800/60 rounded-xl px-4 py-3 border border-slate-700/60 text-left">
          <Search className="w-4 h-4 text-cyan-400 shrink-0" strokeWidth={1.5} />
          <span className="text-slate-300">Search a city or use your current location</span>
        </div>
      </div>
    </div>
  );
}