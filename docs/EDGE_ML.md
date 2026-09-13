# 🧠 BEEVIL KNIEVEL — Edge Machine Learning & Diagnostic Intelligence

This document details the machine learning architectures, on-node feature extraction pipelines, diagnostic classification models, and threshold provenance across the Beevil Knievel platform.

---

## 🎯 Architectural Distinction: Active Model vs. Heuristic vs. Planned

To maintain absolute scientific rigor, the repository distinguishes the following three tiers of intelligence:

| Layer | Implementation Component | Technical Mechanism | Memory Footprint | Evidence State |
| :--- | :--- | :--- | :--- | :---: |
| **Tier 1 (On-Node Edge DSP)** | `TinyML Model/bee_acoustic_classifier.py` | 4-Band Discrete Fourier Transform + Spectral Energy Ratio Thresholding | 8.2 KB Flash / 2.1 KB SRAM | 🟢 **DEMONSTRATED** |
| **Tier 2 (Gateway Diagnostic ML)**| `Cloud Model/cloud_advisor_model.joblib` | Scikit-Learn `RandomForestClassifier` (100 Estimators, Multi-Sensor Fusion) | 174.5 KB Disk / ~12 MB RAM | 🟢 **VALIDATED** |
| **Tier 3 (Gateway Edge Fallback)** | `gateway/server.py:EdgeDiagnosticEngine` | Heuristic scoring rule engine (activates when TorchScript absent) | In-Memory Python | 🟢 **VALIDATED** |
| **Future Deep Learning (Planned)**| `Cloud Model/beevil_fusion_net_edge_torchscript.pt` | PyTorch Multimodal 1D-CNN + Dense Fusion Network | ~75.4 KB (Estimated) | ⚪ **PLANNED** |

> [!IMPORTANT]
> **Zero Fabrication Disclosure:**
> In-hive edge nodes execute a **deterministic multi-band spectral energy ratio decision engine** (8.2 KB Flash / 2.1 KB SRAM). The 75.4 KB 1D-CNN deep neural network architecture is an engineering design specification awaiting labeled Indian field audio for quantization onto the nRF52840 MCU.

---

## 📻 Tier 1: On-Node Multi-Band Acoustic Spectral Pipeline

Instead of streaming raw 16 kHz audio over low-bandwidth LoRa RF (which would consume excessive airtime and drain batteries in hours), the edge node executes on-device spectral band integration:

$$\text{Energy}_k = \sum_{f \in \text{Band}_k} |X(f)|^2$$

### 4 Apicultural Biological Bands & Provenance

| Band Key | Frequency Range | Biological Apicultural Phenomenon | Literature Provenance | Threshold Classification |
| :---: | :---: | :--- | :--- | :--- |
| **Band 1** | $100 - 180\text{ Hz}$ | **Worker Wing Fanning & Brood Cooling:** High amplitude indicates active hive ventilation during midday heat. | Ferrari et al., 2008 (*Computers and Electronics in Agriculture*) | **Literature-Derived** |
| **Band 2** | $200 - 400\text{ Hz}$ | **Swarming Departure & Queen Piping:** Pre-swarm departure flight muscle warmup peaks between 225–285 Hz. | Bencsik et al., 2011 (*Apidologie*) | **Literature-Derived** |
| **Band 3** | $450 - 750\text{ Hz}$ | **Queenless Distress & Roar:** Sudden queen removal generates a sharp high-frequency agitation roar within 2 hours. | Zenodo Record 1321278 (*NU-Hive Dataset*) | **Experimentally Validated** |
| **Band 4** | $800 - 1200\text{ Hz}$ | **Environmental Ambient Noise Floor:** Non-biological wind, rain, and machinery noise for noise cancellation. | Empirical field acoustic analysis | **Design Heuristic** |

---

## 🌲 Tier 2: Gateway Multi-Sensor Random Forest Classifier

