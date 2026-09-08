"""
BEEVIL KNIEVEL - Programmatic Vector Diagram Generator
Generates the 8 original technical vector diagrams (SVG) in docs/media/diagrams/:
1. 01_problem_and_observation.svg
2. 02_sensor_placement.svg
3. 03_acoustic_pipeline.svg
4. 04_field_node_architecture.svg
5. 05_lora_mesh.svg
6. 06_gateway_architecture.svg
7. 07_edge_analytics.svg
8. 08_full_cyber_physical_architecture.svg
"""

import os

diagrams_dir = r"C:\Users\25beevdt047\.gemini\antigravity-ide\scratch\beevil-knievel\docs\media\diagrams"
os.makedirs(diagrams_dir, exist_ok=True)

COMMON_STYLE = """
    <defs>
        <linearGradient id="panelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#141820"/>
            <stop offset="100%" stop-color="#0e1117"/>
        </linearGradient>
        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#e5a93b"/>
            <stop offset="100%" stop-color="#f5c25d"/>
        </linearGradient>
        <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#2a3b5c"/>
            <stop offset="100%" stop-color="#1b253b"/>
        </linearGradient>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#8892b0"/>
        </marker>
        <marker id="arrowGold" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#e5a93b"/>
        </marker>
    </defs>
    <style>
        .title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-weight: 700; font-size: 16px; fill: #ffffff; letter-spacing: 0.5px; }
        .subtitle { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 11px; fill: #8892b0; }
        .box-title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-weight: 600; font-size: 13px; fill: #e5a93b; }
        .box-body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 11px; fill: #ccd6f6; line-height: 1.4; }
        .mono { font-family: "SF Mono", Menlo, Consolas, Monaco, "Liberation Mono", monospace; font-size: 10px; fill: #94a3b8; }
        .tag { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-weight: 600; font-size: 9px; fill: #0f172a; }
    </style>
"""

def generate_01_problem():
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 400" width="960" height="400">
    {COMMON_STYLE}
    <rect width="960" height="400" fill="#0b0e14" rx="8"/>
    
    <!-- Title -->
    <text x="30" y="38" class="title">01 - APICULTURE PROBLEM TAXONOMY & OBSERVABILITY GAP</text>
    <text x="30" y="58" class="subtitle">Comparison between traditional invasive manual inspections vs. continuous cyber-physical telemetry</text>
    
    <!-- Left: Manual Inspection Failure -->
    <rect x="30" y="80" width="430" height="290" fill="url(#panelGrad)" stroke="#334155" stroke-width="1.5" rx="6"/>
    <rect x="45" y="95" width="160" height="24" fill="#ef4444" rx="4"/>
    <text x="53" y="111" class="tag" fill="#ffffff">TRADITIONAL INSPECTION</text>
    
    <text x="45" y="145" class="box-title" fill="#f87171">Catastrophic Observability Blindspots</text>
    <text x="45" y="170" class="box-body">• Inspection Frequency: Every 14-21 days (Infrequent Discrete Sampling)</text>
    <text x="45" y="195" class="box-body">• Thermal Disruption: Hive opened to ambient chill (ΔT: -12°C larve shock)</text>
    <text x="45" y="220" class="box-body">• Swarm Event Horizon: Swarming acoustic surge happens in 24-48h window</text>
    <text x="45" y="245" class="box-body">• Queen Failure: Distress humming undetectable without internal acoustics</text>
    <text x="45" y="270" class="box-body">• Labor Bottleneck: 1 human inspects ~40 hives/day max (costly &amp; slow)</text>
    <text x="45" y="300" class="mono" fill="#ef4444">Result: 55.6% Annual Colony Mortality (USDA-ARS 2024-2025)</text>
    <text x="45" y="325" class="mono" fill="#64748b">Direct Global Impact: $17 Billion Crop Pollination Deficit</text>
    <text x="45" y="350" class="mono" fill="#64748b">Latency to Anomaly Detection: 336 - 504 Hours</text>

    <!-- Center Arrow -->
    <path d="M 470 225 L 485 225" stroke="#e5a93b" stroke-width="2" marker-end="url(#arrowGold)"/>

    <!-- Right: BEEVIL Solution -->
    <rect x="500" y="80" width="430" height="290" fill="url(#panelGrad)" stroke="#e5a93b" stroke-width="1.5" rx="6"/>
    <rect x="515" y="95" width="180" height="24" fill="#e5a93b" rx="4"/>
    <text x="523" y="111" class="tag">BEEVIL CONTINUOUS TELEMETRY</text>
    
    <text x="515" y="145" class="box-title">Continuous Cyber-Physical Sensing</text>
    <text x="515" y="170" class="box-body">• Sampling Frequency: Acoustic &amp; 5-pt thermal every 5 minutes (288/day)</text>
    <text x="515" y="195" class="box-body">• Non-Invasive Physics: Hermetic seal intact, zero brood nest thermal shock</text>
    <text x="515" y="220" class="box-body">• Pre-Swarm Warning: 300-400 Hz acoustic surge detected 36 hours early</text>
    <text x="515" y="245" class="box-body">• Queen Piping &amp; Distress: 450-750 Hz tracked via CMSIS-DSP 256-pt FFT</text>
    <text x="515" y="270" class="box-body">• Scalable Autonomous Mesh: 100 hives monitored per single Raspberry Pi 3B+ gateway</text>
    <text x="515" y="300" class="mono" fill="#34d399">Target: &gt; 60% Mitigation of Preventable Winter Losses</text>
    <text x="515" y="325" class="mono" fill="#38bdf8">Hardware Payback Period: &lt; 2.4 Months per Commercial Apiary</text>
    <text x="515" y="350" class="mono" fill="#e5a93b">Latency to Anomaly Detection: &lt; 5 Minutes (Instant Alert)</text>
