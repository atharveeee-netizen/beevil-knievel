# 🗺️ BEEVIL KNIEVEL — Research-to-System Traceability Map

> [!IMPORTANT]
> **Engineering Boundary Disclaimer**:
> Research cited across this repository establishes the peer-reviewed scientific and engineering context for honeybee biology, acoustic biophysics, thermodynamics, and Sub-GHz RF propagation. **BEEVIL KNIEVEL implements, simulates, and evaluates its own independent hardware, firmware, and edge software designs.** Citation of external literature does not imply external endorsement, nor does it replace empirical validation of BEEVIL hardware.

---

## 🔬 Four-Stage Traceability Pipeline

Each entry maps authoritative peer-reviewed literature through engineering implications into concrete BEEVIL implementation artifacts:

```
RESEARCH FINDING
       ↓
ENGINEERING IMPLICATION
       ↓
BEEVIL DESIGN DECISION
       ↓
BEEVIL COMPONENT
```

---

### 1. Acoustic Frequencies & Swarm Pre-Warning
- **Research Finding**: Ferrari et al. (2008) and Bencsik et al. (2011) demonstrate that *Apis mellifera* acoustic emissions shift during pre-swarming preparation: energy in the $100 - 200\text{ Hz}$ fanning band surges into the $300 - 400\text{ Hz}$ band 24 to 48 hours before swarm takeoff, accompanied by queen piping pulses at $320 - 450\text{ Hz}$.
- **Engineering Implication**: An embedded acoustic sensing system must achieve frequency resolution finer than $10\text{ Hz}$ across the $100 - 500\text{ Hz}$ band, with high sidelobe suppression to prevent fanning leakage from triggering false pre-swarm warnings.
- **BEEVIL Design Decision**: Sample at $f_s = 2000\text{ Hz}$, apply a 256-point Hanning window, and execute a 256-point real FFT yielding $\Delta f = 7.8125\text{ Hz}$ resolution per bin. Partition bins into 4 dedicated sub-bands: Fanning (100–180 Hz, $k=13..23$), Waggle (200–280 Hz, $k=26..36$), Pre-Swarm (300–400 Hz, $k=38..51$), and Distress (450–750 Hz, $k=58..96$).
- **BEEVIL Component**:
  - Firmware: [`firmware/main_node.cpp`](../../firmware/main_node.cpp) (I2S DMA audio acquisition and CMSIS-DSP `arm_rfft_fast_f32`)
  - MATLAB Model: [`simulation/matlab/acoustic_dsp_pipeline.m`](../../simulation/matlab/acoustic_dsp_pipeline.m)
  - Validation Plot: [`docs/media/results/fft_resolution_validation.png`](../media/results/fft_resolution_validation.png)

---

### 2. Brood Nest Core Thermoregulation & Larval Health
- **Research Finding**: Heinrich (1993), Jones et al. (*Science* 2004), and Stabentheiner et al. (2010) show that honeybees regulate the core brood nest at $34.5^\circ\text{C} \pm 1.5^\circ\text{C}$ to ensure proper pupal wing development. Temperature drops below $32.0^\circ\text{C}$ cause high larval mortality and morphological wing deformities; sustained elevation above $36.5^\circ\text{C}$ causes heat stupor.
- **Engineering Implication**: Temperature sensors must have sub-tenth-degree absolute accuracy ($\pm0.1^\circ\text{C}$) and NIST traceability, placed directly along the central brood frame face without conducting hive outer wall temperature gradients into the reading.
- **BEEVIL Design Decision**: Deploy a 5-point sensor probe utilizing Texas Instruments TMP117 NIST-traceable digital RTDs ($\pm0.1^\circ\text{C}$ across $-20^\circ\text{C}$ to $+50^\circ\text{C}$, 16-bit resolution $0.0078^\circ\text{C}$) routed on ultra-thin flexible PCB ribbon clamped to Frame 4.
- **BEEVIL Component**:
  - Hardware Schematic: [`hardware/schematics/`](../../hardware/schematics/)
  - MATLAB Model: [`simulation/matlab/hive_thermal_model.m`](../../simulation/matlab/hive_thermal_model.m)
  - Thermal Plot: [`docs/media/results/hive_thermal_model.png`](../media/results/hive_thermal_model.png)

---

