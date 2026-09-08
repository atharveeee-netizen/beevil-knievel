#!/usr/bin/env python3
"""
===============================================================================
BEEVIL KNIEVEL — SERIAL TELEMETRY LOGGER & HARDWARE PIPELINE
===============================================================================
Standard: IEEE HARDWAIre Phase 2 Bench Bring-Up
Purpose:
  Connects to USB CDC serial port on the RAK4631 / Nordic nRF52840 prototype,
  captures raw serial output, parses machine-readable JSONL / CSV telemetry,
  logs to disk with microsecond provenance timestamps, and handles reconnects.

TRUTH RULE:
  Never modifies sensor measurements. Unconnected sensors are preserved as
  null / NOT_CONNECTED. Bench simulated frames are explicitly labeled SIMULATED.
===============================================================================
"""

import os
import sys
import time
import json
import csv
import argparse
from datetime import datetime, timezone
from typing import Optional, Dict, Any

try:
    import serial
    import serial.tools.list_ports
    HAS_PYSERIAL = True
except ImportError:
    HAS_PYSERIAL = False


def detect_serial_ports():
    """List available COM / tty ports on the system."""
    if not HAS_PYSERIAL:
        print("[WARN] pyserial is not installed. Port enumeration unavailable.")
        return []
    ports = list(serial.tools.list_ports.comports())
    return ports


def find_target_port(preferred_port: Optional[str] = None) -> Optional[str]:
    """Auto-detect RAK4631 / nRF52840 USB CDC or pick available COM port."""
    ports = detect_serial_ports()
    if not ports:
        print("[INFO] No serial COM ports detected on host system.")
        return None

    print("\nAvailable Serial Ports:")
    for p in ports:
        print(f"  - {p.device}: {p.description} [{p.hwid}]")

    if preferred_port:
        for p in ports:
            if p.device.upper() == preferred_port.upper():
                return p.device
        print(f"[WARN] Preferred port {preferred_port} not found in active devices.")

    # Target heuristics: RAK, Nordic, WisBlock, USB Serial, J-Link
    keywords = ["RAK", "NORDIC", "WISBLOCK", "USB SERIAL", "CP210", "CH340", "FTDI"]
    for p in ports:
        desc_upper = (p.description or "").upper() + " " + (p.hwid or "").upper()
        if any(k in desc_upper for k in keywords):
            print(f"[AUTO-DETECT] Selecting target board on {p.device} ({p.description})")
            return p.device

    # Fallback to first non-standard port or first port
    return ports[0].device


