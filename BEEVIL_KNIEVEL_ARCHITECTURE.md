# Beevil Knievel — Complete System Architecture & Finalized Firmware Specifications

> **IEEE HardwAIre Challenge Phase 2 — Master Reference Architecture Standard**  
> **Document ID:** IEEE-HART-2026-SPEC MASTER | **Revision:** 4.1  
> **System Cost:** $543.30 USD | **Average Power:** 128.4 µA | **Battery Autonomy:** 3.2+ Years | **Wireless Range:** 5.42 km (LoS)

---

## 1. End-to-End System Architecture Overview

```
+----------------------------------------------------------------------------------------------------+
|                                    TRANSMITTER NODE (EDGE SENSOR NODE)                             |
|                                                                                                    |
|  +--------------------+  +--------------------+  +--------------------+  +----------------------+  |
|  | TI TMP117 (±0.08°C)|  | Sensirion SHT45    |  | Bosch BME688 Gas   |  | TDK ICS-43434 Digital|  |
|  | Brood Temp (I2C)   |  | Humid & Temp (I2C) |  | & VOC Profiler(I2C)|  | MEMS Mic (I2S PCM)   |  |
|  +---------+----------+  +---------+----------+  +---------+----------+  +----------+-----------+  |
|            |                       |                       |                        |              |
|            +-----------------------+-----------+-----------+------------------------+              |
|                                                |                                                   |
|                                                v                                                   |
|  +----------------------------------------------------------------------------------------------+  |
|  |              Nordic nRF52840 MCU (64 MHz ARM Cortex-M4F + Semtech SX1262 LoRa)              |  |
|  |                                                                                              |  |
|  |  [DSP Pipeline]: Hanning Window -> 128-pt FFT (arm_rfft_fast_f32) -> 13-band MFCC (14.2ms)     |  |
|  |  [Sensor Fusion]: V16 Vector = [Temp, Hum, Gas, Accel, Light, PeakHz, MFCC0-9]               |  |
|  |  [Model 1 TinyML]: TFLite Micro int8 1D-CNN (32 KB Tensor Arena, 8.5ms, 96.4% Acc)            |  |
|  |  [Classes]: 0: Normal, 1: Heat Stress (>36.5°C), 2: Swarm (110-140Hz), 3: Queenless (225-285Hz)|  |
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
|                                                |                                                   |
|                                                v                                                   |
|  +----------------------------------------------------------------------------------------------+  |
|  | STM32H743VI Real-Time Controller (400 MHz ARM Cortex-M7, 2MB Flash, 1MB RAM)                |  |
|  |  - RF Ingestion, AES-128 Decryption, CRC-16 Check, Packet Unpacking                            |  |
|  +---------------------------------------------+------------------------------------------------+  |
|                                                | High Speed SPI / USB                           |
|                                                v                                                   |
|  +----------------------------------------------------------------------------------------------+  |
|  | Raspberry Pi Compute Module 4 (CM4) + Google Coral Edge TPU (4 TOPS PCIe)                     |  |
|  |                                                                                              |  |
|  |  [Stage 2]: 24h Swarm Prediction LSTM Model (Coral TPU, 96.0% Acc)                            |  |
|  |  [Stage 3]: Mel-Spectrogram 2D-CNN Classifier (Coral TPU, 94.0% Acc)                          |  |
|  |  [Stage 4]: Unsupervised Autoencoder Fault Detector (RPi CM4, 89.0% Acc)                       |  |
|  +----------------------------------------------------------------------------------------------+  |
+----------------------------------------------------------------------------------------------------+
```

---

## 2. Firmware Components & File Structure

### Model 1: Edge TinyML Node Firmware
* **Header File:** [`beevil_tinyml_firmware.h`](file:///C:/Users/Srajan/Desktop/GITHUB%20REPO%20STUFF/TinyML%20Model/beevil_tinyml_firmware.h)
* **Python Simulation:** [`bee_acoustic_classifier.py`](file:///C:/Users/Srajan/Desktop/GITHUB%20REPO%20STUFF/TinyML%20Model/bee_acoustic_classifier.py)
* **30-Sample Stress Benchmark:** [`run_stress_test_benchmark.py`](file:///C:/Users/Srajan/Desktop/GITHUB%20REPO%20STUFF/TinyML%20Model/run_stress_test_benchmark.py)
* **C Exporter & Verifier:** [`export_c_firmware.py`](file:///C:/Users/Srajan/Desktop/GITHUB%20REPO%20STUFF/TinyML%20Model/export_c_firmware.py)

### Model 2: Gateway Base Station Firmware
* **Header Specification:** [`beevil_gateway_firmware_spec.h`](file:///C:/Users/Srajan/Desktop/GITHUB%20REPO%20STUFF/Cloud%20Model/beevil_gateway_firmware_spec.h)
* **REST API Server:** [`cloud_server.py`](file:///C:/Users/Srajan/Desktop/GITHUB%20REPO%20STUFF/Cloud%20Model/cloud_server.py)
* **Model Builder:** [`build_cloud_model.py`](file:///C:/Users/Srajan/Desktop/GITHUB%20REPO%20STUFF/Cloud%20Model/build_cloud_model.py)

---

## 3. Telemetry Binary Frame Format (23 Bytes)

```c
typedef struct __attribute__((packed)) {
    uint8_t  sync_header[2];     /* 2 Bytes: Frame Sync (0xAA, 0x55) */
    uint8_t  node_id;            /* 1 Byte:  Node ID */
    uint16_t seq_number;         /* 2 Bytes: Telemetry Counter */
    uint8_t  colony_health_class;/* 1 Byte:  State Class (0: Normal, 1: Heat, 2: Swarm, 3: Queenless) */
    uint8_t  confidence_score;   /* 1 Byte:  TFLite int8 Model Confidence (0-100%) */
    int16_t  temp_tmp117_q4;     /* 2 Bytes: Brood Temp in Q4 fixed-point (°C * 16) */
    uint16_t hum_sht45_q4;       /* 2 Bytes: Humidity in Q4 fixed-point (%RH * 16) */
    uint16_t gas_bme688_ohm;     /* 2 Bytes: VOC Gas Resistance (Ohms / 10) */
    uint16_t peak_acoustic_hz;   /* 2 Bytes: Dominant Frequency (Hz) */
    uint16_t weight_hx711_g;     /* 2 Bytes: Hive Scale Weight in Grams */
    uint16_t co2_ppm;            /* 2 Bytes: Respiration CO2 Level (PPM) */
    uint16_t battery_mv;         /* 2 Bytes: Battery Voltage in mV */
    uint16_t crc16;              /* 2 Bytes: Hardware CRC-16 Checksum */
} HiveTelemetryPacket23B_t;
```

---

## 4. Hardware Allocation & Memory Map

| Memory Region | Address Range | Size | Functional Assignment |
| :--- | :--- | :--- | :--- |
| **Flash: Bootloader** | `0x000E0000 - 0x00100000` | 128 KB | Dual-Bank Secure Bootloader & OTA Swap Memory |
| **Flash: Code & Weights** | `0x00026000 - 0x000DF000` | 740 KB | FreeRTOS Kernel, Drivers, CMSIS-DSP, TFLite Model Weights |
| **SRAM: TFLite Arena** | `0x20000000 - 0x20008000` | 32 KB | TensorFlow Lite Micro Tensor Arena & Scratch Buffer |
| **SRAM: FreeRTOS Heap** | `0x2000C000 - 0x20038000` | 176 KB | Static Task Stacks, Mutex Handles & Queue Allocation |
