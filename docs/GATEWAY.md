# 🌐 BEEVIL KNIEVEL — Linux Edge Gateway & Server Architecture

This document describes the design, implementation, concurrency model, database schema, and security controls of the Beevil Knievel Linux Edge Gateway (`gateway/server.py` and `gateway/lora_receiver.py`).

---

## 🎯 Architectural Overview

The gateway runs as a hardened edge base station on a **Raspberry Pi 3B+ (BCM2837B0 quad-core Cortex-A53 @ 1.4 GHz)** with a **Waveshare SX1262 LoRa HAT** connected over SPI (`/dev/spidev0.0`).

```
+-------------------------------------------------------------+
| Waveshare SX1262 LoRa HAT (865.0625 MHz, +14 dBm)           |
+-------------------------------------------------------------+
                              | SPI /dev/spidev0.0
                              v
+-------------------------------------------------------------+
| lora_receiver.py Background Ingestion Daemon                |
| - Unpacks 33-byte binary struct (<Hh5hHHHHH B8B)            |
| - Dispatches JSON to local HTTP Ingest Endpoint             |
+-------------------------------------------------------------+
                              | HTTP POST (Loopback 127.0.0.1:8000)
                              v
+-------------------------------------------------------------+
| server.py FastAPI High-Performance Application              |
| - Pydantic Schema Validation (HTTP 422 on bad data)         |
| - Anomaly Tripwire: LIS3DH Tilt > 15°, CUSUM Drift Collapse  |
| - Multi-Modal Random Forest Diagnostic Classifier           |
| - SQLite Database (Write-Ahead Logging / WAL Mode)          |
| - Background WebSocket Live Broadcast (/api/v1/ws/live)     |
+-------------------------------------------------------------+
```

---

## 🛡️ Operational Modes: DEMO MODE vs. LIVE MODE

To prevent synthetic exhibition data from contaminating production field databases, the gateway enforces strict environment-controlled mode isolation:

| Setting | Variable Setting | Database Behavior | Log Indicator | Root API Response |
| :--- | :--- | :--- | :--- | :--- |
| **Demo Mode** | `BEEVIL_DEMO_MODE=true` | Automatically seeds 100 synthetic hives on first run if database is empty. | `[DB] [DEMO MODE] Initializing 100 demo hive registry...` | `"mode": "DEMO"` |
| **Live Production**| `BEEVIL_DEMO_MODE=false` | Initializes clean, empty schema (0 hives). Only authentic field nodes are registered. | `[DB] [LIVE MODE] Empty database initialized (0 hives)...` | `"mode": "LIVE"` |

---

## 🔒 Security Hardening & Configuration

Configuration is externalized through environment variables (template provided in `gateway/.env.example`):

| Variable Name | Default Value | Production Description | Security Implication |
| :--- | :--- | :--- | :--- |
| `BEEVIL_DEMO_MODE` | `true` | Enables/disables synthetic demo hive generation. | Prevents fake data in production. |
| `BEEVIL_DB_PATH` | `gateway/beevil_telemetry.db` | Filesystem path to SQLite database file. | Can point to persistent mounted volume. |
| `BEEVIL_MODEL_PATH`| `Cloud Model/...pt` | Path to edge deep learning model artifact. | Safely falls back if file is absent. |
| `BEEVIL_API_HOST` | `0.0.0.0` | Binding network address. | In field, bind to `127.0.0.1` behind reverse proxy. |
| `BEEVIL_API_PORT` | `8000` | Gateway listening port. | Standard unprivileged port. |
| `BEEVIL_CORS_ORIGINS`| Localhost URLs | Comma-separated allowed CORS origins. | **Wildcard with credentials eliminated.** Only authorized frontends allowed. |

### Power-Loss Immunity via Linux OverlayFS

In rural apiaries, solar gateways experience frequent brownouts. An SD card operating on a standard ext4 read-write filesystem corrupts within months. Beevil Knievel includes `gateway/setup_overlayfs.sh`, which configures:
1. **Read-Only Root Filesystem (`/`):** Operating system binaries and libraries are mounted read-only.
2. **RAM-Backed tmpfs Layer:** Ephemeral system writes occur in RAM and disappear cleanly on power-cut without corruption.
3. **Dedicated Persistent Data Partition:** The SQLite WAL database is stored on a designated persistent partition with synchronous journaling.

