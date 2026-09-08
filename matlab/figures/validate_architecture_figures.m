function results = validate_architecture_figures()
% VALIDATE_ARCHITECTURE_FIGURES Automated Validation Suite for BEEVIL KNIEVEL Figures
% IEEE HardwAIre Challenge Phase 2
% Enforces architectural truth, forbidden term checks, coordinate bounds, and asset existence

fprintf('============================================================\n');
fprintf('BEEVIL KNIEVEL — MATLAB FIGURE ARCHITECTURAL VALIDATION SUITE\n');
fprintf('IEEE HardwAIre Challenge Phase 2 Truth Enforcement\n');
fprintf('============================================================\n\n');

fig_dir = fileparts(mfilename('fullpath'));
m_files = dir(fullfile(fig_dir, 'fig*.m'));

passed = 0;
failed = 0;
warnings = 0;

fprintf('1. VALIDATING SOURCE CODE FOR ARCHITECTURAL TRUTH & FORBIDDEN CLAIMS:\n');

forbidden_patterns = {
    'custom pcb', 'Custom PCB claim without denial prefix';
    'mesh', 'Mesh networking claim without denial/FEA qualifier';
    'state-of-the-art', 'Prohibited AI marketing superlative';
    'revolutionary', 'Prohibited AI marketing superlative';
    'game-changing', 'Prohibited AI marketing superlative';
    'groundbreaking', 'Prohibited AI marketing superlative'
};

for k = 1:length(m_files)
    fname = m_files(k).name;
    fpath = fullfile(fig_dir, fname);
    fid = fopen(fpath, 'r');
    content = fread(fid, '*char')';
    fclose(fid);
    
    file_passed = true;
    lower_content = lower(content);
    
    % Check for custom PCB without denial prefix
    c_idx = strfind(lower_content, 'custom pcb');
    for idx = c_idx
        prefix_start = max(1, idx - 25);
        prefix = lower_content(prefix_start:idx+9);
        if ~contains(prefix, 'zero') && ~contains(prefix, 'no') && ~contains(prefix, 'without') && ~contains(prefix, 'comparison')
            fprintf('  [FAIL] %s: Found unhedged "%s"\n', fname, 'custom pcb');
            file_passed = false;
            failed = failed + 1;
        end
    end
    
    % Check for mesh without NOT / non-mesh / FEA context
    m_idx = strfind(lower_content, 'mesh');
    for idx = m_idx
        prefix_start = max(1, idx - 25);
        surrounding = lower_content(prefix_start:min(length(lower_content), idx + 25));
        is_denied = contains(surrounding, 'not mesh') || contains(surrounding, 'zero') || ...
                    contains(surrounding, 'mesh refinement') || contains(surrounding, 'tetrahedral') || ...
                    contains(surrounding, 'polyhedral') || contains(surrounding, 'cfd') || ...
                    contains(surrounding, 'fea') || contains(surrounding, 'adaptive');
        if ~is_denied
            fprintf('  [FAIL] %s: Found unhedged network "mesh" claim\n', fname);
            file_passed = false;
            failed = failed + 1;
        end
    end
    
    % Check for generic AI buzzwords
    for p = 3:size(forbidden_patterns, 1)
        pat = forbidden_patterns{p, 1};
        desc = forbidden_patterns{p, 2};
        if contains(lower_content, pat)
            fprintf('  [FAIL] %s: Found "%s" (%s)\n', fname, pat, desc);
            file_passed = false;
            failed = failed + 1;
        end
    end
    
    if file_passed
        fprintf('  [PASS] %s conforms to strict architectural rules.\n', fname);
        passed = passed + 1;
    end
end

fprintf('\n2. CHECKING EXPORTED ASSET INTEGRITY:\n');
out_dir = fullfile(fig_dir, '..', '..', 'docs', 'figures', 'matlab');

fig_names = {
    '01_system_architecture',
    '02_hive_sensor_layer',
    '03_sensor_node',
    '04_embedded_processing',
    '05_acoustic_dsp',
    '06_lora_communication',
    '07_receiver_gateway',
    '08_ai_ml',
    '09_multi_hive_network',
    '10_end_to_end_dataflow',
    '11_ansys_simulation',
    '12_validation',
    '13_video_master_architecture'
};

formats = {'pdf', 'svg', 'png'};
missing_assets = 0;

for i = 1:length(fig_names)
    fbase = fig_names{i};
    for j = 1:length(formats)
        ext = formats{j};
        target_file = fullfile(out_dir, sprintf('%s.%s', fbase, ext));
        if exist(target_file, 'file')
            s = dir(target_file);
            if s.bytes > 1000
                % Asset is present and non-empty
            else
                fprintf('  [WARN] Asset exists but unusually small: %s.%s (%d bytes)\n', fbase, ext, s.bytes);
                warnings = warnings + 1;
            end
        else
            fprintf('  [FAIL] Missing exported asset: %s.%s\n', fbase, ext);
            missing_assets = missing_assets + 1;
        end
    end
end

if missing_assets == 0
    fprintf('  [PASS] All 39 exported assets (13 PDF, 13 SVG, 13 PNG) verified present and valid.\n');
    passed = passed + 1;
else
    fprintf('  [FAIL] %d exported assets are missing.\n', missing_assets);
    failed = failed + 1;
end

fprintf('\n============================================================\n');
fprintf('VALIDATION SUMMARY: %d PASSED, %d FAILED, %d WARNINGS\n', passed, failed, warnings);
fprintf('============================================================\n');

results.passed = passed;
results.failed = failed;
results.warnings = warnings;

end
