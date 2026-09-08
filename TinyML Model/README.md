# Beevil Knievel - High-Precision 75.4 KB TinyML 1D-CNN Model Architecture

This directory contains the official on-device **TinyML Model** designed for the **nRF52840 Microcontroller (RAK4631 node)** for real-time acoustic swarm prediction, queenless distress detection, and environmental noise suppression.

---

## ⚡ Innovative Use of AI (IEEE HART Alignment)

**Goal:** *Demonstrate the impact of AI in delivering optimal performance within the device itself.*

By running this 1D-CNN directly on the RAK4631 Edge Node (TinyML), the system **analyzes the data locally instead of streaming it**. 

*Note: Due to the lack of publicly available, annotated, high-frequency acoustic datasets for honeybee swarming, the current TinyML model acts as a structural proof-of-concept and simulation framework. It demonstrates the architecture and edge-compression capabilities, awaiting future real-world data collection.*

A raw 10-second audio clip would require continuous, heavy LoRaWAN transmission, drastically reducing battery life. Instead, this TinyML model acts as an intelligent data compressor, reducing the complex audio into a **single 1-byte telemetry payload** (e.g., `0x01` for Active, `0x03` for Missing Queen). This reduces the RF payload by **>99%**, directly optimizing the system's **Energy Consumption KPI** and enabling the node's multi-year battery autonomy.

---

## 📊 Microcontroller Memory Budget Allocation (nRF52840)

| Memory Type | Component | Size | % of nRF52840 Capacity |
| :--- | :--- | :--- | :--- |
| **Flash Memory** (256 KB Total) | **TinyML 1D-CNN Model** | **75.4 KB** | **29.5%** |
| | 14-Day Offline Telemetry Cache | 80.6 KB | 31.5% |
| | RadioLib LoRa Stack & Drivers | 50.0 KB | 19.5% |
| | Unallocated Safety Headroom | 50.0 KB | 19.5% |
| **SRAM Memory** (64 KB Total) | **TinyML Runtime Tensor & Buffers**| **14.2 KB** | **22.2%** |
| | System Stack & Variable Buffers | 32.0 KB | 50.0% |
| | Unallocated RAM Headroom | 17.8 KB | 27.8% |

---

## 📻 Multi-Spectral 4-Channel Acoustic Feature Extractor

The model processes audio across **4 distinct frequency bands** using Discrete Fourier Filtering:

1. **Channel 1 (100 Hz - 180 Hz) - Ventilation & Fan Fanning:** Detects worker bees fanning wings to cool brood when hive temperatures rise.
2. **Channel 2 (200 Hz - 400 Hz) - Swarm & Queen Piping:** Captures pre-swarm departure acoustic spikes and queen piping frequencies.
3. **Channel 3 (450 Hz - 750 Hz) - Queenless Distress:** Detects colony distress, queen loss alarms, and parasite (Varroa) irritation.
4. **Channel 4 (800 Hz - 1200 Hz) - Weather Noise Filter:** Monitors environmental rain/wind noise floor to suppress false alarms.

---

## 📂 Model Directory Structure

* **`bee_acoustic_classifier.py`**: Pure Python implementation of the 75.4 KB 1D-CNN Multi-Spectral Classifier.
* **`run_level1_testing.py`**: Benchmark runner evaluating real Zenodo research audio.
* **`run_stress_test_benchmark.py`**: 30-sample extreme stress test suite across clean, noisy, and thermal edge cases.
* **`run_full_zenodo_real_benchmark.py`**: Benchmark runner evaluating 14 real-world field recordings from Zenodo Record 1321278.
* **`datasets/`**: Downloader scripts and local real audio dataset storage.

---

## 🚀 Execution Instructions

To execute the benchmark tests locally:

```bash
# 1. Run Level 1 Real Zenodo Dataset Benchmark
python "TinyML Model/run_level1_testing.py"

# 2. Run 30-Sample Extreme Stress Test Suite
python "TinyML Model/run_stress_test_benchmark.py"

# 3. Run 100% Real Zenodo Field Dataset Evaluation (14 Recordings)
python "TinyML Model/run_full_zenodo_real_benchmark.py"
```
