# BEEVIL KNIEVEL — FRONTEND TRUTH MATRIX
**Project:** BEEVIL KNIEVEL — Sub-GHz Acoustic & Brood Telemetry for Commercial Apiaries  
**Competition:** IEEE HardwAIre Challenge Phase 2  
**Standard:** SYZYGY Engineering Truth Taxonomy & Zero Fabrication Standard  
**Last Updated:** September 2026  

---

## 1. Evidentiary Taxonomy & Allowed Presentation

Every technical statement, metric, hardware component, and performance indicator displayed on any frontend surface must be classified into one of the following deterministic tiers:

| Status | Definition | Allowed Presentation on Frontend | Prohibited Presentation |
| :--- | :--- | :--- | :--- |
| **`REAL_SILICON`** | Physical register read on real bench hardware | "Measured on-chip silicon register via USB CDC" | Presenting unpopulated I2C sensors as real |
| **`MEASURED`** | Empirically verified via physical instruments or bench code | State exact measurement method, instrument, and value | Claiming lab bench measurements are field deployments |
| **`VALIDATED`** | Proven against automated test suites / benchmarks | Cite passing automated test script or peer-reviewed standard | Claiming untracked benchmarks or unverified models |
| **`DEMONSTRATED`** | Functional in bench prototype environment | "Demonstrated on Evaluation Node (Bench Prototype)" | Calling a bench demonstration a field deployment |
| **`CALCULATED`** | Derived mathematically from physics/RF equations | State exact formula, standard (e.g., ITU-R P.833-9), or MATLAB script | Masking calculated theoretical values as empirical field range |
| **`SIMULATED`** | Solved in computational tools (ANSYS, MATLAB ODE) | Must be explicitly labeled "SIMULATED (ANSYS / MATLAB)" | Presenting simulation plots as real physical sensor measurements |
| **`SYNTHETIC`** | Artificially generated for load testing or demonstration | Must be labeled "SYNTHETIC / DEMO DATA" | Displaying synthetic data as live telemetry |
| **`ESTIMATED`** | Engineering extrapolation from empirical baselines | Must state baseline and margin of uncertainty | Presenting estimates as hard calibrated facts |
| **`PROPOSED`** | Architectural target for future hardware revisions | Must be labeled "PROPOSED / CONCEPTUAL" | Presenting future designs as current hardware |

---

## 2. Core System Architecture Claims vs. Provenance

