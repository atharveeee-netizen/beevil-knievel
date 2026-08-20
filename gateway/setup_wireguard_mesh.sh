#!/bin/bash
# =============================================================================
# BEEVIL KNIEVEL — WIREGUARD P2P REGIONAL APIARY MESH SETUP
# =============================================================================
# Connects multiple CM4 Gateways across distant farm locations into an
# encrypted, zero-cloud peer-to-peer mesh network.
# =============================================================================

set -e

if [ "$EUID" -ne 0 ]; then
  echo "❌ Please run as root (sudo bash setup_wireguard_mesh.sh)"
  exit 1
fi

echo "================================================================="
echo "  BEEVIL KNIEVEL — WIREGUARD MULTI-APIARY P2P MESH SETUP"
echo "================================================================="

apt-get update -y
apt-get install -y wireguard wireguard-tools

WG_DIR="/etc/wireguard"
mkdir -p $WG_DIR
chmod 700 $WG_DIR

# Generate Gateway Private & Public Keys if not present
if [ ! -f "$WG_DIR/private.key" ]; then
    wg genkey | tee $WG_DIR/private.key | wg pubkey > $WG_DIR/public.key
    echo "✅ Generated new WireGuard Keypair for this Gateway."
fi

PRIV_KEY=$(cat $WG_DIR/private.key)
PUB_KEY=$(cat $WG_DIR/public.key)

echo "🔑 Gateway Public Key: $PUB_KEY"

# Create default mesh interface configuration (wg0)
cat <<EOF > $WG_DIR/wg0.conf
[Interface]
Address = 10.50.0.1/24
ListenPort = 51820
PrivateKey = $PRIV_KEY
SaveConfig = false

# Peer: Secondary Apiary Gateway 2
# [Peer]
# PublicKey = <PEER_GATEWAY_2_PUBLIC_KEY>
# AllowedIPs = 10.50.0.2/32
# Endpoint = apiary2.example.com:51820
# PersistentKeepalive = 25
EOF

systemctl enable wg-quick@wg0
echo "✅ WireGuard Mesh Service Enabled (wg0 interface on 10.50.0.x)."
echo "================================================================="
