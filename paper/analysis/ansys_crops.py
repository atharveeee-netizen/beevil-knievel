"""Crop the genuine ANSYS Student 2025 R2.4 / 2026 R1 GUI screenshots in the repository into
paper panels (no pixel content is altered other than cropping/composition)."""
import sys
from PIL import Image
R, OUT = sys.argv[1], sys.argv[2]
S = R + "/simulations/"
jobs = {
 "ansys_thermal":  (S + "SIM1/Screenshot 2026-08-23 052026.png", (312, 215, 1500, 830)),
 "ansys_mast_def": (S + "SIM2/Screenshot 2026-08-29 131303.png", (350, 215, 1500, 830)),
 "ansys_mast_vm":  (S + "SIM2/Screenshot 2026-08-29 131311.png", (350, 215, 1500, 830)),
 "ansys_modal":    (S + "SIM3/Screenshot 2026-08-29 142657.png", (350, 215, 1560, 830)),
 "ansys_encl":     (S + "SIM4/Screenshot 2026-08-29 195315.png", (350, 215, 1560, 830)),
 "ansys_speos":    (S + "SIM5/Screenshot 2026-08-29 202221.png", (1100, 360, 1800, 720)),
 "ansys_s11":      (S + "SIM6/Screenshot 2026-09-02 193830.png", (255, 185, 1915, 800)),
}
for name, (p, box) in jobs.items():
    Image.open(p).convert("RGB").crop(box).save(f"{OUT}/{name}.png", optimize=True)
# gain: compose colour legend + 3-D pattern side by side
g = Image.open(S + "SIM6/Screenshot 2026-09-02 193947.png").convert("RGB")
leg, pat = g.crop((255, 185, 520, 545)), g.crop((900, 240, 1480, 650))
canvas = Image.new("RGB", (leg.width + pat.width, max(leg.height, pat.height)), "white")
canvas.paste(leg, (0, 0)); canvas.paste(pat, (leg.width, 0))
canvas.save(f"{OUT}/ansys_gain.png", optimize=True)
print("ok")