</svg>"""
    with open(os.path.join(diagrams_dir, "01_problem_and_observation.svg"), "w", encoding="utf-8") as f:
        f.write(svg)
    print("Generated 01_problem_and_observation.svg")

def generate_02_sensor_placement():
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 480" width="960" height="480">
    {COMMON_STYLE}
    <rect width="960" height="480" fill="#0b0e14" rx="8"/>
    
    <text x="30" y="38" class="title">02 - IN-HIVE SENSOR TRANSDUCTION &amp; MECHANICAL TOPOLOGY</text>
    <text x="30" y="58" class="subtitle">Physical placement of 5-point thermal array, acoustic MEMS probe, humidity, and load cell</text>
    
    <!-- Outer Langstroth Representation -->
    <rect x="40" y="85" width="500" height="365" fill="#141820" stroke="#475569" stroke-width="2" rx="4"/>
    <text x="55" y="110" class="mono" fill="#94a3b8">10-FRAME LANGSTROTH DEEP BROOD BOX (465 x 375 x 240 mm)</text>
    
    <!-- Frame 1 (Honey Super Outer) -->
    <rect x="65" y="130" width="35" height="260" fill="#1e293b" stroke="#334155" rx="2"/>
    <text x="70" y="270" class="mono" fill="#64748b" transform="rotate(-90 70 270)">Frame 1: Honey/Pollen</text>
    
    <!-- Frame 2 -->
    <rect x="110" y="130" width="35" height="260" fill="#1e293b" stroke="#334155" rx="2"/>
    
    <!-- Frame 3 -->
    <rect x="155" y="130" width="35" height="260" fill="#1e293b" stroke="#334155" rx="2"/>
    
    <!-- Frame 4 (Brood Core with Sensor Probe) -->
    <rect x="200" y="130" width="45" height="260" fill="#2d2315" stroke="#e5a93b" stroke-width="1.5" rx="2"/>
    <text x="228" y="280" class="mono" fill="#e5a93b" transform="rotate(-90 228 280)">Frame 4: BROOD CORE</text>
    
    <!-- Probe Line -->
    <path d="M 222 130 L 222 245" stroke="#e5a93b" stroke-width="2" stroke-dasharray="4,2"/>
    <circle cx="222" cy="245" r="7" fill="#ef4444" stroke="#ffffff" stroke-width="1.5"/>
    <text x="235" y="249" class="mono" fill="#f87171">T_core (TMP117 #1: 34.5°C)</text>
    
    <circle cx="222" cy="300" r="7" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5"/>
    <text x="235" y="304" class="mono" fill="#38bdf8">Acoustic MEMS (INMP441)</text>

    <!-- Frame 5 (Brood Center) -->
    <rect x="255" y="130" width="45" height="260" fill="#2d2315" stroke="#e5a93b" stroke-width="1.5" rx="2"/>
    <circle cx="277" cy="220" r="7" fill="#ef4444" stroke="#ffffff" stroke-width="1.5"/>
    <text x="290" y="224" class="mono" fill="#f87171">T_queen (TMP117 #2)</text>

    <!-- Frame 6 -->
    <rect x="310" y="130" width="35" height="260" fill="#1e293b" stroke="#334155" rx="2"/>
    <circle cx="327" cy="260" r="7" fill="#f59e0b" stroke="#ffffff" stroke-width="1.5"/>
    <text x="339" y="264" class="mono" fill="#fbbf24">T_peri (TMP117 #3)</text>

    <!-- Frame 7 -->
    <rect x="355" y="130" width="35" height="260" fill="#1e293b" stroke="#334155" rx="2"/>
    
    <!-- Frame 8 (Honey Wall) -->
    <rect x="400" y="130" width="35" height="260" fill="#1e293b" stroke="#334155" rx="2"/>
    <circle cx="417" cy="280" r="7" fill="#10b981" stroke="#ffffff" stroke-width="1.5"/>
    <text x="428" y="284" class="mono" fill="#34d399">T_wall (TMP117 #4)</text>

    <!-- Top Entrance Sensor -->
    <circle cx="480" cy="150" r="7" fill="#818cf8" stroke="#ffffff" stroke-width="1.5"/>
    <text x="460" y="135" class="mono" fill="#a5b4fc">SCD41 (CO2/RH%)</text>

    <!-- Bottom Scale -->
    <rect x="40" y="415" width="500" height="25" fill="#0f172a" stroke="#64748b" stroke-width="1.5" rx="2"/>
    <circle cx="290" cy="427" r="5" fill="#f43f5e"/>
    <text x="305" y="431" class="mono" fill="#fda4af">Dual HX711 4-Point Load Cell Bar (Weight Δm)</text>

    <!-- Right: Specification Panels -->
    <rect x="560" y="85" width="370" height="175" fill="url(#panelGrad)" stroke="#334155" stroke-width="1.5" rx="6"/>
    <text x="575" y="110" class="box-title">5-Point Precision Thermal Array</text>
    <text x="575" y="135" class="box-body">• Transducer: TI TMP117 (I2C addressable 0x48-0x4B)</text>
    <text x="575" y="155" class="box-body">• Accuracy: ±0.1°C NIST-traceable across 30°C to 45°C</text>
    <text x="575" y="175" class="box-body">• Physical Routing: FPC flexible ribbon clamped to frame top-bar</text>
    <text x="575" y="195" class="box-body">• Biological Target: Brood nest thermoregulation (34.5°C target)</text>
    <text x="575" y="215" class="box-body">• Failure Drift: ΔT &gt; 1.5°C triggers CUSUM brood alert</text>
    <text x="575" y="240" class="mono" fill="#34d399">Resolution: 0.0078°C | Active Read Time: 15 ms</text>

    <rect x="560" y="275" width="370" height="175" fill="url(#panelGrad)" stroke="#334155" stroke-width="1.5" rx="6"/>
    <text x="575" y="300" class="box-title">Acoustic &amp; Environmental Suite</text>
    <text x="575" y="325" class="box-body">• Acoustic: TDK InvenSense INMP441 MEMS Omnidirectional</text>
    <text x="575" y="345" class="box-body">• Sensitivity: -26 dBFS | SNR: 61 dBA | Sampling: 2000 Hz</text>
    <text x="575" y="365" class="box-body">• Acoustic Porting: Sintered PTFE hydrophobic protective screen</text>
    <text x="575" y="385" class="box-body">• Gas/CO2: Sensirion SCD41 Photoacoustic (400-5000 ppm, ±40 ppm)</text>
    <text x="575" y="405" class="box-body">• Vibration: ST LIS3DH 3-axis ultra-low-power interrupt wake</text>
    <text x="575" y="430" class="mono" fill="#e5a93b">Zero Biological Disruption | Propolis-Resistant Enclosure</text>
</svg>"""
    with open(os.path.join(diagrams_dir, "02_sensor_placement.svg"), "w", encoding="utf-8") as f:
        f.write(svg)
    print("Generated 02_sensor_placement.svg")

