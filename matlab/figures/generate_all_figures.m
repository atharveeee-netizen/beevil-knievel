function generate_all_figures()
% GENERATE_ALL_FIGURES Master Orchestrator for BEEVIL KNIEVEL Figures
% IEEE HardwAIre Challenge Phase 2
% Generates and exports all 13 canonical figures in vector PDF, SVG, and 300 DPI PNG

fprintf('============================================================\n');
fprintf('BEEVIL KNIEVEL — MATLAB MASTER FIGURE GENERATION ENGINE\n');
fprintf('IEEE HardwAIre Challenge Phase 2 Canonical Engineering Figures\n');
fprintf('============================================================\n\n');

fig_dir = fileparts(mfilename('fullpath'));
addpath(fullfile(fig_dir, '..', 'lib'));
addpath(fig_dir);

out_dir = fullfile(fig_dir, '..', '..', 'docs', 'figures', 'matlab');
if ~exist(out_dir, 'dir')
    mkdir(out_dir);
end

figure_defs = {
    '01_system_architecture', @fig01_system_architecture;
    '02_hive_sensor_layer', @fig02_hive_sensor_layer;
    '03_sensor_node', @fig03_sensor_node;
    '04_embedded_processing', @fig04_embedded_processing;
    '05_acoustic_dsp', @fig05_acoustic_dsp;
    '06_lora_communication', @fig06_lora_communication;
    '07_receiver_gateway', @fig07_receiver_gateway;
    '08_ai_ml', @fig08_ai_ml;
    '09_multi_hive_network', @fig09_multi_hive_network;
    '10_end_to_end_dataflow', @fig10_end_to_end_dataflow;
    '11_ansys_simulation', @fig11_ansys_simulation;
    '12_validation', @fig12_validation;
    '13_video_master_architecture', @fig13_video_master_architecture
};

total_figures = size(figure_defs, 1);
fprintf('Starting generation of %d canonical figures...\n\n', total_figures);

for i = 1:total_figures
    name = figure_defs{i, 1};
    func = figure_defs{i, 2};
    fprintf('[%02d/%02d] Generating %s...\n', i, total_figures, name);
    try
        f = func();
        target_base = fullfile(out_dir, name);
        exportEngineeringFigure(f, target_base);
        close(f);
        fprintf('       Successfully exported: %s (pdf, svg, png)\n', name);
    catch ME
        fprintf('       ERROR generating %s: %s\n', name, ME.message);
    end
end

fprintf('\n============================================================\n');
fprintf('Master figure generation complete. All assets saved to:\n');
fprintf('  %s\n', out_dir);
fprintf('============================================================\n');

end
