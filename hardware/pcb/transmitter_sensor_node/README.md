# In-Hive Sensor Node PCB (4-Layer FR4 TG170 High-TG)

This folder contains the complete open-source hardware KiCad schematics, PCB board layouts, and pre-packaged 1-click Gerber files for the **Beevil Knievel In-Hive Sensor Node**.

## Hardware Subsystems
- **Core Microcontroller & Transceiver:** Nordic Semiconductor nRF52840 ARM Cortex-M4F (64 MHz, 1MB Flash, 256KB SRAM) + Semtech SX1262 Sub-GHz LoRa radio (RAK4631 module).
- **Brood Temperature Sensor:** Texas Instruments TMP117 (NIST-traceable +-0.08C accuracy).
- **Micro-Climate Humidity & Condensation:** Sensirion SHT45 (+-1.5% RH).
- **VOC Gas Resistance & Pathogen Sniffer:** Bosch Sensortec BME688.
- **Acoustic Audio Capture:** TDK InvenSense ICS-43434 digital I2S MEMS microphone.
- **Comb Vibration & Tamper Acceleration:** STMicroelectronics LIS2DW12 3-axis accelerometer.
- **Autonomous Energy Subsystem:** TI BQ25570 MPPT Solar Harvester + TI TPS62740 360 nA low-IQ step-down buck regulator.

## 📦 1-Click Fabrication Package for JLCPCB
- **Ready-to-Order Gerber Package:** [`Beevil_Node_nRF52840_SX1262_Gerbers.zip`](./Beevil_Node_nRF52840_SX1262_Gerbers.zip)
- **KiCad Schematic:** [`Beevil_Node_nRF52840_SX1262.kicad_sch`](./Beevil_Node_nRF52840_SX1262.kicad_sch)
- **KiCad PCB Layout:** [`Beevil_Node_nRF52840_SX1262.kicad_pcb`](./Beevil_Node_nRF52840_SX1262.kicad_pcb)

### How to Order from JLCPCB:
1. Download [`Beevil_Node_nRF52840_SX1262_Gerbers.zip`](./Beevil_Node_nRF52840_SX1262_Gerbers.zip).
2. Go to [jlcpcb.com](https://jlcpcb.com) and click **Order Now**.
3. Upload the `.zip` file.
4. Select **4 Layers**, 1.6mm board thickness, Green/Black solder mask, ENIG 2u" finish.
5. Enable **JLCPCB SMT Assembly** to receive pre-soldered ready-to-use sensor node boards!
