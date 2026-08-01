# Beevil Knievel Gateway Hardware Schematics

This directory contains hardware reference specifications for the **Beevil Knievel LoRaWAN Gateway Receiver**.

## Active Verified Open-Source Schematics

### 1. Charles Hallard LoRa-E5 Breakout PCB (Primary Baseline)
* **Active GitHub Repository**: [https://github.com/hallard/LoRa-E5-Breakout](https://github.com/hallard/LoRa-E5-Breakout)
* **Key Specs**:
  * Complete Eagle schematic (`.sch`) & board layout (`.brd`).
  * Dual SMA / u-FL RF antenna pads with 50$\Omega$ trace matching.
  * FTDI 6-pin UART header & SWD JTAG flashing pins.

### 2. Seeed Studio Official Wio-E5 Breakout
* **Official GitHub Repository**: [https://github.com/Seeed-Studio/LoRa-E5_Breakout](https://github.com/Seeed-Studio/LoRa-E5_Breakout)
* **Key Specs**: Official 2-layer PCB footprint and schematic for Seeed Wio-E5 module.

## Carrier Modification
To bridge the Wio-E5 to AWS/Cloud via Wi-Fi:
* Wire **Wio-E5 UART TX (PB6)** $\rightarrow$ **ESP32 RX2 (GPIO16)**
* Wire **Wio-E5 UART RX (PB7)** $\rightarrow$ **ESP32 TX2 (GPIO17)**
* Common **3.3V** and **GND** ground plane.
