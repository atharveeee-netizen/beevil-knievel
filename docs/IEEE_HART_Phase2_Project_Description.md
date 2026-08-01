# IEEE HART HardwAIre Challenge — Phase 2 Project Description
**Team Name**: Beevil Knievel  
**Project Title**: Precision Apiculture Telemetry Node & Custom Gateway System  
**Team Members**: Atharve Dahima (CEO/Hardware), Loshini Shankar (CPO/UX), Srajan Mishra (CTO/Firmware)  
**Advisor**: Dr. Vishal  
**Document Limit**: Strictly 2 Pages  

---

## 1. Real-World Scenario & Impact Story

Commercial honeybee pollination underpins over $17 Billion in annual crop production globally. However, during the 2024–2025 season, managed honeybee operations experienced a catastrophic **55.6% colony loss**—the second consecutive record-high loss year. Traditional beekeeping relies on manual physical inspections every 2 to 3 weeks. By the time a beekeeper notices a collapsed hive, the colony is already lost to starvation, queen death, or varroa mite infestations.

**Beevil Knievel** solves this crisis by deploying a low-cost, ultra-low-power, long-range Edge-AI sensor node inside the beehive brood nest. Bees strictly thermoregulate their central brood frames at $34.0^\circ\text{C} - 35.5^\circ\text{C}$ and produce distinct acoustic frequency signatures. When a colony experiences queen failure, mite distress, or thermal collapse, its acoustic frequency shifts into the **200 Hz – 400 Hz band** and brood-nest temperature control begins to drift hours before physical symptoms appear.

---

## 2. Technical Solution & Dual-AI Model Architecture

The system comprises an autonomous inside-hive **Transmitter Node** and a self-built **Custom Gateway Receiver**:

### A. Inside-Hive Sensor Node (Transmitter)
* **MCU & Wireless**: Seeed Studio Wio-E5 Mini (STM32WLE5JC ARM Cortex-M4 @ 48MHz with integrated SX126x 868MHz LoRa radio).
* **Sensors**: 3x DS18B20 1-Wire digital temperature probes (2 Brood-nest + 1 Ambient) + 1x ICS-43434 I2S Digital MEMS Microphone.
* **Power System**: 1000mAh 3.7V LiPo + 1W Solar Panel + TPS73033 ultra-low quiescent LDO (~25nA $I_Q$).

### B. On-Device Model 1 (MCU Micro-FFT Classifier)
Model 1 runs directly on the STM32WLE5JC MCU. It samples audio via I2S, executes a Real FFT (Fast Fourier Transform) focusing on the **200 Hz – 400 Hz acoustic energy band**, and calculates the brood vs. ambient temperature differential ($\Delta T$). 
* **State Decision**: Classifies state as `Healthy` or `Distressed`. 
* **Energy Duty Cycle**: The node stays in ultra-deep sleep (~1.5 $\mu\text{A}$) for 15-minute intervals. The 868MHz radio *only* powers on when a `Distressed` state is triggered or during a single daily heartbeat packet, consuming just **0.85 mWh/day**.

### C. Custom Gateway Receiver & Model 2 (Diagnostic Advisory Engine)
Complying with IEEE Phase 2 rules forbidding COTS readers, we engineered a custom Wio-E5 Receiver Unit. Upon receiving an 868MHz LoRa alert, **Model 2** (Gateway Advisory Engine) analyzes the alert parameters and outputs plain-language diagnostic advice to the beekeeper's mobile dashboard (e.g., *"Warning: High 340Hz acoustic energy with dropping brood Delta-T indicates imminent swarming or queen loss within 24 hours"*).

---

## 3. Resilience, Redundancy & Failure Mechanisms

* **Sensor Failure Resilience**: If one DS18B20 temp probe fails, the 1-Wire bus flags the reading as invalid, and the MCU dynamically averages the remaining probes without crashing.
* **Communication Retry & Flash Buffering**: If LoRa packet transmission is obstructed, data is logged to MCU Flash memory and re-sent on the next wake cycle.
* **Propolis & Weatherproofing**: Housed in a 3D-printed PETG IP67 hexagonal enclosure (`hive_node_enclosure.scad`) with a Gore-Tex acoustic membrane protecting the mic from propolis wax.

---

## 4. Key Performance Indicators (KPIs) Summary

* **Unit BOM Cost**: **$18.74 USD** per node ($9.50 in commercial volume).
* **Daily Energy Usage**: **0.85 mWh/day** (~18+ months runtime on 1000mAh battery + solar).
* **Physical Dimensions**: **65 x 55 x 15 mm** bounding box, **54 cm³** volume, **67 grams** weight.
* **Coverage & Accuracy**: **4.2 km** Line-of-Sight 868MHz LoRa range, $\pm 0.5^\circ\text{C}$ temperature resolution ($0.0625^\circ\text{C}$ step).
