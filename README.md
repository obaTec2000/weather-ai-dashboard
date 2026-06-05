# Weather-AI Dashboard

A modern, production-ready weather dashboard that integrates the Weather-AI API to deliver real-time weather data, 5-day forecasts, and AI-powered weather insights. Built with React, TypeScript, Vite, and Tailwind CSS.

## Live Demo

**Application:** https://your-app-name.netlify.app

**GitHub Repository:** https://github.com/yourusername/weather-ai-dashboard

---

## Overview

Weather-AI Dashboard provides users with real-time weather information, forecast data, location-based weather lookup, and AI-generated weather summaries. The application offers a responsive user experience across desktop, tablet, and mobile devices.

---

## Features

### Current Weather

* Real-time weather conditions
* Temperature display
* Humidity levels
* Wind speed information
* Feels-like temperature

### Forecast

* 5-day weather forecast
* Daily high and low temperatures
* Weather condition summaries

### AI Weather Insights

* AI-generated weather summaries
* Human-readable weather explanations
* Context-aware recommendations

### Location Search

* Search for any city worldwide
* Geocoding support through OpenStreetMap Nominatim
* Fast location lookup

### Geolocation Support

* Detect user's current location
* One-click weather retrieval

### Unit Preferences

* Toggle between Celsius and Fahrenheit
* Persistent user preferences using localStorage

### API Key Management

* Secure browser-based API key storage
* No backend required

### Dynamic Themes

* Weather-based UI appearance
* Adaptive visual experience

### Responsive Design

* Mobile-friendly interface
* Tablet optimization
* Desktop support

### Error Handling

* Invalid API key detection
* Network error handling
* Rate limit notifications
* User-friendly error messages

---

## Technology Stack

| Category       | Technology              |
| -------------- | ----------------------- |
| Frontend       | React 18                |
| Language       | TypeScript              |
| Build Tool     | Vite                    |
| Styling        | Tailwind CSS            |
| Icons          | Lucide React            |
| API            | Weather-AI API          |
| Geocoding      | OpenStreetMap Nominatim |
| Date Utilities | date-fns                |

---

## Prerequisites

Before running the project, ensure the following are installed:

* Node.js 18 or higher
* npm (included with Node.js)
* Weather-AI API Key

Node.js Download:
https://nodejs.org

Weather-AI:
https://weather-ai.co

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/weather-ai-dashboard.git

cd weather-ai-dashboard
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## API Key Setup

1. Create an account at Weather-AI.
2. Generate an API key.
3. Open the application.
4. Enter your API key in the dashboard.
5. Save the key.
6. Search for a city or use your current location.

---

## Project Structure

```text
weather-ai-dashboard/
│
├── src/
│   ├── components/
│   │   ├── weather/
│   │   ├── forecast/
│   │   ├── ai/
│   │   ├── search/
│   │   ├── common/
│   │   └── api/
│   │
│   ├── hooks/
│   │   ├── useWeather.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useGeolocation.ts
│   │   └── useUnitPreference.ts
│   │
│   ├── services/
│   │   ├── weatherApi.ts
│   │   └── geocoding.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── utils/
│   │   ├── temperature.ts
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   └── weatherMappings.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── README.md
└── .gitignore
```

---

## Available Scripts

### Development

```bash
npm run dev
```

Starts the development server.

### Production Build

```bash
npm run build
```

Builds the application for production.

### Preview Build

```bash
npm run preview
```

Previews the production build locally.

---

## API Integration

### Weather-AI Endpoint

```http
GET https://api.weather-ai.co/v1/weather
```

### Headers

```http
Authorization: Bearer YOUR_API_KEY
```

### Parameters

| Parameter | Required | Description        |
| --------- | -------- | ------------------ |
| lat       | Yes      | Latitude           |
| lon       | Yes      | Longitude          |
| days      | No       | Forecast days      |
| units     | No       | metric or imperial |
| ai        | No       | Include AI summary |

---

## Geocoding Service

City search is powered by OpenStreetMap Nominatim.

```http
GET https://nominatim.openstreetmap.org/search?format=json&q={city}
```

---

## Design System

### Colors

| Role           | Color   |
| -------------- | ------- |
| Background     | #0F172A |
| Card Surface   | #1E293B |
| Primary Accent | #06B6D4 |
| Primary Text   | #F8FAFC |
| Secondary Text | #94A3B8 |

### Typography

* Font Family: Inter
* Temperature Display: 72px Bold
* Section Headings: 24px SemiBold
* Body Text: 16px Regular

### Layout

* Desktop Container Padding: 2rem
* Mobile Container Padding: 1rem
* Card Padding: 1.5rem
* Border Radius (Cards): 1.5rem
* Border Radius (Buttons): 0.75rem

---

## Deployment

### Netlify

Build the application:

```bash
npm run build
```

Deploy the generated `dist` folder to Netlify.

### Vercel

```bash
npx vercel --prod
```

### GitHub Pages

```bash
npm run build
npx gh-pages -d dist
```

---

## Testing

### Functional Testing Checklist

* Current weather displays correctly
* Forecast loads successfully
* AI summary appears
* Unit toggle functions correctly
* Geolocation works
* City search works

### Error Testing

| Scenario        | Expected Result          |
| --------------- | ------------------------ |
| Invalid API Key | Error message displayed  |
| Missing API Key | Prompt for API key       |
| City Not Found  | Location error displayed |
| Offline Network | Network error displayed  |

---

## Environment Variables

No environment variables are required.

The API key is stored securely in the browser using localStorage.

---

## Contributing

Contributions, improvements, and suggestions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to your branch
5. Open a Pull Request

---

## License

MIT License

Copyright (c) 2026 Olaniyan

---

## Acknowledgements

* Weather-AI API
* OpenStreetMap Nominatim
* React
* Vite
* Tailwind CSS
* Lucide React
* date-fns

---

## Contact

**Author:** Olaniyan Feranmi John

GitHub:
https://github.com/yourusername

Email:
[youremail@example.com](mailto:youremail@example.com)

---

## Live Demo

https://your-app-name.netlify.app
