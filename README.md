# Smart Hive Monitor — IEEE HardwAIre Challenge Phase 2

Official repository for **Smart Hive Monitor** by **Team Beevil Knievel** for the **IEEE HardwAIre Challenge Phase 2**.

An edge-to-cloud precision apiculture platform combining on-device **TinyML anomaly detection (Model 1)** with a **Cloud AI diagnostic engine (Model 2)** to protect honeybee colonies from swarming, Varroa mite parasite attacks, and thermal distress.

---

## 👥 Team & Institutional Credentials

- **Team Name**: Beevil Knievel
- **Team Members**:
  - **Atharve Dahima** (Team Lead & Embedded AI Engineer)
  - **Loshini Shankar** (Sensor Systems Lead)
  - **Srajan Mishra** (Cloud AI & Field Logistics Lead)
- **Faculty Mentor**: Dr. Vishal Sharma
- **Institution**: School of Applied Sciences, Engineering & Technology (SASET), Rashtriya Raksha University (RRU), Lavad, Dahegam, Gujarat 382305, India
- **Competition**: IEEE HardwAIre Challenge (Phase 2 Prototype Submission)

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 1. HARDWARE SENSOR NODE (Field Apiary)                                  │
│ • STM32WLE5 / Wio-E5 LoRa SoC                                           │
│ • Dual DS18B20 1-Wire Thermal Probes + ICS-43434 MEMS Audio Sensor        │
│ • Model 1 (Edge TinyML): Real-time delta-T & FFT energy classification  │
│ • Uplink: Sub-GHz LoRa Wireless (<=4km range)                           │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ LoRa Sub-GHz RF Wireless
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ 2. GATEWAY RECEIVER & CLOUD BACKEND                                     │
│ • Gateway Station (Wio-E5 Mini) -> Cellular / WiFi Backhaul             │
│ • Model 2 (Cloud Diagnostic AI Engine): Multi-day trend pathology classifier│
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ Automated Alert Pipeline
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ 3. FARMER DELIVERY CHANNELS (3-Tier Architecture)                       │
│ • Tier 1 (Critical Alerts): Instant Push & WhatsApp / Twilio SMS        │
│ • Tier 2 (Actionable Intelligence): Farmer Mobile App (English/Gujarati/Hindi)│
│ • Tier 3 (Analytics & Portal): Web Landing Page & App Download Portal   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🌐 Deliverables & File Structure

```
smart_hive_app/
├── index.html       # Official Team Landing Page (HashiCorp Dark-Canvas Style)
├── download.html    # Mobile App Download Portal (Android APK, iOS TestFlight)
├── app.html         # Interactive Farmer Mobile App (Vernacular & Alert Simulator)
├── README.md        # Project Documentation
├── .gitignore       # Git Exclusions
└── assets/
    ├── hero_product.jpg         # Product Hardware Unit Render
    └── architecture_diagram.jpg # Dual-Model AI Flowchart
```

---

## 🎨 Design System

Built using **HashiCorp's Dark-Canvas Marketing Design System**:
- **Canvas Ground**: Pure Black (`#000000`)
- **Surface Elevation**: Charcoal lifts (`#161B26` / `#252D3D`) with 1px translucent hairlines (`rgba(178, 182, 189, 0.15)`)
- **Product Chromatic Identity Surfaces**:
  - 🟣 **Terraform Purple** (`#844FBA`): Hardware Node Specs
  - 🟡 **Vault Yellow** (`#FFC107`): Model 2 Cloud AI & Swarm Warnings
  - 🔷 **Waypoint Cyan** (`#00BCF2`): Push Notification Channels
  - 🟢 **Nomad Green** (`#00A86B`): Healthy Colony Status
  - 🔴 **Consul Red** (`#E0384D`): Varroa Mite Critical Alerts
- **Developer-Tool Aesthetics**: HashiCorp `8px` rounded CTAs (`{rounded.md}`) & uppercase 12px Eyebrow category headers.

---

## 🚀 How to Run Locally

Start a local HTTP server:

```bash
python -m http.server 8080
```

Access in your browser:
- **Landing Page**: `http://localhost:8080/index.html`
- **Download Portal**: `http://localhost:8080/download.html`
- **Farmer App**: `http://localhost:8080/app.html`

---

## 📄 License & Attribution

Developed by Team Beevil Knievel for the IEEE HardwAIre Challenge. All rights reserved.
