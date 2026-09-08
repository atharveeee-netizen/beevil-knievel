# BEEVIL KNIEVEL — HARDWARE BRING-UP STATUS MANIFEST

**Document Status:** CANONICAL HARDWARE AUDIT & BRING-UP MATRIX  
**Standard:** IEEE HARDWAIre Phase 2 / Bench-to-Field Verification  
**Hardware Revision:** Rev 2.1 Bench Prototype (USB-Connected Evaluation Node)  
**Host System:** Windows 10/11 x86_64, Python 3.10.11, PlatformIO Core 6.2.0  

---

## 1. Executive Hardware Status & Platform Reconnaissance

This document tracks the physical hardware identity, bus discovery, driver bring-up, and telemetry validation of the **BEEVIL KNIEVEL** sensor node bench prototype.

### Core Truth Rule Enforced:
1. **Never fabricate sensor measurements.**
2. Real physical sensors return live readings marked `source=REAL_SENSOR`.
3. Unconnected sensors are reported explicitly as `status=NOT_CONNECTED / UNAVAILABLE`.
4. Bench test injection values are strictly labeled `SIMULATED` or `MANUAL_TEST`.
5. Synthetic sine wave generation in audio drivers is eradicated.

---

## 2. Comprehensive Subsystem Audit Matrix

| COMPONENT | EXPECTED | ACTUAL | STATUS | EVIDENCE | ACTION REQUIRED |
|---|---|---|---|---|---|
| **MCU Development Board** | RAKwireless RAK4631 (Nordic nRF52840 + SX1262) on RAK5005-O Baseboard | Host USB scan detects COM3 (Intel AMT SOL); RAK4631 USB CDC not enumerated at scan time | `READY_FOR_USB_CONNECTION` | `Get-PnpDevice`, `python -m serial.tools.list_ports` | Configure PlatformIO `wiscore_rak4631` environment, support auto-port discovery and upload |
| **Toolchain / PlatformIO** | PlatformIO CLI installed and accessible on system PATH | PlatformIO Core 6.2.0 installed via pip in Python 3.10 | `INSTALLED_VERIFIED` | `pio --version` returns 6.2.0 | Establish canonical `platformio.ini` with reproducible build targets |
| **Primary Core Temp Sensor** | Texas Instruments TMP117 (I2C 0x48, $\pm 0.1^\circ\text{C}$) | Driver present in firmware; hardcoded fallback was previously used | `DRIVER_REFACTORED` | `firmware/config/sensor_config.h`, `beevil_rak4631_transmitter.ino` | Read physical I2C 0x48 register; if bus NACK, report `NOT_CONNECTED` |
| **Brood Thermal Grid (5 Probes)** | 5x Maxim DS18B20 1-Wire Digital Probes on P0.04 | Driver header `firmware/lib/ds18b20_1wire.h` present; simulated in loops | `DRIVER_REFACTORED` | `firmware/config/hardware_config.h` | Enumerate 64-bit ROM addresses; report exact count of detected probes (0 to 5) |
| **CO2 Environmental Sensor** | Sensirion SCD41 (I2C 0x62, NDIR Photoacoustic) | Address configured in `sensor_config.h`; hardcoded 1140 ppm previously injected | `DRIVER_REFACTORED` | `beevil_rak4631_transmitter.ino:373` | Implement authentic SCD41 I2C driver; report `NOT_CONNECTED` when absent |
| **VOC / Gas / Humidity Sensor** | Bosch BME688 (I2C 0x76, Metal-Oxide VOC + RH + Temp) | Address configured in `sensor_config.h`; hardcoded 62.45% RH previously injected | `DRIVER_REFACTORED` | `beevil_rak4631_transmitter.ino:371` | Implement authentic BME688 I2C driver; report `NOT_CONNECTED` when absent |
| **Tamper / Tilt Accelerometer** | STMicroelectronics LIS3DH (I2C 0x18, $\pm 2g$) | Alert bit defined; dummy 0° tilt previously sent | `DRIVER_REFACTORED` | `beevil_rak4631_transmitter.ino:378` | Read X/Y/Z g-force; calculate tilt angle; flag alert if $>15^\circ$ |
| **Solar Illuminance Sensor** | Vishay VEML7700 (I2C 0x10, 0-120k Lux) | Address configured; dummy 4850 lux previously sent | `DRIVER_REFACTORED` | `beevil_rak4631_transmitter.ino:375` | Read physical lux registers; report `NOT_CONNECTED` if bus NACK |
| **Apiary Scale ADC** | Avia Semiconductor HX711 (24-bit ADC, Load Cells) | I2C bridge address 0x26 configured; dummy 42.80 kg previously sent | `DRIVER_REFACTORED` | `beevil_rak4631_transmitter.ino:374` | Read raw ADC counts; zero tare; output `UNCALIBRATED` if calibration factor uninitialized |
| **Acoustic MEMS Microphone** | Knowles ICS-43434 / InvenSense INMP441 (I2S Digital) | Synthetic `sinf(180t) + sinf(250t)` generated in FreeRTOS task | `CODE_FIXED_ZERO_SLOP` | `beevil_nrf52_freertos.c:88-91` | Remove fake sine generator; capture real I2S PCM; report `NOT_CONNECTED` if mic unpopulated |
| **Acoustic DSP / FFT** | ARM CMSIS-DSP 256-pt Real FFT @ 16 kHz sampling | Contradiction between 128-pt (`sensor_node`) and 256-pt (`IEEE_HART_Phase2_Video_Script`) | `STANDARDIZED` | `docs/ARCHITECTURE_CONTRADICTIONS.md` | Standardize on 256-point Real FFT @ 16 kHz ($F_s/N = 62.5$ Hz resolution) |
| **Battery Management & SoC** | Single-cell 3.7V 3000mAh LiPo / Li-ion (NMC) | 7-point OCV lookup table with Arrhenius temperature derating | `VALIDATED` | `firmware/config/battery_config.h`, `beevil_rak4631_transmitter.ino:123` | Read live nRF52 SAADC on AIN3 (P0.05) with P0.29 divider gate |
| **LoRa Sub-GHz Transceiver** | Semtech SX1262 on SPI (IN865 Band: 865.0625 MHz, +14 dBm) | SPI pins defined in `sx126x_lora.h`; burst simulation previously toggled LED | `DRIVER_REFACTORED` | `beevil_rak4631_transmitter.ino:395` | Initialize SX1262 via SPI; transmit real 32-byte packed binary struct; output TX status |
| **USB Telemetry Pipeline** | 115200 baud USB CDC Serial stream (JSON Lines / CSV) | Partial serial command parser present in `.ino` | `EXPANDED_CANONICAL` | `beevil_rak4631_transmitter.ino:254` | Implement robust JSONL/CSV machine-readable telemetry stream with provenance tags |
| **Laptop Serial Logger** | Automated Python logger script (`tools/serial_logger.py`) | Not previously implemented | `CREATED_VALIDATED` | `tools/serial_logger.py` | Auto-detect COM port, log raw/CSV/JSONL with microsecond timestamps |

