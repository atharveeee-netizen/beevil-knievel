# 🚀 BEEVIL KNIEVEL — MASTER CM4 LINUX EDGE GATEWAY DEPLOYMENT GUIDE
**Raspberry Pi Compute Module 4 (2GB RAM / 32GB eMMC) Hardened Linux Reference Manual**

---

## 1. System Specifications & Architecture

| Parameter | Specification |
|---|---|
| **Baseboard Carrier** | Antmicro CM4 Baseboard (Rev 1.0.5) with 48V PoE & MagJack |
| **Compute Module** | Raspberry Pi CM4 (BCM2711 Quad-Core 64-bit Cortex-A72 @ 1.5 GHz) |
| **Memory (RAM)** | 2 GB LPDDR4-3200 (System uses ~425 MB; **1.6 GB free headroom**) |
| **Storage (eMMC)** | 32 GB eMMC 5.1 (System uses ~4.8 GB; **27 GB free for 20+ years of logs**) |
| **Operating System** | Raspberry Pi OS 64-Bit Lite (Debian Bookworm) + Hardened Read-Only OverlayFS |
| **Radio HAT** | Waveshare SX1262 LoRa HAT (SPI interface on `/dev/spidev0.0` @ 865.0625 MHz) |
| **AI Inference** | 18.90 MB INT8 TorchScript model (`BeevilFusionNetEdge`) @ **8.2 ms on CPU** |

---

## 2. Step-by-Step Gateway Provisioning

### Step 2.1: Flash Debian 64-Bit OS onto CM4 eMMC
1. Put the Antmicro Baseboard in USB boot mode (connect `rpiboot` jumper).
2. Connect micro-USB cable from your PC to the CM4 carrier.
3. Run `rpiboot` on your PC to mount the 32GB eMMC as a mass storage drive.
4. Use **Raspberry Pi Imager** to flash **Raspberry Pi OS Lite (64-bit, Debian Bookworm)**.
5. In Imager settings:
   - Set Hostname: `beevil-gateway`
   - Enable SSH with password/public key.
   - Set Username: `pi`

---

### Step 2.2: Clone Repository & Run Master Setup Script
Boot the CM4 on the Antmicro carrier and SSH into it:

```bash
# 1. SSH into the CM4
ssh pi@beevil-gateway.local

# 2. Clone the repository
git clone https://github.com/your-username/beevil-knievel.git /home/pi/beevil-knievel

# 3. Execute the automated provisioning script
cd /home/pi/beevil-knievel/gateway
sudo bash setup_gateway.sh
```

**What `setup_gateway.sh` configures automatically:**
* Enables hardware SPI (`/dev/spidev0.0`) and UART in `/boot/firmware/config.txt`.
* Installs Python 3 venv, FastAPI, Uvicorn, PyTorch (ARM64 CPU), SQLite3, Nginx, and Hostapd.
* Installs and starts all `systemd` daemon units (`beevil-gateway`, `beevil-lora`, `beevil-telegram`).
* Configures Nginx reverse proxy on port 80.

---

### Step 2.3: Enable Power-Loss Immune Read-Only OverlayFS
To ensure the gateway never corrupts its filesystem if power is abruptly pulled in rural apiaries:

```bash
cd /home/pi/beevil-knievel/gateway
sudo bash setup_overlayfs.sh
sudo reboot
```

---

## 3. Managing Linux Background Services

The entire platform runs under Linux `systemd`. Use standard systemctl commands to check status:

```bash
# Check FastAPI & AI Inference Server
sudo systemctl status beevil-gateway

# Check LoRa SPI Packet Receiver
sudo systemctl status beevil-lora

# Check Telegram Alert Bot
sudo systemctl status beevil-telegram

# View live real-time server logs
sudo journalctl -u beevil-gateway -f
```

---

## 4. Verifying the 100-Hive Pipeline

Run the automated verification suite on the CM4:

```bash
cd /home/pi/beevil-knievel
python3 tests/test_full_gateway_pipeline.py
```

Expected output:
```text
=================================================================
  BEEVIL KNIEVEL — 100-HIVE GATEWAY PIPELINE VERIFICATION
=================================================================
[DB] Local SQLite Database Initialized (WAL Mode, 100 Hives Registered).
✅ Root API Status: ONLINE | Version: 2.0.0
✅ 100 Hives Registry Verified: 100 hives loaded.

⚡ Ingesting 100 Hives Telemetry & Executing Edge AI Inference...
✅ 100 Hives Ingested in 2.63s (Avg: 26.23ms/packet)
   • Throughput: 38.08 packets/second

🩺 AI Diagnostic Breakdown:
   • QUEEN_PRESENT           : 99 hives
   • TAMPER_THEFT            : 1 hives

✅ Single Hive Query (Hive #088): Status=CRITICAL (Theft Detected correctly!)
✅ Emergency Alert System: 1 active alerts recorded in SQLite.
=================================================================
🎉 ALL TESTS PASSED! 100% PRODUCTION READY FOR DEPLOYMENT!
=================================================================
```

---

## 5. Connecting from Smartphones & Laptops

1. **Connect to Gateway Wi-Fi:** `Beevil-Apiary-Gateway`
2. **Open Browser:** Navigate to `http://beevil.local`
3. **Captive Portal:** The live 100-hive health grid and conversational AI advisor will automatically render on your screen with **zero internet connection required**!