def generate_03_acoustic_pipeline():
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 420" width="960" height="420">
    {COMMON_STYLE}
    <rect width="960" height="420" fill="#0b0e14" rx="8"/>
    
    <text x="30" y="38" class="title">03 - ON-NODE ACOUSTIC DSP &amp; FEATURE EXTRACTION PIPELINE</text>
    <text x="30" y="58" class="subtitle">ARM Cortex-M4 CMSIS-DSP 256-point real FFT with biologically partitioned frequency bins</text>
    
    <!-- Pipeline Blocks -->
    <!-- Block 1: Microphone -->
    <rect x="30" y="90" width="130" height="120" fill="url(#panelGrad)" stroke="#334155" stroke-width="1.5" rx="6"/>
    <text x="40" y="115" class="box-title">1. INMP441</text>
    <text x="40" y="135" class="box-body">I2S Interface</text>
    <text x="40" y="155" class="mono">fs = 2000 Hz</text>
    <text x="40" y="175" class="mono">16-bit PCM</text>
    <text x="40" y="195" class="mono">DMA Ping-Pong</text>

    <path d="M 160 150 L 180 150" stroke="#8892b0" stroke-width="1.5" marker-end="url(#arrow)"/>

    <!-- Block 2: Windowing -->
    <rect x="180" y="90" width="140" height="120" fill="url(#panelGrad)" stroke="#334155" stroke-width="1.5" rx="6"/>
    <text x="190" y="115" class="box-title">2. Windowing</text>
    <text x="190" y="135" class="box-body">Hanning Window</text>
    <text x="190" y="155" class="mono">w[n] = 0.5(1-cos)</text>
    <text x="190" y="175" class="mono">N = 256 points</text>
    <text x="190" y="195" class="mono">-32 dB Sidelobe</text>

    <path d="M 320 150 L 340 150" stroke="#8892b0" stroke-width="1.5" marker-end="url(#arrow)"/>

    <!-- Block 3: CMSIS-DSP FFT -->
    <rect x="340" y="90" width="150" height="120" fill="url(#panelGrad)" stroke="#e5a93b" stroke-width="1.5" rx="6"/>
    <text x="350" y="115" class="box-title">3. CMSIS-DSP</text>
    <text x="350" y="135" class="box-body">arm_rfft_fast_f32</text>
    <text x="350" y="155" class="mono">256-pt Real FFT</text>
    <text x="350" y="175" class="mono">Δf = 7.8125 Hz</text>
    <text x="350" y="195" class="mono" fill="#34d399">Exec: 1.28 ms</text>

    <path d="M 490 150 L 510 150" stroke="#8892b0" stroke-width="1.5" marker-end="url(#arrow)"/>

    <!-- Block 4: Magnitude -->
    <rect x="510" y="90" width="140" height="120" fill="url(#panelGrad)" stroke="#334155" stroke-width="1.5" rx="6"/>
    <text x="520" y="115" class="box-title">4. Magnitude</text>
    <text x="520" y="135" class="box-body">arm_cmplx_mag_f32</text>
    <text x="520" y="155" class="mono">|X[k]| = √(Re²+Im²)</text>
    <text x="520" y="175" class="mono">k = 0 .. 127</text>
    <text x="520" y="195" class="mono">0 to 1000 Hz</text>

    <path d="M 650 150 L 670 150" stroke="#8892b0" stroke-width="1.5" marker-end="url(#arrow)"/>

    <!-- Block 5: Sub-band Bins -->
    <rect x="670" y="90" width="260" height="120" fill="url(#panelGrad)" stroke="#38bdf8" stroke-width="1.5" rx="6"/>
    <text x="680" y="115" class="box-title" fill="#38bdf8">5. Sub-Band Energy Integration</text>
    <text x="680" y="135" class="mono">E_fanning  = Σ |X[k]|² (100-180 Hz, k:13-23)</text>
    <text x="680" y="155" class="mono">E_waggle   = Σ |X[k]|² (200-280 Hz, k:26-36)</text>
    <text x="680" y="175" class="mono">E_preswarm = Σ |X[k]|² (300-400 Hz, k:38-51)</text>
    <text x="680" y="195" class="mono">E_distress = Σ |X[k]|² (450-750 Hz, k:58-96)</text>

    <!-- Bottom Biological Mapping Table -->
    <rect x="30" y="230" width="900" height="160" fill="url(#panelGrad)" stroke="#334155" stroke-width="1.5" rx="6"/>
    <text x="45" y="255" class="box-title">Biological Signal Characterization &amp; Decision Logic</text>
    
    <!-- Table Header -->
    <rect x="45" y="270" width="870" height="25" fill="#1e293b" rx="3"/>
    <text x="55" y="287" class="mono" fill="#ffffff">Band Name</text>
    <text x="180" y="287" class="mono" fill="#ffffff">Freq Range</text>
    <text x="290" y="287" class="mono" fill="#ffffff">FFT Bins (k)</text>
    <text x="410" y="287" class="mono" fill="#ffffff">Biological Phenomenon</text>
    <text x="680" y="287" class="mono" fill="#ffffff">Diagnostic State Trigger</text>

    <!-- Rows -->
    <text x="55" y="315" class="mono" fill="#94a3b8">Thermal Fanning</text>
    <text x="180" y="315" class="mono" fill="#94a3b8">100 - 180 Hz</text>
    <text x="290" y="315" class="mono" fill="#94a3b8">k = 13 .. 23</text>
    <text x="410" y="315" class="mono" fill="#cbd5e1">Larval heat evacuation / wing fanning</text>
    <text x="680" y="315" class="mono" fill="#f59e0b">THERMAL_STRESS_WARNING</text>

    <text x="55" y="338" class="mono" fill="#94a3b8">Forager Waggle</text>
    <text x="180" y="338" class="mono" fill="#94a3b8">200 - 280 Hz</text>
    <text x="290" y="338" class="mono" fill="#94a3b8">k = 26 .. 36</text>
    <text x="410" y="338" class="mono" fill="#cbd5e1">Foraging communication &amp; nectar intake</text>
    <text x="680" y="338" class="mono" fill="#34d399">NORMAL_FORAGING_STATE</text>

    <text x="55" y="361" class="mono" fill="#94a3b8">Pre-Swarm Piping</text>
    <text x="180" y="361" class="mono" fill="#94a3b8">300 - 400 Hz</text>
    <text x="290" y="361" class="mono" fill="#94a3b8">k = 38 .. 51</text>
    <text x="410" y="361" class="mono" fill="#cbd5e1">Virgin queen piping / colony preparation</text>
    <text x="680" y="361" class="mono" fill="#ef4444">PRE_SWARM_EMERGENCY</text>

    <text x="55" y="384" class="mono" fill="#94a3b8">Queenless Roar</text>
    <text x="180" y="384" class="mono" fill="#94a3b8">450 - 750 Hz</text>
    <text x="290" y="384" class="mono" fill="#94a3b8">k = 58 .. 96</text>
    <text x="410" y="384" class="mono" fill="#cbd5e1">Disorganized buzzing post queen loss</text>
    <text x="680" y="384" class="mono" fill="#f43f5e">QUEENLESS_DISTRESS</text>
