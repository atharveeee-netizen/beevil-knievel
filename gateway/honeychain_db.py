"""
HONEY CHAIN — Core Database Engine & Schema (SQLite WAL Mode)
Problem Statement ID: 26021 — Ministry of MSME, Coordination Section
Target: Digital Honey Traceability & Smart Beekeeping Platform (KVIC Honey Mission)
"""

import sqlite3
from pathlib import Path
from datetime import datetime, timezone
import json

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "honeychain.db"

def get_db():
    conn = sqlite3.connect(str(DB_PATH), timeout=20.0, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("PRAGMA journal_mode=WAL;")
    cursor.execute("PRAGMA synchronous=NORMAL;")
    cursor.execute("PRAGMA foreign_keys=ON;")

    # 1. Organizations
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS organizations (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        org_type TEXT NOT NULL, -- GOVERNMENT_KVIC, COOPERATIVE, PROCESSOR, QA_LAB
        created_at TEXT NOT NULL
    );
    """)

    # 2. Clusters (KVIC Regional Beekeeping Hubs)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS clusters (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        state TEXT NOT NULL,
        district TEXT NOT NULL,
        pincode TEXT NOT NULL,
        contact_officer TEXT NOT NULL,
        officer_phone TEXT NOT NULL,
        created_at TEXT NOT NULL
    );
    """)

    # 3. Beekeepers (Rural farmers & tribal beneficiaries)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS beekeepers (
        id TEXT PRIMARY KEY,
        cluster_id TEXT NOT NULL,
        name TEXT NOT NULL,
        registration_no TEXT UNIQUE NOT NULL,
        phone TEXT NOT NULL,
        aadhaar_masked TEXT NOT NULL,
        bank_linked INTEGER DEFAULT 1,
        created_at TEXT NOT NULL,
        FOREIGN KEY (cluster_id) REFERENCES clusters (id)
    );
    """)

    # 4. Apiaries (Physical yards)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS apiaries (
        id TEXT PRIMARY KEY,
        beekeeper_id TEXT NOT NULL,
        name TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        elevation_m REAL NOT NULL,
        primary_flora TEXT NOT NULL,
        total_boxes INTEGER DEFAULT 10,
        created_at TEXT NOT NULL,
        FOREIGN KEY (beekeeper_id) REFERENCES beekeepers (id)
    );
    """)

    # 5. Smart Hives (Instrumented with Honey Chain Smart Hive Nodes / Beevil Knievel)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS hives (
        hive_id INTEGER PRIMARY KEY,
        apiary_id TEXT NOT NULL,
        beekeeper_id TEXT NOT NULL,
        name TEXT NOT NULL,
        hardware_node_id INTEGER DEFAULT 1,
        queen_age_months INTEGER DEFAULT 6,
        installation_date TEXT NOT NULL,
        tare_weight_kg REAL DEFAULT 22.5,
        status TEXT DEFAULT 'HEALTHY', -- HEALTHY, ATTENTION, AT_RISK
        last_seen_epoch INTEGER DEFAULT 0,
        last_health_score REAL DEFAULT 98.5,
        FOREIGN KEY (apiary_id) REFERENCES apiaries (id),
        FOREIGN KEY (beekeeper_id) REFERENCES beekeepers (id)
    );
    """)

    # 6. Telemetry (IoT multi-sensor time-series stream)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS telemetry (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hive_id INTEGER NOT NULL,
        timestamp TEXT NOT NULL,
        epoch_sec INTEGER NOT NULL,
        presence_mask INTEGER DEFAULT 255,
        brood_core_temp REAL NOT NULL,
        frame_t1 REAL NOT NULL,
        frame_t2 REAL NOT NULL,
        frame_t3 REAL NOT NULL,
        frame_t4 REAL NOT NULL,
        frame_t5 REAL NOT NULL,
        humidity REAL NOT NULL,
        voc_gas_res REAL NOT NULL,
        co2_ppm REAL NOT NULL,
        weight_kg REAL NOT NULL,
        lux REAL NOT NULL,
        tilt_deg REAL NOT NULL,
        fft_b1 REAL NOT NULL,
        fft_b2 REAL NOT NULL,
        fft_b3 REAL NOT NULL,
        fft_b4 REAL NOT NULL,
        fft_b5 REAL NOT NULL,
        fft_b6 REAL NOT NULL,
        fft_b7 REAL NOT NULL,
        fft_b8 REAL NOT NULL,
        ai_diagnosis TEXT NOT NULL,
        ai_confidence REAL NOT NULL,
        battery_soc INTEGER DEFAULT 95,
        FOREIGN KEY (hive_id) REFERENCES hives (hive_id)
    );
    """)

    # 7. Emergency & Health Alerts
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS alerts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hive_id INTEGER NOT NULL,
        timestamp TEXT NOT NULL,
        epoch_sec INTEGER NOT NULL,
        alert_type TEXT NOT NULL,
        severity TEXT NOT NULL, -- INFO, WARNING, CRITICAL
        message TEXT NOT NULL,
        confidence REAL NOT NULL,
        resolved INTEGER DEFAULT 0,
        FOREIGN KEY (hive_id) REFERENCES hives (hive_id)
    );
    """)

    # 8. Harvests (Recorded by Beekeeper at Apiary)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS harvests (
        id TEXT PRIMARY KEY,
        hive_id INTEGER NOT NULL,
        apiary_id TEXT NOT NULL,
        beekeeper_id TEXT NOT NULL,
        harvest_date TEXT NOT NULL,
        quantity_kg REAL NOT NULL,
        field_moisture_pct REAL NOT NULL,
        floral_source TEXT NOT NULL,
        notes TEXT,
        created_at TEXT NOT NULL,
        FOREIGN KEY (hive_id) REFERENCES hives (hive_id),
        FOREIGN KEY (apiary_id) REFERENCES apiaries (id),
        FOREIGN KEY (beekeeper_id) REFERENCES beekeepers (id)
    );
    """)

    # 9. Honey Batches (Consolidated processing entity)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS honey_batches (
        id TEXT PRIMARY KEY, -- e.g. BATCH-2026-001
        batch_code TEXT UNIQUE NOT NULL,
        cluster_id TEXT NOT NULL,
        beekeeper_id TEXT NOT NULL,
        apiary_id TEXT NOT NULL,
        harvest_id TEXT NOT NULL,
        weight_kg REAL NOT NULL,
        floral_source TEXT NOT NULL,
        status TEXT NOT NULL, -- HARVESTED, QUALITY_PENDING, QUALITY_VERIFIED, PROCESSING, PACKAGED, VERIFIED, FLAGGED, RECALLED
        curing_days INTEGER DEFAULT 21,
        created_at TEXT NOT NULL,
        finalized_at TEXT,
        FOREIGN KEY (cluster_id) REFERENCES clusters (id),
        FOREIGN KEY (beekeeper_id) REFERENCES beekeepers (id),
        FOREIGN KEY (apiary_id) REFERENCES apiaries (id),
        FOREIGN KEY (harvest_id) REFERENCES harvests (id)
    );
    """)

    # 10. Quality Tests (KVIC QA Lab or Field Spectrophotometer Certification)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS quality_tests (
        id TEXT PRIMARY KEY,
        batch_id TEXT NOT NULL,
        lab_name TEXT NOT NULL,
        tested_at TEXT NOT NULL,
        moisture_pct REAL NOT NULL,
        hmf_mg_kg REAL NOT NULL,
        diastase_number REAL NOT NULL,
        electrical_conductivity REAL NOT NULL,
        c4_sugar_pct REAL NOT NULL,
        c3_sugar_pct REAL NOT NULL,
        adulteration_result TEXT NOT NULL, -- PURE_AUTHENTIC, SUSPECT, ADULTERATED
        status TEXT NOT NULL, -- PASS, PENDING, FAIL
        certificate_hash TEXT NOT NULL,
        notes TEXT,
        FOREIGN KEY (batch_id) REFERENCES honey_batches (id)
    );
    """)

    # 11. Processing Events
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS processing_events (
        id TEXT PRIMARY KEY,
        batch_id TEXT NOT NULL,
        facility_name TEXT NOT NULL,
        operator_id TEXT NOT NULL,
        started_at TEXT NOT NULL,
        completed_at TEXT NOT NULL,
        filtering_temp_c REAL NOT NULL,
        settling_hours REAL NOT NULL,
        moisture_reduction_pct REAL NOT NULL,
        status TEXT NOT NULL, -- COMPLETED, IN_PROGRESS
        FOREIGN KEY (batch_id) REFERENCES honey_batches (id)
    );
    """)

    # 12. Packaging Lots
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS packaging_lots (
        id TEXT PRIMARY KEY,
        batch_id TEXT NOT NULL,
        lot_number TEXT UNIQUE NOT NULL,
        jar_size_g INTEGER NOT NULL,
        total_units INTEGER NOT NULL,
        packaged_at TEXT NOT NULL,
        expiry_date TEXT NOT NULL,
        facility_location TEXT NOT NULL,
        FOREIGN KEY (batch_id) REFERENCES honey_batches (id)
    );
    """)

    # 13. Individual Retail Packages (Assigned unique QR token)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS packages (
        id TEXT PRIMARY KEY,
        package_code TEXT UNIQUE NOT NULL, -- e.g. HC-PKG-9B8A4F2C
        lot_id TEXT NOT NULL,
        batch_id TEXT NOT NULL,
        unit_index INTEGER NOT NULL,
        qr_token TEXT NOT NULL,
        status TEXT DEFAULT 'ACTIVE', -- ACTIVE, RECALLED, REVOKED
        issued_at TEXT NOT NULL,
        FOREIGN KEY (lot_id) REFERENCES packaging_lots (id),
        FOREIGN KEY (batch_id) REFERENCES honey_batches (id)
    );
    """)

    # 14. QR Scans & Counterfeit Detection Log
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS qr_scans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        package_code TEXT NOT NULL,
        scanned_at TEXT NOT NULL,
        ip_address TEXT NOT NULL,
        location_city TEXT NOT NULL,
        user_agent TEXT NOT NULL,
        scan_count INTEGER NOT NULL,
        anomaly_flag TEXT NOT NULL, -- NORMAL, EXCESSIVE_SCANS, REUSE_DETECTED, REVOKED_ATTEMPT
        FOREIGN KEY (package_code) REFERENCES packages (package_code)
    );
    """)

    # 15. Permissioned Cryptographic Ledger Events
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS ledger_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_id TEXT UNIQUE NOT NULL,
        batch_id TEXT NOT NULL,
        event_type TEXT NOT NULL,
        actor_id TEXT NOT NULL,
        actor_role TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        payload_json TEXT NOT NULL,
        payload_hash TEXT NOT NULL,
        previous_event_hash TEXT NOT NULL,
        event_hash TEXT NOT NULL,
        tampered INTEGER DEFAULT 0
    );
    """)

    # 16. Market Linkage Orders
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS market_orders (
        id TEXT PRIMARY KEY,
        batch_id TEXT NOT NULL,
        seller_id TEXT NOT NULL,
        buyer_name TEXT NOT NULL,
        quantity_kg REAL NOT NULL,
        price_per_kg REAL NOT NULL,
        total_amount REAL NOT NULL,
        status TEXT NOT NULL, -- LISTED, ORDERED, DISPATCHED, DELIVERED
        created_at TEXT NOT NULL,
        FOREIGN KEY (batch_id) REFERENCES honey_batches (id)
    );
    """)

    # Indexes
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_telemetry_hive_time ON telemetry (hive_id, epoch_sec DESC);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_alerts_hive_time ON alerts (hive_id, epoch_sec DESC);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_batches_cluster ON honey_batches (cluster_id);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_packages_code ON packages (package_code);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_ledger_batch ON ledger_events (batch_id);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_scans_code ON qr_scans (package_code);")

    conn.commit()
    conn.close()
    print("[HONEYCHAIN-DB] Database schema initialized successfully.")

if __name__ == "__main__":
    init_db()
