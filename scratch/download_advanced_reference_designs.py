import os
import urllib.request

ref_dir = r"hardware/reference_designs/coral_tpu_nrf52840"
if not os.path.exists(ref_dir):
    os.makedirs(ref_dir)

base_url = "https://raw.githubusercontent.com/antmicro/m2-smart-iot-module/master/"
files = [
    "m2-smart-iot-module.sch",
    "m2-smart-iot-module.kicad_pcb",
    "nRF52840.sch",
    "coralAccelerator.sch",
    "pcie-usb-bridge.sch",
    "powerSupply.sch",
    "M2-Pins.sch",
    "README.rst"
]

print("Downloading Antmicro nRF52840 + Google Coral Edge TPU KiCad Reference Files...")
for f in files:
    url = base_url + f
    dest = os.path.join(ref_dir, f)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp, open(dest, "wb") as out:
            out.write(resp.read())
        print("  Downloaded:", f)
    except Exception as e:
        print("  Failed:", f, str(e))

print("Advanced reference design files download complete!")