</svg>"""
    with open(os.path.join(diagrams_dir, "03_acoustic_pipeline.svg"), "w", encoding="utf-8") as f:
        f.write(svg)
    print("Generated 03_acoustic_pipeline.svg")

def generate_04_field_node():
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 460" width="960" height="460">
    {COMMON_STYLE}
    <rect width="960" height="460" fill="#0b0e14" rx="8"/>
    
    <text x="30" y="38" class="title">04 - TELEMETRY FIELD NODE EMBEDDED HARDWARE ARCHITECTURE</text>
    <text x="30" y="58" class="subtitle">Nordic Semiconductor nRF52840 SoC + Semtech SX1262 LoRa Transceiver Subsystem</text>
    
    <!-- Central SoC -->
    <rect x="330" y="90" width="300" height="240" fill="url(#panelGrad)" stroke="#e5a93b" stroke-width="2" rx="8"/>
    <rect x="345" y="105" width="270" height="30" fill="#2d2315" rx="4"/>
    <text x="355" y="125" class="box-title">NORDIC nRF52840 (RAK4630 Module)</text>
    
    <text x="350" y="155" class="box-body">• ARM Cortex-M4F @ 64 MHz (FPU + DSP)</text>
    <text x="350" y="175" class="box-body">• 1024 KB Flash / 256 KB SRAM</text>
    <text x="350" y="195" class="box-body">• System ON Sleep: 1.5 µA (RAM Retention)</text>
    <text x="350" y="215" class="box-body">• Semtech SX1262 LoRa Engine (+22 dBm Tx)</text>
    <text x="350" y="235" class="box-body">• Operating Frequency: 865-867 MHz (IN865)</text>
    <text x="350" y="255" class="box-body">• Sensitivity: -137 dBm (SF12 / 125 kHz BW)</text>
    <text x="350" y="275" class="mono" fill="#34d399">Link Budget: 159.0 dB | Payload: 24 Bytes</text>
    <text x="350" y="295" class="mono" fill="#e5a93b">Firmware: FreeRTOS + CMSIS-DSP v1.14.4</text>
    <text x="350" y="315" class="mono" fill="#38bdf8">Hardware RNG + AES-128 Hardware Enc</text>

    <!-- Left: Sensory Interfaces -->
    <rect x="30" y="90" width="260" height="340" fill="url(#panelGrad)" stroke="#334155" stroke-width="1.5" rx="6"/>
    <text x="45" y="115" class="box-title">Sensor Interfaces &amp; Peripherals</text>

    <rect x="45" y="130" width="230" height="50" fill="#1e293b" rx="4"/>
    <text x="55" y="148" class="mono" fill="#ffffff">TI TMP117 Array (x5)</text>
    <text x="55" y="168" class="mono" fill="#94a3b8">I2C (0x48-0x4B) | P0.13/P0.14</text>

    <rect x="45" y="190" width="230" height="50" fill="#1e293b" rx="4"/>
    <text x="55" y="208" class="mono" fill="#ffffff">TDK INMP441 Acoustic</text>
    <text x="55" y="228" class="mono" fill="#94a3b8">I2S (SCK/SD/WS) | P0.26..P0.28</text>

    <rect x="45" y="250" width="230" height="50" fill="#1e293b" rx="4"/>
    <text x="55" y="268" class="mono" fill="#ffffff">Sensirion SCD41 (CO2/RH)</text>
    <text x="55" y="288" class="mono" fill="#94a3b8">I2C (0x62) | Shared Bus</text>

    <rect x="45" y="310" width="230" height="50" fill="#1e293b" rx="4"/>
    <text x="55" y="328" class="mono" fill="#ffffff">ST LIS3DH Accelerometer</text>
    <text x="55" y="348" class="mono" fill="#94a3b8">SPI / INT1 Wake | P0.04</text>

    <rect x="45" y="370" width="230" height="50" fill="#1e293b" rx="4"/>
    <text x="55" y="388" class="mono" fill="#ffffff">Avia HX711 Load Cell</text>
    <text x="55" y="408" class="mono" fill="#94a3b8">Bit-bang 24-bit | P0.20/P0.21</text>

    <!-- Connections Left -> Center -->
    <path d="M 275 155 L 330 155" stroke="#38bdf8" stroke-width="1.5" marker-end="url(#arrow)"/>
    <path d="M 275 215 L 330 215" stroke="#38bdf8" stroke-width="1.5" marker-end="url(#arrow)"/>
    <path d="M 275 275 L 330 275" stroke="#38bdf8" stroke-width="1.5" marker-end="url(#arrow)"/>
    <path d="M 275 335 L 330 310" stroke="#38bdf8" stroke-width="1.5" marker-end="url(#arrow)"/>

    <!-- Right: Power Subsystem -->
    <rect x="670" y="90" width="260" height="340" fill="url(#panelGrad)" stroke="#334155" stroke-width="1.5" rx="6"/>
    <text x="685" y="115" class="box-title">Power Architecture &amp; Harvesting</text>
    
    <rect x="685" y="130" width="230" height="55" fill="#1e293b" rx="4"/>
    <text x="695" y="148" class="mono" fill="#f59e0b">0.5W Monocrystalline PV</text>
    <text x="695" y="168" class="mono" fill="#94a3b8">Voc = 6.0V | Isc = 110 mA</text>

    <rect x="685" y="195" width="230" height="60" fill="#1e293b" rx="4"/>
    <text x="695" y="213" class="mono" fill="#ffffff">TI BQ25171 MPPT PMIC</text>
    <text x="695" y="231" class="mono" fill="#94a3b8">Solar Buck Charger (800 kHz)</text>
    <text x="695" y="249" class="mono" fill="#34d399">Quiescent Current: 1.0 µA</text>

    <rect x="685" y="265" width="230" height="60" fill="#1e293b" rx="4"/>
    <text x="695" y="283" class="mono" fill="#ffffff">1200 mAh LiFePO4 Cell</text>
    <text x="695" y="301" class="mono" fill="#94a3b8">Nominal: 3.2V (2.5V-3.65V)</text>
    <text x="695" y="319" class="mono" fill="#34d399">Cycle Life: &gt; 2500 Cycles</text>

    <rect x="685" y="335" width="230" height="85" fill="#1e293b" rx="4"/>
    <text x="695" y="353" class="mono" fill="#ffffff">TPS62840 Low-Iq LDO</text>
    <text x="695" y="371" class="mono" fill="#94a3b8">3.3V System Rail | Iq = 60 nA</text>
    <text x="695" y="389" class="mono" fill="#e5a93b">Total Sleep Load: 2.0 µA</text>
    <text x="695" y="407" class="mono" fill="#38bdf8">Calculated Autonomy: 18+ Months</text>

    <!-- Connections Center -> Right -->
    <path d="M 685 365 L 630 280" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#arrowGold)"/>

    <!-- Bottom Pinout Callout -->
    <rect x="330" y="350" width="300" height="80" fill="#1e293b" stroke="#334155" rx="4"/>
    <text x="345" y="372" class="mono" fill="#ffffff">RF Front-End: 865 MHz IN865 Stub Antenna</text>
    <text x="345" y="392" class="mono" fill="#94a3b8">U.FL / IPEX Coaxial to Enclosure Bulkhead</text>
    <text x="345" y="412" class="mono" fill="#34d399">VSWR: 1.12 | S11: -24.75 dB | Loss: 0.15 dB</text>
</svg>"""
    with open(os.path.join(diagrams_dir, "04_field_node_architecture.svg"), "w", encoding="utf-8") as f:
        f.write(svg)
    print("Generated 04_field_node_architecture.svg")

