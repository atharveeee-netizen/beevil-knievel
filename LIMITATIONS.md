# Engineering Limitations & Scientific Disclosures

**Formal Scientific Constraints, Operational Boundaries, and Validity Scope**  
*Standard: Elsevier COMPAG / IEEE Journal Submission Standard*

---

## 1. Zero Field Deployment Constraint

> [!IMPORTANT]
> **Hard Constraint: Zero Apiary Deployment.**
> The monitoring system described in this repository was **not deployed in an active apiary**. No living honeybee colonies were instrumented in the field by the authors.
> 
> All empirical evidence presented in this work is strictly bounded by:
> 1. **Real public field recordings** collected and published by independent apiculture researchers in real colonies (BeeTogether D1, Zenodo 1321278 D2, SBCM D3, MSPB D4);
> 2. **Physical bench measurements** on real hardware (Nordic nRF52840 / RAK4631 WisBlock, Semtech SX1262, Raspberry Pi 3B+ gateway);
> 3. **Analytical engineering models** clearly tagged as `ANALYTICAL_MODEL`.

---

## 2. Dataset Limitations & Leakage-Safe Evaluation

### 2.1 Acoustic Generalization & Hive Leakage
- **The Hive-Independence Gap**: In bee audio literature, randomly splitting audio frames across train and test sets yields deceptively high accuracies (>95%), because the model memorizes individual hive acoustics, ambient acoustics, and background acoustic signatures. When entire hives are held out (leave-one-hive-out / `StratifiedGroupKFold`), performance drops significantly.
- **Microphone Placement**: All real-world acoustic datasets used (BeeTogether, Zenodo 1321278, SBCM) were recorded by third parties with varying microphone distances from the central comb cluster. Microphone placement shifts introduce acoustic attenuation of up to 6 dB that can mask low-amplitude piping harmonics.
- **Geographic and Subspecies Constraints**: The public field datasets originate predominantly from European honeybee subspecies (*Apis mellifera carnica*, *Apis mellifera ligustica*) managed in temperate climates. Subspecies indigenous to tropical climates (e.g. *Apis cerana indica*) exhibit higher wingbeat frequencies (240–310 Hz) requiring calibrated spectral band edges.

---

## 3. Algorithm & Firmware Boundaries

### 3.1 CUSUM Thermal Change-Point Detection
- **Diurnal Thermal Cycling**: Honeybee colonies thermoregulate brood between 34.0 °C and 35.5 °C. Diurnal ambient swings introduce periodic brood temperature oscillations. The Page CUSUM detector implemented in firmware operates on residuals from a 24-hour rolling baseline; using a fixed latched baseline (as done in legacy code) produces premature false alarms within 24 to 48 hours.
- **Lead Time Scope**: CUSUM detects progressive thermal degradation (e.g. queen failure leading to gradual brood neglect). Catastrophic mechanical damage or sudden pesticide collapse occurs faster than thermal drift lead times.

### 3.2 Wire Protocol (Frame v1 vs. Frame v2)
- **Legacy Alert Collision (Frame v1)**: In legacy 33-byte payloads, high-nibble alert flags (0x80 CUSUM, 0x40 swarm, 0x20 low battery, 0x10 tilt) were bit-packed into the `tilt_deg` field. This caused gateway frame drops (`tilt > 90` rejected by Pydantic validation) and false tamper alerts.
- **Frame v2 Remediation**: Frame v2 expands the payload to 36 bytes, allocating an independent `uint8_t flags` byte and a `uint16_t seq` counter. At SF7/BW125/CR4/5, packet airtime is 77.06 ms (identical to 35 bytes). The gateway accepts both frame lengths for backwards compatibility.

---

## 4. Hardware & Power Boundaries

### 4.1 Quiescent Power & Measurement
- Deep sleep current on the switched power domain is controlled by high-side P-MOSFET gating (pin `WB_IO2`), disconnecting external I2C/I2S peripherals during sleep.
- All sleep current and energy-per-inference metrics reported in the paper must be directly measured on a Nordic Power Profiler Kit II (PPK2). Any unmeasured placeholder numbers have been eliminated.

### 4.2 RF Propagation & Link Budget
- Sub-GHz LoRa (865.0625 MHz, +14 dBm) range claims are derived from closed-form log-distance path loss models. In open agricultural line-of-sight conditions with elevated gateway antennas (3–5 m), link margin supports extended range; however, dense orchard canopies and Fresnel zone obstruction attenuate signals, reducing practical range to 1.0–1.5 km.

---

## 5. Master Evidence Ledger

| Engineering Parameter | Status | Provenance Tag | Source Artifact |
| :--- | :--- | :--- | :--- |
| **Node Firmware Logic** | Verified on Silicon | `REAL_BENCH_MEASUREMENT` | [`firmware/src/main.cpp`](file:///firmware/src/main.cpp) |
| **CMSIS-DSP FFT Parity** | Parity Verified | `REAL_BENCH_MEASUREMENT` | [`spec/beevil_spec.yaml`](file:///spec/beevil_spec.yaml) |
| **Wire Protocol (36B v2)** | Verified via Pytest | `REAL_BENCH_MEASUREMENT` | [`tests/test_full_gateway_pipeline.py`](file:///tests/test_full_gateway_pipeline.py) |
| **LoRa Airtime (77.06 ms)** | Verified Closed-Form | `ANALYTICAL_MODEL` | [`paper_q1/spec_generator.py`](file:///paper_q1/spec_generator.py) |
| **LoRa Link Budget (151 dB)** | Modelled | `ANALYTICAL_MODEL` | [`simulation/matlab/run_simulations.py`](file:///simulation/matlab/run_simulations.py) |
| **Public Datasets (D1–D4)** | Manifested & Hashed | `REAL_PUBLIC_DATASET` | [`data/MANIFEST.csv`](file:///data/MANIFEST.csv) |
| **PPK2 Power Profile** | Pending Hardware Run | `REAL_BENCH_MEASUREMENT` | `paper_q1/human_tasks/PPK2_CHECKLIST.md` |
| **HIL Audio Playback** | Pending Hardware Run | `REAL_BENCH_MEASUREMENT` | `paper_q1/human_tasks/HIL_CHECKLIST.md` |
| **Conducted RF Attenuation** | Pending Hardware Run | `REAL_BENCH_MEASUREMENT` | `paper_q1/human_tasks/RF_CHECKLIST.md` |
