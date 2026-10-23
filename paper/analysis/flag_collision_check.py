"""Cross-tier check: alert flags OR-ed into the tilt byte (firmware) vs gateway parsing/validation."""
import sys, os, struct, json, tempfile
R = sys.argv[1]; sys.path.insert(0, R)
os.environ["BEEVIL_DB_PATH"] = os.path.join(tempfile.mkdtemp(), "flag.db")
from fastapi.testclient import TestClient
from gateway.server import app, init_database
from gateway.lora_receiver import unpack_lora_payload, PAYLOAD_FORMAT
init_database()
def frame(tilt_byte):
    return struct.pack(PAYLOAD_FORMAT, 7, 3482, 3420, 3415, 3430, 3390, 3405, 5840, 1425, 1150, 3420, 4500,
                       tilt_byte, 10, 20, 150, 80, 30, 15, 5, 2)
cases = {"nominal tilt=1": 1, "low-SoC flag (0x20|1)": 0x20 | 1, "CUSUM flag (0x80|1)": 0x80 | 1,
         "pre-swarm flag (0x40)": 0x40, "true 20-deg tilt": 20}
out = {}
with TestClient(app) as c:
    for name, tb in cases.items():
        d = unpack_lora_payload(frame(tb))
        r = c.post("/api/v1/telemetry", json=d)
        out[name] = {"tilt_byte": tb, "parsed_tilt_deg": d["tilt_deg"], "http": r.status_code,
                     "diagnosis": r.json().get("diagnosis") if r.status_code == 200 else None}
print(json.dumps(out, indent=1))
json.dump(out, open(sys.argv[2], "w"), indent=1)
