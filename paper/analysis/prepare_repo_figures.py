"""Copy / crop / downscale repository images used in the paper (no AI-generated images)."""
import sys
from PIL import Image
R, OUT = sys.argv[1], sys.argv[2]
def save(src, dst, box=None, maxw=1600, q=88):
    im = Image.open(R + "/" + src).convert("RGB")
    if box: im = im.crop(box)
    if im.width > maxw: im = im.resize((maxw, round(im.height * maxw / im.width)), Image.LANCZOS)
    im.save(f"{OUT}/{dst}", quality=q, optimize=True)
# real photographs
save("docs/figures/beevil_knievel_gateway_hardware.jpg", "photo_gateway.jpg", (292, 40, 1625, 968))
save("docs/media/02-apiary-problem/real_commercial_apiary.jpg", "photo_usda_apiary.jpg", maxw=1200)
save("docs/media/research/apiary/usda_beekeeper_inspection.jpg", "photo_usda_inspection.jpg", maxw=1200)
# operator-interface screenshots (DEMO mode, synthetic data)
save("docs/figures/beevil_knievel_farmer_companion_app.jpg", "ui_companion.jpg", (735, 50, 1185, 965))
save("docs/media/10-dashboard/dashboard_hive_detail.png", "ui_hive_detail.jpg", (740, 100, 1180, 991))
save("docs/media/10-dashboard/mobile_field_console.png", "ui_field_console.jpg", (740, 100, 1180, 991))
save("docs/media/10-dashboard/playdate_console.png", "ui_playdate.jpg", (560, 80, 1360, 900))
# model-based result plots produced by the repository's deterministic Python/MATLAB scripts
for n in ["acoustic_raw_signal", "acoustic_fft", "acoustic_spectrogram", "acoustic_features",
          "acoustic_event_simulation", "fft_resolution_validation", "hive_thermal_model"]:
    save(f"simulation/results/{n}.png", f"repo_{n}.png", maxw=1800)
print("ok")
