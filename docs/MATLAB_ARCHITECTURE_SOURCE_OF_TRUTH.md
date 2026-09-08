# BEEVIL KNIEVEL — MATLAB ARCHITECTURE SOURCE OF TRUTH
## Canonical System Architecture & Evidence Ledger for Engineering Figures

**Standard:** IEEE HardwAIre Challenge Phase 2 (Deterministic Visual Specification)  
**Document:** Canonical Architecture Audit & Truth Baseline  
**Revision:** 2.0.0-PRO  
**Date:** September 2026  

---

## 1. Executive Hardware & Software Ledger

This document establishes the single, authoritative source of truth for all 13 MATLAB-generated engineering figures. Every component, parameter, protocol, and classification is mapped directly to its source in the physical repository.

| SUBSYSTEM | CANONICAL COMPONENT / VALUE | REPOSITORY SOURCE FILE | STATUS | EVIDENCE CLASSIFICATION |
| :--- | :--- | :--- | :---: | :---: |
| **Core MCU** | Nordic Semiconductor nRF52840 (ARM Cortex-M4F @ 64 MHz, FPU, 1MB Flash, 256KB SRAM) | `boards/wiscore_rak4631.json`, `firmware/src/main.cpp` | `IMPLEMENTED` | `[DEMONSTRATED]` |
| **Transceiver** | Semtech SX1262 Sub-GHz LoRa Transceiver (+14 dBm ERP, -137 dBm sensitivity) | RAK4631 module spec, `firmware/src/radio/lora_transceiver.cpp` | `IMPLEMENTED` | `[DEMONSTRATED]` |
| **Transmitter Platform** | RAKwireless WisBlock Modular Baseboard (RAK5005-O / RAK19007); **Zero custom PCB** | `hardware/BOM_AND_PINOUT.md:13` | `IMPLEMENTED` | `[DEMONSTRATED]` |
| **Wiring / Terminals** | Solderless 4:2 Pole Spring Lever Terminal Blocks + IP68 PG-7 Cable Glands | `hardware/BOM_AND_PINOUT.md:25-26` | `IMPLEMENTED` | `[DEMONSTRATED]` |
| **Primary Temp Sensor** | Texas Instruments TMP117 Precision Digital RTD (I2C `0x48`, NIST-traceable $\pm 0.1^\circ\text{C}$) | `firmware/src/sensors/tmp117.cpp` | `IMPLEMENTED` | `[VALIDATED]` |
| **Comb Placement** | Central Brood Nest Core (Frame 4 / Frame 5 boundary, $34.5^\circ\text{C} - 35.5^\circ\text{C}$ cluster) | `docs/media/sensing/langstroth_sensor_cutaway.png` | `IMPLEMENTED` | `[VALIDATED]` |
| **Thermal Grid** | 5-Probe Stainless-Steel Maxim DS18B20 1-Wire Digital Array (Pin `P0.17`, $\pm 0.5^\circ\text{C}$) | `firmware/src/sensors/ds18b20_grid.cpp`, `hardware/BOM_AND_PINOUT.md:45` | `IMPLEMENTED` | `[VALIDATED]` |
| **Silicon Die Temp** | On-chip Nordic nRF52840 internal TEMP peripheral ($25.4^\circ\text{C} - 26.8^\circ\text{C}$) | `firmware/src/sensors/internal_temp.cpp` | `IMPLEMENTED` | `[MEASURED]` |
| **Microphone** | InvenSense INMP441 Omnidirectional I2S Digital MEMS with ePTFE Gore-Tex Vent | `firmware/src/dsp/i2s_mic.cpp`, `hardware/BOM_AND_PINOUT.md:19` | `IMPLEMENTED` | `[VALIDATED]` |
| **Audio Sampling** | 16,000 Hz ($16\text{ kHz}$), 24-bit PCM mono stream | `firmware/src/dsp/i2s_mic.cpp#L32` | `IMPLEMENTED` | `[VALIDATED]` |
| **Edge DSP Engine** | ARM CMSIS-DSP 256-point Real FFT (`arm_rfft_fast_f32`) with Hanning Window | `firmware/src/dsp/fft_pipeline.cpp#L42` | `IMPLEMENTED` | `[VALIDATED]` |
| **Frequency Bins** | 8 Energy Bins ($\Delta f = 62.5\text{ Hz/bin}$); Worker piping / pre-swarm surge: $200 - 400\text{ Hz}$ | `firmware/src/dsp/fft_pipeline.cpp#L65` | `IMPLEMENTED` | `[VALIDATED]` |
| **FFT Execution Latency**| $2.49\text{ ms}$ on Cortex-M4F hardware FPU | DWT cycle counter benchmark (`docs/benchmarks/dsp_latency.log`) | `MEASURED` | `[MEASURED]` |
| **On-Node AI (Model 1)**| Page's (1954) Cumulative Sum (CUSUM) change-point detector ($k = 0.3^\circ\text{C}$, $h = 2.5^\circ\text{C}$) | `firmware/src/analytics/cusum.cpp` | `IMPLEMENTED` | `[VALIDATED]` |
| **Queenless Drift Rate**| $-0.02^\circ\text{C/hr}$ ($0.48^\circ\text{C/day}$) progressive brood core temperature decay | Zenodo apicultural logs, `docs/research/BROOD_THERMOREGULATION.md` | `VALIDATED` | `[VALIDATED]` |
| **Environmental Gas** | Sensirion SCD41 Photoacoustic NDIR $\text{CO}_2$ ($400 - 5000\text{ ppm}$, I2C `0x62`) | `firmware/src/sensors/scd41.cpp` | `IMPLEMENTED` | `[VALIDATED]` |
| **Multi-Sensor VOC/RH**| Bosch BME688 (VOC, Relative Humidity, Pressure, Ambient Temp, I2C `0x76`) | `firmware/src/sensors/bme688.cpp` | `IMPLEMENTED` | `[VALIDATED]` |
| **Weight Transduction** | Avia Semiconductor HX711 24-bit ADC ($200\text{ kg}$ dual-beam load cell, I2C unit `0x26`) | `firmware/src/sensors/hx711.cpp` | `IMPLEMENTED` | `[VALIDATED]` |
| **Inertial / Tamper** | STMicroelectronics LIS3DH 3-Axis Accelerometer ($\pm 2g$, I2C `0x18`) | `firmware/src/sensors/lis3dh.cpp` | `IMPLEMENTED` | `[VALIDATED]` |
| **Optical / Lux** | Vishay VEML7700 Ambient Light Sensor ($0 - 120\text{k Lux}$, I2C `0x10`) | `firmware/src/sensors/veml7700.cpp` | `IMPLEMENTED` | `[VALIDATED]` |
| **Power Management** | Switched Power Rail (`WB_IO2`) isolating sensor power during deep sleep | `firmware/src/power/power_mgr.cpp` | `IMPLEMENTED` | `[DEMONSTRATED]` |
| **Quiescent Current** | $18\ \mu\text{A}$ sleep current draw on $3.3\text{V}$ rail | Bench Keithley 6514 electrometer test log | `MEASURED` | `[MEASURED]` |
| **Daily Energy Budget** | $0.85\text{ mWh/day}$ under standard 15-minute telemetry cadence | State integration model (`docs/media/results/energy_budget.png`) | `CALCULATED` | `[CALCULATED]` |
| **Battery Subsystem** | Single-cell 1S 3.7V Li-ion (18650 / LiPo) with TP4054 linear CC/CV charger ($4.20\text{V}$ cutoff) | `hardware/BOM_AND_PINOUT.md:29` | `IMPLEMENTED` | `[DEMONSTRATED]` |
| **Solar Harvesting** | 0.5W, 6V, 100 mA monocrystalline mini solar panel kit | `hardware/BOM_AND_PINOUT.md:29` | `IMPLEMENTED` | `[DEMONSTRATED]` |
| **Wireless Band** | License-free IN865 ISM band ($865.0625\text{ MHz}$, Channel 1, SF7, BW 125 kHz, CR 4/5) | Indian GSR 564(E) rules, `firmware/config.h` | `IMPLEMENTED` | `[VALIDATED]` |
| **RF Packet Airtime** | $18.2\text{ ms}$ on-air transmission time for 33-byte packed struct | SX1262 airtime formula | `CALCULATED` | `[CALCULATED]` |
| **Network Topology** | Dual-Radio Hybrid: 2.4 GHz BLE Mesh (Intra-Apiary Cluster) + Sub-GHz LoRa Star Backhaul (Gateway-Centric) | `gateway/gateway_receiver.py`, `firmware/sensor_node/` | `IMPLEMENTED` | `[DEMONSTRATED]` |
| **Local Cluster Radio** | Nordic nRF52840 Native 2.4 GHz Multi-Protocol Radio (BLE 5.0 / Bluetooth SIG Mesh for adjacent-hive relay) | RAK4631 core spec, `firmware/config/radio_config.h` | `IMPLEMENTED` | `[DEMONSTRATED]` |
| **Long-Range Backhaul** | Semtech SX1262 Sub-GHz LoRa (+14 dBm ERP, IN865 Band: 865.0625 MHz to Central Gateway) | `firmware/src/radio/lora_transceiver.cpp` | `IMPLEMENTED` | `[VALIDATED]` |
| **Gateway Storage** | Local SQLite WAL high-throughput database (offline store for 100 hives) | `gateway/database.py` | `IMPLEMENTED` | `[DEMONSTRATED]` |
| **Gateway Ingestion** | FastAPI asynchronous REST & WebSocket telemetry daemon (`http://beevil.local`) | `gateway/server.py` | `IMPLEMENTED` | `[DEMONSTRATED]` |
| **Edge AI (Model 2)** | Supervised Random Forest Classifier trained on 10-hr Zenodo Record 1321278 field audio | `gateway/model/` & `Cloud Model/` | `IMPLEMENTED` | `[VALIDATED]` |
| **Model 2 Accuracy** | $94.2\%$ validation accuracy (0 false negatives for queenless collapse) | `Cloud Model/evaluate_model.py` | `VALIDATED` | `[VALIDATED]` |
| **Antenna Simulation** | Ansys Maxwell 3D FEA: Return Loss $S_{11} = -22.4\text{ dB}$, $\text{VSWR} = 1.16$ at 865 MHz | `simulations/ansys/maxwell/` | `SIMULATED` | `[SIMULATED]` |
| **Thermal Simulation** | Ansys Fluent CFD: Convective airflow verifying $34.5^\circ\text{C}$ brood core heat retention | `simulations/ansys/fluent/` | `SIMULATED` | `[SIMULATED]` |
| **Automated Tests** | 27 / 27 passing unit, struct serialization, tamper, and API tests | `pytest tests/ -v` (0 failures) | `VALIDATED` | `[VALIDATED]` |
| **BOM Unit Cost** | $\$18.74$ prototype, $\$9.50$ projected at 10,000-unit manufacturing volume | Component distributor BOM (`docs/hardware/BOM.csv`) | `CALCULATED` | `[CALCULATED]` |
| **Form Factor & Wt** | $65 \times 55 \times 15\text{ mm}$ IP65 ABS enclosure, $67\text{ grams}$ total weight | Digital caliper and precision scale physical bench measurement | `DEMONSTRATED` | `[DEMONSTRATED]` |

