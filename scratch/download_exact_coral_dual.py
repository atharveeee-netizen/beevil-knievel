import os, urllib.request

coral_dir = r"hardware/reference_designs/coral_dual_m2_pcie"
if not os.path.exists(coral_dir):
    os.makedirs(coral_dir)

files = [
    ("https://raw.githubusercontent.com/serg987/coral-dual-m2-adapter-pcb/master/readme.md", "README.md"),
    ("https://raw.githubusercontent.com/serg987/coral-dual-m2-adapter-pcb/master/kicad_project/m2_coral_dual_adapter/m2_coral_dual_adapter.kicad_sch", "m2_coral_dual_adapter.kicad_sch"),
    ("https://raw.githubusercontent.com/serg987/coral-dual-m2-adapter-pcb/master/kicad_project/m2_coral_dual_adapter/m2_coral_dual_adapter.kicad_pcb", "m2_coral_dual_adapter.kicad_pcb"),
    ("https://raw.githubusercontent.com/serg987/coral-dual-m2-adapter-pcb/master/kicad_project/m2_coral_dual_adapter/m2_coral_dual_adapter.kicad_pro", "m2_coral_dual_adapter.kicad_pro"),
    ("https://raw.githubusercontent.com/serg987/coral-dual-m2-adapter-pcb/master/kicad_project/m2_coral_dual_adapter/sym-lib-table", "sym-lib-table"),
    ("https://raw.githubusercontent.com/serg987/coral-dual-m2-adapter-pcb/master/kicad_project/m2_coral_dual_adapter/fp-lib-table", "fp-lib-table")
]

print("Downloading exact Coral Dual M.2 PCIe Adapter KiCad Files...")
for url, filename in files:
    dest = os.path.join(coral_dir, filename)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp, open(dest, "wb") as out:
            out.write(resp.read())
        print("  Downloaded:", filename)
    except Exception as e:
        print("  Failed:", filename, str(e))

print("Exact Coral Dual M.2 PCIe files downloaded!")
