# SYSTEM INTEGRITY & ARCHITECTURAL RULES (Rules.md)

**Project:** BEEVIL KNIEVEL  
**Mandate:** Zero-Slop Architectural Compliance  

---

## 1. Zero AI Slop Rule (Absolute)
1. No ungrounded raster graphics in architectural sections.
2. No fake IC parts, fictional bus topologies, or invented protocol names.
3. No glowing brains, floating futuristic HUD panels, or generic marketing fluff.
4. All architecture figures must be programmatic, deterministic vector graphics (SVG) with reproducible python generation scripts.

## 2. Hardware Truth Rule
1. Core Field Node MCU is strictly the Nordic nRF52840 (ARM Cortex-M4F @ 64 MHz) paired with Semtech SX1262 LoRa module on RAKwireless WisBlock base.
2. Gateway processor is strictly the Raspberry Pi 3B+ (Broadcom BCM2837B0 quad-core Cortex-A53 @ 1.4 GHz) paired with Waveshare SX1262 LoRa HAT.
3. Core brood temperature sensor is strictly TI TMP117 (I2C 0x48, $\pm 0.1^\circ\text{C}$).
4. Frame gradient temperature sensors are strictly 5x Maxim DS18B20 digital probes on 1-Wire.
5. Acoustic transducer is strictly InvenSense INMP441 I2S MEMS microphone.
6. CO2 sensor is strictly Sensirion SCD41 photoacoustic NDIR sensor.
7. Any document, diagram, or table claiming different ICs must be corrected immediately.

## 3. Mathematical & Empirical Integrity Rule
1. All acoustic DSP sampling is $f_s = 2000\text{ Hz}$, $N=256$, $\Delta f = 7.8125\text{ Hz}$.
2. Synthetic validation must be clearly distinguished from empirical field measurements.
3. CUSUM drift detection operates on Page (1954) cumulative residual formulation.
4. Standard ASCII hyphens (`-`) must be used universally; zero Unicode em-dashes or en-dashes in code or diagram SVG sources.
