import { useLocalStorage } from "./useLocalStorage";
import { TemperatureUnit } from "@/types";
import { UNIT_STORAGE_KEY } from "@/utils/constants";

export function useUnitPreference(): [TemperatureUnit, () => void] {
  const [unit, setUnit] = useLocalStorage<TemperatureUnit>(UNIT_STORAGE_KEY, "metric");

  const toggleUnit = () => {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  return [unit, toggleUnit];
}
