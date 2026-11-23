# Engineering Limitations & Scientific Disclosures

**Formal Scientific Constraints, Operational Boundaries, and Validity Scope**  
*Target: Computers and Electronics in Agriculture (Elsevier) / Journal Quality Standard*

---

## 1. Zero Field Deployment Constraint

> [!IMPORTANT]
> **Hard Constraint: Zero Apiary Deployment.**
> The monitoring system described in this repository was **not deployed in an active apiary**. No living honeybee colonies were instrumented in the field by the authors.
> 
> All empirical evidence presented in this work is strictly bounded by:
> 1. **Real public field recordings** collected and published by independent apiculture researchers in real colonies (specifically the longitudinal MSPB dataset [Zhu et al., *Sci. Data* 2024] and Zenodo Record 1321278);
> 2. **Physical bench characterization** and firmware validation on real hardware (Nordic nRF52840 / RAK4631 WisBlock, Semtech SX1262, Raspberry Pi 3B+ gateway);
> 3. **Analytical engineering models** clearly tagged as `ANALYTICAL_MODEL` (RF link budgets, analytical energy consumption).

---

## 2. Dataset Limitations & Leakage-Safe Evaluation

### 2.1 Acoustic Generalization & Hive Leakage
- **The Hive-Independence Gap**: In bee audio literature, randomly splitting audio frames across train and test sets yields deceptively high accuracies (>95%), because models memorize individual hive acoustic resonances and ambient noise signatures. When entire hives are held out (`StratifiedGroupKFold` by physical colony), performance drops significantly.
- **Microphone Placement**: All real-world acoustic datasets used were recorded by third parties with varying microphone distances from the central comb cluster. Microphone placement shifts introduce acoustic attenuation of up to 6 dB that can mask low-amplitude piping harmonics.
- **Geographic and Subspecies Constraints**: The public field datasets originate from European honeybee subspecies (*Apis mellifera*) managed in temperate climates (e.g., Québec, Canada). Subspecies indigenous to tropical climates (e.g. *Apis cerana indica*) exhibit higher wingbeat frequencies (240–310 Hz) requiring calibrated spectral band edges.

---

## 3. Algorithm & Firmware Boundaries

### 3.1 CUSUM Thermal Change-Point Detection
- **Diurnal Thermal Cycling**: Honeybee colonies thermoregulate brood between 34.0 °C and 35.5 °C. Diurnal ambient swings introduce periodic brood temperature oscillations. The detector evaluated in `paper_q1` is a Page CUSUM on residuals from a 24-hour robust rolling baseline. The firmware does not implement it yet: it runs an older variant with a fixed 34.82 °C baseline and half-rate decay (see 3.3). A fixed or latched baseline produces premature false alarms within 24 to 48 hours.
- **Lead Time Scope**: CUSUM detects progressive thermal degradation (e.g. queen failure leading to gradual brood neglect). Catastrophic mechanical damage or sudden pesticide collapse occurs faster than thermal drift lead times.

### 3.3 Firmware Implementation Status (v2.1.0-bench)
`firmware/src/main.cpp` is a bench telemetry logger, not the field node described in the manuscripts:
- It never sleeps: `loop()` polls `millis()`, the 3.3 V sensor rail is never switched off, and it reports every 5 s (`BENCHMARK_TELEMETRY_INTERVAL_MS`).
- It reads the TMP117, the MCU die temperature and the battery voltage. DS18B20, SCD41, BME688, LIS3DH, VEML7700, HX711 and the I2S microphone are not read: their frame fields carry sentinels and the eight acoustic bands are zero.
- No FFT, TinyML inference or LoRa transmission runs on the node. Frame v2 is assembled and printed over USB serial only.
- The CUSUM uses a fixed 34.82 °C baseline with k = 0.15 °C, h = 1.20 (per sample, not per hour) and half-rate decay, fed by the TMP117. It is not the rolling-baseline detector evaluated in `paper_q1` (k = 0.25 °C, h = 6.0, hourly samples) and has not been evaluated on data.
- CI does not build the firmware (it needs PlatformIO), so a successful build is not checked automatically.

### 3.2 Wire Protocol (Frame v1 vs. Frame v2)
- **Legacy Alert Collision (Frame v1)**: In legacy 33-byte payloads, high-nibble alert flags (0x80 CUSUM, 0x40 swarm, 0x20 low battery, 0x10 tilt) were bit-packed into the `tilt_deg` field. This caused gateway frame drops (`tilt > 90` rejected by Pydantic validation) and false tamper alerts.
- **Frame v2 Remediation**: Frame v2 expands the payload to 36 bytes, allocating an independent `uint8_t flags` byte and a `uint16_t seq` counter. At SF7/BW125/CR4/5, packet airtime is 77.06 ms.

### 3.4 Gateway Ingest Boundaries
- All-zero acoustic bands mean "no microphone" and switch the acoustic rules off (otherwise a zero queen band reads as queenlessness). Without audio only the thermal, CO2, tamper and node-flag rules can fire, and confidence is capped at 0.6.
- The `seq` counter is used to drop duplicates and late frames and to estimate delivery (`GET /api/v1/hives/{id}/link`). It is not replay protection: frames carry no authentication tag, and the REST API has no authentication. Do not expose the gateway to untrusted networks.
- The UART receiver has no frame delimiter or checksum and guesses frame boundaries by length (36 bytes, then 33). A dropped or extra byte, or the optional RSSI byte of the E22 module, would desynchronise it.
- The node-to-gateway link has not been tested end to end (see 4.3).

