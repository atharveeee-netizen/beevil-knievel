# CANONICAL ARCHITECTURE SPECIFICATION

**Project:** BEEVIL KNIEVEL  
**Document:** System Architecture Model (Source of Truth)  
**Standard:** IEEE Cyber-Physical Systems Specification  

---

## 1. 3-Tier Topology Overview

```text
[ TIER 1: PHYSICAL TRANSDUCTION & EDGE MCU ]
Langstroth Frame 1-5  --> Transducer Array (TMP117, DS18B20 x5, INMP441, SCD41, BME688, HX711, LIS3DH)
                             | (I2C, I2S, 1-Wire)
                      nRF52840 (CMSIS-DSP FFT, State Estimation)
                             | (SPI)
                      SX1262 Sub-GHz LoRa (+14 dBm, IN865 Band)
                             |
                             v
                 (( LoRa RF Wireless Link ))
                             |
[ TIER 2: LOCAL HARBOR GATEWAY ]
                             v
             Waveshare SX1262 HAT (SPI) --> Raspberry Pi 3B+ (ARM Cortex-A53)
                                               |-- Packet Dissector & Integrity CRC
                                               |-- Page (1954) CUSUM Drift Filter
                                               |-- 1D-CNN Micro-Model Inference
                                               |-- HoneyChain SHA-256 Ledger
                                               |-- SQLite (WAL Mode) Persistent Store
                                               |-- FastAPI REST + WebSocket Server
                             |
[ TIER 3: OPERATIONS & FIELD CONSUMPTION ]
                             |-- Local WiFi / Ethernet Direct AP (Offline Operations)
                             |-- Web Browser Operations Dashboard (Next.js 16 + React 19)
                             |-- Mobile Technician PWA (Field Inspection Mode)
                             |-- 1-Bit Panic Playdate Physical Field Terminal (Direct USB/Serial)
```

---

## 2. Telemetry Packet Structure (32-Byte Binary Frame)

To maximize battery life and comply with regional duty-cycle regulations, telemetry is encoded in a compact 32-byte binary payload:

```text
+----------------+----------------+----------------+----------------+
| Node ID (2B)   | Sequence (2B)  | Timestamp (4B) | Brood Temp(2B)|
+----------------+----------------+----------------+----------------+
| Grad 1-2 (2B)  | Grad 3-4 (2B)  | Grad 5 (1B)    | Humidity (1B)  |
+----------------+----------------+----------------+----------------+
| CO2 NDIR (2B)  | Weight (2B)    | Audio FFT E1(2B)| Audio FFT E2(2B)|
+----------------+----------------+----------------+----------------+
| Audio FFT E3(2B)| Audio FFT E4(2B)| Battery mV (2B)| CRC-16 (2B)   |
+----------------+----------------+----------------+----------------+
Total Payload Size: 32 Bytes (256 bits)
Airtime at SF7/125kHz: 61.7 ms
Airtime at SF10/125kHz: 370.7 ms
```

---

## 3. Subsystems & Interfaces Matrix

| Subsystem | Master Controller | Primary Interface | Secondary Interface | Data Flow Direction |
|---|---|---|---|---|
| **Acoustic Transduction** | nRF52840 | I2S (SCK, WS, SD) | GPIO Interrupt | INMP441 -> MCU |
| **Precision Thermal** | nRF52840 | I2C (0x48) @ 400kHz | None | TMP117 -> MCU |
| **Gradient Thermal** | nRF52840 | 1-Wire (P0.17) | 4.7k Pullup | DS18B20 Array -> MCU |
| **Metabolic Gas** | nRF52840 | I2C (0x62) @ 100kHz | Periodic Wake | SCD41 -> MCU |
| **Environmental Gas** | nRF52840 | I2C (0x76) @ 400kHz | Gas Heater PWM | BME688 -> MCU |
| **Hive Scale** | nRF52840 | I2C / Serial | Clock Pulse | HX711 -> MCU |
| **Kinetic Tamper** | nRF52840 | I2C (0x18) | Hardware INT Pin | LIS3DH -> MCU |
| **Sub-GHz LoRa RF** | nRF52840 | SPI @ 8MHz | BUSY, DIO1, RST | nRF52840 <-> SX1262 |
| **Gateway Radio** | Raspberry Pi 3B+ | SPI0 (CE0) | GPIO 24 (DIO1) | SX1262 HAT -> Linux Kernel |
| **Persistence Engine** | Gateway Service | SQLite C Driver | POSIX File I/O | Ingest Daemon -> SSD/SD |
| **Field Terminal** | Gateway / MCU | USB CDC-ACM | Serial 115200 baud | Gateway -> Playdate Console |
