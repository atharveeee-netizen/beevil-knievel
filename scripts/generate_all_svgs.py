import os

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

def save_svg(rel_path, content):
    target = os.path.join(REPO_ROOT, rel_path)
    os.makedirs(os.path.dirname(target), exist_ok=True)
    with open(target, "w", encoding="utf-8") as f:
        f.write(content.strip())
    print(f"Generated: {rel_path}")

# -----------------------------------------------------------------------------
# 1. docs/media/02-apiary-problem/hive_monitoring_problem.svg
# -----------------------------------------------------------------------------
save_svg("docs/media/02-apiary-problem/hive_monitoring_problem.svg", """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 520" width="100%" height="100%">
  <defs>
    <linearGradient id="gradCard" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#161b22"/>
      <stop offset="100%" stop-color="#0d1117"/>
    </linearGradient>
  </defs>
  <rect width="1000" height="520" rx="16" fill="#090d13" stroke="#30363d" stroke-width="2"/>
  
  <rect x="30" y="24" width="160" height="28" rx="14" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="110" y="43" fill="#f59e0b" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">PROBLEM CONTEXT</text>
  <text x="30" y="82" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="800">Why Precision Commercial Apiculture Demands Remote Telemetry</text>
  <text x="30" y="108" fill="#8b949e" font-family="system-ui, -apple-system, sans-serif" font-size="14">Manual frame inspection is disruptive, labor-intensive, and fails to catch rapid 24-to-72 hour colony collapse events.</text>

  <!-- Left: Manual Inspection -->
  <g transform="translate(30, 130)">
    <rect width="450" height="350" rx="12" fill="url(#gradCard)" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4 4"/>
    <rect x="20" y="20" width="180" height="24" rx="12" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" stroke-width="1"/>
    <text x="110" y="36" fill="#ef4444" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">MANUAL INSPECTION (LEGACY)</text>
    
    <g transform="translate(20, 65)">
      <circle cx="14" cy="14" r="14" fill="#21262d" stroke="#ef4444" stroke-width="1.5"/>
      <text x="14" y="18" fill="#ef4444" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">1</text>
      <text x="40" y="14" fill="#f0f6fc" font-family="sans-serif" font-size="14" font-weight="bold">Severe Thermal Disturbance</text>
      <text x="40" y="32" fill="#8b949e" font-family="sans-serif" font-size="12">Cracking propolis seals drops brood temperature from 34.8°C to ambient.</text>
      <text x="40" y="48" fill="#8b949e" font-family="sans-serif" font-size="12">Requires up to 8 hours and heavy caloric reserves to reheat.</text>
    </g>
    
    <g transform="translate(20, 150)">
      <circle cx="14" cy="14" r="14" fill="#21262d" stroke="#ef4444" stroke-width="1.5"/>
      <text x="14" y="18" fill="#ef4444" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">2</text>
      <text x="40" y="14" fill="#f0f6fc" font-family="sans-serif" font-size="14" font-weight="bold">Labor Bottlenecks Across Out-Yards</text>
      <text x="40" y="32" fill="#8b949e" font-family="sans-serif" font-size="12">Inspecting 100 hives takes 15–20 hours of manual labor per cycle.</text>
      <text x="40" y="48" fill="#8b949e" font-family="sans-serif" font-size="12">Out-yards located 50+ km away are only visited bi-weekly.</text>
    </g>

    <g transform="translate(20, 235)">
      <circle cx="14" cy="14" r="14" fill="#21262d" stroke="#ef4444" stroke-width="1.5"/>
      <text x="14" y="18" fill="#ef4444" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">3</text>
      <text x="40" y="14" fill="#f0f6fc" font-family="sans-serif" font-size="14" font-weight="bold">Lagging Indicators vs Silent Losses</text>
      <text x="40" y="32" fill="#8b949e" font-family="sans-serif" font-size="12">Queen death, swarming, and starving occur inside 48-hour windows.</text>
      <text x="40" y="48" fill="#8b949e" font-family="sans-serif" font-size="12">Discovered post-mortem (USDA reports 35–45% annual colony loss).</text>
    </g>
  </g>

  <!-- Right: Beevil Paradigm -->
  <g transform="translate(520, 130)">
    <rect width="450" height="350" rx="12" fill="url(#gradCard)" stroke="#10b981" stroke-width="2"/>
    <rect x="20" y="20" width="220" height="24" rx="12" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="1"/>
    <text x="130" y="36" fill="#10b981" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">BEEVIL CYBER-PHYSICAL PARADIGM</text>

    <g transform="translate(20, 65)">
      <circle cx="14" cy="14" r="14" fill="#21262d" stroke="#10b981" stroke-width="1.5"/>
      <text x="14" y="18" fill="#10b981" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">✓</text>
      <text x="40" y="14" fill="#f0f6fc" font-family="sans-serif" font-size="14" font-weight="bold">Zero Thermal Intrusiveness</text>
      <text x="40" y="32" fill="#8b949e" font-family="sans-serif" font-size="12">Continuous 5-point frame temperature &amp; I2S bio-acoustic sensing.</text>
      <text x="40" y="48" fill="#8b949e" font-family="sans-serif" font-size="12">Monitors nest homeostasis 24/7 without cracking the hive box.</text>
    </g>
    
    <g transform="translate(20, 150)">
      <circle cx="14" cy="14" r="14" fill="#21262d" stroke="#10b981" stroke-width="1.5"/>
      <text x="14" y="18" fill="#10b981" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">✓</text>
      <text x="40" y="14" fill="#f0f6fc" font-family="sans-serif" font-size="14" font-weight="bold">Sub-GHz Multi-Hop LoRa Mesh</text>
      <text x="40" y="32" fill="#8b949e" font-family="sans-serif" font-size="12">865 MHz RF penetrates wet orchard canopy without cellular SIM fees.</text>
      <text x="40" y="48" fill="#8b949e" font-family="sans-serif" font-size="12">Up to 100 nodes autonomously route to single Linux base station.</text>
    </g>

    <g transform="translate(20, 235)">
      <circle cx="14" cy="14" r="14" fill="#21262d" stroke="#10b981" stroke-width="1.5"/>
      <text x="14" y="18" fill="#10b981" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">✓</text>
      <text x="40" y="14" fill="#f0f6fc" font-family="sans-serif" font-size="14" font-weight="bold">Deterministic 72-Hour CUSUM Triage</text>
      <text x="40" y="32" fill="#8b949e" font-family="sans-serif" font-size="12">Mathematical cumulative thermal drift alerts prior to brood death.</text>
      <text x="40" y="48" fill="#8b949e" font-family="sans-serif" font-size="12">CMSIS-DSP FFT flags pre-swarm crescendos and queen piping.</text>
    </g>
  </g>
</svg>""")

# -----------------------------------------------------------------------------
# 2. docs/media/03-acoustic-problem/bee_acoustic_signals.svg
# -----------------------------------------------------------------------------
save_svg("docs/media/03-acoustic-problem/bee_acoustic_signals.svg", """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 520" width="100%" height="100%">
  <rect width="1000" height="520" rx="16" fill="#090d13" stroke="#30363d" stroke-width="2"/>
  
  <rect x="30" y="24" width="150" height="28" rx="14" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="105" y="43" fill="#f59e0b" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">BIO-ACOUSTIC DSP</text>
  <text x="30" y="82" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="800">Honey Bee Acoustic Spectrum &amp; Diagnostic Frequency Bands</text>
  <text x="30" y="108" fill="#8b949e" font-family="system-ui, -apple-system, sans-serif" font-size="14">Verified biological frequency regions mapped to 256-point CMSIS-DSP FFT bins (fs = 2000 Hz, Δf = 7.8125 Hz).</text>

  <g transform="translate(50, 140)">
    <rect width="900" height="200" rx="8" fill="#161b22" stroke="#21262d"/>
    <line x1="0" y1="50" x2="900" y2="50" stroke="#21262d" stroke-dasharray="4 4"/>
    <line x1="0" y1="100" x2="900" y2="100" stroke="#21262d" stroke-dasharray="4 4"/>
    <line x1="0" y1="150" x2="900" y2="150" stroke="#21262d" stroke-dasharray="4 4"/>

    <!-- Worker Hum -->
    <rect x="135" y="30" width="90" height="170" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" stroke-width="1.5"/>
    <path d="M 135 180 Q 180 40 225 180" fill="none" stroke="#10b981" stroke-width="3"/>
    
    <!-- Queenless Roar -->
    <rect x="260" y="50" width="80" height="150" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" stroke-width="1.5"/>
    <path d="M 260 180 Q 300 70 340 180" fill="none" stroke="#ef4444" stroke-width="3"/>

    <!-- Queen Piping & Pre-Swarm -->
    <rect x="380" y="20" width="120" height="180" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" stroke-width="1.5"/>
    <path d="M 380 180 Q 440 25 500 180" fill="none" stroke="#f59e0b" stroke-width="3"/>

    <!-- Environmental Noise -->
    <rect x="680" y="120" width="200" height="80" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3 3"/>
    <path d="M 680 185 Q 780 140 880 185" fill="none" stroke="#38bdf8" stroke-width="2"/>

    <!-- Axis -->
    <line x1="0" y1="200" x2="900" y2="200" stroke="#8b949e" stroke-width="2"/>
    <text x="0" y="225" fill="#8b949e" font-family="monospace" font-size="11">0 Hz</text>
    <text x="180" y="225" fill="#10b981" font-family="monospace" font-size="11" font-weight="bold">~225 Hz (Worker)</text>
    <text x="300" y="225" fill="#ef4444" font-family="monospace" font-size="11" font-weight="bold">~285 Hz (Queenless)</text>
    <text x="440" y="225" fill="#f59e0b" font-family="monospace" font-size="11" font-weight="bold">~450 Hz (Piping)</text>
    <text x="780" y="225" fill="#38bdf8" font-family="monospace" font-size="11">>800 Hz (Noise Filter)</text>
    <text x="890" y="225" fill="#8b949e" font-family="monospace" font-size="11">1000 Hz</text>
  </g>

  <!-- Legend Cards -->
  <g transform="translate(50, 400)">
    <rect x="0" y="0" width="210" height="90" rx="8" fill="#161b22" stroke="#10b981" stroke-width="1.5"/>
    <text x="15" y="25" fill="#10b981" font-family="sans-serif" font-size="12" font-weight="bold">NOMINAL COLONY</text>
    <text x="15" y="45" fill="#f0f6fc" font-family="sans-serif" font-size="14" font-weight="800">180 Hz – 240 Hz</text>
    <text x="15" y="65" fill="#8b949e" font-family="sans-serif" font-size="11">Continuous flight &amp; fanning hum.</text>
    <text x="15" y="80" fill="#8b949e" font-family="sans-serif" font-size="11">Dominant energy in bins 23–31.</text>

    <rect x="230" y="0" width="210" height="90" rx="8" fill="#161b22" stroke="#ef4444" stroke-width="1.5"/>
    <text x="245" y="25" fill="#ef4444" font-family="sans-serif" font-size="12" font-weight="bold">QUEENLESS DISTRESS</text>
    <text x="245" y="45" fill="#f0f6fc" font-family="sans-serif" font-size="14" font-weight="800">285 Hz – 350 Hz</text>
    <text x="245" y="65" fill="#8b949e" font-family="sans-serif" font-size="11">Unregulated distress frequency.</text>
    <text x="245" y="80" fill="#8b949e" font-family="sans-serif" font-size="11">Trips alarm bit in bins 36–45.</text>

    <rect x="460" y="0" width="210" height="90" rx="8" fill="#161b22" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="475" y="25" fill="#f59e0b" font-family="sans-serif" font-size="12" font-weight="bold">PRE-SWARM / PIPING</text>
    <text x="475" y="45" fill="#f0f6fc" font-family="sans-serif" font-size="14" font-weight="800">380 Hz – 500 Hz</text>
    <text x="475" y="65" fill="#8b949e" font-family="sans-serif" font-size="11">Virgin queen tooting/quacking.</text>
    <text x="475" y="80" fill="#8b949e" font-family="sans-serif" font-size="11">Acoustic surge 24h pre-swarm.</text>

    <rect x="690" y="0" width="210" height="90" rx="8" fill="#161b22" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="705" y="25" fill="#38bdf8" font-family="sans-serif" font-size="12" font-weight="bold">NOISE SUPPRESSION</text>
    <text x="705" y="45" fill="#f0f6fc" font-family="sans-serif" font-size="14" font-weight="800">>800 Hz (Weather)</text>
    <text x="705" y="65" fill="#8b949e" font-family="sans-serif" font-size="11">Environmental rain/wind band.</text>
    <text x="705" y="80" fill="#8b949e" font-family="sans-serif" font-size="11">Suppresses false alarms dynamically.</text>
  </g>
</svg>""")

