import { useState, useRef, useEffect, useCallback } from "react";
import { Search, MapPin, Clock, X, Trash2 } from "lucide-react";
import { searchCity } from "@/services/geocoding";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import { LocationButton } from "./LocationButton";
import { GeoLocation } from "@/types";

interface SearchBarProps {
  onLocationSelect: (location: GeoLocation) => void;
  currentLocation: GeoLocation | null;
}

export function SearchBar({ onLocationSelect, currentLocation }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { loading: locating, getLocation, error: geoError } = useGeolocation();
  const { recents, add, remove, clear } = useRecentSearches();

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const error = searchError ?? geoError;

  const filtered = query.trim()
    ? recents.filter((r) =>
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.country.toLowerCase().includes(query.toLowerCase())
      )
    : recents;

  const showDropdown = dropdownOpen && filtered.length > 0;

  const selectLocation = useCallback(
    (location: GeoLocation) => {
      onLocationSelect(location);
      add(location);
      setQuery("");
      setDropdownOpen(false);
      setSearchError(null);
    },
    [onLocationSelect, add]
  );

  const handleSearch = async () => {
    if (!query.trim()) return;
    setSearchError(null);
    setSearching(true);
    try {
      const location = await searchCity(query.trim());
      selectLocation(location);
    } catch (err) {
      setSearchError(err instanceof Error ? err.message : "Search failed.");
    } finally {
      setSearching(false);
    }
  };

  const handleGeolocate = async () => {
    setSearchError(null);
    try {
      const location = await getLocation();
      selectLocation(location);
    } catch {
      // error handled by useGeolocation state
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
      setDropdownOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleRemove = (e: React.MouseEvent, lat: number, lon: number) => {
    e.stopPropagation();
    remove(lat, lon);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2" ref={containerRef}>
        {/* Input wrapper — relative so dropdown can be positioned under it */}
        <div className="relative flex-1">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none"
            strokeWidth={1.5}
          />
          <input
            ref={inputRef}
            data-testid="input-city-search"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setDropdownOpen(true);
            }}
            onFocus={() => setDropdownOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search city — London, Tokyo, New York…"
            autoComplete="off"
            className="w-full bg-slate-900/60 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          />

          {/* Dropdown */}
          {showDropdown && (
            <div
              data-testid="dropdown-recent-searches"
              className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-700/60">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <Clock className="w-3 h-3" strokeWidth={2} />
                  Recent searches
                </div>
                <button
                  data-testid="button-clear-recents"
                  onClick={() => { clear(); setDropdownOpen(false); }}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-400 transition-colors py-0.5 px-2 rounded-lg hover:bg-red-500/8"
                >
                  <Trash2 className="w-3 h-3" strokeWidth={1.5} />
                  Clear all
                </button>
              </div>

              {/* Items */}
              <ul>
                {filtered.map((recent, i) => (
                  <li key={`${recent.lat}-${recent.lon}`}>
                    <div
                      data-testid={`button-recent-search-${i}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => selectLocation(recent)}
                      onKeyDown={(e) => e.key === "Enter" && selectLocation(recent)}
                      className="group w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700/60 transition-colors text-left cursor-pointer"
                    >
                      <div className="p-1.5 rounded-lg bg-slate-700/60 group-hover:bg-slate-600/60 transition-colors shrink-0">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" strokeWidth={1.5} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {recent.name}
                        </p>
                        {recent.country && (
                          <p className="text-xs text-slate-500 truncate">{recent.country}</p>
                        )}
                      </div>

                      <button
                        data-testid={`button-remove-recent-${i}`}
                        onClick={(e) => handleRemove(e, recent.lat, recent.lon)}
                        className="shrink-0 p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label={`Remove ${recent.name} from recents`}
                      >
                        <X className="w-3.5 h-3.5" strokeWidth={2} />
                      </button>
                    </div>
                    {i < filtered.length - 1 && (
                      <div className="mx-4 h-px bg-slate-700/40" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          data-testid="button-search"
          onClick={handleSearch}
          disabled={searching || !query.trim()}
          className="bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-600 disabled:opacity-40 disabled:cursor-not-allowed text-slate-900 font-semibold py-2.5 px-5 rounded-xl transition-all duration-200 text-sm shrink-0"
        >
          {searching ? "…" : "Search"}
        </button>

        <LocationButton onClick={handleGeolocate} loading={locating} />
      </div>

      {error && (
        <p data-testid="text-search-error" className="text-red-400 text-xs px-1">
          {error}
        </p>
      )}

      {currentLocation && !error && (
        <div
          data-testid="text-current-location"
          className="flex items-center gap-1.5 text-sm"
        >
          <MapPin className="w-3.5 h-3.5 text-cyan-400" strokeWidth={1.5} />
          <span className="text-cyan-300 font-medium">{currentLocation.name}</span>
          {currentLocation.country && (
            <span className="text-slate-500 text-xs">{currentLocation.country}</span>
          )}
        </div>
      )}
    </div>
  );
}
