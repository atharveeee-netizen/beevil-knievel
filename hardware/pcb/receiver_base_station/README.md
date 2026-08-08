# Receiver Gateway Base Station PCB (6-Layer FR4 TG170)

This folder contains the complete open-source hardware KiCad schematics, PCB board layouts, and pre-packaged 1-click Gerber files for the **Beevil Knievel Receiver Gateway Base Station**.

## Hardware Subsystems
- **Compute Module Slot:** Raspberry Pi CM4 Hirose 100-pin high-density connector interface.
- **LoRa Concentrator:** Semtech SX1302 / SX1303 8-Channel multi-channel LoRaWAN gateway concentrator module (connected via SPI).
- **Security & Microcontroller:** STMicroelectronics STM32H743VI ARM Cortex-M7 MCU (hardware AES-128 decryption & hardware watchdog).
- **AI Acceleration:** M.2 Key-M slot accepting Google Coral Edge TPU (4 TOPS inference).
- **User Interface:** 4.0" IPS LCD display header + RJ45 Gigabit Ethernet port.

## 📦 1-Click Fabrication Package for JLCPCB
- **Ready-to-Order Gerber Package:** [`Beevil_Receiver_Gateway_SX1302_CM4_Gerbers.zip`](./Beevil_Receiver_Gateway_SX1302_CM4_Gerbers.zip)
- **KiCad Project:** [`Beevil_Receiver_Gateway_CM4_SX1302.kicad_pro`](./Beevil_Receiver_Gateway_CM4_SX1302.kicad_pro)
- **KiCad Schematic:** [`Beevil_Receiver_Gateway_CM4_SX1302.kicad_sch`](./Beevil_Receiver_Gateway_CM4_SX1302.kicad_sch)

### How to Order from JLCPCB:
1. Download [`Beevil_Receiver_Gateway_SX1302_CM4_Gerbers.zip`](./Beevil_Receiver_Gateway_SX1302_CM4_Gerbers.zip).
2. Go to [jlcpcb.com](https://jlcpcb.com) and click **Order Now**.
3. Upload the `.zip` file.
4. Select **6 Layers**, 1.6mm board thickness, Green/Black solder mask.
5. Enable **JLCPCB SMT Assembly** to receive pre-soldered ready-to-use gateway boards!
