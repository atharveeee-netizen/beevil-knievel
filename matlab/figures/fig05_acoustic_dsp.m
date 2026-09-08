function fig = fig05_acoustic_dsp()
% FIG05_ACOUSTIC_DSP Generates Figure 05: Bio-Acoustic DSP Pipeline
% IEEE HardwAIre Challenge Phase 2 — BEEVIL KNIEVEL
% From Hive Acoustic Vibrations to 8-Bin Spectral Energy Distribution [CMSIS-DSP arm_rfft_fast_f32, 2.49 ms Latency]

addpath(fullfile(fileparts(mfilename('fullpath')), '..', 'lib'));
style = createFigureStyle('standard');

fig = figure('Name', 'FIG 05: Bio-Acoustic DSP Pipeline', ...
    'Color', style.bg_color, ...
    'Position', [100, 100, style.width, style.height], ...
    'MenuBar', 'none', 'ToolBar', 'none');
ax = axes('Parent', fig, 'Position', [0, 0, 1, 1]);
hold(ax, 'on'); axis(ax, [0 1 0 1]); axis(ax, 'off');

% Header
text(ax, 0.035, 0.965, 'FIGURE 05: BIO-ACOUSTIC DIGITAL SIGNAL PROCESSING (DSP) PIPELINE', ...
    'FontName', style.font_family, 'FontSize', style.fs_title, 'FontWeight', 'bold', ...
    'Color', style.stroke_dark, 'VerticalAlignment', 'top');
text(ax, 0.035, 0.935, 'From Hive Acoustic Vibrations to 8-Bin Spectral Energy Distribution [CMSIS-DSP arm_rfft_fast_f32, 2.49 ms Latency]', ...
    'FontName', style.font_family, 'FontSize', style.fs_body, 'Color', style.stroke_med, 'VerticalAlignment', 'top');

% Stage 1: Transduction
drawSubsystem(ax, [0.035, 0.28, 0.17, 0.60], 'Stage 1: Transduction', style);
drawBlock(ax, [0.05, 0.60, 0.14, 0.23], 'Physical Vibration', ...
    {'Colony Audio Buzz', 'Worker Fanning: 100-250Hz', 'Worker Piping: 200-400Hz', 'Queen Tooting: 350-500Hz'}, style);
drawEvidenceTag(ax, [0.11, 0.79, 0.075, 0.022], 'VALIDATED', style);

drawBlock(ax, [0.05, 0.31, 0.14, 0.25], 'INMP441 MEMS', ...
    {'Omnidirectional Digital', 'ePTFE Moisture Filter', 'Propolis Proofing', 'SNR: 61 dBA | I2S Mono'}, style);
drawEvidenceTag(ax, [0.11, 0.52, 0.075, 0.022], 'VALIDATED', style);

drawArrow(ax, [0.205, 0.58], [0.24, 0.58], sprintf('I2S DMA\n16 kHz'), style);

% Stage 2: Pre-Processing
drawSubsystem(ax, [0.24, 0.28, 0.17, 0.60], 'Stage 2: Pre-Processing', style);
drawBlock(ax, [0.255, 0.60, 0.14, 0.23], '16 kHz Buffer', ...
    {'256 Samples (16.0 ms)', '24-bit PCM Mono Stream', 'Zero-Copy DMA Buffer', 'Continuous Hive Sample'}, style);
drawEvidenceTag(ax, [0.315, 0.79, 0.075, 0.022], 'VALIDATED', style);

drawBlock(ax, [0.255, 0.31, 0.14, 0.25], 'Hanning Window', ...
    {'w(n) = 0.5 - 0.5cos()', 'Reduces Spectral Leakage', 'Sidelobe Suppression', 'Zero DC Drift Bias'}, style);
drawEvidenceTag(ax, [0.315, 0.52, 0.075, 0.022], 'VALIDATED', style);

drawArrow(ax, [0.41, 0.58], [0.445, 0.58], sprintf('Windowed\nPCM Buffer'), style);

% Stage 3: ARM FFT Core
drawSubsystem(ax, [0.445, 0.28, 0.17, 0.60], 'Stage 3: ARM FFT Core', style);
drawBlock(ax, [0.46, 0.42, 0.14, 0.42], 'arm_rfft_fast_f32', ...
    {'ARM CMSIS-DSP Library', '256-Point Real FFT', 'Cortex-M4F Hardware FPU', ...
     'Execution Time: 2.49 ms', '[MEASURED DWT Cycles]', 'Frequency Resolution:', 'Delta_f = 62.5 Hz / Bin'}, style);
drawEvidenceTag(ax, [0.52, 0.80, 0.075, 0.022], 'MEASURED', style);

drawArrow(ax, [0.615, 0.58], [0.65, 0.58], sprintf('Complex\nCoefficients'), style);

% Stage 4: 8-Bin Spectral Energy Distribution
drawSubsystem(ax, [0.65, 0.28, 0.315, 0.60], 'Stage 4: 8-Bin Spectral Energy Distribution', style);

chart_x = 0.67; chart_y = 0.31; chart_w = 0.275; chart_h = 0.51;
rectangle(ax, 'Position', [chart_x, chart_y, chart_w, chart_h], 'FaceColor', [1 1 1], ...
    'EdgeColor', style.stroke_light, 'LineWidth', style.lw_thin);

text(ax, chart_x + chart_w/2, chart_y + chart_h - 0.03, 'SPECTRAL ENERGY BINS (0–500 Hz)', ...
    'FontName', style.font_family, 'FontSize', style.fs_subhead, 'FontWeight', 'bold', ...
    'Color', style.stroke_dark, 'HorizontalAlignment', 'center');

bin_labels = {'B0', 'B1', 'B2', 'B3*', 'B4*', 'B5*', 'B6', 'B7'};
bin_heights = [0.12, 0.18, 0.24, 0.35, 0.38, 0.29, 0.14, 0.08];

for i = 1:8
    bx = chart_x + 0.015 + (i-1) * 0.031;
    bh = bin_heights(i) * 0.75;
    by = chart_y + 0.08;
    if ismember(i, [4, 5, 6])
        col = style.accent_amber;
    else
        col = style.accent_blue;
    end
    rectangle(ax, 'Position', [bx, by, 0.022, bh], 'FaceColor', col, ...
        'EdgeColor', style.stroke_dark, 'LineWidth', 0.7);
    text(ax, bx + 0.011, chart_y + 0.04, bin_labels{i}, 'FontName', style.font_family, ...
        'FontSize', style.fs_tag, 'Color', style.stroke_med, 'HorizontalAlignment', 'center');
end

text(ax, chart_x + chart_w/2, chart_y + 0.41, '* Worker Piping / Pre-Swarm Peak (200–400 Hz)', ...
    'FontName', style.font_family, 'FontSize', style.fs_tag, 'FontWeight', 'bold', ...
    'Color', style.accent_amber, 'HorizontalAlignment', 'center');

% Bottom Block
drawBlock(ax, [0.15, 0.08, 0.70, 0.16], 'Edge vs Gateway Feature Handoff', ...
    {'On-Node MCU calculates 8 spectral bin energies and packs them into the 33-byte LoRa packet.', ...
     'Raspberry Pi Gateway Reader feeds these 8 bins + environmental features into Model 2 (Random Forest) for 94.2% colony classification.'}, style);
drawEvidenceTag(ax, [0.76, 0.20, 0.08, 0.022], 'VALIDATED', style);

drawLegend(ax, [0.18, 0.014, 0.64, 0.036], style);

end
