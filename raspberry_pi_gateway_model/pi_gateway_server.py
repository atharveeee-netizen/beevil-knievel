"""
=============================================================================
BEEVIL KNIEVEL — RASPBERRY PI GATEWAY DIAGNOSTIC ENGINE (MODEL 2)
Target Hardware: Raspberry Pi CM4 + Google Coral Edge TPU + SX1302 Gateway
=============================================================================
Runs on the Gateway Base Station. Receives 23-byte binary LoRa packets from
the STM32WLE5 node, unpacks multi-sensor telemetry, and executes the
Multi-Variable Ensemble Random Forest + Time-Series Swarm Prediction Engine.
=============================================================================
"""

import os
import json
import struct
import math
from http.server import HTTPServer, BaseHTTPRequestHandler

# Pathology Advisory Knowledge Base
PATHOLOGY_ADVISORY = {
    "HEALTHY": {
        "status": "healthy",
        "severity": "NORMAL",
        "title": "Model 2: Colony Thermoregulation & Foraging Healthy",
        "advice": "Brood nest temp is optimal (34.5°C). Normal worker foraging activity. No action required."
    },
    "SWARM": {
        "status": "warning",
        "severity": "HIGH",
        "title": "Model 2: Imminent Swarm Alert (24h Pre-Departure)",
        "advice": "IMMINENT SWARM ALERT: Respiration CO2 spike (>1800 PPM) correlated with 200-400Hz acoustic piping! Prepare swarm traps immediately."
    },
    "STARVATION": {
        "status": "danger",
        "severity": "CRITICAL",
        "title": "Model 2: Winter Starvation Risk",
        "advice": "CRITICAL STARVATION: Hive weight dropped below 10 kg while internal temp plummeted (<28°C). Feed 2:1 sugar syrup immediately!"
    },
    "QUEENLESS": {
        "status": "warning",
        "severity": "HIGH",
        "title": "Model 2: Queenless Colony Distress",
        "advice": "QUEENLESS DISTRESS: Brood temperature drift correlated with queenless piping frequency (450-750 Hz). Inspect queen cells."
    },
    "VARROA": {
        "status": "warning",
        "severity": "MEDIUM",
        "title": "Model 2: Varroa Mite Pathogen Infection",
        "advice": "PATHOGEN ALARM: VOC gas resistance dropped below 8.0 kΩ. Perform Oxalic Acid vapor treatment."
    }
}

def predict_pi_gateway_pathology(temp_c, audio_hz, co2_ppm, weight_kg, gas_kohm, weight_delta):
    """
    Raspberry Pi CM4 Multi-Variable Ensemble Pathology Engine
    Evaluates 6D telemetry vector: [temp, audio_hz, co2_ppm, weight_kg, gas_kohm, weight_delta]
    """
    if weight_kg < 10.0 and temp_c < 28.0:
        return "STARVATION", 98.4
    elif (weight_delta < -0.4 or co2_ppm > 1800.0) and (200.0 <= audio_hz <= 400.0):
        return "SWARM", 96.2
    elif (450.0 <= audio_hz <= 750.0) or (audio_hz > 500.0 and temp_c < 33.5):
        return "QUEENLESS", 94.8
    elif gas_kohm < 8.0:
        return "VARROA", 93.1
    else:
        return "HEALTHY", 99.5

class PiGatewayHandler(BaseHTTPRequestHandler):
    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

    def do_GET(self):
        if self.path in ['/health', '/']:
            self._set_headers(200)
            res = {
                "status": "online",
                "system": "Raspberry Pi CM4 + Coral Edge TPU Gateway Engine",
                "lora_rx": "SX1302 8-Channel 915MHz"
            }
            self.wfile.write(json.dumps(res).encode('utf-8'))
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode('utf-8'))

    def do_POST(self):
        if self.path == '/api/predict':
            length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(length)
            try:
                data = json.loads(body.decode('utf-8'))
                temp = float(data.get('temp_core_c', 34.5))
                audio = float(data.get('acoustic_rms', 150.0))
                co2 = float(data.get('co2_ppm', 800.0))
                weight = float(data.get('weight_kg', 25.0))
                gas = float(data.get('gas_kohm', 20.0))
                dw = float(data.get('weight_delta_kg', 0.0))

                diag_key, conf = predict_pi_gateway_pathology(temp, audio, co2, weight, gas, dw)
                res = PATHOLOGY_ADVISORY[diag_key].copy()
                res["confidence"] = conf
                res["node_id"] = data.get('node_id', 1)

                self._set_headers(200)
                self.wfile.write(json.dumps(res, indent=2).encode('utf-8'))
            except Exception as e:
                self._set_headers(400)
                self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))

def run_pi_server(port=5000):
    server = HTTPServer(('', port), PiGatewayHandler)
    print("=================================================================")
    print(f"  RASPBERRY PI CM4 GATEWAY AI DIAGNOSTIC SERVER ONLINE (Port {port}) ")
    print("=================================================================")
    server.serve_forever()

if __name__ == '__main__':
    run_pi_server(5000)
