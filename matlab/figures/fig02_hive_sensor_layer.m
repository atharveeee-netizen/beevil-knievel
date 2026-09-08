function fig = fig02_hive_sensor_layer()
% FIG02_HIVE_SENSOR_LAYER Generates Figure 02: Hive Sensor Physical Layer
% IEEE HardwAIre Challenge Phase 2 — BEEVIL KNIEVEL
% Langstroth Brood Box Cross-Section Showing Sensor Placements & Hostile Defense

addpath(fullfile(fileparts(mfilename('fullpath')), '..', 'lib'));
style = createFigureStyle('standard');

fig = figure('Name', 'FIG 02: Hive Sensor Physical Layer', ...
    'Color', style.bg_color, ...
    'Position', [100, 100, style.width, style.height], ...
    'MenuBar', 'none', 'ToolBar', 'none');
ax = axes('Parent', fig, 'Position', [0, 0, 1, 1]);
hold(ax, 'on'); axis(ax, [0 1 0 1]); axis(ax, 'off');

% Title
text(ax, 0.035, 0.965, 'FIGURE 02: HIVE SENSOR PHYSICAL LAYER & TRANSDUCTION TOPOLOGY', ...
    'FontName', style.font_family, 'FontSize', style.fs_title, 'FontWeight', 'bold', ...
    'Color', style.stroke_dark, 'VerticalAlignment', 'top');
text(ax, 0.035, 0.935, 'Langstroth Brood Box Cross-Section Showing Sensor Placements, Cable Ingress & Hostile Environment Defense', ...
    'FontName', style.font_family, 'FontSize', style.fs_body, 'Color', style.stroke_med, 'VerticalAlignment', 'top');

% Brood Box Boundary
rectangle(ax, 'Position', [0.21, 0.17, 0.58, 0.52], 'FaceColor', [1 1 1], ...
    'EdgeColor', style.stroke_dark, 'LineWidth', style.lw_thick);
text(ax, 0.23, 0.665, 'LANGSTROTH BROOD BOX (10 FRAMES, IP65 PERIMETER)', ...
    'FontName', style.font_family, 'FontSize', style.fs_subhead, 'FontWeight', 'bold', 'Color', style.stroke_dark);

% 10 Frames
for i = 0:9
    fx = 0.25 + i * 0.05;
    rectangle(ax, 'Position', [fx, 0.24, 0.038, 0.38], 'FaceColor', style.fill_card, ...
        'EdgeColor', style.stroke_light, 'LineWidth', style.lw_thin, 'LineStyle', ':');
    text(ax, fx + 0.019, 0.25, sprintf('F%d', i+1), 'FontName', style.font_family, ...
        'FontSize', style.fs_tag, 'Color', style.stroke_light, 'HorizontalAlignment', 'center');
end

% Brood Cluster
rectangle(ax, 'Position', [0.39, 0.31, 0.12, 0.22], 'Curvature', [0.2, 0.2], ...
    'FaceColor', [1.0, 0.98, 0.92], 'EdgeColor', style.accent_amber, 'LineWidth', 1.4, 'LineStyle', '--');
text(ax, 0.45, 0.42, sprintf('BROOD NEST CORE\n(34.5°C–35.5°C Clustered)'), ...
    'FontName', style.font_family, 'FontSize', style.fs_tag, 'FontWeight', 'bold', ...
    'Color', style.accent_amber, 'HorizontalAlignment', 'center');

% Left Callouts
drawBlock(ax, [0.025, 0.52, 0.17, 0.22], 'Primary Brood RTD', ...
    {'TI TMP117 Digital RTD', 'Central Frame 4/5 Core', '±0.1°C NIST-Traceable', 'Queen Status Indicator'}, style);
drawEvidenceTag(ax, [0.11, 0.70, 0.075, 0.022], 'VALIDATED', style);
drawArrow(ax, [0.195, 0.63], [0.44, 0.50], 'I2C [0x48]', style);

drawBlock(ax, [0.025, 0.22, 0.17, 0.24], 'Spatial Thermal Grid', ...
    {'5x Maxim DS18B20 1-Wire', 'Top-bar, periphery, floor', 'Stainless steel clad probes', 'Propolis-proof isolation'}, style);
drawEvidenceTag(ax, [0.11, 0.42, 0.075, 0.022], 'VALIDATED', style);
drawArrow(ax, [0.195, 0.34], [0.28, 0.34], '1-Wire P0.17', style);

% Top Callouts
drawBlock(ax, [0.25, 0.74, 0.24, 0.14], 'Acoustic Transduction', ...
    {'InvenSense INMP441 I2S Mic', '16 kHz, 24-bit PCM Mono', 'ePTFE Gore-Tex Barrier Vent', 'Top-Bar Acoustic Chamber'}, style);
drawEvidenceTag(ax, [0.405, 0.84, 0.075, 0.022], 'VALIDATED', style);
drawArrow(ax, [0.37, 0.74], [0.42, 0.65], 'I2S Mono DMA', style);

drawBlock(ax, [0.52, 0.74, 0.26, 0.14], 'Environmental Cavity', ...
    {'Sensirion SCD41 (CO2 400-5000ppm)', 'Bosch BME688 (VOC/RH/P/T)', 'Top-bar ventilation duct', 'Ventilation stress marker'}, style);
drawEvidenceTag(ax, [0.695, 0.84, 0.075, 0.022], 'VALIDATED', style);
drawArrow(ax, [0.65, 0.74], [0.62, 0.65], 'I2C [0x62, 0x76]', style);

% Right Callout & Field Node
drawBlock(ax, [0.81, 0.52, 0.17, 0.24], 'Hive Wall / Exterior', ...
    {'ST LIS3DH 3-Axis Accel', 'Vishay VEML7700 Lux Sensor', 'Tamper & bear attack detection', 'Foraging solar lux correlation'}, style);
drawEvidenceTag(ax, [0.895, 0.72, 0.075, 0.022], 'VALIDATED', style);
drawArrow(ax, [0.81, 0.64], [0.79, 0.55], 'Wall Mount', style);

rectangle(ax, 'Position', [0.83, 0.24, 0.13, 0.20], 'FaceColor', style.fill_card_alt, ...
    'EdgeColor', style.stroke_dark, 'LineWidth', style.lw_regular);
text(ax, 0.895, 0.38, sprintf('FIELD NODE\nIP65 ABS Enclosure\n(65x55x15 mm)'), ...
    'FontName', style.font_family, 'FontSize', style.fs_tag, 'FontWeight', 'bold', ...
    'Color', style.stroke_dark, 'HorizontalAlignment', 'center');
text(ax, 0.895, 0.27, sprintf('PG-7 Glands\nSolderless Levers\nZero Custom PCB'), ...
    'FontName', style.font_family, 'FontSize', style.fs_tag, 'Color', style.stroke_med, 'HorizontalAlignment', 'center');

% Bottom Scale
drawBlock(ax, [0.36, 0.05, 0.28, 0.10], 'Baseboard Scale Transduction', ...
    {'Avia HX711 24-bit ADC with 200 kg Dual-Beam Load Cell', 'Continuous Foraging Mass & Winter Reserve Tracking'}, style);
drawEvidenceTag(ax, [0.555, 0.11, 0.075, 0.022], 'VALIDATED', style);
drawArrow(ax, [0.50, 0.15], [0.50, 0.21], 'Load Bridge', style);

drawLegend(ax, [0.18, 0.012, 0.64, 0.032], style);

end
