import { useLocalStorage } from "./useLocalStorage";
import { GeoLocation } from "@/types";

const STORAGE_KEY = "weather-ai-recent-searches";
const MAX_RECENT = 5;

export interface RecentSearch extends GeoLocation {
  searchedAt: number;
}

export function useRecentSearches(): {
  recents: RecentSearch[];
  add: (location: GeoLocation) => void;
  remove: (lat: number, lon: number) => void;
  clear: () => void;
} {
  const [recents, setRecents] = useLocalStorage<RecentSearch[]>(STORAGE_KEY, []);

  const add = (location: GeoLocation) => {
    setRecents((prev) => {
      const filtered = prev.filter(
        (r) => !(Math.abs(r.lat - location.lat) < 0.01 && Math.abs(r.lon - location.lon) < 0.01)
      );
      const next: RecentSearch = { ...location, searchedAt: Date.now() };
      return [next, ...filtered].slice(0, MAX_RECENT);
    });
  };

  const remove = (lat: number, lon: number) => {
    setRecents((prev) =>
      prev.filter(
        (r) => !(Math.abs(r.lat - lat) < 0.01 && Math.abs(r.lon - lon) < 0.01)
      )
    );
  };

  const clear = () => setRecents([]);

  return { recents, add, remove, clear };
}