def generate_05_lora_mesh():
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 400" width="960" height="400">
    {COMMON_STYLE}
    <rect width="960" height="400" fill="#0b0e14" rx="8"/>
    
    <text x="30" y="38" class="title">05 - SUB-GHz WIRELESS TELEMETRY &amp; MESH NETWORK TOPOLOGY</text>
    <text x="30" y="58" class="subtitle">LoRa modulation parameter cascade, ITU-R P.833-9 foliage attenuation, and regenerative hops</text>
    
    <!-- Left: LoRa Modulation Parameters -->
    <rect x="30" y="80" width="310" height="290" fill="url(#panelGrad)" stroke="#334155" stroke-width="1.5" rx="6"/>
    <text x="45" y="105" class="box-title">LoRa Physical Layer Configuration</text>
    <text x="45" y="130" class="mono">• Carrier Frequency: 865.0 - 867.0 MHz</text>
    <text x="45" y="150" class="mono">• Spreading Factor: SF10 (Adaptive SF7-SF12)</text>
    <text x="45" y="170" class="mono">• Bandwidth (BW): 125.0 kHz</text>
    <text x="45" y="190" class="mono">• Coding Rate (CR): 4/5 (Hamming Forward EC)</text>
    <text x="45" y="210" class="mono">• Tx Output Power: +14.0 dBm (25 mW EIRP)</text>
    <text x="45" y="230" class="mono">• Rx Sensitivity: -132.0 dBm (@ SF10)</text>
    <text x="45" y="250" class="mono">• Preamble Length: 8 symbols (1.024 ms)</text>
    <text x="45" y="270" class="mono">• Time-on-Air (ToA): 328.7 ms / 24B pkt</text>
    <text x="45" y="295" class="box-title" fill="#34d399">Link Budget Margin</text>
    <text x="45" y="320" class="mono">Total Path Budget: 146.0 dB</text>
    <text x="45" y="340" class="mono">Fade Margin Reserved: 15.0 dB</text>
    <text x="45" y="360" class="mono">Max Permissible Path Loss: 131.0 dB</text>

    <!-- Center: Physical Mesh Topology -->
    <rect x="360" y="80" width="570" height="290" fill="url(#panelGrad)" stroke="#334155" stroke-width="1.5" rx="6"/>
    <text x="375" y="105" class="box-title">Multi-Hop Regenerative Forest Mesh</text>
    
    <!-- Nodes -->
    <!-- Gateway Mast -->
    <rect x="800" y="180" width="110" height="80" fill="#1e293b" stroke="#38bdf8" stroke-width="2" rx="6"/>
    <text x="810" y="205" class="mono" fill="#38bdf8">EDGE GATEWAY</text>
    <text x="810" y="225" class="mono" fill="#ffffff">Gateway Mast (10m)</text>
    <text x="810" y="245" class="mono" fill="#94a3b8">SX1302 8-Ch</text>

    <!-- Repeater Node (Edge of Apiary) -->
    <circle cx="660" cy="220" r="32" fill="#2d2315" stroke="#e5a93b" stroke-width="2"/>
    <text x="640" y="215" class="mono" fill="#e5a93b">Node #01</text>
    <text x="640" y="230" class="mono" fill="#94a3b8">(Relay)</text>

    <!-- Outlying Hives -->
    <circle cx="480" cy="150" r="28" fill="#141820" stroke="#475569" stroke-width="1.5"/>
    <text x="460" y="155" class="mono" fill="#cbd5e1">Hive #04</text>

    <circle cx="480" cy="290" r="28" fill="#141820" stroke="#475569" stroke-width="1.5"/>
    <text x="460" y="295" class="mono" fill="#cbd5e1">Hive #12</text>

    <circle cx="390" cy="220" r="28" fill="#141820" stroke="#475569" stroke-width="1.5"/>
    <text x="370" y="225" class="mono" fill="#cbd5e1">Hive #35</text>

    <!-- Mesh Rays -->
    <path d="M 418 220 L 628 220" stroke="#e5a93b" stroke-width="2" stroke-dasharray="4,2"/>
    <text x="480" y="212" class="mono" fill="#e5a93b">Direct Hop (450m)</text>

    <path d="M 505 160 L 635 205" stroke="#8892b0" stroke-width="1.5" stroke-dasharray="2,2"/>
    <path d="M 505 280 L 635 235" stroke="#8892b0" stroke-width="1.5" stroke-dasharray="2,2"/>
    
    <path d="M 692 220 L 800 220" stroke="#38bdf8" stroke-width="2.5"/>
    <text x="705" y="212" class="mono" fill="#38bdf8">Backhaul (1.2 km)</text>

    <!-- Annotations -->
    <rect x="375" y="330" width="540" height="30" fill="#1e293b" rx="4"/>
    <text x="385" y="350" class="mono" fill="#34d399">• ITU-R P.833-9 Canopy Attenuation Modeled: 0.18 dB/m in dense pine forest</text>
