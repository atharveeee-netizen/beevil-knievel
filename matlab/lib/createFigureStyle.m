function style = createFigureStyle(aspect)
% CREATEFIGURESTYLE Returns canonical IEEE styling parameters for BEEVIL KNIEVEL
% White background, slate technical lines, no gradients, no AI-slop.

if nargin < 1 || isempty(aspect)
    aspect = 'standard'; % 'standard' (4:3 / 16:10) or 'wide' (16:9)
end

style = struct();

% Canvas & Geometry
if strcmp(aspect, 'wide')
    style.width = 1600;
    style.height = 900;
else
    style.width = 1200;
    style.height = 800;
end

% Color Palette (IEEE Technical Print Palette)
style.bg_color          = [1.00, 1.00, 1.00]; % Pure white
style.stroke_dark       = [0.12, 0.16, 0.23]; % Slate 900 (#1e293b)
style.stroke_med        = [0.30, 0.35, 0.42]; % Slate 600
style.stroke_light      = [0.80, 0.83, 0.88]; % Slate 300
style.fill_card         = [0.97, 0.98, 0.99]; % Technical paper fill (#f8fafc)
style.fill_card_alt     = [0.94, 0.96, 0.98]; % Accent tier fill
style.accent_blue       = [0.12, 0.38, 0.65]; % Primary IEEE Blue
style.accent_amber      = [0.72, 0.40, 0.10]; % Amber warning / drift

% Evidence Classification Badges
style.color_measured     = [0.06, 0.45, 0.28]; % Green
style.color_validated    = [0.11, 0.38, 0.65]; % Blue
style.color_calculated   = [0.45, 0.30, 0.62]; % Purple
style.color_simulated    = [0.72, 0.40, 0.10]; % Orange
style.color_demonstrated = [0.15, 0.50, 0.50]; % Teal

% Line Widths
style.lw_thick   = 2.0;
style.lw_regular = 1.2;
style.lw_thin    = 0.8;
style.lw_bus     = 2.5;

% Typography
style.font_family = 'Helvetica';
style.fs_title    = 14;
style.fs_subhead  = 11;
style.fs_body     = 9;
style.fs_badge    = 7.5;
style.fs_tag      = 7.0;

end