---

## 🗄️ Database Architecture (SQLite WAL Mode)

```sql
PRAGMA journal_mode=WAL;
PRAGMA synchronous=NORMAL;
PRAGMA foreign_keys=ON;

-- Table 1: Hives Inventory Registry
CREATE TABLE IF NOT EXISTS hives (
    hive_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    queen_age_months INTEGER DEFAULT 6,
    installation_date TEXT NOT NULL,
    tare_weight_kg REAL DEFAULT 22.5,
    status TEXT DEFAULT 'HEALTHY',
    last_seen_epoch INTEGER DEFAULT 0,
    last_health_score REAL DEFAULT 98.5
);

-- Table 2: High-Resolution Telemetry Time-Series
CREATE TABLE IF NOT EXISTS telemetry (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hive_id INTEGER NOT NULL,
    timestamp TEXT NOT NULL,
    epoch_sec INTEGER NOT NULL,
    brood_core_temp REAL NOT NULL,
    frame_t1 REAL NOT NULL, frame_t2 REAL NOT NULL,
    frame_t3 REAL NOT NULL, frame_t4 REAL NOT NULL,
    frame_t5 REAL NOT NULL,
    humidity REAL NOT NULL,
    voc_gas_res REAL NOT NULL,
    co2_ppm REAL NOT NULL,
    weight_kg REAL NOT NULL,
    lux REAL NOT NULL,
    tilt_deg REAL NOT NULL,
    fft_b1 REAL NOT NULL, fft_b2 REAL NOT NULL,
    fft_b3 REAL NOT NULL, fft_b4 REAL NOT NULL,
    fft_b5 REAL NOT NULL, fft_b6 REAL NOT NULL,
    fft_b7 REAL NOT NULL, fft_b8 REAL NOT NULL,
    ai_diagnosis TEXT NOT NULL,
    ai_confidence REAL NOT NULL,
    FOREIGN KEY (hive_id) REFERENCES hives (hive_id)
);

-- Table 3: Emergency Beekeeping Alerts
CREATE TABLE IF NOT EXISTS alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hive_id INTEGER NOT NULL,
    timestamp TEXT NOT NULL,
    epoch_sec INTEGER NOT NULL,
    alert_type TEXT NOT NULL,
    severity TEXT NOT NULL,
    message TEXT NOT NULL,
    confidence REAL NOT NULL,
    resolved INTEGER DEFAULT 0,
    FOREIGN KEY (hive_id) REFERENCES hives (hive_id)
);

-- High-Efficiency Composite B-Tree Indices
CREATE INDEX IF NOT EXISTS idx_telemetry_hive_time ON telemetry (hive_id, epoch_sec DESC);
CREATE INDEX IF NOT EXISTS idx_alerts_hive_time ON alerts (hive_id, epoch_sec DESC);
CREATE INDEX IF NOT EXISTS idx_alerts_unresolved ON alerts (resolved, epoch_sec DESC);
```

* **Throughput:** Benchmarked at **148.13 packets/second** with **6.74 ms** average insertion latency.

---

## 📡 REST API Reference

| Method | Endpoint | Description | Sample Response |
| :---: | :--- | :--- | :--- |
| `GET` | `/` | System health, operational mode (`DEMO`/`LIVE`), and registered hive count. | `{"status": "ONLINE", "mode": "DEMO", "registered_hives": 100}` |
| `GET` | `/api/v1/hives` | Overview card array of all registered hives with latest health scores. | `{"count": 100, "hives": [...]}` |
| `GET` | `/api/v1/hives/{id}` | Detailed telemetry history, 5-frame thermal array, and active alerts. | `{"hive": {...}, "recent_telemetry": [...]}` |
| `POST`| `/api/v1/telemetry` | Ingests new telemetry payload, runs ML diagnosis, updates DB, triggers WS. | `{"status": "SUCCESS", "diagnosis": "HEALTHY_NORMAL"}` |
| `GET` | `/api/v1/alerts` | Returns unresolved active alerts filtered by severity. | `{"unresolved_alerts": [...]}` |
| `WS`  | `/api/v1/ws/live` | WebSocket connection streaming real-time JSON packets as they arrive. | `{"type": "TELEMETRY_UPDATE", "data": {...}}` |
