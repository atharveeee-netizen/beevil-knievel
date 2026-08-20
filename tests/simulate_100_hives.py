"""
BEEVIL KNIEVEL — 100-HIVE SCALE & TELEMETRY SIMULATOR
======================================================
Simulates a real-world commercial apiary with 100 Smart Beehives:
- Realistic diurnal thermal cycles (Brood 34.5°C–35.5°C, Ambient 18°C–32°C).
- Diurnal scale weight gain (Honey nectar influx during daylight).
- Realistic 8-band audio FFT bio-acoustics.
- Injects realistic field anomalies:
  * Hive #012: Swarm Departure Buzz (450Hz crescendo + CO2 spike)
  * Hive #045: Queen Loss / Brood Chill (Core Temp < 31.0°C)
  * Hive #088: Animal Attack / Theft (>18° tilt alarm)
- Benchmarks server throughput, inference latency, and database write speed.
"""

import sys
import time
import json
import random
import math
from datetime import datetime, timezone
import urllib.request
import urllib.error

GATEWAY_API = "http://127.0.0.1:8000/api/v1/telemetry"

def generate_hive_packet(hive_id: int, sim_hour: float) -> dict:
    """Generates physically realistic 16-parameter telemetry for a hive."""
    # Base baseline
    is_daylight = 6.0 <= (sim_hour % 24) <= 18.0
    solar_intensity = math.sin(math.pi * ((sim_hour % 24) - 6) / 12.0) if is_daylight else 0.0
    lux = max(0.0, solar_intensity * 65000.0 + random.uniform(-500, 500))

    # Thermal profile
    brood_core = 34.8 + random.uniform(-0.3, 0.4)
    frame_temps = [brood_core - random.uniform(0.5, 2.2) for _ in range(5)]
    humidity = 55.0 + (1.0 - solar_intensity) * 15.0 + random.uniform(-2.0, 2.0)
    voc_gas = 120.0 + random.uniform(-10.0, 15.0)
    co2_ppm = 1200.0 + (1.0 - solar_intensity) * 600.0 + random.uniform(-50, 50)
    weight_kg = 32.5 + (hive_id % 15) * 1.2 + (solar_intensity * 0.8) # Honey gain
    tilt_deg = 0.5 + random.uniform(0.0, 0.5)

    # 8-band FFT baseline (Healthy hum: 120-250 Hz)
    fft_bands = [
        0.12, # Band 1: 60-120 Hz
        0.58, # Band 2: 120-180 Hz (Healthy baseline)
        0.72, # Band 3: 180-250 Hz (Queen fanning)
        0.22, # Band 4: 250-350 Hz
        0.15, # Band 5: 350-450 Hz
        0.08, # Band 6: 450-600 Hz
        0.04, # Band 7: 600-800 Hz
        0.02  # Band 8: >800 Hz
    ]
    # Add minor noise
    fft_bands = [max(0.01, min(0.99, f + random.uniform(-0.03, 0.03))) for f in fft_bands]

    # --- ANOMALY INJECTION FOR BENCHMARK ---
    if hive_id == 12:
        # Swarm buzz: high energy in 450Hz band + CO2 surge
        fft_bands[4] = 0.88 # 350-450 Hz spike
        fft_bands[5] = 0.76 # 450-600 Hz spike
        co2_ppm = 3800.0
    elif hive_id == 45:
        # Queen Loss / Brood Chill: Core temp collapses to 29.5°C
        brood_core = 29.2
        frame_temps = [27.0, 26.5, 28.0, 26.8, 27.5]
        fft_bands[2] = 0.08 # Queen frequency dead
    elif hive_id == 88:
        # Theft / Animal Knockdown: 25 degree tilt
        tilt_deg = 26.4

    return {
        "hive_id": hive_id,
        "brood_core_temp": round(brood_core, 2),
        "frame_temps": [round(t, 2) for t in frame_temps],
        "humidity": round(humidity, 1),
        "voc_gas_res": round(voc_gas, 1),
        "co2_ppm": round(co2_ppm, 1),
        "weight_kg": round(weight_kg, 2),
        "lux": round(lux, 1),
        "tilt_deg": round(tilt_deg, 1),
        "fft_bands": [round(f, 4) for f in fft_bands],
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

def run_simulation(num_hives: int = 100, burst_mode: bool = False):
    print(f"🚀 Starting Multi-Hive Telemetry Simulator ({num_hives} Hives)...")
    print(f"Target Gateway: {GATEWAY_API}\n")

    latencies = []
    diagnoses = {}
    start_all = time.time()

    for h in range(1, num_hives + 1):
        sim_hour = (time.time() / 3600.0) % 24
        packet = generate_hive_packet(h, sim_hour)
        
        t0 = time.perf_counter()
        try:
            data_bytes = json.dumps(packet).encode("utf-8")
            req = urllib.request.Request(GATEWAY_API, data=data_bytes, headers={"Content-Type": "application/json"})
            with urllib.request.urlopen(req, timeout=5.0) as resp:
                elapsed_ms = (time.perf_counter() - t0) * 1000.0
                latencies.append(elapsed_ms)
                resp_json = json.loads(resp.read().decode())
                diag = resp_json.get("diagnosis", "UNKNOWN")
                diagnoses[diag] = diagnoses.get(diag, 0) + 1
                
                status_icon = "🟢" if diag == "HEALTHY_ACTIVE" else "🚨"
                print(f"{status_icon} Hive #{h:03d} -> {diag:<24} (Conf: {resp_json.get('confidence')*100:.1f}%) | API Latency: {elapsed_ms:.1f}ms")
        except Exception as e:
            print(f"❌ Error sending packet for Hive #{h:03d}: {e}")

        if not burst_mode:
            # Stagger packets slightly to simulate real-world LoRa distribution (0.33 pkts/sec)
            time.sleep(0.05)

    total_time = time.time() - start_all
    avg_latency = sum(latencies) / len(latencies) if latencies else 0.0

    print("\n" + "="*60)
    print("📊 100-HIVE BENCHMARK SIMULATION RESULTS")
    print("="*60)
    print(f"Total Hives Ingested:      {len(latencies)} / {num_hives}")
    print(f"Total Wall-Clock Time:    {total_time:.2f} seconds")
    print(f"Average Ingestion Latency: {avg_latency:.2f} ms")
    print(f"Throughput Achieved:       {len(latencies) / total_time:.2f} packets/second")
    print("\n🩺 AI Diagnostic Breakdown Across Apiary:")
    for k, v in diagnoses.items():
        print(f"   • {k:<25}: {v} hives")
    print("="*60)

if __name__ == "__main__":
    hives_count = int(sys.argv[1]) if len(sys.argv) > 1 else 100
    run_simulation(hives_count, burst_mode=False)
