function h = drawArrow(ax, start_pt, end_pt, label_str, style, options)
% DRAWARROW Draws a crisp engineering orthogonal or direct arrow with label
% start_pt = [x1, y1], end_pt = [x2, y2]

if nargin < 6; options = struct(); end
if ~isfield(options, 'color'); options.color = style.stroke_dark; end
if ~isfield(options, 'line_width'); options.line_width = style.lw_regular; end
if ~isfield(options, 'line_style'); options.line_style = '-'; end
if ~isfield(options, 'arrow_size'); options.arrow_size = 0.015; end

x1 = start_pt(1); y1 = start_pt(2);
x2 = end_pt(1); y2 = end_pt(2);

% Main line
h.line = plot(ax, [x1, x2], [y1, y2], ...
    'Color', options.color, ...
    'LineWidth', options.line_width, ...
    'LineStyle', options.line_style);

% Arrowhead geometry
dx = x2 - x1;
dy = y2 - y1;
theta = atan2(dy, dx);
head_len = options.arrow_size;
alpha = pi / 6; % 30 deg

x_arrow = [x2 - head_len * cos(theta - alpha), x2, x2 - head_len * cos(theta + alpha)];
y_arrow = [y2 - head_len * sin(theta - alpha), y2, y2 - head_len * sin(theta + alpha)];

h.head = fill(ax, x_arrow, y_arrow, options.color, ...
    'EdgeColor', options.color, 'LineWidth', options.line_width);

% Label
if ~isempty(label_str)
    mx = (x1 + x2) / 2;
    my = (y1 + y2) / 2 + 0.02;
    h.label = text(ax, mx, my, label_str, ...
        'FontName', style.font_family, ...
        'FontSize', style.fs_tag, ...
        'Color', style.stroke_med, ...
        'HorizontalAlignment', 'center', ...
        'VerticalAlignment', 'bottom');
end

end
