function h = drawLegend(ax, pos, style)
% DRAWLEGEND Draws canonical IEEE evidence classification legend
% pos = [x, y, w, h]

h.box = rectangle(ax, 'Position', pos, ...
    'FaceColor', [1.0, 1.0, 1.0], ...
    'EdgeColor', style.stroke_light, ...
    'LineWidth', style.lw_thin);

x = pos(1); y = pos(2); w = pos(3); h_dim = pos(4);

% Title
text(ax, x + 0.02*w, y + h_dim - 0.2*h_dim, 'EVIDENCE TAXONOMY:', ...
    'FontName', style.font_family, 'FontSize', style.fs_tag, ...
    'FontWeight', 'bold', 'Color', style.stroke_dark);

tags = {'MEASURED', 'VALIDATED', 'CALCULATED', 'SIMULATED', 'DEMONSTRATED'};
n_tags = length(tags);
badge_w = w * 0.17;
badge_h = h_dim * 0.5;
spacing = w * 0.19;

for i = 1:n_tags
    bx = x + 0.02*w + (i-1)*spacing;
    by = y + 0.15*h_dim;
    drawEvidenceTag(ax, [bx, by, badge_w, badge_h], tags{i}, style);
end

end
