function h = drawEvidenceTag(ax, pos, classification_str, style)
% DRAWEVIDENCETAG Draws an IEEE evidence tag badge ([MEASURED], [VALIDATED], etc.)
% pos = [x, y, w, h]

classification_str = upper(strtrim(classification_str));

switch classification_str
    case {'MEASURED', '[MEASURED]'}
        border_col = style.color_measured;
        tag_text = '[MEASURED]';
    case {'VALIDATED', '[VALIDATED]'}
        border_col = style.color_validated;
        tag_text = '[VALIDATED]';
    case {'CALCULATED', '[CALCULATED]'}
        border_col = style.color_calculated;
        tag_text = '[CALCULATED]';
    case {'SIMULATED', '[SIMULATED]'}
        border_col = style.color_simulated;
        tag_text = '[SIMULATED]';
    case {'DEMONSTRATED', '[DEMONSTRATED]'}
        border_col = style.color_demonstrated;
        tag_text = '[DEMONSTRATED]';
    otherwise
        border_col = style.stroke_med;
        tag_text = ['[' classification_str ']'];
end

% Draw rounded badge rectangle
h.rect = rectangle(ax, 'Position', pos, ...
    'Curvature', [0.3, 0.3], ...
    'FaceColor', [1.0, 1.0, 1.0], ...
    'EdgeColor', border_col, ...
    'LineWidth', style.lw_thin);

x = pos(1); y = pos(2); w = pos(3); h_dim = pos(4);
h.text = text(ax, x + w/2, y + h_dim/2, tag_text, ...
    'FontName', style.font_family, ...
    'FontSize', style.fs_badge, ...
    'FontWeight', 'bold', ...
    'Color', border_col, ...
    'HorizontalAlignment', 'center', ...
    'VerticalAlignment', 'middle');

end
