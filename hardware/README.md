# Beevil Knievel — Hardware Architecture

This directory contains the hardware engineering files and reference specifications for the **Beevil Knievel** system.

---

## 1. Receiver & Edge AI Gateway: Antmicro CM4 Baseboard (Rev 1.0.5)

The central edge gateway runs on the **Antmicro Raspberry Pi CM4 Baseboard**, a high-performance open-source hardware design developed by [Antmicro](https://antmicro.com) and hosted on the [Antmicro Open Hardware Portal](https://github.com/antmicro/cm4-baseboard).

- **Chassis / Board:** Antmicro CM4 Baseboard Rev. 1.0.5
- **Compute:** Raspberry Pi Compute Module 4 (CM4) Quad-Core Cortex-A72 @ 1.5GHz
- **Accelerators:** Dual Edge TPU / NPU via M.2 PCIe Gen2 interface (up to 8 TOPS total edge acceleration)
- **Interfaces:** Gigabit Ethernet (PoE-ready), Dual USB, Dual MIPI CSI camera interfaces, NVMe / MicroSD storage
- **Design Files:** Complete KiCad schematics, PCB layout, layer stackups, and mechanical files located in [`antmicro_cm4_baseboard/`](./antmicro_cm4_baseboard/)

```
hardware/
├── antmicro_cm4_baseboard/           # Official Antmicro CM4 Baseboard (KiCad PCB, Schematics, Docs)
│   ├── cm4-baseboard.kicad_pcb       # 6-layer high-density PCB layout
│   ├── cm4-baseboard.kicad_sch       # Top-level schematic
│   ├── compute-module.kicad_sch      # CM4 connector interfaces
│   ├── ethernet.kicad_sch            # Gigabit Ethernet subsystem
│   ├── nvme-micro-sd.kicad_sch       # Storage subsystem
│   ├── peripherals.kicad_sch         # I/O & communication buses
│   ├── supply.kicad_sch              # Power management circuitry
│   ├── usb.kicad_sch                 # USB host/device controllers
│   └── doc/                          # Hardware documentation & pinouts
└── antmicro_schematic_board.jpg      # High-resolution board diagram
```

---

## 2. Transmitter & Hive Sensor Node (Off-Shore COTS)

The field transmitter node deployed on individual hives utilizes an **off-shore commercial-off-the-shelf (COTS) solar sensor transmitter node**. 

- **Transmitter Architecture:** Factory-integrated, ultra-low power offshore transmitter with built-in multi-sensor telemetry and integrated solar energy harvesting.
- **Protocol:** Standardized sub-GHz radio / LoRa link transmitting acoustic feature vectors, hive temperature, humidity, and vibration telemetry directly to the Antmicro CM4 gateway.
- **Maintenance-Free:** Factory-encapsulated weatherproof IP67 enclosure with integrated solar harvesting — zero custom PCB fabrication required for hive deployment.
