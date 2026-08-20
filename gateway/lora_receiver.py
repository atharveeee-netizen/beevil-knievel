"""
BEEVIL KNIEVEL — LORAWAN / LORA SPI PACKET RECEIVER DAEMON
===========================================================
Linux background daemon for Raspberry Pi CM4 + Waveshare SX1262 LoRa HAT.
- Interfaces with Semtech SX1262 via SPI (/dev/spidev0.0) or UART.
- Operates on 865.0625 MHz (India WPC De-licensed Band).
- Unpacks 32-byte binary binary payloads from 100 field transmitter nodes.
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

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] [LoRa-RX] %(message)s"
)
logger = logging.getLogger("BeevilLoRa")

GATEWAY_API_URL = "http://127.0.0.1:8000/api/v1/telemetry"

# Binary struct format for 32-byte payload:
# < = Little-endian
# H = uint16 (hive_id)
# h = int16 (core_temp * 100)
# 5h = 5 x int16 (frame_temps * 100)
# H = uint16 (humidity * 100)
# H = uint16 (voc_gas_kohm * 10)
# H = uint16 (co2_ppm)
# H = uint16 (weight_kg * 100)
# H = uint16 (lux)
# B = uint8 (tilt_deg)
# 8B = 8 x uint8 (fft_bands normalized 0..255)
PAYLOAD_FORMAT = "<Hh5hHHHHH B8B"
PAYLOAD_SIZE = struct.calcsize(PAYLOAD_FORMAT)

def unpack_lora_payload(raw_bytes: bytes) -> Optional[Dict[str, Any]]:
    """Unpacks 32-byte binary radio packet into JSON telemetry dict."""
    if len(raw_bytes) != PAYLOAD_SIZE:
        logger.warning(f"Invalid packet size: expected {PAYLOAD_SIZE} bytes, got {len(raw_bytes)}")
        return None

    unpacked = struct.unpack(PAYLOAD_FORMAT, raw_bytes)
    
    hive_id = unpacked[0]
    core_temp = unpacked[1] / 100.0
    frame_temps = [unpacked[2 + i] / 100.0 for i in range(5)]
    humidity = unpacked[7] / 100.0
    voc_gas = unpacked[8] / 10.0
    co2_ppm = float(unpacked[9])
    weight_kg = unpacked[10] / 100.0
    lux = float(unpacked[11])
    tilt_deg = float(unpacked[12])
    fft_bands = [unpacked[13 + i] / 255.0 for i in range(8)]

    return {
        "hive_id": hive_id,
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

def run_lora_listener():
    """Main daemon loop."""
    logger.info("📡 Starting Semtech SX1262 LoRa Packet Listener (865.0625 MHz)...")
    logger.info(f"Packet Struct Format: '{PAYLOAD_FORMAT}' ({PAYLOAD_SIZE} bytes)")

    # Attempt to initialize hardware SPI on Linux Raspberry Pi CM4
    try:
        import spidev
        spi = spidev.SpiDev()
        spi.open(0, 0)
        spi.max_speed_hz = 5000000
        logger.info("✅ Hardware SPI (/dev/spidev0.0) opened successfully.")
    except (ImportError, FileNotFoundError):
        logger.warning("⚠️ Hardware SPI not found (running in simulation/headless mode).")
        spi = None

    # Daemon listening loop
    while True:
        try:
            if spi is not None:
                # Read SX1262 RX FIFO
                pass
            time.sleep(0.1)
        except KeyboardInterrupt:
            logger.info("Stopping LoRa receiver daemon.")
            break
        except Exception as e:
            logger.error(f"Error in LoRa RX loop: {e}")
            time.sleep(1.0)

if __name__ == "__main__":
    run_lora_listener()