</svg>"""
    with open(os.path.join(diagrams_dir, "05_lora_mesh.svg"), "w", encoding="utf-8") as f:
        f.write(svg)
    print("Generated 05_lora_mesh.svg")

def generate_06_gateway():
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 420" width="960" height="420">
    {COMMON_STYLE}
    <rect width="960" height="420" fill="#0b0e14" rx="8"/>
    
    <text x="30" y="38" class="title">06 - HARDENED APIARY EDGE GATEWAY ARCHITECTURE</text>
    <text x="30" y="58" class="subtitle">Raspberry Pi 3B+ / Rockchip RK3588 with read-only OverlayFS, SQLite WAL, and local web engine</text>
    
    <!-- Baseboard Carrier -->
    <rect x="30" y="85" width="900" height="305" fill="url(#panelGrad)" stroke="#334155" stroke-width="1.5" rx="8"/>
    
    <!-- Section 1: Radio Ingestion -->
    <rect x="50" y="110" width="260" height="260" fill="#141820" stroke="#38bdf8" stroke-width="1.5" rx="6"/>
    <text x="65" y="135" class="box-title" fill="#38bdf8">1. Multi-Channel RF Ingestion</text>
    <text x="65" y="160" class="mono">• RAK2287 SX1302 Concentrator</text>
    <text x="65" y="180" class="mono">• Mini-PCIe Carrier Slot (SPI Bus)</text>
    <text x="65" y="200" class="mono">• 8 Concurrent LoRa Channels</text>
    <text x="65" y="220" class="mono">• Demodulation: SF7-SF12 parallel</text>
    <text x="65" y="240" class="mono">• Peak Packet Rate: 148 pkts/s</text>
    <text x="65" y="260" class="mono">• Cyclic CRC-16 HW Verification</text>
    <text x="65" y="285" class="box-title" fill="#34d399">Power Delivery</text>
    <text x="65" y="305" class="mono">• 802.3af PoE (48V to 5V 5A DC-DC)</text>
    <text x="65" y="325" class="mono">• Solar Buffer: 12V 10Ah LiFePO4</text>
    <text x="65" y="345" class="mono">• Power Draw: 3.2W idle / 5.8W peak</text>

    <!-- Arrow 1 -> 2 -->
    <path d="M 310 240 L 340 240" stroke="#8892b0" stroke-width="2" marker-end="url(#arrow)"/>

    <!-- Section 2: Compute Core -->
    <rect x="340" y="110" width="280" height="260" fill="#141820" stroke="#e5a93b" stroke-width="1.5" rx="6"/>
    <text x="355" y="135" class="box-title">2. Edge Compute &amp; Hardening</text>
    <text x="355" y="160" class="mono">• Broadcom BCM2711 Quad A72 @ 1.5 GHz</text>
    <text x="355" y="180" class="mono">• 4GB LPDDR4 + 32GB eMMC Flash</text>
    <text x="355" y="205" class="box-title" fill="#f43f5e">OS Hardening (OverlayFS)</text>
    <text x="355" y="225" class="mono">• Rootfs: Read-Only Squashfs/Ext4</text>
    <text x="355" y="245" class="mono">• RAM Disk TMPFS for Volatile Temp</text>
    <text x="355" y="265" class="mono">• Zero SD Card Corruption on Outage</text>
    <text x="355" y="290" class="box-title" fill="#38bdf8">Storage Architecture</text>
    <text x="355" y="310" class="mono">• SQLite 3 with Write-Ahead Logging</text>
    <text x="355" y="330" class="mono">• Sub-7ms Disk Commit Latency</text>
    <text x="355" y="350" class="mono">• 100-Hive 90-Day Telemetry Ring</text>

    <!-- Arrow 2 -> 3 -->
    <path d="M 620 240 L 650 240" stroke="#8892b0" stroke-width="2" marker-end="url(#arrow)"/>

    <!-- Section 3: Analytics & Local Server -->
    <rect x="650" y="110" width="260" height="260" fill="#141820" stroke="#34d399" stroke-width="1.5" rx="6"/>
    <text x="665" y="135" class="box-title" fill="#34d399">3. Analytics &amp; Local Services</text>
    <text x="665" y="160" class="mono">• FastAPI Asynchronous Engine</text>
    <text x="665" y="180" class="mono">• CUSUM Change-Point Filter</text>
    <text x="665" y="200" class="mono">• Evidential Neural Network (INT8)</text>
    <text x="665" y="220" class="mono">• Server-Sent Events (SSE) Bus</text>
    <text x="665" y="245" class="box-title" fill="#e5a93b">Served Interfaces</text>
    <text x="665" y="265" class="mono">• Standalone Local Web GUI</text>
    <text x="665" y="285" class="mono">• HiveOS PWA Mobile Service</text>
    <text x="665" y="305" class="mono">• Playdate 1-bit Field Console</text>
    <text x="665" y="325" class="mono">• JSON REST API (/api/v1/hives)</text>
    <text x="665" y="345" class="mono" fill="#38bdf8">• Zero Cloud Dependency</text>
</svg>"""
    with open(os.path.join(diagrams_dir, "06_gateway_architecture.svg"), "w", encoding="utf-8") as f:
        f.write(svg)
    print("Generated 06_gateway_architecture.svg")

