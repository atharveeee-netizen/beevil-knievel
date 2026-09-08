function fig = fig12_validation()
% FIG12_VALIDATION Generates Figure 12: Scientific Evidence Taxonomy Matrix
% IEEE HardwAIre Challenge Phase 2 — BEEVIL KNIEVEL
% Deterministic Classification of System Parameters: Measured, Validated, Calculated, Simulated & Demonstrated

addpath(fullfile(fileparts(mfilename('fullpath')), '..', 'lib'));
style = createFigureStyle('standard');

fig = figure('Name', 'FIG 12: Scientific Evidence Taxonomy Matrix', ...
    'Color', style.bg_color, ...
    'Position', [100, 100, style.width, style.height], ...
    'MenuBar', 'none', 'ToolBar', 'none');
ax = axes('Parent', fig, 'Position', [0, 0, 1, 1]);
hold(ax, 'on'); axis(ax, [0 1 0 1]); axis(ax, 'off');

% Header
text(ax, 0.035, 0.965, 'FIGURE 12: SCIENTIFIC EVIDENCE & VALIDATION TAXONOMY MATRIX', ...
    'FontName', style.font_family, 'FontSize', style.fs_title, 'FontWeight', 'bold', ...
    'Color', style.stroke_dark, 'VerticalAlignment', 'top');
text(ax, 0.035, 0.935, 'Deterministic Classification of System Parameters: Measured, Validated, Calculated, Simulated & Demonstrated', ...
    'FontName', style.font_family, 'FontSize', style.fs_body, 'Color', style.stroke_med, 'VerticalAlignment', 'top');

categories = {
    'MEASURED', '[MEASURED]', 'Direct Bench Instruments', style.tag_measured, {
        'Quiescent Current', '18.0 uA (Keithley 6514)';
        'DSP FFT Latency', '2.49 ms (DWT Cycles)';
        'MCU Die Temp', '25.4°C–26.8°C (TEMP)';
        'Hardware Weight', '67 g (Digital Scale)';
        'Enclosure Size', '65x55x15 mm (Calipers)'
    };
    'VALIDATED', '[VALIDATED]', 'Empirical Calibrations', style.tag_validated, {
        'Brood Core RTD', '±0.1°C NIST (TMP117)';
        'Spatial Grid', '±0.5°C (5x DS18B20)';
        'Audio Stream', '16 kHz 24-bit PCM';
        'CUSUM Drift', '-0.02°C/hr Queenless';
        'Model 2 AI', '94.2% Acc (Zenodo)';
        'Test Suite', '27/27 Tests Pass'
    };
    'CALCULATED', '[CALCULATED]', 'Analytical Physics Models', style.tag_calculated, {
        'Packet Airtime', '18.2 ms (SX1262 Calc)';
        'Daily Energy', '0.85 mWh/day (15m)';
        'LoRa LOS Range', '4.2 km (Free-Space)';
        'Link Margin', '26.16 dB @ 1 km';
        'Apiary Duty Cycle', '0.202% (<1.0% Limit)';
        'BOM Unit Cost', '$18.74 (No Custom PCB)'
    };
    'SIMULATED', '[SIMULATED]', 'Multiphysics Solvers', style.tag_simulated, {
        'Antenna Return Loss', 'S_11 = -22.4 dB (HFSS)';
        'Antenna VSWR', '1.16 : 1 (50 Ohm Match)';
        'Radiation Eff.', '91.4% (ABS Casing)';
        'Thermal Core', '34.5°C (Fluent CFD)';
        'Convective Plume', '0.18 m/s Natural Draft'
    };
    'DEMONSTRATED', '[DEMONSTRATED]', 'Physical System Builds', style.tag_demonstrated, {
        'Transmitter Node', 'WisBlock RAK5005-O';
        'Receiver Reader', 'RPi 3B+ & Waveshare';
        'Wiring Terminals', '4:2 Levers & PG-7';
        'Local Server', 'FastAPI Daemon';
        'Offline Database', 'SQLite WAL Store'
    }
};

col_w = 0.176;
col_h = 0.74;
y_pos = 0.135;

for i = 1:5
    cx = 0.035 + (i-1) * 0.188;
    tag_str = categories{i, 2};
    subtitle = categories{i, 3};
    tc = categories{i, 4};
    items = categories{i, 5};
    
    % Outer Card
    rectangle(ax, 'Position', [cx, y_pos, col_w, col_h], 'FaceColor', [0.99 0.99 0.99], ...
        'EdgeColor', tc, 'LineWidth', 1.5);
    
    % Header Badge
    rectangle(ax, 'Position', [cx + 0.01, y_pos + col_h - 0.045, col_w - 0.02, 0.035], ...
        'Curvature', [0.3, 0.3], 'FaceColor', tc, 'EdgeColor', tc);
    text(ax, cx + col_w/2, y_pos + col_h - 0.028, tag_str, 'FontName', style.font_family, ...
        'FontSize', style.fs_subhead - 1, 'FontWeight', 'bold', 'Color', [1 1 1], ...
        'HorizontalAlignment', 'center', 'VerticalAlignment', 'middle');
    
    text(ax, cx + col_w/2, y_pos + col_h - 0.065, subtitle, 'FontName', style.font_family, ...
        'FontSize', style.fs_tag - 1, 'FontAngle', 'italic', 'Color', style.stroke_med, ...
        'HorizontalAlignment', 'center');
    
    % Items
    n_items = size(items, 1);
    spacing = (col_h - 0.11) / max(n_items, 1);
    for j = 1:n_items
        iy = (y_pos + col_h - 0.10) - (j-1) * spacing;
        pname = items{j, 1};
        pval = items{j, 2};
        text(ax, cx + 0.012, iy, sprintf('• %s:', pname), 'FontName', style.font_family, ...
            'FontSize', style.fs_tag - 0.5, 'FontWeight', 'bold', 'Color', style.stroke_dark, ...
            'HorizontalAlignment', 'left', 'VerticalAlignment', 'top');
        text(ax, cx + 0.020, iy - 0.022, pval, 'FontName', style.font_family, ...
            'FontSize', style.fs_tag - 1, 'Color', tc, ...
            'HorizontalAlignment', 'left', 'VerticalAlignment', 'top');
    end
end

drawLegend(ax, [0.18, 0.016, 0.64, 0.036], style);

end
