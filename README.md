# Beevil Knievel

**Intelligent Precision Agriculture & Hive Monitoring Platform**

Beevil Knievel is a commercial AgriTech hardware and software ecosystem. By combining environmental sensor nodes, Edge AI anomaly detection, and cloud-based diagnostics, we protect commercial honeybee colonies from swarming, parasite attacks, and thermal distress.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 1. HARDWARE SENSOR NODE (Field Apiary)                                  │
│ • STM32WLE5 / Wio-E5 LoRa SoC                                           │
│ • Dual DS18B20 1-Wire Thermal Probes + ICS-43434 MEMS Audio Sensor      │
│ • Edge AI: Real-time delta-T & FFT energy classification                │
│ • Uplink: Sub-GHz LoRa Wireless (<=4km range)                           │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ LoRa Sub-GHz RF Wireless
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ 2. GATEWAY RECEIVER & CLOUD BACKEND                                     │
│ • Gateway Station -> Cellular / WiFi Backhaul                           │
│ • Cloud Diagnostic Engine: Multi-day trend pathology classifier         │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ Automated Alert Pipeline
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ 3. FARMER DELIVERY CHANNELS                                             │
│ • Push Notifications & SMS Alerts                                       │
│ • Mobile Application (iOS / Android / PWA)                              │
│ • Web Portal Dashboard                                                  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🌐 Project Structure

```
smart_hive_app/
├── index.html       # Commercial Landing Page & Marketing
├── product.html     # Hardware Deep Dive
├── store.html       # E-Commerce & Pre-Order
├── app.html         # Companion App Marketing & Demo
├── download.html    # Firmware & App Distribution
├── support.html     # Customer Support & Warranty
├── accessories.html # Replacement Parts Store
├── docs.html        # Technical User Manual
├── about.html       # Company History & Team
├── investors.html   # Pitch Deck & Market Opportunity
├── research.html    # R&D Methodologies
├── privacy.html     # Legal Terms & Privacy Policy
├── styles.css       # Unified Design System
├── components.js    # Shared UI Components (Nav, Footer)
└── assets/          # Brand and Product Images
```

---

## 🎨 Design System

Our web ecosystem is built on a custom, lightweight Vanilla CSS/JS architecture.
- **Vibe:** Premium hardware startup (Apple, DJI, Nothing, Tesla)
- **Primary Color:** Honey Amber `#F5A623`
- **Backgrounds:** True canvas `#050505` with subtle glassmorphism surfaces
- **Typography:** `Plus Jakarta Sans` (Headings) and `Inter` (Body)

---

## 🚀 Local Development

No build steps required. Serve the root directory utilizing any standard HTTP server.

```bash
# Example using Python 3
python -m http.server 8080
```

Navigate to `http://localhost:8080` in your web browser.

---

© 2026 Beevil Knievel Inc. All rights reserved.
