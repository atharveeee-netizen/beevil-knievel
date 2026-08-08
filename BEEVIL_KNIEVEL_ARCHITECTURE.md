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
|  | Brood Temp (I2C)   |  | Humid & Temp (I2C) |  | VOC Profiler (I2C) |  | MEMS Mic (I2S PCM)   |  |
|  +---------+----------+  +---------+----------+  +---------+----------+  +----------+-----------+  |
|            |                       |                       |                        |              |
|            +-----------------------+-----------+-----------+------------------------+              |
|                                                |                                                   |
|                                                v                                                   |
|  +----------------------------------------------------------------------------------------------+  |
|  |              Nordic nRF52840 MCU (64 MHz ARM Cortex-M4F + Semtech SX1262 LoRa)              |  |
|  |                                                                                              |  |
|  |  [DSP Pipeline]: Hanning Window -> 128-pt FFT (arm_rfft_fast_f32) -> 7-element feature vector |  |
|  |  [Sensor Fusion]: V7 Vector = [temp_core, temp_amb, humidity, gas_kohm, weight, dw, rms]      |  |
|  |  [Model V2 TinyML]: TFLite Micro int8 Dense NN (4 KB Tensor Arena, <1.0ms, 99.80% Triage Acc)   |  |
|  |  [Triage Action]: Class 0 (Healthy) -> SKIP LoRa TX (Save 91.4% Battery / 3.2+ Yrs Solar)    |  |
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
|  |  [Stage 1]: SX1302 Ingestion, AES-128 Decryption, CRC-16 Check, Packet Unpacking              |  |
|  |  [Stage 2]: 24h Swarm Prediction LSTM Model (Coral TPU - 96.0% Accuracy)                      |  |
|  |  [Stage 3]: Mel-Spectrogram 2D-CNN Classifier (Coral TPU - 94.0% Accuracy)                    |  |
|  |  [Stage 4]: Unsupervised Autoencoder Fault Detector (RPi CM4 - 89.0% Accuracy)                 |  |
|  +----------------------------------------------------------------------------------------------+  |
+----------------------------------------------------------------------------------------------------+
```

---

## 2. Firmware Components & File Structure

### Model V2: Edge TinyML Node Firmware (Nordic nRF52840 + SX1262)
* **Quantized Model C Header:** [`model_data.h`](file:///C:/Users/Srajan/Desktop/GITHUB%20REPO%20STUFF/model_v2/embedded_firmware/model_data.h) (980 Bytes Flash)
* **C Inference Wrapper:** [`tinyml_infer.c`](file:///C:/Users/Srajan/Desktop/GITHUB%20REPO%20STUFF/model_v2/embedded_firmware/tinyml_infer.c) (4 KB Tensor Arena)
* **Python Model Trainer:** [`train_model.py`](file:///C:/Users/Srajan/Desktop/GITHUB%20REPO%20STUFF/model_v2/python_model/train_model.py) (100% Real Zenodo Dataset DOI: 10.5281/zenodo.1321278)
* **Int8 TFLite Quantizer:** [`convert_to_tflite.py`](file:///C:/Users/Srajan/Desktop/GITHUB%20REPO%20STUFF/model_v2/python_model/convert_to_tflite.py)
* **nRF52840 Main Firmware Loop:** [`main.c`](file:///C:/Users/Srajan/Desktop/GITHUB%20REPO%20STUFF/model_v2/transmitter_firmware/main.c)

### Model 2: Gateway Base Station Firmware (RPi CM4 + Coral TPU)
* **Gateway Server API:** [`pi_gateway_server.py`](file:///C:/Users/Srajan/Desktop/GITHUB%20REPO%20STUFF/raspberry_pi_gateway_model/pi_gateway_server.py)
* **Pathology Diagnostic Benchmark:** [`run_pi_gateway_benchmark.py`](file:///C:/Users/Srajan/Desktop/GITHUB%20REPO%20STUFF/raspberry_pi_gateway_model/run_pi_gateway_benchmark.py)

---

## 3. Telemetry Binary Frame Format (23 Bytes)

```c
typedef struct __attribute__((packed)) {
    uint8_t  sync_header[2];     /* 2 Bytes: Frame Sync (0xAA, 0x55) */
    uint8_t  node_id;            /* 1 Byte:  Node ID */
    uint16_t seq_number;         /* 2 Bytes: Telemetry Counter */
    uint8_t  colony_health_class;/* 1 Byte:  State Class (0: Healthy, 1: Queenless, 2: Cold, 3: Varroa, 4: Swarm, 5: Starvation) */
    uint8_t  confidence_score;   /* 1 Byte:  Model V2 TFLite Int8 Confidence (0-100%) */
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

## 4. Hardware Allocation & Memory Map (nRF52840 SoC)

| Memory Region | Address Range | Size | Functional Assignment |
| :--- | :--- | :--- | :--- |
| **Flash: Bootloader** | `0x000E0000 - 0x00100000` | 128 KB | Dual-Bank Secure Bootloader & OTA Swap Memory |
| **Flash: Code & Weights** | `0x00026000 - 0x000DF000` | 740 KB | FreeRTOS Kernel, Drivers, CMSIS-DSP, Model V2 Weights (980 Bytes) |
| **SRAM: TFLite Arena** | `0x20000000 - 0x20001000` | 4 KB | TensorFlow Lite Micro Tensor Arena (Model V2 Static BSS Buffer) |
| **SRAM: FreeRTOS Heap** | `0x2000C000 - 0x20038000` | 176 KB | Static Task Stacks, Mutex Handles & Queue Allocation |
