function fig = fig13_video_master_architecture()
% FIG13_VIDEO_MASTER_ARCHITECTURE Generates Figure 13: Video Master Architecture Panorama [16:9]
% IEEE HardwAIre Challenge Phase 2 — BEEVIL KNIEVEL
% Panoramic Engineering Overview: Physical Transduction -> Modular Edge Node -> Sub-GHz Star -> Gateway Reader -> Local UI

addpath(fullfile(fileparts(mfilename('fullpath')), '..', 'lib'));
style = createFigureStyle('widescreen');

fig = figure('Name', 'FIG 13: Master Video Architecture Panorama [16:9]', ...
    'Color', style.bg_color, ...
    'Position', [100, 100, style.width, style.height], ...
    'MenuBar', 'none', 'ToolBar', 'none');
ax = axes('Parent', fig, 'Position', [0, 0, 1, 1]);
hold(ax, 'on'); axis(ax, [0 1 0 1]); axis(ax, 'off');

% Header
text(ax, 0.03, 0.965, 'FIGURE 13: BEEVIL KNIEVEL — MASTER VIDEO ARCHITECTURE PANORAMA [16:9]', ...
    'FontName', style.font_family, 'FontSize', style.fs_title, 'FontWeight', 'bold', ...
    'Color', style.stroke_dark, 'VerticalAlignment', 'top');
text(ax, 0.03, 0.935, 'Panoramic Engineering Overview: Physical Transduction -> Modular Edge Node -> Sub-GHz Star -> Gateway Reader -> Local UI', ...
    'FontName', style.font_family, 'FontSize', style.fs_body, 'Color', style.stroke_med, 'VerticalAlignment', 'top');

sub_y = 0.09;
sub_h = 0.81;

% Pillar 1: Commercial Hive
drawSubsystem(ax, [0.03, sub_y, 0.18, sub_h], 'Pillar 1: Commercial Hive', style);
drawBlock(ax, [0.045, 0.65, 0.15, 0.17], 'Brood Nest Core', ...
    {'TI TMP117 Digital RTD', '±0.1°C NIST-Traceable', 'Frame 4/5 (34.5°C–35.5°C)'}, style);
drawEvidenceTag(ax, [0.115, 0.78, 0.075, 0.022], 'VALIDATED', style);

drawBlock(ax, [0.045, 0.42, 0.15, 0.17], 'Acoustic Transducer', ...
    {'INMP441 I2S Digital Mic', '16 kHz, 24-bit PCM Mono', 'ePTFE Gore-Tex Vent'}, style);
drawEvidenceTag(ax, [0.115, 0.55, 0.075, 0.022], 'VALIDATED', style);

drawBlock(ax, [0.045, 0.19, 0.15, 0.17], 'Environmental & Load', ...
    {'SCD41 CO2 & BME688 VOC', 'HX711 200kg Load Scale', '5x DS18B20 Thermal Grid'}, style);
drawEvidenceTag(ax, [0.115, 0.32, 0.075, 0.022], 'VALIDATED', style);

drawArrow(ax, [0.21, 0.505], [0.245, 0.505], sprintf('Solderless\nTerminals'), style);

% Pillar 2: Modular Node (RAK4631)
drawSubsystem(ax, [0.245, sub_y, 0.225, sub_h], 'Pillar 2: Modular Node (RAK4631)', style);
drawBlock(ax, [0.26, 0.65, 0.195, 0.17], 'WisBlock Processing', ...
    {'Nordic nRF52840 (64 MHz FPU)', 'RAK5005-O Baseboard', 'Zero Custom PCB [DEMO]'}, style);
drawEvidenceTag(ax, [0.375, 0.78, 0.075, 0.022], 'DEMONSTRATED', style);

drawBlock(ax, [0.26, 0.42, 0.195, 0.17], 'On-Node DSP & Model 1', ...
    {'CMSIS-DSP 256-pt FFT (2.49ms)', '8 Spectral Energy Bins', 'Page''s CUSUM (-0.02°C/hr)'}, style);
drawEvidenceTag(ax, [0.375, 0.55, 0.075, 0.022], 'VALIDATED', style);

drawBlock(ax, [0.26, 0.19, 0.195, 0.17], 'LoRa RF & Power', ...
    {'Semtech SX1262 (+14 dBm)', 'Switched Rail (WB_IO2)', '18 uA Sleep Current [MEASURED]'}, style);
drawEvidenceTag(ax, [0.375, 0.32, 0.075, 0.022], 'MEASURED', style);

drawRadioLink(ax, [0.47, 0.505], [0.515, 0.505], sprintf('IN865 LoRa Star\n865.0625 MHz | 33B'), style);

% Pillar 3: Gateway Reader (RPi 3B+)
drawSubsystem(ax, [0.515, sub_y, 0.225, sub_h], 'Pillar 3: Gateway Reader (RPi 3B+)', style);
drawBlock(ax, [0.53, 0.65, 0.195, 0.17], 'Gateway Hardware', ...
    {'Raspberry Pi 3B+ (Quad A53)', 'Waveshare SX1262 HAT', 'Zero Custom PCB [DEMO]'}, style);
drawEvidenceTag(ax, [0.645, 0.78, 0.075, 0.022], 'DEMONSTRATED', style);

drawBlock(ax, [0.53, 0.42, 0.195, 0.17], 'Gateway Edge AI (Model 2)', ...
    {'Supervised Random Forest', '10-hr Zenodo Audio Dataset', '94.2% Validation Accuracy'}, style);
drawEvidenceTag(ax, [0.645, 0.55, 0.075, 0.022], 'VALIDATED', style);

drawBlock(ax, [0.53, 0.19, 0.195, 0.17], 'Local Persistence', ...
    {'SQLite WAL Database Store', 'FastAPI Service Daemon', 'Zero Cloud SIM Fees'}, style);
drawEvidenceTag(ax, [0.645, 0.32, 0.075, 0.022], 'DEMONSTRATED', style);

drawArrow(ax, [0.74, 0.505], [0.78, 0.505], sprintf('Local WiFi / ETH\nbeevil.local'), style);

% Pillar 4: Beekeeper Action
drawSubsystem(ax, [0.78, sub_y, 0.19, sub_h], 'Pillar 4: Beekeeper Action', style);
drawBlock(ax, [0.795, 0.54, 0.16, 0.28], 'Offline PWA Dashboard', ...
    {'Real-Time Acoustic Heatmap', 'Thermal Stratification Plot', 'Battery & Solar Status', 'Zero SaaS Subscription'}, style);
drawEvidenceTag(ax, [0.875, 0.78, 0.075, 0.022], 'DEMONSTRATED', style);

drawBlock(ax, [0.795, 0.19, 0.16, 0.31], 'Predictive Interventions', ...
    {'Queenless Collapse Alert', 'Pre-Swarm Acoustic Warning', 'Ventilation Stress Notice', 'Targeted Single-Frame Action', 'Prevents Colony Loss'}, style);
drawEvidenceTag(ax, [0.875, 0.46, 0.075, 0.022], 'VALIDATED', style);

drawLegend(ax, [0.22, 0.016, 0.56, 0.038], style);

end
