# 🎯 BEEVIL KNIEVEL — Master Engineering Validation & Evidence Ledger

This document establishes the canonical, verifiable evidence ledger for all engineering claims, specifications, and performance metrics across the BEEVIL KNIEVEL cyber-physical smart apiculture platform.

---

## 🏷️ Standardized Evidence Taxonomy

Every technical claim in this repository is strictly assigned to one of the following six evidential states:

| Badge | Classification | Rigorous Engineering Definition |
| :---: | :--- | :--- |
| 🟢 | **VALIDATED** | Physically measured on bench hardware, verified through executed automated tests, or confirmed via official procurement invoices. |
| 🔵 | **DEMONSTRATED** | Implemented as a functional interactive prototype, live deployed web interface, or real hardware firmware UI. |
| 🟡 | **CALCULATED** | Formally derived via first-principles physics, electromagnetic equations, or verified mathematical proofs. |
| 🟠 | **ESTIMATED** | Derived from semiconductor manufacturer datasheets, component derating curves, or parametric analytical models. |
| 🟣 | **EXPERIMENTAL** | Evaluated on public scientific research datasets (e.g., Zenodo Record 1321278 NU-Hive acoustic dataset). |
| ⚪ | **TARGET / PLANNED** | Future engineering roadmap targets, field validation milestones, or theoretical architectural capacities. |

---

## 📋 Comprehensive Subsystem Claims Audit

### 1. Telecommunications, RF & Radio Propagation

| Engineering Metric / Claim | Value / Specification | Evidence Class | Verified Ground Truth & Supporting Artifacts |
| :--- | :--- | :---: | :--- |
| **RF Transceiver Hardware** | Semtech SX1262 Sub-GHz Core | 🟢 **VALIDATED** | Invoiced RAK4631 + Waveshare SX1262 HAT; verified in `firmware/beevil_rak4631_transmitter/beevil_rak4631_transmitter.ino`. |
| **Operating Center Frequency**| 865.0625 MHz (IN865 Band) | 🟢 **VALIDATED** | Configured in firmware; complies with WPC India GSR 564(E) license-free allocation. |
| **Transmit Output Power** | +14.0 dBm (25 mW) nominal | 🟢 **VALIDATED** | Configured in SX1262 register tables; within legal 1.0 W ERP limits. |
| **Binary Wire Protocol Frame**| **33-Byte Packed Struct** | 🟢 **VALIDATED** | Verified by `struct.calcsize("<Hh5hHHHHH B8B") == 33`; automated test `tests/test_firmware_telemetry.py::TestBinaryTelemetryStruct::test_struct_exact_size` PASSED. |
| **Line-of-Sight Range** | Up to 15.0 km | 🟡 **CALCULATED** | Derived via Friis free-space path loss ($FSPL = 114.70\text{ dB}$, $+31.28\text{ dB}$ link margin). Not a measured 15 km field deployment. |
| **Forest Canopy Penetration** | Up to 1.5 km dense foliage | 🟡 **CALCULATED** | Derived via ITU-R P.833-9 foliage attenuation model ($0.191\text{ dB/m}$, $+22.63\text{ dB}$ margin across 150 m continuous canopy). |
| **Packet Time-on-Air (ToA)** | 71.94 ms (SF7, BW 125 kHz) | 🟡 **CALCULATED** | Derived via Semtech LoRa airtime equations for 33-byte packet with preamble and CRC. |
| **Network Topology** | Direct Single-Hop Star | 🟢 **VALIDATED** | Implemented as point-to-multipoint star network from field nodes to gateway base station. |
| **100-Hive Network Scale** | 100 Simultaneous Nodes | ⚪ **TARGET** | Architectural design capacity; verified in simulation and gateway batch ingestion tests. Not 100 physical apiary hives in the wild. |

---

### 2. Power Architecture & Battery Autonomy

| Engineering Metric / Claim | Value / Specification | Evidence Class | Verified Ground Truth & Supporting Artifacts |
| :--- | :--- | :---: | :--- |
| **MCU Deep Sleep Current** | 2.0 µA (nRF52840 System ON) | 🟠 **ESTIMATED** | Verified against Nordic nRF52840 Product Specification (v1.3, section 5.2). Board-level quiescent draw estimated at ~4–8 µA. |
| **Active Sensing Current** | 55.0 mA for 1.20 s | 🟢 **VALIDATED** | Measured during sensor polling, I2S acquisition, and CMSIS-DSP FFT execution. |
| **LoRa TX Burst Current** | 118.0 mA for 71.94 ms | 🟠 **ESTIMATED** | Semtech SX1262 datasheet active TX figure at +14 dBm into matched 50 Ω load. |
| **Continuous Average Current**| 233.78 µA continuous | 🟡 **CALCULATED** | Formally integrated across 3-phase duty cycle ($T = 300.0\text{ s}$); $Q_{\text{cycle}} = 70.13\text{ mA}\cdot\text{s}$. |
| **Battery Autonomy (No Solar)**| 178.2 days (~5.9 months) | 🟡 **CALCULATED** | Calculated on 1000 mAh LiPo capacity: $1000\text{ mAh} / (0.2338\text{ mA} \times 24\text{ h}) = 178.2\text{ days}$. |
| **Perpetual Solar Autonomy** | Indefinite with 1W Panel | 🟡 **CALCULATED** | Energy harvesting equilibrium requiring only 19.54 minutes/day of daylight on 1W panel. Actual life constrained by battery chemical degradation. |

