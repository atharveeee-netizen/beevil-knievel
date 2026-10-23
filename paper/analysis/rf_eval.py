"""Independent evaluation of the gateway Random Forest advisory model (4 features, 4 classes)."""
import sys, json, warnings
import numpy as np, pandas as pd, joblib
import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import StratifiedKFold, cross_val_predict
from sklearn.metrics import confusion_matrix, f1_score, accuracy_score
warnings.filterwarnings("ignore")
R, OUT = sys.argv[1], sys.argv[2]
plt.rcParams.update({"font.family": "serif", "font.size": 8, "axes.linewidth": 0.6})

df = pd.read_csv(f"{R}/Cloud Model/data/Synthetic_Hive_Parametric_Dataset.csv")
F = ["temp_celcius", "audio_peak_hz", "co2_ppm", "weight_kg"]
names = ["Healthy", "Swarming", "Starvation", "Queenless"]
X, y = df[F].values, df["label"].values
res = {"n": int(len(df)), "class_counts": {names[i]: int((y == i).sum()) for i in range(4)}}

# 1) 5-fold stratified CV, same hyper-parameters as repository builder
clf = RandomForestClassifier(n_estimators=100, max_depth=8, random_state=42)
skf = StratifiedKFold(5, shuffle=True, random_state=0)
yp = cross_val_predict(clf, X, y, cv=skf)
res["cv_acc"] = accuracy_score(y, yp); res["cv_macro_f1"] = f1_score(y, yp, average="macro")
cm = confusion_matrix(y, yp)
res["cv_cm"] = cm.tolist()
clf.fit(X, y)
res["importances"] = dict(zip(F, clf.feature_importances_.round(4).tolist()))

# 2) bundled artefact on full data
m = joblib.load(f"{R}/Cloud Model/cloud_advisor_model.joblib")
res["bundled_acc_full"] = accuracy_score(y, m.predict(pd.DataFrame(X, columns=F)))

# 3) robustness: train on clean, test on held-out fold with sensor perturbations
rng = np.random.default_rng(1)
tr = rng.random(len(y)) < 0.8
clf2 = RandomForestClassifier(n_estimators=100, max_depth=8, random_state=42).fit(X[tr], y[tr])
Xte, yte = X[~tr], y[~tr]
scales = np.array([0.5, 40.0, 150.0, 2.5])  # 1x ~ within-class sigma of healthy class
levels = [0, 0.5, 1, 1.5, 2, 3]
rob = []
for s in levels:
    accs, f1s = [], []
    for rep in range(20):
        Xn = Xte + rng.normal(0, 1, Xte.shape) * scales * s
        p = clf2.predict(Xn); accs.append(accuracy_score(yte, p)); f1s.append(f1_score(yte, p, average="macro"))
    rob.append((s, float(np.mean(accs)), float(np.mean(f1s)), float(np.std(f1s))))
res["robustness"] = rob
# single-sensor dropout (feature replaced by healthy-class median) -> macro F1
med = np.median(X[y == 0], axis=0)
drop = {}
for j, f in enumerate(F):
    Xd = Xte.copy(); Xd[:, j] = med[j]
    drop[f] = float(f1_score(yte, clf2.predict(Xd), average="macro"))
res["dropout_macro_f1"] = drop
json.dump(res, open(f"{OUT}/rf_eval.json", "w"), indent=1, default=float)
print(json.dumps(res, indent=1, default=float))

# Figure: (a) CV confusion matrix (normalised) (b) robustness curve + dropout bars
fig, ax = plt.subplots(1, 3, figsize=(7.16, 2.15), gridspec_kw={"width_ratios": [1.05, 1, 1]})
cmn = cm / cm.sum(1, keepdims=True)
im = ax[0].imshow(cmn, cmap="Blues", vmin=0, vmax=1)
for i in range(4):
    for j in range(4):
        ax[0].text(j, i, f"{cm[i,j]}", ha="center", va="center", fontsize=7, color="white" if cmn[i,j] > .5 else "black")
ax[0].set_xticks(range(4)); ax[0].set_xticklabels(names, rotation=30, ha="right", fontsize=6.5)
ax[0].set_yticks(range(4)); ax[0].set_yticklabels(names, fontsize=6.5)
ax[0].set_xlabel("Predicted"); ax[0].set_ylabel("True"); ax[0].set_title("(a) 5-fold CV (clean)", fontsize=8)
s_, a_, f_, sd_ = zip(*rob)
ax[1].errorbar(s_, f_, yerr=sd_, marker="o", ms=3, lw=1, color="#1f4e79", capsize=2, label="macro-F1")
ax[1].plot(s_, a_, "s--", ms=3, lw=0.8, color="#c55a11", label="accuracy")
ax[1].set_xlabel(r"Injected noise ($\times$ in-class $\sigma$)"); ax[1].set_ylim(0.4, 1.02)
ax[1].grid(alpha=.3, lw=.4); ax[1].legend(fontsize=6.5, frameon=False); ax[1].set_title("(b) Sensor-noise robustness", fontsize=8)
lab = ["Temp", "Audio pk", "CO$_2$", "Weight"]
ax[2].bar(lab, [drop[f] for f in F], color=["#7f7f7f", "#1f4e79", "#2e75b6", "#9dc3e6"], width=.6)
ax[2].axhline(rob[0][2], color="k", ls=":", lw=.8)
for i, f in enumerate(F): ax[2].text(i, min(drop[f] + .02, 0.93) if drop[f] < 0.95 else 0.88, f"{drop[f]:.2f}", ha="center", fontsize=6.5, color="white" if drop[f] >= 0.95 else "black")
ax[2].set_ylim(0, 1.1); ax[2].set_ylabel("macro-F1"); ax[2].set_title("(c) Single-sensor dropout", fontsize=8)
ax[2].grid(axis="y", alpha=.3, lw=.4)
fig.tight_layout(pad=0.3)
fig.savefig(f"{OUT}/fig_rf_eval.pdf"); fig.savefig(f"{OUT}/fig_rf_eval.png", dpi=200)
