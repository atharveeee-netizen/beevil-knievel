# 🚀 BEEVIL KNIEVEL - Linux Edge Gateway Deployment & Provisioning Guide
**Production Deployment Manual for Field Apiary Gateways**  
*Canonical Target: Raspberry Pi 3B+ (Broadcom BCM2837B0) + Waveshare SX1262 LoRa HAT*  
*Alternative Enterprise Tier: Raspberry Pi Compute Module 4 (CM4) + SX1302 Concentrator*  
*Standard Version: 2.1.0 (IEEE-HART Release)*

---

## 1. System Specifications & Architecture

| Parameter | Primary Reference Gateway (Standard) | Optional Enterprise Gateway (High-Density) |
|---|---|---|
| **Form Factor** | **Raspberry Pi 3B+** Standard SBC | **Raspberry Pi Compute Module 4 (CM4)** |
| **SoC / Processor** | **Broadcom BCM2837B0** (4x Cortex-A53 @ 1.4 GHz) | **Broadcom BCM2711** (4x Cortex-A72 @ 1.5 GHz) |
| **System Memory** | 1 GB LPDDR2 SDRAM | 2 GB to 4 GB LPDDR4-3200 |
| **System Storage** | 32 GB Industrial MicroSD (Class 10 / A1) | 32 GB Onboard eMMC 5.1 Flash |
| **Operating System** | Raspberry Pi OS Lite 64-Bit (Debian 12 Bookworm) | Raspberry Pi OS Lite 64-Bit (Debian 12 Bookworm) |
| **LoRa Radio Interface**| **Waveshare SX1262 LoRa HAT** (SPI0 on `/dev/spidev0.0`) | **RAK2287 SX1302 Concentrator** (8 Multi-SF Channels) |
| **Edge Diagnostic Engine**| **Edge Multi-Modal Sensor Fusion Engine** (`gateway/server.py`) | **Edge Multi-Modal Sensor Fusion Engine** (`gateway/server.py`) |
| **Database Engine** | SQLite 3.x in Write-Ahead Logging (WAL) Mode | SQLite 3.x in Write-Ahead Logging (WAL) Mode |
| **Nominal Power Draw** | $4.5\text{ W}$ typical under active load | $8.5\text{ W}$ maximum under multi-channel load |

---

## 2. Step-by-Step Gateway Provisioning

### Step 2.1: Flash Debian 64-Bit OS
1. Insert the 32 GB MicroSD card into your workstation (or connect CM4 via `rpiboot` if deploying the enterprise tier).
2. Open **Raspberry Pi Imager** and select **Raspberry Pi OS Lite (64-bit, Debian Bookworm)**.
3. In OS Customization settings:
   - Hostname: `beevil-gateway`
   - User Account: Create your target administrative user (e.g., `pi` or custom username).
   - Enable SSH with password or public key authentication.
   - Configure Wi-Fi credentials if deploying over wireless backhaul.
4. Write the OS image and insert the card into your Raspberry Pi 3B+.

---

### Step 2.2: Clone Repository & Run Automated Setup

Connect the Waveshare SX1262 LoRa HAT to the 40-pin GPIO header, power on the gateway, and SSH into the system:

```bash
# 1. SSH into the gateway (replace with your gateway hostname or IP)
ssh pi@beevil-gateway.local

# 2. Set the desired target installation path (configurable)
export BEEVIL_DIR="${BEEVIL_DIR:-$HOME/beevil-knievel}"

# 3. Clone the official repository
git clone https://github.com/atharveeee-netizen/beevil-knievel.git "$BEEVIL_DIR"

# 4. Execute the automated provisioning script
cd "$BEEVIL_DIR/gateway"
sudo BEEVIL_INSTALL_DIR="$BEEVIL_DIR" bash setup_gateway.sh
```

**What `setup_gateway.sh` configures automatically:**
* Enables hardware SPI (`/dev/spidev0.0`) and UART in `/boot/firmware/config.txt`.
* Installs system dependencies: Python 3, `python3-venv`, `sqlite3`, `nginx`, `spitools`.
* Creates Python isolated virtual environment in `$BEEVIL_DIR/venv`.
* Installs Python packages: `fastapi`, `uvicorn`, `pydantic`, `numpy`, `scikit-learn`, `joblib`.
* Installs and enables `systemd` daemon services:
  - `beevil-gateway.service`: FastAPI REST & WebSocket Telemetry Server (Port 8000).
  - `beevil-lora.service`: Semtech SX1262 SPI Packet Ingestion Daemon.
* Configures Nginx reverse proxy on Port 80 forward to Port 8000.

---

### Step 2.3: Enable Power-Loss-Immune Read-Only OverlayFS

Apiary gateways run unattended on solar-battery setups where brownouts can occur during cloudy periods. To prevent SD card filesystem corruption:

```bash
cd "$BEEVIL_DIR/gateway"
sudo bash setup_overlayfs.sh
sudo reboot
```

*Note: Telemetry database writes are persisted via SQLite WAL mode to a dedicated persistent write-through mount (`/var/beevil_data/`).*

---

## 3. Managing Linux Background Services

All gateway tasks are supervised by Linux `systemd`. Use standard management commands:

```bash
# Check FastAPI Telemetry Server Status
sudo systemctl status beevil-gateway

# Check LoRa SPI Packet Receiver Status
sudo systemctl status beevil-lora

# View Live Diagnostic Logs
sudo journalctl -u beevil-gateway -f
```

---

## 4. Verifying the 100-Hive Pipeline

Run the automated integration verification suite directly on the gateway:

```bash
cd "$BEEVIL_DIR"
pytest tests/ -v
```

Expected output:
```text
============================= test session starts =============================
tests/test_cloud_model.py::TestCloudModel::test_model_inference_execution PASSED
tests/test_cloud_model.py::TestCloudModel::test_pathology_classes PASSED
tests/test_cloud_model.py::TestCloudModel::test_required_fields_list PASSED
tests/test_full_gateway_pipeline.py::test_root_endpoint PASSED
tests/test_full_gateway_pipeline.py::test_hives_overview PASSED
tests/test_full_gateway_pipeline.py::test_telemetry_ingest_nominal PASSED
tests/test_full_gateway_pipeline.py::test_telemetry_ingest_anomalies PASSED
tests/test_full_gateway_pipeline.py::test_telemetry_strict_validation PASSED
tests/test_full_gateway_pipeline.py::test_hive_detail_and_alerts PASSED
======================== 9 passed in 2.5s =========================
```
