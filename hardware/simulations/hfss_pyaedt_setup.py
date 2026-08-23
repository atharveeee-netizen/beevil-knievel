# ANSYS HFSS PyAEDT Automation Script for Beevil Knievel IN865 Antenna
import os
try:
    from pyaedt import Hfss
except ImportError:
    print("PyAEDT not found in environment. Please run inside ANSYS AEDT Python environment.")
    raise

# Initialize HFSS Project
hfss = Hfss(specified_version="2024.1", non_graphical=False, new_desktop_session=False)
hfss.set_active_design("Beevil_Knievel_IN865_Antenna")
hfss.modeler.model_units = "mm"

# 1. Create Ground Plane (PCB FR4 & Bottom Copper)
pcb = hfss.modeler.create_box(
    origin=["-30.0", "-25.0", "-1.6"],
    sizes=["60.0", "50.0", "1.6"],
    name="FR4_PCB",
    matname="FR4_epoxy"
)
gnd = hfss.modeler.create_rectangle(
    orientation="XY",
    origin=["-30.0", "-25.0", "-1.6"],
    sizes=["60.0", "50.0"],
    name="GroundPlane",
    matname="copper"
)
hfss.assign_perfecte_to_sheets(gnd.name)

# 2. Create Monopole Antenna Element
monopole = hfss.modeler.create_cylinder(
    orientation="Z",
    origin=["0", "0", "0"],
    radius="0.405",
    height="82.49",
    name="LoRa_Antenna_Monopole",
    matname="copper"
)
hfss.assign_perfecte_to_sheets(monopole.name)

# 3. Create Lumped Port (50 Ohm)
port_sheet = hfss.modeler.create_rectangle(
    orientation="XZ",
    origin=["-0.405", "0", "-1.6"],
    sizes=["0.81", "1.6"],
    name="PortSheet"
)
hfss.create_lumped_port_to_sheet(
    sheet_name=port_sheet.name,
    port_name="Port1",
    impedance="50ohm",
    start_point=["0", "0", "-1.6"],
    end_point=["0", "0", "0"]
)

# 4. Create Hive Wood Wall Dielectric Slab
hive_wood = hfss.modeler.create_box(
    origin=["-150", "20", "-50"],
    sizes=["300", "19.05", "200"],
    name="Langstroth_Pine_Wall",
    matname="langstroth_pine_wood"
)

# 5. Create Wet Honeycomb Slab
honeycomb = hfss.modeler.create_box(
    origin=["-150", "45", "-50"],
    sizes=["300", "30.0", "200"],
    name="Wet_Honeycomb_Comb",
    matname="wet_honeycomb_honey"
)

# 6. Radiation Air Boundary (PML / Open Region)
rad_box = hfss.modeler.create_box(
    origin=["-180", "-100", "-100"],
    sizes=["360", "250", "300"],
    name="Radiation_Cavity",
    matname="air"
)
hfss.assign_radiation_boundary_to_objects(rad_box.name)

# 7. Setup Adaptive Solution Setup
setup = hfss.create_setup(name="Setup865MHz")
setup.props["Frequency"] = "865MHz"
setup.props["MaximumPasses"] = 12
setup.props["MaxDeltaS"] = 0.01

# 8. Setup Fast Frequency Sweep (800 MHz to 930 MHz)
sweep = setup.insert_sweep(
    sweep_type="Interpolating",
    start_freq="800MHz",
    stop_freq="930MHz",
    count=261,
    name="Sweep_IN865_EU868"
)

print("HFSS Project setup completed successfully. Ready for adaptive mesh & solve.")
