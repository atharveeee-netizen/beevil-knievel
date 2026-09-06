# 🩺 Honey Bee Physiology, Brood Thermoregulation & Environmental Research

This compendium documents the biophysical principles of the honey bee (*Apis mellifera*) superorganism, establishing the physiological necessity of monitoring core brood temperature, radial thermal gradients, carbon dioxide concentrations, and hive weight dynamics.

---

## 🌡️ Brood Nest Biophysical Thermodynamics

### 1. Honey Bee Nest Thermoregulation: Diversity Promotes Stability
* **Authors**: Julia C. Jones, Mary R. Myerscough, Saul Graham, Benjamin P. Oldroyd
* **Journal**: *Science*, Vol. 305, Issue 5682, pp. 402–404 (2004)
* **DOI / URL**: [https://doi.org/10.1126/science.1096340](https://doi.org/10.1126/science.1096340)
* **Key Findings**:
  - Honey bee colonies maintain the central brood rearing area within an extraordinarily tight physiological thermal window: **$34.5^\circ\text{C}$ to $35.5^\circ\text{C}$**, despite ambient environmental temperatures fluctuating from $-20^\circ\text{C}$ to $+45^\circ\text{C}$.
  - Worker bees achieve this homeostatic stability through collective metabolic thermogenesis (isometric contraction of thoracic flight muscles) and evaporative fanning cooling.
  - Genetically diverse worker sub-families exhibit variable response thresholds, ensuring continuous smooth thermal regulation rather than erratic oscillations.
* **Relevance to BEEVIL KNIEVEL**: Validates BEEVIL's baseline thermal setpoint ($\mu_0 = 34.82^\circ\text{C}$) and proves that deviations exceeding $\pm 0.5^\circ\text{C}$ indicate severe physiological stress, brood capping failure, or queenlessness.
* **Access Date**: September 2026

---

### 2. Honeybee Colony Thermoregulation: Regulatory Mechanisms & Individual Contributions
* **Authors**: Anton Stabentheiner, Helmut Kovac, Robert Brodschneider
* **Journal**: *Journal of Insect Physiology*, Vol. 56, Issue 7, pp. 704–715 (2010)
* **DOI / URL**: [https://doi.org/10.1016/j.jinsphys.2010.01.001](https://doi.org/10.1016/j.jinsphys.2010.01.001)
* **Key Findings**:
  - The temperature of developing pupae directly dictates adult bee neuroanatomy, learning capacity, foraging efficiency, and longevity.
  - Exposure of capped brood to temperatures below **$32.0^\circ\text{C}$** for more than 12 hours causes pupal mortality, wing deformities, and defective waggle-dance communication.
  - In healthy colonies, a distinct radial temperature gradient exists from the central core brood frame out to the periphery honey stores.
* **Relevance to BEEVIL KNIEVEL**: Grounded rationale for BEEVIL's **5-point frame thermal gradient probe array** (`DS18B20` sensors placed across Left-Outer, Brood-Left, Core-Queen, Brood-Right, and Right-Outer frames) alongside the NIST-traceable `TMP117` reference probe.
* **Access Date**: September 2026

---

## 💨 In-Hive Gas Transport & Carbon Dioxide Regulation

### 3. Atmospheric Carbon Dioxide Regulation in Honey-Bee Colonies
* **Authors**: Thomas D. Seeley
* **Journal**: *Journal of Insect Physiology*, Vol. 20, Issue 11, pp. 2301–2305 (1974)
* **DOI / URL**: [https://doi.org/10.1016/0022-1910(74)90051-7](https://doi.org/10.1016/0022-1910(74)90051-7)
* **Key Findings**:
  - Honey bees actively regulate internal nest atmosphere, maintaining carbon dioxide ($\text{CO}_2$) levels between **0.10% and 1.5% (1,000 ppm to 15,000 ppm)**.
  - When $\text{CO}_2$ concentration exceeds **$2,000\text{ ppm}$**, worker bees immediately initiate rhythmic unidirectional wing-fanning at the hive entrance to ventilate the brood chamber.
  - Elevated carbon dioxide combined with thermal accumulation acts as the critical physiological trigger preceding reproductive swarming.
* **Relevance to BEEVIL KNIEVEL**: Directly validates the inclusion of the **Sensirion SCD41 photoacoustic NDIR $\text{CO}_2$ sensor** and mathematical formulation 8 (Fick's law of gas transport) in `MATHEMATICAL_MODELS_AND_PHYSICS_PROOFS.md`.
* **Access Date**: September 2026

---

## ⚖️ Colony Weight Dynamics & Foraging Kinetics

### 4. Continuous Automated Scale Monitoring for Nectar Flow & Hive Health
* **Authors**: Stephen L. Buchmann, Scott C. Thoenes
* **Journal**: *American Bee Journal*, Vol. 130, pp. 815–818 (1990)
* **Key Findings**:
  - Real-time precision hive scale telemetry provides instantaneous measurement of nectar flow onset, foraging trip volume, and colony biomass expansion.
  - Sudden daytime weight drops of **$1.5\text{ kg}$ to $3.5\text{ kg}$** indicate immediate swarm departures, allowing beekeepers to recapture swarms before they disperse.
  - Steady winter mass decrease represents metabolic honey store consumption; deviations indicate robbing by neighboring colonies or starvation risk.
* **Relevance to BEEVIL KNIEVEL**: Establishes the operational purpose of the 24-bit differential `HX711` weight scale ADC and nectar flow kinetics modeling.
* **Access Date**: September 2026
