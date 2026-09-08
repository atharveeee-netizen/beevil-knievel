# TECHNICAL SPECIFICATION (TechSpec)

**Project:** BEEVIL KNIEVEL  
**Architecture:** 3-Tier Cyber-Physical Edge IoT System  

---

## 1. Physical Field Node Specification
- **Microcontroller**: Nordic Semiconductor nRF52840 (ARM Cortex-M4F @ 64 MHz, 1 MB Flash, 256 KB RAM).
- **Sub-GHz Transceiver**: Semtech SX1262 LoRa, IN865 band (865.0 - 867.0 MHz), +14 dBm transmit power, -137 dBm sensitivity @ SF12/125kHz.
- **Form Factor**: RAKwireless WisBlock RAK4631 module on RAK5005-O / RAK19007 baseboard.
- **Sensor Compliment**:
  - **Acoustic**: InvenSense INMP441 I2S omnidirectional 24-bit MEMS microphone ($f_s = 2000\text{ Hz}$).
  - **Core Thermal**: Texas Instruments TMP117 NIST-traceable digital temperature sensor ($\pm 0.1^\circ\text{C}$ accuracy, I2C 0x48).
  - **Thermal Array**: 5x Maxim DS18B20 digital 1-Wire temperature sensors on brood frames.
  - **CO2 / Respiration**: Sensirion SCD41 Photoacoustic NDIR CO2 sensor ($400-5000\text{ ppm}$, I2C 0x62).
  - **Environmental Gas**: Bosch Sensortec BME688 4-in-1 gas/pressure/humidity/temp (I2C 0x76).
  - **Load / Weight**: Dual-shear beam load cells + M5Stack HX711 24-bit ADC ($0-100\text{ kg} \pm 10\text{ g}$).
  - **Kinetic / Theft**: STMicroelectronics LIS3DH 3-axis ultra-low-power accelerometer (I2C 0x18).
- **Power Subsystem**:
  - Battery: 3.7V 2000 mAh LiFePO4 / Li-ion cell.
  - Solar: 6V 100 mAh monocrystalline panel with onboard MPPT charge regulator.
  - Power States: Sleep (18.4 uA), Sensing (8.2 mA for 1.2s), DSP FFT (14.5 mA for 42ms), LoRa Tx (48 mA for 280ms).
  - Average Power Dissipation: 0.28 mW; Autonomy: 18+ months continuous field operation.

---

## 2. DSP & Algorithmic Pipeline
- **Sampling**: 10-second acoustic audio capture at $f_s = 2000\text{ Hz}$ ($N = 20,000$ raw samples).
- **Windowing**: Hanning window with 50% overlap to eliminate spectral leakage.
- **FFT Transform**: 256-point complex FFT executed via CMSIS-DSP library on Cortex-M4F hardware FPU.
- **Frequency Resolution**: $\Delta f = \frac{f_s}{N} = \frac{2000}{256} = 7.8125\text{ Hz}$.
- **Extracted Sub-Bands**:
  - Sub-band 1: $100 - 200\text{ Hz}$ (Baseline hive hum / ventilation fanning)
  - Sub-band 2: $200 - 300\text{ Hz}$ (Pre-swarming acoustic energy concentration)
  - Sub-band 3: $300 - 500\text{ Hz}$ (Queen piping / distress pulses)
  - Sub-band 4: $500 - 1000\text{ Hz}$ (Parasite scratching / aggressive defensive flight)
- **Spectral Energy Metric**: $E_k = \sum_{i \in \text{band}_k} |X[i]|^2$.

---

## 3. Edge Gateway Specification
- **Compute Platform**: Raspberry Pi 3B+ (Broadcom BCM2837B0 quad-core 64-bit ARM Cortex-A53 @ 1.4 GHz, 1 GB LPDDR2 RAM).
- **RF Receiver**: Waveshare SX1262 LoRa Gateway HAT connected via hardware SPI bus.
- **Operating System**: Linux 6.x with OverlayFS read-only root partition to prevent SD card corruption during sudden field power loss.
- **Database**: Local SQLite with Write-Ahead Logging (WAL) mode for atomic 100 Hz write capability.
- **Local Ledger (HoneyChain)**: SHA-256 forward-linked cryptographic hash chain guaranteeing telemetry provenance.
- **API & UI**: Python 3.10 FastAPI REST endpoints + WebSocket streaming to local dashboard / field technician console.
