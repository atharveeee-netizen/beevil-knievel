function fig = fig03_sensor_node()
% FIG03_SENSOR_NODE Generates Figure 03: Sensor Node Hardware Architecture
% IEEE HardwAIre Challenge Phase 2 — BEEVIL KNIEVEL
% Modular WisBlock RAK5005-O Baseboard, nRF52840 MCU, SX1262 LoRa, Switched Rail & Power System [Zero Custom PCB]

addpath(fullfile(fileparts(mfilename('fullpath')), '..', 'lib'));
style = createFigureStyle('standard');

fig = figure('Name', 'FIG 03: Sensor Node Hardware Architecture', ...
    'Color', style.bg_color, ...
    'Position', [100, 100, style.width, style.height], ...
    'MenuBar', 'none', 'ToolBar', 'none');
ax = axes('Parent', fig, 'Position', [0, 0, 1, 1]);
hold(ax, 'on'); axis(ax, [0 1 0 1]); axis(ax, 'off');

% Header
text(ax, 0.035, 0.965, 'FIGURE 03: SENSOR NODE HARDWARE ARCHITECTURE', ...
    'FontName', style.font_family, 'FontSize', style.fs_title, 'FontWeight', 'bold', ...
    'Color', style.stroke_dark, 'VerticalAlignment', 'top');
text(ax, 0.035, 0.935, 'Modular WisBlock RAK5005-O Baseboard, nRF52840 MCU, SX1262 LoRa, Switched Rail & Power System [Zero Custom PCB]', ...
    'FontName', style.font_family, 'FontSize', style.fs_body, 'Color', style.stroke_med, 'VerticalAlignment', 'top');

% Subsystem 1: Sensory Transducers
drawSubsystem(ax, [0.035, 0.09, 0.24, 0.82], 'Sensory Transducers', style);
drawBlock(ax, [0.05, 0.74, 0.21, 0.13], 'Brood Temp (TMP117)', ...
    {'I2C (0x48) | NIST ±0.1°C'}, style);
drawEvidenceTag(ax, [0.18, 0.83, 0.075, 0.022], 'VALIDATED', style);

drawBlock(ax, [0.05, 0.61, 0.21, 0.12], 'Thermal Grid (DS18B20)', ...
    {'1-Wire (Pin P0.17) | 5 Probes'}, style);
drawEvidenceTag(ax, [0.18, 0.69, 0.075, 0.022], 'VALIDATED', style);

drawBlock(ax, [0.05, 0.48, 0.21, 0.12], 'Acoustic Mic (INMP441)', ...
    {'I2S Mono | 16 kHz 24-bit PCM'}, style);
drawEvidenceTag(ax, [0.18, 0.56, 0.075, 0.022], 'VALIDATED', style);

drawBlock(ax, [0.05, 0.35, 0.21, 0.12], 'CO2 NDIR (SCD41)', ...
    {'I2C (0x62) | 400-5000 ppm'}, style);
drawEvidenceTag(ax, [0.18, 0.43, 0.075, 0.022], 'VALIDATED', style);

drawBlock(ax, [0.05, 0.22, 0.21, 0.12], 'Multi-Gas (BME688)', ...
    {'I2C (0x76) | VOC / RH / P / T'}, style);
drawEvidenceTag(ax, [0.18, 0.30, 0.075, 0.022], 'VALIDATED', style);

drawBlock(ax, [0.05, 0.10, 0.21, 0.11], 'Weight & Motion', ...
    {'HX711 Scale + LIS3DH Accel'}, style);
drawEvidenceTag(ax, [0.18, 0.17, 0.075, 0.022], 'VALIDATED', style);

% Arrow: Transducers -> Core
drawArrow(ax, [0.26, 0.50], [0.31, 0.50], sprintf('Sensor Bus\n(I2C, 1-Wire, I2S)'), style);

% Subsystem 2: WisBlock Modular Core
drawSubsystem(ax, [0.31, 0.29, 0.39, 0.62], 'WisBlock Modular Core (RAK4631 on RAK5005-O Baseboard)', style);
drawBlock(ax, [0.33, 0.67, 0.35, 0.19], 'Nordic nRF52840 Microcontroller', ...
    {'ARM Cortex-M4F @ 64 MHz, Hardware FPU', '1024 KB Flash, 256 KB Low-Leakage SRAM', ...
     'Dedicated DMA Channels (I2S, SPI, EasyDMA)', 'Internal Temp Peripheral (25.4°C–26.8°C) [MEASURED]'}, style);
