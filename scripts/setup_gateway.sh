#!/bin/bash
# -----------------------------------------------------------------------------
# Beevil Knievel - Gateway Setup Script (Raspberry Pi 3B+)
# -----------------------------------------------------------------------------

set -e

echo "🐝 Setting up Beevil Knievel Gateway..."

# Update system
sudo apt-get update
sudo apt-get upgrade -y

# Install dependencies
sudo apt-get install -y python3 python3-pip python3-venv sqlite3 i2c-tools git

# Enable I2C and SPI interfaces
sudo raspi-config nonint do_spi 0
sudo raspi-config nonint do_i2c 0

# Setup Python virtual environment
cd ../gateway
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# Create systemd service for the gateway
cat << EOF | sudo tee /etc/systemd/system/beevil-gateway.service
[Unit]
Description=Beevil Knievel Gateway Service
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$(pwd)
ExecStart=$(pwd)/venv/bin/python server.py
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable beevil-gateway.service

echo "✅ Gateway setup complete. Use 'sudo systemctl start beevil-gateway' to run."
