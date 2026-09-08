# 🌡️ Brood Nest Biophysical Thermoregulation & Radial Thermal Gradients

## 1. The Superorganism as an Endotherm
Although an individual honey bee is poikilothermic (cold-blooded), the social honey bee colony (*Apis mellifera*) behaves functionally as an **endothermic superorganism**. Within the brood nest, worker bees actively combust floral carbohydrates (honey and nectar) via aerobic respiration in their indirect flight muscles to maintain an internal incubator environment.

---

## 2. Brood Nest Biological Criticality: The 34.8°C Target
Developing honey bee eggs, larvae, and pupae are stenothermal. Decades of biophysical studies (Heinrich 1993, Jones et al. 2004, Stabentheiner et al. 2010) show that the core brood temperature is held rigidly between **$34.5^\circ\text{C}$ and $35.5^\circ\text{C}$**, centered at **$34.82^\circ\text{C}$**.

### Biological Consequences of Thermal Deviation:
- **Hypothermia ($T_{\text{core}} < 32.0^\circ\text{C}$)**: Induces "brood chill". Pupae fail to eclose, develop morphological abnormalities (stunted wings, deformed legs), or suffer severe behavioral deficits in memory acquisition and communication dances.
- **Hyperthermia ($T_{\text{core}} > 36.5^\circ\text{C}$)**: Heat shock triggers emergency evaporative cooling. Worker bees fetch water droplets, spread them across comb cell rims, and fan their wings to circulate evaporative drafts. If overheating persists, pupae die of protein denaturation.

---

## 3. Radial Thermal Gradients Across Langstroth Frames
A single temperature sensor in a hive is fundamentally inadequate because temperature is non-uniform. In a standard 10-frame Langstroth hive:
- **Frame 5 & 6 (Brood Core / Queen Center)**: Tightly regulated at $34.8^\circ\text{C} \pm 0.3^\circ\text{C}$.
- **Frame 3, 4, 7, 8 (Pollen & Transition Comb)**: Fluctuates moderately between $28^\circ\text{C}$ and $33^\circ\text{C}$.
- **Frame 1, 2, 9, 10 (Outer Honey Storage & Boundary)**: Closely follows ambient exterior temperature ($15^\circ\text{C}$ to $25^\circ\text{C}$).

BEEVIL KNIEVEL employs a **5-point digital thermal gradient array**:
1. `frame1OuterLeft` (Peripheral honey insulation boundary)
2. `frame2BroodLeft` (Outer brood edge)
3. `frame3CoreQueen` (Central queen core reference)
4. `frame4BroodRight` (Outer brood edge)
5. `frame5OuterRight` (Peripheral honey insulation boundary)

When a colony is queenless or dwindling, the radial thermal envelope collapses inward, a phenomenon immediately visible on the HiveOS 5-frame thermal matrix.

---

## 4. On-Node CUSUM Change-Point Detection
Standard threshold alarms fail during winter and autumn because diurnal temperature fluctuations mask progressive colony decline. BEEVIL implements Page’s **Cumulative Sum (CUSUM)** algorithm directly on the nRF52840 field node:

$$S_k = \max\left(0, S_{k-1} + (34.82 - T_k) - 0.15\right)$$

- **Slack Allowance ($K = 0.15^\circ\text{C}$)**: Absorbs brief cooling events (e.g., cold gusts entering the hive entrance).
- **Alarm Threshold ($h = 1.20^\circ\text{C}\cdot\text{hr}$)**: When cumulative thermal deficit accumulates beyond $1.20^\circ\text{C}\cdot\text{hr}$, the node sets Bit 7 of the LoRa payload telemetry byte.

This provides an early warning window with a modeled lead time of up to **72 hours in evaluated synthetic progressive cooling scenarios**, allowing intervention before brood hypothermia ($< 30.0^\circ\text{C}$) becomes irreversible.
