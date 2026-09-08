function h = drawAnnotation(ax, pos, text_lines, style, options)
% DRAWANNOTATION Draws a non-intrusive technical note or formula callout
% pos = [x, y, w, h]

if nargin < 5; options = struct(); end
if ~isfield(options, 'align'); options.align = 'left'; end
if ~isfield(options, 'border'); options.border = true; end

x = pos(1); y = pos(2); w = pos(3); h_dim = pos(4);

if options.border
    h.box = rectangle(ax, 'Position', pos, ...
        'FaceColor', [0.98, 0.98, 0.99], ...
        'EdgeColor', style.stroke_light, ...
        'LineWidth', style.lw_thin);
end

if strcmp(options.align, 'center')
    tx = x + w/2;
else
    tx = x + 0.04*w;
end

n_lines = length(text_lines);
spacing = (h_dim * 0.8) / max(n_lines, 1);

for i = 1:n_lines
    ty = (y + h_dim - 0.2*h_dim) - (i - 1)*spacing;
    text(ax, tx, ty, text_lines{i}, ...
        'FontName', style.font_family, ...
        'FontSize', style.fs_tag, ...
        'Color', style.stroke_med, ...
        'HorizontalAlignment', options.align, ...
        'VerticalAlignment', 'middle');
end

end
