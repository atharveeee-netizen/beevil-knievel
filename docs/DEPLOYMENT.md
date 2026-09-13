# 🚀 BEEVIL KNIEVEL — Field Deployment & Hardware Provisioning Manual

This manual provides instructions for deploying the Beevil Knievel cyber-physical apiculture monitoring platform in an apiary environment, covering both physical in-hive sensor installation and Linux edge gateway provisioning.

---

## 🐝 1. In-Hive Sensor Node Physical Installation

```
+-------------------------------------------------------------+
| Langstroth Brood Box (10-Frame Standard)                    |
|                                                             |
|  [Frame 1]  [Frame 2]  [Frame 3]  [Frame 4]  [Frame 5]      |
|     |          |          |          |          |           |
|  DS18B20_1  DS18B20_2   TMP117   DS18B20_4  DS18B20_5       |
|    (Outer)    (Mid)    (Core/Queen)  (Mid)    (Outer)       |
|                                                             |
|  [INMP441 Mic] -> Brood Center Comb (ePTFE membrane)       |
|  [SCD41 CO2 + BME688] -> Crown Board Inner Cover            |
|  [LIS3DH Tilt] -> Rigid Enclosure Chassis                  |
|  [Phaeton 200kg Load Cell] -> Weatherproof Base Stand       |
|  [1W Solar Panel] -> South-Facing Outer Lid (35° Tilt)     |
+-------------------------------------------------------------+
```

### Sensor Placement Guidelines

1. **TMP117 Brood Core Temperature Probe:**
   - Mount on the center brood frame (typically Frame 3 in a 5-frame nuc, or Frame 5 in a 10-frame deep).
   - Position probe tip in the active egg/larval cell area where the queen resides.
2. **5x DS18B20 Thermal Gradient Probes:**
   - Distribute horizontally across frames 1, 2, 3, 4, and 5 to capture thermal dispersion between the heated brood center ($34.8^\circ\text{C}$) and cool outer honey stores ($28.0^\circ\text{C}$).
3. **INMP441 Acoustic MEMS Microphone:**
   - Install facing inward toward the brood comb facing.
   - Secure behind a breathable ePTFE acoustic vent membrane to prevent bees from sealing the aperture with propolis or wax.
4. **SCD41 NDIR CO2 & BME688 Gas Sensors:**
   - Mount on the underside of the inner cover (crown board) where warm exhaled bee respiration gases collect before exiting top ventilation slots.
5. **Phaeton 200 kg Shear-Beam Scale Base:**
   - Place underneath the bottom hive floorboard. Ensure all 4 contact corners rest on flat, unyielding ground or concrete pavers to avoid uncalibrated mechanical flexion.
6. **1W Solar Panel & LoRa Antenna:**
   - Mount externally on the outer telescoping roof lid.
   - Orient solar panel south-facing (in Northern Hemisphere) with a $30^\circ - 35^\circ$ elevation angle.
   - Orient the 865 MHz $\lambda/4$ helical antenna vertically for optimal horizontal omnidirectional radiation.

---

## 🖥️ 2. Linux Edge Gateway Setup & Provisioning

The standard gateway platform is a **Raspberry Pi 3B+ (Broadcom BCM2837B0)** equipped with a **Waveshare SX1262 LoRa HAT**.

### Step 2.1: Base OS Installation
1. Flash **Raspberry Pi OS Lite (64-bit, Debian Bookworm)** onto an industrial 32 GB MicroSD card using Raspberry Pi Imager.
2. Enable SSH and configure your local Wi-Fi or static Ethernet credentials.
3. Power on the Raspberry Pi with the Waveshare SX1262 HAT seated firmly onto the 40-pin GPIO header.

### Step 2.2: Automated Gateway Installation
Connect via SSH and execute the automated setup script:

```bash
# 1. SSH into the gateway
ssh pi@beevil-gateway.local

# 2. Clone the repository
git clone https://github.com/atharveeee-netizen/beevil-knievel.git ~/beevil-knievel

# 3. Run automated gateway installer
cd ~/beevil-knievel/gateway
sudo bash setup_gateway.sh
```

**What `setup_gateway.sh` configures:**
* Enables hardware SPI (`/dev/spidev0.0`) and UART in `/boot/firmware/config.txt`.
* Installs dependencies: `python3-venv`, `sqlite3`, `nginx`, `spitools`.
* Creates Python virtual environment and installs `fastapi`, `uvicorn`, `pydantic`, `scikit-learn`, `joblib`.
* Configures and enables systemd daemons:
  - `beevil-gateway.service`: FastAPI REST & WebSocket server (Port 8000).
  - `beevil-lora.service`: Semtech SX1262 SPI packet receiver daemon.
* Configures Nginx reverse proxy on Port 80 forward to Port 8000.

### Step 2.3: Enable Power-Loss-Immune Read-Only Filesystem (OverlayFS)

Rural apiaries experience frequent solar brownouts. To prevent SD card corruption:

```bash
cd ~/beevil-knievel/gateway
sudo bash setup_overlayfs.sh
sudo reboot
```

The root filesystem will mount read-only, with writes cached in temporary RAM (`tmpfs`). SQLite database telemetry is directed to a dedicated write-through partition with write-ahead logging (WAL).

---

## 🐳 3. Containerized Deployment (Docker Compose)

For cloud or local development servers, Beevil Knievel provides containerized deployment:

```bash
# Start gateway and mock telemetry services
docker compose up -d

# Verify container health
docker compose ps

# View gateway logs
docker compose logs -f gateway
```

---

## 🔍 4. Verification & Diagnostics

Verify that all services are operational after deployment:

```bash
# 1. Check Gateway Root API Endpoint
curl -s http://localhost:8000/ | jq .

# 2. Check Service Status
sudo systemctl status beevil-gateway.service
sudo systemctl status beevil-lora.service

# 3. View Live LoRa Ingestion Log Stream
journalctl -u beevil-lora.service -f
```
