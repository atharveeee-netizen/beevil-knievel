# Hardware Inventory Declaration
**Purpose:** Record physical, working hardware currently in possession for the Beevil Knievel research artifact.  
**Rule:** Only list components that physically exist, are wired up, and are verified operational. The manuscript may only claim what is documented here.

---

## 1. Core Processing & Wireless Node
- **MCU / Core Module:** RAK4631 WisBlock Core (Nordic nRF52840 @ 64 MHz + Semtech SX1262 LoRa)
- **Base Board:** RAK5005-O (or specify alternate baseboard model): `________________`
- **Antenna Connector:** U.FL (IPEX) to SMA pigtail attached: `[YES / NO]`
- **Antenna Type:** 868 MHz / 865 MHz rubber-duck or whip antenna: `________________`

---

## 2. Connected & Verified Sensors (Check only what is wired up)
- [ ] **Acoustic Microphone:** INMP441 I2S digital MEMS microphone (wired to I2S pins)
- [ ] **Broodnest Temperature:** DS18B20 1-Wire sealed stainless probe (wired to GPIO DQ with 4.7 kΩ pull-up)
- [ ] **Internal Ambient Temp / Humidity:** Sensirion SHTC3 (I2C)
- [ ] **Precision Core Temp (Optional):** TI TMP117 (I2C, $\pm 0.1^\circ\text{C}$)
- [ ] **IMU / Tilt Sensor:** LIS3DH / MPU6050 (I2C)
- [ ] **Weight / Load Cell (Optional):** HX711 + 4-strain-gauge bridge
- [ ] **Gas / CO₂ Sensor (Optional):** Sensirion SCD30 / SGP30 (I2C)

---

## 3. Power Subsystem
- **Battery Model / Chemistry:** Single-cell Li-ion / LiPo (18650 or pouch)
- **Nominal Voltage:** 3.7 V (operating 3.0 V to 4.2 V)
- **Rated Capacity:** `________` mAh (e.g. 3000 mAh)
- **Solar Energy Harvesting (Optional):** Solar panel model and wattage (e.g. 5V 1W): `________________`
- **Solar Charging Controller:** On-board TP4054 / WisBlock solar port

---

## 4. Gateway Concentrator
- **Single-Board Computer:** Raspberry Pi 4 Model B (or specify model): `________________`
- **LoRa Concentrator HAT:** RAK2287 / SX1302 Concentrator (or RAK831 / SX1301 / dragino): `________________`
- **Operating System:** Raspberry Pi OS (Debian 64-bit)
- **Host Connectivity:** Ethernet / Wi-Fi to local network
- **Packet Forwarder:** Semtech basic packet forwarder / ChirpStack MQTT bridge / Local UART bridge

---

## 5. Verification Sign-Off
- **Date Verified:** `YYYY-MM-DD`
- **Inspected By:** Atharve Dahima / Srajan Mishra / Dr. Vishal Sharma
