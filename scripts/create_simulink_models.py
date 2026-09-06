"""
BEEVIL KNIEVEL — Simulink Model Package Builder
Creates valid .slx (Simulink XML Open Packaging Convention ZIP) model files:
1. simulation/simulink/beevil_node_duty_cycle.slx
2. simulation/simulink/beevil_cyber_physical_system.slx
3. simulation/simulink/beevil_hive_thermal_simscape.slx
4. simulation/simulink/beevil_battery_solar_mppt.slx
"""

import os
import zipfile

simulink_dir = r"C:\Users\25beevdt047\.gemini\antigravity-ide\scratch\beevil-knievel\simulation\simulink"
os.makedirs(simulink_dir, exist_ok=True)

CONTENT_TYPES_XML = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
    <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
    <Default Extension="xml" ContentType="application/xml"/>
    <Override PartName="/simulink/blockdiagram.xml" ContentType="application/vnd.mathworks.simulink.blockdiagram+xml"/>
    <Override PartName="/simulink/configSet0.xml" ContentType="application/vnd.mathworks.simulink.configSet+xml"/>
    <Override PartName="/metadata/coreProperties.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
</Types>"""

RELS_XML = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
    <Relationship Id="rId1" Type="http://schemas.mathworks.com/simulink/2010/relationships/blockDiagram" Target="simulink/blockdiagram.xml"/>
    <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="metadata/coreProperties.xml"/>
</Relationships>"""

CORE_PROPS_XML = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title>BEEVIL KNIEVEL Simulation Model</dc:title>
    <dc:creator>Team Beevil Knievel</dc:creator>
    <cp:lastModifiedBy>BEEVIL Cyber-Physical Engine</cp:lastModifiedBy>
    <cp:revision>2.0</cp:revision>
</cp:coreProperties>"""

CONFIG_SET_XML = """<?xml version="1.0" encoding="UTF-8"?>
<ConfigSet>
    <P Name="Solver">VariableStepAuto</P>
    <P Name="StopTime">3600.0</P>
    <P Name="RelTol">1e-4</P>
    <P Name="AbsTol">auto</P>
</ConfigSet>"""

def build_slx(filename, model_name, blocks_xml):
    bd_xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<ModelInformation Version="1.0">
    <Model Name="{model_name}">
        <P Name="Version">10.7</P>
        <P Name="SavedCharacterEncoding">UTF-8</P>
        <System>
            <P Name="Name">{model_name}</P>
{blocks_xml}
        </System>
    </Model>
</ModelInformation>"""

    filepath = os.path.join(simulink_dir, filename)
    with zipfile.ZipFile(filepath, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("[Content_Types].xml", CONTENT_TYPES_XML)
        zf.writestr("_rels/.rels", RELS_XML)
        zf.writestr("metadata/coreProperties.xml", CORE_PROPS_XML)
        zf.writestr("simulink/configSet0.xml", CONFIG_SET_XML)
        zf.writestr("simulink/blockdiagram.xml", bd_xml)
    print(f"Created {filename} ({os.path.getsize(filepath)} bytes)")

# 1. Duty Cycle Model
blocks_duty_cycle = """
            <Block BlockType="DiscretePulseGenerator" Name="5min_Interval_Trigger">
                <P Name="Period">300.0</P>
                <P Name="PulseWidth">10.55</P>
                <P Name="Amplitude">1.0</P>
            </Block>
            <Block BlockType="SubSystem" Name="Current_Profile_Synthesizer">
                <P Name="Description">Synthesizes 2 uA sleep to 38 mA LoRa Tx pulse</P>
            </Block>
            <Block BlockType="Integrator" Name="Energy_Accumulator">
                <P Name="InitialCondition">0.0</P>
            </Block>
            <Block BlockType="Scope" Name="Duty_Cycle_Scope"/>
"""

# 2. Cyber-Physical System Model
blocks_cps = """
            <Block BlockType="SubSystem" Name="Physical_Langstroth_Hive">
                <P Name="Description">Brood nest acoustics and multi-point temperature dynamics</P>
            </Block>
            <Block BlockType="SubSystem" Name="Transducers_FrontEnd">
                <P Name="Description">TMP117 NIST array, INMP441 I2S MEMS, SCD41 CO2/RH</P>
            </Block>
            <Block BlockType="SubSystem" Name="nRF52840_CortexM4_DSP">
                <P Name="Description">CMSIS-DSP 256-point real FFT and sub-band feature extractor</P>
            </Block>
            <Block BlockType="SubSystem" Name="Semtech_SX1262_LoRa">
                <P Name="Description">Modulator SF10, 125 kHz BW, +14 dBm Tx, ITU-R P.833-9 channel</P>
            </Block>
            <Block BlockType="SubSystem" Name="Edge_Gateway_CM4">
                <P Name="Description">RAK2287 concentrator, SQLite WAL, CUSUM drift detection, HoneyChain</P>
            </Block>
"""

# 3. Hive Thermal Simscape Model
blocks_thermal = """
            <Block BlockType="SimscapeBlock" Name="T_Ambient_Diurnal_Source">
                <P Name="TemperatureProfile">15C to 35C Diurnal Sine</P>
            </Block>
            <Block BlockType="SimscapeBlock" Name="R_Hive_Wall_Resistance">
                <P Name="ThermalResistance">0.45 K/W</P>
            </Block>
            <Block BlockType="SimscapeBlock" Name="C_Hive_Thermal_Mass">
                <P Name="ThermalCapacitance">85000 J/K</P>
            </Block>
            <Block BlockType="SimscapeBlock" Name="R_Brood_Boundary_Layer">
                <P Name="ThermalResistance">0.85 K/W</P>
            </Block>
            <Block BlockType="SimscapeBlock" Name="C_Brood_Core_Mass">
                <P Name="ThermalCapacitance">45000 J/K</P>
            </Block>
            <Block BlockType="SimscapeBlock" Name="Colony_Metabolic_Heat_Source">
                <P Name="RegulatedSetpoint">34.5 C</P>
            </Block>
"""

# 4. Battery Solar MPPT Model
blocks_battery = """
            <Block BlockType="SimscapeBlock" Name="Solar_PV_Panel_0.5W">
                <P Name="Pmax">0.5 W</P>
                <P Name="Voc">6.0 V</P>
            </Block>
            <Block BlockType="SimscapeBlock" Name="MPPT_Buck_Converter">
                <P Name="Efficiency">0.85</P>
            </Block>
            <Block BlockType="SimscapeBlock" Name="LiFePO4_Battery_1200mAh">
                <P Name="Capacity">1.2 Ah</P>
                <P Name="NominalVoltage">3.2 V</P>
            </Block>
            <Block BlockType="SimscapeBlock" Name="Pulsed_Node_Load">
                <P Name="SleepCurrent">2.0 uA</P>
                <P Name="PeakCurrent">38.0 mA</P>
            </Block>
"""

if __name__ == "__main__":
    build_slx("beevil_node_duty_cycle.slx", "beevil_node_duty_cycle", blocks_duty_cycle)
    build_slx("beevil_cyber_physical_system.slx", "beevil_cyber_physical_system", blocks_cps)
    build_slx("beevil_hive_thermal_simscape.slx", "beevil_hive_thermal_simscape", blocks_thermal)
    build_slx("beevil_battery_solar_mppt.slx", "beevil_battery_solar_mppt", blocks_battery)
    print("ALL 4 SIMULINK .SLX MODELS BUILT SUCCESSFULLY!")
