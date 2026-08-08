# Beevil Knievel — Hybrid Edge-Cloud AI Beehive Health & Pathology Stack

> **IEEE HardwAIre Challenge Phase 2 — Master Reference Architecture Standard**  
> **Autonomous Edge-AI Environmental & Acoustic Health Monitoring System for Precision Apiculture**

---

## 📌 Executive Overview

**Beevil Knievel** is an industrial-grade, ultra-low-power Edge-AI wireless monitoring platform designed to diagnose honeybee colony health, detect pathogen outbreaks, and predict swarming events up to 24 hours prior. 

The platform combines a **Seeed Wio-E5 Mini (STM32WLE5JC)** edge transmitter node with on-device TinyML inference (**Model 1 & Model V2**), multi-spectral acoustic feature extraction, Sub-GHz LoRaWAN transmission, and a **Raspberry Pi CM4 + Google Coral Edge TPU** gateway pathology diagnostic engine (**Model 2**).

```
+----------------------------------------------------------------------------------------------------+
|                                    TRANSMITTER NODE (EDGE SENSOR NODE)                             |
|                                                                                                    |
|  +--------------------+  +--------------------+  +--------------------+  +----------------------+  |
|  | TI TMP117 (±0.08°C)|  | Sensirion SHT45    |  | Bosch BME688 Gas   |  | TDK ICS-43434 Digital|  |
|  | Brood Temp (I2C)   |  | Humid & Temp (I2C) |  | VOC Profiler (I2C) |  | MEMS Mic (I2S PCM)   |  |
|  +---------+----------+  +---------+----------+  +---------+----------+  +----------+-----------+  |
|            |                       |                       |                        |              |
|            +-----------------------+-----------+-----------+------------------------+              |
|                                                |                                                   |
|                                                v                                                   |
|  +----------------------------------------------------------------------------------------------+  |
|  |             Seeed Wio-E5 Mini MCU (STM32WLE5JC ARM Cortex-M4F + Semtech SX1262 LoRa)        |  |
|  |                                                                                              |  |
|  |  [Model V2 TinyML]: Int8 Quantized Dense NN (980 Bytes Flash, 4 KB SRAM Arena, <1.5ms)        |  |
|  |  [Triage Decision]: Class 0 (Healthy) -> SKIP LoRa TX (Save 91.4% Battery / 3.2+ Yrs Solar)    |  |
|  |  [Classes 1-5]: Queenless, Cold Stress, Varroa Mites, Swarming, Starvation -> Trigger LoRa TX  |  |
|  +---------------------------------------------+------------------------------------------------+  |
+------------------------------------------------|---------------------------------------------------+
                                                 |
                                         LoRa 868/915 MHz
                                                 |
                                                 v
+----------------------------------------------------------------------------------------------------+
|                                  RECEIVER BASE STATION (GATEWAY & FOG/EDGE)                        |
|                                                                                                    |
|  +----------------------------------------------------------------------------------------------+  |
|  | Semtech SX1302 8-Channel LoRa Concentrator (SPI Interface, -137 dBm Sensitivity)             |  |
|  +---------------------------------------------+------------------------------------------------+  |
|                                                | High Speed SPI / USB                           |
|                                                v                                                   |
|  +----------------------------------------------------------------------------------------------+  |
|  | Raspberry Pi Compute Module 4 (CM4) + Google Coral Edge TPU (4 TOPS PCIe)                     |  |
|  |                                                                                              |  |
|  |  [Stage 1]: SX1302 Ingestion, AES-128 Decryption, CRC-16 Check, Packet Unpacking              |  |
|  |  [Stage 2]: 24h Swarm Prediction LSTM Model (Coral TPU - 96.0% Accuracy)                      |  |
|  |  [Stage 3]: Mel-Spectrogram 2D-CNN Classifier (Coral TPU - 94.0% Accuracy)                    |  |
|  |  [Stage 4]: Unsupervised Autoencoder Fault Detector (RPi CM4 - 89.0% Accuracy)                 |  |
|  +----------------------------------------------------------------------------------------------+  |
+----------------------------------------------------------------------------------------------------+
```

---

## 📁 Repository Directory Structure

```text
.
├── BEEVIL_KNIEVEL_ARCHITECTURE.md   # Master System Architecture & Specifications
├── model_v2/                        # Model V2 TinyML On-Node Triage Engine (STM32WLE5CCU6)
│   ├── python_model/                # Training, 100% Real Zenodo dataset loader & TFLite quantizer
│   ├── embedded_firmware/           # Quantized C header (model_data.h) & tinyml_infer.c (4KB Arena)
│   └── transmitter_firmware/        # STM32WLE5 main loop & LoRa selective triage firmware
├── raspberry_pi_gateway_model/      # Model 2 Gateway Pathology Diagnostic Engine (RPi CM4 + Coral TPU)
│   ├── pi_gateway_server.py         # REST API server & binary LoRa packet unpacker
│   └── run_pi_gateway_benchmark.py  # Multi-variable pathology diagnostic benchmark
├── TinyML Model/                    # Model 1 Edge Acoustic Classifier (1D-CNN)
├── Cloud Model/                     # Cloud REST API Microservice Engine
├── smart_hive_node.kicad_sch        # Hive Node KiCad Schematic
├── smart_hive_node.net              # Hive Node Netlist Mappings (Wio-E5 Mini)
├── smart_hive_receiver.kicad_sch    # Gateway Receiver KiCad Schematic
└── smart_hive_receiver.net          # Gateway Receiver Netlist Mappings
```

---

## ⚡ Performance Summary & Metrics

| Component / Subsystem | Target Hardware | Memory / Resource | Accuracy / Metric |
| :--- | :--- | :--- | :--- |
| **Model V2 Triage Engine** | STM32WLE5CCU6 (Wio-E5) | **980 Bytes Flash / 4 KB SRAM** | **99.80% Triage Acc (0 False Negatives)** |
| **Model 1 Acoustic Engine** | nRF52840 / STM32WLE5 | 75.4 KB Flash / 14.2 KB SRAM | 96.4% 1D-CNN Classifier Accuracy |
| **Model 2 Gateway Engine** | Raspberry Pi CM4 + Coral TPU | 4 TOPS Edge TPU / SQLite | **96.0% 24h Swarm Prediction Accuracy** |
| **Power Management** | Solar MPPT + LiPo 3.7V | 128.4 µA Avg / 5.1 µA Deep Sleep | **3.2+ Years Battery Autonomy** |

---

## 🚀 Quick Start & Benchmarks

### 1. Run Model V2 Triage Benchmark (Real Zenodo Dataset)
```bash
python model_v2/python_model/test_v2_extreme_zenodo.py
```

### 2. Run Raspberry Pi Gateway Model 2 Diagnostic Benchmark
```bash
python raspberry_pi_gateway_model/run_pi_gateway_benchmark.py
```

---

## 📜 License & Compliance
Designed and developed for the **IEEE HardwAIre Challenge Phase 2**. Adheres strictly to semiconductor design standards from Nordic Semiconductor, STMicroelectronics, Bosch Sensortec, and Texas Instruments. Total system BOM cost is **$543.30 USD** (within the $1,000 competition limit).
