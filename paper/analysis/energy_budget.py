"""Bottom-up charge budget of the field node per reporting cycle (datasheet typical values)."""
import sys, json
import numpy as np
import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt
OUT = sys.argv[1]
plt.rcParams.update({"font.family": "serif", "font.size": 8, "axes.linewidth": 0.6})
T = 300.0       # s, nominal reporting interval
TOA = 0.07194   # s, 33 B @ SF7/BW125/CR4/5 (computed)

def budget(T=300.0, co2_every=1, co2_gated=False, audio_s=1.0, i_sleep_uA=5.0, i_tx_mA=92.0):
    """Return dict of charge per cycle [mA*s] for each subsystem."""
    q = {}
    q["Sleep floor (MCU+radio+board)"] = i_sleep_uA * 1e-3 * T
    # SCD41: datasheet avg 0.45 mA at one single-shot per 5 min (includes idle between shots).
    # Decomposed as ~5 s x 18 mA per shot (= 90 mA s) + ~0.15 mA idle; power-gating removes idle.
    shot, idle = 90.0, 0.15
    if co2_gated:
        q["CO$_2$ (SCD41)"] = shot / co2_every
    else:
        q["CO$_2$ (SCD41)"] = (0.45 * 300.0 if co2_every == 1 and T == 300 else shot / co2_every + idle * T)
    q["Frame grid (5$\\times$DS18B20)"] = 5 * 1.0 * 0.75
    q["Gas/RH (BME688)"] = 12.0 * 0.15
    q["Load cell (HX711+bridge)"] = (1.5 + 3.0) * 0.8
    q["Audio (INMP441+MCU)"] = (1.4 + 3.3) * audio_s
    q["MCU housekeeping"] = 3.3 * 0.3
    q["Core temp (TMP117)"] = 0.135 * 0.0155
    q["LoRa TX (SX1262)"] = i_tx_mA * TOA
    return q

SD = 0.02  # Li-ion self-discharge per month (fraction of capacity), first-order approximation

def life_days(Iavg_mA, cap_mAh, sd=SD):
    i_sd = cap_mAh * sd / (30 * 24)  # equivalent self-discharge current [mA]
    return cap_mAh / ((Iavg_mA + i_sd) * 24)

def summary(q, T, cap_mAh=2600.0):
    Q = sum(q.values()); Iavg = Q / T; day = Iavg * 24
    return {"Q_cycle_mAs": round(Q, 2), "I_avg_mA": round(Iavg, 4), "mAh_per_day": round(day, 2),
            "days_2600mAh_no_sd": round(cap_mAh / day, 1),
            "days_2600mAh_sd2pct": round(life_days(Iavg, cap_mAh), 1)}

cases = {
    "A: all sensors every 5 min (CO2 not gated)": dict(),
    "B: CO2 every 30 min, power-gated": dict(co2_every=6, co2_gated=True),
    "C: B + no CO2 sensor": None,
}
res = {}
for name, kw in cases.items():
    if kw is None:
        q = budget(co2_every=6, co2_gated=True); q["CO$_2$ (SCD41)"] = 0.0
    else:
        q = budget(**kw)
    res[name] = {"components_mAs": {k: round(v, 3) for k, v in q.items()}, **summary(q, T)}
# battery life vs interval for different capacities (case B policy: CO2 every 30 min)
Ts = np.array([60, 120, 300, 600, 900, 1800])
life = {}
for cap in [1000, 2600, 3000]:
    life[cap] = []
    for t in Ts:
        k = max(1, int(round(1800 / t)))  # CO2 measured every ~30 min
        q = budget(T=float(t), co2_every=k, co2_gated=True)
        life[cap].append(life_days(sum(q.values()) / t, cap))
res["life_days_caseB_vs_T"] = {str(c): dict(zip(map(int, Ts), np.round(v, 0).tolist())) for c, v in life.items()}
# solar: 6 V / 100 mA (0.6 W) panel, linear charger, PSH = peak-sun-hours
eta = 0.6
res["solar_mAh_per_day"] = {str(psh): round(0.6 * psh * eta / 3.7 * 1000, 0) for psh in [0.5, 1, 2, 5]}
json.dump(res, open(f"{OUT}/energy_budget.json", "w"), indent=1)
print(json.dumps(res, indent=1))

# figure
fig, ax = plt.subplots(1, 2, figsize=(7.16, 2.75), gridspec_kw={"width_ratios": [1.25, 1]})
names = list(res.keys())[:3]
comps = list(res[names[0]]["components_mAs"].keys())
cols = plt.cm.tab10(np.arange(len(comps)))
left = np.zeros(3)
for c, col in zip(comps, cols):
    vals = np.array([res[n]["components_mAs"][c] for n in names])
    ax[0].barh(range(3), vals, left=left, color=col, height=.55, label=c)
    left += vals
for i, n in enumerate(names):
    iavg_uA = sum(res[n]["components_mAs"].values()) / T * 1e3
    ax[0].text(left[i] + 2, i, f'{iavg_uA:.0f} $\\mu$A avg', va="center", fontsize=6.5)
ax[0].set_yticks(range(3)); ax[0].set_yticklabels(["A: all 5-min", "B: CO$_2$ 30-min,\ngated", "C: no CO$_2$"], fontsize=7)
ax[0].invert_yaxis(); ax[0].set_xlabel("Charge per 300-s cycle [mA$\\cdot$s]"); ax[0].set_xlim(0, 200)
ax[0].legend(fontsize=5.6, ncol=3, frameon=False, loc="upper center", bbox_to_anchor=(0.45, -0.25),
             columnspacing=0.8, handlelength=1.2)
ax[0].set_title("(a) Bottom-up charge budget (datasheet typ.)", fontsize=8)
for cap, ls in zip([1000, 2600, 3000], [":", "-", "--"]):
    ax[1].loglog(Ts / 60, life[cap], ls, color="#1f4e79", lw=1, marker="o", ms=2.5, label=f"{cap} mAh")
ax[1].axvline(5, color="gray", ls=":", lw=.7)
ax[1].set_xlabel("Reporting interval [min]"); ax[1].set_ylabel("Autonomy, no solar [days]")
ax[1].legend(fontsize=6.5, frameon=False); ax[1].grid(alpha=.3, lw=.4, which="both")
from matplotlib.ticker import FixedLocator, NullFormatter, ScalarFormatter
ax[1].yaxis.set_major_locator(FixedLocator([100, 200, 400, 800])); ax[1].yaxis.set_major_formatter(ScalarFormatter())
ax[1].yaxis.set_minor_formatter(NullFormatter())
ax[1].xaxis.set_major_locator(FixedLocator([1, 2, 5, 10, 30])); ax[1].xaxis.set_major_formatter(ScalarFormatter())
ax[1].xaxis.set_minor_formatter(NullFormatter())
ax[1].set_title("(b) Policy B autonomy vs. interval", fontsize=8)
fig.tight_layout(pad=0.3)
fig.savefig(f"{OUT}/fig_energy.pdf"); fig.savefig(f"{OUT}/fig_energy.png", dpi=200)
