# 🐝 Beevil Knievel — Autonomous Precision Apiculture Cyber-Physical Platform

[![Deploy to GitHub Pages](https://github.com/atharveeee-netizen/beevil-knievel/actions/workflows/deploy.yml/badge.svg)](https://github.com/atharveeee-netizen/beevil-knievel/actions/workflows/deploy.yml)
[![Live Website](https://img.shields.io/badge/Live_Portal-GitHub_Pages-ffc833?logo=github&logoColor=black)](https://atharveeee-netizen.github.io/beevil-knievel/)
[![Playdate Console](https://img.shields.io/badge/Console-Playdate_Interactive-fbc651?logo=gamepad&logoColor=black)](https://atharveeee-netizen.github.io/beevil-knievel/playdate/)
[![Hardware Target](https://img.shields.io/badge/Hardware-RAK4631_nRF52840_+_SX1262-2ea043)](firmware/beevil_rak4631_transmitter/)
[![Mathematical Proofs](https://img.shields.io/badge/Physics_Proofs-13_Domains_v2.0-6c00ff)](docs/MATHEMATICAL_MODELS_AND_PHYSICS_PROOFS.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Autonomous Sub-GHz LoRa Mesh (`BeevilMesh`) + Hardened Linux Edge Gateway (Raspberry Pi CM4) + Nordic nRF52840 Field Nodes**  
> *A 100% Offline, Zero-Cloud-Cost, Power-Loss Immune Cyber-Physical Ecosystem for Commercial Apiaries & Conservation.*

---

## 🌐 Live Web & Mobile Applications
* 🎮 **Official Playdate Website**: [https://atharveeee-netizen.github.io/beevil-knievel/](https://atharveeee-netizen.github.io/beevil-knievel/)
* 🕹️ **Interactive Standalone Playdate Console**: [https://atharveeee-netizen.github.io/beevil-knievel/playdate/](https://atharveeee-netizen.github.io/beevil-knievel/playdate/)
* 📲 **HiveOS Mobile Field Console**: [https://atharveeee-netizen.github.io/beevil-knievel/app/](https://atharveeee-netizen.github.io/beevil-knievel/app/)
* 📐 **Mathematical Derivations & Physics Proofs**: [`docs/MATHEMATICAL_MODELS_AND_PHYSICS_PROOFS.md`](docs/MATHEMATICAL_MODELS_AND_PHYSICS_PROOFS.md)

---

## 📌 Executive Cyber-Physical Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    100 HIVE FIELD NODES (SOLAR POWERED)                     │
│   [Hive 001] ──(Hop 1)──> [Hive 015] ──(Hop 2)──> [Hive 042] ──> [Gateway]  │
│   • RAK4631 (Nordic nRF52840 MCU @ 64MHz + Semtech SX1262 LoRa 865MHz)      │
│   • FreeRTOS Firmware with ARM CMSIS-DSP 256-Point Real Hardware Audio FFT  │
│   • Multi-Hop BeevilMesh Routing (Dynamic TTL + Ring Deduplication)         │
│   • 2.0 µA Ultra-Low Power Deep Sleep (10+ Years Solar Battery Autonomy)   │
│   • Direct nRF_TEMP Silicon Die & Analog ADC Voltage Reading                 │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ (865.0625 MHz IN865 Sub-GHz LoRa)
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│        RASPBERRY PI CM4 LINUX EDGE GATEWAY SERVER (APIARY BASE STATION)     │
│   • Carrier: Antmicro CM4 Baseboard (48V PoE + MagJack + Waveshare SX1262)  │
│   • OS: Hardened Raspberry Pi OS 64-Bit (Debian Bookworm) + Read-Only Root  │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │ 5 LINUX SUPERPOWERS (DAEMON ECOSYSTEM):                             │   │
│   │  🛡️ 1. Power-Loss Immune OverlayFS: Permanent Read-Only Root + WAL  │   │
│   │  🤖 2. Local SLM Bee Advisor: Offline Conversational Q&A & Reports  │   │
│   │  📶 3. mDNS Captive Portal: Auto-popups dashboard at beevil.local   │   │
│   │  📈 4. Real-Time CUSUM Analytics: 72h early thermal decay detection│   │
│   │  🔒 5. WireGuard P2P Mesh: Encrypted regional multi-apiary cluster  │   │
│   │  🧠 6. 8.20ms INT8 TorchScript Engine: Multi-Modal Neural Network   │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                      (Local Wi-Fi Hotspot or Farm LAN)
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│              BEEVIL KNIEVEL PLAYDATE DASHBOARD / FIELD APPLICATION          │
│   • 100-Hive Health Matrix Grid (🟢 Healthy | 🟡 Warning | 🔴 Critical)    │
│   • Sub-Second Emergency Alarms (Queen Loss, Swarm Departure, Tilt >5°)     │
│   • Bio-Acoustic Spectrograms & 5-Point Frame Thermal Cross-Sections        │
│   • Interactive Mechanical Crank & 1-Bit Retro Dithered LCD Telemetry       │
│   • Zero Monthly SaaS Fees ($0.00 / month forever)                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ Production Model Registry & Edge Performance

| Model Identifier | Target Processor | Input Modalities | Binary Format & Size | Inference Latency | Target Accuracy / Recall |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`BeevilFusionNetEdge`** | **Raspberry Pi CM4 (BCM2711 Quad-Core)** | **Audio STFT + 16 Multi-Sensor Channels** | **18.90 MB** (`.pt` TorchScript INT8) | **8.20 ms** (ARM NEON SIMD) | **100.0% Queenless / 96.8% Acc** |
| **`BeevilEvidential1DCNN`** | **Nordic nRF52840 MCU** | **20 Multi-Sensor Feature Vectors** | **8.0 KB** (`.tflite` Micro) | **1.12 ms** (Cortex-M4F) | **99.8% Triage Recall** |

---

## 📐 13 Master Mathematical Models & Physics Derivations

All mathematical models and derivations are formally documented in [`docs/MATHEMATICAL_MODELS_AND_PHYSICS_PROOFS.md`](docs/MATHEMATICAL_MODELS_AND_PHYSICS_PROOFS.md):

1. **Sub-GHz LoRa RF Link Budget**: Friis path loss ($FSPL = 114.70\text{ dB}$ at $15\text{ km}$), noise floor ($-117.03\text{ dBm}$), and $+31.28\text{ dB}$ fade margin.
2. **Duty-Cycled Energy Budget**: 3-Phase deterministic charge integration ($70.13\text{ mA}\cdot\text{s/cycle}$), continuous average draw of $I_{\text{avg}} = \mathbf{233.78\ \mu\text{A}}$.
3. **Solar Equilibrium Proof**: $19.54\text{ minutes/day}$ of indirect cloudy daylight achieves perpetual battery autonomy ($10+\text{ year}$ lifespan).
4. **CMSIS-DSP 256-pt Real FFT**: Sampling at $f_s = 2.0\text{ kHz}$ ($\Delta f = \mathbf{7.8125\text{ Hz/bin}}$) isolating $225\text{ Hz}$ worker hum, $285\text{ Hz}$ queenless roar, and $380\text{ Hz}$ piping.
5. **Brood Nest Thermodynamics & CUSUM**: Spherical cluster radial heat conduction maintaining $+34.82^\circ\text{C} \pm 0.05^\circ\text{C}$ and 72-hour thermal collapse warning.
6. **32-Byte Packed Wire Serialization**: Byte-aligned `#pragma pack(push, 1)` telemetry struct with CCITT-FALSE CRC16 checksum.
7. **SHA-256 Merkle Provenance Tree**: Verification of honey harvest records against commercial adulteration.
8. **Aerodynamic Fanning & CO2 Gas Transport**: Mass airflow balance ($\dot{Q}_{\text{vent}} = 32.4\text{ m}^3/\text{hr}$) and Fick's 2nd Law equilibrium ($C_{\text{eq}} = 1,808.9\text{ ppm}$).
9. **24-Bit Differential Load Cell Mechanics**: Wheatstone bridge strain voltage and $5.96\text{ mg/count}$ quantization resolution with 2nd-order polynomial thermal compensation.
10. **Dynamic Wind Tip-Over & 3D Inertial Tilt**: Critical wind velocity $v_{\text{crit}} = \mathbf{90.01\text{ km/hr}}$ and 3D Euler angle calculations.
11. **Electrochemical Battery Impedance & Peukert's Law**: Winter sub-zero series resistance ($R_{\text{int}}(-15^\circ\text{C}) = 0.2142\ \Omega$) and pulse voltage drop ($\Delta V = 8.25\text{ mV}$).
12. **Shannon-Hartley & Time-on-Air (ToA)**: Channel capacity ($29.51\text{ kbps}$) and exact on-air transmission time ($ToA = \mathbf{71.94\text{ ms}}$).
13. **Acoustic Waveguide & Helmholtz Cavity**: Acoustic port resonance ($f_{\text{res}} = \mathbf{11.33\text{ kHz}} \gg 1.0\text{ kHz}$) ensuring flat biological frequency transfer.

---

## 🔌 Hardware Wiring & Pin Mapping (RAK4631 / nRF52840)

| Hardware Function | Nordic nRF52840 Pin | WisBlock Signal | Description |
|---|---|---|---|
| **I2C SDA** | `P0.13` | `WB_I2C1_SDA` | Sensors: TMP117 (`0x48`), SCD41 (`0x62`), BME688 (`0x76`) |
| **I2C SCL** | `P0.14` | `WB_I2C1_SCL` | 400 kHz Fast-Mode Clock |
| **I2S Microphone Data** | `P0.28` | `I2S_SD` | TDK INMP441 24-bit Digital Audio Stream |
| **I2S Bit Clock (SCK)** | `P0.29` | `I2S_SCK` | Audio Sampling Clock |
| **I2S Word Select (WS)** | `P0.30` | `I2S_WS` | 16 kHz Frame Synchronization |
| **Battery ADC Channel** | `P0.04` (AIN2) | `PIN_VBAT` | 12-bit SAADC with 1/2 Voltage Divider |
| **Sensor Power Gate** | `P0.17` | `WB_IO2` | MOSFET 3.3V Power Disconnect in Deep Sleep |
| **Green Status LED** | `P1.03` | `LED_GREEN` | Pulses during sensor acquisition |
| **Blue LoRa TX LED** | `P1.04` | `LED_BLUE` | Pulses during LoRa packet transmission burst |

---

## 🚀 Quickstart & Development

### 1. Run the Frontend Locally:
```bash
cd frontend
npm install
npm run dev
# Open http://localhost:3000 (Homepage) or http://localhost:3000/playdate (Console)
```

### 2. Compile and Flash Transmitter Firmware:
```bash
# Compile RAK4631 Arduino Sketch
arduino-cli compile --fqbn rakwireless:nrf52:WisCoreRAK4631Board firmware/beevil_rak4631_transmitter/

# Flash DFU Package over Serial (COM4/COM5)
adafruit-nrfutil dfu serial -pkg firmware/build/beevil_rak4631_transmitter.ino.zip -p COM5 -b 115200 --singlebank
```

---

## 📜 License
This project is licensed under the [MIT License](LICENSE).
