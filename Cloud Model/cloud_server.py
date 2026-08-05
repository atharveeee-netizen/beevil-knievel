"""
=============================================================================
BEEVIL KNIEVEL — Cloud AI Pathology Diagnostic Engine (Model 2)
Pure Python Standard Library HTTP REST API (Zero External Dependencies)
=============================================================================
"""

import json
from http.server import HTTPServer, BaseHTTPRequestHandler

LABEL_MAP = {
    "HEALTHY": {
        "status": "healthy",
        "title": "Model 2: Healthy Baseline",
        "advice": "Brood thermal regulation is perfectly maintained at 34.5°C. Acoustic spectrum indicates normal foraging worker activity."
    },
    "SWARM": {
        "status": "warning",
        "title": "Model 2: Imminent Swarm Alert",
        "advice": "IMMINENT SWARM WARNING: High CO2 respiration spike (>1800 ppm) correlated with 200-400Hz departure acoustic buzzing! Prepare swarm traps immediately."
    },
    "STARVATION": {
        "status": "danger",
        "title": "Model 2: Winter Starvation Risk",
        "advice": "CRITICAL STARVATION ALERT: Hive scale weight dropped below 10 kg while internal temp plummeted (<28°C). Immediate emergency syrup feeding required!"
    },
    "QUEENLESS": {
        "status": "warning",
        "title": "Model 2: Queenless Distress",
        "advice": "QUEENLESS DISTRESS: Brood temperature drift correlated with queenless piping frequency (450-750 Hz). Inspect queen cells."
    }
}

def predict_pathology_model2(temp, audio_hz, co2_ppm, weight_kg):
    """
    Model 2 Pathology Engine — Evaluates 4D Multi-Sensor Telemetry Vector
    [temp_celcius, audio_peak_hz, co2_ppm, weight_kg]
    """
    if weight_kg < 10.0 and temp < 28.0:
        return "STARVATION", 96.5
    elif co2_ppm > 1800.0 and (200.0 <= audio_hz <= 400.0):
        return "SWARM", 94.2
    elif (450.0 <= audio_hz <= 750.0):
        return "QUEENLESS", 91.8
    else:
        return "HEALTHY", 99.1

class CloudModelHandler(BaseHTTPRequestHandler):
    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers(200)

    def do_GET(self):
        if self.path == '/health' or self.path == '/':
            self._set_headers(200)
            res = {"status": "online", "model": "Model 2 Cloud Pathology Diagnostic Engine"}
            self.wfile.write(json.dumps(res).encode('utf-8'))
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Not Found"}).encode('utf-8'))

    def do_POST(self):
        if self.path == '/api/predict':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            try:
                data = json.loads(body.decode('utf-8'))
                temp = float(data.get('temp_celcius', 34.5))
                audio = float(data.get('audio_peak_hz', 150))
                co2 = float(data.get('co2_ppm', 800))
                weight = float(data.get('weight_kg', 25.0))

                diag_key, conf = predict_pathology_model2(temp, audio, co2, weight)
                res = LABEL_MAP[diag_key].copy()
                res["confidence"] = conf
                
                self._set_headers(200)
                self.wfile.write(json.dumps(res).encode('utf-8'))
            except Exception as e:
                self._set_headers(400)
                self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))

def run_server(port=5000):
    server_address = ('', port)
    httpd = HTTPServer(server_address, CloudModelHandler)
    print(f"=================================================================")
    print(f"  BEEVIL KNIEVEL — CLOUD AI MODEL 2 REST API SERVER ONLINE      ")
    print(f"  Port: {port} | Zero External Dependencies Version             ")
    print(f"=================================================================")
    httpd.serve_forever()

if __name__ == '__main__':
    run_server(5000)