# -----------------------------------------------------------------------------
# 3. docs/media/03-acoustic-problem/acoustic_research_context.svg
# -----------------------------------------------------------------------------
save_svg("docs/media/03-acoustic-problem/acoustic_research_context.svg", """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" width="100%" height="100%">
  <rect width="1000" height="500" rx="16" fill="#090d13" stroke="#30363d" stroke-width="2"/>
  
  <rect x="30" y="24" width="220" height="28" rx="14" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="140" y="43" fill="#38bdf8" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">EXTERNAL RESEARCH CONTEXT</text>
  <text x="30" y="82" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="800">Published Bio-Acoustic Benchmarks (Zenodo Record 1321278 / NU-Hive)</text>
  <text x="30" y="108" fill="#8b949e" font-family="system-ui, -apple-system, sans-serif" font-size="14">Conceptual representation grounded in Nolasco &amp; Benetos (DCASE 2018) and Cecchi et al. (AES 2018).</text>

  <!-- Flow pipeline -->
  <g transform="translate(40, 140)">
    <!-- Stage 1 -->
    <rect x="0" y="0" width="190" height="260" rx="10" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
    <text x="95" y="30" fill="#f59e0b" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">STAGE 1: AUDIO SOURCE</text>
    <rect x="15" y="50" width="160" height="60" rx="6" fill="#21262d"/>
    <text x="95" y="75" fill="#f0f6fc" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Zenodo Record 1321278</text>
    <text x="95" y="95" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">NU-Hive Field Audio (WAV)</text>
    <text x="15" y="135" fill="#8b949e" font-family="sans-serif" font-size="11">• 78 Annotated Records</text>
    <text x="15" y="155" fill="#8b949e" font-family="sans-serif" font-size="11">• 12 Hours Duration</text>
    <text x="15" y="175" fill="#8b949e" font-family="sans-serif" font-size="11">• Queen Present / Absent</text>
    <text x="15" y="195" fill="#8b949e" font-family="sans-serif" font-size="11">• Active Swarm Audio</text>
    <rect x="15" y="215" width="160" height="30" rx="4" fill="rgba(16, 185, 129, 0.15)"/>
    <text x="95" y="235" fill="#10b981" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">CC BY 4.0 Standard</text>

    <!-- Arrow 1 -->
    <path d="M 205 130 L 225 130" stroke="#f59e0b" stroke-width="3" marker-end="url(#arrow)"/>

    <!-- Stage 2 -->
    <rect x="240" y="0" width="190" height="260" rx="10" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
    <text x="335" y="30" fill="#f59e0b" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">STAGE 2: PREPROCESSING</text>
    <rect x="255" y="50" width="160" height="60" rx="6" fill="#21262d"/>
    <text x="335" y="75" fill="#f0f6fc" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Spectrogram Slicing</text>
    <text x="335" y="95" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">Log-Mel / STFT Transform</text>
    <text x="255" y="135" fill="#8b949e" font-family="sans-serif" font-size="11">• 16 kHz to 2 kHz Resample</text>
    <text x="255" y="155" fill="#8b949e" font-family="sans-serif" font-size="11">• 256-pt Real FFT Window</text>
    <text x="255" y="175" fill="#8b949e" font-family="sans-serif" font-size="11">• Noise Floor Normalization</text>
    <text x="255" y="195" fill="#8b949e" font-family="sans-serif" font-size="11">• 4 Spectral Feature Bands</text>
    <rect x="255" y="215" width="160" height="30" rx="4" fill="rgba(245, 158, 11, 0.15)"/>
    <text x="335" y="235" fill="#f59e0b" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">Feature Vector (4-Band)</text>

    <!-- Arrow 2 -->
    <path d="M 445 130 L 465 130" stroke="#f59e0b" stroke-width="3"/>

    <!-- Stage 3 -->
    <rect x="480" y="0" width="190" height="260" rx="10" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
    <text x="575" y="30" fill="#f59e0b" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">STAGE 3: CLASSIFIER</text>
    <rect x="495" y="50" width="160" height="60" rx="6" fill="#21262d"/>
    <text x="575" y="75" fill="#f0f6fc" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">TinyML 1D-CNN</text>
    <text x="575" y="95" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">75.4 KB Model Footprint</text>
    <text x="495" y="135" fill="#8b949e" font-family="sans-serif" font-size="11">• 1D Depthwise Convolutions</text>
    <text x="495" y="155" fill="#8b949e" font-family="sans-serif" font-size="11">• 14.2 KB SRAM Runtime</text>
    <text x="495" y="175" fill="#8b949e" font-family="sans-serif" font-size="11">• 1.12 ms Inference Latency</text>
    <text x="495" y="195" fill="#8b949e" font-family="sans-serif" font-size="11">• Cortex-M4F HW Target</text>
    <rect x="495" y="215" width="160" height="30" rx="4" fill="rgba(168, 85, 247, 0.15)"/>
    <text x="575" y="235" fill="#c084fc" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">Embedded Cortex-M4F</text>

    <!-- Arrow 3 -->
    <path d="M 685 130 L 705 130" stroke="#f59e0b" stroke-width="3"/>

    <!-- Stage 4 -->
    <rect x="720" y="0" width="200" height="260" rx="10" fill="#161b22" stroke="#10b981" stroke-width="1.5"/>
    <text x="820" y="30" fill="#10b981" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">STAGE 4: OUTCOME</text>
    <rect x="735" y="50" width="170" height="60" rx="6" fill="#21262d"/>
    <text x="820" y="75" fill="#f0f6fc" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Diagnostic State</text>
    <text x="820" y="95" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">30-Sample Stress Test</text>
    <text x="735" y="135" fill="#10b981" font-family="sans-serif" font-size="11">✓ Normal Healthy (180 Hz)</text>
    <text x="735" y="155" fill="#f59e0b" font-family="sans-serif" font-size="11">✓ Pre-Swarm Alert (340 Hz)</text>
    <text x="735" y="175" fill="#ef4444" font-family="sans-serif" font-size="11">✓ Queenless Distress (550 Hz)</text>
    <text x="735" y="195" fill="#38bdf8" font-family="sans-serif" font-size="11">✓ Rain Filter Suppressed</text>
    <rect x="735" y="215" width="170" height="30" rx="4" fill="rgba(16, 185, 129, 0.2)"/>
    <text x="820" y="235" fill="#10b981" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">100% Synthetic Pass Rate</text>
  </g>

  <!-- Footer note -->
  <text x="50" y="460" fill="#8b949e" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-style="italic">Note: Conceptual representation based on published honey bee acoustic monitoring research (Zenodo Record 1321278). Distinguished from local empirical field deployments.</text>
</svg>""")

