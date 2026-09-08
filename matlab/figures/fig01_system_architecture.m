function fig = fig01_system_architecture()
% FIG01_SYSTEM_ARCHITECTURE Generates Figure 01: System Architecture
% IEEE HardwAIre Challenge Phase 2 — BEEVIL KNIEVEL
% Canonical 3-Tier Multi-Sensor Telemetry, Dual-Radio Hybrid & Star Radio Topology

addpath(fullfile(fileparts(mfilename('fullpath')), '..', 'lib'));
style = createFigureStyle('standard');

fig = figure('Name', 'FIG 01: System Architecture', ...
    'Color', style.bg_color, ...
    'Position', [100, 100, style.width, style.height], ...
    'MenuBar', 'none', 'ToolBar', 'none');
ax = axes('Parent', fig, 'Position', [0, 0, 1, 1]);
hold(ax, 'on'); axis(ax, [0 1 0 1]); axis(ax, 'off');

% Header
text(ax, 0.04, 0.955, 'FIGURE 01: BEEVIL KNIEVEL — END-TO-END SYSTEM ARCHITECTURE', ...
    'FontName', style.font_family, 'FontSize', style.fs_title, 'FontWeight', 'bold', ...
    'Color', style.stroke_dark, 'VerticalAlignment', 'top');
text(ax, 0.04, 0.925, 'Canonical 3-Tier Multi-Sensor Telemetry, Dual-Radio Hybrid (BLE Mesh + LoRa) [IEEE HardwAIre Phase 2]', ...
    'FontName', style.font_family, 'FontSize', style.fs_body, 'Color', style.stroke_med, 'VerticalAlignment', 'top');

% Tier 1: Commercial Langstroth Hive
drawSubsystem(ax, [0.04, 0.12, 0.26, 0.76], 'Tier 1: Commercial Langstroth Hive', style);
drawBlock(ax, [0.06, 0.70, 0.22, 0.12], 'Brood Nest Thermal Core', ...
    {'TI TMP117 Digital RTD (±0.1°C)', 'Central Frame 4/5 (34.5°C–35.5°C)', 'NIST-Traceable Reference'}, style);
drawEvidenceTag(ax, [0.20, 0.71, 0.07, 0.022], 'VALIDATED', style);

drawBlock(ax, [0.06, 0.54, 0.22, 0.12], 'Spatial Thermal Grid', ...
    {'5x Maxim DS18B20 1-Wire (±0.5°C)', 'Pin P0.17 | Comb Top & Periphery', 'Thermal Stratification Map'}, style);
drawEvidenceTag(ax, [0.20, 0.55, 0.07, 0.022], 'VALIDATED', style);

drawBlock(ax, [0.06, 0.38, 0.22, 0.12], 'Bio-Acoustic Transduction', ...
    {'InvenSense INMP441 I2S Digital MEMS', 'ePTFE Gore-Tex Acoustic Vent', '16 kHz, 24-bit PCM Audio Stream'}, style);
drawEvidenceTag(ax, [0.20, 0.39, 0.07, 0.022], 'VALIDATED', style);

drawBlock(ax, [0.06, 0.22, 0.22, 0.12], 'Environmental & Mass', ...
    {'Sensirion SCD41 Photoacoustic CO2', 'Bosch BME688 VOC / RH / Press / T', 'Avia HX711 200 kg Base Scale'}, style);
drawEvidenceTag(ax, [0.20, 0.23, 0.07, 0.022], 'VALIDATED', style);

% Arrow to Tier 2
drawArrow(ax, [0.28, 0.50], [0.36, 0.50], 'Solderless PG-7 Cables', style);

% Tier 2: Modular Sensor Node (RAK4631)
drawSubsystem(ax, [0.36, 0.12, 0.28, 0.76], 'Tier 2: Modular Sensor Node (RAK4631)', style);
drawBlock(ax, [0.38, 0.68, 0.24, 0.15], 'WisBlock Processing Core', ...
    {'Nordic nRF52840 (Cortex-M4F @ 64MHz)', '1MB Flash, 256KB SRAM, Hardware FPU', ...
     'RAK5005-O Baseboard (Zero Custom PCB)', 'Solderless Spring-Lock 4:2 Terminals'}, style);
