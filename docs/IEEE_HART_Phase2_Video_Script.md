# IEEE HART HardwAIre Challenge Phase 2 — 5-Minute Presentation Video Script
**Project**: Beevil Knievel Precision Apiculture Platform  
**Target Video Duration**: 4 Minutes 30 Seconds (Strict Limit: 5 Minutes Max)  

---

## 🎬 Video Scene-by-Scene Breakdown

### Scene 1: The Problem & Real-World Scenario (0:00 - 0:45)
* **Visual**: Footage/graphics of commercial beehives and global colony collapse stats (55.6% colony loss in 2024-2025).
* **Speaker**: "Welcome! Commercial honeybees pollinate $17 Billion worth of crops, yet beekeepers lose over half their hives every year because manual inspections every two weeks are too slow. Meet Beevil Knievel — an ultra-low-cost, long-range Edge AI telemetry system that catches colony collapse before it happens."

### Scene 2: The Hardware & Sensor Node (0:45 - 1:45)
* **Visual**: Close-up of the assembled Wio-E5 Mini node, 3x DS18B20 1-Wire sensors, ICS-43434 MEMS mic, 1W solar panel, and NanoVNA H4 antenna tuning.
* **Speaker**: "Our sensor node sits inside the hive brood nest. Powered by the STM32WLE5JC chip with integrated 868MHz LoRa radio, it consumes just 1.5 microamps in deep sleep. We use 3 digital temperature probes for brood-nest Delta-T monitoring and an I2S MEMS mic to listen to hive acoustics. The entire node BOM costs just $18.74 USD and weighs only 67 grams."

### Scene 3: Edge AI & Dual-Model System (1:45 - 2:45)
* **Visual**: Screen recording of Python acoustic classifier (`bee_acoustic_classifier.py`), FFT spectrogram in 200-400Hz swarming band, and C++ firmware (`main_node.cpp`).
* **Speaker**: "Our architecture splits AI into two models. Model 1 runs directly on the STM32 MCU. Every 15 minutes, it wakes up, processes acoustic audio FFT in the 200 to 400 Hertz swarming band, checks thermal drift, and classifies hive health. To save battery, the radio stays off when healthy and only transmits 12-byte telemetry packets when a Distressed state is detected."

### Scene 4: Custom Gateway Receiver & Dashboard (2:45 - 3:45)
* **Visual**: Demonstration of the custom Wio-E5 Receiver Unit (`receiver_gateway.cpp`), OLED display, and live web dashboard (`app.html`).
* **Speaker**: "In compliance with IEEE Phase 2 rules requiring a self-built reader, we designed our own custom LoRa gateway receiver. When an alert arrives, Model 2 analyzes the parameters and outputs plain-language advisory warnings to the beekeeper's mobile PWA app, giving actionable advice like swarming risk or queen loss."

### Scene 5: KPIs & Conclusion (3:45 - 4:30)
* **Visual**: Summary slide displaying the 4 KPIs ($18.74 BOM, 0.85 mWh/day, 65x55x15mm / 67g, 4.2 km range / ±0.5°C accuracy) and team credits.
* **Speaker**: "Beevil Knievel achieves all four competition KPIs: ultra-low cost at $18.74, 18-month solar-assisted battery life, compact 54 cm³ footprint, and 4-kilometer LoRa range. Thank you, IEEE HART committee!"