# -----------------------------------------------------------------------------
# 4. docs/media/04-system/system_architecture.svg
# -----------------------------------------------------------------------------
save_svg("docs/media/04-system/system_architecture.svg", """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 620" width="100%" height="100%">
  <rect width="1100" height="620" rx="16" fill="#090d13" stroke="#30363d" stroke-width="2"/>
  
  <rect x="30" y="24" width="170" height="28" rx="14" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="115" y="43" fill="#f59e0b" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">SYSTEM ARCHITECTURE</text>
  <text x="30" y="82" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="800">Beevil Knievel Master Cyber-Physical Architecture</text>
  <text x="30" y="108" fill="#8b949e" font-family="system-ui, -apple-system, sans-serif" font-size="14">Decentralized sensor nodes → Sub-GHz LoRa Mesh → Raspberry Pi 3B+ hardened edge base station → P2P web &amp; mobile dashboards.</text>

  <!-- Block 1: Field Nodes -->
  <g transform="translate(30, 140)">
    <rect width="320" height="440" rx="12" fill="#161b22" stroke="#f59e0b" stroke-width="1.5"/>
    <rect x="15" y="15" width="290" height="30" rx="6" fill="#21262d"/>
    <text x="160" y="35" fill="#f59e0b" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">HIVE FIELD NODES (UP TO 100 NODES)</text>
    
    <!-- MCU -->
    <rect x="20" y="60" width="280" height="60" rx="8" fill="#0d1117" stroke="#30363d"/>
    <text x="35" y="84" fill="#f0f6fc" font-family="sans-serif" font-size="13" font-weight="bold">RAK4631 (Nordic nRF52840)</text>
    <text x="35" y="104" fill="#8b949e" font-family="monospace" font-size="11">ARM Cortex-M4F @ 64MHz | 1MB Flash | 256KB RAM</text>

    <!-- Sensors -->
    <rect x="20" y="130" width="280" height="150" rx="8" fill="#0d1117" stroke="#30363d"/>
    <text x="35" y="152" fill="#f59e0b" font-family="monospace" font-size="11" font-weight="bold">MULTI-MODAL SENSOR SUITE</text>
    <text x="35" y="174" fill="#f0f6fc" font-family="sans-serif" font-size="12">• TI TMP117: ±0.1°C Brood Core Probe (I2C: 0x48)</text>
    <text x="35" y="194" fill="#f0f6fc" font-family="sans-serif" font-size="12">• 5x Maxim DS18B20: Frame Thermal Array (1-Wire)</text>
    <text x="35" y="214" fill="#f0f6fc" font-family="sans-serif" font-size="12">• Sensirion SCD41: Photoacoustic NDIR CO2 (I2C: 0x62)</text>
    <text x="35" y="234" fill="#f0f6fc" font-family="sans-serif" font-size="12">• TDK INMP441: 24-bit MEMS I2S Microphone</text>
    <text x="35" y="254" fill="#f0f6fc" font-family="sans-serif" font-size="12">• Bosch BME688: Multi-Gas &amp; VOC Pheromones</text>
    <text x="35" y="270" fill="#f0f6fc" font-family="sans-serif" font-size="12">• ST LIS3DH Tilt &amp; M5Stack HX711 Weight Scale</text>

    <!-- Edge Engine -->
    <rect x="20" y="290" width="280" height="65" rx="8" fill="#0d1117" stroke="#30363d"/>
    <text x="35" y="312" fill="#10b981" font-family="monospace" font-size="11" font-weight="bold">LOCAL ON-NODE DSP &amp; TRIAGE</text>
    <text x="35" y="332" fill="#8b949e" font-family="sans-serif" font-size="11">• CMSIS-DSP 256-pt Real FFT (fs=2kHz, Δf=7.8Hz)</text>
    <text x="35" y="347" fill="#8b949e" font-family="sans-serif" font-size="11">• CUSUM Thermal Drift Filter (Sk accumulation)</text>

    <!-- Transceiver -->
    <rect x="20" y="365" width="280" height="60" rx="8" fill="#0d1117" stroke="#f59e0b"/>
    <text x="35" y="388" fill="#f59e0b" font-family="sans-serif" font-size="13" font-weight="bold">Semtech SX1262 LoRa Transceiver</text>
    <text x="35" y="408" fill="#8b949e" font-family="monospace" font-size="11">IN865 (865.06MHz) | +14dBm | SF7 | 32-Byte Packet</text>
  </g>

  <!-- Connective Arrow 1 -->
  <g transform="translate(365, 340)">
    <path d="M 0 0 L 30 0" stroke="#f59e0b" stroke-width="3" stroke-dasharray="4 2"/>
    <polygon points="30,-5 40,0 30,5" fill="#f59e0b"/>
    <text x="20" y="-12" fill="#f59e0b" font-family="monospace" font-size="10" text-anchor="middle">SUB-GHz LoRa</text>
    <text x="20" y="22" fill="#8b949e" font-family="monospace" font-size="9" text-anchor="middle">MULTI-HOP MESH</text>
  </g>

  <!-- Block 2: Gateway Server -->
  <g transform="translate(420, 140)">
    <rect width="330" height="440" rx="12" fill="#161b22" stroke="#38bdf8" stroke-width="1.5"/>
    <rect x="15" y="15" width="300" height="30" rx="6" fill="#21262d"/>
    <text x="165" y="35" fill="#38bdf8" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">RASPBERRY PI Raspberry Pi 3B+ LINUX EDGE GATEWAY</text>

    <!-- Hardware -->
    <rect x="20" y="60" width="290" height="60" rx="8" fill="#0d1117" stroke="#30363d"/>
    <text x="35" y="84" fill="#f0f6fc" font-family="sans-serif" font-size="13" font-weight="bold">Raspberry Pi 3B+</text>
    <text x="35" y="104" fill="#8b949e" font-family="monospace" font-size="11">BCM2711 Quad-A72 @ 1.5GHz | Waveshare SX1262 HAT</text>

    <!-- Gateway Daemons -->
    <rect x="20" y="130" width="290" height="225" rx="8" fill="#0d1117" stroke="#30363d"/>
    <text x="35" y="152" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="bold">DAEMON SERVICES &amp; INTELLIGENCE</text>
    <text x="35" y="174" fill="#f0f6fc" font-family="sans-serif" font-size="12">1. OverlayFS: Permanent Read-Only Root + WAL</text>
    <text x="35" y="194" fill="#f0f6fc" font-family="sans-serif" font-size="12">2. LoRa Receiver Daemon: Ingestion @ 148 pkts/s</text>
    <text x="35" y="214" fill="#f0f6fc" font-family="sans-serif" font-size="12">3. SQLite WAL Time-Series: 100-Hive Database</text>
    <text x="35" y="234" fill="#f0f6fc" font-family="sans-serif" font-size="12">4. Multi-Modal Diagnostic AI: 8 Diagnostic Classes</text>
    <text x="35" y="254" fill="#f0f6fc" font-family="sans-serif" font-size="12">5. FastAPI REST Engine + WebSockets Stream</text>
    <text x="35" y="274" fill="#f0f6fc" font-family="sans-serif" font-size="12">6. WireGuard P2P Mesh + Local SLM Advisor</text>
    <text x="35" y="294" fill="#f0f6fc" font-family="sans-serif" font-size="12">7. mDNS Auto-Discovery: http://beevil.local</text>
    <text x="35" y="314" fill="#f0f6fc" font-family="sans-serif" font-size="12">8. Telegram Automated Field Outage Notifier</text>
    <text x="35" y="334" fill="#f0f6fc" font-family="sans-serif" font-size="12">9. HoneyChain Merkle Provenance Validator</text>

    <!-- Network -->
    <rect x="20" y="365" width="290" height="60" rx="8" fill="#0d1117" stroke="#38bdf8"/>
    <text x="35" y="388" fill="#38bdf8" font-family="sans-serif" font-size="13" font-weight="bold">Local Farm Wi-Fi AP / LAN / Cellular</text>
    <text x="35" y="408" fill="#8b949e" font-family="monospace" font-size="11">Zero Cloud Dependency | Fully Autonomous Edge</text>
  </g>

  <!-- Connective Arrow 2 -->
  <g transform="translate(765, 340)">
    <path d="M 0 0 L 30 0" stroke="#10b981" stroke-width="3"/>
    <polygon points="30,-5 40,0 30,5" fill="#10b981"/>
    <text x="20" y="-12" fill="#10b981" font-family="monospace" font-size="10" text-anchor="middle">HTTP / WS</text>
    <text x="20" y="22" fill="#8b949e" font-family="monospace" font-size="9" text-anchor="middle">mDNS / PWA</text>
  </g>

  <!-- Block 3: Frontend & Field App -->
  <g transform="translate(820, 140)">
    <rect width="250" height="440" rx="12" fill="#161b22" stroke="#10b981" stroke-width="1.5"/>
    <rect x="15" y="15" width="220" height="30" rx="6" fill="#21262d"/>
    <text x="125" y="35" fill="#10b981" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">USER DASHBOARD INTERFACES</text>

    <rect x="15" y="60" width="220" height="110" rx="8" fill="#0d1117" stroke="#30363d"/>
    <text x="25" y="82" fill="#f59e0b" font-family="sans-serif" font-size="12" font-weight="bold">1. Playdate Field Console</text>
    <text x="25" y="100" fill="#8b949e" font-family="sans-serif" font-size="10">• 1-Bit Reflective Memory LCD</text>
    <text x="25" y="115" fill="#8b949e" font-family="sans-serif" font-size="10">• Mechanical Crank Navigation</text>
    <text x="25" y="130" fill="#8b949e" font-family="sans-serif" font-size="10">• Live Web Audio Synthesizer</text>
    <text x="25" y="145" fill="#8b949e" font-family="monospace" font-size="9" fill-opacity="0.8">/playdate route</text>

    <rect x="15" y="180" width="220" height="110" rx="8" fill="#0d1117" stroke="#30363d"/>
    <text x="25" y="202" fill="#10b981" font-family="sans-serif" font-size="12" font-weight="bold">2. HiveOS Mobile Field App</text>
    <text x="25" y="220" fill="#8b949e" font-family="sans-serif" font-size="10">• 100-Hive Matrix Health Grid</text>
    <text x="25" y="235" fill="#8b949e" font-family="sans-serif" font-size="10">• 5-Point Frame Heatmap</text>
    <text x="25" y="250" fill="#8b949e" font-family="sans-serif" font-size="10">• CUSUM Drift Inspector</text>
    <text x="25" y="265" fill="#8b949e" font-family="monospace" font-size="9" fill-opacity="0.8">/app route</text>

    <rect x="15" y="300" width="220" height="125" rx="8" fill="#0d1117" stroke="#30363d"/>
    <text x="25" y="322" fill="#38bdf8" font-family="sans-serif" font-size="12" font-weight="bold">3. HoneyChain Explorer</text>
    <text x="25" y="340" fill="#8b949e" font-family="sans-serif" font-size="10">• SHA-256 Merkle Provenance</text>
    <text x="25" y="355" fill="#8b949e" font-family="sans-serif" font-size="10">• Adulteration Proof Cryptography</text>
    <text x="25" y="370" fill="#8b949e" font-family="sans-serif" font-size="10">• Batch Purity &amp; Floral Origin</text>
    <text x="25" y="385" fill="#8b949e" font-family="sans-serif" font-size="10">• Offline Harvest Certification</text>
    <text x="25" y="405" fill="#8b949e" font-family="monospace" font-size="9" fill-opacity="0.8">Zero Monthly Cloud Fees</text>
  </g>
</svg>""")

