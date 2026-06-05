export interface UvLevel {
  label: string;
  color: string;        // icon / text color (hex)
  bg: string;           // pill background (rgba)
  border: string;       // pill border (rgba)
  barColor: string;     // gauge segment fill
  advice: string;
}

export const UV_LEVELS: UvLevel[] = [
  { label: "Low",       color: "#4ADE80", bg: "rgba(74,222,128,0.10)",  border: "rgba(74,222,128,0.22)",  barColor: "#4ADE80", advice: "No protection needed." },
  { label: "Low",       color: "#4ADE80", bg: "rgba(74,222,128,0.10)",  border: "rgba(74,222,128,0.22)",  barColor: "#4ADE80", advice: "No protection needed." },
  { label: "Low",       color: "#4ADE80", bg: "rgba(74,222,128,0.10)",  border: "rgba(74,222,128,0.22)",  barColor: "#4ADE80", advice: "No protection needed." },
  { label: "Moderate",  color: "#FACC15", bg: "rgba(250,204,21,0.10)",  border: "rgba(250,204,21,0.22)",  barColor: "#FACC15", advice: "Apply SPF 30+ sunscreen." },
  { label: "Moderate",  color: "#FACC15", bg: "rgba(250,204,21,0.10)",  border: "rgba(250,204,21,0.22)",  barColor: "#FACC15", advice: "Apply SPF 30+ sunscreen." },
  { label: "Moderate",  color: "#FACC15", bg: "rgba(250,204,21,0.10)",  border: "rgba(250,204,21,0.22)",  barColor: "#FACC15", advice: "Apply SPF 30+ sunscreen." },
  { label: "High",      color: "#FB923C", bg: "rgba(251,146,60,0.10)",  border: "rgba(251,146,60,0.22)",  barColor: "#FB923C", advice: "SPF 50+ and seek shade." },
  { label: "High",      color: "#FB923C", bg: "rgba(251,146,60,0.10)",  border: "rgba(251,146,60,0.22)",  barColor: "#FB923C", advice: "SPF 50+ and seek shade." },
  { label: "Very High", color: "#F87171", bg: "rgba(248,113,113,0.10)", border: "rgba(248,113,113,0.22)", barColor: "#F87171", advice: "Extra protection essential." },
  { label: "Very High", color: "#F87171", bg: "rgba(248,113,113,0.10)", border: "rgba(248,113,113,0.22)", barColor: "#F87171", advice: "Extra protection essential." },
  { label: "Very High", color: "#F87171", bg: "rgba(248,113,113,0.10)", border: "rgba(248,113,113,0.22)", barColor: "#F87171", advice: "Extra protection essential." },
  { label: "Extreme",   color: "#C084FC", bg: "rgba(192,132,252,0.10)", border: "rgba(192,132,252,0.22)", barColor: "#C084FC", advice: "Avoid outdoor exposure." },
];

export function getUvLevel(index: number): UvLevel {
  const clamped = Math.max(0, Math.min(11, Math.round(index)));
  return UV_LEVELS[clamped];
}

// The 5 gauge segments: Low, Moderate, High, Very High, Extreme
export const GAUGE_SEGMENTS = [
  { label: "Low",       color: "#4ADE80", range: [0, 2]  },
  { label: "Moderate",  color: "#FACC15", range: [3, 5]  },
  { label: "High",      color: "#FB923C", range: [6, 7]  },
  { label: "Very High", color: "#F87171", range: [8, 10] },
  { label: "Extreme",   color: "#C084FC", range: [11, 11] },
];
