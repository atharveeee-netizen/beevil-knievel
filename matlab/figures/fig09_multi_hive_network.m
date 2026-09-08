function fig = fig09_multi_hive_network()
% FIG09_MULTI_HIVE_NETWORK Generates Figure 09: Multi-Hive Network Scalability & Economics
% IEEE HardwAIre Challenge Phase 2 — BEEVIL KNIEVEL
% 100-Node Commercial Apiary Star Network: Channel Capacity, Duty Cycle Analysis & Zero Cellular Fee Advantage

addpath(fullfile(fileparts(mfilename('fullpath')), '..', 'lib'));
style = createFigureStyle('standard');

fig = figure('Name', 'FIG 09: Multi-Hive Network Scalability & Economics', ...
    'Color', style.bg_color, ...
    'Position', [100, 100, style.width, style.height], ...
    'MenuBar', 'none', 'ToolBar', 'none');
ax = axes('Parent', fig, 'Position', [0, 0, 1, 1]);
hold(ax, 'on'); axis(ax, [0 1 0 1]); axis(ax, 'off');

% Header
text(ax, 0.035, 0.965, 'FIGURE 09: MULTI-HIVE NETWORK SCALABILITY & ECONOMIC TOPOLOGY', ...
    'FontName', style.font_family, 'FontSize', style.fs_title, 'FontWeight', 'bold', ...
    'Color', style.stroke_dark, 'VerticalAlignment', 'top');
text(ax, 0.035, 0.935, '100-Node Commercial Apiary Star Network: Channel Capacity, Duty Cycle Analysis & Zero Cellular Fee Advantage', ...
    'FontName', style.font_family, 'FontSize', style.fs_body, 'Color', style.stroke_med, 'VerticalAlignment', 'top');

% Left Subsystem: Apiary Layout
drawSubsystem(ax, [0.035, 0.09, 0.45, 0.82], 'Apiary Layout (100 Hives, Single Gateway Reader)', style);

for r = 0:4
    for c = 0:4
        hx = 0.055 + c * 0.050;
        hy = 0.45 + r * 0.075;
        rectangle(ax, 'Position', [hx, hy, 0.036, 0.048], 'FaceColor', style.fill_card, ...
            'EdgeColor', style.stroke_light, 'LineWidth', 0.6);
        text(ax, hx + 0.018, hy + 0.024, sprintf('H%d', r*5+c+1), 'FontName', style.font_family, ...
            'FontSize', style.fs_tag - 2, 'Color', style.stroke_light, 'HorizontalAlignment', 'center');
    end
end

text(ax, 0.18, 0.85, 'Commercial Apiary Yard (Hives 1 to 100)', ...
    'FontName', style.font_family, 'FontSize', style.fs_subhead, 'FontWeight', 'bold', ...
    'Color', style.stroke_dark, 'HorizontalAlignment', 'center');

drawBlock(ax, [0.34, 0.49, 0.13, 0.25], sprintf('Gateway\nReader'), ...
    {'RPi 3B+ & SX1262', 'Omni Whip Antenna', 'Local Storage', 'beevil.local'}, style);
drawEvidenceTag(ax, [0.38, 0.70, 0.08, 0.022], 'DEMONSTRATED', style);

drawRadioLink(ax, [0.305, 0.615], [0.34, 0.615], sprintf('Sub-GHz LoRa\n(865 MHz)'), style);

drawBlock(ax, [0.05, 0.13, 0.42, 0.26], 'Channel Capacity & Duty Cycle Proof', ...
    {'100 Hives transmitting at standard 15-minute telemetry interval.', ...
     'Packet airtime = 18.2 ms on channel (33-byte packed struct).', ...
     'Total on-air time per 15 min: 100 x 0.0182 s = 1.82 seconds.', ...
     'Aggregate Yard Duty Cycle = 1.82 s / 900 s = 0.202% (< 1.0% ISM regulatory limit).', ...
     'Collision probability < 0.15% via uncoordinated ALOHA channel distribution.'}, style);
drawEvidenceTag(ax, [0.38, 0.35, 0.08, 0.022], 'CALCULATED', style);

% Right Subsystem: Economics Comparison
drawSubsystem(ax, [0.515, 0.09, 0.45, 0.82], 'Economic & Structural Architecture Comparison', style);

headers = {'METRIC / CRITERION', 'COMMERCIAL CELLULAR', 'BEEVIL KNIEVEL'};
col_w = [0.17, 0.14, 0.14];
tx_start = 0.53;
ty_start = 0.83;

for i = 1:3
    text(ax, tx_start + sum(col_w(1:i-1)), ty_start, headers{i}, 'FontName', style.font_family, ...
        'FontSize', style.fs_tag, 'FontWeight', 'bold', 'Color', style.stroke_dark);
end

rows = {
    'Sensor Node Hardware', 'Custom PCB ($180–$350)', 'Modular WisBlock ($18.74)';
    'Monthly Cellular Fee / Hive', '$4.00 – $7.00 / month', '$0.00 (Zero SIM cards)';
    '100-Hive 3-Yr Telecom Cost', '$14,400 – $25,200', '$0.00 Total';
    'Network Topology', 'Cellular Tower Dependency', 'Autonomous Sub-GHz Star';
    'Brood RTD Precision', '±0.5°C to ±1.0°C (Uncal)', '±0.1°C NIST (TMP117)';
    'Acoustic Feature Sampling', 'None or raw 2 kHz stream', '16 kHz I2S + CMSIS FFT';
    'Queenless Early Detection', 'Manual hive inspection', 'Page''s CUSUM (-0.02°C/hr)';
    'Cloud Dependency', 'Mandatory SaaS Portal', '100% Offline Local Gateway'
};

for r_idx = 1:8
    ry = ty_start - 0.042 - (r_idx-1) * 0.048;
    text(ax, tx_start, ry, rows{r_idx, 1}, 'FontName', style.font_family, ...
        'FontSize', style.fs_tag - 0.5, 'Color', style.stroke_med);
    text(ax, tx_start + col_w(1), ry, rows{r_idx, 2}, 'FontName', style.font_family, ...
        'FontSize', style.fs_tag - 0.5, 'Color', [0.86, 0.15, 0.15]);
    text(ax, tx_start + col_w(1) + col_w(2), ry, rows{r_idx, 3}, 'FontName', style.font_family, ...
        'FontSize', style.fs_tag - 0.5, 'FontWeight', 'bold', 'Color', [0.02, 0.47, 0.34]);
    line(ax, [tx_start, tx_start + sum(col_w)], [ry - 0.01, ry - 0.01], ...
        'Color', style.stroke_light, 'LineWidth', 0.5);
end

drawBlock(ax, [0.53, 0.13, 0.42, 0.26], 'Scientific & Industry Distinction', ...
    {'1 Academic Baseline: Ferrari et al. (2008) wired thermocouples (bulky, high-power).', ...
     '2 Commercial Competitors: BroodMinder (BLE logger requiring manual yard walk) &', ...
     'Arnia (Cellular hub with high initial cost and recurring monthly SaaS lock-in).', ...
     'BEEVIL KNIEVEL bridges this gap with modular hardware, long-range LoRa & local edge AI.'}, style);
drawEvidenceTag(ax, [0.86, 0.35, 0.08, 0.022], 'VALIDATED', style);

drawLegend(ax, [0.18, 0.016, 0.64, 0.036], style);

end