# -----------------------------------------------------------------------------
# 5. docs/media/04-system/hive_to_dashboard_flow.svg
# -----------------------------------------------------------------------------
save_svg("docs/media/04-system/hive_to_dashboard_flow.svg", """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 320" width="100%" height="100%">
  <rect width="1000" height="320" rx="16" fill="#090d13" stroke="#30363d" stroke-width="2"/>
  
  <rect x="30" y="20" width="160" height="26" rx="13" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="110" y="37" fill="#f59e0b" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">END-TO-END PIPELINE</text>
  <text x="30" y="75" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800">From Hive to Dashboard: Complete Telemetry Journey</text>

  <g transform="translate(30, 110)">
    <!-- 1. HIVE -->
    <rect x="0" y="0" width="130" height="150" rx="8" fill="#161b22" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="65" y="30" fill="#f59e0b" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">1. HIVE</text>
    <text x="65" y="65" fill="#f0f6fc" font-family="sans-serif" font-size="11" text-anchor="middle">Langstroth Box</text>
    <text x="65" y="85" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">Brood Comb</text>
    <text x="65" y="105" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">Colony Acoustics</text>
    <text x="65" y="125" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">CO2 &amp; VOC Gas</text>

    <!-- Arrow -->
    <path d="M 135 75 L 155 75" stroke="#f59e0b" stroke-width="2"/>

    <!-- 2. SENSORS -->
    <rect x="160" y="0" width="130" height="150" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
    <text x="225" y="30" fill="#38bdf8" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">2. TRANSDUCERS</text>
    <text x="225" y="65" fill="#f0f6fc" font-family="sans-serif" font-size="11" text-anchor="middle">TMP117 ±0.1°C</text>
    <text x="225" y="85" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">5x DS18B20 Array</text>
    <text x="225" y="105" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">INMP441 I2S Audio</text>
    <text x="225" y="125" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">SCD41 NDIR CO2</text>

    <!-- Arrow -->
    <path d="M 295 75 L 315 75" stroke="#f59e0b" stroke-width="2"/>

    <!-- 3. LOCAL DSP -->
    <rect x="320" y="0" width="130" height="150" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
    <text x="385" y="30" fill="#10b981" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">3. LOCAL DSP</text>
    <text x="385" y="65" fill="#f0f6fc" font-family="sans-serif" font-size="11" text-anchor="middle">nRF52840 Cortex</text>
    <text x="385" y="85" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">CMSIS-DSP FFT</text>
    <text x="385" y="105" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">CUSUM Filter</text>
    <text x="385" y="125" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">32-Byte Packed</text>

    <!-- Arrow -->
    <path d="M 455 75 L 475 75" stroke="#f59e0b" stroke-width="2"/>

    <!-- 4. LORA MESH -->
    <rect x="480" y="0" width="130" height="150" rx="8" fill="#161b22" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="545" y="30" fill="#f59e0b" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">4. LORA MESH</text>
    <text x="545" y="65" fill="#f0f6fc" font-family="sans-serif" font-size="11" text-anchor="middle">Semtech SX1262</text>
    <text x="545" y="85" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">IN865 (865 MHz)</text>
    <text x="545" y="105" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">Multi-Hop TTL</text>
    <text x="545" y="125" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">Canopy Penetration</text>

    <!-- Arrow -->
    <path d="M 615 75 L 635 75" stroke="#f59e0b" stroke-width="2"/>

    <!-- 5. Raspberry Pi 3B+ GATEWAY -->
    <rect x="640" y="0" width="130" height="150" rx="8" fill="#161b22" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="705" y="30" fill="#38bdf8" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">5. Raspberry Pi 3B+ GATEWAY</text>
    <text x="705" y="65" fill="#f0f6fc" font-family="sans-serif" font-size="11" text-anchor="middle">Raspberry Pi 3B+</text>
    <text x="705" y="85" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">SQLite WAL Ingest</text>
    <text x="705" y="105" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">Multi-Modal AI</text>
    <text x="705" y="125" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">FastAPI Engine</text>

    <!-- Arrow -->
    <path d="M 775 75 L 795 75" stroke="#10b981" stroke-width="2"/>

    <!-- 6. USER INTERFACE -->
    <rect x="800" y="0" width="140" height="150" rx="8" fill="#161b22" stroke="#10b981" stroke-width="1.5"/>
    <text x="870" y="30" fill="#10b981" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">6. BEEKEEPER UI</text>
    <text x="870" y="65" fill="#f0f6fc" font-family="sans-serif" font-size="11" text-anchor="middle">HiveOS Mobile PWA</text>
    <text x="870" y="85" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">Playdate Console</text>
    <text x="870" y="105" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">Telegram Alert Bot</text>
    <text x="870" y="125" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">HoneyChain Provenance</text>
  </g>
</svg>""")

# -----------------------------------------------------------------------------
# 6. docs/media/04-system/telemetry_packet_flow.svg
# -----------------------------------------------------------------------------
save_svg("docs/media/04-system/telemetry_packet_flow.svg", """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 480" width="100%" height="100%">
  <rect width="1000" height="480" rx="16" fill="#090d13" stroke="#30363d" stroke-width="2"/>
  
  <rect x="30" y="24" width="170" height="28" rx="14" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="115" y="43" fill="#f59e0b" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">WIRE PROTOCOL</text>
  <text x="30" y="82" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="800">32-Byte Packed Binary Telemetry Wire Protocol</text>
  <text x="30" y="108" fill="#8b949e" font-family="monospace" font-size="13">#pragma pack(push, 1) — Strict bit-aligned serialization with zero padding overhead.</text>

  <!-- Byte Map Table -->
  <g transform="translate(30, 140)">
    <!-- Headers -->
    <rect x="0" y="0" width="940" height="30" rx="6" fill="#161b22" stroke="#30363d"/>
    <text x="20" y="20" fill="#8b949e" font-family="monospace" font-size="11" font-weight="bold">OFFSET</text>
    <text x="90" y="20" fill="#8b949e" font-family="monospace" font-size="11" font-weight="bold">FIELD NAME</text>
    <text x="320" y="20" fill="#8b949e" font-family="monospace" font-size="11" font-weight="bold">C TYPE</text>
    <text x="440" y="20" fill="#8b949e" font-family="monospace" font-size="11" font-weight="bold">BYTES</text>
    <text x="510" y="20" fill="#8b949e" font-family="monospace" font-size="11" font-weight="bold">PHYSICAL ENGINEERING RANGE &amp; RESOLUTION</text>

    <!-- Rows -->
    <g transform="translate(0, 35)">
      <rect x="0" y="0" width="940" height="26" fill="#0d1117"/>
      <text x="20" y="18" fill="#f59e0b" font-family="monospace" font-size="11">0x00</text>
      <text x="90" y="18" fill="#f0f6fc" font-family="sans-serif" font-size="12" font-weight="bold">hive_id</text>
      <text x="320" y="18" fill="#8b949e" font-family="monospace" font-size="11">uint16_t</text>
      <text x="440" y="18" fill="#8b949e" font-family="monospace" font-size="11">2</text>
      <text x="510" y="18" fill="#8b949e" font-family="sans-serif" font-size="11">Hive Node ID (0x0001 – 0x0064, capacity 100 hives)</text>
    </g>

    <g transform="translate(0, 65)">
      <rect x="0" y="0" width="940" height="26" fill="#161b22"/>
      <text x="20" y="18" fill="#f59e0b" font-family="monospace" font-size="11">0x02</text>
      <text x="90" y="18" fill="#f0f6fc" font-family="sans-serif" font-size="12" font-weight="bold">brood_core_temp_c_x100</text>
      <text x="320" y="18" fill="#8b949e" font-family="monospace" font-size="11">int16_t</text>
      <text x="440" y="18" fill="#8b949e" font-family="monospace" font-size="11">2</text>
      <text x="510" y="18" fill="#8b949e" font-family="sans-serif" font-size="11">Brood reference temperature (-40.00°C to +85.00°C, res 0.01°C)</text>
    </g>

    <g transform="translate(0, 95)">
      <rect x="0" y="0" width="940" height="26" fill="#0d1117"/>
      <text x="20" y="18" fill="#f59e0b" font-family="monospace" font-size="11">0x04</text>
      <text x="90" y="18" fill="#f0f6fc" font-family="sans-serif" font-size="12" font-weight="bold">frame_temps_c_x100[5]</text>
      <text x="320" y="18" fill="#8b949e" font-family="monospace" font-size="11">int16_t[5]</text>
      <text x="440" y="18" fill="#8b949e" font-family="monospace" font-size="11">10</text>
      <text x="510" y="18" fill="#8b949e" font-family="sans-serif" font-size="11">5-Point Frame Array (Left-Outer, Brood-L, Core, Brood-R, Right-Outer)</text>
    </g>

    <g transform="translate(0, 125)">
      <rect x="0" y="0" width="940" height="26" fill="#161b22"/>
      <text x="20" y="18" fill="#f59e0b" font-family="monospace" font-size="11">0x0E</text>
      <text x="90" y="18" fill="#f0f6fc" font-family="sans-serif" font-size="12" font-weight="bold">humidity_pct_x100</text>
      <text x="320" y="18" fill="#8b949e" font-family="monospace" font-size="11">uint16_t</text>
      <text x="440" y="18" fill="#8b949e" font-family="monospace" font-size="11">2</text>
      <text x="510" y="18" fill="#8b949e" font-family="sans-serif" font-size="11">Relative Humidity (0.00% to 100.00%, res 0.01% RH)</text>
    </g>

    <g transform="translate(0, 155)">
      <rect x="0" y="0" width="940" height="26" fill="#0d1117"/>
      <text x="20" y="18" fill="#f59e0b" font-family="monospace" font-size="11">0x10</text>
      <text x="90" y="18" fill="#f0f6fc" font-family="sans-serif" font-size="12" font-weight="bold">voc_gas_kohm_x10</text>
      <text x="320" y="18" fill="#8b949e" font-family="monospace" font-size="11">uint16_t</text>
      <text x="440" y="18" fill="#8b949e" font-family="monospace" font-size="11">2</text>
      <text x="510" y="18" fill="#8b949e" font-family="sans-serif" font-size="11">BME688 MOX gas sensor resistance (0 to 6553.5 kΩ, foulbrood check)</text>
    </g>

    <g transform="translate(0, 185)">
      <rect x="0" y="0" width="940" height="26" fill="#161b22"/>
      <text x="20" y="18" fill="#f59e0b" font-family="monospace" font-size="11">0x12</text>
      <text x="90" y="18" fill="#f0f6fc" font-family="sans-serif" font-size="12" font-weight="bold">co2_ppm</text>
      <text x="320" y="18" fill="#8b949e" font-family="monospace" font-size="11">uint16_t</text>
      <text x="440" y="18" fill="#8b949e" font-family="monospace" font-size="11">2</text>
      <text x="510" y="18" fill="#8b949e" font-family="sans-serif" font-size="11">SCD41 Photoacoustic NDIR CO2 (400 to 5000 ppm, fanning metric)</text>
    </g>

    <g transform="translate(0, 215)">
      <rect x="0" y="0" width="940" height="26" fill="#0d1117"/>
      <text x="20" y="18" fill="#f59e0b" font-family="monospace" font-size="11">0x14</text>
      <text x="90" y="18" fill="#f0f6fc" font-family="sans-serif" font-size="12" font-weight="bold">weight_kg_x100</text>
      <text x="320" y="18" fill="#8b949e" font-family="monospace" font-size="11">uint16_t</text>
      <text x="440" y="18" fill="#8b949e" font-family="monospace" font-size="11">2</text>
      <text x="510" y="18" fill="#8b949e" font-family="sans-serif" font-size="11">HX711 24-bit load cell net hive weight (0.00 to 655.35 kg, honey yield)</text>
    </g>

    <g transform="translate(0, 245)">
      <rect x="0" y="0" width="940" height="26" fill="#161b22"/>
      <text x="20" y="18" fill="#f59e0b" font-family="monospace" font-size="11">0x16</text>
      <text x="90" y="18" fill="#f0f6fc" font-family="sans-serif" font-size="12" font-weight="bold">lux</text>
      <text x="320" y="18" fill="#8b949e" font-family="monospace" font-size="11">uint16_t</text>
      <text x="440" y="18" fill="#8b949e" font-family="monospace" font-size="11">2</text>
      <text x="510" y="18" fill="#8b949e" font-family="sans-serif" font-size="11">Solar illuminance (0 to 65535 lux, foraging &amp; flight window correlation)</text>
    </g>

    <g transform="translate(0, 275)">
      <rect x="0" y="0" width="940" height="26" fill="#0d1117"/>
      <text x="20" y="18" fill="#ef4444" font-family="monospace" font-size="11">0x18</text>
      <text x="90" y="18" fill="#f0f6fc" font-family="sans-serif" font-size="12" font-weight="bold">tilt_deg / alert_flags</text>
      <text x="320" y="18" fill="#8b949e" font-family="monospace" font-size="11">uint8_t</text>
      <text x="440" y="18" fill="#8b949e" font-family="monospace" font-size="11">1</text>
      <text x="510" y="18" fill="#ef4444" font-family="sans-serif" font-size="11">Bit 7: CUSUM Drift | Bit 6: Pre-Swarm Buzz | Bit 5: Low SoC | Bits 0-4: Tilt Angle</text>
    </g>

    <g transform="translate(0, 305)">
      <rect x="0" y="0" width="940" height="26" fill="#161b22"/>
      <text x="20" y="18" fill="#10b981" font-family="monospace" font-size="11">0x19</text>
      <text x="90" y="18" fill="#f0f6fc" font-family="sans-serif" font-size="12" font-weight="bold">fft_energy_bands[8]</text>
      <text x="320" y="18" fill="#8b949e" font-family="monospace" font-size="11">uint8_t[8]</text>
      <text x="440" y="18" fill="#8b949e" font-family="monospace" font-size="11">8</text>
      <text x="510" y="18" fill="#10b981" font-family="sans-serif" font-size="11">8 Normalized Acoustic Energy Bands (0 to 255): 100-180, 180-240, 240-350, 350-500, >800Hz</text>
    </g>
  </g>
</svg>""")

