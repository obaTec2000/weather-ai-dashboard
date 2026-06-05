import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const WEATHER_API_BASE = "https://api.weather-ai.co";

app.get("/api/weather", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "Authorization header required." });
    return;
  }

  const params = new URLSearchParams();
  const allowed = ["lat", "lon", "days", "units", "ai"] as const;
  for (const key of allowed) {
    const val = req.query[key];
    if (typeof val === "string") params.set(key, val);
  }

  const upstreamUrl = `${WEATHER_API_BASE}/v1/weather?${params.toString()}`;

  try {
    const upstream = await fetch(upstreamUrl, {
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
        "User-Agent": "WeatherAIDashboard-Proxy/1.0",
      },
    });
    const body = await upstream.json();
    res.status(upstream.status).json(body);
  } catch (err) {
    console.error("Weather API upstream error:", err);
    res.status(502).json({ error: "Failed to reach Weather-AI service." });
  }
});

app.get("/api/healthz", (_req, res) => res.json({ ok: true }));

const PORT = Number(process.env.PORT ?? 3001);
app.listen(PORT, () => console.log(`API server running on http://localhost:${PORT}`));
