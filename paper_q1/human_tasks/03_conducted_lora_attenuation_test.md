# Protocol HT-03: Conducted LoRa Packet Error Rate (PER) vs. Attenuation Bench Test
**Provenance Tag:** `REAL_BENCH_MEASUREMENT`  
**Target Hardware:** RAK4631 LoRa node (Transmitter) + RAK2287/SX1302 Concentrator Gateway (Receiver).  
**RF Connection:** Fully shielded conducted RF coaxial link with calibrated programmable step attenuator (or fixed SMA attenuators: 30 dB, 60 dB, 90 dB, 110 dB, 120 dB, 130 dB).  
**Zero Field Deployment Invariant:** All RF measurements are conducted over coaxial cables inside an RF-shielded enclosure to measure physical receiver sensitivity limits without multipath or uncontrolled interference.  

---

## 1. Objectives & Preregistered Deliverables
1. **Measured Sensitivity Threshold ($S_{\text{meas}}$):** Determine the exact conducted RF path loss (dB) where Packet Error Rate (PER) reaches 1% and 10% for:
   - SF7, BW 125 kHz, CR 4/5 (Payload = 36 bytes).
   - SF10, BW 125 kHz, CR 4/5 (Payload = 36 bytes).
2. **RSSI / SNR Linearity:** Record measured RSSI and SNR reported by Semtech SX1302 gateway across the attenuation sweep from -60 dBm to -135 dBm.
3. **Conducted vs Analytical Link Budget Calibration:** Validate the analytical Friis/log-distance path loss model against physical bench receiver sensitivity.

---

## 2. Test Setup & Equipment Configuration

```
 [ RAK4631 Node ] (SMA Conducted Port)
       |
 [ Fixed 30 dB 2W Attenuator ] (Protects Receiver & Step Attenuator)
       |
 [ Coaxial RF Cable RG-316 ]
       |
 [ Calibrated Step Attenuator (0 - 100 dB in 1 dB steps) ]
       |
 [ Gateway Antenna Port (RAK2287 / SX1302) ]
```

- **Tx Power:** Programmed to +14 dBm (25 mW).
- **Center Frequency:** 868.100 MHz (or 865.0625 MHz for IN865).
- **Packet Generation:** Node transmits 100 Frame v2 packets per attenuation setting (sequence numbers 1 to 100).
- **Airtime:** 77.06 ms per packet (SF7), 411.65 ms per packet (SF10).

---

## 3. Step-by-Step Bench Protocol

1. Set initial total attenuation to **60 dB** (Received Power $\approx -46\text{ dBm}$).
2. Run automated test sweep script:
   ```bash
   python -m paper_q1.bench_tools.run_conducted_sweep --port-node COM4 --port-gw COM5 --sf 7
   ```
3. For each attenuation step $A \in \{60, 70, 80, 90, 100, 110, 115, 120, 125, 128, 130, 132, 134, 136\}\text{ dB}$:
   - Transmit $N = 100$ packets with 200 ms inter-packet guard interval.
   - Gateway records: received packet count $N_{\text{rx}}$, RSSI, SNR, CRC errors.
   - Calculate PER: $\text{PER} = 1 - \frac{N_{\text{rx}}}{N}$.
4. Save raw CSV log to `paper_q1/bench_raw/lora_conducted_per_sweep.csv`.

---

## 4. Ingestion & Analysis
Run parsing script:
```bash
python -m paper_q1.bench_tools.parse_lora_per --input paper_q1/bench_raw/lora_conducted_per_sweep.csv
```
This writes `paper_q1/results/measured_lora_per.json` with empirical sensitivity curves, which are combined with the analytical link-budget model in Section 9.4 of the manuscript.
