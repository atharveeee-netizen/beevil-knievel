# Protocol HT-04: Temperature Sensor Two-Point Bench Calibration
**Provenance Tag:** `REAL_BENCH_MEASUREMENT`  
**Target Sensors:** DS18B20 1-Wire probe (in-hive broodnest probe), Sensirion SHTC3 (ambient internal relative humidity/temperature), RAK4631 internal MCU die temperature sensor.  
**Reference Instrument:** Calibrated NIST-traceable reference thermometer (or precision RTD Pt100 / ASTM mercury standard thermometer $\pm 0.05^\circ\text{C}$).  

---

## 1. Objectives & Preregistered Deliverables
1. **Zero Point ($0.0^\circ\text{C}$ Ice Bath):** Measure offset $\Delta T_0 = T_{\text{sensor}} - 0.00^\circ\text{C}$ in an insulated distilled ice-water slush bath.
2. **Warm Point ($35.0^\circ\text{C}$ Broodnest Core Simulant):** Measure offset $\Delta T_{35} = T_{\text{sensor}} - 35.00^\circ\text{C}$ in a stirred, thermally insulated warm water bath held at honeybee brood incubation temperature ($34.5 - 35.5^\circ\text{C}$).
3. **Linearity & Gain Correction:** Compute gain slope $\alpha$ and bias $\beta$ such that:
   $$T_{\text{calibrated}} = \alpha \cdot T_{\text{raw}} + \beta$$
4. **Sensor Sentinel Verification:** Verify that disconnecting the 1-Wire data line immediately triggers firmware error sentinel `-9999` ($0\text{x8000}$ / sensor fault code), confirming failure detection.

---

## 2. Test Setup & Equipment Configuration

1. **Ice Point Bath ($0.0^\circ\text{C}$):**
   - Fill an insulated vacuum Dewar or double-walled beaker with crushed ice made from distilled water.
   - Add distilled water until voids between ice chips are filled; stir thoroughly.
   - Insert DS18B20 probe and reference thermometer into the center of the slush (not touching container walls).
   - Allow 10 minutes thermal equilibration before recording.

2. **Warm Brood Core Bath ($35.0^\circ\text{C}$):**
   - Use a digitally controlled laboratory circulating water bath (or stirred heated vessel) stabilized at $35.00 \pm 0.05^\circ\text{C}$.
   - Submerge DS18B20 sealed probe and reference probe in close proximity ($< 1\text{ cm}$).
   - Allow 10 minutes thermal equilibration.

---

## 3. Step-by-Step Bench Protocol

1. Connect node to PC via USB serial monitor.
2. Run data collection logger:
   ```bash
   python -m paper_q1.bench_tools.log_calibration_run --port COM4 --sensor ds18b20
   ```
3. Take 100 consecutive readings at $0.0^\circ\text{C}$ slush.
4. Transfer probe to $35.0^\circ\text{C}$ bath and take 100 consecutive readings.
5. Disconnect DQ line to verify `-9999` sentinel reporting.
6. Save raw logs to `paper_q1/bench_raw/temp_calibration_20261023.csv`.

---

## 4. Ingestion & Analysis
Run parsing script:
```bash
python -m paper_q1.bench_tools.parse_temp_cal --input paper_q1/bench_raw/temp_calibration_20261023.csv
```
This produces `paper_q1/results/measured_temp_calibration.json` with measured mean offsets and residuals, auto-updating `numbers.tex`.
