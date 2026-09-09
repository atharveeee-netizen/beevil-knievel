"""
HONEY CHAIN — Deterministic Demo Seeder
SIH Problem Statement 26021: Ministry of MSME, Coordination Section

Populates realistic, connected apiculture, traceability, cryptographic ledger,
and QR verification demo data matching Phase 32 specifications.
"""

import sys
import os
from pathlib import Path
from datetime import datetime, timezone, timedelta
import uuid

# Ensure gateway path is in sys.path
BASE_DIR = Path(__file__).resolve().parent
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

from honeychain_db import init_db, get_db
from honeychain_ledger import HoneyChainLedger
from honeychain_qr import HoneyChainQREngine

def seed_demo_data():
    print("[SEED] Initializing Honey Chain database schema...")
    init_db()

    conn = get_db()
    cursor = conn.cursor()

    # Clear existing data to ensure deterministic demo state
    print("[SEED] Resetting demo state...")
    tables = [
        "market_orders", "ledger_events", "qr_scans", "packages", "packaging_lots",
        "processing_events", "quality_tests", "honey_batches", "harvests",
        "alerts", "telemetry", "hives", "apiaries", "beekeepers", "clusters", "organizations"
    ]
    for table in tables:
        cursor.execute(f"DELETE FROM {table};")
    conn.commit()

    now = datetime.now(timezone.utc)
    t_minus_30d = (now - timedelta(days=30)).isoformat()
    t_minus_20d = (now - timedelta(days=20)).isoformat()
    t_minus_14d = (now - timedelta(days=14)).isoformat()
    t_minus_10d = (now - timedelta(days=10)).isoformat()
    t_minus_7d = (now - timedelta(days=7)).isoformat()
    t_minus_5d = (now - timedelta(days=5)).isoformat()
    t_minus_2d = (now - timedelta(days=2)).isoformat()
    now_iso = now.isoformat()

    # 1. Organizations
    print("[SEED] Inserting KVIC Honey Mission Organization...")
    cursor.execute("""
    INSERT INTO organizations (id, name, org_type, created_at)
    VALUES (?, ?, ?, ?);
    """, (
        "org-kvic-national",
        "Khadi & Village Industries Commission (KVIC) — Honey Mission",
        "GOVERNMENT_KVIC",
        t_minus_30d
    ))

    # 2. Clusters (3 Clusters across India)
    print("[SEED] Inserting 3 Regional Clusters...")
    clusters = [
        ("cluster-nilgiris", "Nilgiris Mountain Forest Cluster", "Tamil Nadu", "Nilgiris", "643001", "Dr. S. Sundaram", "+91 94432 00101", t_minus_30d),
        ("cluster-gir", "Gir Forest Flora Apiculture Cluster", "Gujarat", "Junagadh", "362150", "Er. K. Vala", "+91 99245 00202", t_minus_30d),
        ("cluster-kashmir", "Kashmir Valley Acacia Cluster", "Jammu & Kashmir", "Pulwama", "192301", "Dr. M. Lone", "+91 94190 00303", t_minus_30d)
    ]
    cursor.executemany("""
    INSERT INTO clusters (id, name, state, district, pincode, contact_officer, officer_phone, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    """, clusters)

    # 3. Beekeepers (5 rural beekeepers)
    print("[SEED] Inserting 5 Registered Beekeepers...")
    beekeepers = [
        ("BEE-KVIC-001", "cluster-nilgiris", "Ramanathan Pillai", "KVIC-REG-TN-4102", "+91 94432 18491", "XXXX-XXXX-8912", 1, t_minus_30d),
        ("BEE-KVIC-002", "cluster-nilgiris", "Kavitha Murugan", "KVIC-REG-TN-4189", "+91 98421 90123", "XXXX-XXXX-4531", 1, t_minus_30d),
        ("BEE-KVIC-003", "cluster-gir", "Bhavesh Patel", "KVIC-REG-GJ-8821", "+91 99245 61720", "XXXX-XXXX-3319", 1, t_minus_30d),
        ("BEE-KVIC-004", "cluster-gir", "Dharmesh Ahir", "KVIC-REG-GJ-8854", "+91 97230 44910", "XXXX-XXXX-7742", 1, t_minus_30d),
        ("BEE-KVIC-005", "cluster-kashmir", "Ghulam Nabi Lone", "KVIC-REG-JK-1044", "+91 94190 28311", "XXXX-XXXX-9905", 1, t_minus_30d)
    ]
    cursor.executemany("""
    INSERT INTO beekeepers (id, cluster_id, name, registration_no, phone, aadhaar_masked, bank_linked, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    """, beekeepers)

    # 4. Apiaries
    print("[SEED] Inserting Apiaries...")
    apiaries = [
        ("apiary-nilgiris-01", "BEE-KVIC-001", "Shola Ridge Apiary Alpha", 11.3601, 76.8010, 1850.0, "Nilgiris Wild Multifloral & Eucalyptus", 12, t_minus_30d),
        ("apiary-nilgiris-02", "BEE-KVIC-002", "Blue Mountain High Apiary", 11.4210, 76.8654, 1920.0, "Tea Estate & Mountain Flora", 8, t_minus_30d),
        ("apiary-gir-01", "BEE-KVIC-003", "Somnath Border Apiary", 21.0512, 70.5210, 140.0, "Jamun & Forest Flora", 15, t_minus_30d),
        ("apiary-gir-02", "BEE-KVIC-004", "Sasan Teak Forest Apiary", 21.1620, 70.6120, 180.0, "Teak Buffer & Mustard", 10, t_minus_30d),
        ("apiary-kashmir-01", "BEE-KVIC-005", "Pampore Saffron & Acacia Apiary", 33.9920, 74.9210, 1610.0, "White Acacia & Saffron Bloom", 12, t_minus_30d)
    ]
    cursor.executemany("""
    INSERT INTO apiaries (id, beekeeper_id, name, latitude, longitude, elevation_m, primary_flora, total_boxes, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    """, apiaries)

    # 5. Smart Hives (12 Hives with Beevil Knievel IoT Nodes)
    print("[SEED] Inserting 12 Smart Hives with IoT Instrumentation...")
    hives_data = [
        (1, "apiary-nilgiris-01", "BEE-KVIC-001", "Hive-001 (Alpha Core)", 1, 8, t_minus_30d, 22.5, "HEALTHY", int(now.timestamp()), 98.5),
        (2, "apiary-nilgiris-01", "BEE-KVIC-001", "Hive-002 (Shola West)", 2, 6, t_minus_30d, 22.0, "HEALTHY", int(now.timestamp()), 97.2),
        (3, "apiary-nilgiris-01", "BEE-KVIC-001", "Hive-003 (Thermal Monitor)", 3, 14, t_minus_30d, 23.0, "AT_RISK", int(now.timestamp()), 42.0),
        (4, "apiary-nilgiris-02", "BEE-KVIC-002", "Hive-004 (Eucalyptus Ridge)", 4, 7, t_minus_30d, 21.8, "HEALTHY", int(now.timestamp()), 96.8),
        (5, "apiary-nilgiris-02", "BEE-KVIC-002", "Hive-005 (Valley Edge)", 5, 5, t_minus_30d, 22.4, "HEALTHY", int(now.timestamp()), 95.5),
        (6, "apiary-gir-01", "BEE-KVIC-003", "Hive-006 (Talala Jamun 1)", 6, 9, t_minus_30d, 22.8, "HEALTHY", int(now.timestamp()), 98.0),
        (7, "apiary-gir-01", "BEE-KVIC-003", "Hive-007 (Talala Jamun 2)", 7, 4, t_minus_30d, 21.5, "HEALTHY", int(now.timestamp()), 99.1),
        (8, "apiary-gir-01", "BEE-KVIC-003", "Hive-008 (Talala Mustard)", 8, 10, t_minus_30d, 23.1, "HEALTHY", int(now.timestamp()), 94.0),
        (9, "apiary-gir-02", "BEE-KVIC-004", "Hive-009 (Teak Buffer 1)", 9, 8, t_minus_30d, 22.2, "HEALTHY", int(now.timestamp()), 97.4),
        (10, "apiary-gir-02", "BEE-KVIC-004", "Hive-010 (Teak Buffer 2)", 10, 6, t_minus_30d, 22.0, "HEALTHY", int(now.timestamp()), 96.0),
        (11, "apiary-kashmir-01", "BEE-KVIC-005", "Hive-011 (White Honey Core)", 11, 7, t_minus_30d, 22.5, "HEALTHY", int(now.timestamp()), 99.0),
        (12, "apiary-kashmir-01", "BEE-KVIC-005", "Hive-012 (Acacia High)", 12, 11, t_minus_30d, 22.9, "HEALTHY", int(now.timestamp()), 98.2)
    ]
    cursor.executemany("""
    INSERT INTO hives (hive_id, apiary_id, beekeeper_id, name, hardware_node_id, queen_age_months, installation_date, tare_weight_kg, status, last_seen_epoch, last_health_score)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    """, hives_data)

    # 6. Telemetry & Alerts
    print("[SEED] Generating Multi-Sensor IoT Telemetry Stream...")
    now_epoch = int(now.timestamp())
    telemetry_rows = []
    
    # Healthy Hive 1 telemetry
    telemetry_rows.append((
        1, now_iso, now_epoch, 255, 34.8, 33.2, 33.8, 34.6, 33.9, 33.1,
        58.5, 12500.0, 680.0, 31.4, 450.0, 0.4,
        0.05, 0.12, 0.38, 0.85, 0.42, 0.18, 0.08, 0.04,
        "HEALTHY_NORMAL", 0.985, 94
    ))
    # Abnormal Hive 3 telemetry (Thermal stress + pre-swarm anomaly)
    telemetry_rows.append((
        3, now_iso, now_epoch, 255, 37.6, 36.8, 37.2, 37.5, 37.0, 36.5,
        74.2, 3400.0, 2450.0, 26.1, 820.0, 1.8,
        0.08, 0.22, 0.45, 0.35, 0.92, 0.78, 0.35, 0.12,
        "THERMAL_STRESS", 0.940, 88
    ))
    cursor.executemany("""
    INSERT INTO telemetry (
        hive_id, timestamp, epoch_sec, presence_mask, brood_core_temp,
        frame_t1, frame_t2, frame_t3, frame_t4, frame_t5,
        humidity, voc_gas_res, co2_ppm, weight_kg, lux, tilt_deg,
        fft_b1, fft_b2, fft_b3, fft_b4, fft_b5, fft_b6, fft_b7, fft_b8,
        ai_diagnosis, ai_confidence, battery_soc
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    """, telemetry_rows)

    # Anomaly Alert for Hive 3
    cursor.execute("""
    INSERT INTO alerts (hive_id, timestamp, epoch_sec, alert_type, severity, message, confidence, resolved)
    VALUES (?, ?, ?, ?, ?, ?, ?, 0);
    """, (
        3, now_iso, now_epoch, "THERMAL_STRESS", "WARNING",
        "Brood core temp elevated to 37.6°C with acoustic spectral shift (380-450Hz pre-swarm signature). Recommended: Inspect ventilation and super space.",
        0.940
    ))

    # 7. Harvest Records
    print("[SEED] Recording 2 Real Honey Harvests...")
    harvest_1_id = "HARV-2026-NIL-001"
    harvest_2_id = "HARV-2026-GIR-002"

    cursor.execute("""
    INSERT INTO harvests (id, hive_id, apiary_id, beekeeper_id, harvest_date, quantity_kg, field_moisture_pct, floral_source, notes, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    """, (
        harvest_1_id, 1, "apiary-nilgiris-01", "BEE-KVIC-001", t_minus_20d,
        45.0, 17.6, "Nilgiris High-Altitude Wild Flora", "Post-monsoon wild bloom harvest. Fully capped honeycombs.", t_minus_20d
    ))

    cursor.execute("""
    INSERT INTO harvests (id, hive_id, apiary_id, beekeeper_id, harvest_date, quantity_kg, field_moisture_pct, floral_source, notes, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    """, (
        harvest_2_id, 6, "apiary-gir-01", "BEE-KVIC-003", t_minus_10d,
        62.5, 18.1, "Saurashtra Jamun & Forest Mustard", "Early summer harvest from buffer zone. Deep purple tint.", t_minus_10d
    ))

    # 8. Honey Batches
    print("[SEED] Creating 2 Honey Batches...")
    batch_1_id = "HC-BATCH-2026-NIL-001"
    batch_2_id = "HC-BATCH-2026-GIR-002"

    cursor.execute("""
    INSERT INTO honey_batches (id, batch_code, cluster_id, beekeeper_id, apiary_id, harvest_id, weight_kg, floral_source, status, curing_days, created_at, finalized_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    """, (
        batch_1_id, "BATCH-2026-NIL-001", "cluster-nilgiris", "BEE-KVIC-001", "apiary-nilgiris-01",
        harvest_1_id, 45.0, "Nilgiris High-Altitude Wild Flora", "PACKAGED", 21, t_minus_20d, t_minus_5d
    ))

    cursor.execute("""
    INSERT INTO honey_batches (id, batch_code, cluster_id, beekeeper_id, apiary_id, harvest_id, weight_kg, floral_source, status, curing_days, created_at, finalized_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    """, (
        batch_2_id, "BATCH-2026-GIR-002", "cluster-gir", "BEE-KVIC-003", "apiary-gir-01",
        harvest_2_id, 62.5, "Saurashtra Jamun & Forest Mustard", "QUALITY_VERIFIED", 21, t_minus_10d, None
    ))
    conn.commit()

    # 9. Cryptographic Ledger Events for Batch 1 & Batch 2
    print("[SEED] Mining Cryptographic Ledger Events into Immutable Chain...")
    
    # Event 1: Batch 1 Harvest & Creation
    HoneyChainLedger.create_event(
        batch_id=batch_1_id,
        event_type="BATCH_CREATED",
        actor_id="BEE-KVIC-001",
        actor_role="BEEKEEPER",
        payload={
            "harvest_id": harvest_1_id,
            "hive_id": 1,
            "weight_kg": 45.0,
            "floral_source": "Nilgiris High-Altitude Wild Flora",
            "cluster": "cluster-nilgiris",
            "field_moisture_pct": 17.6
        }
    )

    # Event 2: Batch 1 Quality Testing
    qtest_1_id = f"QTEST-{uuid.uuid4().hex[:8].upper()}"
    cursor.execute("""
    INSERT INTO quality_tests (
        id, batch_id, lab_name, tested_at, moisture_pct, hmf_mg_kg, diastase_number,
        electrical_conductivity, c4_sugar_pct, c3_sugar_pct, adulteration_result, status, certificate_hash, notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    """, (
        qtest_1_id, batch_1_id, "KVIC Honey Testing & Quality Analysis Center, Pune", t_minus_14d,
        17.1, 11.2, 14.8, 0.52, 0.0, 0.0, "PURE_AUTHENTIC", "PASS",
        "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        "Passed all FSSAI & KVIC Export Standards. Zero C4/C3 exogenous adulteration detected."
    ))
    conn.commit()

    HoneyChainLedger.create_event(
        batch_id=batch_1_id,
        event_type="QUALITY_VERIFIED",
        actor_id="LAB-KVIC-PUNE-01",
        actor_role="QUALITY_LAB",
        payload={
            "quality_test_id": qtest_1_id,
            "lab": "KVIC Honey Testing & Quality Analysis Center, Pune",
            "moisture_pct": 17.1,
            "hmf_mg_kg": 11.2,
            "diastase_number": 14.8,
            "status": "PASS",
            "adulteration": "PURE_AUTHENTIC"
        }
    )

    # Event 3: Batch 1 Processing
    proc_1_id = f"PROC-{uuid.uuid4().hex[:8].upper()}"
    cursor.execute("""
    INSERT INTO processing_events (
        id, batch_id, facility_name, operator_id, started_at, completed_at,
        filtering_temp_c, settling_hours, moisture_reduction_pct, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    """, (
        proc_1_id, batch_1_id, "Nilgiris Tribal Apiculture Processing Co-operative", "OP-NIL-42",
        t_minus_10d, t_minus_7d, 38.5, 48.0, 0.5, "COMPLETED"
    ))
    conn.commit()

    HoneyChainLedger.create_event(
        batch_id=batch_1_id,
        event_type="PROCESSING_COMPLETED",
        actor_id="OP-NIL-42",
        actor_role="PROCESSOR",
        payload={
            "processing_id": proc_1_id,
            "facility": "Nilgiris Tribal Apiculture Processing Co-operative",
            "filtering_temp_c": 38.5,
            "settling_hours": 48.0,
            "status": "COMPLETED"
        }
    )

    # Event 4: Batch 1 Packaging Lot & QR Codes
    lot_1_id = f"LOT-{uuid.uuid4().hex[:8].upper()}"
    cursor.execute("""
    INSERT INTO packaging_lots (
        id, batch_id, lot_number, jar_size_g, total_units, packaged_at, expiry_date, facility_location
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    """, (
        lot_1_id, batch_1_id, "LOT-2026-NIL-500G", 500, 90, t_minus_5d,
        (now + timedelta(days=730)).isoformat()[:10], "Nilgiris Packaging Facility, Coonoor"
    ))
    conn.commit()

    # Deterministic retail package codes for demo
    canonical_codes = [
        "HC-PKG-A7F93E12", # Primary verified authentic package
        "HC-PKG-B8C24D91", # Suspicious QR reuse detection package
        "HC-PKG-C3D45E67",
        "HC-PKG-D4E56F78",
        "HC-PKG-E5F67089"
    ]
    for idx, code in enumerate(canonical_codes, start=1):
        pkg_id = f"pkg-{code.lower()}"
        cursor.execute("""
        INSERT INTO packages (id, package_code, lot_id, batch_id, unit_index, qr_token, status, issued_at)
        VALUES (?, ?, ?, ?, ?, ?, 'ACTIVE', ?);
        """, (pkg_id, code, lot_1_id, batch_1_id, idx, f"TOKEN-{uuid.uuid4().hex[:12].upper()}", t_minus_5d))
    conn.commit()

    HoneyChainLedger.create_event(
        batch_id=batch_1_id,
        event_type="PACKAGED",
        actor_id="OP-NIL-42",
        actor_role="PROCESSOR",
        payload={
            "lot_id": lot_1_id,
            "jar_size_g": 500,
            "units": 90,
            "lot_number": "LOT-2026-NIL-500G"
        }
    )

    HoneyChainLedger.create_event(
        batch_id=batch_1_id,
        event_type="QR_ISSUED",
        actor_id="KVIC-TRACE-SYSTEM",
        actor_role="SYSTEM",
        payload={
            "lot_id": lot_1_id,
            "sample_package_code": "HC-PKG-A7F93E12",
            "total_issued": 90,
            "cryptographic_verification_url": "/verify/HC-PKG-A7F93E12"
        }
    )

    # Ledger Events for Batch 2 (Creation + Quality Verified)
    HoneyChainLedger.create_event(
        batch_id=batch_2_id,
        event_type="BATCH_CREATED",
        actor_id="BEE-KVIC-003",
        actor_role="BEEKEEPER",
        payload={
            "harvest_id": harvest_2_id,
            "hive_id": 6,
            "weight_kg": 62.5,
            "floral_source": "Saurashtra Jamun & Forest Mustard",
            "cluster": "cluster-gir"
        }
    )

    qtest_2_id = f"QTEST-{uuid.uuid4().hex[:8].upper()}"
    cursor.execute("""
    INSERT INTO quality_tests (
        id, batch_id, lab_name, tested_at, moisture_pct, hmf_mg_kg, diastase_number,
        electrical_conductivity, c4_sugar_pct, c3_sugar_pct, adulteration_result, status, certificate_hash, notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    """, (
        qtest_2_id, batch_2_id, "Regional Agmark QA Analytical Center, Rajkot", t_minus_5d,
        17.9, 14.2, 12.1, 0.48, 0.0, 0.0, "PURE_AUTHENTIC", "PASS",
        "d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592",
        "Certified Grade A Jamun flora. High diastase activity."
    ))
    conn.commit()

    HoneyChainLedger.create_event(
        batch_id=batch_2_id,
        event_type="QUALITY_VERIFIED",
        actor_id="LAB-AGMARK-RJK-02",
        actor_role="QUALITY_LAB",
        payload={
            "quality_test_id": qtest_2_id,
            "lab": "Regional Agmark QA Analytical Center, Rajkot",
            "moisture_pct": 17.9,
            "status": "PASS"
        }
    )

    # 10. QR Anomaly Scans (Demonstrating Suspicious QR Reuse Detection)
    print("[SEED] Simulating QR Verification Scans & Counterfeit Reuse Anomaly...")
    # Legitimate scan for Package 1 in Chennai
    cursor.execute("""
    INSERT INTO qr_scans (package_code, scanned_at, ip_address, location_city, user_agent, scan_count, anomaly_flag)
    VALUES (?, ?, ?, ?, ?, ?, ?);
    """, (
        "HC-PKG-A7F93E12", t_minus_2d, "103.24.12.8", "Chennai, India", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4)", 1, "NORMAL"
    ))

    # Legitimate second scan in Chennai retail shop
    cursor.execute("""
    INSERT INTO qr_scans (package_code, scanned_at, ip_address, location_city, user_agent, scan_count, anomaly_flag)
    VALUES (?, ?, ?, ?, ?, ?, ?);
    """, (
        "HC-PKG-A7F93E12", t_minus_2d, "103.24.12.8", "Chennai, India", "Mozilla/5.0 (Android 14; Mobile)", 2, "NORMAL"
    ))

    # Anomaly scans for Package 2 (Counterfeit reuse detected: Mumbai, then Delhi 4 mins later, then Bengaluru 6 mins later)
    t_anomaly_1 = (now - timedelta(minutes=45)).isoformat()
    t_anomaly_2 = (now - timedelta(minutes=38)).isoformat()
    t_anomaly_3 = (now - timedelta(minutes=15)).isoformat()

    cursor.execute("""
    INSERT INTO qr_scans (package_code, scanned_at, ip_address, location_city, user_agent, scan_count, anomaly_flag)
    VALUES (?, ?, ?, ?, ?, ?, ?);
    """, ("HC-PKG-B8C24D91", t_anomaly_1, "49.36.18.99", "Mumbai, India", "Mozilla/5.0 (Android)", 1, "NORMAL"))

    cursor.execute("""
    INSERT INTO qr_scans (package_code, scanned_at, ip_address, location_city, user_agent, scan_count, anomaly_flag)
    VALUES (?, ?, ?, ?, ?, ?, ?);
    """, ("HC-PKG-B8C24D91", t_anomaly_2, "122.161.42.15", "New Delhi, India", "Mozilla/5.0 (Windows NT 10.0)", 2, "REUSE_DETECTED"))

    cursor.execute("""
    INSERT INTO qr_scans (package_code, scanned_at, ip_address, location_city, user_agent, scan_count, anomaly_flag)
    VALUES (?, ?, ?, ?, ?, ?, ?);
    """, ("HC-PKG-B8C24D91", t_anomaly_3, "157.48.91.204", "Bengaluru, India", "Mozilla/5.0 (iPhone)", 3, "EXCESSIVE_SCANS"))

    # 11. Market Orders
    print("[SEED] Populating Verified Honey Market Orders...")
    cursor.execute("""
    INSERT INTO market_orders (id, batch_id, seller_id, buyer_name, quantity_kg, price_per_kg, total_amount, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    """, (
        f"ORD-{uuid.uuid4().hex[:8].upper()}", batch_1_id, "BEE-KVIC-001",
        "Khadi India Flagship Store, Connaught Place, New Delhi",
        25.0, 750.0, 18750.0, "DELIVERED", t_minus_2d
    ))

    cursor.execute("""
    INSERT INTO market_orders (id, batch_id, seller_id, buyer_name, quantity_kg, price_per_kg, total_amount, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    """, (
        f"ORD-{uuid.uuid4().hex[:8].upper()}", batch_2_id, "BEE-KVIC-003",
        "Organic Farm Direct & Co-op, Ahmedabad",
        40.0, 680.0, 27200.0, "ORDERED", now_iso
    ))

    conn.commit()
    conn.close()

    # Final Verification of seeded cryptographic chain
    ledger_verification = HoneyChainLedger.verify_chain()
    print(f"[SEED] Cryptographic Chain Verification: Intact={ledger_verification['chain_intact']}, Total Events={ledger_verification['events']}")
    print("[SEED] Successfully seeded all 16 Honey Chain SIH 26021 entities!")
    print("Demo Verified Package: HC-PKG-A7F93E12")
    print("Demo Counterfeit-Flagged Package: HC-PKG-B8C24D91")

if __name__ == "__main__":
    seed_demo_data()
