# TELEMETRY & PERSISTENCE SCHEMA (Schema.md)

**Project:** BEEVIL KNIEVEL  
**Engine:** SQLite 3.x (WAL Mode) & Binary Over-the-Air Telemetry  

---

## 1. Relational Telemetry Table (`telemetry`)

```sql
CREATE TABLE IF NOT EXISTS telemetry (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    node_id INTEGER NOT NULL,            -- 16-bit unsigned unique hive identifier
    seq INTEGER NOT NULL,                -- 16-bit rolling sequence counter
    timestamp INTEGER NOT NULL,          -- Unix epoch UTC timestamp (seconds)
    brood_temp REAL NOT NULL,            -- TI TMP117 (deg C, 0.01 resolution)
    grad_1 REAL NOT NULL,                -- DS18B20 Frame 1 (deg C)
    grad_2 REAL NOT NULL,                -- DS18B20 Frame 2 (deg C)
    grad_3 REAL NOT NULL,                -- DS18B20 Frame 3 (deg C)
    grad_4 REAL NOT NULL,                -- DS18B20 Frame 4 (deg C)
    grad_5 REAL NOT NULL,                -- DS18B20 Frame 5 (deg C)
    humidity REAL NOT NULL,              -- BME688 Relative Humidity (%RH)
    co2_ppm INTEGER NOT NULL,            -- SCD41 NDIR CO2 (parts-per-million)
    weight_kg REAL NOT NULL,             -- HX711 24-bit scale (kg)
    fft_band_1 REAL NOT NULL,            -- 100-200 Hz spectral power
    fft_band_2 REAL NOT NULL,            -- 200-300 Hz spectral power
    fft_band_3 REAL NOT NULL,            -- 300-500 Hz spectral power
    fft_band_4 REAL NOT NULL,            -- 500-1000 Hz spectral power
    battery_mv INTEGER NOT NULL,         -- LiFePO4 battery terminal voltage (mV)
    rssi_dbm INTEGER NOT NULL,           -- SX1262 received signal strength (dBm)
    snr_db REAL NOT NULL,                -- SX1262 signal-to-noise ratio (dB)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_telemetry_node_time ON telemetry (node_id, timestamp DESC);
```

---

## 2. Cryptographic Block Table (`honeychain`)

```sql
CREATE TABLE IF NOT EXISTS honeychain (
    block_index INTEGER PRIMARY KEY AUTOINCREMENT,
    prev_hash TEXT NOT NULL,             -- SHA-256 hex digest of previous block
    telemetry_hash TEXT NOT NULL,        -- SHA-256 hex digest of raw telemetry payload
    timestamp INTEGER NOT NULL,          -- Ingestion timestamp
    block_hash TEXT NOT NULL,            -- SHA-256(block_index || prev_hash || telemetry_hash || timestamp)
    signature TEXT                       -- Ed25519 node signature (optional)
);
```
