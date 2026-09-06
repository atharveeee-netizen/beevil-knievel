# 🔬 Honey Bee Bio-Acoustics: Theory, Signal Processing & State Detection

## 1. Biophysical Mechanisms of Sound Production in *Apis mellifera*
Honey bees generate acoustic signals through two primary physiological mechanisms:
1. **Wing-Beat Aerodynamics**: Rapid oscillation of forewings and hindwings during flight and stationary fanning creates periodic pressure waves in air, with fundamental frequencies determined by wing surface area, stroke amplitude, and thoracic mass.
2. **Thoracic Muscle Shivering & Substrate Vibro-Acoustics**: Bees uncouple their wings from the axillary sclerites and vibrate their flight muscles isometrically. This vibration is transmitted directly through their tarsi (feet) into the wax comb substrate and into the resonant hive air cavity.

---

## 2. Biological Acoustic Spectral Regimes

### A. Worker Flight & Homeostatic Fanning (180 Hz – 240 Hz)
Under normal queenright conditions, worker bees generate a steady, uniform hum centered around **200 Hz to 240 Hz**. This acoustic output corresponds to the baseline metabolic hum of bees circulating air and maintaining nest homeostasis.

### B. The Queenless Roar (285 Hz – 350 Hz)
Within 30 to 60 minutes of removing or losing a queen, the colony’s acoustic profile undergoes a marked transformation documented across literature (Wenner 1962, Cecchi et al. 2018). In the absence of queen mandibular pheromones, worker bees exhibit agitated exploratory behavior and produce an uncoordinated, high-amplitude acoustic roar centered in the **285 Hz to 350 Hz** band.

### C. Virgin Queen Piping & Pre-Swarm Crescendo (380 Hz – 500 Hz)
When a colony prepares to cast a reproductive swarm, virgin queens inside emergent cells produce distinct acoustic pulses:
- **Tooting**: A sustained pulse of 1–2 seconds duration at **$380\text{ Hz}$ to $450\text{ Hz}$**, followed by short bursts.
- **Quacking**: The muffled reply of rival queens trapped within sealed queen wax cells.
Additionally, 24 to 48 hours before swarm departure, thousands of worker bees undergo flight muscle warm-up, causing collective acoustic energy between **$350\text{ Hz}$ and $480\text{ Hz}$** to crescendo.

### D. Weather Noise Rejection (> 800 Hz)
Environmental interference—such as rainfall on the tin hive roof or wind gusts blowing across the entrance—produces broadband noise predominantly concentrated **above 800 Hz**. By measuring high-frequency energy separately, BEEVIL’s firmware dynamically normalizes spectral thresholds, preventing rainstorms from triggering false swarming alarms.

---

## 3. Mathematical FFT Parameterization in BEEVIL KNIEVEL
To capture these biological frequency shifts on a low-power microcontroller without exceeding SRAM budgets, BEEVIL configures the CMSIS-DSP real FFT as follows:

$$f_s = 2000.0\text{ Hz} \quad (\text{Nyquist Cutoff: } f_{\text{max}} = 1000.0\text{ Hz})$$
$$N = 256\text{ points} \quad (\text{Single-Precision Real Input})$$
$$\Delta f = \frac{f_s}{N} = \frac{2000\text{ Hz}}{256} = \mathbf{7.8125\text{ Hz / bin}}$$

### Frequency Bin Allocation:
- **Worker Flight Hum**: Bins 23 to 31 ($179.7\text{ Hz}$ to $242.2\text{ Hz}$)
- **Queenless Distress**: Bins 36 to 45 ($281.3\text{ Hz}$ to $351.6\text{ Hz}$)
- **Virgin Queen Piping**: Bins 48 to 64 ($375.0\text{ Hz}$ to $500.0\text{ Hz}$)
- **Environmental Noise Floor**: Bins 102 to 128 ($796.9\text{ Hz}$ to $1000.0\text{ Hz}$)

Execution on the nRF52840 ARM Cortex-M4F hardware floating point unit requires only **$1.12\text{ ms}$**, enabling deep sleep for the remaining 298.8 seconds of every 5-minute duty cycle.