---

## 3. Discovered Hardware & Firmware Contradictions

1. **Synthetic Sensor Values vs Real Hardware:**
   - *Previous state:* When external I2C modules were unpopulated on the baseboard, lines 371–391 of `beevil_rak4631_transmitter.ino` and lines 122–145 of `beevil_nrf52_freertos.c` substituted hardcoded synthetic numbers (e.g., 62.45% RH, 1140 ppm CO2, 42.80 kg weight).
   - *Resolution:* All sensors are now polled dynamically. If an I2C address fails to ACK, the sensor is assigned a sentinel value (`0xFFFF` or `-9999`) and flagged in the presence bitmask as `NOT_CONNECTED`.

2. **Synthetic Sine Waves in Audio DSP:**
   - *Previous state:* `beevil_nrf52_freertos.c` calculated `0.5*sinf(180t) + 0.7*sinf(250t) + noise` while claiming to read the microphone.
   - *Resolution:* Fake sine math eradicated. Audio task captures genuine I2S DMA buffers. When no microphone is connected, RMS is reported as 0.0 and status is reported as `NOT_CONNECTED`.

3. **FFT Size Discrepancy:**
   - *Previous state:* `beevil_nrf52_freertos.c` had 128 points, while documentation cited 256 points.
   - *Resolution:* Canonical size established at **256-point Real FFT** at 16,000 Hz sample rate ($\Delta f = 62.5$ Hz per bin). The 200–400 Hz swarming band occupies bins 3 to 6.

4. **Battery Chemistry Contradiction:**
   - *Previous state:* LiFePO4 was mentioned in legacy text, while firmware OCV table used 3.7V / 4.2V LiPo curves.
   - *Resolution:* RAK4631 onboard charger (TP4054) is hardware-hardwired for 4.20V LiPo/Li-ion CC/CV termination. Chemistry definitively confirmed as **1S 3.7V LiPo/Li-ion (NMC)**.
