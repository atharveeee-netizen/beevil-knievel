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
from gateway.lora_receiver import unpack_lora_payload, PAYLOAD_FORMAT, PAYLOAD_SIZE
from gateway.mesh_router import BeevilMeshGatewayRouter, MESH_FRAME_FORMAT, MESH_FRAME_SIZE
import struct

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

def test_lora_binary_unpacking_and_gateway_e2e(client):
    """Verifies that 33-byte radio packets unpack accurately and ingest into FastAPI."""
    assert PAYLOAD_SIZE == 33, f"Expected 33 bytes, got {PAYLOAD_SIZE}"

    # Pack a 33-byte simulated packet
    hive_id = 7
    raw_packet = struct.pack(
        PAYLOAD_FORMAT,
        hive_id,
        3485,                              # 34.85 C
        3450, 3420, 3390, 3360, 3330,      # 5 frame temps
        5850,                              # 58.5% RH
        1420,                              # 142.0 kOhm
        1180,                              # 1180 ppm
        3350,                              # 33.50 kg
        42000,                             # 42000 lux
        0,                                 # 0 deg tilt
        25, 128, 178, 51, 25, 13, 5, 2     # 8 FFT bands
    )
    assert len(raw_packet) == 33

    # Unpack via daemon function
    telemetry_dict = unpack_lora_payload(raw_packet)
    assert telemetry_dict is not None
    assert telemetry_dict["hive_id"] == 7
    assert telemetry_dict["brood_core_temp"] == 34.85
    assert len(telemetry_dict["frame_temps"]) == 5
    assert telemetry_dict["humidity"] == 58.5
    assert telemetry_dict["voc_gas_res"] == 142.0
    assert telemetry_dict["co2_ppm"] == 1180.0
    assert telemetry_dict["weight_kg"] == 33.5
    assert len(telemetry_dict["fft_bands"]) == 8

    # Reject malformed packet lengths
    assert unpack_lora_payload(raw_packet[:30]) is None
    assert unpack_lora_payload(raw_packet + b"\x00") is None

    # Ingest unpacked dictionary into FastAPI Gateway
    resp = client.post("/api/v1/telemetry", json=telemetry_dict)
    assert resp.status_code == 200
    res_data = resp.json()
    assert res_data["status"] == "SUCCESS"
    assert res_data["hive_id"] == 7

def test_mesh_router_dedup_and_topology():
    """Verifies 41-byte mesh frames, duplicate detection, and topology graph."""
    assert MESH_FRAME_SIZE == 41, f"Expected 41 bytes, got {MESH_FRAME_SIZE}"

    router = BeevilMeshGatewayRouter()
    dummy_payload = b"\xAA" * 33
    
    # Create a 41-byte mesh packet from Hive 12, seq 42, 2 hops
    mesh_frame = struct.pack(MESH_FRAME_FORMAT, 12, 0, 42, 2, 2, dummy_payload)
    assert len(mesh_frame) == 41

    # 1. First RX should succeed
    rx1 = router.process_mesh_frame(mesh_frame, rssi_dbm=-78.5, snr_db=8.2)
    assert rx1 is not None
    assert rx1["source_hive_id"] == 12
    assert rx1["hop_count"] == 2
    assert rx1["sensor_payload_raw"] == dummy_payload

    # 2. Duplicate RX should be dropped
    rx_dup = router.process_mesh_frame(mesh_frame, rssi_dbm=-78.5, snr_db=8.2)
    assert rx_dup is None

    # 3. Invalid length frame should be rejected
    assert router.process_mesh_frame(mesh_frame[:35]) is None

    # 4. Topology summary checks
    topo = router.get_mesh_topology()
    assert topo["total_nodes"] >= 2  # Gateway + Hive 12
    assert topo["multi_hop_rate_pct"] == 100.0

if __name__ == "__main__":
    init_database()
    with TestClient(app) as test_c:
        test_root_endpoint(test_c)
        test_hives_overview(test_c)
        test_telemetry_ingest_nominal(test_c)
        test_telemetry_ingest_anomalies(test_c)
        test_telemetry_strict_validation(test_c)
        test_hive_detail_and_alerts(test_c)
        test_lora_binary_unpacking_and_gateway_e2e(test_c)
        test_mesh_router_dedup_and_topology()
    print("All gateway pipeline tests passed successfully!")
