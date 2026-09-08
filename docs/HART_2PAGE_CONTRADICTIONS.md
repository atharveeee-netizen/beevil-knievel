# BEEVIL KNIEVEL — 2-PAGE REPORT CONTRADICTION RESOLUTION AUDIT

**Document:** Canonical Pre-Submission Contradiction Audit  
**Target:** IEEE HART HardwAIre Challenge Phase 2 (Strict 2-Page Limit)  
**Standard:** Syzygy Context-Aware Truth Governance  

---

## 1. Comprehensive Contradiction Audit Matrix

Before drafting the final two-page publication description, all historical discrepancies across drafts, commit logs, simulations, and hardware manifests were audited and systematically resolved against physical repository truth.

| PARAMETER | LEGACY OR COMPETING CLAIMS | CANONICAL REPOSITORY TRUTH | EVIDENCE & RATIONALE |
|---|---|---|---|
| **MCU Platform** | ESP32-WROOM vs nRF52840 | **Nordic Semiconductor nRF52840** (ARM Cortex-M4F @ 64 MHz) | Core platform in `boards/wiscore_rak4631.json`, `firmware/src/main.cpp`. Lower sleep current (<18 $\mu\text{A}$) than ESP32. |
| **RF Transceiver** | SX1276 vs SX1262 | **Semtech SX1262** Sub-GHz LoRa Transceiver | Hardwired in RAK4631 module; +14 dBm Tx, -137 dBm sensitivity, higher Rx efficiency. |
| **Radio Frequency** | 868.0 MHz (EU) vs 865.0625 MHz (IN865) | **865.0625 MHz** (Channel 1, IN865 band); 868.0 MHz configurable | IN865 aligns with India WPC license-free telemetry band (GSR 564(E)). |
| **Telemetry Payload Size**| 24 bytes vs 32 bytes vs 33 bytes | **33 Bytes Packed Binary Struct** (`BeevilLoRaPayload`) | Confirmed via `struct.calcsize("<Hh5hHHHHH B8B")` in `tests/test_firmware_telemetry.py`. |
| **Audio FFT Points** | 128 points vs 256 points | **256-point Real FFT** via ARM CMSIS-DSP (`arm_rfft_fast_f32`) | Standardized in `firmware/src/main.cpp`; provides $\Delta f = 62.5\text{ Hz}$ resolution at 16 kHz. |
| **Audio Sample Rate** | 2000 Hz vs 16,000 Hz | **16,000 Hz** (16 kHz I2S Digital PCM) | Allows clean Nyquist margin ($8000\text{ Hz}$) capturing all wingbeat harmonics up to 1000 Hz without aliasing. |
| **Microphone Source** | Synthetic `sinf(180t)` vs Real I2S MEMS | **Real I2S Digital MEMS** (INMP441 / ICS-43434) | Fake sine math eradicated. Absent microphone reports `NOT_CONNECTED` with zeroed energy bands. |
| **Primary Temp Sensor** | Generic DS18B20 vs TI TMP117 | **TI TMP117** (Core RTD, $\pm 0.1^\circ\text{C}$) + **5x DS18B20** (Grid) | TMP117 provides NIST-traceable precision at Frame 4/5; DS18B20 provides 5-frame spatial gradient. |
| **Battery Chemistry** | 3.2V LiFePO4 vs 3.7V Li-ion / LiPo | **1S 3.7V Li-ion (NMC) / LiPo** (3.27V cutoff to 4.20V full) | Onboard TP4054 charger is hardware-hardwired for 4.20V termination. LiFePO4 claims eradicated. |
| **Battery Capacity** | 1000 mAh vs 3000 mAh | **1000 mAh to 3000 mAh** 1S Cell (Bench prototype tested with 3000 mAh 18650) | Fully compatible with 7-point OCV lookup table and Arrhenius temperature compensation. |
| **Gateway Architecture** | Off-the-shelf COTS Gateway vs Custom Gateway | **Custom Edge Gateway** (Raspberry Pi 3B+ with Waveshare SX1262 LoRa HAT) | Strictly satisfies IEEE Phase 2 rules forbidding commercial COTS readers. |
| **PCB Provenance** | "AI generated PCB" vs Team designed | **Custom PCB Designed by Team**; AI-assisted analysis and firmware iteration | Transparent division of engineering responsibility: human hardware design, AI engineering acceleration. |
| **Deep Sleep Current** | 1.5 $\mu\text{A}$ vs 18 $\mu\text{A}$ | **18 $\mu\text{A}$ Quiescent System Sleep** | Measured on bench with switched peripheral rail (WB_IO2 / P1.02) and active P0.29 divider gate. |
| **Wireless Range** | 15 km vs 4.2 km | **4.2 km Line-of-Sight** [CALCULATED]; **1.5 km Canopy** [ESTIMATED] | 142 dB link budget with 26.16 dB simulated fade margin (`scripts/create_simulink_models.py`). |
| **Prototype Deployment**| "Field deployed in apiary" vs Bench prototype | **Bench Evaluation Prototype** (USB-Connected) | Honest truth: hardware validated on laboratory test bench; live beehive deployment is target/proposed. |

---

## 2. Mandatory Rules Enforced in the 2-Page Report

1. **Explicit Evidence Labeling:** Every numerical metric must carry its scientific tag (`[MEASURED]`, `[VALIDATED]`, `[CALCULATED]`, `[SIMULATED]`, `[ESTIMATED]`).
2. **Temperature Primacy:** Temperature sensing is highlighted as the primary HART requirement, supported by acoustic and environmental multi-modal sensing.
3. **No Decorative AI Art:** Only technical vector diagrams, schematics, and measured/simulated plots are included.
4. **Hard 2-Page Boundary:** Text density and figure geometry engineered to strictly fit within two pages without overflow.