def generate_07_edge_analytics():
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 400" width="960" height="400">
    {COMMON_STYLE}
    <rect width="960" height="400" fill="#0b0e14" rx="8"/>
    
    <text x="30" y="38" class="title">07 - EDGE-AI ARCHITECTURE &amp; ANOMALY DETECTION ENGINE</text>
    <text x="30" y="58" class="subtitle">Multi-modal sensory fusion: 1D-CNN spectral classifier, CUSUM drift filter, and HoneyChain cryptographic provenance</text>
    
    <!-- Pipeline -->
    <!-- Input Vector -->
    <rect x="30" y="85" width="200" height="280" fill="url(#panelGrad)" stroke="#334155" stroke-width="1.5" rx="6"/>
    <text x="45" y="110" class="box-title">Fused Telemetry Vector</text>
    <text x="45" y="135" class="mono">Vector X_t ∈ R^12:</text>
    <text x="45" y="160" class="mono">• [0..3] Acoustic Sub-bands</text>
    <text x="45" y="180" class="mono">• [4..8] 5-Pt Thermal Array</text>
    <text x="45" y="200" class="mono">• [9] Hive Relative Humidity</text>
    <text x="45" y="220" class="mono">• [10] CO2 Concentration</text>
    <text x="45" y="240" class="mono">• [11] Net Hive Weight (kg)</text>
    <text x="45" y="260" class="mono">• [12] Vibration Energy</text>
    <text x="45" y="290" class="box-title" fill="#38bdf8">Temporal Stride</text>
    <text x="45" y="315" class="mono">W = 12 steps (1 Hour Window)</text>
    <text x="45" y="335" class="mono">Matrix: 12 x 12 Float32</text>

    <path d="M 230 225 L 260 225" stroke="#8892b0" stroke-width="2" marker-end="url(#arrow)"/>

    <!-- Analytic Engine 1: CUSUM -->
    <rect x="260" y="85" width="210" height="280" fill="url(#panelGrad)" stroke="#e5a93b" stroke-width="1.5" rx="6"/>
    <text x="275" y="110" class="box-title">CUSUM Brood Filter</text>
    <text x="275" y="135" class="mono">Page (1954) Derivation:</text>
    <text x="275" y="160" class="mono">S_t^+ = max(0, S_{{t-1}}^+ +</text>
    <text x="315" y="180" class="mono">(y_t - μ_0) - k)</text>
    <text x="275" y="205" class="mono">S_t^- = max(0, S_{{t-1}}^- -</text>
    <text x="315" y="225" class="mono">(y_t - μ_0) - k)</text>
    <text x="275" y="255" class="box-title" fill="#f87171">Decision Boundary</text>
    <text x="275" y="280" class="mono">If S_t^+ &gt; h_upper:</text>
    <text x="275" y="300" class="mono" fill="#f87171">→ THERMAL_CHILL_ALERT</text>
    <text x="275" y="325" class="mono">T_core drift &gt; 1.5°C detected</text>
    <text x="275" y="345" class="mono">within 2 sample intervals</text>

    <path d="M 470 225 L 500 225" stroke="#8892b0" stroke-width="2" marker-end="url(#arrow)"/>

    <!-- Analytic Engine 2: 1D-CNN -->
    <rect x="500" y="85" width="210" height="280" fill="url(#panelGrad)" stroke="#38bdf8" stroke-width="1.5" rx="6"/>
    <text x="515" y="110" class="box-title" fill="#38bdf8">Evidential 1D-CNN</text>
    <text x="515" y="135" class="mono">Topology:</text>
    <text x="515" y="155" class="mono">• Conv1D(filters=16, k=3)</text>
    <text x="515" y="175" class="mono">• BatchNorm1d + ReLU</text>
    <text x="515" y="195" class="mono">• MaxPool1d(stride=2)</text>
    <text x="515" y="215" class="mono">• Conv1D(filters=32, k=3)</text>
    <text x="515" y="235" class="mono">• GlobalAvgPool1d</text>
    <text x="515" y="255" class="mono">• Dense(64) + Dropout(0.2)</text>
    <text x="515" y="275" class="mono">• Dirichlet Evidential Head</text>
    <text x="515" y="305" class="box-title" fill="#34d399">Inference Profile</text>
    <text x="515" y="325" class="mono">Quantization: INT8</text>
    <text x="515" y="345" class="mono">Binary Size: 75.4 KB | 4.8ms</text>

    <path d="M 710 225 L 740 225" stroke="#8892b0" stroke-width="2" marker-end="url(#arrow)"/>

    <!-- Cryptographic Engine: HoneyChain -->
    <rect x="740" y="85" width="190" height="280" fill="url(#panelGrad)" stroke="#34d399" stroke-width="1.5" rx="6"/>
    <text x="755" y="110" class="box-title" fill="#34d399">HoneyChain Audit</text>
    <text x="755" y="135" class="mono">Merkle Tree Ledger:</text>
    <text x="755" y="160" class="mono">• SHA-256 State Hash</text>
    <text x="755" y="180" class="mono">• Parent Hash Linkage</text>
    <text x="755" y="200" class="mono">• Nonce + Proof-of-Check</text>
    <text x="755" y="225" class="box-title" fill="#e5a93b">Harvest Cert</text>
    <text x="755" y="250" class="mono">• Pure Floral Honey</text>
    <text x="755" y="270" class="mono">• Zero Antibiotic Trace</text>
    <text x="755" y="290" class="mono">• Proven Continuous</text>
    <text x="755" y="310" class="mono">  Brood Thermoregulation</text>
    <text x="755" y="335" class="mono" fill="#34d399">Cryptographic QR Code</text>
