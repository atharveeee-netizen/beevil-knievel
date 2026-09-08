# Beevil Knievel - Hardware Architecture

This directory contains the hardware engineering files and reference specifications for the **Beevil Knievel** system.

---

## 1. Receiver & Edge AI Gateway: Raspberry Pi 3B+

The central edge gateway runs on the **Raspberry Pi 3B+**, a reliable and ubiquitous single-board computer providing enough compute for edge ML workloads.

- **Chassis / Board:** Raspberry Pi 3B+
- **Compute:** Broadcom BCM2837B0, Cortex-A53 (ARMv8) 64-bit SoC @ 1.4GHz, 1GB LPDDR2 SDRAM
- **Interfaces:** Gigabit Ethernet over USB 2.0 (maximum throughput 300 Mbps), 4 × USB 2.0 ports, CSI camera port
- **LoRa Module:** Waveshare SX1262 LoRa HAT for Raspberry Pi

```
hardware/
├── BOM_AND_PINOUT.md                 # Complete Bill of Materials and wiring specs
├── enclosure/                        # 3D printable enclosure files for the node
│   └── hive_node_enclosure.scad      # OpenSCAD parametric enclosure design
```

---

## 2. Transmitter & Hive Sensor Node (Off-Shore COTS)

The field transmitter node deployed on individual hives utilizes an **off-shore commercial-off-the-shelf (COTS) solar sensor transmitter node**. 

- **Transmitter Architecture:** Factory-integrated, ultra-low power offshore transmitter with built-in multi-sensor telemetry and integrated solar energy harvesting.
- **Protocol:** Standardized sub-GHz radio / LoRa link transmitting acoustic feature vectors, hive temperature, humidity, and vibration telemetry directly to the Raspberry Pi 3B+ gateway.
- **Maintenance-Free:** Factory-encapsulated weatherproof IP67 enclosure with integrated solar harvesting - zero custom PCB fabrication required for hive deployment.