class SerialTelemetryLogger:
    """Manages serial connection, logging, and telemetry parsing."""

    CSV_HEADERS = [
        "host_timestamp_utc",
        "packet",
        "uptime_ms",
        "source",
        "die_temp_c",
        "vbat_mv",
        "soc_pct",
        "cusum_drift",
        "tmp117_c",
        "co2_ppm",
        "humidity_pct",
        "voc_kohm",
        "weight_kg",
        "lux",
        "presence_mask",
        "status"
    ]

    def __init__(self, port: Optional[str], baudrate: int = 115200,
                 output_dir: str = "logs", timeout: float = 1.0,
                 sim_mode: bool = False):
        self.port = port
        self.baudrate = baudrate
        self.output_dir = output_dir
        self.timeout = timeout
        self.sim_mode = sim_mode
        self.ser = None
        self.running = False

        os.makedirs(self.output_dir, exist_ok=True)
        session_id = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
        self.raw_log_path = os.path.join(self.output_dir, f"raw_serial_{session_id}.log")
        self.jsonl_path = os.path.join(self.output_dir, f"telemetry_{session_id}.jsonl")
        self.csv_path = os.path.join(self.output_dir, f"telemetry_{session_id}.csv")

        # Initialize CSV
        with open(self.csv_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(self.CSV_HEADERS)

    def connect(self) -> bool:
        """Establish connection with retry."""
        if self.sim_mode:
            print(f"[SIMULATION] Running in SIMULATED bench test mode (no physical COM port).")
            return True

        if not self.port:
            print("[ERROR] No serial port specified or detected.")
            return False

        try:
            print(f"[CONNECTING] Opening {self.port} at {self.baudrate} baud...")
            self.ser = serial.Serial(self.port, self.baudrate, timeout=self.timeout)
            time.sleep(1.0)  # Settle time
            # Send wake-up BOOT banner request
            self.ser.write(b"BOOT\n")
            self.ser.flush()
            print(f"[CONNECTED] Port {self.port} is open and active.")
            return True
        except Exception as e:
            print(f"[ERROR] Failed to connect to {self.port}: {e}")
            return False

    def parse_line(self, line: str) -> Optional[Dict[str, Any]]:
        """Parse raw line into telemetry record if valid JSON."""
        line = line.strip()
        if not line:
            return None

        # Check if line is JSON
        if line.startswith("{") and line.endswith("}"):
            try:
                record = json.loads(line)
                record["host_timestamp_utc"] = datetime.now(timezone.utc).isoformat()
                return record
            except json.JSONDecodeError:
                pass
        return None

    def log_record(self, record: Dict[str, Any]):
        """Persist record to JSONL and CSV."""
        # 1. JSON Lines
        with open(self.jsonl_path, "a", encoding="utf-8") as f:
            f.write(json.dumps(record) + "\n")

        # 2. CSV
        row = [
            record.get("host_timestamp_utc", ""),
            record.get("packet", ""),
            record.get("uptime_ms", ""),
            record.get("source", "UNKNOWN"),
            record.get("die_temp_c", ""),
            record.get("vbat_mv", ""),
            record.get("soc_pct", ""),
            record.get("cusum_drift", ""),
            record.get("tmp117_c", "null"),
            record.get("co2_ppm", "null"),
            record.get("humidity_pct", "null"),
            record.get("voc_kohm", "null"),
            record.get("weight_kg", "null"),
            record.get("lux", "null"),
            hex(record.get("presence_mask", 0)) if isinstance(record.get("presence_mask"), int) else record.get("presence_mask", ""),
            record.get("status", "")
        ]
        with open(self.csv_path, "a", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(row)

    def run_simulated_stream(self, duration: Optional[float] = None):
        """Generate verified simulated bench telemetry frames with explicit SIMULATED provenance."""
        print(f"[LOGGER] Starting SIMULATED bench test data stream...")
        packet = 0
        t0 = time.time()
        with open(self.raw_log_path, "a", encoding="utf-8") as raw_f:
            while self.running:
                packet += 1
                now_ms = int((time.time() - t0) * 1000)
                # Simulated hardware frame
                sim_record = {
                    "packet": packet,
                    "uptime_ms": now_ms,
                    "source": "SIMULATED_BENCH_TEST",
                    "die_temp_c": round(25.4 + (packet % 5) * 0.1, 2),
                    "vbat_mv": 3980,
                    "soc_pct": 82.5,
                    "cusum_drift": 0.000,
                    "tmp117_c": None,
                    "co2_ppm": None,
                    "humidity_pct": None,
                    "voc_kohm": None,
                    "weight_kg": None,
                    "lux": None,
                    "presence_mask": 0x0000,
                    "status": "SIMULATED_NOT_CONNECTED",
                    "host_timestamp_utc": datetime.now(timezone.utc).isoformat()
                }
                line = json.dumps(sim_record)
                raw_f.write(line + "\n")
                raw_f.flush()

                self.log_record(sim_record)
                print(f"[PKT #{packet}] SIMULATED DieTemp={sim_record['die_temp_c']}C | VBat={sim_record['vbat_mv']}mV | SoC={sim_record['soc_pct']}% | Status={sim_record['status']}")

                if duration and (time.time() - t0) >= duration:
                    break
                time.sleep(1.0)

    def run(self, duration: Optional[float] = None):
        """Main acquisition loop."""
        self.running = True
        if self.sim_mode:
            self.run_simulated_stream(duration)
            return

        if not self.ser or not self.ser.is_open:
            if not self.connect():
                print("[ERROR] Cannot start acquisition loop without open connection.")
                return

        print(f"[LOGGER] Telemetry logging active.")
        print(f"  - Raw Serial: {self.raw_log_path}")
        print(f"  - JSON Lines: {self.jsonl_path}")
        print(f"  - Tabular CSV: {self.csv_path}")

        t0 = time.time()
        raw_f = open(self.raw_log_path, "a", encoding="utf-8")

        try:
            while self.running:
                try:
                    if self.ser.in_waiting > 0:
                        raw_bytes = self.ser.readline()
                        line = raw_bytes.decode("utf-8", errors="replace").rstrip()
                        raw_f.write(line + "\n")
                        raw_f.flush()

                        # Check if line is telemetry
                        record = self.parse_line(line)
                        if record:
                            self.log_record(record)
                            print(f"[TELEMETRY #{record.get('packet', '?')}] DieTemp={record.get('die_temp_c')}C | VBat={record.get('vbat_mv')}mV | SoC={record.get('soc_pct')}% | Presence=0x{record.get('presence_mask', 0):04X}")
                        else:
                            # Echo raw line
                            print(f"[SERIAL] {line}")
                    else:
                        time.sleep(0.01)

                    if duration and (time.time() - t0) >= duration:
                        print(f"[INFO] Duration limit of {duration}s reached.")
                        break

                except (serial.SerialException, OSError) as e:
                    print(f"[WARN] Serial port error: {e}. Attempting reconnect...")
                    self.ser.close()
                    time.sleep(2.0)
                    self.connect()

        except KeyboardInterrupt:
            print("\n[INFO] Data logging stopped by user.")
        finally:
            self.running = False
            raw_f.close()
            if self.ser and self.ser.is_open:
                self.ser.close()
            print("[INFO] Serial connection closed cleanly.")


def main():
    parser = argparse.ArgumentParser(description="Beevil Knievel Serial Telemetry Logger")
    parser.add_argument("--port", type=str, default=None, help="Target COM port (e.g. COM3, COM4, /dev/ttyUSB0)")
    parser.add_argument("--baud", type=int, default=115200, help="Baud rate (default 115200)")
    parser.add_argument("--dir", type=str, default="logs", help="Output directory for log files")
    parser.add_argument("--duration", type=float, default=None, help="Duration to run in seconds")
    parser.add_argument("--sim", action="store_true", help="Run in simulation mode (explicitly tagged SIMULATED)")
    args = parser.parse_args()

    port = args.port
    if not args.sim and not port:
        port = find_target_port()

    logger = SerialTelemetryLogger(
        port=port,
        baudrate=args.baud,
        output_dir=args.dir,
        sim_mode=args.sim or (port is None and not args.port)
    )

    logger.run(duration=args.duration)


if __name__ == "__main__":
    main()
