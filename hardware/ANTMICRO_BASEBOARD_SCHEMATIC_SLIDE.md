# 🖥️ ANTMICRO CM4 BASEBOARD CIRCUIT SCHEMATIC DIAGRAM
## Receiver Gateway Carrier Platform (PoE + M.2 NVMe + Mini-PCIe LoRaWAN Concentrator)

![Antmicro CM4 Baseboard CAD Schematic Diagram](/C:/Users/25beevdt047/.gemini/antigravity/brain/03f2d722-c972-45f3-9c52-8b1fc32d541b/antmicro_schematic_board_1786785427114.jpg)

---

## 📐 Baseboard Circuit Architecture

### 1. Compute Module Connector Subsystem
- **B2B Connector**: Dual 100-pin High-Density Mezzanine connectors supporting **Orange Pi CM5** (RK3588S, 6 TOPS NPU) or Raspberry Pi CM4.
- **Power Delivery**: Integrated 5V / 3.3V DC-DC buck step-down converter providing up to 5A active power to the compute module.

### 2. Peripheral Interfaces & Expansion Slots
- **PoE (Power over Ethernet)**: 802.3af/at Power Delivery PD controller (TPS23753A / Si3404) regulating 48V Ethernet power to 5V DC.
- **M.2 Key-M Slot**: Single-lane PCIe 2.0 interface for NVMe M.2 SSD storage expansion.
- **Mini-PCIe Gateway Slot**: USB 2.0 / PCIe bus mapping for **RAK2287 SX1302 8-Channel LoRaWAN Concentrator**.
- **Dual Ethernet PHY**: Realtek RTL8211F Gigabit Ethernet transceivers.
- **USB 3.0 Host**: VIA VL805 PCIe-to-USB 3.0 quad-port controller.

---

## 🔗 Official Open-Source Hardware Repositories
- **Antmicro CM4 Baseboard GitHub**: [https://github.com/antmicro/cm4-baseboard](https://github.com/antmicro/cm4-baseboard)
- **Orange Pi Hardware GitHub**: [https://github.com/orangepi-xunlong](https://github.com/orangepi-xunlong)
- **RAK2287 Concentrator Docs**: [https://docs.rakwireless.com/product-categories/wislink/rak2287/](https://docs.rakwireless.com/product-categories/wislink/rak2287/)
