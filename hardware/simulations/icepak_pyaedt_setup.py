# ANSYS Icepak PyAEDT Automation Script for Beevil Knievel Gateway Thermal CFD
import os
try:
    from pyaedt import Icepak
except ImportError:
    print("PyAEDT not found in environment. Please run inside ANSYS AEDT Python environment.")
    raise

# Initialize Icepak Session
icepak = Icepak(specified_version="2024.1", non_graphical=False, new_desktop_session=False)
icepak.set_active_design("Beevil_Knievel_Gateway_Thermal_CFD")
icepak.modeler.model_units = "mm"

# 1. Create Enclosure Cabinet (IP67 Sealed Housing)
cabinet = icepak.modeler.create_box(
    origin=["-90", "-65", "0"],
    sizes=["180", "130", "60"],
    name="Enclosure_Cabinet",
    matname="polycarbonate_enclosure"
)

# 2. Create Aluminum 6061 Heatsink Lid
heatsink_lid = icepak.modeler.create_box(
    origin=["-85", "-60", "50"],
    sizes=["170", "120", "10"],
    name="Aluminum_Heatsink_Lid",
    matname="aluminum_6061_t6"
)

# 3. Create Gateway 6-Layer PCB Carrier
pcb = icepak.modeler.create_box(
    origin=["-80", "-55", "20"],
    sizes=["160", "110", "1.6"],
    name="Carrier_PCB_6Layer",
    matname="FR4_pcb"
)

# 4. Create CM4 SoC Block and Source
soc = icepak.modeler.create_box(
    origin=["-7.5", "-7.5", "21.6"],
    sizes=["15", "15", "1.0"],
    name="BCM2711_SoC",
    matname="silicon"
)
icepak.assign_block_source(soc.name, power="5.2W")

# 5. Create SX1302 Concentrator Block and Source
sx1302 = icepak.modeler.create_box(
    origin=["25", "-25", "21.6"],
    sizes=["30", "50", "1.5"],
    name="RAK2287_LoRaWAN",
    matname="silicon"
)
icepak.assign_block_source(sx1302.name, power="1.6W")

# 6. Thermal Interface Material (TIM Pad k=6.0 W/m-K)
tim_pad = icepak.modeler.create_box(
    origin=["-10", "-10", "22.6"],
    sizes=["20", "20", "1.5"],
    name="Thermal_TIM_Pad",
    matname="thermal_pad_silicone"
)

# 7. Ambient Conditions & Solar Flux Boundary
icepak.ambient_temperature = "45.0C"
icepak.assign_surface_radiation(
    heatsink_lid.name,
    emissivity=0.85
)

# 8. Setup Solution Parameters
setup = icepak.create_setup(name="SteadyStateCFD")
setup.props["Flow Regime"] = "Laminar"
setup.props["Include Radiation"] = True
setup.props["Include Solar Radiation"] = True
setup.props["Solar Radiation Flux"] = "1000.0W/m2"
setup.props["Convergence Criterion - Flow"] = 0.001
setup.props["Convergence Criterion - Energy"] = 1e-7
setup.props["Number of Iterations"] = 250

print("ANSYS Icepak project setup completed successfully.")
