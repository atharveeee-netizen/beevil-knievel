# 🖥️ BEEVIL KNIEVEL RECEIVER GATEWAY BASEBOARD SCHEMATIC
## High-Performance Edge Gateway (Orange Pi CM5 6 TOPS NPU + RAK2287 LoRaWAN Concentrator + PoE)

![BEEVIL KNIEVEL Receiver Gateway Baseboard Schematic](/C:/Users/25beevdt047/.gemini/antigravity/brain/03f2d722-c972-45f3-9c52-8b1fc32d541b/beevil_receiver_schematic_board_1786785543199.jpg)

---

## 📐 Circuit Architecture Overview

### 1. High-Density Compute Module Interface
- **Mezzanine Connectors**: Dual 100-pin high-speed Board-to-Board (B2B) connectors interfacing the **Orange Pi CM5** (Rockchip RK3588S octa-core processor + **built-in 6 TOPS NPU**).
- **Power Rail**: DC-DC 5V / 3.3V 5A synchronous buck step-down converter rail.

### 2. Peripheral Systems & Interface Busses
- **Power over Ethernet (PoE 802.3af/at)**: 48V to 5V DC Power Delivery (PD) controller block (TPS23753A / Si3404).
- **LoRaWAN Concentrator Slot**: Mini-PCIe interface powering the **RAK2287 SX1302 8-Channel Gateway Module** (IN865 / EU868 band).
- **M.2 Key-M Slot**: Single-lane PCIe 2.0 interface for NVMe M.2 SSD storage extension.
- **Dual Gigabit Ethernet**: Realtek RTL8211F GbE transceivers.
- **USB 3.0 Host**: VIA VL805 PCIe-to-USB 3.0 quad-port controller.