---

## 4. Hardware, Power & Propagation Boundaries

### 4.1 Quiescent Power & Measurement Status
- Power consumption figures in the manuscript are analytical estimates derived from component datasheets (Nordic nRF52840 active current 5.4 mA, Semtech SX1262 transmit current 45 mA at +14 dBm) and firmware cycle counts. The IEEE paper in `paper/` assumes 92 mA for the same radio, and the 18 µA sleep current has no documented source; neither value is measured, and the firmware has no sleep mode yet.
- Dynamic energy profiling on the physical node is scheduled as human bench task `H-PWR` using a Nordic Power Profiler Kit II (PPK2) or bench digital storage oscilloscope (DSO) with a precision shunt resistor.

### 4.2 RF Propagation & Link Budget
- Sub-GHz LoRa (865.0625 MHz, +14 dBm) coverage is evaluated using an analytical two-ray ground reflection model combined with ITU-R P.833-10 / Weissberger vegetation attenuation.
- In dense orchard foliage, attenuation limits practical communication range to approximately 0.62 km at SF7 and 0.96 km at SF10. Idealized free-space line-of-sight estimates (>100 km) do not represent agricultural ground conditions. Conducted bench attenuation verification is scheduled as human task `H-RF`.

### 4.3 Gateway Radio Interoperability (untested)
The gateway radio is an Ebyte E22-900T22S module behind a UART. Its manual exposes air-rate presets (0.3 to 62.5 kbps) instead of spreading factor, bandwidth and coding rate, expects both ends to share its configuration, and applies its own over-the-air encryption transform keyed by two configurable bytes. It does not state that it can receive raw SX1262 frames from another vendor's node. Every airtime and range figure in this repository assumes raw LoRa at SF7 to SF10 and 125 kHz, so the link must be shown to work on the bench (HT-03, with the deployed gateway) before any of them is quoted for the real system. The alternatives are an SPI SX1262 HAT or an SX1302 concentrator (RAK2287).

---

## 5. Physical Colony Interactions & Environmental Aging

### 5.1 Propolis and Wax Fouling
- Honeybees naturally coat foreign objects inside the brood box with propolis and beeswax within 2 to 4 weeks.
- The acoustic microphone port (INMP441) is protected by an acoustic breathable ePTFE membrane; however, long-term propolis deposition remains an operational factor requiring physical inspection.

### 5.2 Environmental Temperature Extremes
- Battery capacity derating occurs under severe winter conditions (< 0 °C), where internal electrochemical cell resistance increases by up to 30–40%.

---

## 6. Master Evidence Ledger

| Engineering Parameter | Status | Provenance Tag | Source Artifact |
| :--- | :--- | :--- | :--- |
| **Node Firmware Logic** | Unverified: no bring-up evidence recorded | `PENDING_HARDWARE_BENCH` | [`firmware/src/main.cpp`](firmware/src/main.cpp) |
| **DSP Golden Vectors** | Host Reference Parity | `NUMERICAL_SIMULATION` | [`paper_q1/feature_engine.py`](paper_q1/feature_engine.py) |
| **Wire Protocol (36B v2)** | Verified via Pytest | `BUILD_ARTIFACT` | [`tests/test_full_gateway_pipeline.py`](tests/test_full_gateway_pipeline.py) |
| **LoRa Airtime (77.06 ms)** | Computed (AN1200.13) | `ANALYTICAL_MODEL` | [`paper_q1/link_budget_eval.py`](paper_q1/link_budget_eval.py) |
| **INT8 Quantization Parity** | Evaluated (15 Folds) | `NUMERICAL_SIMULATION` | [`paper_q1/results/edge_quantization.json`](paper_q1/results/edge_quantization.json) |
| **Colony Strength Benchmark** | Evaluated (53 Hives) | `REAL_PUBLIC_DATASET` | [`paper_q1/results/main_results.json`](paper_q1/results/main_results.json) |
| **CUSUM Change Detection** | Evaluated (53 Hives) | `REAL_PUBLIC_DATASET` | [`paper_q1/results/cusum_eval.json`](paper_q1/results/cusum_eval.json) |
| **RF Canopy Link Budget** | Analytical (Two-Ray + ITU) | `ANALYTICAL_MODEL` | [`paper_q1/results/analytical_link_budget.json`](paper_q1/results/analytical_link_budget.json) |
| **Conducted RF Sensitivity** | Pending Bench Test | `PENDING_HARDWARE_BENCH` | [`paper_q1/human_tasks/03_conducted_lora_attenuation_test.md`](paper_q1/human_tasks/03_conducted_lora_attenuation_test.md) |
| **Dynamic Power Profiling** | Pending Bench Test | `PENDING_HARDWARE_BENCH` | [`paper_q1/human_tasks/02_hardware_bench_measurements.md`](paper_q1/human_tasks/02_hardware_bench_measurements.md) |

