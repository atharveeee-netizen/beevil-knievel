# APPLICATION FLOW SPECIFICATION (AppFlow)

**Project:** BEEVIL KNIEVEL  
**Process:** End-to-End Cyber-Physical State Machine  

---

## 1. Field Node Firmware State Machine

```text
[ DEEP SLEEP (SYSTEM OFF) ] -- (18.4 uA quiescent)
        |
        | RTC Alarm Interrupt (Every 300 seconds)
        v
[ STAGE 1: POWER RAIL ACTIVATION ]
        | Enable 3.3V sensor rail via low-RDS P-channel MOSFET (P0.26)
        | Settle power rails (10 ms)
        v
[ STAGE 2: DC SENSORY ACQUISITION (120 ms) ]
        | Read TI TMP117 (Brood Core Temp) via I2C (0x48)
        | Read Maxim DS18B20 5-probe thermal array via 1-Wire (P0.17)
        | Read SCD41 NDIR CO2 & BME688 environmental gas via I2C
        | Read HX711 24-bit weight ADC
        | Read LIS3DH accelerometer tilt angles
        v
[ STAGE 3: ACOUSTIC STREAMING & CMSIS-DSP FFT (1.2 s) ]
        | Power INMP441 MEMS mic via I2S
        | Stream 20,000 samples @ 2000 Hz into double ping-pong buffer
        | Apply Hanning window
        | Execute 256-point Complex FFT with CMSIS-DSP (arm_cfft_f32)
        | Integrate spectral magnitudes across 4 biological sub-bands
        | Power down INMP441 & disable I2S peripheral
        v
[ STAGE 4: PACKET ENCODING & TELEMETRY PACKING (2 ms) ]
        | Pack 16-bit packed fields into 32-byte binary payload
        | Compute CRC-16-CCITT checksum over bytes 0-29
        v
[ STAGE 5: SUB-GHz LoRa TRANSMISSION (280 ms) ]
        | Wake Semtech SX1262 from Cold Sleep
        | Set frequency: 865.0625 MHz (IN865 Band, Channel 0)
        | Set spreading factor: SF7, Bandwidth: 125 kHz, Coding Rate: 4/5
        | Transmit 32-byte frame at +14 dBm
        | Wait for TxDone interrupt on DIO1
        | Put SX1262 into Warm Sleep (0.6 uA)
        v
[ STAGE 6: PERIPHERAL SHUTDOWN & RESUME DEEP SLEEP ]
        | Cut 3.3V sensor rail via MOSFET
        | Reconfigure GPIOs to High-Z analog input
        | Arm RTC timer for next wake event (T + 300 s)
        | Enter SYSTEM OFF sleep mode
```

---

## 2. Gateway Ingest & Anomaly Pipeline

```text
[ SX1262 LoRa HAT Interrupt (DIO1) ]
        |
        v
[ SPI Binary Frame Extraction (spidev0.0) ]
        |
        v
[ CRC & Sequence Validation ]
        |-- Pass: Proceed to dissection
        |-- Fail: Increment corrupt packet counter, drop frame
        v
[ Telemetry Payload Dissection (Python struct.unpack) ]
        |
        v
[ Page CUSUM Anomaly Filter ]
        |-- Calculate cumulative residual: S_k = max(0, S_{k-1} + (y_k - mu_0) - k_slack)
        |-- If S_k > Threshold: Trigger Early Swarm or Thermal Chill Alarm
        v
[ HoneyChain Block Assembly ]
        | Hash previous block + current payload -> New SHA-256 Block
        | Append to local append-only ledger file
        v
[ SQLite Write-Ahead Log Ingestion ]
        | INSERT INTO telemetry VALUES (...)
        v
[ WebSocket Broadcast to Active Clients ]
        | Emit JSON frame to Web Dashboard & Mobile PWA
```
