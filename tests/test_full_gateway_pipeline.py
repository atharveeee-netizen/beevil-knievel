"""
BEEVIL KNIEVEL - END-TO-END GATEWAY PIPELINE TEST
==================================================
Pytest Suite for Edge Gateway:
1. SQLite WAL Database Initialization & Schema
2. 100-Hive Overview & Detail Queries
3. Live Multi-Modal Edge Diagnostic & Anomaly Ingestion
4. Strict Pydantic Input Validation (HTTP 422 on bad/missing fields)
5. Alert Persistence & Hive State Updates
"""

import sys
import os
import json
import time
from pathlib import Path
import pytest
from fastapi.testclient import TestClient

# Add repo root to path
REPO_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO_ROOT))

from gateway.server import app, init_database, get_db

@pytest.fixture(scope="module")
def client():
    init_database()
    with TestClient(app) as c:
        yield c

def test_root_endpoint(client):
    resp = client.get("/")
    assert resp.status_code == 200
    data = resp.json()
    assert data.get("status") == "ONLINE"
    assert data.get("registered_hives") == 100
    assert "Edge" in data.get("engine", "")

def test_hives_overview(client):
    resp = client.get("/api/v1/hives")
    assert resp.status_code == 200
    data = resp.json()
    hives = data.get("hives", [])
    assert len(hives) == 100, f"Expected 100 hives, found {len(hives)}"
    assert hives[0]["name"] == "Hive-001"

def test_telemetry_ingest_nominal(client):
    payload = {
        "hive_id": 1,
        "brood_core_temp": 34.8,
        "frame_temps": [34.3, 33.8, 33.3, 32.8, 32.3],
        "humidity": 58.0,
        "voc_gas_res": 145.0,
        "co2_ppm": 1250.0,
        "weight_kg": 34.2,
        "lux": 45000.0,
        "tilt_deg": 0.5,
        "fft_bands": [0.1, 0.5, 0.7, 0.2, 0.1, 0.05, 0.02, 0.01]
    }
    resp = client.post("/api/v1/telemetry", json=payload)
    assert resp.status_code == 200, f"Failed: {resp.text}"
    data = resp.json()
    assert data["status"] == "SUCCESS"
    assert data["hive_id"] == 1
    assert data["diagnosis"] in ["QUEEN_PRESENT", "HEALTHY_NORMAL"]
    assert "decision_score" in data
    assert 0.0 < data["decision_score"] <= 1.0

def test_telemetry_ingest_anomalies(client):
    # Test 1: Theft / Knockdown
    theft_payload = {
        "hive_id": 2,
        "brood_core_temp": 34.8,
        "frame_temps": [34.0, 33.5, 33.0, 32.5, 32.0],
        "humidity": 55.0,
        "voc_gas_res": 140.0,
        "co2_ppm": 1200.0,
        "weight_kg": 30.0,
        "lux": 1000.0,
        "tilt_deg": 35.0, # TILT > 15 deg
        "fft_bands": [0.1, 0.2, 0.3, 0.1, 0.1, 0.05, 0.02, 0.01]
    }
    resp = client.post("/api/v1/telemetry", json=theft_payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["diagnosis"] == "TAMPER_THEFT"
    assert data["decision_score"] >= 0.85

    # Test 2: Thermal Stress
    cold_payload = {
        "hive_id": 3,
        "brood_core_temp": 28.0, # Core chill
        "frame_temps": [27.5, 27.0, 26.5, 26.0, 25.5],
        "humidity": 70.0,
        "voc_gas_res": 120.0,
        "co2_ppm": 1100.0,
        "weight_kg": 32.0,
        "lux": 20000.0,
        "tilt_deg": 1.0,
        "fft_bands": [0.1, 0.2, 0.3, 0.1, 0.1, 0.05, 0.02, 0.01]
    }
    resp = client.post("/api/v1/telemetry", json=cold_payload)
    assert resp.status_code == 200
    assert resp.json()["diagnosis"] == "THERMAL_STRESS"

def test_telemetry_strict_validation(client):
    """Verifies that missing or invalid telemetry yields HTTP 422 Unprocessable Entity."""
    # Missing brood_core_temp
    bad_payload = {
        "hive_id": 1,
        "frame_temps": [34.0, 33.5, 33.0, 32.5, 32.0],
        "humidity": 55.0,
        "voc_gas_res": 140.0,
        "co2_ppm": 1200.0,
        "weight_kg": 30.0,
        "lux": 1000.0,
        "fft_bands": [0.1, 0.2, 0.3, 0.1, 0.1, 0.05, 0.02, 0.01]
    }
    resp = client.post("/api/v1/telemetry", json=bad_payload)
    assert resp.status_code == 422

    # Wrong number of FFT bands (7 instead of 8)
    bad_fft_payload = {
        "hive_id": 1,
        "brood_core_temp": 34.8,
        "frame_temps": [34.0, 33.5, 33.0, 32.5, 32.0],
        "humidity": 55.0,
        "voc_gas_res": 140.0,
        "co2_ppm": 1200.0,
        "weight_kg": 30.0,
        "lux": 1000.0,
        "tilt_deg": 0.0,
        "fft_bands": [0.1, 0.2, 0.3, 0.1, 0.1, 0.05, 0.02] # only 7 items
    }
    resp = client.post("/api/v1/telemetry", json=bad_fft_payload)
    assert resp.status_code == 422

def test_hive_detail_and_alerts(client):
    # Hive detail for hive #2 (tamper alert)
    resp = client.get("/api/v1/hives/2")
    assert resp.status_code == 200
    data = resp.json()
    assert data["hive"]["status"] == "CRITICAL"
    assert len(data["recent_telemetry"]) > 0

    # System-wide alerts
    resp = client.get("/api/v1/alerts")
    assert resp.status_code == 200
    alerts = resp.json().get("alerts", [])
    assert len(alerts) >= 1
    assert any(a["alert_type"] == "TAMPER_THEFT" for a in alerts)

if __name__ == "__main__":
    init_database()
    with TestClient(app) as test_c:
        test_root_endpoint(test_c)
        test_hives_overview(test_c)
        test_telemetry_ingest_nominal(test_c)
        test_telemetry_ingest_anomalies(test_c)
        test_telemetry_strict_validation(test_c)
        test_hive_detail_and_alerts(test_c)
    print("All gateway pipeline tests passed successfully!")