# -----------------------------------------------------------------------------
# 7. docs/media/05-hardware/field_node_architecture.svg
# -----------------------------------------------------------------------------
save_svg("docs/media/05-hardware/field_node_architecture.svg", """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 560" width="100%" height="100%">
  <rect width="1000" height="560" rx="16" fill="#090d13" stroke="#30363d" stroke-width="2"/>
  
  <rect x="30" y="24" width="170" height="28" rx="14" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="115" y="43" fill="#f59e0b" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">HARDWARE MAPPING</text>
  <text x="30" y="82" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="800">RAK4631 / Nordic nRF52840 Field Node Electrical Interconnect</text>
  <text x="30" y="108" fill="#8b949e" font-family="system-ui, -apple-system, sans-serif" font-size="14">WisBlock baseboard pin assignments, high-speed digital buses, and analog interfaces.</text>

  <!-- Central MCU -->
  <g transform="translate(350, 150)">
    <rect width="300" height="360" rx="12" fill="#161b22" stroke="#f59e0b" stroke-width="2"/>
    <rect x="20" y="20" width="260" height="30" rx="6" fill="#21262d"/>
    <text x="150" y="40" fill="#f59e0b" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">RAK4631 CORE MODULE</text>
    
    <text x="150" y="80" fill="#f0f6fc" font-family="sans-serif" font-size="14" font-weight="800" text-anchor="middle">Nordic nRF52840</text>
    <text x="150" y="98" fill="#8b949e" font-family="monospace" font-size="11" text-anchor="middle">ARM Cortex-M4F @ 64MHz</text>
    
    <line x1="20" y1="115" x2="280" y2="115" stroke="#30363d"/>

    <text x="30" y="140" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="bold">I2C BUS (Fast Mode 400kHz)</text>
    <text x="30" y="158" fill="#8b949e" font-family="monospace" font-size="10">P0.13 (SDA) | P0.14 (SCL)</text>

    <text x="30" y="185" fill="#10b981" font-family="monospace" font-size="11" font-weight="bold">I2S DIGITAL AUDIO (16kHz)</text>
    <text x="30" y="203" fill="#8b949e" font-family="monospace" font-size="10">P0.28 (SD) | P0.29 (SCK) | P0.30 (WS)</text>

    <text x="30" y="230" fill="#f59e0b" font-family="monospace" font-size="11" font-weight="bold">1-WIRE MULTI-DROP</text>
    <text x="30" y="248" fill="#8b949e" font-family="monospace" font-size="10">P0.17 + 4.7kΩ Pullup Resistor</text>

    <text x="30" y="275" fill="#c084fc" font-family="monospace" font-size="11" font-weight="bold">SAADC BATTERY DIVIDER</text>
    <text x="30" y="293" fill="#8b949e" font-family="monospace" font-size="10">P0.04 (AIN2) + P0.29 Enable Gate</text>

    <rect x="20" y="310" width="260" height="36" rx="6" fill="#0d1117" stroke="#f59e0b"/>
    <text x="150" y="332" fill="#f59e0b" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">Semtech SX1262 LoRa @ 865MHz</text>
  </g>

  <!-- Left: I2C Sensors -->
  <g transform="translate(40, 150)">
    <rect width="250" height="360" rx="12" fill="#161b22" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="125" y="30" fill="#38bdf8" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">I2C SENSOR PERIPHERALS</text>
    
    <g transform="translate(15, 50)">
      <rect width="220" height="60" rx="6" fill="#0d1117" stroke="#30363d"/>
      <text x="15" y="25" fill="#f0f6fc" font-family="sans-serif" font-size="12" font-weight="bold">TI TMP117 High Precision</text>
      <text x="15" y="45" fill="#8b949e" font-family="monospace" font-size="10">Addr: 0x48 | ±0.1°C NIST Traceable</text>
    </g>

    <g transform="translate(15, 125)">
      <rect width="220" height="60" rx="6" fill="#0d1117" stroke="#30363d"/>
      <text x="15" y="25" fill="#f0f6fc" font-family="sans-serif" font-size="12" font-weight="bold">Sensirion SCD41 NDIR CO2</text>
      <text x="15" y="45" fill="#8b949e" font-family="monospace" font-size="10">Addr: 0x62 | Photoacoustic Sensor</text>
    </g>

    <g transform="translate(15, 200)">
      <rect width="220" height="60" rx="6" fill="#0d1117" stroke="#30363d"/>
      <text x="15" y="25" fill="#f0f6fc" font-family="sans-serif" font-size="12" font-weight="bold">Bosch BME688 Multi-Gas</text>
      <text x="15" y="45" fill="#8b949e" font-family="monospace" font-size="10">Addr: 0x76 | VOC, Temp, Hum, Press</text>
    </g>

    <g transform="translate(15, 275)">
      <rect width="220" height="65" rx="6" fill="#0d1117" stroke="#30363d"/>
      <text x="15" y="25" fill="#f0f6fc" font-family="sans-serif" font-size="12" font-weight="bold">ST LIS3DH + M5 HX711</text>
      <text x="15" y="42" fill="#8b949e" font-family="monospace" font-size="10">LIS3DH: 0x18 | ±2g Knockdown</text>
      <text x="15" y="56" fill="#8b949e" font-family="monospace" font-size="10">HX711: 0x26 | 24-bit Scale ADC</text>
    </g>
  </g>

  <!-- Connective Lines Left -->
  <path d="M 290 330 L 350 330" stroke="#38bdf8" stroke-width="2"/>

  <!-- Right: Audio, 1-Wire & Power -->
  <g transform="translate(710, 150)">
    <rect width="250" height="360" rx="12" fill="#161b22" stroke="#10b981" stroke-width="1.5"/>
    <text x="125" y="30" fill="#10b981" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">AUDIO, 1-WIRE &amp; POWER</text>
    
    <g transform="translate(15, 50)">
      <rect width="220" height="60" rx="6" fill="#0d1117" stroke="#30363d"/>
      <text x="15" y="25" fill="#10b981" font-family="sans-serif" font-size="12" font-weight="bold">TDK INMP441 Digital Mic</text>
      <text x="15" y="45" fill="#8b949e" font-family="monospace" font-size="10">I2S Interface | 61 dB SNR MEMS</text>
    </g>

    <g transform="translate(15, 125)">
      <rect width="220" height="65" rx="6" fill="#0d1117" stroke="#30363d"/>
      <text x="15" y="25" fill="#f59e0b" font-family="sans-serif" font-size="12" font-weight="bold">5x Maxim DS18B20 Probes</text>
      <text x="15" y="42" fill="#8b949e" font-family="monospace" font-size="10">1-Wire Digital Bus (P0.17)</text>
      <text x="15" y="56" fill="#8b949e" font-family="monospace" font-size="10">Frame 1 to Frame 5 Thermal Grid</text>
    </g>

    <g transform="translate(15, 205)">
      <rect width="220" height="70" rx="6" fill="#0d1117" stroke="#30363d"/>
      <text x="15" y="25" fill="#f0f6fc" font-family="sans-serif" font-size="12" font-weight="bold">Solar &amp; LiPo Energy System</text>
      <text x="15" y="42" fill="#8b949e" font-family="monospace" font-size="10">6V 100mAh Solar Panel</text>
      <text x="15" y="58" fill="#8b949e" font-family="monospace" font-size="10">3.7V 1000mAh 18650 / LiPo Cell</text>
    </g>

    <g transform="translate(15, 290)">
      <rect width="220" height="50" rx="6" fill="#0d1117" stroke="#30363d"/>
      <text x="15" y="22" fill="#8b949e" font-family="sans-serif" font-size="11" font-weight="bold">Sensor Power Gate MOSFET</text>
      <text x="15" y="38" fill="#8b949e" font-family="monospace" font-size="10">WB_IO2 (P1.02) Disconnects in Sleep</text>
    </g>
  </g>

  <!-- Connective Lines Right -->
  <path d="M 650 330 L 710 330" stroke="#10b981" stroke-width="2"/>
</svg>""")

