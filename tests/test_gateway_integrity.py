"""
Gateway integrity tests
=======================
These tests pin down cross-tier behaviour between the node firmware and the gateway:

* A node without a microphone reports eight zero bands. That is "no data", not a silent hive,
  so it must not be diagnosed as queenless (it used to be: 95% QUEENLESS_DISTRESS on every frame).
* The Frame v2 sequence counter is used to drop retransmissions and to measure delivery.
* A database created by an older gateway (sensor columns NOT NULL) is migrated in place.
* A hive whose latest frame carries sentinels must still be viewable (it used to return HTTP 500).

Every test uses its own temporary database; none touches gateway/beevil_telemetry.db.
"""

import json
import sqlite3
import struct

import pytest
from fastapi.testclient import TestClient

from gateway import lora_receiver, server
from gateway.beevil_spec import PAYLOAD_V1_FORMAT, PAYLOAD_V2_FORMAT
from gateway.lora_receiver import unpack_lora_payload

NO_MIC = (0,) * 8
# uint8 bands as sent on the air; /255 gives the 0..1 fractions the rule engine uses.
# Index 2 (queen band) = 5/255 = 0.02 < 0.18, index 4 (swarm band) = 60/255 = 0.24 < 0.65.
LOW_QUEEN_BAND = (40, 60, 5, 50, 60, 40, 30, 20)


def v2_frame(hive=1, seq=1, brood=3480, co2=0xFFFF, tilt=0xFF, flags=0, bands=NO_MIC):
    """Frame v2 exactly as the current firmware would send it: only the sensors that are fitted
    carry values, everything else is a sentinel."""
    return struct.pack(
        PAYLOAD_V2_FORMAT, hive, seq, brood,
        -9999, -9999, -9999, -9999, -9999,           # DS18B20 grid not fitted
        0xFFFF, 0xFFFF, co2, 0xFFFF, 0xFFFF,         # humidity, VOC, CO2, weight, lux
        tilt, flags, *bands,
    )


def v1_frame(hive=1, brood=3480, bands=NO_MIC):
    return struct.pack(
        PAYLOAD_V1_FORMAT, hive, brood,
        -9999, -9999, -9999, -9999, -9999,
        0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
        0xFF, *bands,
    )


def post(client, **kwargs):
    return client.post("/api/v1/telemetry", json=unpack_lora_payload(v2_frame(**kwargs)))


def count(sql, *args):
    conn = server.get_db()
    try:
        return conn.execute(sql, args).fetchone()[0]
    finally:
        conn.close()


@pytest.fixture
def live_client(tmp_path, monkeypatch):
    monkeypatch.setattr(server, "DB_PATH", tmp_path / "live.db")
    monkeypatch.setattr(server, "BEEVIL_DEMO_MODE", False)
    with TestClient(server.app) as client:
        yield client


@pytest.fixture
def demo_client(tmp_path, monkeypatch):
    monkeypatch.setattr(server, "DB_PATH", tmp_path / "demo.db")
    monkeypatch.setattr(server, "BEEVIL_DEMO_MODE", True)
    with TestClient(server.app) as client:
        yield client


# ---------------------------------------------------------------------------
# No microphone is not a silent hive
# ---------------------------------------------------------------------------
def test_frame_without_microphone_is_not_diagnosed_queenless(live_client):
    r = post(live_client, bands=NO_MIC)
    assert r.status_code == 200
    body = r.json()
    assert body["audio_present"] is False
    assert body["diagnosis"] != "QUEENLESS_DISTRESS"
    assert body["confidence"] <= 0.6, "without audio the confidence must stay low"
    assert count("SELECT COUNT(*) FROM alerts") == 0


def test_low_queen_band_with_audio_still_raises_queenless(live_client):
    body = post(live_client, bands=LOW_QUEEN_BAND).json()
    assert body["audio_present"] is True
    assert body["diagnosis"] == "QUEENLESS_DISTRESS"
    assert count("SELECT COUNT(*) FROM alerts") == 1


def test_thermal_rule_still_fires_without_audio(live_client):
    body = post(live_client, brood=2900, bands=NO_MIC).json()  # 29.0 C brood temperature
    assert body["diagnosis"] == "THERMAL_STRESS"


def test_co2_rule_still_fires_without_audio(live_client):
    body = post(live_client, co2=3500, bands=NO_MIC).json()
    assert body["diagnosis"] == "PRE_SWARM_WARNING"


# ---------------------------------------------------------------------------
# Sequence counter: duplicates, gaps, wrap-around, reboot
# ---------------------------------------------------------------------------
def test_duplicate_sequence_is_acknowledged_but_not_stored(live_client):
    assert post(live_client, seq=5).json()["status"] == "SUCCESS"
    again = post(live_client, seq=5).json()
    assert again["status"] == "DUPLICATE"
    assert count("SELECT COUNT(*) FROM telemetry") == 1
    assert live_client.get("/api/v1/hives/1/link").json()["frames_duplicate"] == 1


def test_late_frame_just_behind_the_last_one_is_dropped(live_client):
    post(live_client, seq=100)
    assert post(live_client, seq=97).json()["status"] == "DUPLICATE"
    assert count("SELECT COUNT(*) FROM telemetry") == 1


