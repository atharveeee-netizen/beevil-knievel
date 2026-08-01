# Beevil Knievel Cloud AI (Model 2) & Dataset Documentation

## Overview
Model 2 is a 4-Dimensional Random Forest Classifier trained on empirical data distributions sourced from peer-reviewed apiculture studies and public datasets.

## Primary Academic & Dataset References

1. **HOBOS (HOneyBee Online Studies) Project Dataset**
   * **Source**: Kaggle / Wurzburg University Apiculture Division
   * **Data Extracted**: Multi-sensor hive weight continuous time-series (kg) and 13-point spatial brood-nest temperature profiles (°C).
   * **Empirical Norms Used**: 
     * Healthy Brood Temperature: $34.5^\circ\text{C} \pm 0.5^\circ\text{C}$
     * Starvation Weight Threshold: $< 5.0\text{ kg}$ drop during winter/drought.

2. **BUT-2 Bee Dataset (Visual & Acoustic Inspector)**
   * **Source**: Brno University of Technology / Kaggle (`SensorLog.csv` & `SoundLog`)
   * **Data Extracted**: Internal hive CO2 gas concentrations (ppm) and ambient atmospheric pressure correlation.
   * **Empirical Norms Used**:
     * Baseline CO2 Respiration: $800 \text{ ppm} \pm 150 \text{ ppm}$
     * Pre-Swarming Respiration Spike: $2500 \text{ ppm} \pm 300 \text{ ppm}$

3. **NU-Hive Acoustic Research Dataset**
   * **Source**: Zenodo Open Science Repository (DOI: 10.5281/zenodo.1321278)
   * **Data Extracted**: Audio FFT frequency band distributions during queen presence vs. queenless distress states.
   * **Empirical Norms Used**:
     * Pre-Swarm departure buzzing: $200\text{ Hz} - 400\text{ Hz}$
     * Queenless Piping & Distress: $450\text{ Hz} - 750\text{ Hz}$

## Dataset Structure (`ml_models/data/IEEE_Verified_Hive_Dataset.csv`)
* `temp_celcius`: Brood temperature reading (°C)
* `audio_peak_hz`: Dominant acoustic frequency peak (Hz)
* `co2_ppm`: BME680 equivalent gas respiration (ppm)
* `weight_kg`: HX711 scale payload (kg)
* `label`: `0` = Healthy, `1` = Swarming, `2` = Starvation, `3` = Queenless

## Model Artifacts
* `cloud_advisor_model.joblib`: Serialized 100-estimator Scikit-Learn `RandomForestClassifier`.
* `build_cloud_model.py`: Training script for model reproduction.
