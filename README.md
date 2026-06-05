# Weather-AI Dashboard

A modern, production-ready weather dashboard that delivers real-time weather information, 5-day forecasts, geolocation-based weather lookup, and AI-powered weather insights. The application integrates the Weather-AI API through a secure backend proxy and provides a responsive experience across desktop, tablet, and mobile devices.

## Live Links

### Frontend Application

https://weather-ai-dashboard.netlify.app

### Backend API

https://weather-ai-backend-wl9y.onrender.com

### GitHub Repository

https://github.com/obaTec2000/weather-ai-dashboard

---

# Overview

Weather-AI Dashboard is a full-stack weather application built with React, TypeScript, Vite, and Tailwind CSS.

The application allows users to:

* View current weather conditions
* Access a 5-day weather forecast
* Search for weather information worldwide
* Detect and use their current location
* Read AI-generated weather summaries
* Switch between Celsius and Fahrenheit
* Enjoy a responsive and modern user interface

To overcome browser CORS limitations imposed by the Weather-AI API, a dedicated backend proxy was deployed on Render. The frontend communicates with the backend, which securely handles requests to the Weather-AI service.

---

# Project Status

| Component              | Status  | URL                                                |
| ---------------------- | ------- | -------------------------------------------------- |
| GitHub Repository      | Live    | https://github.com/obaTec2000/weather-ai-dashboard |
| Frontend (Netlify)     | Live    | https://weather-ai-dashboard.netlify.app           |
| Backend (Render)       | Live    | https://weather-ai-backend-wl9y.onrender.com       |
| Weather-AI Integration | Working | Real-time weather data and AI summaries            |
| Geolocation Support    | Working | Browser location services                          |
| Forecast System        | Working | 5-Day weather forecast                             |
| AI Insights            | Working | AI-generated weather summaries                     |
| CORS Resolution        | Solved  | Backend proxy deployed                             |

---

# Features

## Current Weather

Displays:

* Current temperature
* Weather condition
* Feels-like temperature
* Humidity percentage
* Wind speed
* Location information

## 5-Day Forecast

Provides:

* Daily forecast information
* High temperatures
* Low temperatures
* Weather conditions
* Forecast summaries

## AI-Powered Weather Insights

Uses Weather-AI capabilities to generate:

* Human-readable weather summaries
* Weather recommendations
* Context-aware weather analysis

## Global City Search

Users can:

* Search cities worldwide
* Retrieve weather instantly
* Access forecast data for any supported location

## Current Location Detection

The application can:

* Detect user location
* Fetch local weather automatically
* Display forecast based on coordinates

## Temperature Unit Toggle

Supports:

* Celsius (°C)
* Fahrenheit (°F)

User preferences are stored using localStorage.

## Responsive Design

Optimized for:

* Desktop devices
* Tablets
* Mobile phones

## Error Handling

The application gracefully handles:

* Invalid API keys
* Missing API keys
* City not found errors
* Network failures
* API rate limits
* Server errors

---

# Technology Stack

## Frontend

* React 18
* TypeScript
* Vite
* Tailwind CSS
* Lucide React
* date-fns

## Backend

* Node.js
* Express.js
* Render Deployment

## APIs and Services

### Weather Data

Weather-AI API

### Geocoding

OpenStreetMap Nominatim

### Hosting

Frontend:

* Netlify

Backend:

* Render

### Version Control

* Git
* GitHub

---

# Architecture

```text
User Browser
      │
      ▼
React Frontend (Netlify)
      │
      ▼
Render Backend Proxy
      │
      ▼
Weather-AI API
      │
      ▼
Weather Data + AI Summaries
```

## Why a Backend Proxy?

The Weather-AI API does not allow direct browser requests due to CORS restrictions.

The backend proxy solves this by:

* Handling API communication securely
* Preventing browser CORS issues
* Protecting API interactions
* Improving deployment reliability
* Centralizing request management

---

# Project Structure

