# Beevil Knievel

**Intelligent Precision Agriculture & Hive Monitoring Platform**

Beevil Knievel is a commercial AgriTech hardware and software ecosystem. By combining environmental sensor nodes, Edge AI anomaly detection, and cloud-based diagnostics, we protect commercial honeybee colonies from swarming, parasite attacks, and thermal distress.

---

## 🏗️ System Architecture

## 🏗️ System Architecture

**1. Beehive Node (per hive)**
*   **STM32WLE5CCU6** — MCU + integrated LoRa radio
*   **Sensors:** DS18B20 x3 (Temp), ICS-43434 (Audio), BME680 (Gas/CO2/Humidity), HX711 (Weight/Scale)
*   **TP4056** — LiPo charging
*   **TPS7A02** — 3.3V LDO regulator
*   **LiPo battery + solar panel**
*   **Custom 60x50mm PCB**, deep-sleep architecture
*   **Edge AI (Model 1)** — On-device decision tree for Healthy/Distressed classification
*   **Logic:** Wakes every 5 min, samples, sleeps; radio fires only on distress event + 1 daily heartbeat

↓ *LoRa (no SIM, no recurring cost)*

**2. Gateway Station (per apiary)**
*   **Wio-E5 module** (STM32WLE5JC + SX126x, pre-matched)
*   **Design:** Based on hallard/LoRa-E5-Breakout, extended
*   **SMA/u.FL antenna** (switchable)
*   **Power:** mains adapter + small backup battery + power-path IC
*   **Pluggable Backhaul Header:** ESP32 WiFi card populated (Ethernet/cellular cards as future options)
*   **Logic:** Always-on, continuous LoRa receive. Decodes packets, forwards over backhaul.

↓ *WiFi/Ethernet (Internet)*

**3. Cloud Infrastructure**
*   **Backend:** Receives forwarded alert payload (node ID, $\Delta$T, acoustic feature, confidence)
*   **Model 2:** Multi-class cause classifier (mites, queenlessness, cold stress, starvation)
*   **Logic:** Lookup-table mapped farmer recommendation.
*   **Dashboard:** (MQTT + rule engine)

↓ *Alert Data*

**4. Farmer Companion System**
*   **Action:** Push notification with specific AI diagnosis + suggested apiary action.

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
