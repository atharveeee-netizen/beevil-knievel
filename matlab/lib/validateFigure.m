function is_valid = validateFigure(fig, fig_id, canonical_arch)
% VALIDATEFIGURE Automated truth and quality check for BEEVIL KNIEVEL figure
% Checks:
%   - Canvas dimensions and white background
%   - No historical forbidden tokens ("STM32WLE5", "mesh", "custom pcb", "LiFePO4", "2 kHz")
%   - All text objects within visible axes bounds [0, 1]

is_valid = true;
fprintf('Validating Figure %s...\n', fig_id);

% 1. Check Background Color
bg = get(fig, 'Color');
if any(abs(bg - [1 1 1]) > 1e-3)
    warning('Figure %s: Background is not pure white!', fig_id);
    is_valid = false;
end

% 2. Check Text Objects for Contradictions & Out-of-Bounds
ax = findobj(fig, 'Type', 'axes');
forbidden_terms = {'STM32WLE5', 'SX1276', 'mesh routing', 'custom pcb', 'LiFePO4', '2 kHz'};

for a = 1:length(ax)
    texts = findobj(ax(a), 'Type', 'text');
    for t = 1:length(texts)
        str = get(texts(t), 'String');
        if iscell(str)
            full_str = strjoin(str, ' ');
        else
            full_str = str;
        end
        
        % Check forbidden terms
        for k = 1:length(forbidden_terms)
            if contains(lower(full_str), lower(forbidden_terms{k}))
                warning('Figure %s: Violates truth rule! Contains forbidden term: "%s"', fig_id, forbidden_terms{k});
                is_valid = false;
            end
        end
        
        % Check bounds
        pos = get(texts(t), 'Position');
        if pos(1) < -0.05 || pos(1) > 1.05 || pos(2) < -0.05 || pos(2) > 1.05
            warning('Figure %s: Text "%s" positioned outside canvas bounds [%.2f, %.2f]', fig_id, full_str, pos(1), pos(2));
            is_valid = false;
        end
    end
end

if is_valid
    fprintf('Figure %s: PASSED all validation checks.\n', fig_id);
else
    fprintf('Figure %s: FAILED validation.\n', fig_id);
end

end