### 3. Sequential Change-Point Detection for Slow Biological Drift
- **Research Finding**: Page (1954) and Basseville & Nikiforov (1993) establish that cumulative sum (CUSUM) change-point sequential testing detects subtle mean shifts embedded in noisy physiological time series significantly faster and with lower false-alarm rates than static upper/lower threshold alarms.
- **Engineering Implication**: Slow brood chilling from declining worker population or queen failure ($0.02^\circ\text{C}/\text{hr}$ drift) is masked by sensor noise ($\sigma = 0.15^\circ\text{C}$) and will not cross coarse $\pm2^\circ\text{C}$ static threshold alarms until larvae have suffered irreversible chill shock.
- **BEEVIL Design Decision**: Implement an on-gateway recursive CUSUM drift filter calculating $S_t^+ = \max(0, S_{t-1}^+ + (y_t - \mu_0) - k)$ and $S_t^- = \max(0, S_{t-1}^- - (y_t - \mu_0) - k)$ with allowance $k = 0.5\sigma$ and decision threshold $h = 4.5\sigma$.
- **BEEVIL Component**:
  - Gateway Analytics: [`gateway/server.py`](../../gateway/server.py) (`CUSUMBroodFilter` implementation)
  - MATLAB Model: [`simulation/matlab/cusum_anomaly_detection.m`](../../simulation/matlab/cusum_anomaly_detection.m)
  - Detection Plot: [`docs/media/results/cusum_detection.png`](../media/results/cusum_detection.png)

---

### 4. RF Propagation Through Stratified Hive Dielectric Media
- **Research Finding**: Nelson (1992) and ITU-R P.833-9 document dielectric properties of agro-biological media: pine wood exhibits $\epsilon_r' = 2.2, \tan\delta = 0.04$; high-moisture honey/comb exhibits $\epsilon_r' = 4.5, \tan\delta = 0.12$; and dense biological bee clusters exhibit $\epsilon_r' \approx 35.0, \tan\delta \approx 0.35$. Foliage attenuation in dense forest clutter introduces approximately $0.18\text{ dB/m}$ at $865\text{ MHz}$.
- **Engineering Implication**: Inside-hive transceivers must overcome approximately $8.7\text{ dB}$ of stratified hive attenuation before reaching free space. At $2.4\text{ GHz}$ (Wi-Fi/BLE), path loss and comb water absorption severely limit range to $< 15\text{ m}$. Sub-GHz frequencies ($865\text{ MHz}$) achieve vastly superior dielectric penetration and propagation through forest canopy.
- **BEEVIL Design Decision**: Standardize radio link on the $865.0 - 867.0\text{ MHz}$ IN865 ISM band (Semtech SX1262 LoRa engine, $+14\text{ dBm}$ Tx power, $-132\text{ dBm}$ sensitivity @ SF10, 125 kHz BW), external low-loss collinear gateway antenna, and regenerative multi-hop mesh routing.
- **BEEVIL Component**:
  - ANSYS Simulation: [`hardware/simulations/ansys_hfss_lora_antenna.py`](../../hardware/simulations/ansys_hfss_lora_antenna.py)
  - MATLAB Model: [`simulation/matlab/rf_link_budget_and_range.m`](../../simulation/matlab/rf_link_budget_and_range.m)
  - Range Plot: [`docs/media/results/rf_range_sweep.png`](../media/results/rf_range_sweep.png)

---

### 5. Multi-Year Field Autonomy via Duty-Cycled Energy Management
- **Research Finding**: Roundy, Steingart, et al. (2004) and Raghunathan et al. (2005) demonstrate that agricultural IoT sensors in temperate/sub-tropical climates can achieve multi-year continuous operation only if active duty cycles remain below $0.5\%$, with deep-sleep current restricted to $< 5.0\,\mu\text{A}$.
- **Engineering Implication**: In-hive nodes cannot maintain continuous radio or acoustic listening without depleting typical lithium batteries in under 14 days. Energy harvesting and aggressive deep sleep are strictly required.
- **BEEVIL Design Decision**: Structure firmware into a 300-second (5-minute) periodic duty cycle: $289.45\text{s}$ in System ON deep sleep ($2.0\,\mu\text{A}$), $0.15\text{s}$ sensor read ($2.5\text{ mA}$), $10.0\text{s}$ acoustic acquisition ($3.2\text{ mA}$), $0.05\text{s}$ FFT execution ($8.5\text{ mA}$), and $0.35\text{s}$ LoRa transmission ($38\text{ mA}$). Total energy per cycle is $3.0\text{ mJ}$ ($0.85\text{ mWh/day}$), supported by a $1200\text{ mAh}$ LiFePO4 cell and $0.5\text{W}$ monocrystalline solar MPPT charger.
- **BEEVIL Component**:
  - Firmware: [`firmware/main_node.cpp`](../../firmware/main_node.cpp) (FreeRTOS low-power tickless idle)
  - MATLAB Model: [`simulation/matlab/node_energy_budget_model.m`](../../simulation/matlab/node_energy_budget_model.m)
  - Simulink Model: [`simulation/simulink/beevil_node_duty_cycle.slx`](../../simulation/simulink/beevil_node_duty_cycle.slx)
  - Energy Plot: [`docs/media/results/battery_soc_simulation.png`](../media/results/battery_soc_simulation.png)
