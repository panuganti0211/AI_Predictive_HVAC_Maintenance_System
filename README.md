# AI Predictive HVAC Maintenance Mobile App

Production-style full-stack assignment project focused on reducing HVAC alert fatigue in manufacturing environments using intelligent anomaly detection and Gemini-powered maintenance insights.

## Project Overview

This app simulates five HVAC systems streaming temperature, airflow, vibration, and pressure telemetry.  
Instead of flooding technicians with threshold-based alarms, it prioritizes only meaningful multi-signal anomalies and explains:

- why an issue matters,
- likely root cause,
- what to inspect first,
- and how urgently to act.

## Tech Stack

### Frontend (`frontend/`)
- React Native + Expo + TypeScript
- React Navigation
- Axios
- React Native Chart Kit
- Context API
- AsyncStorage (offline cache fallback)

### Backend (`backend/`)
- Node.js + Express + TypeScript
- MongoDB + Mongoose models
- dotenv + cors
- Gemini API (`@google/genai`)

## Architecture

### Backend Structure

```text
backend/src/
  controllers/
  routes/
  services/
  models/
  middleware/
  data/
  types/
  app.ts
  server.ts
```

### Frontend Structure

```text
frontend/src/
  screens/
  components/
  services/
  navigation/
  hooks/
  context/
  types/
```

## Implemented Features

1. **Dashboard Screen**
   - HVAC cards with health status, risk level, latest AI insight, active alert count
   - Color-coded risk visualization
   - Quick navigation to alerts and AI assistant

2. **HVAC Detail Screen**
   - Temperature, airflow, vibration, and pressure charts
   - Anomaly/AI explanation panel
   - Recommendation panel with urgency + inspection checklist

3. **Intelligent Alert Engine**
   - Moving average comparison
   - Sudden spike/drop detection
   - Abnormal combination logic (e.g., high vibration + low airflow)
   - Trend detection (rising temperature)
   - Severity mapping (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`)
   - Duplicate/noise suppression window to reduce alert fatigue

4. **Gemini AI Insights**
   - AI-generated issue explanation
   - Root cause hints
   - Maintenance recommendation text
   - Technician AI assistant chat endpoint + screen

5. **Simulated Real-time Monitoring**
   - Sensor updates every 5 seconds
   - Frontend auto-refresh polling

6. **Alert Prioritization**
   - Only emits meaningful alerts above confidence/risk conditions
   - Includes confidence, severity, timestamp, explanation, recommendation, urgency

## API Endpoints

- `GET /api/hvac`
- `GET /api/hvac/:id`
- `GET /api/alerts`
- `POST /api/ai/analyze` body: `{ "hvacId": "hvac-2" }`
- `POST /api/chat` body: `{ "message": "Why is HVAC-2 critical?" }`

## Anomaly Detection Strategy

The detection service combines multiple lightweight interpretable methods:

- **Moving Averages:** compares latest value vs recent rolling average.
- **Sudden Spike Detection:** detects abrupt vibration/temperature deviations.
- **Trend Comparison:** checks directional drift over recent window (e.g., rising heat).
- **Abnormal Pair Rules:** multi-sensor interactions (vibration+airflow, pressure instability).
- **Alert Gatekeeping:** emits alerts only when risk and signal richness justify attention.

This prevents false-positive overload and surfaces operationally meaningful events.

## Setup Instructions

## 1) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Set values in `backend/.env`:
- `PORT=5000`
- `MONGO_URI=mongodb://localhost:27017/hvac_ai` (optional for this simulation; app can run in-memory if missing)
- `GEMINI_API_KEY=...` (optional but required for real Gemini responses)

## 2) Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run start
```

Set in `frontend/.env`:
- `EXPO_PUBLIC_API_BASE_URL=http://localhost:5000`

For Android emulator, you may need to use host IP instead of localhost.

## Tradeoffs

- **In-memory runtime store + Mongoose models:** keeps assignment setup easy while preserving production-like model design.
- **Polling instead of sockets:** simpler and reliable for demo; can migrate to WebSockets/SSE.
- **Rule-based anomaly engine + Gemini narrative:** interpretable baseline now, extensible to ML forecasting later.

## Future Improvements

- WebSocket live stream updates
- Time-series database for high-frequency telemetry
- Predictive remaining useful life (RUL) models
- Push notification service integration
- Role-aware task assignment workflows
- Deeper offline mode + background sync

## Screenshots (Placeholders)

- `docs/screenshots/dashboard.png`
- `docs/screenshots/hvac-detail.png`
- `docs/screenshots/alerts.png`
- `docs/screenshots/assistant.png`

## How AI Was Used During Development

AI was used to accelerate:

- system design ideation (alert-fatigue-first product scope),
- TypeScript scaffolding and architectural drafting,
- generation of maintainable boilerplate for modular services/components,
- and drafting recommendation/explanation prompt patterns for Gemini.

All anomaly logic, API contracts, and product flow decisions were explicitly shaped and validated for technician-first usability.