def test_sequence_gap_is_counted_and_gives_a_delivery_ratio(live_client):
    post(live_client, seq=1)
    body = post(live_client, seq=4).json()  # frames 2 and 3 never arrived
    assert body["seq_state"] == "GAP" and body["frames_missed"] == 2
    link = live_client.get("/api/v1/hives/1/link").json()
    assert link["frames_accepted"] == 2 and link["frames_missed_est"] == 2
    assert link["delivery_ratio_est"] == 0.5


def test_sequence_wraparound_is_not_a_gap(live_client):
    post(live_client, seq=65535)
    body = post(live_client, seq=0).json()
    assert body["seq_state"] == "OK" and body["frames_missed"] == 0


def test_node_reboot_restarts_the_counter_without_a_blackout(live_client):
    post(live_client, seq=500)
    assert post(live_client, seq=0).json()["seq_state"] == "RESET"
    assert post(live_client, seq=1).json()["seq_state"] == "OK"
    assert live_client.get("/api/v1/hives/1/link").json()["seq_resets"] == 1
    assert count("SELECT COUNT(*) FROM telemetry") == 3


def test_unsequenced_frames_are_never_deduplicated(live_client):
    legacy = unpack_lora_payload(v2_frame())
    legacy.pop("seq")  # API callers and v1 frames carry no counter
    for _ in range(2):
        assert live_client.post("/api/v1/telemetry", json=legacy).json()["status"] == "SUCCESS"
    assert count("SELECT COUNT(*) FROM telemetry") == 2


def test_v1_frames_carry_no_sequence_number():
    parsed = unpack_lora_payload(v1_frame())
    assert parsed["version"] == 1 and parsed["seq"] is None


def test_link_endpoint_is_404_before_any_sequenced_frame(live_client):
    assert live_client.get("/api/v1/hives/42/link").status_code == 404


def test_receiver_treats_a_duplicate_ack_as_delivered(monkeypatch):
    class FakeResponse:
        status = 200
        def read(self):
            return json.dumps({"status": "DUPLICATE", "seq_state": "DUPLICATE",
                               "diagnosis": None, "confidence": None}).encode()
        def __enter__(self):
            return self
        def __exit__(self, *exc):
            return False

    monkeypatch.setattr(lora_receiver.urllib.request, "urlopen", lambda *a, **k: FakeResponse())
    assert lora_receiver.forward_to_gateway_api({"hive_id": 1, "seq": 9}) is True


# ---------------------------------------------------------------------------
# Missing sensors must never break the API
# ---------------------------------------------------------------------------
def test_hive_detail_survives_a_frame_with_missing_sensors(demo_client):
    assert post(demo_client, hive=7).status_code == 200
    r = demo_client.get("/api/v1/hives/7")
    assert r.status_code == 200
    body = r.json()
    assert body["varroa_analytics"]["status"] == "INSUFFICIENT_DATA"
    assert body["honey_forecast"]["status"] == "INSUFFICIENT_DATA"


# ---------------------------------------------------------------------------
# Schema migration for databases created by older gateways
# ---------------------------------------------------------------------------
def test_legacy_not_null_database_is_migrated_in_place(tmp_path, monkeypatch):
    db = tmp_path / "legacy.db"
    legacy_ddl = server.TELEMETRY_DDL.format(name="telemetry")
    for column in server._NULLABLE_SENSOR_COLUMNS:
        legacy_ddl = legacy_ddl.replace(f"{column} REAL,", f"{column} REAL NOT NULL,")
    conn = sqlite3.connect(db)
    conn.executescript(
        "CREATE TABLE hives (hive_id INTEGER PRIMARY KEY, name TEXT NOT NULL, location TEXT NOT NULL, "
        "queen_age_months INTEGER DEFAULT 6, installation_date TEXT NOT NULL, tare_weight_kg REAL DEFAULT 22.5, "
        "status TEXT DEFAULT 'HEALTHY', last_seen_epoch INTEGER DEFAULT 0, last_health_score REAL DEFAULT 98.5);"
        + legacy_ddl
    )
    conn.execute(
        "INSERT INTO telemetry (hive_id, timestamp, epoch_sec, brood_core_temp, frame_t1, frame_t2, frame_t3, frame_t4, "
        "frame_t5, humidity, voc_gas_res, co2_ppm, weight_kg, lux, tilt_deg, fft_b1, fft_b2, fft_b3, fft_b4, fft_b5, "
        "fft_b6, fft_b7, fft_b8, ai_diagnosis, ai_confidence) VALUES (3, 't', 1, 34.8, 33, 33, 33, 33, 33, 50, 100, "
        "800, 30, 1000, 0, .1, .1, .1, .1, .1, .1, .1, .1, 'HEALTHY_NORMAL', 0.9);"
    )
    conn.commit()
    conn.close()

    monkeypatch.setattr(server, "DB_PATH", db)
    monkeypatch.setattr(server, "BEEVIL_DEMO_MODE", False)
    server.init_database()

    conn = sqlite3.connect(db)
    notnull = {r[1]: r[3] for r in conn.execute("PRAGMA table_info(telemetry)")}
    assert not any(notnull[c] for c in server._NULLABLE_SENSOR_COLUMNS)
    assert conn.execute("SELECT COUNT(*) FROM telemetry").fetchone()[0] == 1, "existing rows must survive"
    assert conn.execute("PRAGMA user_version").fetchone()[0] == server.SCHEMA_VERSION
    assert conn.execute("SELECT name FROM sqlite_master WHERE name='telemetry_legacy'").fetchone() is None
    conn.close()

    with TestClient(server.app) as client:
        assert post(client).status_code == 200  # a sentinel frame no longer violates NOT NULL
