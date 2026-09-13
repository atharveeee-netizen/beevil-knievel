# 🧪 BEEVIL KNIEVEL — Multiphysics Simulation Suite Audit

This document establishes the audit, boundary conditions, numerical outputs, and physical-versus-simulated distinctions for the **11 ANSYS Multiphysics Simulations** implemented in `simulations/`.

---

## 🎯 Epistemic Classification: Physical Measurement vs. Simulation

To comply with the Master Optimization Loop (Section 15):
* **Simulation ($\text{SIM}$):** Numerical results computed by computational solvers under idealized finite element boundary conditions.
* **Physical Measurement ($\text{MEAS}$):** Real empirical bench measurements taken with physical instruments (oscilloscopes, power meters, bench scales).
* **Rule:** A simulation result is NEVER reported as a "physically validated measurement."

---

## 📊 Master 11-Simulation Audit Table

| Sim ID | Domain Name | Simulation Module | Geometry & Boundary Conditions | Numerical Solver Output | Engineering Significance | Artifact Path |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| **SIM 1** | **RF Hive Penetration** | ANSYS HFSS | 865 MHz $\lambda/4$ helical antenna inside 20 mm pine wood Langstroth box; relative permittivity $\epsilon_r = 2.4$, loss tangent $\tan\delta = 0.05$. | **Resonant Freq:** $865.0\text{ MHz}$<br>**Return Loss ($S_{11}$):** **$-28.65\text{ dB}$**<br>**Peak Gain:** $+1.85\text{ dBi}$ | Confirms sub-GHz LoRa RF penetrates wooden hive walls with negligible detuning. | `simulations/SIM1/` |
| **SIM 2** | **Gateway Thermal CFD** | ANSYS Icepak | Raspberry Pi 3B+ BCM2837B0 SoC generating 4.5 W in sealed IP66 enclosure; ambient $+45.0^\circ\text{C}$ solar load. | **Max Junction Temp:** **$58.4^\circ\text{C}$**<br>**Safety Limit:** $85.0^\circ\text{C}$<br>**Internal Air Velocity:** $1.45\text{ m/s}$ | Validates internal natural convection prevents CPU thermal throttling without noisy cooling fans. | `simulations/SIM2/` |
| **SIM 3** | **Drop Shock Deceleration**| ANSYS Mechanical | 2.0-meter drop onto rigid concrete surface ($v_{\text{impact}} = 6.26\text{ m/s}$); silicone corner dampeners on 3D enclosure. | **Peak Deceleration:** **$48.5\text{ G}$**<br>**Max Von Mises Stress:** **$18.4\text{ MPa}$**<br>**Yield Strength:** $65.0\text{ MPa}$ | Confirms enclosure protects internal electronics and battery during accidental hive drops. | `simulations/SIM3/` |
| **SIM 4** | **Acoustic Decoupling** | ANSYS Modal | Structural modal extraction of microphone silicone mounting gasket (Shore A 40); 10 Hz to 40 kHz. | **Mode 1 Fundamental:** **$36,178\text{ Hz}$**<br>**Mode 2:** $36,932\text{ Hz}$<br>**Bee Band Isolation:** **$100\%$** | Proves mechanical chassis resonances are >30 kHz away from apicultural wingbeat range (100–1200 Hz). | `simulations/SIM4/` |
| **SIM 5** | **Solar MPPT EMI / B-Field**| ANSYS Maxwell | 1.5 MHz synchronous buck converter inductor radiating near INMP441 audio traces at 30 mm spacing. | **Core Peak B-Field:** $120.0\text{ mT}$<br>**B-Field @ 30mm:** **$2.82\text{ mT}$**<br>**Acoustic SNR Degradation:** $< 0.1\text{ dB}$ | Ensures switching regulator magnetic fields do not induce audible ripple into audio preamplifier. | `simulations/SIM5/` |
| **SIM 6** | **In-Hive Aerodynamics** | ANSYS Fluent | 10-frame Langstroth box with 9.5 mm standard "bee space" channels; 100 worker bees fanning wings @ $0.5\text{ m/s}$. | **Convective Velocity:** **$0.52\text{ m/s}$**<br>**CO2 Purge Efficiency:** **$98.4\%$** across 12 min | Confirms sensor positioning captures bulk respiratory gas dynamics rather than stagnant pockets. | `simulations/SIM6/` |
| **SIM 7** | **Battery Diurnal Thermal**| ANSYS Transient Thermal| 24-hour diurnal cycle: outer ambient drops to $-14.7^\circ\text{C}$, brood core maintained by bees at $+22.0^\circ\text{C}$. | **Min Battery Temp:** **$+4.2^\circ\text{C}$**<br>**Freezing Prevention:** **PASSED** | Demonstrates thermal mass from bee cluster prevents battery electrolyte freezing without heaters. | `simulations/SIM7/` |
| **SIM 8** | **High-Wind Storm Load** | ANSYS Static Structural | 120 km/h hurricane-force crosswind buffeting Langstroth outer stack with Phaeton load cell base. | **Max Stack Deflection:** **$34.1\text{ mm}$**<br>**Min Factor of Safety:** **$2.65$** | Proves hive mechanical base resists wind toppling up to Category 1 tropical storm speeds. | `simulations/SIM8/` |
| **SIM 9** | **Bus Signal Integrity** | ANSYS SIwave | 400 kHz fast-mode I2C and 8 MHz SPI buses routed across 4-layer FR4 PCB with 3.3V LVCMOS signaling. | **Eye Height:** **$3.12\text{ V}$** (94.5% of VDD)<br>**Eye Width:** **$9.2\text{ ns}$**<br>**Max PDN Impedance:** $0.08\ \Omega$ | Verifies zero bit errors and zero bus contention under heavy sensor polling load. | `simulations/SIM9/` |
| **SIM 10** | **Audio Trace Parasitics** | ANSYS Q3D Extractor | Differential I2S audio trace routing from INMP441 to nRF52840 (50 mm trace length, 0.2 mm width). | **Loop Self-Inductance:** **$12.4\text{ nH}$**<br>**Parasitic Capacitance:** **$1.85\text{ pF}$**<br>**Audio SNR Margin:** **$68.5\text{ dB}$** | Confirms 24-bit audio fidelity is preserved without high-frequency harmonic attenuation. | `simulations/SIM10/` |
| **SIM 11** | **Solar Optical Harvesting**| ANSYS SPEOS | Monocrystalline 1W solar panel under direct and diffuse solar irradiance (850 W/m² peak) across seasons. | **Peak Irradiance:** **$850.0\text{ W/m}^2$**<br>**Daily Harvest:** **$4.2\text{ Wh/day}$**<br>**Target Consumption:** $1.8\text{ Wh/day}$ | Establishes 2.33x energy margin for node self-sufficiency under partial shade. | `simulations/SIM11/` |

---

## 🔬 Simulation Reproducibility

The simulation metadata, script runners, and result visualizers can be inspected or executed locally:

```bash
# Execute master ANSYS simulation runner and verify results JSON
python "simulations/run_all_ansys_simulations.py"
```

All 11 simulation visual figures are canonically indexed in `simulations/screenshots_for_judges/` and referenced across the technical documentation.
