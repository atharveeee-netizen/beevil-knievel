# 🔬 BEEVIL KNIEVEL - IEEE Reproducibility Guide
**Complete System Build, Evaluation, and Benchmark Reproduction Protocol**  
*Target: Independent Peer Reviewers & Validation Engineers*  
*Standard: IEEE-HART Phase 2 Technical Review*

---

## 💻 1. REFERENCE ENVIRONMENT SPECIFICATIONS

To reproduce all reported experimental metrics, benchmarks, and builds, configure your environment with the following software toolchains:

| Tool / Runtime | Tested Reference Version | Minimum Supported |
|---|---|---|
| **Operating System** | Ubuntu 22.04 LTS / Windows 11 / Debian 12 | Linux (kernel $\ge 5.15$) or Windows 10/11 |
| **Python** | `Python 3.10.11` | $\ge 3.9.0$ |
| **Node.js / npm** | `Node.js v20.x` / `npm v10.x` | Node $\ge 18.0.0$ |
| **Compiler Toolchain** | `arm-none-eabi-gcc 10.3.1` (Arduino IDE 2.3+ / PlatformIO) | GCC $\ge 9.3$ |
| **Firmware Target** | Nordic nRF52840 (RAKwireless RAK4631 WisBlock Core) | FreeRTOS / Arduino Core for nRF52 |
| **Primary Gateway** | Raspberry Pi 3B+ (Broadcom BCM2837B0, 64-bit) | Raspberry Pi 3B+ or CM4 |

---

## 📦 2. INSTALLATION & ENVIRONMENT SETUP

### Step 2.1: Clone the Repository
```bash
git clone https://github.com/atharveeee-netizen/beevil-knievel.git
cd beevil-knievel
```

### Step 2.2: Setup Python Virtual Environment
```bash
# Create and activate virtual environment
python -m venv venv

# On Linux / macOS:
source venv/bin/activate

# On Windows (PowerShell):
.\venv\Scripts\Activate.ps1

# Install required dependencies
pip install --upgrade pip
pip install fastapi uvicorn pydantic numpy scikit-learn joblib pytest
```

### Step 2.3: Setup Frontend Dashboard
```bash
cd frontend
npm install
npm run build
cd ..
```

---

## 🧪 3. EXECUTING THE BENCHMARK & REPRODUCIBILITY SUITE

### 3.1 Suite 1: Automated Unit & Gateway Integration Tests
Executes 9 end-to-end integration tests covering SQLite database initialization, 100-hive telemetry ingestion, theft knockdown triage, thermal chill detection, and strict Pydantic input validation (HTTP 422):
```bash
pytest tests/ -v
```
**Expected Output:**
```text
tests/test_cloud_model.py::TestCloudModel::test_model_inference_execution PASSED
tests/test_cloud_model.py::TestCloudModel::test_pathology_classes PASSED
tests/test_cloud_model.py::TestCloudModel::test_required_fields_list PASSED
tests/test_full_gateway_pipeline.py::test_root_endpoint PASSED
tests/test_full_gateway_pipeline.py::test_hives_overview PASSED
tests/test_full_gateway_pipeline.py::test_telemetry_ingest_nominal PASSED
tests/test_full_gateway_pipeline.py::test_telemetry_ingest_anomalies PASSED
tests/test_full_gateway_pipeline.py::test_telemetry_strict_validation PASSED
tests/test_full_gateway_pipeline.py::test_hive_detail_and_alerts PASSED
======================== 9 passed in 2.5s =========================
```

---

### 3.2 Suite 2: TinyML 30-Sample Multi-Spectral Stress Test
Evaluates the 75.4 KB Multi-Band Acoustic Spectral Feature Classifier across 30 extreme audio conditions (ventilation hum, flight buzz, queen piping, pre-swarm acoustics, queenless distress, and environmental noise floor):
```bash
python "TinyML Model/run_stress_test_benchmark.py"
```
**Expected Output:**
```text
EXTREME TinyML STRESS TEST SUMMARY REPORT
   * Total Test Cases Executed: 30
   * Passed Predictions:        30 / 30
   * Model Accuracy Rate:       100.0%
   * Stress Test Status:        PASSED (100.0% Accuracy)
```

---

### 3.3 Suite 3: Real Zenodo Dataset Field Benchmark
Evaluates the feature classifier exclusively against real-world field recordings from the open-access Zenodo research repository (DOI: [10.5281/zenodo.1321278](https://doi.org/10.5281/zenodo.1321278)):
```bash
# Level 1 Verification (3 Core Scenarios):
python "TinyML Model/run_level1_testing.py"

# Full Multi-Recording Benchmark (14 Field Recordings):
python "TinyML Model/run_full_zenodo_real_benchmark.py"
```
**Expected Output:**
```text
  Level 1 Real Zenodo Evaluation Complete: 3/3 Passed (100.0%)
  Benchmark Status: PASSED
```

---

### 3.4 Suite 4: Cloud Pathology Random Forest Builder & Verification
Re-generates the parametric synthetic dataset grounded in HOBOS & BUT-2 academic distributions and trains the 100-estimator Random Forest classifier:
```bash
python "Cloud Model/build_cloud_model.py"
python "Cloud Model/run_cloud_model_benchmark.py"
```
**Expected Output:**
```text
  MODEL 2 CLOUD PATHOLOGY DIAGNOSTIC BENCHMARK SUMMARY REPORT
   * Total Multi-Sensor Test Scenarios: 4
   * Passed Diagnostic Predictions:     4 / 4
   * Model 2 Accuracy Rate:             100.0%
   * Benchmark Status:                  PASSED (100% Accuracy)
```

---

## 📡 4. FIRMWARE VERIFICATION & COMPILATION

The on-node firmware is modularly configured via centralized headers in `firmware/config/`:
- `hardware_config.h`: GPIO pin allocations, ADC calibration, baseboard power switches.
- `radio_config.h`: IN865 carrier frequency (865.0625 MHz), +14 dBm power limits, SF7/BW125/CR 4/5.
- `sensor_config.h`: I2C sensor addresses (TMP117, SCD41, BME688, LIS3DH, VEML7700, HX711).
- `battery_config.h`: Arrhenius temperature coefficient (+0.8 mV/°C), 7-point OCV piecewise lookup table.
- `algorithm_config.h`: Recursive CUSUM parameters ($\mu_0 = 34.82^\circ\text{C}, K = 0.15^\circ\text{C}, h = 1.20^\circ\text{C}\cdot\text{hr}$).

### Firmware Inspection
```bash
# Verify firmware files syntax and inclusion
head -n 25 firmware/beevil_rak4631_transmitter/beevil_rak4631_transmitter.ino
```
Pre-compiled release binaries and memory map files are preserved in `artifacts/firmware/v1.0.0/`:
- `beevil_rak4631_transmitter.ino.hex`
- `beevil_rak4631_transmitter.ino.elf`
- `beevil_rak4631_transmitter.ino.map`
- `beevil_rak4631_transmitter.ino.zip`

---

## 🛰️ 5. REPRODUCIBILITY GUARANTEE

Every quantitative figure presented in the IEEE project documentation traces directly to an executable Python script, finite-element simulation project file, or firmware header file in this repository. No synthetic data is represented as empirical measurement, and no rule engine is represented as a neural network.
