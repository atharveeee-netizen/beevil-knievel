"""Independent gateway ingestion benchmark: 100 hives x R rounds, sequential HTTP over loopback."""
import sys, time, json, statistics, random, http.client
sys.path.insert(0, sys.argv[1] + "/tests")
from simulate_100_hives import generate_hive_packet

random.seed(7)
ROUNDS = int(sys.argv[2]) if len(sys.argv) > 2 else 10
conn = http.client.HTTPConnection("127.0.0.1", 8000, timeout=10)
lat = []
diag_special = {}
t_all = time.perf_counter()
for r in range(ROUNDS):
    for h in range(1, 101):
        pkt = generate_hive_packet(h, 12.0)
        body = json.dumps(pkt)
        t0 = time.perf_counter()
        conn.request("POST", "/api/v1/telemetry", body, {"Content-Type": "application/json"})
        resp = conn.getresponse(); data = json.loads(resp.read())
        lat.append((time.perf_counter() - t0) * 1000)
        if h in (12, 45, 88):
            diag_special.setdefault(h, set()).add(data.get("diagnosis"))
        elif r == 0:
            diag_special.setdefault("others", set()).add(data.get("diagnosis"))
total = time.perf_counter() - t_all
lat.sort()
res = {
    "packets": len(lat), "wall_s": round(total, 3),
    "throughput_pps": round(len(lat) / total, 2),
    "lat_mean_ms": round(statistics.mean(lat), 2),
    "lat_p50_ms": round(lat[len(lat)//2], 2),
    "lat_p95_ms": round(lat[int(0.95*len(lat))], 2),
    "lat_p99_ms": round(lat[int(0.99*len(lat))], 2),
    "diagnoses": {str(k): sorted(v) for k, v in diag_special.items()},
}
print(json.dumps(res, indent=1))
json.dump(res, open(sys.argv[3], "w"), indent=1)