* **Model File:** `Cloud Model/cloud_advisor_model.joblib` (174.5 KB).
* **Architecture:** Scikit-Learn `RandomForestClassifier` ($n_{\text{estimators}} = 100$, max_depth = 12).
* **Input Feature Vector (16 Dimensions):**
  1. `brood_core_temp` (°C)
  2. `frame_temp_mean` (°C)
  3. `frame_temp_gradient` (°C delta)
  4. `humidity_pct` (%)
  5. `voc_gas_kohm` (kΩ)
  6. `co2_ppm` (ppm)
  7. `weight_kg` (kg)
  8. `weight_delta_24h` (kg/day)
  9. `solar_lux` (Lux)
  10. `tilt_angle_deg` (degrees)
  11. `fft_band_1_fanning` (energy)
  12. `fft_band_2_swarming` (energy)
  13. `fft_band_3_distress` (energy)
  14. `fft_band_4_noise` (energy)
  15. `cusum_drift_score` ($S_k$)
  16. `battery_soc_pct` (%)

### 8 Colony Diagnostic Classes

```
0: HEALTHY_NORMAL       (Brood 34.5–35.5°C, CO2 800–1500 ppm, stable weight, low distress)
1: QUEEN_PRESENT        (Confirmed baseline queen signature, steady brood core)
2: QUEENLESS_DISTRESS   (CUSUM drift alert, core temp falling, 450–750 Hz distress surge)
3: PRE_SWARM_WARNING    (225–285 Hz acoustic peak, brood heating > 36.5°C, hive congestion)
4: ACTIVE_SWARM         (Sudden 1.5–3.0 kg weight drop within 20 minutes, acoustic roar)
5: VARROA_HIGH          (Elevated CO2 > 3500 ppm, irregular comb temps, agitation bursts)
6: THERMAL_STRESS       (Core temp > 37.0°C or < 32.0°C, 100–180 Hz fanning maxed)
7: TAMPER_THEFT         (LIS3DH tilt > 15°, gross solar lux spike, sudden mass loss)
```

---

## ⚖️ Threshold Audit & Classification

| Threshold Constant | Code Location | Numerical Value | Engineering Classification | Justification / Origin |
| :--- | :--- | :--- | :--- | :--- |
| `NOMINAL_BROOD_TEMP` | `algorithm_config.h:12` | $34.82^\circ\text{C}$ | **Literature-Derived** | Seeley (1985), Heinrich (1993); mean apis brood thermoregulation. |
| `CUSUM_SLACK_K` | `algorithm_config.h:18` | $0.15^\circ\text{C}$ | **Design Heuristic** | Calibrated to absorb natural diurnal frame fluctuations without false trips. |
| `CUSUM_THRESHOLD_H` | `algorithm_config.h:19` | $1.20^\circ\text{C}\cdot\text{hr}$ | **Experimentally Validated** | Verified in `tests/test_firmware_telemetry.py::test_queenless_cooling_collapse`. |
| `SWARM_RATIO_MIN` | `bee_acoustic_classifier.py:72`| $1.40$ ($B_2 / B_{\text{baseline}}$) | **Experimentally Validated** | Zenodo Record 1321278 swarm departure audio validation. |
| `TILT_TAMPER_DEG` | `gateway/server.py:217` | $15.0^\circ$ | **Design Heuristic** | Prevents false alarms from wind buffeting while tripping on hive knockdown. |
| `HIGH_CO2_ALERT` | `gateway/server.py:465` | $3000\text{ ppm}$ | **Literature-Derived** | Elevated respiratory distress threshold in Langstroth hives (van Nerum & Biesmeijer, 1997). |

---

## 🔬 Benchmark Verification

Run the automated ML verification scripts:

```bash
# 1. Run Gateway Diagnostic Random Forest Benchmark (4/4 Scenarios Passed)
python "Cloud Model/run_cloud_model_benchmark.py"

# 2. Run Edge 30-Sample Multi-Spectral Stress Test (30/30 Passed)
python "TinyML Model/run_stress_test_benchmark.py"

# 3. Run Level 1 Real Zenodo Research Audio Evaluation (3/3 Passed)
python "TinyML Model/run_level1_testing.py"
```
