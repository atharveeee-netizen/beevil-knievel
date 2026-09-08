# 🐝 BEEVIL KNIEVEL - MATLAB & Simulink Simulation Suite

This directory contains the reproducible mathematical, acoustic, thermal, power, and RF simulation models underpinning the **BEEVIL KNIEVEL** autonomous precision-apiculture cyber-physical monitoring platform.

---

## 📁 Directory Taxonomy

```
simulation/
├── matlab/                          # Core MATLAB (.m) scripts & Python runner
│   ├── acoustic_dsp_pipeline.m      # 256-pt FFT, windowing, and band energy integration
│   ├── fft_resolution_validation.m  # Δf = 7.8125 Hz resolution & Hanning leakage proof
│   ├── acoustic_event_simulation.m  # 4-phase biological colony state transition model
│   ├── cusum_anomaly_detection.m    # Page (1954) cumulative sum change-point drift detector
│   ├── hive_thermal_model.m         # 2-node lumped parameter differential thermal ODE model
│   ├── node_energy_budget_model.m   # 2.0 µA sleep, duty cycle, and 18-month battery SOC
│   ├── rf_link_budget_and_range.m   # Free-space path loss & ITU-R P.833-9 canopy attenuation
│   ├── telemetry_network_scaling.m  # 1-100 hive airtime scaling & 8-channel gateway load
│   └── run_simulations.py           # Automated mathematical execution & figure exporter
├── simulink/                        # Open Packaging Convention (.slx) Simulink models
│   ├── beevil_node_duty_cycle.slx   # Discrete stateflow duty-cycle current profile model
│   ├── beevil_cyber_physical_system.slx # Complete 3-tier end-to-end cyber-physical architecture
│   ├── beevil_hive_thermal_simscape.slx # Simscape lumped heat transfer & metabolic regulation
│   └── beevil_battery_solar_mppt.slx    # Simscape LiFePO4 battery equivalent circuit & MPPT
├── results/                         # Exported 300 DPI publication-grade simulation plots
│   ├── acoustic_raw_signal.png
│   ├── acoustic_fft.png
│   ├── acoustic_spectrogram.png
│   ├── acoustic_features.png
│   ├── fft_resolution_validation.png
│   ├── acoustic_event_simulation.png
│   ├── cusum_detection.png
│   ├── hive_thermal_model.png
│   ├── energy_budget.png
│   ├── duty_cycle_simulation.png
│   ├── battery_soc_simulation.png
│   ├── rf_link_budget.png
│   ├── rf_range_sweep.png
│   └── telemetry_scaling.png
├── data/                            # Benchmark input arrays & lookup tables
└── README.md                        # Reproduction guide & parameter documentation
```

---

## ⚙️ Software Compatibility & Required Toolboxes

### MATLAB & Simulink Native Execution
- **Recommended Version**: MATLAB R2022b or later (Compatible with R2020a-R2024b).
- **Required MATLAB Toolboxes**:
  - **DSP System Toolbox**: For `arm_rfft_fast_f32` emulation, frame-based streaming, and multirate filtering.
  - **Signal Processing Toolbox**: For `spectrogram()`, `hann()`, and spectral power density calculation.
  - **Communications Toolbox**: For LoRa chirp spread spectrum (CSS) modulation, AWGN channel, and path loss.
  - **Simscape / Simscape Electrical**: Required to open and execute `beevil_hive_thermal_simscape.slx` and `beevil_battery_solar_mppt.slx`.
  - **Simulink Support Package for ARM Cortex-M Processors**: For CMSIS-DSP code generation.

### Standalone Python Execution (Zero MATLAB Dependency)
For environments without a MATLAB license installed, the complete mathematical suite is replicated using SciPy, NumPy, and Matplotlib:
- Python 3.8+
- `numpy >= 1.22`
- `scipy >= 1.8`
- `matplotlib >= 3.5`

---

## 🚀 Execution & Reproduction Guide

### Method 1: Running in MATLAB
To execute any individual simulation and regenerate plots:
```matlab
cd simulation/matlab

% 1. Acoustic DSP Pipeline (Generates 4 figures)
run('acoustic_dsp_pipeline.m');

% 2. FFT Resolution Validation
run('fft_resolution_validation.m');

% 3. Acoustic Event Transition Simulation
run('acoustic_event_simulation.m');

% 4. CUSUM Anomaly Drift Filter
run('cusum_anomaly_detection.m');

% 5. Lumped Hive Thermal Model
run('hive_thermal_model.m');

% 6. Node Energy Budget & Battery SOC
run('node_energy_budget_model.m');

% 7. RF Link Budget & Range Sweep
run('rf_link_budget_and_range.m');

% 8. Telemetry Network Scaling
run('telemetry_network_scaling.m');
```

