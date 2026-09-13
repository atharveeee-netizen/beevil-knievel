# ⚠️ BEEVIL KNIEVEL — Technical Limitations & Operational Failure Modes

Engineering rigor requires full transparency regarding what has been validated, what is bounded by assumption, and where physical or algorithmic failure modes exist. This document details the engineering limitations, operational boundaries, and open technical challenges of the Beevil Knievel smart apiculture platform.

---

## 1. Prototype Maturity & Field Validation Status

* **Current Status: Technology Readiness Level (TRL) 4 / 5.**
  * The system is a fully functional bench-validated cyber-physical prototype with complete sensor acquisition, DSP feature extraction, binary LoRa RF packet transmission, gateway SQLite ingestion, and dashboard visualization.
  * **Important Limitation:** The system has **not yet completed multi-season commercial field trials** across an active commercial apiary. Claims regarding "100-hive deployment" represent **architectural capacity targets and simulated stress loads**, not physical field installations in the wild.
* **Environmental Exposure:**
  * While individual sensor components possess factory IP ratings or conformal coating in design, the complete assembled 3D-printed/machined enclosure has not undergone formal IP67 chamber pressure certification.

---

## 2. Telecommunications & RF Boundaries

* **Network Topology Reality:**
  * The physical system operates as a **single-hop LoRa star network** (Field Nodes $\rightarrow$ Waveshare SX1262 Gateway Base Station).
  * While multi-hop mesh routing headers exist in firmware design (`beevil_mesh_protocol.h`), live physical deployments rely on direct star topology. Reviewers should not expect autonomous ad-hoc mesh re-routing in the current build.
* **RF Propagation Margins:**
  * The 15.0 km range claim is a **calculated theoretical line-of-sight maximum** based on Friis path loss equations (+14 dBm TX, -137 dBm RX sensitivity, 0 dBi antennas, +31 dB link margin).
  * In dense agricultural terrain, wet tree canopies introduce attenuation up to $0.2\text{ dB/m}$. Real-world non-line-of-sight (NLOS) range in dense forest is estimated at **1.0 – 1.5 km**.
* **Spectrum Regulation:**
  * Operates on the Indian WPC de-licensed band (865.0625 MHz, GSR 564(E)). Regional deployments in the EU (868 MHz) or US (915 MHz) require recompilation of `radio_config.h` and antenna matching adjustments.

---

## 3. Sensor Calibration, Physics & Colony Interaction

* **Propolis & Wax Fouling:**
  * Honeybees naturally coat foreign objects inside the brood box with propolis and beeswax within 2 to 4 weeks.
  * The acoustic microphone port (INMP441) and optical illuminance sensor (VEML7700) are susceptible to acoustic damping and optical occlusion if bees seal the acoustic diaphragm aperture with propolis. The current hardware relies on an acoustic breathable ePTFE membrane, but long-term propolis deposition remains an operational maintenance factor requiring seasonal inspection.
* **Brood Core Thermal Invariance:**
  * The Texas Instruments TMP117 probe measures localized temperature at the center frame. While healthy colonies thermoregulate the core to $34.5^\circ\text{C} - 35.5^\circ\text{C}$, small or declining winter clusters may contract away from the probe position, resulting in false queenless/cooling alerts despite a viable queen.
* **Load Cell Creep & Moisture Drift:**
  * The Phaeton 200 kg shear-beam load cell operates via an HX711 24-bit ADC. Sustained static loads (40–80 kg per hive) over months induce mechanical strain-gauge creep. Ambient wooden hive box moisture absorption during monsoons (up to 1.5–3.0 kg of water weight) cannot be distinguished from nectar flow without ambient humidity differential compensation algorithms.

---

## 4. Bio-Acoustic Dataset & Machine Learning Limitations

* **Species & Geographical Bias:**
  * The edge DSP classifier was developed and bench-tested using public research recordings from the **Zenodo Record 1321278 NU-Hive acoustic dataset**, which primarily features European honeybees (*Apis mellifera*).
  * Indian indigenous honeybees (*Apis cerana indica*) and giant rock bees (*Apis dorsata*) exhibit higher wingbeat frequencies (typically 240–310 Hz vs. 200–250 Hz for *A. mellifera*) due to smaller body mass and differing aerodynamic loading.
  * **Open Task:** The model thresholds require recalibration and fine-tuning against indigenous Indian apiary field recordings.
* **Deterministic Decision Engine vs. Deep Learning:**
  * The active on-node acoustic classifier is an **8.2 KB CMSIS-DSP 4-channel spectral energy ratio decision engine**, not trained deep neural network weights.
  * The 75.4 KB 1D-CNN is an architectural design target awaiting sufficient labeled Indian apiculture audio for edge training and quantization.
* **Gateway Fallback Runtime:**
  * `gateway/server.py` checks for `beevil_fusion_net_edge_torchscript.pt`. When absent, it safely falls back to the deterministic decision scoring engine. The primary offline trained model in the repository is the Scikit-Learn `RandomForestClassifier` (`cloud_advisor_model.joblib`), trained on 1500 parametric multi-sensor samples.

---

## 5. Battery Chemistry & Environmental Aging

* **Electrolyte Degradation:**
  * Battery autonomy calculations assume a nominal 1000 mAh single-cell LiPo battery with 233.78 µA average draw (giving ~178 days autonomy without solar).
  * Cold temperatures ($< 0^\circ\text{C}$) in northern regions increase internal cell resistance ($R_i$), degrading effective usable capacity by up to 30–40%.
  * "10+ year solar autonomy" is a **mathematical energy-harvesting equilibrium model** (requiring only 19.5 minutes of daily sunlight to replenish a 300-second duty cycle). Real-world field autonomy will be bounded by lithium-ion chemical aging (typically 500–1000 recharge cycles or 3–5 years).

---

## 6. Simulation vs. Physical Reality

* **ANSYS Multiphysics Models:**
  * The 11 ANSYS simulations (RF S11, Gateway CFD, Drop Shock, MPPT EMI, In-Hive Aerodynamics, etc.) provide rigorous structural, thermal, and electromagnetic validation under specified boundary conditions.
  * Simulations assume idealized material properties (e.g., isotropic pine wood, uniform air density, perfect contact interfaces). Real wooden hive boxes warp with humidity, joints loosen under wind gusts, and thermal air currents are perturbed by irregular comb geometry.
