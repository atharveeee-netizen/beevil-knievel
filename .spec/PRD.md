# PRODUCT REQUIREMENTS DOCUMENT (PRD)

**Project:** BEEVIL KNIEVEL (Precision Edge AI & Multi-Hop LoRa Smart Apiculture Platform)  
**Target:** IEEE-HART Autonomous Apiculture Instrumentation  
**Status:** Validated & Deployed  

---

## 1. Problem Statement
Commercial apiculture experiences annual colony collapse and overwintering mortality rates exceeding 40%. Traditional beekeeping relies on manual hive inspections:
1. **Intrusive Disruption**: Opening a Langstroth hive breaches internal propolis seals, dissipates regulated brood chamber warmth ($34.5^\circ\text{C} \pm 1.5^\circ\text{C}$), and stresses queen oviposition for 24-48 hours.
2. **Late Diagnosis**: Visual inspection discovers swarming, queenlessness, or chalkbrood/foulbrood only *after* irreversible damage or absconding has occurred.
3. **Severe Telemetry Bottleneck**: Remote rural apiaries lack cellular connectivity and mains electrical power, necessitating ultra-low-power edge intelligence that operates for 18+ months on solar/LiFePO4.

---

## 2. Core Functional Requirements
1. **Bio-Acoustic Surveillance**: Continuous sampling of acoustic hive resonance at $f_s = 2000\text{ Hz}$ with on-MCU CMSIS-DSP 256-point FFT ($\Delta f = 7.8125\text{ Hz}$) to detect queen piping ($300-500\text{ Hz}$) and pre-swarming acoustic power shifts ($200-300\text{ Hz}$).
2. **Precision 5-Point Thermal Gradient**: Real-time tracking of brood cluster thermoregulation using NIST-traceable TI TMP117 ($\pm 0.1^\circ\text{C}$) and 5x waterproof digital probes across Langstroth frames 1 to 5.
3. **Respiration & Multi-Gas Monitoring**: NDIR CO2 measurement ($400-5000\text{ ppm}$) via Sensirion SCD41 and MOX VOC/eCO2 via Bosch BME688 to detect foulbrood volatile signatures and colony metabolic suffocation.
4. **Autonomous Edge Analytics**: In-gateway sequential CUSUM drift detection (Page, 1954) on thermal and acoustic variance to flag colony anomalies 14 days prior to visual symptoms.
5. **Sub-GHz Robust Telemetry**: Long-range, foliage-penetrating LoRa mesh (865-867 MHz IN865 band) operating up to 1.5 km through dense tree canopy and 15 km line-of-sight.
6. **Local-First Gateway & Cryptographic Ledger**: Raspberry Pi 3B+ edge gateway with SQLite WAL storage, FastAPI local dashboard, and HoneyChain SHA-256 tamper-evident telemetry block sequence.