# -----------------------------------------------------------------------------
# 8. docs/media/05-hardware/power_architecture.svg
# -----------------------------------------------------------------------------
save_svg("docs/media/05-hardware/power_architecture.svg", """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 520" width="100%" height="100%">
  <rect width="1000" height="520" rx="16" fill="#090d13" stroke="#30363d" stroke-width="2"/>
  
  <rect x="30" y="24" width="170" height="28" rx="14" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="115" y="43" fill="#f59e0b" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">POWER ARCHITECTURE</text>
  <text x="30" y="82" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="800">Deterministic Duty Cycle &amp; Modeled Solar Energy Autonomy</text>
  <text x="30" y="108" fill="#8b949e" font-family="system-ui, -apple-system, sans-serif" font-size="14">3-Phase deterministic cycle (T = 300s): Active Acquisition (1.2s) → LoRa TX Burst (0.072s) → Deep Sleep (298.7s).</text>

  <!-- Duty Cycle Timeline -->
  <g transform="translate(50, 150)">
    <rect width="900" height="80" rx="8" fill="#161b22" stroke="#30363d"/>
    
    <!-- Deep Sleep: 298.7s -->
    <rect x="0" y="0" width="720" height="80" rx="8" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="360" y="35" fill="#38bdf8" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">PHASE 1: ULTRA-LOW POWER DEEP SLEEP (t = 298.728 s)</text>
    <text x="360" y="58" fill="#8b949e" font-family="monospace" font-size="12" text-anchor="middle">I_sleep = 2.0 µA (Sensors unpowered via MOSFET gate WB_IO2)</text>

    <!-- Acquisition: 1.2s -->
    <rect x="720" y="0" width="100" height="80" fill="rgba(245, 158, 11, 0.25)" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="770" y="32" fill="#f59e0b" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">PHASE 2</text>
    <text x="770" y="48" fill="#f0f6fc" font-family="sans-serif" font-size="10" text-anchor="middle">Sensing + DSP</text>
    <text x="770" y="65" fill="#8b949e" font-family="monospace" font-size="9" text-anchor="middle">55.0 mA (1.2s)</text>

    <!-- LoRa TX: 72ms -->
    <rect x="820" y="0" width="80" height="80" rx="8" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" stroke-width="1.5"/>
    <text x="860" y="32" fill="#ef4444" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">PHASE 3</text>
    <text x="860" y="48" fill="#f0f6fc" font-family="sans-serif" font-size="10" text-anchor="middle">LoRa TX</text>
    <text x="860" y="65" fill="#8b949e" font-family="monospace" font-size="9" text-anchor="middle">118mA (72ms)</text>
  </g>

  <!-- Metrics Table -->
  <g transform="translate(50, 270)">
    <!-- Metric 1: Charge per cycle -->
    <rect x="0" y="0" width="280" height="110" rx="8" fill="#161b22" stroke="#30363d"/>
    <text x="20" y="30" fill="#8b949e" font-family="monospace" font-size="11">CHARGE CONSUMED / CYCLE</text>
    <text x="20" y="65" fill="#f0f6fc" font-family="system-ui, sans-serif" font-size="24" font-weight="800">70.13 mA·s</text>
    <text x="20" y="90" fill="#8b949e" font-family="sans-serif" font-size="12">Q_cycle = (55mA×1.2s) + (118mA×0.072s)</text>

    <!-- Metric 2: Continuous average current -->
    <rect x="310" y="0" width="280" height="110" rx="8" fill="#161b22" stroke="#30363d"/>
    <text x="330" y="30" fill="#8b949e" font-family="monospace" font-size="11">AVERAGE CURRENT DRAW</text>
    <text x="330" y="65" fill="#10b981" font-family="system-ui, sans-serif" font-size="24" font-weight="800">233.78 µA</text>
    <text x="330" y="90" fill="#8b949e" font-family="sans-serif" font-size="12">I_avg = Q_cycle / 300.0 seconds</text>

    <!-- Metric 3: Solar harvesting equilibrium -->
    <rect x="620" y="0" width="280" height="110" rx="8" fill="#161b22" stroke="#f59e0b"/>
    <text x="640" y="30" fill="#f59e0b" font-family="monospace" font-size="11">SOLAR EQUILIBRIUM</text>
    <text x="640" y="65" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="24" font-weight="800">19.54 min / day</text>
    <text x="640" y="90" fill="#8b949e" font-family="sans-serif" font-size="12">Direct cloudy sunlight for net-positive recharge</text>
  </g>

  <!-- Footer Callout -->
  <rect x="50" y="410" width="900" height="60" rx="8" fill="#0d1117" stroke="#30363d"/>
  <text x="70" y="435" fill="#f59e0b" font-family="monospace" font-size="11" font-weight="bold">MODELED ENERGY AUTONOMY (CALCULATED):</text>
  <text x="70" y="455" fill="#8b949e" font-family="sans-serif" font-size="12">On a 1000 mAh LiPo cell without solar replenishment, autonomy is 1000 mAh / (0.2338 mA × 24h) = 178.2 days (~5.9 months). With 1W trickle solar panel, modeled autonomy is perpetual.</text>
</svg>""")

# -----------------------------------------------------------------------------
# 9. docs/media/06-dsp/acoustic_dsp_pipeline.svg
# -----------------------------------------------------------------------------
save_svg("docs/media/06-dsp/acoustic_dsp_pipeline.svg", """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 480" width="100%" height="100%">
  <rect width="1000" height="480" rx="16" fill="#090d13" stroke="#30363d" stroke-width="2"/>
  
  <rect x="30" y="24" width="170" height="28" rx="14" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="115" y="43" fill="#f59e0b" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">DSP PIPELINE</text>
  <text x="30" y="82" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="800">ARM CMSIS-DSP 256-Point Real FFT Pipeline</text>
  <text x="30" y="108" fill="#8b949e" font-family="system-ui, -apple-system, sans-serif" font-size="14">Deterministic digital bio-acoustic analysis executed locally on the Nordic nRF52840 Cortex-M4F hardware FPU.</text>

  <g transform="translate(30, 140)">
    <!-- Stage 1 -->
    <rect x="0" y="0" width="170" height="240" rx="10" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
    <text x="85" y="30" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">1. I2S SAMPLING</text>
    <rect x="15" y="50" width="140" height="50" rx="6" fill="#0d1117"/>
    <text x="85" y="72" fill="#f0f6fc" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">INMP441 MEMS</text>
    <text x="85" y="88" fill="#8b949e" font-family="monospace" font-size="9" text-anchor="middle">24-bit Digital I2S</text>
    <text x="15" y="125" fill="#8b949e" font-family="sans-serif" font-size="11">• fs = 2000 Hz</text>
    <text x="15" y="145" fill="#8b949e" font-family="sans-serif" font-size="11">• N = 256 samples</text>
    <text x="15" y="165" fill="#8b949e" font-family="sans-serif" font-size="11">• T_window = 128 ms</text>
    <text x="15" y="185" fill="#8b949e" font-family="sans-serif" font-size="11">• DMA Ring Buffer</text>

    <!-- Arrow -->
    <path d="M 175 120 L 195 120" stroke="#f59e0b" stroke-width="2"/>

    <!-- Stage 2 -->
    <rect x="200" y="0" width="170" height="240" rx="10" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
    <text x="285" y="30" fill="#f59e0b" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">2. WINDOWING</text>
    <rect x="215" y="50" width="140" height="50" rx="6" fill="#0d1117"/>
    <text x="285" y="72" fill="#f0f6fc" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Hann Window</text>
    <text x="285" y="88" fill="#8b949e" font-family="monospace" font-size="9" text-anchor="middle">w[n] = 0.5 - 0.5cos(...)</text>
    <text x="215" y="125" fill="#8b949e" font-family="sans-serif" font-size="11">• Sidelobe: -31.5 dB</text>
    <text x="215" y="145" fill="#8b949e" font-family="sans-serif" font-size="11">• Suppresses leakage</text>
    <text x="215" y="165" fill="#8b949e" font-family="sans-serif" font-size="11">• Zero DC bias</text>
    <text x="215" y="185" fill="#8b949e" font-family="sans-serif" font-size="11">• Single float32 buffer</text>

    <!-- Arrow -->
    <path d="M 375 120 L 395 120" stroke="#f59e0b" stroke-width="2"/>

    <!-- Stage 3 -->
    <rect x="400" y="0" width="180" height="240" rx="10" fill="#161b22" stroke="#10b981" stroke-width="1.5"/>
    <text x="490" y="30" fill="#10b981" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">3. CMSIS-DSP FFT</text>
    <rect x="415" y="50" width="150" height="50" rx="6" fill="#0d1117"/>
    <text x="490" y="72" fill="#f0f6fc" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">arm_rfft_fast_f32</text>
    <text x="490" y="88" fill="#10b981" font-family="monospace" font-size="9" text-anchor="middle">Cortex-M4F HW FPU</text>
    <text x="415" y="125" fill="#8b949e" font-family="sans-serif" font-size="11">• 256-Point Real FFT</text>
    <text x="415" y="145" fill="#10b981" font-family="sans-serif" font-size="11" font-weight="bold">• Δf = 7.8125 Hz/bin</text>
    <text x="415" y="165" fill="#8b949e" font-family="sans-serif" font-size="11">• Latency: 1.12 ms</text>
    <text x="415" y="185" fill="#8b949e" font-family="sans-serif" font-size="11">• arm_cmplx_mag_f32</text>

    <!-- Arrow -->
    <path d="M 585 120 L 605 120" stroke="#f59e0b" stroke-width="2"/>

    <!-- Stage 4 -->
    <rect x="610" y="0" width="170" height="240" rx="10" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
    <text x="695" y="30" fill="#f59e0b" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">4. BAND BINNING</text>
    <rect x="625" y="50" width="140" height="50" rx="6" fill="#0d1117"/>
    <text x="695" y="72" fill="#f0f6fc" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">8 Band Integrator</text>
    <text x="695" y="88" fill="#8b949e" font-family="monospace" font-size="9" text-anchor="middle">Energy per spectrum</text>
    <text x="625" y="125" fill="#8b949e" font-family="sans-serif" font-size="11">• Band 1: 60-120 Hz</text>
    <text x="625" y="145" fill="#8b949e" font-family="sans-serif" font-size="11">• Band 2: 120-180 Hz</text>
    <text x="625" y="165" fill="#8b949e" font-family="sans-serif" font-size="11">• Band 3: 180-250 Hz</text>
    <text x="625" y="185" fill="#8b949e" font-family="sans-serif" font-size="11">• Band 4: 250-350 Hz</text>

    <!-- Arrow -->
    <path d="M 785 120 L 805 120" stroke="#f59e0b" stroke-width="2"/>

    <!-- Stage 5 -->
    <rect x="810" y="0" width="130" height="240" rx="10" fill="#161b22" stroke="#ef4444" stroke-width="1.5"/>
    <text x="875" y="30" fill="#ef4444" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">5. ALARM BITS</text>
    <rect x="820" y="50" width="110" height="50" rx="6" fill="#0d1117"/>
    <text x="875" y="72" fill="#f0f6fc" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">Bitfield Map</text>
    <text x="875" y="88" fill="#ef4444" font-family="monospace" font-size="9" text-anchor="middle">tilt_deg field</text>
    <text x="820" y="125" fill="#8b949e" font-family="sans-serif" font-size="10">Bit 7: Queenless</text>
    <text x="820" y="145" fill="#8b949e" font-family="sans-serif" font-size="10">Bit 6: Pre-Swarm</text>
    <text x="820" y="165" fill="#8b949e" font-family="sans-serif" font-size="10">Bit 5: Low Batt</text>
    <text x="820" y="185" fill="#8b949e" font-family="sans-serif" font-size="10">Pack into LoRa</text>
  </g>

  <!-- Resolution Formula -->
  <text x="30" y="420" fill="#10b981" font-family="monospace" font-size="12" font-weight="bold">MATHEMATICAL VALIDATION: Δf = fs / N = 2000 Hz / 256 = 7.8125 Hz / bin</text>
  <text x="30" y="440" fill="#8b949e" font-family="system-ui, sans-serif" font-size="12">Enables precise isolation of 225 Hz worker hum (Bin 29 = 226.56 Hz) and 285 Hz queenless roar (Bin 36 = 281.25 Hz).</text>
</svg>""")

