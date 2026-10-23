"""
BEEVIL KNIEVEL - LORAWAN / LORA UART PACKET RECEIVER DAEMON
===========================================================
Linux background daemon for Raspberry Pi 3B+ + Waveshare SX1262 LoRa HAT (Ebyte E22-900T22S).
- Interfaces with Semtech SX1262 via UART (/dev/ttyAMA0, /dev/ttyS0, /dev/ttyUSB0).
- Operates on 865.0625 MHz (India WPC De-licensed Band).
- Unpacks both canonical 36-byte (v2) and legacy 33-byte (v1) binary payloads.
- Dispatches parsed telemetry directly into the local FastAPI Edge Gateway.
"""

import sys
import time
import struct
import json
import logging
from typing import Dict, Any, Optional
import urllib.request
import urllib.error

# Import canonical spec
from gateway.beevil_spec import (
    PAYLOAD_V1_FORMAT,
    PAYLOAD_V1_SIZE,
    PAYLOAD_V2_FORMAT,
    PAYLOAD_V2_SIZE,
    unpack_payload,
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] [LoRa-RX] %(message)s"
)
logger = logging.getLogger("BeevilLoRa")

GATEWAY_API_URL = "http://127.0.0.1:8000/api/v1/telemetry"

# Retain backward-compatible references
PAYLOAD_FORMAT = PAYLOAD_V1_FORMAT
PAYLOAD_SIZE = PAYLOAD_V1_SIZE


def unpack_lora_payload(raw_bytes: bytes) -> Optional[Dict[str, Any]]:
    """Unpacks binary radio packet (36-byte v2 or 33-byte v1) into JSON telemetry dict."""
    if len(raw_bytes) != PAYLOAD_V1_SIZE and len(raw_bytes) != PAYLOAD_V2_SIZE:
        logger.warning(f"Invalid packet size: expected {PAYLOAD_V2_SIZE} or {PAYLOAD_V1_SIZE} bytes, got {len(raw_bytes)}")
        return None

    parsed = unpack_payload(raw_bytes)
    if parsed is None:
        return None

    # Format fields for API ingestion
    core_temp = parsed["brood_core_temp"] if parsed["brood_core_temp"] is not None else 34.5
    frame_temps = [t if t is not None else 34.0 for t in parsed["frame_temps"]]
    humidity = parsed["humidity"] if parsed["humidity"] is not None else 50.0
    voc_gas = parsed["voc_gas"] if parsed["voc_gas"] is not None else 100.0
    co2_ppm = parsed["co2_ppm"] if parsed["co2_ppm"] is not None else 800.0
    weight_kg = parsed["weight_kg"] if parsed["weight_kg"] is not None else 25.0
    lux = parsed["lux"] if parsed["lux"] is not None else 1000.0
    tilt_deg = parsed["tilt_deg"] if parsed["tilt_deg"] is not None else 0.0
    fft_bands = [b / 255.0 for b in parsed["fft_bands"]]

    return {
        "hive_id": parsed["hive_id"],
        "seq": parsed.get("seq", 0),
        "version": parsed.get("version", 2),
        "flags": parsed.get("flags", 0),
        "brood_core_temp": round(core_temp, 2),
        "frame_temps": [round(t, 2) for t in frame_temps],
        "humidity": round(humidity, 1),
        "voc_gas_res": round(voc_gas, 1),
        "co2_ppm": co2_ppm,
        "weight_kg": round(weight_kg, 2),
        "lux": lux,
        "tilt_deg": tilt_deg,
        "fft_bands": [round(f, 4) for f in fft_bands]
    }


def forward_to_gateway_api(payload_dict: Dict[str, Any]) -> bool:
    """HTTP POST to local FastAPI server."""
    try:
        data_json = json.dumps(payload_dict).encode("utf-8")
        req = urllib.request.Request(
            GATEWAY_API_URL,
            data=data_json,
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req, timeout=3.0) as resp:
            if resp.status == 200:
                resp_data = json.loads(resp.read().decode())
                logger.info(f"⚡ Hive #{payload_dict['hive_id']:03d} -> AI: {resp_data.get('diagnosis')} ({resp_data.get('confidence')*100:.1f}%) in {resp_data.get('inference_ms')}ms")
                return True
    except urllib.error.URLError as e:
        logger.error(f"Failed to post to local Gateway API: {e}")
    except Exception as e:
        logger.error(f"Unexpected error forwarding packet: {e}")
    return False


def run_lora_listener(serial_port: Optional[str] = None, baudrate: int = 9600):
    """Main daemon loop supporting UART reception for Waveshare SX1262 HAT (Ebyte E22 module)."""
    logger.info("📡 Starting Semtech SX1262 LoRa UART Packet Listener (865.0625 MHz)...")
    logger.info(f"Supported Frame Sizes: v2={PAYLOAD_V2_SIZE} bytes (canonical), v1={PAYLOAD_V1_SIZE} bytes (legacy)")

    ser = None
    ports_to_try = [serial_port] if serial_port else ["/dev/ttyAMA0", "/dev/ttyS0", "/dev/ttyUSB0", "COM3", "COM4"]
    try:
        import serial
        for port in ports_to_try:
            try:
                ser = serial.Serial(port, baudrate=baudrate, timeout=1.0)
                logger.info(f"✅ Hardware UART opened on {port} @ {baudrate} baud.")
                break
            except Exception:
                continue
    except ImportError:
        logger.warning("⚠️ pyserial module not available; running in headless simulation mode.")

    if ser is None:
        logger.warning("⚠️ Hardware UART not connected (running in headless simulation mode).")

    buffer = bytearray()
    while True:
        try:
            if ser is not None and ser.in_waiting > 0:
                chunk = ser.read(ser.in_waiting)
                buffer.extend(chunk)
                while len(buffer) >= PAYLOAD_V2_SIZE:
                    # Check v2 first
                    frame_v2 = bytes(buffer[:PAYLOAD_V2_SIZE])
                    telemetry_v2 = unpack_lora_payload(frame_v2)
                    if telemetry_v2 is not None:
                        del buffer[:PAYLOAD_V2_SIZE]
                        forward_to_gateway_api(telemetry_v2)
                        continue

                    # Check v1
                    frame_v1 = bytes(buffer[:PAYLOAD_V1_SIZE])
                    telemetry_v1 = unpack_lora_payload(frame_v1)
                    if telemetry_v1 is not None:
                        del buffer[:PAYLOAD_V1_SIZE]
                        forward_to_gateway_api(telemetry_v1)
                        continue

                    # Slide window
                    buffer.pop(0)

            time.sleep(0.05)
        except KeyboardInterrupt:
            logger.info("Stopping LoRa receiver daemon.")
            break
        except Exception as e:
            logger.error(f"Error in LoRa RX loop: {e}")
            time.sleep(1.0)


if __name__ == "__main__":
    run_lora_listener()
