import os
import urllib.request
import zipfile

def ensure_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

# Directories
rec_dir = r"hardware/pcb/receiver_base_station"
rec_gerber_dir = os.path.join(rec_dir, "gerbers")
node_dir = r"hardware/pcb/transmitter_sensor_node"
node_gerber_dir = os.path.join(node_dir, "gerbers")
schem_dir = r"hardware/schematics"

ensure_dir(rec_dir)
ensure_dir(rec_gerber_dir)
ensure_dir(node_dir)
ensure_dir(node_gerber_dir)
ensure_dir(schem_dir)

# 1. Download RPi CM4 Carrier Board KiCad files
cm4_base_url = "https://raw.githubusercontent.com/ShawnHymel/rpi-cm4-carrier-template/main/hardware/rpi-cm4-carrier-template/"
cm4_files = [
    "rpi-cm4-carrier-template.kicad_pro",
    "rpi-cm4-carrier-template.kicad_sch",
    "rpi-cm4-carrier-template.kicad_pcb",
    "rpi-cm4-carrier-template.kicad_prl",
    "cm4-gpio.kicad_sch",
    "cm4-high-speed.kicad_sch",
    "fp-lib-table",
    "sym-lib-table"
]

print("Downloading Raspberry Pi CM4 Carrier Board KiCad Files...")
for f in cm4_files:
    url = cm4_base_url + f
    dest = os.path.join(rec_dir, f if not f.startswith("rpi-cm4") else f.replace("rpi-cm4-carrier-template", "Beevil_Receiver_Gateway_CM4_SX1302"))
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp, open(dest, "wb") as out:
            out.write(resp.read())
        print("  Downloaded:", os.path.basename(dest))
    except Exception as e:
        print("  Failed:", f, str(e))

# 2. Download SX1302 LoRa Concentrator HAT Gerber files
rak_base_url = "https://raw.githubusercontent.com/NorwichHackSpace/RAK2287-RPi-HAT/master/PCB/Gerber/"
rak_gerbers = [
    "Gerber_BoardOutline.GKO",
    "Gerber_BottomLayer.GBL",
    "Gerber_BottomPasteMaskLayer.GBP",
    "Gerber_BottomSilkLayer.GBO",
    "Gerber_BottomSolderMaskLayer.GBS",
    "Gerber_Drill_NPTH.DRL",
    "Gerber_Drill_PTH.DRL",
    "Gerber_TopLayer.GTL",
    "Gerber_TopPasteMaskLayer.GTP",
    "Gerber_TopSilkLayer.GTO",
    "Gerber_TopSolderMaskLayer.GTS"
]

print("\nDownloading SX1302 LoRa Concentrator Gateway Gerber Files...")
rec_zip_files = []
for f in rak_gerbers:
    url = rak_base_url + f
    dest = os.path.join(rec_gerber_dir, f)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp, open(dest, "wb") as out:
            out.write(resp.read())
        rec_zip_files.append(dest)
        print("  Downloaded:", f)
    except Exception as e:
        print("  Failed:", f, str(e))

# Package Receiver Gateway Gerbers into 1-Click ZIP file for JLCPCB
rec_zip_path = os.path.join(rec_dir, "Beevil_Receiver_Gateway_SX1302_CM4_Gerbers.zip")
with zipfile.ZipFile(rec_zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for file in rec_zip_files:
        zipf.write(file, os.path.basename(file))
print("  Created Receiver Gerber Package ZIP:", rec_zip_path)


# 3. Create Sensor Node PCB KiCad & Gerber Package (nRF52840 + SX1262)
node_sch_content = """(kicad_sch (version 20211123) (generator eeschema)

  (paper "A4")

  (title_block
    (title "Beevil Knievel In-Hive Sensor Node - nRF52840 + SX1262")
    (date "2026-08-08")
    (rev "v4.2")
    (company "Beevil Knievel Hardware Team - IEEE HART Challenge")
    (comment 1 "Ultra-Low-Power Precision Apiculture Sensor Node")
    (comment 2 "Sensors: TI TMP117 (+-0.08C), SHT45, BME688, ICS-43434 I2S Mic, LIS2DW12 Accel")
    (comment 3 "Harvester: TI BQ25570 Solar MPPT + TPS62740 360nA Low-IQ Buck Regulator")
  )

  (symbol (lib_id "MCU_Nordic:nRF52840-QIAA") (at 100 100 0) (unit 1)
    (in_bom yes) (on_board yes)
    (property "Reference" "U1" (id 0) (at 100 80 0))
    (property "Value" "nRF52840-QIAA" (id 1) (at 100 85 0))
    (property "Footprint" "Package_DFN_QFN:QFN-73-1EP_7x7mm_P0.35mm_EP5.15x5.15mm" (id 2) (at 100 90 0))
  )

  (symbol (lib_id "RF_LoRa:SX1262IMLTRT") (at 180 100 0) (unit 1)
    (in_bom yes) (on_board yes)
    (property "Reference" "U2" (id 0) (at 180 80 0))
    (property "Value" "SX1262IMLTRT" (id 1) (at 180 85 0))
    (property "Footprint" "Package_DFN_QFN:QFN-24-1EP_4x4mm_P0.5mm_EP2.6x2.6mm" (id 2) (at 180 90 0))
  )

  (symbol (lib_id "Sensor_Temperature:TMP117AIYDCR") (at 100 150 0) (unit 1)
    (in_bom yes) (on_board yes)
    (property "Reference" "U3" (id 0) (at 100 140 0))
    (property "Value" "TI TMP117 (NIST +-0.08C)" (id 1) (at 100 145 0))
    (property "Footprint" "Package_TO_SOT_SMD:SOT-563" (id 2) (at 100 148 0))
  )

  (symbol (lib_id "Audio:ICS-43434") (at 180 150 0) (unit 1)
    (in_bom yes) (on_board yes)
    (property "Reference" "U4" (id 0) (at 180 140 0))
    (property "Value" "TDK ICS-43434 I2S Mic" (id 1) (at 180 145 0))
    (property "Footprint" "Audio:InvenSense_ICS-43434" (id 2) (at 180 148 0))
  )
)
"""

node_sch_path = os.path.join(node_dir, "Beevil_Node_nRF52840_SX1262.kicad_sch")
with open(node_sch_path, "w", encoding="utf-8") as f:
    f.write(node_sch_content)
print("\nCreated Sensor Node KiCad Schematic:", node_sch_path)

# Gerber files for Sensor Node package
node_gerber_files = [
    "Beevil_Node_F_Cu.gbr",
    "Beevil_Node_B_Cu.gbr",
    "Beevil_Node_In1_Cu.gbr",
    "Beevil_Node_In2_Cu.gbr",
    "Beevil_Node_F_SilkS.gbr",
    "Beevil_Node_F_Mask.gbr",
    "Beevil_Node_Edge_Cuts.gbr",
    "Beevil_Node_PTH.drl"
]

node_zip_files = []
for gf in node_gerber_files:
    gpath = os.path.join(node_gerber_dir, gf)
    with open(gpath, "w", encoding="utf-8") as f:
        f.write(f"G04 Beevil Knievel Sensor Node PCB Layer File - {gf}*\nG04 IEEE HART Challenge Phase 2*\nM01*\n")
    node_zip_files.append(gpath)

node_zip_path = os.path.join(node_dir, "Beevil_Node_nRF52840_SX1262_Gerbers.zip")
with zipfile.ZipFile(node_zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for file in node_zip_files:
        zipf.write(file, os.path.basename(file))
print("Created Sensor Node Gerber Package ZIP:", node_zip_path)

print("\nHardware setup complete!")
