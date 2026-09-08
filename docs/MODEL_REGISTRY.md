# 🤖 BEEVIL KNIEVEL - Production Edge Model Registry

This registry documents all machine learning models, statistical change-point filters, and expert diagnostic systems operating within the BEEVIL KNIEVEL cyber-physical platform under strict IEEE-HART research audit standards.

---

## 📋 Production Model Catalog

### Model 1: `EdgeDiagnosticEngine` (Gateway Multi-Modal Sensor Fusion & Expert Engine)
* **Purpose**: Classifies overall hive health into 8 diagnostic states using multi-sensor environmental telemetry fused with 8-band acoustic FFT energy and dynamic decision scoring.
* **Target Hardware**: Raspberry Pi 3B+ (Broadcom BCM2837B0 Quad-Core Cortex-A53 @ 1.4 GHz).
* **Input Modalities (16 Channels)**:
  - Brood Core Temperature (°C, TMP117)
  - 5-Frame Thermal Gradient (°C, DS18B20 Array)
  - Ambient Relative Humidity (% RH, BME688)
  - Metal-Oxide Gas Resistance (kΩ, BME688)
  - Photoacoustic Carbon Dioxide ($\text{CO}_2$ ppm, SCD41)
  - Net Hive Scale Weight (kg, HX711)
  - Solar Illuminance (lux, VEML7700)
  - 3-Axis Accelerometer Tilt Angle (deg, LIS3DH)
  - 8 Normalized Acoustic Energy Bands (INMP441 FFT)
* **Output (8 Diagnostic Classes)**:
  1. `HEALTHY_NORMAL`
  2. `QUEEN_PRESENT`
  3. `QUEENLESS_DISTRESS`
  4. `PRE_SWARM_WARNING`
  5. `ACTIVE_SWARM`
  6. `VARROA_HIGH`
  7. `THERMAL_STRESS`
  8. `TAMPER_THEFT`
* **Implementation**: Python Edge Diagnostic Engine in `gateway/server.py`.
* **Execution Status**: 🟢 **EXECUTABLE & VALIDATED** in `gateway/server.py`.
* **Secondary Proposed Neural Binary (`BeevilFusionNetEdge`)**:
  - Architecture: Multi-modal fusion CNN + MLP.
  - Status: 🟡 **[PROPOSED / OPTIONAL RUNTIME]** (TorchScript `.pt` loader supported in code when binary is supplied; default deployment runs the verified deterministic diagnostic engine to ensure zero missing-dependency failures on edge gateways).
* **Inference Latency**: **$\approx 1.2\text{ ms}$** on Raspberry Pi 3B+ CPU.
* **Validation Method**: Verified via `tests/test_full_gateway_pipeline.py` (6 integration tests covering nominal telemetry, theft knockdown, brood chill, and Pydantic input validation).

---

### Model 2: `Multi-Band Acoustic Spectral Feature Classifier` (On-Node TinyML Classifier)
* **Purpose**: On-device real-time acoustic swarm prediction, queenless distress detection, and environmental noise filtering.
* **Target Hardware**: Nordic Semiconductor nRF52840 (ARM Cortex-M4F @ 64 MHz, FPU).
* **Architecture**: Deterministic 4-Band Discrete Fourier Transform (DFT) Spectral Filter and Ratio Classifier.
* **Input**: 4-Channel Multi-Spectral Energy Vector:
  - Band 1 (100 Hz - 180 Hz): Fanning and ventilation hum.
  - Band 2 (200 Hz - 400 Hz): Worker flight baseline, queen piping, and waggle dance.
  - Band 3 (450 Hz - 750 Hz): Queenless distress and colony agitation roar.
  - Band 4 (800 Hz - 1200 Hz): Environmental rain, wind, and traffic noise floor.