| Subsystem | Claim Statement | Source in Repository | Evidentiary Status | Allowed Frontend Presentation |
| :--- | :--- | :--- | :---: | :--- |
| **MCU** | Nordic nRF52840 (ARM Cortex-M4F @ 64 MHz, 1MB Flash, 256KB RAM) | `firmware/platformio.ini`, `boards/wiscore_rak4631.json` | **`REAL_SILICON`** | Validated core compute engine for sensor node |
| **Radio** | Semtech SX1262 LoRa transceiver (865/868/915 MHz, SPI bus) | `firmware/src/radio_sx1262.cpp`, `hardware/schematics/` | **`REAL_SILICON`** | Validated sub-GHz physical transceiver |
| **Network Topology** | Multi-Node Star / Gateway Topology (Single-hop LoRa uplink to central base station) | `firmware/src/main.cpp`, `simulation/matlab/06_lora_communication.m` | **`VALIDATED`** | Multi-node star backhaul. (No multi-hop mesh routing claimed) |
| **Technician Link** | Bluetooth Low Energy 5.0 for adjacent local inspection and configuration | `firmware/src/ble_service.cpp` | **`DEMONSTRATED`** | Direct 1-to-1 technician smartphone link |
| **Temperature** | TI TMP117 precision digital temperature sensor (±0.1°C accuracy, 0.0078°C resolution) | `firmware/src/sensors_i2c.cpp`, `docs/CANONICAL_BOM.md` | **`VALIDATED`** | "Precision digital temperature sensor" (Never RTD, never NIST-traceable without calibration cert) |
| **Frame Gradients** | 5x Maxim DS18B20 1-Wire sensors across Frames 1 to 5 | `firmware/src/sensors_onewire.cpp` | **`VALIDATED`** | 5-zone vertical cross-frame thermal profile |
| **Acoustic Sensor** | InvenSense INMP441 omnidirectional I2S digital MEMS microphone (24-bit PCM) | `firmware/src/audio_i2s.cpp`, `hardware/schematics/` | **`VALIDATED`** | I2S acoustic transducer for continuous hive acoustics |
| **Audio Processing** | 16 kHz acquisition → decimation by 8 → 2 kHz analysis rate → 256-pt CMSIS-DSP FFT | `firmware/src/dsp_pipeline.cpp`, `simulation/matlab/05_acoustic_dsp.m` | **`VALIDATED`** | 256-pt Real FFT yielding 7.8125 Hz bin resolution across 4 acoustic bands |
| **CO₂ / Environment** | Sensirion SCD41 photoacoustic NDIR (400–5000 ppm) + Bosch BME688 (Baro/RH/VOC) | `firmware/src/sensors_i2c.cpp` | **`VALIDATED`** | Metabolic respiration tracking and barometric weather monitoring |
| **Weight** | Avia Semiconductor HX711 24-bit ADC + 4-load-cell Wheatstone bridge scale | `firmware/src/scale_hx711.cpp` | **`VALIDATED`** | Gross hive weight tracking for honey surplus and foraging dynamics |
| **Motion / Tamper** | STMicroelectronics LIS3DH 3-axis ultra-low-power accelerometer | `firmware/src/sensors_i2c.cpp` | **`VALIDATED`** | Comb vibration, wind disturbance, and hive tamper detection |
| **Light Sensor** | Vishay VEML7700 high-accuracy ambient light sensor (0–120,000 lux) | `firmware/src/sensors_i2c.cpp` | **`VALIDATED`** | Entrance foraging activity and solar diurnal cycle correlation |
| **Battery Chemistry** | 1S 3.7V Li-ion NMC 18650 cell (3500 mAh, 12.95 Wh, 3.27V cutoff to 4.20V full) | `docs/CANONICAL_BOM.md`, `firmware/src/power_mgmt.cpp` | **`VALIDATED`** | 1S 3.7V Li-ion NMC (Never LiFePO4) |
| **Solar Harvesting** | 0.5W monocrystalline panel (5.5V open circuit, ~90 mA peak) + TP4054 CC/CV charger | `hardware/schematics/`, `docs/CANONICAL_BOM.md` | **`VALIDATED`** | Auxiliary solar replenishment for continuous operation |
| **Power Duty Cycle** | 300s cycle: 289.5s deep sleep (2.0 μA) + 10.5s active sample (11.4 mA) + 2s LoRa TX (120 mA) | `simulation/matlab/04_embedded_processing.m` | **`CALCULATED`** | Average current: ~1.2 mA; 14.8 months runtime without solar |
| **Base Station SBC** | Raspberry Pi 3 Model B+ (Broadcom BCM2837B0 quad-core ARM Cortex-A53 @ 1.4 GHz) | `gateway/config.yaml`, `gateway/main.py` | **`VALIDATED`** | Configured / assembled edge base station reader (No external 6 TOPS NPU) |
| **Radio Gateway HAT**| Waveshare SX1262 LoRa Gateway HAT connected via SPI (/dev/spidev0.0) | `gateway/radio_receiver.py` | **`VALIDATED`** | Dedicated hardware LoRa receiver interface |
| **Edge Storage** | SQLite 3 with Write-Ahead Logging (WAL) and OverlayFS read-only rootfs | `gateway/db.py`, `gateway/overlayfs_setup.sh` | **`VALIDATED`** | Sub-7ms commit latency, power-cut proof, zero cloud reliance |
| **RF LoRa Range (LOS)**| 4.2 km Line-of-Sight at SF7, BW 125 kHz (+26.1 dB link margin) | `simulation/matlab/rf_link_budget_and_range.m` | **`CALCULATED`** | Free-space path loss model calculation |
| **RF Range (Canopy)**| 1.5 km in dense pine forest | `simulation/matlab/rf_link_budget_and_range.m` | **`CALCULATED`** | ITU-R P.833-9 foliage attenuation calculation |
| **RF Hive Loss** | -28.65 dB S11 return loss, 1.85 dBi gain through comb | `simulations/ansys/hfss_hive_penetration.aedt` | **`SIMULATED`** | ANSYS HFSS 3D electromagnetic simulation |
| **Gateway Thermal** | 58.4°C BCM2837 junction temp at 45°C ambient (26.6°C safety margin) | `simulations/ansys/icepak_gateway_thermal.tzr` | **`SIMULATED`** | ANSYS Icepak computational fluid dynamics simulation |
| **Drop Shock** | 18.4 MPa Von Mises stress under 48.5g impact (3.53x factor of safety) | `simulations/ansys/mechanical_drop_shock.wbpj` | **`SIMULATED`** | ANSYS Mechanical transient dynamic finite element simulation |
| **In-Hive Aerodynamics**| 0.52 m/s flow velocity, 98.4% metabolic CO2 purge during fanning | `simulations/ansys/fluent_hive_aerodynamics.cas` | **`SIMULATED`** | ANSYS Fluent Navier-Stokes computational fluid dynamics |
| **Bench Bring-Up** | Die temp: 26.25°C, Battery: 4015 mV (86.8% SOC), Absent sensors: 0xFFFF sentinel | `firmware/src/main.cpp`, physical bring-up logs | **`REAL_SILICON`** | Real silicon registers on bench prototype; absent sensors reported as NOT_CONNECTED |
| **BOM Cost** | $64.54 USD (₹5,380 INR) total modular COTS bill of materials | `docs/CANONICAL_BOM.md` | **`VALIDATED`** | COTS pricing ledger (RAK4631, baseboard, sensors, enclosure) |

---

## 3. Strict Prohibitions & Purged Statements

The following claims are completely prohibited from appearing on any frontend surface:
1. **NO "RTD" or "NIST-Traceable" claims for TMP117:** It is a precision digital sensor with ±0.1°C factory accuracy, but does not carry an individual NIST calibration certificate.
2. **NO "6 TOPS NPU" or "Hailo-8 / Google Coral" claims:** The gateway uses standard Raspberry Pi 3B+ CPU inference.
3. **NO "Mesh Routing" claims:** The node-to-gateway architecture is a single-hop LoRa Star Topology.
4. **NO "LiFePO4" claims:** The battery chemistry is strictly 1S 3.7V Li-ion NMC 18650.
5. **NO "Field Deployed in 500 Hives" claims:** The physical hardware is an Evaluation Node (Bench Prototype). Field deployment across hundreds of hives is an architectural target.
6. **NO "SHT45" sensor mentions:** The environmental sensor is the Bosch BME688.
7. **NO "E-commerce pre-order" buttons, prices, or checkout carts:** This is an IEEE engineering research prototype, not a commercial gadget.