```text
weather-ai-dashboard/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── routes/
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── weather/
│   │   │   ├── forecast/
│   │   │   ├── ai/
│   │   │   ├── search/
│   │   │   ├── common/
│   │   │   └── api/
│   │   │
│   │   ├── hooks/
│   │   │   ├── useWeather.ts
│   │   │   ├── useGeolocation.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   └── useUnitPreference.ts
│   │   │
│   │   ├── services/
│   │   │   ├── weatherApi.ts
│   │   │   └── geocoding.ts
│   │   │
│   │   ├── types/
│   │   │   └── index.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── constants.ts
│   │   │   ├── helpers.ts
│   │   │   ├── temperature.ts
│   │   │   └── weatherMappings.ts
│   │   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── README.md
└── .gitignore
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/obaTec2000/weather-ai-dashboard.git

cd weather-ai-dashboard
```

---

# Frontend Setup

Install dependencies:

```bash
cd frontend

npm install
```

Start development server:

```bash
npm run dev
```

Application will be available at:

```text
http://localhost:5173
```

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm start
```

Backend will run on:

```text
http://localhost:5000
```

---

# API Integration

## Weather-AI Endpoint

```http
GET https://api.weather-ai.co/v1/weather
```

### Request Headers

```http
Authorization: Bearer YOUR_API_KEY
```

### Parameters

| Parameter | Required | Description             |
| --------- | -------- | ----------------------- |
| lat       | Yes      | Latitude                |
| lon       | Yes      | Longitude               |
| days      | No       | Number of forecast days |
| units     | No       | metric or imperial      |
| ai        | No       | Include AI summary      |

---

# Geocoding Integration

City search is powered by OpenStreetMap Nominatim.

```http
GET https://nominatim.openstreetmap.org/search?format=json&q={city}
```

No API key is required.

---

# Available Scripts

## Frontend

### Development

```bash
npm run dev
```

### Build Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Backend

### Start Server

```bash
npm start
```

### Development Mode

```bash
npm run dev
```

---

# Testing Checklist

## Functional Testing

* Current weather loads correctly
* Forecast data displays correctly
* AI summaries are generated
* Location search works
* Current location works
* Unit toggle functions properly
* Responsive layout works

## Error Testing

| Scenario        | Expected Result            |
| --------------- | -------------------------- |
| Invalid API Key | Error displayed            |
| Missing API Key | Warning shown              |
| City Not Found  | User-friendly error        |
| Network Failure | Retry message              |
| Backend Offline | Server unavailable message |

---

# Deployment

## Frontend Deployment

Platform: Netlify

Build command:

```bash
npm run build
```

Publish directory:

```text
dist
```

Live URL:

https://weather-ai-dashboard.netlify.app

---

## Backend Deployment

Platform: Render

Live URL:

https://weather-ai-backend-wl9y.onrender.com

---

# Performance Optimizations

The application includes:

* Component-based architecture
* TypeScript type safety
* Local storage persistence
* Efficient API requests
* Responsive layouts
* Optimized builds through Vite
* Weather-based UI updates
* Error boundaries and graceful fallbacks

---

# Future Improvements

Potential enhancements include:

* Hourly forecast support
* Weather maps integration
* Severe weather alerts
* Multi-language support
* Weather history tracking
* User accounts and saved locations
* Push notifications
* Progressive Web App (PWA) support

---

# License

MIT License

Copyright (c) 2026 Olaniyan Feranmi John

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files to deal in the Software without restriction.

---

# Author

**Olaniyan Feranmi John**

GitHub:
https://github.com/obaTec2000

Project Repository:
https://github.com/obaTec2000/weather-ai-dashboard

---

# Acknowledgements

This project was built using:

* Weather-AI API
* OpenStreetMap Nominatim
* React
* TypeScript
* Vite
* Tailwind CSS
* Lucide React
* date-fns
* Netlify
* Render

---

# Live Demo

Frontend:
https://weather-ai-dashboard.netlify.app

Backend:
https://weather-ai-backend-wl9y.onrender.com