# -----------------------------------------------------------------------------
# 10. docs/media/07-radio/rf_link_budget.svg
# -----------------------------------------------------------------------------
save_svg("docs/media/07-radio/rf_link_budget.svg", """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" width="100%" height="100%">
  <rect width="1000" height="500" rx="16" fill="#090d13" stroke="#30363d" stroke-width="2"/>
  
  <rect x="30" y="24" width="170" height="28" rx="14" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="115" y="43" fill="#f59e0b" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">RADIO PROPAGATION</text>
  <text x="30" y="82" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="800">Sub-GHz LoRa RF Link Budget &amp; Fade Margin Calculation</text>
  <text x="30" y="108" fill="#8b949e" font-family="system-ui, -apple-system, sans-serif" font-size="14">Calculated link budget for IN865 band (865.0625 MHz) demonstrating +31.28 dB Line-of-Sight fade margin at 15 km.</text>

  <!-- Waterfall chart -->
  <g transform="translate(50, 150)">
    <!-- Base Reference Line -->
    <line x1="0" y1="200" x2="900" y2="200" stroke="#30363d" stroke-dasharray="2 2"/>
    <text x="910" y="204" fill="#8b949e" font-family="monospace" font-size="10">0 dBm</text>

    <!-- Bar 1: TX Power (+14 dBm) -->
    <rect x="40" y="130" width="80" height="70" fill="#10b981" rx="4"/>
    <text x="80" y="120" fill="#10b981" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">+14.0 dBm</text>
    <text x="80" y="225" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">TX Power</text>

    <!-- Bar 2: TX Antenna (+2.15 dBi) -->
    <rect x="150" y="119" width="80" height="11" fill="#10b981" rx="2"/>
    <text x="190" y="110" fill="#10b981" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">+2.15 dBi</text>
    <text x="190" y="225" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">TX Ant Gain</text>

    <!-- Bar 3: Free Space Path Loss (-114.70 dB) -->
    <rect x="260" y="119" width="80" height="160" fill="#ef4444" rx="4"/>
    <text x="300" y="295" fill="#ef4444" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">-114.70 dB</text>
    <text x="300" y="320" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">FSPL (15 km)</text>

    <!-- Bar 4: RX Antenna (+5.80 dBi) -->
    <rect x="370" y="250" width="80" height="29" fill="#10b981" rx="2"/>
    <text x="410" y="240" fill="#10b981" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">+5.80 dBi</text>
    <text x="410" y="225" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">RX Mast Ant</text>

    <!-- Bar 5: Net RX Power (-93.25 dBm) -->
    <rect x="480" y="279" width="80" height="5" fill="#f59e0b" rx="2"/>
    <text x="520" y="270" fill="#f59e0b" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">-93.25 dBm</text>
    <text x="520" y="320" fill="#8b949e" font-family="sans-serif" font-size="10" text-anchor="middle">Received P_RX</text>

    <!-- Bar 6: Sensitivity Floor (-124.53 dBm) -->
    <line x1="450" y1="360" x2="850" y2="360" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 4"/>
    <text x="860" y="364" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="bold">-124.53 dBm (Sensitivity Limit)</text>

    <!-- Fade Margin Bracket -->
    <rect x="580" y="279" width="120" height="81" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" stroke-width="2" rx="6"/>
    <text x="640" y="315" fill="#10b981" font-family="system-ui, sans-serif" font-size="14" font-weight="800" text-anchor="middle">+31.28 dB</text>
    <text x="640" y="335" fill="#10b981" font-family="sans-serif" font-size="10" text-anchor="middle">FADE MARGIN (M)</text>
  </g>

  <!-- Summary Box -->
  <rect x="50" y="420" width="900" height="50" rx="8" fill="#161b22" stroke="#30363d"/>
  <text x="70" y="445" fill="#10b981" font-family="sans-serif" font-size="12" font-weight="bold">CALCULATED RESULT:</text>
  <text x="210" y="445" fill="#8b949e" font-family="sans-serif" font-size="12">A link margin of +31.28 dB (&gt; +10 dB engineering threshold) ensures packet delivery across heavy rain and seasonal atmospheric ducting.</text>
</svg>""")

# -----------------------------------------------------------------------------
# 11. docs/media/07-radio/mesh_topology.svg
# -----------------------------------------------------------------------------
save_svg("docs/media/07-radio/mesh_topology.svg", """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" width="100%" height="100%">
  <rect width="1000" height="500" rx="16" fill="#090d13" stroke="#30363d" stroke-width="2"/>
  
  <rect x="30" y="24" width="170" height="28" rx="14" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="115" y="43" fill="#f59e0b" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">MESH TOPOLOGY</text>
  <text x="30" y="82" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="800">BeevilMesh Multi-Hop Sub-GHz RF Routing</text>
  <text x="30" y="108" fill="#8b949e" font-family="system-ui, -apple-system, sans-serif" font-size="14">Dynamic TTL routing with deduplication ring buffers across orchard trees (Target architectural scale: 100 nodes).</text>

  <!-- Network Map -->
  <g transform="translate(50, 150)">
    <!-- Gateway -->
    <circle cx="780" cy="150" r="45" fill="#161b22" stroke="#38bdf8" stroke-width="3"/>
    <text x="780" y="145" fill="#38bdf8" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">BASE STATION</text>
    <text x="780" y="165" fill="#f0f6fc" font-family="sans-serif" font-size="11" text-anchor="middle">Raspberry Pi 3B+ Gateway</text>

    <!-- Node 42 (Relay) -->
    <circle cx="520" cy="150" r="35" fill="#161b22" stroke="#f59e0b" stroke-width="2"/>
    <text x="520" y="145" fill="#f59e0b" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">Hive #042</text>
    <text x="520" y="162" fill="#8b949e" font-family="monospace" font-size="9" text-anchor="middle">Hop 2 (TTL=1)</text>

    <!-- Node 15 (Relay) -->
    <circle cx="300" cy="100" r="35" fill="#161b22" stroke="#f59e0b" stroke-width="2"/>
    <text x="300" y="95" fill="#f59e0b" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">Hive #015</text>
    <text x="300" y="112" fill="#8b949e" font-family="monospace" font-size="9" text-anchor="middle">Hop 1 (TTL=2)</text>

    <!-- Node 01 (Origin) -->
    <circle cx="100" cy="100" r="35" fill="#161b22" stroke="#10b981" stroke-width="2"/>
    <text x="100" y="95" fill="#10b981" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">Hive #001</text>
    <text x="100" y="112" fill="#8b949e" font-family="monospace" font-size="9" text-anchor="middle">Origin (TTL=3)</text>

    <!-- Node 73 (Origin 2) -->
    <circle cx="100" cy="220" r="35" fill="#161b22" stroke="#10b981" stroke-width="2"/>
    <text x="100" y="215" fill="#10b981" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">Hive #073</text>
    <text x="100" y="232" fill="#8b949e" font-family="monospace" font-size="9" text-anchor="middle">Origin (TTL=3)</text>

    <!-- Node 88 (Relay 2) -->
    <circle cx="300" cy="220" r="35" fill="#161b22" stroke="#f59e0b" stroke-width="2"/>
    <text x="300" y="215" fill="#f59e0b" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">Hive #088</text>
    <text x="300" y="232" fill="#8b949e" font-family="monospace" font-size="9" text-anchor="middle">Hop 1 (TTL=2)</text>

    <!-- Links -->
    <line x1="135" y1="100" x2="265" y2="100" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 2"/>
    <line x1="135" y1="220" x2="265" y2="220" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 2"/>
    <line x1="335" y1="100" x2="485" y2="140" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 2"/>
    <line x1="335" y1="220" x2="485" y2="160" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 2"/>
    <line x1="555" y1="150" x2="735" y2="150" stroke="#38bdf8" stroke-width="3"/>
  </g>

  <!-- Parameters Table -->
  <g transform="translate(50, 420)">
    <rect width="900" height="50" rx="8" fill="#161b22" stroke="#30363d"/>
    <text x="30" y="30" fill="#f59e0b" font-family="monospace" font-size="11">DEDUPLICATION:</text>
    <text x="140" y="30" fill="#8b949e" font-family="sans-serif" font-size="11">16-Packet Circular CRC16 Ring Buffer</text>
    <text x="430" y="30" fill="#f59e0b" font-family="monospace" font-size="11">FORWARDING LATENCY:</text>
    <text x="590" y="30" fill="#8b949e" font-family="sans-serif" font-size="11">&lt; 150 ms per hop</text>
    <text x="750" y="30" fill="#f59e0b" font-family="monospace" font-size="11">DUTY CYCLE:</text>
    <text x="840" y="30" fill="#8b949e" font-family="sans-serif" font-size="11">&lt; 0.1% WPC Rule</text>
  </g>
</svg>""")

# -----------------------------------------------------------------------------
# 12. docs/media/08-edge-ai/edge_ai_pipeline.svg
# -----------------------------------------------------------------------------
save_svg("docs/media/08-edge-ai/edge_ai_pipeline.svg", """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" width="100%" height="100%">
  <rect width="1000" height="500" rx="16" fill="#090d13" stroke="#30363d" stroke-width="2"/>
  
  <rect x="30" y="24" width="170" height="28" rx="14" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="115" y="43" fill="#f59e0b" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">EDGE INTELLIGENCE</text>
  <text x="30" y="82" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="800">Hierarchical Two-Tier Edge Intelligence Engine</text>
  <text x="30" y="108" fill="#8b949e" font-family="system-ui, -apple-system, sans-serif" font-size="14">Tier 1: On-Node Deterministic CUSUM &amp; FFT Triage → Tier 2: Raspberry Pi 3B+ Gateway Multi-Modal Fusion &amp; Offline SLM Advisor.</text>

  <g transform="translate(50, 150)">
    <!-- Tier 1 -->
    <rect x="0" y="0" width="420" height="280" rx="12" fill="#161b22" stroke="#10b981" stroke-width="1.5"/>
    <rect x="20" y="20" width="220" height="26" rx="13" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981"/>
    <text x="130" y="37" fill="#10b981" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">TIER 1: ON-NODE (nRF52840)</text>
    
    <text x="20" y="75" fill="#f0f6fc" font-family="sans-serif" font-size="14" font-weight="bold">Deterministic Analytics &amp; Triage</text>
    <text x="20" y="95" fill="#8b949e" font-family="sans-serif" font-size="12">• Zero Neural Fluff on Battery-Constrained MCU</text>
    <text x="20" y="115" fill="#8b949e" font-family="sans-serif" font-size="12">• CMSIS-DSP 256-pt Real FFT (1.12 ms latency)</text>
    <text x="20" y="135" fill="#8b949e" font-family="sans-serif" font-size="12">• CUSUM Thermal Drift Accumulator (Sk formulation)</text>
    <text x="20" y="155" fill="#8b949e" font-family="sans-serif" font-size="12">• 7-Point OCV Polynomial Battery SoC Estimator</text>
    
    <rect x="20" y="180" width="380" height="80" rx="6" fill="#0d1117" stroke="#30363d"/>
    <text x="35" y="205" fill="#f59e0b" font-family="monospace" font-size="10" font-weight="bold">OUTPUT PACKET (32 BYTES):</text>
    <text x="35" y="225" fill="#8b949e" font-family="monospace" font-size="10">hive_id + 5x frames + CO2 + VOC + weight + tilt + 8 bands</text>
    <text x="35" y="245" fill="#10b981" font-family="monospace" font-size="10">Latency: &lt; 2.0 ms execution per 5-min duty cycle</text>

    <!-- Arrow -->
    <path d="M 430 140 L 470 140" stroke="#f59e0b" stroke-width="3"/>

    <!-- Tier 2 -->
    <rect x="480" y="0" width="420" height="280" rx="12" fill="#161b22" stroke="#38bdf8" stroke-width="1.5"/>
    <rect x="500" y="20" width="220" height="26" rx="13" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8"/>
    <text x="610" y="37" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">TIER 2: GATEWAY (Pi 3B+)</text>

    <text x="500" y="75" fill="#f0f6fc" font-family="sans-serif" font-size="14" font-weight="bold">Multi-Modal Fusion &amp; SLM Advisor</text>
    <text x="500" y="95" fill="#8b949e" font-family="sans-serif" font-size="12">• 16-Sensor Feature Fusion Neural Network</text>
    <text x="500" y="115" fill="#8b949e" font-family="sans-serif" font-size="12">• 8 Diagnostic Classes (Swarm, Queenless, Varroa, Theft)</text>
    <text x="500" y="135" fill="#8b949e" font-family="sans-serif" font-size="12">• Heuristic Fallback Engine (Zero crash guarantee)</text>
    <text x="500" y="155" fill="#8b949e" font-family="sans-serif" font-size="12">• Local Quantized SLM Bee Advisor (Offline Q&amp;A)</text>

    <rect x="500" y="180" width="380" height="80" rx="6" fill="#0d1117" stroke="#30363d"/>
    <text x="515" y="205" fill="#38bdf8" font-family="monospace" font-size="10" font-weight="bold">PERFORMANCE BENCHMARK (REAL PIPELINE):</text>
    <text x="515" y="225" fill="#8b949e" font-family="monospace" font-size="10">Throughput: 148.1 pkts/s | Avg Ingest: 6.74 ms/packet</text>
    <text x="515" y="245" fill="#10b981" font-family="monospace" font-size="10">Tested on 100 simulated hives (tests/test_full_gateway_pipeline.py)</text>
  </g>
</svg>""")

