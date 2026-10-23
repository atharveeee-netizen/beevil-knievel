# Protocol HT-02: Hardware Bench Power & Cycle-Count Measurements
**Provenance Tag:** `REAL_BENCH_MEASUREMENT`  
**Target Hardware:** RAKwireless WisBlock RAK4631 (Nordic nRF52840 MCU @ 64 MHz + Semtech SX1262 LoRa transceiver), RAK5005-O baseboard.  
**Measurement Instrument:** Nordic Semiconductor Power Profiler Kit II (PPK2) in Ampere Meter mode (or Keithley 2450 SourceMeter).  
**Authors/Operators:** Atharve Dahima, Srajan Mishra, Dr Vishal Sharma.  

---

## 1. Objectives & Preregistered Deliverables
1. **Sleep Current ($I_{\text{sleep}}$):** Measure average current in System ON sleep (RTC timer running at 32.768 kHz, RAM retained, SX1262 in sleep mode, sensors unpowered or suspended).
2. **Active Audio & DSP Processing ($I_{\text{active}}, t_{\text{active}}$):** Measure duration and current consumption for:
   - 16 kHz audio capture (2048 samples).
   - 31-tap FIR lowpass filter + 4x decimation to 4 kHz.
   - 512-point real FFT with Hann window and CMSIS-DSP `arm_rfft_fast_f32`.
   - 8 biological band log-energy integration.
   - INT8 TinyML classifier inference (`beevil_tinyml_predict`).
3. **LoRa Transmission Burst ($I_{\text{tx}}, t_{\text{tx}}$):** Measure exact airtime and peak/average current for 36-byte Frame v2 transmission at:
   - +14 dBm (EU868 / IN865 standard).
   - +22 dBm (maximum PA boost).
   - SF7 / BW 125 kHz / CR 4/5 (airtime: 77.06 ms).
   - SF10 / BW 125 kHz / CR 4/5 (airtime: 411.65 ms).
4. **DWT Cycle Counting:** Read ARM Cortex-M4F Data Watchpoint and Trace (DWT) cycle counter (`DWT->CYCCNT`) directly for DSP and TinyML routines.

---

## 2. Hardware Wiring Diagram & Test Setup

```
   [ Nordic PPK2 (Source Meter Mode) ]
          VOUT (3.300 V) ------> J11 VDD / Battery Pin (RAK5005-O)
          GND            ------> GND (RAK5005-O)
          USB to PC      ------> nRF Connect Power Profiler App / CLI
                                 Sampling rate: 100 kHz (10 µs resolution)
```

1. Disconnect any USB cable from RAK4631 micro-USB port (avoids back-powering USB-UART bridge CP2102).
2. Power RAK4631 strictly through PPK2 VOUT pin set to **3.300 V**.
3. Connect PPK2 Digital Logic IN0 to RAK4631 `PIN_LED1` (GPIO toggle for state synchronization).

---

## 3. Step-by-Step Bench Protocol

### Step 3.1: Flash Bench Firmware Test Harness
Flash `firmware/src/bench_power_harness.ino` (or compile via PlatformIO `pio run -e rak4631 -t upload`).
The harness repeats a 5-phase cycle every 10 seconds:
- Phase 0: System Sleep (5.0 seconds). Digital pin LOW.
- Phase 1: Active Microphone DMA + FIR Lowpass (50 ms). Digital pin HIGH.
- Phase 2: Active CMSIS-DSP 512-pt FFT + Band Integration (20 ms). Digital pin HIGH.
- Phase 3: Active TinyML INT8 Inference (5 ms). Digital pin HIGH.
- Phase 4: LoRa TX 36-byte Frame v2 at SF7, +14 dBm (~77 ms). Digital pin HIGH.

### Step 3.2: PPK2 Data Logging
1. Launch **nRF Connect for Desktop** -> **Power Profiler**.
2. Select COM port corresponding to PPK2.
3. Configure:
   - Mode: **Source meter**
   - Output voltage: **3300 mV**
   - Enable digital inputs: **D0 (Trigger)**
   - Sample rate: **100,000 samples/sec**
4. Click **Start**. Let the device execute at least 10 complete cycles (100 seconds).
5. Stop logging and export CSV to:
   `paper_q1/bench_raw/ppk2_power_profile_20261023.csv`

### Step 3.3: DWT Cycle Count Readout
1. Open serial monitor at 115200 baud on nRF52840 native CDC USB.
2. The harness outputs cycle counts measured via `DWT->CYCCNT`:
   ```
   [DWT] FIR_4x_Decimate: 14230 cycles (222.3 us)
   [DWT] CMSIS_RFFT_512:  8190 cycles (128.0 us)
   [DWT] Band_Energy_8:   1940 cycles (30.3 us)
   [DWT] TinyML_INT8_MLP: 2450 cycles (38.3 us)
   [DWT] Total_DSP_TinyML: 26810 cycles (418.9 us)
   ```
3. Save terminal log to `paper_q1/bench_raw/dwt_cycles_log.txt`.

---

## 4. Automated Parsing & Ingestion
Run the automated ingestion script once the CSV is placed in `paper_q1/bench_raw/`:
```bash
python -m paper_q1.bench_tools.parse_ppk2 --input paper_q1/bench_raw/ppk2_power_profile_20261023.csv
```
This script computes mean current, peak current, duration, and energy per phase:
- $E_{\text{sleep}} = V \cdot I_{\text{sleep}} \cdot t_{\text{sleep}}$
- $E_{\text{dsp}} = V \cdot I_{\text{dsp}} \cdot t_{\text{dsp}}$
- $E_{\text{tx}} = V \cdot I_{\text{tx}} \cdot t_{\text{tx}}$
- $E_{\text{cycle}} = E_{\text{sleep}} + E_{\text{dsp}} + E_{\text{tx}}$
Outputs: `paper_q1/results/measured_power_bench.json`.
Macro generation will read these values automatically into `numbers.tex`.