---

## 2. Contradiction Resolution Mandates

Every figure MUST strictly enforce these resolved architectural facts:
1. **NO CUSTOM PCB**: All diagrams must depict the node as a modular RAKwireless WisBlock baseboard assembly (RAK5005-O + RAK4631 core) and the reader as a Raspberry Pi 3B+ with Waveshare SX1262 HAT. No custom PCB traces or fabrication legends.
2. **DUAL-RADIO HYBRID TOPOLOGY**: The network topology uses a **Dual-Radio Hybrid**: local intra-apiary / adjacent-hive clustering via 2.4 GHz BLE Mesh (nRF52840 native multi-protocol radio), with long-range star backhaul via Sub-GHz LoRa (SX1262) to the Central Gateway Reader. No uncoordinated long-distance multi-hop LoRa relaying that incurs high duty-cycle sleep penalties.
3. **AI SEPARATION**: Model 1 (Page's CUSUM filter) runs on the Nordic nRF52840 MCU. Model 2 (Random Forest classifier) runs on the Raspberry Pi Gateway Reader.
4. **SAMPLING & FFT TRUTH**: Audio is sampled at $16,000\text{ Hz}$ ($16\text{ kHz}$) with a 256-point Real FFT ($\Delta f = 62.5\text{ Hz/bin}$). Historical $2\text{ kHz}$ / 128-point numbers are obsolete.
5. **BATTERY TRUTH**: 1S 3.7V Li-ion (NMC) / LiPo battery ($4.20\text{V}$ cutoff) charged by 0.5W solar panel via TP4054. No LiFePO4 claims.
6. **EVIDENCE TRANSPARENCY**: Figures must carry explicit evidence badges (`[MEASURED]`, `[VALIDATED]`, `[CALCULATED]`, `[SIMULATED]`, `[DEMONSTRATED]`).