# -----------------------------------------------------------------------------
# 13. docs/media/11-evidence/provenance_chain.svg
# -----------------------------------------------------------------------------
save_svg("docs/media/11-evidence/provenance_chain.svg", """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 480" width="100%" height="100%">
  <rect width="1000" height="480" rx="16" fill="#090d13" stroke="#30363d" stroke-width="2"/>
  
  <rect x="30" y="24" width="200" height="28" rx="14" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="130" y="43" fill="#f59e0b" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">CRYPTOGRAPHIC PROVENANCE</text>
  <text x="30" y="82" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="800">HoneyChain SHA-256 Merkle Provenance Tree</text>
  <text x="30" y="108" fill="#8b949e" font-family="system-ui, -apple-system, sans-serif" font-size="14">Cryptographic tamper-evidence for commercial honey batches against sugar syrup adulteration (C3/C4 isotopic falsification).</text>

  <!-- Merkle Tree Representation -->
  <g transform="translate(50, 140)">
    <!-- Root -->
    <rect x="350" y="0" width="200" height="60" rx="8" fill="#161b22" stroke="#f59e0b" stroke-width="2"/>
    <text x="450" y="25" fill="#f59e0b" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">MERKLE ROOT HASH</text>
    <text x="450" y="45" fill="#f0f6fc" font-family="monospace" font-size="10" text-anchor="middle">H_root = SHA256(H_L + H_R)</text>

    <!-- Branch Lines -->
    <line x1="410" y1="60" x2="230" y2="100" stroke="#f59e0b" stroke-width="1.5"/>
    <line x1="490" y1="60" x2="670" y2="100" stroke="#f59e0b" stroke-width="1.5"/>

    <!-- Intermediate Nodes -->
    <rect x="130" y="100" width="200" height="50" rx="6" fill="#161b22" stroke="#30363d"/>
    <text x="230" y="125" fill="#38bdf8" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">Branch Hash H_L</text>
    <text x="230" y="140" fill="#8b949e" font-family="monospace" font-size="9" text-anchor="middle">SHA256(H_001 + H_002)</text>

    <rect x="570" y="100" width="200" height="50" rx="6" fill="#161b22" stroke="#30363d"/>
    <text x="670" y="125" fill="#38bdf8" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">Branch Hash H_R</text>
    <text x="670" y="140" fill="#8b949e" font-family="monospace" font-size="9" text-anchor="middle">SHA256(H_003 + H_004)</text>

    <!-- Branch Lines to Leaves -->
    <line x1="180" y1="150" x2="90" y2="190" stroke="#30363d" stroke-width="1.5"/>
    <line x1="280" y1="150" x2="270" y2="190" stroke="#30363d" stroke-width="1.5"/>
    <line x1="620" y1="150" x2="630" y2="190" stroke="#30363d" stroke-width="1.5"/>
    <line x1="720" y1="150" x2="810" y2="190" stroke="#30363d" stroke-width="1.5"/>

    <!-- Leaf Nodes (Hive Telemetry Records) -->
    <rect x="0" y="190" width="180" height="70" rx="6" fill="#0d1117" stroke="#10b981"/>
    <text x="90" y="212" fill="#10b981" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">Hive #001 Harvest Record</text>
    <text x="90" y="230" fill="#8b949e" font-family="sans-serif" font-size="9" text-anchor="middle">Weight Δ: +18.4 kg (Flow)</text>
    <text x="90" y="245" fill="#8b949e" font-family="sans-serif" font-size="9" text-anchor="middle">Moisture: 17.2% | Purity: 99.4%</text>

    <rect x="190" y="190" width="180" height="70" rx="6" fill="#0d1117" stroke="#10b981"/>
    <text x="280" y="212" fill="#10b981" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">Hive #002 Harvest Record</text>
    <text x="280" y="230" fill="#8b949e" font-family="sans-serif" font-size="9" text-anchor="middle">Weight Δ: +21.1 kg (Flow)</text>
    <text x="280" y="245" fill="#8b949e" font-family="sans-serif" font-size="9" text-anchor="middle">Moisture: 16.8% | Purity: 98.9%</text>

    <rect x="540" y="190" width="180" height="70" rx="6" fill="#0d1117" stroke="#10b981"/>
    <text x="630" y="212" fill="#10b981" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">Hive #003 Harvest Record</text>
    <text x="630" y="230" fill="#8b949e" font-family="sans-serif" font-size="9" text-anchor="middle">Weight Δ: +19.5 kg (Flow)</text>
    <text x="630" y="245" fill="#8b949e" font-family="sans-serif" font-size="9" text-anchor="middle">Moisture: 17.0% | Purity: 99.1%</text>

    <rect x="730" y="190" width="180" height="70" rx="6" fill="#0d1117" stroke="#10b981"/>
    <text x="820" y="212" fill="#10b981" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">Hive #004 Harvest Record</text>
    <text x="820" y="230" fill="#8b949e" font-family="sans-serif" font-size="9" text-anchor="middle">Weight Δ: +16.8 kg (Flow)</text>
    <text x="820" y="245" fill="#8b949e" font-family="sans-serif" font-size="9" text-anchor="middle">Moisture: 17.5% | Purity: 98.6%</text>
  </g>

  <!-- Plain-English Callout -->
  <rect x="50" y="420" width="900" height="45" rx="6" fill="#161b22" stroke="#30363d"/>
  <text x="70" y="447" fill="#8b949e" font-family="system-ui, sans-serif" font-size="12"><tspan fill="#f59e0b" font-weight="bold">Note on Cryptography:</tspan> SHA-256 is a one-way cryptographic hash function providing immutable mathematical tamper-evidence. It is not encryption, nor does it require external public blockchain gas fees.</text>
</svg>""")

# -----------------------------------------------------------------------------
# 14. docs/media/11-evidence/cusum_detection.svg
# -----------------------------------------------------------------------------
save_svg("docs/media/11-evidence/cusum_detection.svg", """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 520" width="100%" height="100%">
  <rect width="1000" height="520" rx="16" fill="#090d13" stroke="#30363d" stroke-width="2"/>
  
  <rect x="30" y="24" width="170" height="28" rx="14" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="115" y="43" fill="#f59e0b" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">STATISTICAL TRIAGE</text>
  <text x="30" y="82" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="800">CUSUM 72-Hour Early Warning Thermal Drift Curve</text>
  <text x="30" y="108" fill="#8b949e" font-family="system-ui, -apple-system, sans-serif" font-size="14">S_k = max(0, S_{k-1} + (μ_0 - T_k) - K). Demonstrates early detection of queen loss prior to irreversible brood chilling.</text>

  <!-- Plot Area -->
  <g transform="translate(60, 140)">
    <rect width="880" height="260" rx="8" fill="#161b22" stroke="#30363d"/>
    
    <!-- Threshold Line: h = 1.20 °C·hr -->
    <line x1="0" y1="90" x2="880" y2="90" stroke="#ef4444" stroke-width="2" stroke-dasharray="4 4"/>
    <text x="890" y="94" fill="#ef4444" font-family="monospace" font-size="11" font-weight="bold">Alarm Threshold: h = 1.20°C·hr</text>

    <!-- Normal Biological Baseline: 34.82 °C -->
    <line x1="0" y1="220" x2="880" y2="220" stroke="#10b981" stroke-width="1.5" stroke-dasharray="2 2"/>
    <text x="890" y="224" fill="#10b981" font-family="monospace" font-size="11">Baseline: 34.82°C</text>

    <!-- S_k Healthy Curve (stays near 0) -->
    <path d="M 0 250 Q 150 248 300 250" fill="none" stroke="#10b981" stroke-width="3"/>
    <text x="150" y="235" fill="#10b981" font-family="sans-serif" font-size="11" font-weight="bold">Healthy Colony (S_k ≈ 0)</text>

    <!-- S_k Failing Curve (drifts upwards past threshold at t = 24h) -->
    <path d="M 300 250 Q 400 240 500 180 T 700 80 T 880 20" fill="none" stroke="#ef4444" stroke-width="3"/>

    <!-- Anomaly Detection Point -->
    <circle cx="680" cy="90" r="6" fill="#ef4444"/>
    <rect x="560" y="45" width="240" height="36" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444"/>
    <text x="680" y="62" fill="#ef4444" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">EARLY WARNING TRIP (t = 24.5 hrs)</text>
    <text x="680" y="74" fill="#f0f6fc" font-family="sans-serif" font-size="9" text-anchor="middle">72 Hours Before Complete Brood Chilling</text>

    <!-- Axis labels -->
    <line x1="0" y1="260" x2="880" y2="260" stroke="#8b949e" stroke-width="1.5"/>
    <text x="0" y="280" fill="#8b949e" font-family="monospace" font-size="10">Hour 0 (Normal)</text>
    <text x="300" y="280" fill="#f59e0b" font-family="monospace" font-size="10">Hour 12 (Queen Dies)</text>
    <text x="680" y="280" fill="#ef4444" font-family="monospace" font-size="10">Hour 24 (CUSUM Alert)</text>
    <text x="840" y="280" fill="#8b949e" font-family="monospace" font-size="10">Hour 96 (Brood Loss)</text>
  </g>

  <!-- Formula Callout -->
  <text x="60" y="445" fill="#f59e0b" font-family="monospace" font-size="11" font-weight="bold">ALGORITHM PARAMETERS:</text>
  <text x="230" y="445" fill="#8b949e" font-family="sans-serif" font-size="11">Target Mean μ_0 = 34.82°C | Slack Allowance K = 0.15°C | Alarm Trip Threshold h = 1.20°C·hr</text>
</svg>""")

print("All 14 SVG diagrams created successfully!")
