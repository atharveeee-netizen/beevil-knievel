import os
import urllib.request

def ensure_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

# 1. BQ25570 Solar Harvester Reference Design
bq_dir = r"hardware/reference_designs/solar_mppt_bq25570"
ensure_dir(bq_dir)

bq_files = [
    ("https://raw.githubusercontent.com/ceech/BQ25570/master/README.md", "README.md"),
    ("https://raw.githubusercontent.com/ceech/BQ25570/master/Schematic.png", "Schematic.png"),
    ("https://raw.githubusercontent.com/tinstructor/EHM/master/README.md", "EHM_Solar_Harvester_Guide.md")
]

print("Downloading BQ25570 MPPT Solar Harvester Reference Files...")
for url, filename in bq_files:
    dest = os.path.join(bq_dir, filename)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp, open(dest, "wb") as out:
            out.write(resp.read())
        print("  Downloaded:", filename)
    except Exception as e:
        print("  Failed:", filename, str(e))

# 2. Coral Dual M.2 PCIe Adapter Reference Design
coral_dir = r"hardware/reference_designs/coral_dual_m2_pcie"
ensure_dir(coral_dir)

coral_files = [
    ("https://raw.githubusercontent.com/serg987/coral-dual-m2-adapter-pcb/main/readme.md", "README.md"),
    ("https://raw.githubusercontent.com/serg987/coral-dual-m2-adapter-pcb/main/kicad_project/coral-dual-m2-adapter-pcb.kicad_sch", "coral-dual-m2-adapter-pcb.kicad_sch"),
    ("https://raw.githubusercontent.com/serg987/coral-dual-m2-adapter-pcb/main/kicad_project/coral-dual-m2-adapter-pcb.kicad_pcb", "coral-dual-m2-adapter-pcb.kicad_pcb")
]

print("\nDownloading Coral Dual M.2 PCIe Adapter KiCad Files...")
for url, filename in coral_files:
    dest = os.path.join(coral_dir, filename)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp, open(dest, "wb") as out:
            out.write(resp.read())
        print("  Downloaded:", filename)
    except Exception as e:
        print("  Failed:", filename, str(e))

# 3. HX711 Hive Scale Weight Sensor Driver & Reference
hx_dir = r"firmware/sensor_node/lib/HX711"
ensure_dir(hx_dir)

hx_files = [
    ("https://raw.githubusercontent.com/bogde/HX711/master/src/HX711.h", "HX711.h"),
    ("https://raw.githubusercontent.com/bogde/HX711/master/src/HX711.cpp", "HX711.cpp"),
    ("https://raw.githubusercontent.com/bogde/HX711/master/README.md", "README.md")
]

print("\nDownloading HX711 Hive Scale Weight Sensor Drivers...")
for url, filename in hx_files:
    dest = os.path.join(hx_dir, filename)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp, open(dest, "wb") as out:
            out.write(resp.read())
        print("  Downloaded:", filename)
    except Exception as e:
        print("  Failed:", filename, str(e))

print("\nAll remaining hardware and driver imports complete!")
