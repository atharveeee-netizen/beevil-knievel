function fig = fig04_embedded_processing()
% FIG04_EMBEDDED_PROCESSING Generates Figure 04: Embedded Signal Processing & Stateflow
% IEEE HardwAIre Challenge Phase 2 — BEEVIL KNIEVEL
% Deterministic State Execution Flow on Nordic nRF52840 MCU: From RTC Wake to Deep Sleep [18 µA Bench Validated]

addpath(fullfile(fileparts(mfilename('fullpath')), '..', 'lib'));
style = createFigureStyle('standard');

fig = figure('Name', 'FIG 04: Embedded Processing & Stateflow', ...
    'Color', style.bg_color, ...
    'Position', [100, 100, style.width, style.height], ...
    'MenuBar', 'none', 'ToolBar', 'none');
ax = axes('Parent', fig, 'Position', [0, 0, 1, 1]);
hold(ax, 'on'); axis(ax, [0 1 0 1]); axis(ax, 'off');

% Header
text(ax, 0.035, 0.965, 'FIGURE 04: EMBEDDED SIGNAL PROCESSING & FIRMWARE STATEFLOW', ...
    'FontName', style.font_family, 'FontSize', style.fs_title, 'FontWeight', 'bold', ...
    'Color', style.stroke_dark, 'VerticalAlignment', 'top');
text(ax, 0.035, 0.935, 'Deterministic State Execution Flow on Nordic nRF52840 MCU: From RTC Wake to Deep Sleep [18 µA Bench Validated]', ...
    'FontName', style.font_family, 'FontSize', style.fs_body, 'Color', style.stroke_med, 'VerticalAlignment', 'top');

states_top = {
    'STATE 0: RTC WAKE', {'15-min Cadence or', 'LIS3DH Tamper IRQ', 'LFCLK Active'}, 'MEASURED';
    'STATE 1: POWER ON', {'Assert WB_IO2 HIGH', 'Stabilize 3.3V Rail', 'Settling Delay 15ms'}, 'DEMONSTRATED';
    'STATE 2: SENSOR ACQ', {'Burst I2C & 1-Wire', '5x DS18B20 Grid', 'I2S DMA 16kHz Audio'}, 'VALIDATED';
    'STATE 3: SENTINEL CHK', {'Range: 15°C<T<45°C', 'NaN / Inf Rejection', 'Corrupted Filtered'}, 'VALIDATED';
    'STATE 4: CMSIS FFT', {'Hanning Window w(n)', 'arm_rfft_fast_f32', '2.49ms on Cortex-M4F', '8 Spectral Energy Bins'}, 'MEASURED'
};

states_bot = {
    'STATE 5: MODEL 1 CUSUM', {'Page''s CUSUM Filter', 'Detect -0.02°C/hr Drift', 'Brood Decay Bit', 'k=0.3°C, h=2.5°C'}, 'VALIDATED';
    'STATE 6: STRUCT PACK', {'Pack 33B LoRa Struct', 'Compress 8 Energy Bins', 'Compute CRC-16 CCITT', 'Load into SX1262 FIFO'}, 'VALIDATED';
    'STATE 7: LORA TRANSMIT', {'SX1262 TX (+14 dBm)', '865.0625 MHz, SF7', '18.2 ms On-Air Time', 'Wait TX_DONE IRQ'}, 'CALCULATED';
    'STATE 8: SENSOR CUT', {'Deassert WB_IO2 LOW', 'Cut Sensor VDD Line', 'Disable Peripherals'}, 'DEMONSTRATED';
    'STATE 9: DEEP SLEEP', {'System ON Idle Mode', 'Retention RAM Only', '18.0 uA Current Draw', 'Sleep 899.8 seconds'}, 'MEASURED'
};

bw = 0.165; bh = 0.28;
y_top = 0.54; y_bot = 0.15;

% Top Row: States 0 to 4 (left to right)
for i = 1:5
    bx = 0.045 + (i-1) * 0.188;
    title_str = states_top{i, 1};
    lines = states_top{i, 2};
    tag = states_top{i, 3};
    drawBlock(ax, [bx, y_top, bw, bh], title_str, lines, style);
    drawEvidenceTag(ax, [bx + bw - 0.082, y_top + bh - 0.025, 0.08, 0.022], tag, style);
    if i < 5
        drawArrow(ax, [bx + bw, y_top + bh/2], [bx + 0.188, y_top + bh/2], '', style);
    end
end

% Downward arrow from State 4 to State 5
drawArrow(ax, [0.045 + 4*0.188 + bw/2, y_top], [0.045 + 4*0.188 + bw/2, y_bot + bh], '', style);

% Bottom Row: States 5 to 9 (right to left)
for i = 1:5
    bx = 0.045 + (5 - i) * 0.188;
    title_str = states_bot{i, 1};
    lines = states_bot{i, 2};
    tag = states_bot{i, 3};
    drawBlock(ax, [bx, y_bot, bw, bh], title_str, lines, style);
    drawEvidenceTag(ax, [bx + bw - 0.082, y_bot + bh - 0.025, 0.08, 0.022], tag, style);
    if i < 5
        drawArrow(ax, [bx, y_bot + bh/2], [bx - (0.188 - bw), y_bot + bh/2], '', style);
    end
end

% Loop back arrow from State 9 to State 0
drawArrow(ax, [0.045 + bw/2, y_bot + bh], [0.045 + bw/2, y_top], 'Wake Timer Expired', style);

drawLegend(ax, [0.18, 0.016, 0.64, 0.036], style);

end
