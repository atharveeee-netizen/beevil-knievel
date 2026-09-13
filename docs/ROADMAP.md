# 🗺️ BEEVIL KNIEVEL — Engineering Development Roadmap

This document outlines the phased engineering roadmap for transitioning the Beevil Knievel cyber-physical apiculture monitoring platform from its current bench-validated prototype state (TRL 4/5) to commercial agricultural scale.

---

## 📅 Roadmap Overview

```
Phase 1: Laboratory Prototype (TRL 4) ➔ [COMPLETED]
Phase 2: Local Field Pilot & Indian Bee Acoustic Campaign ➔ [CURRENT TARGET / 2026-Q4]
Phase 3: Edge Deep Learning Quantization & Mesh Extension ➔ [PLANNED / 2027-Q1]
Phase 4: Commercial Apiary Fleet & Agricultural Certification ➔ [FUTURE / 2027-Q2+]
```

---

## Phase 1: Bench Prototype & Bring-Up 🟢 [COMPLETED]

* [x] **Sub-GHz LoRa RF Stack:** Semtech SX1262 integration on 865.0625 MHz (India WPC de-licensed band) at +14 dBm.
* [x] **Binary Wire Protocol:** Strict 33-byte packed telemetry struct (`<Hh5hHHHHH B8B`) with sentinel handling for unconnected sensors.
* [x] **Multi-Sensor Bus Architecture:** I2C bus scanner (TMP117, SCD41, BME688, LIS3DH, VEML7700), 1-Wire DS18B20 5-probe thermal array, I2S INMP441 audio DMA.
* [x] **On-Node DSP Engine:** 256-point Real FFT (`arm_rfft_fast_f32`, 7.8125 Hz bin resolution, 1.12 ms latency) and Page's CUSUM thermal drift anomaly detector.
* [x] **Linux Edge Gateway:** Raspberry Pi 3B+ daemon + SQLite WAL database with 100-hive capacity and FastAPI REST/WebSocket endpoints.
* [x] **Web Dashboard & Diagnostic UI:** Next.js 14 HiveOS web app and 1-bit monochrome retro Playdate console emulator with live Web Audio synthesizer.
* [x] **Automated Testing Suite:** 27 unit and integration tests passing in CI/CD pipeline (`pytest tests/ -v`).
* [x] **Multiphysics Validation:** 11 ANSYS structural, thermal, aerodynamic, and RF simulations.

---

## Phase 2: Local Field Pilot & Acoustic Recording Campaign 🟡 [CURRENT TARGET / Q4 2026]

* [ ] **Regional Indigenous Acoustic Campaign:**
  * Collect high-fidelity acoustic recordings from native Indian honeybee colonies (*Apis cerana indica*, *Apis dorsata*) in Gujarat / Gandhinagar apiaries.
  * Establish labeled datasets for indigenous swarm departure, virgin queen piping, and monsoon ventilation fanning.
* [ ] **Mechanical Enclosure Weatherproofing:**
  * Transition from PLA 3D-printed enclosure to injection-molded UV-stabilized polycarbonate (PC-ABS) with IP67 silicone sealing gaskets.
  * Field-test ePTFE acoustic breathable membranes against long-term propolis and beeswax deposition.
* [ ] **Load Cell Creep Calibration:**
  * Implement long-term software drift compensation for the Phaeton 200 kg load cell using ambient relative humidity differential models.
* [ ] **5-Hive Live Pilot:**
  * Deploy 5 physical monitoring nodes in a local apiary to benchmark multi-week continuous battery drain and solar harvesting balance under real daylight conditions.

---

## Phase 3: Edge Deep Learning & Mesh Extension ⚪ [PLANNED / Q1 2027]

* [ ] **1D-CNN Quantization onto nRF52840:**
  * Train the 75.4 KB 1D-CNN architecture on the newly collected indigenous bee dataset.
  * Quantize weights to INT8 via TensorFlow Lite for Microcontrollers (TFLM) or ARM CMSIS-NN, targeting < 15 ms inference on Cortex-M4F.
* [ ] **Multi-Hop LoRa Mesh Routing:**
  * Activate full mesh forwarding logic defined in `beevil_mesh_protocol.h` to enable multi-hop relaying for apiaries located in hilly or obstructed terrain.
* [ ] **Gateway TorchScript Multimodal Model:**
  * Export and deploy `beevil_fusion_net_edge_torchscript.pt` to the Raspberry Pi gateway for joint bio-acoustic and environmental time-series inference.

---

## Phase 4: Commercial Apiary Fleet & Industrial Certification ⚪ [FUTURE / Q2 2027+]

* [ ] **Regulatory EMC / Radio Compliance:**
  * Complete formal Indian TEC (Telecommunication Engineering Centre) and WPC equipment type approval for commercial distribution.
* [ ] **Mass Production PCB Assembly (PCBA):**
  * Consolidate the modular WisBlock setup into a single monolithic 4-layer PCB with conformal coating for mass production.
* [ ] **Cellular NB-IoT / Satellite Fallback:**
  * Provide optional cellular NB-IoT (Quectel BG95) or satellite uplink (Iridium Short Burst Data) for remote migratory beekeepers operating beyond cellular/gateway coverage.
