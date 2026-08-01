# Beevil Knievel Gateway Hardware

This directory contains the core hardware CAD files for the **Beevil Knievel LoRaWAN Gateway**.

## Architecture Setup
- **Base Layout**: Charles Hallard's open-source `LoRa-E5-Breakout` (STM32WLE5JC + SX126x pre-matched).
- **Backhaul Extension**: Pluggable backhaul header for Wi-Fi population (ESP32) via UART.

## Fabrication
These schematic (`.sch`) and layout (`.brd`) files are provided in standard Eagle format. They can be natively imported directly into JLCPCB's **EasyEDA** or **KiCad** for final component placement and Gerber extraction to satisfy IEEE HART compliance.
