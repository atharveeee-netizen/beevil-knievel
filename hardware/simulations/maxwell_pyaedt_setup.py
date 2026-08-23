# ANSYS Maxwell 3D PyAEDT Automation Script for Beevil Knievel EMI/EMC
import os
try:
    from pyaedt import Maxwell3d
except ImportError:
    print("PyAEDT not found in environment. Please run inside ANSYS AEDT Python environment.")
    raise

# Initialize Maxwell 3D Session (Eddy Current / Transient Magnetic)
maxwell = Maxwell3d(specified_version="2024.1", non_graphical=False, new_desktop_session=False)
maxwell.set_active_design("Beevil_Knievel_MPPT_EMI_Shielding")
maxwell.modeler.model_units = "mm"

# 1. Create Shielded SMD Inductor Core (Ferrite Drum + Ring)
inductor_core = maxwell.modeler.create_cylinder(
    orientation="Z",
    origin=["0", "0", "0"],
    radius="3.5",
    height="4.0",
    name="Inductor_Ferrite_Core",
    matname="ferrite_n30"
)

# 2. Create MPPT High-di/dt Switched Coil Winding
coil = maxwell.modeler.create_cylinder(
    orientation="Z",
    origin=["0", "0", "0.5"],
    radius="3.8",
    height="3.0",
    name="SMPS_Coil_Winding",
    matname="copper"
)
maxwell.assign_current(coil.name, amplitude="2.2A", frequency="1200.0kHz")

# 3. Create Solid PCB Ground Reference Plane
pcb_gnd = maxwell.modeler.create_rectangle(
    orientation="XY",
    origin=["-30", "-25", "-1.6"],
    sizes=["60", "50"],
    name="PCB_GND_Plane",
    matname="copper"
)

# 4. Create RF Shield Can (Nickel-Silver C770 Wall t=0.2mm)
shield_can = maxwell.modeler.create_box(
    origin=["9.0", "-6", "0"],
    sizes=["12", "12", "3.0"],
    name="LoRa_RF_Shield_Can",
    matname="nickel_silver_c770"
)

# 5. Setup Solution Setup (Eddy Current Mode)
setup = maxwell.create_setup(name="EddyCurrentEMI")
setup.props["Frequency"] = "1200.0kHz"
setup.props["MaximumPasses"] = 10
setup.props["PercentError"] = 1.0

print("ANSYS Maxwell 3D project setup completed successfully.")
