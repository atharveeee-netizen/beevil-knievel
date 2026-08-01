# Beevil Knievel — Cloud AI Pathology Diagnostic Engine (Model 2)

This directory contains **Model 2 — The Cloud AI Pathology Diagnostic Engine**.

While **Model 1 (TinyML)** runs on-device inside the hive MCU for immediate real-time alerts, **Model 2** runs on the Cloud Backend server (Python Flask / FastAPI microservice). It combines 14 days of multi-sensor telemetry (Brood Nest Temp, Ambient Temp, Sound Frequencies, CO2 Respiration PPM, and Hive Scale Weight) to generate plain-language agricultural advisories for the beekeeper's mobile app.

---

## 🏗️ Cloud Model Architecture & Tech Stack

* **Algorithm:** Multi-Variable Random Forest / Gradient Boosted Pathology Classifier (`joblib` serialized model).
* **REST API Framework:** Python Flask + Flask-CORS (`cloud_server.py`).
* **Input Features:** `[Internal_Temp_C, Audio_Peak_Hz, CO2_Respiration_PPM, Scale_Weight_KG]`.
* **Output Diagnostics:**
  1. `Healthy Baseline`
  2. `Imminent Swarm Warning`
  3. `Winter Starvation Risk`
  4. `Queenless Colony Distress`

---

## 📂 Directory Contents

* **`cloud_server.py`**: Flask REST API web server hosting Model 2 endpoints (`POST /api/predict`, `GET /health`).
* **`build_cloud_model.py`**: Model training script to generate and export `cloud_advisor_model.joblib`.
* **`cloud_advisor_model.joblib`**: Pre-trained Model 2 binary weights.

---

## 🚀 Execution & Deployment Instructions

### 1. Train or Re-build Model 2
```bash
python "Cloud Model/build_cloud_model.py"
```

### 2. Launch Cloud AI REST API Server
```bash
python "Cloud Model/cloud_server.py"
```

The REST API server starts on **http://localhost:5000**.

### 3. Test Prediction Endpoint
```bash
curl -X POST http://localhost:5000/api/predict \
     -H "Content-Type: application/json" \
     -d '{"temp_celcius": 34.5, "audio_peak_hz": 340, "co2_ppm": 1200, "weight_kg": 24.5}'
```
