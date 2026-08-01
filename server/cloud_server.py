from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)

MODEL_PATH = os.path.join(os.path.dirname(__file__), "../ml_models/cloud_advisor_model.joblib")

# Load pre-trained Model 2
model = None
if os.path.exists(MODEL_PATH):
    model = joblib.load(MODEL_PATH)
    print(f"Loaded Cloud Model 2 from {MODEL_PATH}")
else:
    print("Model 2 joblib file not found!")

LABEL_MAP = {
    0: {"status": "healthy", "title": "Model 2: Healthy Baseline", "advice": "Brood thermal regulation is perfectly maintained at normal levels. Acoustic FFT spectrum indicates standard worker activity."},
    1: {"status": "warning", "title": "Model 2: Imminent Swarm Alert", "advice": "IMMINENT SWARM WARNING: High CO2 respiration spike correlated with departure acoustic buzzing! Prepare swarm traps immediately."},
    2: {"status": "danger", "title": "Model 2: Winter Starvation Risk", "advice": "CRITICAL STARVATION ALERT: Hive scale weight dropped while internal temp plummeted. Immediate emergency syrup feeding required!"},
    3: {"status": "warning", "title": "Model 2: Queenless Distress", "advice": "QUEENLESS DISTRESS: Brood temperature drift correlated with queenless piping frequency (450-750 Hz). Inspect queen cells."}
}

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "online", "model_loaded": model is not None})

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.json
    try:
        temp = float(data.get('temp_celcius', 34.5))
        audio = float(data.get('audio_peak_hz', 150))
        co2 = float(data.get('co2_ppm', 800))
        weight = float(data.get('weight_kg', 25.0))

        if model:
            features = np.array([[temp, audio, co2, weight]])
            pred_class = int(model.predict(features)[0])
            probs = model.predict_proba(features)[0].tolist()
            res = LABEL_MAP.get(pred_class, LABEL_MAP[0])
            res['confidence'] = round(max(probs) * 100, 2)
            return jsonify(res)
        else:
            return jsonify(LABEL_MAP[0])
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    print("Starting Beevil Knievel Cloud AI Model REST API on port 5000...")
    app.run(host='0.0.0.0', port=5000, debug=False)
