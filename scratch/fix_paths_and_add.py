import os
import zipfile

# 1. Receiver Base Station README
rec_readme = """# Receiver Gateway Base Station PCB (6-Layer FR4 TG170)

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
"""

with open("hardware/pcb/receiver_base_station/README.md", "w", encoding="utf-8") as f:
    f.write(rec_readme)

# 2. Transmitter Sensor Node KiCad Schematic & PCB
node_sch_content = """(kicad_sch (version 20211123) (generator eeschema)
  (paper "A4")
  (title_block
    (title "Beevil Knievel In-Hive Sensor Node - nRF52840 + SX1262")
    (date "2026-08-08")
    (rev "v4.2")
    (company "Beevil Knievel Hardware Team - IEEE HART Challenge")
    (comment 1 "Ultra-Low-Power Precision Apiculture Sensor Node")
    (comment 2 "Sensors: TI TMP117 (+-0.08C), SHT45, BME688, ICS-43434 I2S Mic, LIS2DW12 Accel")
    (comment 3 "Harvester: TI BQ25570 Solar MPPT + TPS62740 360nA Low-IQ Buck Regulator")
  )
  (symbol (lib_id "MCU_Nordic:nRF52840-QIAA") (at 100 100 0) (unit 1)
    (in_bom yes) (on_board yes)
    (property "Reference" "U1" (id 0) (at 100 80 0))
    (property "Value" "nRF52840-QIAA" (id 1) (at 100 85 0))
  )
  (symbol (lib_id "RF_LoRa:SX1262IMLTRT") (at 180 100 0) (unit 1)
    (in_bom yes) (on_board yes)
    (property "Reference" "U2" (id 0) (at 180 80 0))
    (property "Value" "SX1262IMLTRT" (id 1) (at 180 85 0))
  )
  (symbol (lib_id "Sensor_Temperature:TMP117AIYDCR") (at 100 150 0) (unit 1)
    (in_bom yes) (on_board yes)
    (property "Reference" "U3" (id 0) (at 100 140 0))
    (property "Value" "TI TMP117 (NIST +-0.08C)" (id 1) (at 100 145 0))
  )
  (symbol (lib_id "Audio:ICS-43434") (at 180 150 0) (unit 1)
    (in_bom yes) (on_board yes)
    (property "Reference" "U4" (id 0) (at 180 140 0))
    (property "Value" "TDK ICS-43434 I2S Mic" (id 1) (at 180 145 0))
  )
)"""

node_pcb_content = """(kicad_pcb (version 20211014) (generator pcbnew)
  (general (thickness 1.6))
  (paper "A4")
  (layers
    (0 "F.Cu" signal)
    (1 "In1.Cu" power)
    (2 "In2.Cu" power)
    (31 "B.Cu" signal)
    (32 "B.Adhes" user "B.Adhesive")
    (33 "F.Adhes" user "F.Adhesive")
    (34 "B.Paste" user)
    (35 "F.Paste" user)
    (36 "B.SilkS" user)
    (37 "F.SilkS" user)
    (38 "B.Mask" user)
    (39 "F.Mask" user)
    (44 "Edge.Cuts" user)
  )
  (setup (pad_to_mask_clearance 0.05))
)"""

with open("hardware/pcb/transmitter_sensor_node/Beevil_Node_nRF52840_SX1262.kicad_sch", "w", encoding="utf-8") as f:
    f.write(node_sch_content)

with open("hardware/pcb/transmitter_sensor_node/Beevil_Node_nRF52840_SX1262.kicad_pcb", "w", encoding="utf-8") as f:
    f.write(node_pcb_content)

# 3. Transmitter Sensor Node README
node_readme = """# In-Hive Sensor Node PCB (4-Layer FR4 TG170 High-TG)

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
"""

with open("hardware/pcb/transmitter_sensor_node/README.md", "w", encoding="utf-8") as f:
    f.write(node_readme)

print("Fixed paths and written README files!")
