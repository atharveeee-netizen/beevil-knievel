"""
=============================================================================
BEEVIL KNIEVEL — Cloud/Gateway Advanced Advisory Model (Model 2)
Architecture: Scikit-Learn Random Forest / Decision Tree Classifier
Goal: Translate simple node telemetry into actionable API suggestions.
=============================================================================
"""

import numpy as np
import json
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler

class BeevilCloudAdvisor:
    def __init__(self):
        # We use a Random Forest algorithm which works robustly with tabular 
        # IoT sensor data (acoustic power, delta-T) with minimal tuning.
        self.classifier = RandomForestClassifier(n_estimators=50, random_state=42)
        self.scaler = StandardScaler()
        self.is_trained = False
        
        # Human-readable advisory mappings
        self.failure_signatures = {
            1: {"condition": "Queenless Hive", "action": "Inspect for supercedure cells; prepare to requeen."},
            2: {"condition": "Cold Stress / Cluster Broken", "action": "Check solar insolation; reduce hive entrance size."},
            3: {"condition": "Varroa / Parasitic Infestation", "action": "Perform sugar roll test; apply oxalic acid treatment."},
            0: {"condition": "Healthy Baseline", "action": "No immediate action required."}
        }

    def train_on_outsourced_data(self, X_train, y_train):
        """
        X_train expected shape: (samples, 2) -> [avg_acoustic_energy, delta_temp_c]
        y_train expected shape: (samples,)   -> [0, 1, 2, 3] representing condition classes
        """
        print("[BK-AI-CLOUD] Training Cloud Advisory Model on Outsourced Data...")
        X_scaled = self.scaler.fit_transform(X_train)
        self.classifier.fit(X_scaled, y_train)
        self.is_trained = True
        print("[BK-AI-CLOUD] Model training complete.")

    def analyze_alert_payload(self, telemetry_json):
        if not self.is_trained:
            raise RuntimeError("Model must be trained on datasets before analyzing.")
            
        data = json.loads(telemetry_json)
        
        # Extract features (Node ID: data['node_id'])
        ambient = data.get('temp_ambient_c', 0)
        brood = data.get('temp_brood_c', 0)
        acoustic = data.get('fft_200_400hz_energy', 0)
        
        delta_t = brood - ambient
        
        # Predict
        features = np.array([[acoustic, delta_t]])
        features_scaled = self.scaler.transform(features)
        
        prediction = self.classifier.predict(features_scaled)[0]
        confidence = np.max(self.classifier.predict_proba(features_scaled))
        
        result = self.failure_signatures.get(prediction, self.failure_signatures[0])
        return {
            "node_id": data.get('node_id', 'UNKNOWN'),
            "predicted_condition": result["condition"],
            "recommended_action": result["action"],
            "model_confidence": round(confidence * 100, 2)
        }

if __name__ == "__main__":
    advisor = BeevilCloudAdvisor()
    
    # Simulate bootstrapping with dummy historical data mimicking the UrBAN dataset
    # Dimensions: [Acoustic Energy @ 200-400Hz, Brood Delta-T C]
    X_dummy = np.array([
        [200.0, 15.0], [220.0, 14.5],  # Healthy
        [650.0, 10.0], [700.0, 9.5],   # Queenless (High Buzz, moderate temp drop)
        [150.0, 3.0],  [140.0, 2.5],   # Cold Stress (Low Buzz, critical temp drop)
        [300.0, 11.0], [310.0, 10.5]   # Varroa (Irregular buzz, mild temp variation)
    ])
    y_dummy = np.array([0, 0, 1, 1, 2, 2, 3, 3])
    
    advisor.train_on_outsourced_data(X_dummy, y_dummy)
    
    # Simulate an incoming LoRa alert packet from the STM32 Node
    incoming_lora_alert = '{"node_id": "BK_NODE_01", "temp_brood_c": 28.5, "temp_ambient_c": 19.0, "fft_200_400hz_energy": 685.2}'
    
    print("\n--- Incoming Alert Analysis ---")
    recommendation = advisor.analyze_alert_payload(incoming_lora_alert)
    print(json.dumps(recommendation, indent=2))