From terminal / CLI:
```bash
matlab -batch "cd('simulation/matlab'); run('acoustic_dsp_pipeline.m');"
```

### Method 2: Running the Automated Python Runner
To execute all 8 modules and regenerate all 14 publication-grade figures simultaneously:
```bash
python simulation/matlab/run_simulations.py
```
Output figures are automatically synchronized between `simulation/results/` and `docs/media/results/`.

### Method 3: Opening Simulink Models
To inspect the block diagrams, solver configurations, and Simscape physical networks:
```matlab
open_system('simulation/simulink/beevil_cyber_physical_system.slx');
open_system('simulation/simulink/beevil_node_duty_cycle.slx');
open_system('simulation/simulink/beevil_hive_thermal_simscape.slx');
open_system('simulation/simulink/beevil_battery_solar_mppt.slx');
```

---

## 🔬 Mathematical Formulations & Parameter Registry

| Simulation Module | Governing Equation | Primary Parameters | Data Source Label |
|---|---|---|---|
| **Acoustic FFT** | $X[k] = \sum_{n=0}^{N-1} x[n] w[n] e^{-j 2\pi k n / N}$ | $f_s = 2000\text{ Hz}$, $N = 256$, $\Delta f = 7.8125\text{ Hz}$, Hanning window | `SIMULATED SIGNAL` |
| **CUSUM Drift** | $S_t^- = \max(0, S_{t-1}^- - (y_t - \mu_0) - k)$ | $\mu_0 = 34.5^\circ\text{C}$, $\sigma = 0.15^\circ\text{C}$, $k = 0.5\sigma$, $h = 4.5\sigma$ | `MODEL-BASED SIMULATION` |
| **Hive Thermal ODE** | $C_{\text{brood}} \frac{dT_{\text{brood}}}{dt} = Q_{\text{met}} - \frac{T_{\text{brood}} - T_{\text{hive}}}{R_{\text{bh}}}$ | $C_{\text{brood}} = 45\text{ kJ/K}$, $C_{\text{hive}} = 85\text{ kJ/K}$, $R_{\text{bh}} = 0.85\text{ K/W}$, $R_{\text{ha}} = 0.45\text{ K/W}$ | `MODEL-BASED SIMULATION` |
| **Energy Budget** | $E_{\text{cycle}} = \sum_{i=1}^M I_i \cdot V_{\text{sys}} \cdot \Delta t_i$ | Sleep: $2.0\,\mu\text{A}$ ($289.5\text{s}$), Audio: $3.2\text{ mA}$ ($10\text{s}$), Tx: $38\text{ mA}$ ($0.35\text{s}$), $V_{\text{sys}} = 3.3\text{ V}$ | `CALCULATED` |
| **RF Link Budget** | $P_{\text{rx}} = P_t + G_t + G_r - L_{\text{tx}} - L_{\text{rx}} - L_{\text{hive}} - \text{FSPL} - L_{\text{canopy}}$ | $P_t = +14\text{ dBm}$, $G_t = 2.15\text{ dBi}$, $G_r = 3.0\text{ dBi}$, $L_{\text{hive}} = 8.72\text{ dB}$, $\alpha_{\text{canopy}} = 0.18\text{ dB/m}$ | `CALCULATED LINK BUDGET` |
| **Network Scaling** | $D_{\text{channel}} = \frac{N_{\text{hives}} \cdot (T_{\text{air}} / 300\text{s})}{N_{\text{channels}}}$ | Payload: 24 Bytes, ToA: $328.7\text{ ms}$ (@ SF10), $N_{\text{channels}} = 8$ | `MODEL / CALCULATED` |

---

## ⚠️ Simulation Assumptions & Engineering Boundaries

1. **Synthetic Acoustic Signals**: Acoustic inputs in `acoustic_dsp_pipeline.m` and `acoustic_event_simulation.m` are **synthesized numerical signals** designed to evaluate algorithmic frequency discrimination across published biological bands (140 Hz fanning, 240 Hz waggle, 340 Hz piping, 520 Hz queen distress). They are **not** field microphone recordings.
2. **Thermal Homogeneity**: The lumped-parameter thermal model assumes a uniform brood cluster temperature and ignores spatial gradients along honey frame margins.
3. **RF Propagation Boundaries**: The 15.0 km LOS calculation assumes a standard flat Earth radio horizon with clearance of the 60% first Fresnel zone. The 1.5 km dense pine canopy calculation uses ITU-R P.833-9 with maximum clutter saturation of 35 dB. Actual field range depends heavily on local antenna elevation, terrain topology, and seasonal foliage density.