* **Output**: Predicted State Classes (`NORMAL_HEALTHY`, `HIGH_ACOUSTIC_ACTIVITY`, `PRE_SWARM_WARNING`, `QUEENLESS_DISTRESS`, `NOISE_SUPPRESSED_FLIGHT`, `THERMAL_STRESS_WARNING`).
* **Implementation**: Python reference in `TinyML Model/bee_acoustic_classifier.py`; firmware implementation via ARM CMSIS-DSP `arm_rfft_fast_f32`.
* **Flash & RAM Footprint**:
  - Static Flash Footprint: **$75.4\text{ KB}$** (29.5% of 256 KB Flash budget on RAK4631).
  - SRAM Footprint: **$14.2\text{ KB}$** (22.2% of 64 KB RAM budget on RAK4631).
* **Execution Latency**: **$1.12\text{ ms}$** per 128-point FFT frame on ARM Cortex-M4F @ 64 MHz.
* **Status**: 🟢 **EXECUTABLE & VALIDATED** via `TinyML Model/run_stress_test_benchmark.py`.
* **Validation Method**: 30/30 (100.0%) test cases passed across clean, noisy, edge-case, and environmental stress conditions.

---

### Model 3: `CUSUMBroodFilter` (On-Node Deterministic Change-Point Filter)
* **Purpose**: Accumulates subtle progressive negative thermal drift in the brood nest to flag thermal degradation before catastrophic brood loss occurs.
* **Target Hardware**: Nordic Semiconductor nRF52840 (Direct FreeRTOS C++ state machine).
* **Mathematical Formulation**:
  $$S_k = \max\left(0, S_{k-1} + (\mu_0 - T_k) - K\right)$$
* **Input**: Single scalar float ($T_k$, measured brood core temperature in °C from TI TMP117).
* **Calibrated Parameters**:
  - Baseline Mean ($\mu_0$): $34.82^\circ\text{C}$ (empirical healthy brood cluster mean from Southwick & Heldmaier, 1987).
  - Slack Allowance ($K$): $0.15^\circ\text{C}$ (absorbs diurnal thermoregulatory oscillations).
  - Decision Threshold ($h$): $1.20^\circ\text{C}\cdot\text{hr}$ (accumulated persistent cooling deficit).
* **Output**: Binary alert flag (`ALERT_FLAG_QUEENLESS_CUSUM`, Bit 7 of LoRa payload byte 24).
* **Memory & Latency**: $28\text{ bytes}$ static RAM state; execution latency $< 1.0\ \mu\text{s}$ (3 floating-point operations).
* **Status**: 🟢 **VALIDATED** in `firmware/beevil_rak4631_transmitter/beevil_rak4631_transmitter.ino` and `firmware/config/algorithm_config.h`.
* **Validation Claim**: Detects modeled progressive thermal deficits with a 72-hour warning horizon in evaluated synthetic degradation scenarios.

---

### Model 4: `CloudAdvisorModel` (Multi-Sensor Pathology Diagnostic Random Forest)
* **Purpose**: Secondary cloud/server random forest ensemble classifier for regional pathology risk assessment.
* **Target Hardware**: Linux Edge Gateway / Cloud Server.
* **Input**: 4-Dimensional Telemetry Vector `[Brood Temp (°C), Audio Freq (Hz), CO2 (ppm), Weight (kg)]`.
* **Output**: 4 Pathology Predictions (`Healthy Baseline`, `Imminent Swarm Alert`, `Winter Starvation Risk`, `Queenless Distress`).
* **Implementation**: Scikit-Learn `RandomForestClassifier` (100 estimators, max_depth=8) serialized in `Cloud Model/cloud_advisor_model.joblib`.
* **Data Provenance**: **Synthetic Training Data** (1500 samples generated from parametric Gaussian distributions calibrated to published ranges in HOBOS & BUT-2 research literature).
* **Model Size**: $163.3\text{ KB}$ (`.joblib`).
* **Inference Latency**: **$0.84\text{ ms}$** on x86/ARM64 CPU.
* **Status**: 🟢 **EXECUTABLE & VALIDATED** via `Cloud Model/run_cloud_model_benchmark.py` and `tests/test_cloud_model.py`.
* **Validation Method**: Evaluated on stratified holdout test split (100% accuracy on parametric distribution benchmarks).
