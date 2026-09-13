# 💾 BEEVIL KNIEVEL — Firmware Architecture & DSP Implementation

This document provides a line-by-line engineering breakdown of the firmware running on the in-hive edge sensor node (`firmware/src/main.cpp` and `firmware/beevil_rak4631_transmitter/beevil_rak4631_transmitter.ino`).

---

## 🎯 Firmware Overview

* **MCU Target:** Nordic Semiconductor nRF52840 (ARM Cortex-M4F @ 64 MHz with single-precision hardware FPU).
* **Operating System / Scheduler:** FreeRTOS Kernel / Cooperative Tickless Idle for ultra-low power sleep.
* **Build System:** PlatformIO (`platform = nordicnrf52`, `framework = arduino`).
* **RF Driver Stack:** RadioLib Semtech SX1262 LoRa Driver (SPI interface).
* **Signal Processing Library:** ARM CMSIS-DSP (`arm_rfft_fast_f32`).

---

## 📦 Canonical 33-Byte Binary Wire Protocol

To maximize battery autonomy and comply with duty-cycle limits, the firmware bypasses ASCII/JSON formatting entirely. It serializes all sensor readings and DSP outputs into a strict **33-byte packed binary struct**:

```c
#pragma pack(push, 1)
typedef struct {
    uint16_t hive_id;                  // 2 bytes: Unique Hive ID (0x0001 - 0x0064)
    int16_t  brood_core_temp_c_x100;   // 2 bytes: TMP117 Temp (-9999 if NOT_CONNECTED)
    int16_t  frame_temps_c_x100[5];    // 10 bytes: 5x DS18B20 Probes (-9999 if NOT_CONNECTED)
    uint16_t humidity_pct_x100;        // 2 bytes: 0.00% to 100.00% (0xFFFF if NOT_CONNECTED)
    uint16_t voc_gas_kohm_x10;         // 2 bytes: 0.0 to 6553.5 kOhms (0xFFFF if NOT_CONNECTED)
    uint16_t co2_ppm;                  // 2 bytes: 400 to 10,000 ppm (0xFFFF if NOT_CONNECTED)
    uint16_t weight_kg_x100;           // 2 bytes: 0.00 to 200.00 kg (0xFFFF if NOT_CONNECTED)
    uint16_t lux;                      // 2 bytes: 0 to 65,535 Lux (0xFFFF if NOT_CONNECTED)
    uint8_t  tilt_deg;                 // 1 byte: 0 to 90 deg (0xFF if NOT_CONNECTED)
    uint8_t  fft_energy_bands[8];      // 8 bytes: Normalized acoustic sub-bands (0 if silent/absent)
} BeevilLoRaPayload;                   // Exactly 33 Bytes (sizeof == 33)
#pragma pack(pop)
```

### Struct Layout & Field Offset Breakdown

| Offset (Bytes) | Field Name | Data Type | Scaling Factor | Physical Range | Sentinel Value |
| :---: | :--- | :---: | :---: | :---: | :---: |
| `0x00 - 0x01` | `hive_id` | `uint16_t` | $\times 1$ | $1 - 65,535$ | None |
| `0x02 - 0x03` | `brood_core_temp_c_x100`| `int16_t` | $\times 100$ | $-40.00^\circ\text{C} - +85.00^\circ\text{C}$ | `-9999` |
| `0x04 - 0x0D` | `frame_temps_c_x100[5]` | `int16_t[5]`| $\times 100$ | $-40.00^\circ\text{C} - +85.00^\circ\text{C}$ | `-9999` |
| `0x0E - 0x0F` | `humidity_pct_x100` | `uint16_t` | $\times 100$ | $0.00\% - 100.00\%$ | `0xFFFF` |
| `0x10 - 0x11` | `voc_gas_kohm_x10` | `uint16_t` | $\times 10$ | $0.0 - 6553.5\text{ k}\Omega$ | `0xFFFF` |
| `0x12 - 0x13` | `co2_ppm` | `uint16_t` | $\times 1$ | $400 - 10,000\text{ ppm}$ | `0xFFFF` |
| `0x14 - 0x15` | `weight_kg_x100` | `uint16_t` | $\times 100$ | $0.00 - 200.00\text{ kg}$ | `0xFFFF` |
| `0x16 - 0x17` | `lux` | `uint16_t` | $\times 1$ | $0 - 65,535\text{ Lux}$ | `0xFFFF` |
| `0x18` | `tilt_deg` | `uint8_t` | $\times 1$ | $0^\circ - 90^\circ$ | `0xFF` |
| `0x19 - 0x20` | `fft_energy_bands[8]` | `uint8_t[8]`| Normalized 0–255 | 8 Acoustic Sub-Bands | `0x00` |
| **Total Size** | **33 Bytes** | | | | |

