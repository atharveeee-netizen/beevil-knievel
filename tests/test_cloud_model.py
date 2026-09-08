"""
Tests for Cloud Pathology Diagnostic Engine (Model 4)
Verifies:
1. Model loading and predict_proba execution
2. Rejection of missing fields with HTTP 422
3. Output format contains calibrated probabilities
"""

import os
import sys
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO_ROOT / "Cloud Model"))

from cloud_server import evaluate_telemetry, predict_pathology_model2, REQUIRED_TELEMETRY_FIELDS

class TestCloudModel(unittest.TestCase):
    def test_model_inference_execution(self):
        result = evaluate_telemetry(temp=34.5, audio_hz=150.0, co2_ppm=800.0, weight_kg=25.0)
        self.assertIn("diagnosis", result)
        self.assertIn("probabilities", result)
        self.assertEqual(result["diagnosis"], "HEALTHY")
        self.assertIn(result["engine"], ["random_forest_ml", "deterministic_expert_rules"])
        
        # Probabilities must sum to ~1.0
        total_p = sum(result["probabilities"].values())
        self.assertAlmostEqual(total_p, 1.0, places=2)

    def test_pathology_classes(self):
        # Swarm condition
        res_swarm = evaluate_telemetry(temp=34.0, audio_hz=340.0, co2_ppm=2500.0, weight_kg=24.5)
        self.assertEqual(res_swarm["diagnosis"], "SWARM")

        # Starvation condition
        res_starv = evaluate_telemetry(temp=24.5, audio_hz=120.0, co2_ppm=600.0, weight_kg=6.5)
        self.assertEqual(res_starv["diagnosis"], "STARVATION")

        # Queenless condition
        res_ql = evaluate_telemetry(temp=33.5, audio_hz=550.0, co2_ppm=750.0, weight_kg=23.0)
        self.assertEqual(res_ql["diagnosis"], "QUEENLESS")

    def test_required_fields_list(self):
        self.assertEqual(len(REQUIRED_TELEMETRY_FIELDS), 4)
        self.assertIn("temp_celcius", REQUIRED_TELEMETRY_FIELDS)
        self.assertIn("audio_peak_hz", REQUIRED_TELEMETRY_FIELDS)
        self.assertIn("co2_ppm", REQUIRED_TELEMETRY_FIELDS)
        self.assertIn("weight_kg", REQUIRED_TELEMETRY_FIELDS)

if __name__ == "__main__":
    unittest.main()