drawEvidenceTag(ax, [0.53, 0.69, 0.08, 0.022], 'DEMONSTRATED', style);

drawBlock(ax, [0.38, 0.49, 0.24, 0.15], 'Edge Signal Processing & AI', ...
    {'CMSIS-DSP 256-pt Real FFT (2.49 ms)', '8 Spectral Energy Bins (Worker Piping)', ...
     'Model 1: Page''s CUSUM Drift Filter', 'Brood Decay Alarm (-0.02°C/hr)'}, style);
drawEvidenceTag(ax, [0.53, 0.50, 0.08, 0.022], 'VALIDATED', style);

drawBlock(ax, [0.38, 0.30, 0.24, 0.15], 'Dual-Radio Transceivers', ...
    {'Semtech SX1262 LoRa (865 MHz Backhaul)', 'nRF52840 2.4 GHz Multiprotocol (BLE Mesh)', ...
     '33-Byte Packed Binary Telemetry Struct', 'Local Cluster Relay + Long-Range Gateway'}, style);
drawEvidenceTag(ax, [0.53, 0.31, 0.08, 0.022], 'CALCULATED', style);

drawBlock(ax, [0.38, 0.15, 0.24, 0.12], 'Ultra-Low-Power Rail', ...
    {'Switched Rail (WB_IO2 MOSFET Isolation)', '18 µA Sleep Current [MEASURED]', '0.5W Solar + 1S Li-ion (TP4054 CC/CV)'}, style);
drawEvidenceTag(ax, [0.53, 0.16, 0.08, 0.022], 'MEASURED', style);

% Wireless Link to Tier 3
drawRadioLink(ax, [0.62, 0.50], [0.70, 0.50], 'Sub-GHz LoRa Star / BLE Mesh', style);

% Tier 3: Gateway Reader & Analytics
drawSubsystem(ax, [0.70, 0.12, 0.26, 0.76], 'Tier 3: Gateway Reader & Analytics', style);
drawBlock(ax, [0.72, 0.68, 0.22, 0.15], 'Gateway Hardware & Radio', ...
    {'Raspberry Pi 3B+ (Quad A53 @ 1.4GHz)', 'Waveshare SX1262 LoRa HAT (SPI)', ...
     'Zero Custom PCB | Linux Daemon', '100 Hives Capacity (<0.2% Duty Cycle)'}, style);
drawEvidenceTag(ax, [0.85, 0.69, 0.08, 0.022], 'DEMONSTRATED', style);

drawBlock(ax, [0.72, 0.49, 0.22, 0.15], 'Gateway Edge AI (Model 2)', ...
    {'Supervised Random Forest Classifier', '10-hr Zenodo 1321278 Audio Dataset', ...
     '94.2% Validation Accuracy [VALIDATED]', 'Colony Collapse & Swarm Early Warning'}, style);
drawEvidenceTag(ax, [0.85, 0.50, 0.08, 0.022], 'VALIDATED', style);

drawBlock(ax, [0.72, 0.30, 0.22, 0.15], 'Local Persistence & Server', ...
    {'SQLite WAL Local Database Store', 'FastAPI Telemetry Daemon (beevil.local)', ...
     'WebSocket Real-Time Metric Streaming', 'Zero Monthly Recurring Cellular SIM Fees'}, style);
drawEvidenceTag(ax, [0.85, 0.31, 0.08, 0.022], 'DEMONSTRATED', style);

drawBlock(ax, [0.72, 0.15, 0.22, 0.12], 'Beekeeper Action Engine', ...
    {'Offline Local Web PWA Dashboard', 'Predictive Swarm & Queenless Alerts', 'Targeted Single-Frame Intervention'}, style);
drawEvidenceTag(ax, [0.85, 0.16, 0.08, 0.022], 'DEMONSTRATED', style);

drawLegend(ax, [0.25, 0.02, 0.50, 0.045], style);

end