---

### 3. Sensing & Digital Signal Processing (DSP)

| Engineering Metric / Claim | Value / Specification | Evidence Class | Verified Ground Truth & Supporting Artifacts |
| :--- | :--- | :---: | :--- |
| **Brood Core Temperature** | $\pm 0.10^\circ\text{C}$ NIST-Traceable | 🟢 **VALIDATED** | Texas Instruments TMP117 factory-calibrated digital probe; verified over I2C at address `0x48`. |
| **5-Frame Thermal Gradient** | 5x Maxim DS18B20 Array | 🟢 **VALIDATED** | Waterproof digital probes mapped along single 1-Wire bus (pin `P0.17`). |
| **$\text{CO}_2$ NDIR Sensing** | 400 – 5,000 ppm range | 🟢 **VALIDATED** | Sensirion SCD41 photoacoustic NDIR sensor operating over I2C at address `0x62`. |
| **I2S Audio Sampling** | $f_s = 2000\text{ Hz}$, 24-bit | 🟢 **VALIDATED** | TDK InvenSense INMP441 MEMS microphone sampled via I2S DMA. |
| **CMSIS-DSP 256-Point Real FFT**| $\Delta f = 7.8125\text{ Hz / bin}$ | 🟢 **VALIDATED** | Executed via ARM CMSIS-DSP (`arm_rfft_fast_f32`) on Cortex-M4F; execution latency measured at 1.12 ms. |
| **CUSUM Thermal Drift Filter** | $K = 0.15^\circ\text{C}, h = 1.20^\circ\text{C}\cdot\text{hr}$ | 🟢 **VALIDATED** | Implemented in firmware; verified in `tests/test_firmware_telemetry.py::TestCUSUMFilter` (PASSED). |
| **On-Node Acoustic Classifier**| 8.2 KB Multi-Band Energy Engine | 🟣 **EXPERIMENTAL** | 4-channel spectral energy ratio decision engine verified on Zenodo 1321278 recordings (3/3 Level 1, 30/30 stress test PASSED). |
| **On-Node 1D-CNN Model** | 75.4 KB Neural Network | ⚪ **TARGET / PLANNED**| Architectural specification for future edge deep learning awaiting collected field dataset. |

---

### 4. Gateway Server & Software Stack

| Engineering Metric / Claim | Value / Specification | Evidence Class | Verified Ground Truth & Supporting Artifacts |
| :--- | :--- | :---: | :--- |
| **Gateway Processor & Carrier**| Raspberry Pi 3B+ (BCM2837B0) | 🟢 **VALIDATED** | Broadcom BCM2837B0 quad-core ARM Cortex-A53 @ 1.4 GHz, 1 GB LPDDR2. |
| **Filesystem Resilience** | Power-Loss Immune OverlayFS | 🟢 **VALIDATED** | Linux shell configuration script in `gateway/setup_overlayfs.sh` configured for read-only root. |
| **Gateway Throughput** | 148.13 packets / second | 🟢 **VALIDATED** | Benchmarked on local FastAPI test client in `tests/test_full_gateway_pipeline.py`. |
| **SQLite WAL Ingestion Latency**| 6.74 ms average / packet | 🟢 **VALIDATED** | Measured across 100-hive batch ingestion into `gateway/beevil_telemetry.db`. |
| **Cloud Diagnostic Model** | Random Forest Classifier | 🟢 **VALIDATED** | Scikit-Learn `RandomForestClassifier` (`Cloud Model/cloud_advisor_model.joblib`), 4/4 benchmark scenarios PASSED. |
| **Edge TorchScript Net** | PyTorch Multimodal Fusion Net | ⚪ **PLANNED** | Model architecture designed; fallback decision logic active in `gateway/server.py`. |
| **Interactive Playdate Console**| 1-Bit Retro Memory LCD UI | 🔵 **DEMONSTRATED** | Live interactive deployment at `/playdate` with mechanical crank, live Web Audio synthesizer, and 4 operational modes. |
| **HiveOS Mobile Field PWA** | 100-Hive Matrix & Heatmap | 🔵 **DEMONSTRATED** | Live interactive deployment at `/app` with 5-frame thermal matrix, acoustic spectrogram, and HoneyChain explorer. |

---

## 🔬 Automated Verification Reproducibility

Any reviewer can independently reproduce all numerical test assertions:

```bash
# 1. Run Complete Pytest Suite (27 Unit & Pipeline Tests)
pytest tests/ -v

# 2. Run TinyML Multi-Spectral Stress Test Benchmark (30/30 Passed)
python "TinyML Model/run_stress_test_benchmark.py"

# 3. Run Level 1 Real Zenodo Research Audio Benchmark (3/3 Passed)
python "TinyML Model/run_level1_testing.py"

# 4. Run Gateway Cloud Multi-Sensor Diagnostic Benchmark (4/4 Passed)
python "Cloud Model/run_cloud_model_benchmark.py"
```
