# 🏛️ BEEVIL KNIEVEL — System Architecture & Topology

Beevil Knievel is an edge-native, cyber-physical apiculture monitoring platform designed for real-time hive health surveillance, acoustic swarming prediction, and precision colony diagnostics in remote agricultural environments.

---

## 🌐 End-to-End Three-Tier Architecture

```
+-------------------------------------------------------------------------------+
| TIER 1: IN-HIVE EMBEDDED EDGE SENSOR NODE (RAK4631 / Nordic nRF52840)         |
|                                                                               |
|  [TMP117 NIST Core]   [5x DS18B20 Gradient]   [SCD41 NDIR CO2]   [BME688 VOC]  |
|  [INMP441 I2S Mic]   [Phaeton 200kg Load]    [LIS3DH Tilt]      [VEML7700 Lux]|
|                           |                           |                       |
|                           v                           v                       |
|         +---------------------------------------------------+                 |
|         | On-Node CMSIS-DSP 256-pt Real FFT (7.8 Hz/bin)    |                 |
|         | Page's Recursive CUSUM Thermal Drift Filter       |                 |
|         | 4-Band Spectral Energy Ratio Decision Engine      |                 |
|         +---------------------------------------------------+                 |
|                                   |                                           |
|                                   v                                           |
|         +---------------------------------------------------+                 |
|         | 33-Byte Packed Binary Struct Serialization        |                 |
|         | Semtech SX1262 LoRa TX (865.0625 MHz, +14 dBm)    |                 |
|         +---------------------------------------------------+                 |
+-------------------------------------------------------------------------------+
                                    |
                                    | Sub-GHz LoRa RF (Single-Hop Star Uplink)
                                    | Range: 1.5 km canopy / 15 km Line-of-Sight
                                    v
+-------------------------------------------------------------------------------+
| TIER 2: HARDENED LINUX EDGE GATEWAY (Raspberry Pi 3B+ / BCM2837B0)            |
|                                                                               |
|         +---------------------------------------------------+                 |
|         | Waveshare SX1262 LoRa HAT (SPI spidev0.0 Ingest)  |                 |
|         | Read-Only Linux Root Filesystem (OverlayFS)       |                 |
|         +---------------------------------------------------+                 |
|                                   |                                           |
|                                   v                                           |
|         +---------------------------------------------------+                 |
|         | Binary Struct Unpacker (<Hh5hHHHHH B8B)           |                 |
|         | Pydantic Schema Validator & Anomaly Router        |                 |
|         | SQLite High-Concurrency Database (WAL Mode)       |                 |
|         | Diagnostic Random Forest Inference Engine         |                 |
|         | FastAPI REST & WebSocket Telemetry Broadcaster    |                 |
|         +---------------------------------------------------+                 |
+-------------------------------------------------------------------------------+
                                    |
                                    | Local Network / Cellular Backhaul (HTTP / WS)
                                    v
+-------------------------------------------------------------------------------+
| TIER 3: APICULTURE OPERATIONS & DIAGNOSTIC INTERFACES                         |
|                                                                               |
|  +-----------------------------------+   +----------------------------------+ |
|  | HiveOS Responsive Field PWA       |   | Playdate Retro Field Console     | |
|  | Next.js 14 / React 18 / Tailwind  |   | 1-Bit 400x240 Memory LCD         | |
|  | - 100-Hive Overview Grid          |   | - Mechanical Crank Time Scrubber | |
|  | - 5-Frame Thermal Heatmap Matrix  |   | - Web Audio FFT Synthesizer      | |
|  | - Bio-Acoustic Spectrogram        |   | - Physical Handheld Apiary Tool  | |
|  | - HoneyChain Provenance Log       |   | - 4 Tactical Telemetry Screens   | |
|  +-----------------------------------+   +----------------------------------+ |
+-------------------------------------------------------------------------------+
```

---

## 📡 Radio Topology Truth: Star vs. Mesh

* **Operational Reality:**
  * Field nodes transmit telemetry directly to the central gateway via a **single-hop LoRa star network** operating on **865.0625 MHz** (IN865 de-licensed band, WPC India).
  * Direct point-to-multipoint uplink provides deterministic latency (71.94 ms time-on-air) without multihop battery drain or routing packet overhead.
* **Firmware Design Capability:**
  * The codebase includes packet framing structures for multi-hop mesh forwarding (`beevil_mesh_protocol.h`), maintained as a design capability for future complex terrain deployments.

---

## 🔄 End-to-End Data Pipeline

1. **Physical Acquisition:**
   - Samples brood core temperature every 300 seconds using TI TMP117 ($\pm 0.1^\circ\text{C}$).
   - Acquires 5-point frame temperature gradient across hive combs via Maxim DS18B20 digital probes.
   - Samples 2000 Hz 24-bit audio via I2S DMA buffer using TDK INMP441 MEMS microphone.
   - Queries NDIR CO2 (SCD41), ambient VOC (BME688), total weight (Phaeton 200 kg), tilt (LIS3DH), and illuminance (VEML7700).
2. **On-Node Edge Processing:**
   - Computes a 256-point Real Fast Fourier Transform (`arm_rfft_fast_f32`) using hardware floating-point unit (FPU), extracting energy across 4 apicultural biological frequency bands.
   - Evaluates Page's cumulative sum (CUSUM) recursive filter to detect brood cooling anomalies prior to queen loss.
   - Reduces raw acoustic and sensor data into a strict **33-byte binary struct**.
3. **RF Transmission & Ingestion:**
   - Semtech SX1262 transmits the 33-byte payload at +14 dBm using Spreading Factor 7 (SF7) and 125 kHz bandwidth.
   - Gateway daemon (`gateway/lora_receiver.py`) reads the SPI frame, verifies payload length (33 bytes), and posts JSON to `http://127.0.0.1:8000/api/v1/telemetry`.
4. **Database & Persistence:**
   - FastAPI gateway server validates data with Pydantic and writes to `gateway/beevil_telemetry.db` in SQLite Write-Ahead Logging (WAL) mode with sub-7 ms write latency.
5. **Machine Learning Classification:**
   - Evaluates multi-sensor features against Scikit-Learn `RandomForestClassifier` (`cloud_advisor_model.joblib`), classifying colony state across 8 diagnostic categories.
6. **Live User Interfaces:**
   - Real-time WebSocket (`/api/v1/ws/live`) streams telemetry directly to the browser dashboard and Playdate emulator without page reloading.
