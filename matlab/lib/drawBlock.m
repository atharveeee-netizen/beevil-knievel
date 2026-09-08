function h = drawBlock(ax, pos, title_str, body_lines, style, options)
% DRAWBLOCK Draws a technical engineering rectangular block with header and specs
% pos = [x, y, w, h] (normalized coordinates 0 to 1 or absolute axis units)

if nargin < 6; options = struct(); end
if ~isfield(options, 'fill_color'); options.fill_color = style.fill_card; end
if ~isfield(options, 'stroke_color'); options.stroke_color = style.stroke_dark; end
if ~isfield(options, 'line_width'); options.line_width = style.lw_regular; end
if ~isfield(options, 'line_style'); options.line_style = '-'; end
if ~isfield(options, 'align'); options.align = 'center'; end

% Draw block rectangle
h.rect = rectangle(ax, 'Position', pos, ...
    'FaceColor', options.fill_color, ...
    'EdgeColor', options.stroke_color, ...
    'LineWidth', options.line_width, ...
    'LineStyle', options.line_style);

x = pos(1); y = pos(2); w = pos(3); h_box = pos(4);

% Text anchor
if strcmp(options.align, 'left')
    tx = x + 0.05 * w;
    anchor = 'left';
else
    tx = x + w / 2;
    anchor = 'center';
end

% Title
ty = y + h_box - 0.18 * h_box;
h.title = text(ax, tx, ty, title_str, ...
    'FontName', style.font_family, ...
    'FontSize', style.fs_subhead, ...
    'FontWeight', 'bold', ...
    'Color', style.stroke_dark, ...
    'HorizontalAlignment', anchor, ...
    'VerticalAlignment', 'middle');

% Body lines
if ~isempty(body_lines)
    n_lines = length(body_lines);
    spacing = (h_box * 0.65) / max(n_lines, 1);
    for i = 1:n_lines
        curr_y = (y + h_box - 0.35 * h_box) - (i - 1) * spacing;
        text(ax, tx, curr_y, body_lines{i}, ...
            'FontName', style.font_family, ...
            'FontSize', style.fs_body, ...
            'Color', style.stroke_med, ...
            'HorizontalAlignment', anchor, ...
            'VerticalAlignment', 'middle');
    end
end

end
