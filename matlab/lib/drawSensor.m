function h = drawSensor(ax, pos, sensor_name, part_num, interface_bus, style)
% DRAWSENSOR Draws a sensor transducer block with part number, bus label and evidence tag
% pos = [x, y, w, h]

opt = struct();
opt.fill_color = style.fill_card;
opt.stroke_color = style.stroke_dark;
opt.line_width = style.lw_regular;

body_lines = {part_num, ['[' interface_bus ']']};
h = drawBlock(ax, pos, sensor_name, body_lines, style, opt);

end
