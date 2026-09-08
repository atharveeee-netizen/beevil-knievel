function fig = fig06_lora_communication()
% FIG06_LORA_COMMUNICATION Generates Figure 06: LoRa Communication & Memory Map
% IEEE HardwAIre Challenge Phase 2 — BEEVIL KNIEVEL
% Sub-GHz Star Network Topology, Indian ISM IN865 Regulatory Parameters & 33-Byte Binary Payload Structure

addpath(fullfile(fileparts(mfilename('fullpath')), '..', 'lib'));
style = createFigureStyle('standard');

fig = figure('Name', 'FIG 06: LoRa Wireless Communication & Memory Map', ...
    'Color', style.bg_color, ...
    'Position', [100, 100, style.width, style.height], ...
    'MenuBar', 'none', 'ToolBar', 'none');
ax = axes('Parent', fig, 'Position', [0, 0, 1, 1]);
hold(ax, 'on'); axis(ax, [0 1 0 1]); axis(ax, 'off');

% Header
text(ax, 0.035, 0.965, 'FIGURE 06: WIRELESS COMMUNICATION & LORA PACKET MEMORY MAP', ...
    'FontName', style.font_family, 'FontSize', style.fs_title, 'FontWeight', 'bold', ...
    'Color', style.stroke_dark, 'VerticalAlignment', 'top');
text(ax, 0.035, 0.935, 'Sub-GHz Star Network Topology, Indian ISM IN865 Regulatory Parameters & 33-Byte Binary Payload Structure', ...
    'FontName', style.font_family, 'FontSize', style.fs_body, 'Color', style.stroke_med, 'VerticalAlignment', 'top');

% Left Subsystem: Star Network Topology
drawSubsystem(ax, [0.035, 0.09, 0.38, 0.82], 'Gateway-Centric Sub-GHz Star Network (NOT Mesh)', style);

nodes = {
    'Hive Node 1', 0.050, 0.70;
    'Hive Node 2', 0.050, 0.51;
    'Hive Node 3', 0.050, 0.32;
    'Hive Node N (100)', 0.050, 0.13
};

for i = 1:4
    n_title = nodes{i, 1};
    nx = nodes{i, 2};
    ny = nodes{i, 3};
    drawBlock(ax, [nx, ny, 0.135, 0.15], n_title, {'RAK4631 Sub-GHz', '865.0625 MHz SF7'}, style);
    drawRadioLink(ax, [nx + 0.135, ny + 0.075], [0.245, 0.48], '', style);
end

drawBlock(ax, [0.245, 0.35, 0.155, 0.26], sprintf('Central Gateway\nReader'), ...
    {'Raspberry Pi 3B+', 'Waveshare SX1262 HAT', 'Single Receiver in Apiary', 'Local SQLite WAL Store'}, style);
drawEvidenceTag(ax, [0.31, 0.57, 0.08, 0.022], 'DEMONSTRATED', style);

text(ax, 0.322, 0.22, sprintf('Direct Star Topology:\nZero relay hops\nZero ad-hoc routing\nAggregate Yard Duty\nCycle < 0.2%% [CALCULATED]'), ...
    'FontName', style.font_family, 'FontSize', style.fs_tag, 'FontWeight', 'bold', ...
    'Color', style.stroke_med, 'HorizontalAlignment', 'center');

% Top Right Subsystem: Regulatory Link Budget
drawSubsystem(ax, [0.45, 0.55, 0.51, 0.36], 'IN865 Regulatory Link Budget & Airtime', style);
drawBlock(ax, [0.47, 0.58, 0.22, 0.28], 'RF Radio Configuration', ...
    {'Carrier Frequency: 865.0625 MHz', 'Spreading Factor: SF7 | Bandwidth: 125 kHz', ...
     'Coding Rate: 4/5 | Preamble: 8 symbols', 'Tx Power: +14 dBm (25 mW ERP)', 'Rx Sensitivity: -137 dBm'}, style);
drawEvidenceTag(ax, [0.60, 0.82, 0.08, 0.022], 'VALIDATED', style);

drawBlock(ax, [0.72, 0.58, 0.22, 0.28], 'Calculated Link Performance', ...
    {'Packet On-Air Time: 18.2 ms [CALCULATED]', 'Total Link Budget: 151 dB', ...
     'Line-of-Sight Range: 4.2 km [CALCULATED]', 'Dense Forest Canopy: 1.5 km', 'Link Margin at 1 km: 26.16 dB'}, style);
drawEvidenceTag(ax, [0.85, 0.82, 0.08, 0.022], 'CALCULATED', style);

% Bottom Right Subsystem: 33-Byte Payload Memory Map
drawSubsystem(ax, [0.45, 0.09, 0.51, 0.43], 'Packed Binary Payload Memory Map (sizeof = 33 Bytes)', style);

payload_fields = {
    'node_id', '2B', 'uint16';
    'timestamp', '4B', 'uint32';
    'T_core', '2B', 'int16';
    'T_grid[5]', '10B', '5x int16';
    'co2_ppm', '2B', 'uint16';
    'rh_c100', '2B', 'uint16';
    'weight_g', '4B', 'int32';
    'bins[8]', '4B', '8x 4-bit';
    'flags', '1B', 'bitmask';
    'crc16', '2B', 'CCITT'
};

sizes = [2, 4, 2, 10, 2, 2, 4, 4, 1, 2];
cell_y = 0.30;
cell_h = 0.14;
total_w = 0.47;
cx = 0.47;

for i = 1:10
    fname = payload_fields{i, 1};
    fsize = payload_fields{i, 2};
    ftype = payload_fields{i, 3};
    fw = max((sizes(i) / 33.0) * total_w, 0.035);
    
    rectangle(ax, 'Position', [cx, cell_y, fw, cell_h], 'FaceColor', [1 1 1], ...
        'EdgeColor', style.stroke_dark, 'LineWidth', 1.0);
    text(ax, cx + fw/2, cell_y + cell_h - 0.03, fname, 'FontName', style.font_family, ...
        'FontSize', style.fs_tag - 1, 'FontWeight', 'bold', 'Color', style.stroke_dark, 'HorizontalAlignment', 'center');
    text(ax, cx + fw/2, cell_y + 0.05, fsize, 'FontName', style.font_family, ...
        'FontSize', style.fs_tag - 1, 'Color', style.accent_blue, 'HorizontalAlignment', 'center');
    text(ax, cx + fw/2, cell_y + 0.02, ftype, 'FontName', style.font_family, ...
        'FontSize', style.fs_tag - 1.5, 'Color', style.stroke_light, 'HorizontalAlignment', 'center');
    cx = cx + fw;
end

text(ax, 0.705, 0.17, sprintf('Total Serialization: 33 Bytes packed struct | Zero JSON/ASCII string overhead\nPayload Verification: Hardware CRC-16 CCITT polynomial verification on receiver'), ...
    'FontName', style.font_family, 'FontSize', style.fs_tag, 'FontWeight', 'bold', ...
    'Color', style.stroke_dark, 'HorizontalAlignment', 'center');

drawLegend(ax, [0.18, 0.016, 0.64, 0.036], style);

end
