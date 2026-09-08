function h = drawRadioLink(ax, tx_pos, rx_pos, freq_label, style)
% DRAWRADIOLINK Draws Sub-GHz LoRa RF transmission waves and link trajectory
% tx_pos = [x1, y1], rx_pos = [x2, y2]

x1 = tx_pos(1); y1 = tx_pos(2);
x2 = rx_pos(1); y2 = rx_pos(2);

% Main dashed trajectory
h.trajectory = plot(ax, [x1, x2], [y1, y2], ...
    'Color', style.accent_blue, ...
    'LineWidth', style.lw_regular, ...
    'LineStyle', '--');

% LoRa wave arcs
mx = (x1 + x2) / 2;
my = (y1 + y2) / 2;
radii = [0.03, 0.05, 0.07];
for r = radii
    theta = linspace(-pi/3, pi/3, 20);
    arc_x = mx - 0.05 + r * cos(theta);
    arc_y = my + r * sin(theta);
    plot(ax, arc_x, arc_y, 'Color', style.accent_blue, 'LineWidth', style.lw_thin);
end

% Frequency & protocol label
text(ax, mx, my + 0.08, freq_label, ...
    'FontName', style.font_family, ...
    'FontSize', style.fs_tag, ...
    'FontWeight', 'bold', ...
    'Color', style.accent_blue, ...
    'HorizontalAlignment', 'center', ...
    'VerticalAlignment', 'bottom');

end
