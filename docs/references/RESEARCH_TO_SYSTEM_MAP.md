# 🗺️ Research-to-System Traceability Map

This matrix maps primary scientific literature, biophysical studies, and telecommunications standards directly to the corresponding hardware components, firmware algorithms, and gateway daemons in the BEEVIL KNIEVEL platform.

> [!NOTE]
> External research citations establish the scientific validity of the monitored biological phenomena and telecommunications channels. They do not constitute a direct validation of BEEVIL KNIEVEL's specific physical devices, which are validated through the repository's local test suites, hardware procurement records, and mathematical models.

---

## 📋 Comprehensive Traceability Matrix

| Primary External Citation | Published Scientific / Technical Finding | BEEVIL System Implementation | Firmware / Code Location |
| :--- | :--- | :--- | :--- |
| **Jones et al. (Science 2004)** | Brood nest strictly thermoregulated between $34.5^\circ\text{C}$ and $35.5^\circ\text{C}$ across genetic sub-families. | **Texas Instruments TMP117** $\pm 0.1^\circ\text{C}$ NIST-traceable brood core digital probe. | `firmware/beevil_rak4631_transmitter.ino` (`I2C_ADDR_TMP117`) |
| **Stabentheiner et al. (J. Insect Physiol. 2010)** | Radial thermal gradient across frames indicates colony cluster boundary and pupal health. | **5x Maxim DS18B20** waterproof 1-Wire digital probe array spanning all frames. | `hardware/BOM_AND_PINOUT.md` (`Pin P0.17 1-Wire`) |
| **Seeley (J. Insect Physiol. 1974)** | $\text{CO}_2$ exceeds $2,000\text{ ppm}$ triggering worker fanning; accumulation signals swarming. | **Sensirion SCD41** Photoacoustic NDIR $\text{CO}_2$ sensor (400–5000 ppm range). | `firmware/beevil_rak4631_transmitter.ino` (`I2C_ADDR_SCD41`) |
| **Ferrari et al. (Comp. & Elec. in Ag. 2008)** | In-hive acoustic shifts to 400–500 Hz emerge 24–48h prior to reproductive swarming. | **CMSIS-DSP Real FFT** isolating Band 4 (350–500 Hz) pre-swarm acoustic energy. | `firmware/beevil_rak4631_transmitter.ino` (`ALERT_FLAG_PRE_SWARM`) |
| **Cecchi et al. (AES Convention 144, 2018)** | Queenless distress hum elevates energy in 285–350 Hz; ambient noise sits >800 Hz. | **TDK INMP441** 24-bit I2S microphone + 4-channel spectral classifier with noise suppression. | `TinyML Model/bee_acoustic_classifier.py` |
| **Zenodo Dataset 1321278 (Nolasco & Benetos 2018)** | 12 hours of field audio with annotated queen-present vs queenless colony recordings. | **Synthetic & Level 1 Benchmark Suite** evaluating classification accuracy across field WAVs. | `TinyML Model/run_stress_test_benchmark.py` |
| **Page (Biometrika 1954)** | Cumulative sum (CUSUM) integrates minor drift below baseline mean to detect change-points. | **On-Node CUSUM Filter** ($K=0.15^\circ\text{C}, h=1.20^\circ\text{C}\cdot\text{hr}$) providing 72h early warning. | `gateway/cusum_analytics.py` & `firmware/beevil_rak4631_transmitter.ino` |
| **Semtech SX1262 Datasheet (DS.SX1261-2)** | Sub-GHz LoRa provides -124.53 dBm sensitivity at SF7/125kHz with +14 dBm output power. | **RAK4631 + Waveshare SX1262 HAT** sub-GHz physical link operating on IN865 (865 MHz). | `hardware/BOM_AND_PINOUT.md` & `firmware/beevil_rak4631_transmitter.ino` |
| **ITU-R P.833-9 Foliage Recommendation** | Sub-GHz foliage specific attenuation is $\gamma \approx 0.191\text{ dB/m}$ at 865 MHz vs 0.262 dB/m at 2.4 GHz. | **Canopy Link Budget Model** ($+22.63\text{ dB}$ margin across 150m dense woodland). | `docs/MATHEMATICAL_MODELS_AND_PHYSICS_PROOFS.md` (Section 1.4) |
| **Buchmann & Thoenes (Am. Bee J. 1990)** | Daily weight fluctuations measure nectar influx; sudden daytime drop of >1.5 kg indicates swarm. | **M5Stack HX711** 24-bit weigh scale ADC measuring net colony mass flux. | `firmware/beevil_rak4631_transmitter.ino` (`weight_kg_x100`) |
| **NIST FIPS 180-4 (Secure Hash Standard)** | SHA-256 cryptographic one-way hashing provides deterministic tamper-evident verification. | **HoneyChain Merkle Tree Explorer** verifying honey batch harvest provenance against fraud. | `frontend/src/app/app/page.tsx` (`BlockProof` interface) |
