# 💻 BEEVIL KNIEVEL — Web Dashboard & User Experience Interfaces

This document outlines the frontend engineering architecture, component hierarchy, state management, live API integrations, and tactile design systems across the Beevil Knievel platform.

---

## 🎯 Dual-Interface Strategy

The `frontend/` codebase (Next.js 14 + React 18 + Tailwind CSS) provides two distinct, purposeful user interfaces:

```
                    +------------------------------------------+
                    |        Next.js 14 Unified Web App        |
                    +------------------------------------------+
                               /                       \
                              v                         v
               +-----------------------------+   +-----------------------------+
               | Modern HiveOS PWA (/app)    |   | Retro Playdate Tool (/playdate)|
               | Desktop / Mobile Tablet     |   | Handheld Tactical Console   |
               | - 100-Hive Sector Matrix    |   | - 1-Bit 400x240 Memory LCD  |
               | - 5-Frame Thermal Heatmap   |   | - Mechanical Crank Scrubber |
               | - Bio-Acoustic Spectrogram  |   | - Web Audio Synthesizer     |
               | - HoneyChain Provenance Log |   | - 4 Tactical Modes          |
               +-----------------------------+   +-----------------------------+
```

---

## 📱 Interface 1: HiveOS Field Management PWA (`/app`)

Built for beekeeping apiary managers, field inspectors, and agricultural researchers requiring multi-hive macro-surveillance.

* **Macro Apiary Matrix:**
  - Interactive grid rendering up to 100 hives organized by sector and row.
  - Live color-coded health badges (Green: Healthy, Amber: Warning, Red: Critical Alert, Grey: Offline).
  - Search, filter by health status, and quick-sort by honey weight or alert severity.
* **5-Frame Spatial Thermal Heatmap:**
  - Visualizes the horizontal thermal cross-section across Langstroth comb frames 1 through 5.
  - Highlights core brood thermoregulation ($34.5^\circ\text{C} - 35.5^\circ\text{C}$) versus outer honey/pollen storage frames ($28.0^\circ\text{C} - 32.0^\circ\text{C}$).
* **Bio-Acoustic Spectral Visualizer:**
  - Real-time frequency bar graph rendering the 8 normalized sub-bands received in the 33-byte LoRa packet.
  - Dynamic overlay markers highlighting the 225–285 Hz swarming departure band and 450–750 Hz queenless distress roar.
* **HoneyChain Merkle Provenance Explorer:**
  - Cryptographic SHA-256 audit log linking sensor events, inspection records, and extraction batches into an immutable tamper-evident sequence.

---

## 🕹️ Interface 2: Playdate Tactical Console Emulator (`/playdate`)

Inspired by Panic's Playdate hardware console, this interface provides a high-contrast, distraction-free field tool operable in direct sunlight and with gloved hands.

* **1-Bit Monochrome Visuals:**
  - Sharp 400x240 pixel resolution utilizing custom 1-bit dithering algorithms (Floyd-Steinberg error diffusion).
  - High-contrast black-and-white rendering readable even under 50,000+ Lux direct outdoor sunlight where OLED screens wash out.
* **Virtual Mechanical Crank Time-Scrubber:**
  - Interactive 360-degree rotational crank component.
  - Dragging or rotating the crank scrubs through historical telemetry backwards and forwards in time, allowing rapid visual detection of thermal drops or acoustic surges.
* **Web Audio API Bio-Acoustic Synthesizer:**
  - Reconstructs and synthesizes colony audio in real-time from the 8-band spectral energy vectors using Web Audio oscillators.
  - Allows beekeepers to *audibly hear* the difference between a contented colony hum (180–225 Hz fundamental) and a high-pitched queenless distress roar (550 Hz).
* **4 Dedicated Operational Modes:**
  1. `DIAGNOSTIC`: Core telemetry parameters, alert status, and battery state-of-charge.
  2. `HEATMAP`: 1-bit dithered spatial thermal distribution across hive frames.
  3. `ACOUSTIC`: Oscilloscope and 8-band FFT spectrum analyzer with audio synthesis.
  4. `RADAR`: Apiary RF signal strength (RSSI/SNR) and hive physical placement map.

---

## 🔌 Live Data-Driven State Management

* **Zero Hardcoded Operational Telemetry:**
  - The UI connects directly to the gateway REST API (`http://127.0.0.1:8000/api/v1/hives`) and real-time WebSocket (`/api/v1/ws/live`).
  - When new LoRa packets arrive at the gateway, the WebSocket broadcasts the updated hive telemetry, which updates React state without full page refreshes.
* **Graceful Degradation & Loading States:**
  - Skeleton loaders for all hive cards and chart containers.
  - Comprehensive error boundaries displaying clear reconnect prompts when the gateway is offline.
  - If the database has zero live nodes, the UI indicates whether `DEMO MODE` is enabled or prompts the user to pair field nodes.

---

## 🛠️ Local Frontend Development & Build

```bash
# Navigate to frontend directory
cd frontend

# Install Node dependencies
npm install

# Run local development server
npm run dev

# Build production static bundle
npm run build
```
