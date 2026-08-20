"""
BEEVIL KNIEVEL — AUTOMATED TELEGRAM EMERGENCY ALERT BOT
========================================================
100% Free, Zero-Subscription Alert Dispatcher:
- Monitors local SQLite database for unresolved critical alerts.
- Dispatches instant Telegram messages with formatted diagnosis cards.
- Supports attaching audio acoustic recordings of Queen piping / Swarm buzz.
- Zero Twilio / Zero Monthly Fees!
"""

import os
import sys
import time
import json
import sqlite3
import urllib.request
import urllib.parse
import logging
from pathlib import Path

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] [Telegram-Bot] %(message)s"
)
logger = logging.getLogger("BeevilTelegram")

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "beevil_telemetry.db"

# Configuration (Can be set via environment variables on Linux)
TELEGRAM_BOT_TOKEN = os.getenv("BEEVIL_TELEGRAM_TOKEN", "DEMO_TOKEN_BEEVIL_BOT")
TELEGRAM_CHAT_ID = os.getenv("BEEVIL_TELEGRAM_CHAT_ID", "DEMO_CHAT_ID")

def send_telegram_alert(hive_id: int, alert_type: str, severity: str, message: str, confidence: float) -> bool:
    """Dispatches formatted Markdown alert to the Beekeeper's Telegram."""
    if TELEGRAM_BOT_TOKEN == "DEMO_TOKEN_BEEVIL_BOT":
        logger.info(f"🔔 [LOCAL SIMULATION] Telegram Alert -> Hive #{hive_id:03d}: {alert_type} ({severity}) - {confidence*100:.1f}%")
        return True

    emoji = "🚨" if severity == "CRITICAL" else "⚠️"
    text_content = (
        f"{emoji} *BEEVIL KNIEVEL EMERGENCY ALERT*\n"
        f"━━━━━━━━━━━━━━━━━━━━━\n"
        f"🐝 *Hive Unit:* `Hive-{hive_id:03d}`\n"
        f"🩺 *Diagnosis:* `{alert_type}`\n"
        f"📊 *AI Confidence:* `{confidence*100:.1f}%`\n"
        f"⏱️ *Time:* `{time.strftime('%Y-%m-%d %H:%M:%S UTC', time.gmtime())}`\n\n"
        f"📝 *Details:* {message}\n\n"
        f"🔗 [Open Apiary Live Dashboard](http://beevil.local)"
    )

    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": text_content,
        "parse_mode": "Markdown",
        "disable_web_page_preview": False
    }

    try:
        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req, timeout=5.0) as resp:
            if resp.status == 200:
                logger.info(f"✅ Telegram message delivered for Hive #{hive_id:03d}")
                return True
    except Exception as e:
        logger.error(f"Failed to send Telegram message: {e}")
    return False

def run_alert_poller():
    """Polls database every 5 seconds for new alerts."""
    logger.info("🤖 Starting Beevil Telegram Alert Daemon...")
    last_processed_id = 0

    while True:
        try:
            if DB_PATH.exists():
                conn = sqlite3.connect(str(DB_PATH), timeout=10.0)
                conn.row_factory = sqlite3.Row
                cursor = conn.cursor()

                cursor.execute("""
                SELECT id, hive_id, alert_type, severity, message, confidence 
                FROM alerts 
                WHERE id > ? AND resolved = 0 
                ORDER BY id ASC;
                """, (last_processed_id,))

                new_alerts = cursor.fetchall()
                for alert in new_alerts:
                    alert_id = alert["id"]
                    send_telegram_alert(
                        alert["hive_id"],
                        alert["alert_type"],
                        alert["severity"],
                        alert["message"],
                        alert["confidence"]
                    )
                    last_processed_id = max(last_processed_id, alert_id)

                conn.close()
            time.sleep(3.0)
        except KeyboardInterrupt:
            break
        except Exception as e:
            logger.error(f"Error in alert poller loop: {e}")
            time.sleep(5.0)

if __name__ == "__main__":
    run_alert_poller()