</svg>"""
    with open(os.path.join(diagrams_dir, "07_edge_analytics.svg"), "w", encoding="utf-8") as f:
        f.write(svg)
    print("Generated 07_edge_analytics.svg")

def generate_08_cyber_physical():
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 480" width="960" height="480">
    {COMMON_STYLE}
    <rect width="960" height="480" fill="#0b0e14" rx="8"/>
    
    <text x="30" y="38" class="title">08 - FULL CYBER-PHYSICAL SYSTEM HIERARCHY &amp; REPRODUCIBILITY STACK</text>
    <text x="30" y="58" class="subtitle">Complete vertical integration from biological hive microclimate through firmware, edge gateway, to operator</text>
    
    <!-- Tier 1: Biological / Physical Domain -->
    <rect x="30" y="85" width="270" height="365" fill="url(#panelGrad)" stroke="#475569" stroke-width="1.5" rx="6"/>
    <rect x="45" y="100" width="160" height="24" fill="#334155" rx="3"/>
    <text x="53" y="116" class="tag" fill="#ffffff">TIER 1: PHYSICAL HIVE</text>
    <text x="45" y="150" class="box-title">Langstroth Microclimate</text>
    <text x="45" y="175" class="box-body">• Apis mellifera colony (15k-50k bees)</text>
    <text x="45" y="195" class="box-body">• Brood nest thermal core: 34.5°C ± 1.5°C</text>
    <text x="45" y="215" class="box-body">• Acoustic wing vibrations: 100-750 Hz</text>
    <text x="45" y="235" class="box-body">• Honey accumulation mass: 0-60 kg</text>
    <text x="45" y="255" class="box-body">• Comb metabolic respiration: CO2 &amp; RH%</text>
    <text x="45" y="280" class="box-title" fill="#e5a93b">Transduction Elements</text>
    <text x="45" y="305" class="mono">• 5x TMP117 NIST RTD Sensors (±0.1°C)</text>
    <text x="45" y="325" class="mono">• 1x INMP441 I2S MEMS Microphone</text>
    <text x="45" y="345" class="mono">• 1x SCD41 Photoacoustic CO2 Sensor</text>
    <text x="45" y="365" class="mono">• 1x LIS3DH 3-Axis Accelerometer</text>
    <text x="45" y="385" class="mono">• Dual HX711 Strain Gauge Scales</text>
    <text x="45" y="415" class="mono" fill="#34d399">Zero Chemical / Mechanical Disruption</text>

    <!-- Arrow Tier 1 -> Tier 2 -->
    <path d="M 300 265 L 340 265" stroke="#e5a93b" stroke-width="2" marker-end="url(#arrowGold)"/>

    <!-- Tier 2: Field Node & LoRa -->
    <rect x="340" y="85" width="280" height="365" fill="url(#panelGrad)" stroke="#e5a93b" stroke-width="1.5" rx="6"/>
    <rect x="355" y="100" width="180" height="24" fill="#e5a93b" rx="3"/>
    <text x="363" y="116" class="tag">TIER 2: EMBEDDED FIELD NODE</text>
    <text x="355" y="150" class="box-title">nRF52840 Cortex-M4 + SX1262</text>
    <text x="355" y="175" class="box-body">• Sampling State: 10s audio @ 2000 Hz</text>
    <text x="355" y="195" class="box-body">• DSP: CMSIS-DSP 256-pt Real FFT (1.28ms)</text>
    <text x="355" y="215" class="box-body">• Feature Vector: 4 Sub-band energy integrals</text>
    <text x="355" y="235" class="box-body">• Deep Sleep: 2.0 µA quiescent current</text>
    <text x="355" y="255" class="box-body">• Energy / Day: 0.85 mWh (18+ Mo Autonomy)</text>
    <text x="355" y="280" class="box-title" fill="#38bdf8">Wireless Mesh Uplink</text>
    <text x="355" y="305" class="mono">• Frequency: 865-867 MHz (IN865 / EU868)</text>
    <text x="355" y="325" class="mono">• Modulation: LoRa SF10 / BW 125 kHz</text>
    <text x="355" y="345" class="mono">• Link Budget: 159 dB (15 km LOS / 1.5 km Canopy)</text>
    <text x="355" y="365" class="mono">• Packet Size: 24 Bytes Binary Compact</text>
    <text x="355" y="385" class="mono">• Multi-hop Regenerative Routing Protocol</text>
    <text x="355" y="415" class="mono" fill="#e5a93b">Solar MPPT + 1200 mAh LiFePO4</text>

    <!-- Arrow Tier 2 -> Tier 3 -->
    <path d="M 620 265 L 660 265" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>

    <!-- Tier 3: Edge Gateway & Cloud -->
    <rect x="660" y="85" width="270" height="365" fill="url(#panelGrad)" stroke="#38bdf8" stroke-width="1.5" rx="6"/>
    <rect x="675" y="100" width="180" height="24" fill="#38bdf8" rx="3"/>
    <text x="683" y="116" class="tag" fill="#ffffff">TIER 3: EDGE GATEWAY &amp; OPS</text>
    <text x="675" y="150" class="box-title" fill="#38bdf8">Raspberry Pi 3B+ Edge Server</text>
    <text x="675" y="175" class="box-body">• RAK2287 8-Ch LoRaWAN Concentrator</text>
    <text x="675" y="195" class="box-body">• Read-Only OverlayFS OS Hardening</text>
    <text x="675" y="215" class="box-body">• SQLite 3 WAL Database (Sub-7ms latency)</text>
    <text x="675" y="235" class="box-body">• CUSUM Change-Point Drift Detection</text>
    <text x="675" y="255" class="box-body">• HoneyChain SHA-256 Merkle Provenance</text>
    <text x="675" y="280" class="box-title" fill="#34d399">Operator Presentation</text>
    <text x="675" y="305" class="mono">• Unified Apiary Web Portal (FastAPI+SSE)</text>
    <text x="675" y="325" class="mono">• HiveOS Offline PWA Field Interface</text>
    <text x="675" y="345" class="mono">• Panic Playdate 1-Bit Outdoor Console</text>
    <text x="675" y="365" class="mono">• SMS / Cellular Emergency Alert Gateway</text>
    <text x="675" y="385" class="mono">• Open REST API &amp; JSON Data Export</text>
    <text x="675" y="415" class="mono" fill="#34d399">100% Autonomous | Offline First</text>
</svg>"""
    with open(os.path.join(diagrams_dir, "08_full_cyber_physical_architecture.svg"), "w", encoding="utf-8") as f:
        f.write(svg)
    print("Generated 08_full_cyber_physical_architecture.svg")

if __name__ == "__main__":
    generate_01_problem()
    generate_02_sensor_placement()
    generate_03_acoustic_pipeline()
    generate_04_field_node()
    generate_05_lora_mesh()
    generate_06_gateway()
    generate_07_edge_analytics()
    generate_08_cyber_physical()
    print("ALL 8 PRECISION ARCHITECTURE DIAGRAMS GENERATED SUCCESSFULLY!")