* **Size Assertion:** Verified in automated unit tests (`tests/test_firmware_telemetry.py`): `struct.calcsize("<Hh5hHHHHHBBBBBBBBB") == 33`.

---

## 🎛️ Digital Signal Processing (DSP) Pipeline

### 1. CMSIS-DSP 256-Point Real FFT

* **Sampling Rate:** $f_s = 2000\text{ Hz}$ via I2S DMA circular ping-pong buffer.
* **FFT Length:** $N = 256$ points.
* **Frequency Resolution:** $\Delta f = \frac{f_s}{N} = \frac{2000}{256} = \mathbf{7.8125\text{ Hz / bin}}$.
* **Nyquist Frequency:** $f_{\text{Nyquist}} = \frac{f_s}{2} = 1000\text{ Hz}$.
* **Execution Time:** **$1.12\text{ ms}$** on ARM Cortex-M4F @ 64 MHz using `arm_rfft_fast_f32`.
* **Swarm Peak Alignment:** Peak honeybee swarming frequencies ($225\text{ Hz} - 285\text{ Hz}$) map cleanly to bins 29 through 36:
  $$\text{Bin index} = \frac{225\text{ Hz}}{7.8125\text{ Hz}} = 28.8 \approx 29$$
  $$\text{Bin index} = \frac{285\text{ Hz}}{7.8125\text{ Hz}} = 36.48 \approx 36$$

### 2. Page's Recursive CUSUM Thermal Drift Filter

The firmware monitors brood core stability ($T_{\text{core}}$) against a biological target ($34.82^\circ\text{C}$) to detect queen failure and brood chilling hours before colony collapse:

$$S_k = \max\left(0, S_{k-1} + (\mu_0 - T_k) - K\right)$$

* **Nominal Brood Baseline ($\mu_0$):** $34.82^\circ\text{C}$.
* **Slack Parameter ($K$):** $0.15^\circ\text{C}$ allowable variance allowance.
* **Trip Threshold ($h$):** $1.20^\circ\text{C}\cdot\text{hr}$ cumulative cooling deficit.
* **Behavior:** Under steady $34.8^\circ\text{C}$, $S_k$ remains zero. If the brood temperature drops to $31.0^\circ\text{C}$ (queen death or clustering failure), $S_k$ accumulates and sets `ALERT_FLAG_QUEENLESS_CUSUM` (`0x80`) within 3 successive sampling cycles.

### 3. Non-Volatile Flash Blackbox Ring Buffer

* Dedicated 80.6 KB circular ring buffer in internal nRF52840 flash.
* Records the last 14 days of telemetry snapshots at reduced intervals (30-minute logging).
* Preserves data across total battery depletion or RF jamming events, allowing historical readout upon node recovery.

---

## ⏱️ Firmware State Machine & Timing

```
+-------------------------------------------------------------+
| System Tickless Idle / Deep Sleep (298.73 s @ 2.0 µA)       |
+-------------------------------------------------------------+
                              | RTC Wakeup Timer (300 s)
                              v
+-------------------------------------------------------------+
| Sensor Power Rail Enable (P0.12 High)                       |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
| Parallel Sensor Polling & I2S Audio Acquisition (1.20 s)    |
| - TMP117 (I2C) & 5x DS18B20 (1-Wire)                        |
| - SCD41 CO2 (I2C) & BME688 Gas (I2C)                        |
| - Phaeton HX711 Weight & LIS3DH Tilt                        |
| - 256-point I2S audio frame -> CMSIS-DSP FFT execution      |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
| DSP Algorithms: CUSUM Drift + 4-Band Spectral Energy Ratios |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
| 33-Byte Binary Struct Serialization                         |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
| Semtech SX1262 LoRa TX Burst (71.94 ms @ +14 dBm / 118 mA)  |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
| Sensor Rail Power Down & Enter Tickless Sleep               |
+-------------------------------------------------------------+
```
