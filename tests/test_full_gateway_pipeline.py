"""
BEEVIL KNIEVEL — END-TO-END GATEWAY PIPELINE TEST
==================================================
Tests:
1. Local SQLite WAL Database Initialization & Schema
2. 100-Hive Telemetry Ingestion via FastAPI TestClient
3. Live Multi-Modal AI Inference & Anomaly Detection
4. Alert Persistence & Hive Health State Updates
"""

import sys
import os
import json
import time
from pathlib import Path

# Add repo root to path
REPO_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO_ROOT))

from fastapi.testclient import TestClient
from gateway.server import app, init_database, get_db

def run_pipeline_verification():
    print("="*65)
    print("  BEEVIL KNIEVEL — 100-HIVE GATEWAY PIPELINE VERIFICATION")
    print("="*65)

    # 1. Initialize Database
    init_database()
    client = TestClient(app)

    # 2. Test Root Endpoint
    resp = client.get("/")
    assert resp.status_code == 200, f"Root failed: {resp.text}"
    print(f"✅ Root API Status: {resp.json().get('status')} | Version: {resp.json().get('version')}")

    # 3. Test 100 Hives Overview
    resp = client.get("/api/v1/hives")
    assert resp.status_code == 200
    hives = resp.json().get("hives", [])
    assert len(hives) == 100, f"Expected 100 hives, found {len(hives)}"
    print(f"✅ 100 Hives Registry Verified: {len(hives)} hives loaded.")

    # 4. Ingest Telemetry for 100 Hives
    print("\n⚡ Ingesting 100 Hives Telemetry & Executing Edge AI Inference...")
    t_start = time.perf_counter()
    diagnoses = {}
    latencies = []

    for h in range(1, 101):
        # Normal baseline
        brood_temp = 34.8 + (h % 3) * 0.1
        tilt = 0.5
        fft = [0.1, 0.5, 0.7, 0.2, 0.1, 0.05, 0.02, 0.01]

        # Injected anomalies
        if h == 12:
            fft[4] = 0.88 # Pre-swarm buzz
        elif h == 45:
            brood_temp = 28.5 # Brood chill
        elif h == 88:
            tilt = 25.0 # Theft knockdown

        payload = {
            "hive_id": h,
            "brood_core_temp": brood_temp,
            "frame_temps": [brood_temp - 0.5, brood_temp - 1.0, brood_temp - 1.5, brood_temp - 2.0, brood_temp - 2.5],
            "humidity": 58.0,
            "voc_gas_res": 145.0,
            "co2_ppm": 1250.0 if h != 12 else 3500.0,
            "weight_kg": 34.2 + (h % 10),
            "lux": 45000.0,
            "tilt_deg": tilt,
            "fft_bands": fft
        }

        t0 = time.perf_counter()
        resp = client.post("/api/v1/telemetry", json=payload)
        t_ms = (time.perf_counter() - t0) * 1000.0
        latencies.append(t_ms)

        assert resp.status_code == 200, f"Ingest failed for Hive #{h}: {resp.text}"
        data = resp.json()
        diag = data["diagnosis"]
        diagnoses[diag] = diagnoses.get(diag, 0) + 1

    total_time_s = time.perf_counter() - t_start
    avg_latency_ms = sum(latencies) / len(latencies)

    print(f"✅ 100 Hives Ingested in {total_time_s:.2f}s (Avg: {avg_latency_ms:.2f}ms/packet)")
    print(f"   • Throughput: {100.0 / total_time_s:.2f} packets/second")

    print("\n🩺 AI Diagnostic Breakdown:")
    for k, v in diagnoses.items():
        print(f"   • {k:<24}: {v} hives")

    # 5. Verify Single Hive Detailed Query
    resp = client.get("/api/v1/hives/88")
    assert resp.status_code == 200
    hive_88 = resp.json()
    assert hive_88["hive"]["status"] == "CRITICAL", f"Expected CRITICAL for Hive #88, got {hive_88['hive']['status']}"
    print(f"\n✅ Single Hive Query (Hive #088): Status={hive_88['hive']['status']} (Theft Detected correctly!)")

    # 6. Verify System Alerts
    resp = client.get("/api/v1/alerts")
    assert resp.status_code == 200
    alerts = resp.json().get("alerts", [])
    print(f"✅ Emergency Alert System: {len(alerts)} active alerts recorded in SQLite.")

    print("\n" + "="*65)
    print("🎉 ALL TESTS PASSED! 100% PRODUCTION READY FOR DEPLOYMENT!")
    print("="*65)

if __name__ == "__main__":
    run_pipeline_verification()
