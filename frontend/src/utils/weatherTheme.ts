import { conditionToIconKey } from "./weatherMappings";

export interface WeatherTheme {
  /** Card background gradient (CSS value for background) */
  cardGradient: string;
  /** Top-right decorative glow orb color (rgba) */
  glow1: string;
  /** Bottom-left decorative glow orb color (rgba) */
  glow2: string;
  /** Icon container background */
  iconBg: string;
  /** Icon container border */
  iconBorder: string;
  /** Icon stroke color (Tailwind arbitrary or hex) */
  iconColor: string;
  /** Card border color */
  cardBorder: string;
  /** Stat item background */
  statBg: string;
  /** Full-page ambient radial glow (CSS background value) */
  ambientGlow: string;
  /** Label for aria / testing */
  label: string;
}

const THEMES: Record<string, WeatherTheme> = {
  sun: {
    label: "sunny",
    cardGradient:
      "linear-gradient(135deg, rgba(30,41,59,0.98) 0%, rgba(41,35,20,0.85) 100%)",
    glow1: "rgba(251,191,36,0.18)",
    glow2: "rgba(245,158,11,0.12)",
    iconBg: "rgba(251,191,36,0.12)",
    iconBorder: "rgba(251,191,36,0.22)",
    iconColor: "#FCD34D",
    cardBorder: "rgba(251,191,36,0.20)",
    statBg: "rgba(251,191,36,0.07)",
    ambientGlow:
      "radial-gradient(ellipse 70% 50% at 85% 10%, rgba(251,191,36,0.10) 0%, transparent 70%)",
  },
  "cloud-sun": {
    label: "partly cloudy",
    cardGradient:
      "linear-gradient(135deg, rgba(30,41,59,0.98) 0%, rgba(20,38,50,0.85) 100%)",
    glow1: "rgba(6,182,212,0.15)",
    glow2: "rgba(139,92,246,0.08)",
    iconBg: "rgba(6,182,212,0.10)",
    iconBorder: "rgba(6,182,212,0.18)",
    iconColor: "#67E8F9",
    cardBorder: "rgba(6,182,212,0.18)",
    statBg: "rgba(6,182,212,0.06)",
    ambientGlow:
      "radial-gradient(ellipse 60% 45% at 80% 10%, rgba(6,182,212,0.10) 0%, transparent 70%)",
  },
  cloud: {
    label: "cloudy",
    cardGradient:
      "linear-gradient(135deg, rgba(30,41,59,0.98) 0%, rgba(24,32,45,0.85) 100%)",
    glow1: "rgba(100,116,139,0.18)",
    glow2: "rgba(71,85,105,0.12)",
    iconBg: "rgba(100,116,139,0.12)",
    iconBorder: "rgba(100,116,139,0.22)",
    iconColor: "#CBD5E1",
    cardBorder: "rgba(100,116,139,0.22)",
    statBg: "rgba(100,116,139,0.07)",
    ambientGlow:
      "radial-gradient(ellipse 65% 45% at 80% 10%, rgba(100,116,139,0.12) 0%, transparent 70%)",
  },
  "cloud-rain": {
    label: "rainy",
    cardGradient:
      "linear-gradient(135deg, rgba(30,41,59,0.98) 0%, rgba(15,30,55,0.88) 100%)",
    glow1: "rgba(59,130,246,0.20)",
    glow2: "rgba(37,99,235,0.12)",
    iconBg: "rgba(59,130,246,0.12)",
    iconBorder: "rgba(59,130,246,0.22)",
    iconColor: "#93C5FD",
    cardBorder: "rgba(59,130,246,0.22)",
    statBg: "rgba(59,130,246,0.07)",
    ambientGlow:
      "radial-gradient(ellipse 65% 50% at 80% 10%, rgba(59,130,246,0.12) 0%, transparent 70%)",
  },
  "cloud-drizzle": {
    label: "drizzly",
    cardGradient:
      "linear-gradient(135deg, rgba(30,41,59,0.98) 0%, rgba(17,30,50,0.85) 100%)",
    glow1: "rgba(96,165,250,0.18)",
    glow2: "rgba(59,130,246,0.10)",
    iconBg: "rgba(96,165,250,0.10)",
    iconBorder: "rgba(96,165,250,0.20)",
    iconColor: "#BFDBFE",
    cardBorder: "rgba(96,165,250,0.18)",
    statBg: "rgba(96,165,250,0.06)",
    ambientGlow:
      "radial-gradient(ellipse 60% 45% at 80% 10%, rgba(96,165,250,0.10) 0%, transparent 70%)",
  },
  "cloud-lightning": {
    label: "stormy",
    cardGradient:
      "linear-gradient(135deg, rgba(30,41,59,0.98) 0%, rgba(28,15,55,0.90) 100%)",
    glow1: "rgba(139,92,246,0.25)",
    glow2: "rgba(109,40,217,0.18)",
    iconBg: "rgba(139,92,246,0.14)",
    iconBorder: "rgba(139,92,246,0.26)",
    iconColor: "#C4B5FD",
    cardBorder: "rgba(139,92,246,0.26)",
    statBg: "rgba(139,92,246,0.08)",
    ambientGlow:
      "radial-gradient(ellipse 70% 55% at 80% 10%, rgba(139,92,246,0.15) 0%, transparent 70%)",
  },
  "cloud-snow": {
    label: "snowy",
    cardGradient:
      "linear-gradient(135deg, rgba(30,41,59,0.98) 0%, rgba(15,30,50,0.85) 100%)",
    glow1: "rgba(186,230,253,0.20)",
    glow2: "rgba(147,197,253,0.12)",
    iconBg: "rgba(186,230,253,0.12)",
    iconBorder: "rgba(186,230,253,0.22)",
    iconColor: "#E0F2FE",
    cardBorder: "rgba(186,230,253,0.20)",
    statBg: "rgba(186,230,253,0.06)",
    ambientGlow:
      "radial-gradient(ellipse 65% 50% at 80% 10%, rgba(186,230,253,0.12) 0%, transparent 70%)",
  },
  "cloud-fog": {
    label: "foggy",
    cardGradient:
      "linear-gradient(135deg, rgba(30,41,59,0.98) 0%, rgba(20,30,40,0.85) 100%)",
    glow1: "rgba(148,163,184,0.16)",
    glow2: "rgba(100,116,139,0.10)",
    iconBg: "rgba(148,163,184,0.10)",
    iconBorder: "rgba(148,163,184,0.18)",
    iconColor: "#CBD5E1",
    cardBorder: "rgba(148,163,184,0.18)",
    statBg: "rgba(148,163,184,0.06)",
    ambientGlow:
      "radial-gradient(ellipse 65% 50% at 80% 10%, rgba(148,163,184,0.10) 0%, transparent 70%)",
  },
  wind: {
    label: "windy",
    cardGradient:
      "linear-gradient(135deg, rgba(30,41,59,0.98) 0%, rgba(18,32,48,0.85) 100%)",
    glow1: "rgba(56,189,248,0.18)",
    glow2: "rgba(14,165,233,0.10)",
    iconBg: "rgba(56,189,248,0.10)",
    iconBorder: "rgba(56,189,248,0.18)",
    iconColor: "#7DD3FC",
    cardBorder: "rgba(56,189,248,0.18)",
    statBg: "rgba(56,189,248,0.06)",
    ambientGlow:
      "radial-gradient(ellipse 65% 50% at 80% 10%, rgba(56,189,248,0.10) 0%, transparent 70%)",
  },
};

const DEFAULT_THEME = THEMES["cloud-sun"];

export function getWeatherTheme(condition: string): WeatherTheme {
  const key = conditionToIconKey(condition);
  return THEMES[key] ?? DEFAULT_THEME;
}