drawEvidenceTag(ax, [0.58, 0.82, 0.09, 0.022], 'DEMONSTRATED', style);

drawBlock(ax, [0.33, 0.47, 0.17, 0.18], 'CMSIS-DSP Engine', ...
    {'arm_rfft_fast_f32', '256-Point Real FFT', '2.49 ms Latency [MEASURED]', '8 Spectral Energy Bins'}, style);
drawEvidenceTag(ax, [0.41, 0.61, 0.08, 0.022], 'MEASURED', style);

drawBlock(ax, [0.51, 0.47, 0.17, 0.18], 'Model 1: Edge CUSUM', ...
    {'Page''s CUSUM Detector', 'Brood Decay: -0.02°C/hr', 'k = 0.3°C, h = 2.5°C', 'Queenless Collapse Bit'}, style);
drawEvidenceTag(ax, [0.59, 0.61, 0.08, 0.022], 'VALIDATED', style);

drawBlock(ax, [0.33, 0.31, 0.35, 0.14], 'Protocol Serializer', ...
    {'Packed 33-Byte Binary Struct (BeevilLoRaPayload)', 'Hardware CRC-16 CCITT Polynomial Checksum'}, style);
drawEvidenceTag(ax, [0.59, 0.41, 0.08, 0.022], 'VALIDATED', style);

% Subsystem 3: Dual-Radio Transceivers
drawSubsystem(ax, [0.72, 0.29, 0.25, 0.62], 'Dual-Radio Transceivers', style);
drawBlock(ax, [0.735, 0.64, 0.22, 0.22], 'Dual Transceivers', ...
    {'SX1262 LoRa (+14 dBm)', 'nRF52840 2.4GHz BLE Mesh', '-137 dBm Rx Sensitivity', '151 dB Link Budget', '18.2 ms LoRa Airtime'}, style);
drawEvidenceTag(ax, [0.86, 0.82, 0.085, 0.022], 'CALCULATED', style);

drawArrow(ax, [0.68, 0.75], [0.735, 0.75], 'SPI / 2.4G', style);

drawBlock(ax, [0.735, 0.33, 0.22, 0.26], 'Dual Antennas', ...
    {'865 MHz Sub-GHz Whip', '2.4 GHz Ceramic BLE Antenna', 'SMA Bulkhead (IP68)', 'S11 = -22.4 dB [SIMULATED]', 'VSWR = 1.16 [SIMULATED]'}, style);
drawEvidenceTag(ax, [0.86, 0.55, 0.085, 0.022], 'SIMULATED', style);

drawArrow(ax, [0.845, 0.64], [0.845, 0.59], 'RF Coax', style);

% Subsystem 4: Ultra-Low-Power Subsystem
drawSubsystem(ax, [0.31, 0.09, 0.66, 0.18], 'Ultra-Low-Power Subsystem & Power Management (18 uA Deep Sleep)', style);
drawBlock(ax, [0.33, 0.105, 0.19, 0.13], 'Harvesting & Battery', ...
    {'0.5W, 6V Solar Panel', '1S 3.7V Li-ion (18650)', 'TP4054 Linear CC/CV'}, style);
drawEvidenceTag(ax, [0.43, 0.20, 0.085, 0.022], 'DEMONSTRATED', style);

drawBlock(ax, [0.54, 0.105, 0.20, 0.13], 'Switched Rail (WB_IO2)', ...
    {'P-MOSFET Gate Switch', 'Cuts all sensor drain', '18.0 uA Sleep Current [MEASURED]'}, style);
drawEvidenceTag(ax, [0.65, 0.20, 0.08, 0.022], 'MEASURED', style);

drawBlock(ax, [0.76, 0.105, 0.19, 0.13], 'Solderless Terminals', ...
    {'4:2 Spring Levers', 'Zero Custom PCB', 'IP68 PG-7 Cable Glands'}, style);
drawEvidenceTag(ax, [0.86, 0.20, 0.085, 0.022], 'DEMONSTRATED', style);

drawArrow(ax, [0.64, 0.235], [0.64, 0.29], 'Power Rail', style);

drawLegend(ax, [0.18, 0.016, 0.64, 0.036], style);

end
