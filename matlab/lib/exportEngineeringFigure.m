function exportEngineeringFigure(fig, base_path)
% EXPORTENGINEERINGFIGURE Exports figure to PDF (vector), SVG (vector) and PNG (300 DPI)
% base_path: e.g. 'docs/figures/matlab/01_system_architecture' (without extension)

[dir_part, ~, ~] = fileparts(base_path);
if ~exist(dir_part, 'dir') && ~isempty(dir_part)
    mkdir(dir_part);
end

% Set figure background to white
set(fig, 'Color', [1 1 1]);
set(fig, 'InvertHardcopy', 'off');

% Vector PDF export
pdf_path = [base_path '.pdf'];
fprintf('Exporting vector PDF: %s\n', pdf_path);
exportgraphics(fig, pdf_path, 'ContentType', 'vector');

% Vector SVG export
svg_path = [base_path '.svg'];
fprintf('Exporting vector SVG: %s\n', svg_path);
exportgraphics(fig, svg_path, 'ContentType', 'vector');

% High-resolution 300 DPI PNG export
png_path = [base_path '.png'];
fprintf('Exporting 300 DPI PNG: %s\n', png_path);
exportgraphics(fig, png_path, 'Resolution', 300);

end
