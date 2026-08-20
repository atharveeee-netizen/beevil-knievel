#!/bin/bash
# =============================================================================
# BEEVIL KNIEVEL — MASTER CM4 LINUX EDGE GATEWAY PROVISIONING SCRIPT
# =============================================================================
# Run on Raspberry Pi Compute Module 4 (Debian 64-Bit Bookworm)
# Usage: sudo bash setup_gateway.sh
# =============================================================================

set -e

echo "================================================================="
echo "  BEEVIL KNIEVEL — 100-HIVE LINUX EDGE GATEWAY SETUP"
echo "================================================================="

if [ "$EUID" -ne 0 ]; then
  echo "❌ Please run as root (sudo bash setup_gateway.sh)"
  exit 1
fi

INSTALL_DIR="/home/pi/beevil-knievel"
mkdir -p $INSTALL_DIR

echo "📦 Step 1: Updating APT repositories and installing core packages..."
apt-get update -y
apt-get install -y \
    python3-pip \
    python3-venv \
    python3-dev \
    sqlite3 \
    nginx \
    hostapd \
    dnsmasq \
    git \
    build-essential \
    libatlas-base-dev \
    spitools

echo "⚡ Step 2: Enabling Hardware SPI & UART in boot config..."
CONFIG_TXT="/boot/firmware/config.txt"
if [ ! -f "$CONFIG_TXT" ]; then
    CONFIG_TXT="/boot/config.txt"
fi

if ! grep -q "dtparam=spi=on" $CONFIG_TXT; then
    echo "dtparam=spi=on" >> $CONFIG_TXT
    echo "✅ SPI enabled in $CONFIG_TXT"
fi

if ! grep -q "enable_uart=1" $CONFIG_TXT; then
    echo "enable_uart=1" >> $CONFIG_TXT
    echo "✅ UART enabled in $CONFIG_TXT"
fi

echo "🐍 Step 3: Setting up Python Virtual Environment..."
if [ ! -d "$INSTALL_DIR/venv" ]; then
    python3 -m venv $INSTALL_DIR/venv
fi

$INSTALL_DIR/venv/bin/pip install --upgrade pip
$INSTALL_DIR/venv/bin/pip install \
    fastapi \
    uvicorn \
    pydantic \
    numpy \
    spidev \
    torch --extra-index-url https://download.pytorch.org/whl/cpu

echo "🌐 Step 4: Configuring Nginx Reverse Proxy..."
cp $INSTALL_DIR/gateway/nginx/beevil.conf /etc/nginx/sites-available/beevil.conf
rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/beevil.conf /etc/nginx/sites-enabled/beevil.conf
systemctl restart nginx

echo "⚙️ Step 5: Installing & Enabling Linux systemd Services..."
cp $INSTALL_DIR/gateway/systemd/*.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable beevil-gateway.service
systemctl enable beevil-lora.service
systemctl enable beevil-telegram.service
systemctl restart beevil-gateway.service

echo "================================================================="
echo "🎉 PROVISIONING COMPLETE! BEEVIL KNIEVEL EDGE GATEWAY IS LIVE!"
echo "   • Local API URL:    http://127.0.0.1:8000"
echo "   • Dashboard URL:    http://beevil.local"
echo "   • System Services:  systemctl status beevil-gateway"
echo "================================================================="
