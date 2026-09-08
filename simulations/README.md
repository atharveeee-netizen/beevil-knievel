# Beevil Knievel - Master ANSYS Multiphysics Simulation Suite

This directory contains the complete **ANSYS Multiphysics Simulation Suite (Simulations #1 to #11)** for the **Beevil Knievel Cyber-Physical Beehive Monitoring Platform**.

The suite covers high-frequency electromagnetics, computational fluid dynamics (CFD), transient shock impact dynamics, structural FEA, modal vibration isolation, parasitics extraction, and solar optical ray tracing.

---

## 📊 Summary of Simulation Results

| Sim # | Simulation Name | ANSYS Module | Key Metric / Result | Target / Limit | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Sim 1** | **RF Hive Penetration** | ANSYS HFSS | Resonant Freq: **0.865 GHz**, S11 = -28.65 dB, Gain: **1.85 dBi** | S11 < -10 dB | ✅ **PASSED** |
| **Sim 2** | **Gateway Thermal CFD** | ANSYS Icepak | Max Junction Temp: **58.4°C**, Max Velocity: **1.45 m/s** | T_max < 85.0°C | ✅ **PASSED** |
| **Sim 3** | **Drop Shock Deceleration** | ANSYS Mechanical | 2.0m Drop: **48.5 g**, Max von Mises Stress: **18.4 MPa** | Yield Limit: **65.0 MPa** | ✅ **PASSED** |
| **Sim 4** | **Acoustic Decoupling** | ANSYS Modal | Structural Resonances: **36.18 kHz & 36.93 kHz** | Isolated from Bee Bandwidth (20-1000 Hz) | ✅ **PASSED** |
| **Sim 5** | **Solar MPPT EMI/EMC** | ANSYS Maxwell | Peak Core B: **120.0 mT**, Field at 30mm: **2.82 mT** | Shielded to <0.1 mT at Sensor | ✅ **PASSED** |
| **Sim 6** | **In-Hive Aerodynamics** | ANSYS Fluent | Bee Space: **9.5 mm**, Airflow: **0.52 m/s**, CO2 Purge: **98.4%** | Maintain Passive Circulation | ✅ **PASSED** |
| **Sim 7** | **Battery Diurnal Thermal** | ANSYS Mechanical | Brood Core: **22.0°C**, Freezing Ext: **-14.7°C**, Battery: **4.2°C** | T_batt > 0.0°C | ✅ **PASSED** |
| **Sim 8** | **High-Wind Storm Load** | ANSYS Static Structural | Wind Speed: **120 km/h**, Max Deflection: **34.1 mm**, FoS: **2.65** | Safety Factor > 2.0 | ✅ **PASSED** |
| **Sim 9** | **Bus Signal Integrity** | ANSYS SIwave | Eye Height: **3.12 V**, Eye Width: **9.2 ns**, PDN Max Z: **0.08 Ω** | Clear Eye Opening | ✅ **PASSED** |
| **Sim 10** | **Audio Trace Parasitics** | ANSYS Q3D | Self-Inductance: **12.4 nH**, Parasitic C: **1.85 pF**, SNR Margin: **68.5 dB** | High SNR Audio Preservation | ✅ **PASSED** |
| **Sim 11** | **Solar Optical Harvesting** | ANSYS SPEOS | Peak Irradiance: **850 W/m²**, Daily Harvest: **4.2 Wh/day** | Node Energy Target: **1.8 Wh/day** | ✅ **PASSED** |

---

## 📁 Folder Structure

`
simulations/
├── README.md                                            # This master documentation
├── master_ansys_results.json                            # Verified numerical outputs exported in JSON format
├── run_all_ansys_simulations.py                        # Python master test runner & verification suite
├── automate_maxwell.vbs                                 # VBScript macro for Maxwell EMI batch solving
├── Design1_SpaceClaim_Geometry.scdocx                   # ANSYS SpaceClaim CAD 3D enclosure model
├── Beehive_Monitoring_ANSYS_Simulations_Presentation.pptx # Official slide deck showcasing simulation results
├── screenshots_for_judges/                              # High-resolution solver visual screenshots for competition judging
├── SIM1/                                                # Sim 1: RF Hive Penetration (.aedt, S11 plots)
├── SIM2/                                                # Sim 2: Gateway Thermal CFD (.wbpj, thermal maps)
├── SIM3/                                                # Sim 3: Drop Shock Deceleration (.wbpj, von Mises stress contours)
├── SIM4/                                                # Sim 4: Acoustic Decoupling (.wbpj, frequency response)
├── SIM5/                                                # Sim 5: Solar MPPT EMI/EMC (.aedt, B-field contours)
├── SIM6/                                                # Sim 6: In-Hive Aerodynamics (.wbpj, velocity streamlines)
├── SIM7/                                                # Sim 7: Battery Diurnal Thermal (.wbpj, 24-hr temperature curves)
├── SIM8/                                                # Sim 8: High-Wind Storm Load (.wbpj, deflection field)
├── SIM9/                                                # Sim 9: Bus Signal Integrity (.aedt, eye diagrams)
├── SIM10/                                               # Sim 10: Audio Trace Parasitics (.aedt, RLC matrix)
└── SIM11/                                               # Sim 11: Solar Optical Harvesting (.wbpj, irradiance heatmaps)
`

---

## 🚀 Running the Verification Suite

To verify all simulation results and generate the exported data schema locally, run:

`ash
python run_all_ansys_simulations.py
`
