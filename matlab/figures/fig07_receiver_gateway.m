function fig = fig07_receiver_gateway()
% FIG07_RECEIVER_GATEWAY Generates Figure 07: Gateway Receiver Architecture
% IEEE HardwAIre Challenge Phase 2 — BEEVIL KNIEVEL
% Raspberry Pi 3B+ Reader, Waveshare SX1262 HAT, SQLite WAL Database & FastAPI Server [Zero Custom PCB]

addpath(fullfile(fileparts(mfilename('fullpath')), '..', 'lib'));
style = createFigureStyle('standard');

fig = figure('Name', 'FIG 07: Gateway Receiver & Local Analytics', ...
    'Color', style.bg_color, ...
    'Position', [100, 100, style.width, style.height], ...
    'MenuBar', 'none', 'ToolBar', 'none');
ax = axes('Parent', fig, 'Position', [0, 0, 1, 1]);
hold(ax, 'on'); axis(ax, [0 1 0 1]); axis(ax, 'off');

% Header
text(ax, 0.035, 0.965, 'FIGURE 07: GATEWAY RECEIVER & LOCAL ANALYTICS ARCHITECTURE', ...
    'FontName', style.font_family, 'FontSize', style.fs_title, 'FontWeight', 'bold', ...
    'Color', style.stroke_dark, 'VerticalAlignment', 'top');
text(ax, 0.035, 0.935, 'Raspberry Pi 3B+ Reader, Waveshare SX1262 HAT, SQLite WAL Database & FastAPI Server [Zero Custom PCB]', ...
    'FontName', style.font_family, 'FontSize', style.fs_body, 'Color', style.stroke_med, 'VerticalAlignment', 'top');

% Layer 1: Radio Ingestion
drawSubsystem(ax, [0.035, 0.09, 0.21, 0.82], 'Layer 1: Radio Ingestion', style);
drawBlock(ax, [0.05, 0.67, 0.18, 0.20], 'Waveshare SX1262 HAT', ...
    {'SPI Bus (spidev0.0)', 'Interrupt Line (GPIO 25)', 'IN865 Band: 865.0625 MHz', 'Continuous CAD / Rx Mode'}, style);
drawEvidenceTag(ax, [0.14, 0.83, 0.08, 0.022], 'DEMONSTRATED', style);

drawBlock(ax, [0.05, 0.39, 0.18, 0.24], 'Packet Validation', ...
    {'CRC-16 CCITT Check', 'Node ID Whitelist Filter', 'Bit Error Rejection', 'Unpack 33B Binary Struct', 'Reconstruct Physical Units'}, style);
drawEvidenceTag(ax, [0.14, 0.59, 0.08, 0.022], 'VALIDATED', style);

drawBlock(ax, [0.05, 0.12, 0.18, 0.23], 'Raspberry Pi 3B+', ...
    {'BCM2837B0 Quad A53 @ 1.4GHz', '1GB LPDDR2 SDRAM', 'Zero Custom PCB', 'Standard 40-Pin Header'}, style);
drawEvidenceTag(ax, [0.14, 0.31, 0.08, 0.022], 'DEMONSTRATED', style);

drawArrow(ax, [0.245, 0.50], [0.28, 0.50], sprintf('Validated\nTelemetry'), style);

% Layer 2: Local Persistence
drawSubsystem(ax, [0.28, 0.09, 0.21, 0.82], 'Layer 2: Local Persistence', style);
drawBlock(ax, [0.295, 0.53, 0.18, 0.33], 'SQLite WAL Engine', ...
    {'beevil_telemetry.db', 'Write-Ahead Logging (WAL)', 'High-Throughput Concurrent', ...
     'Storage for 100 Hives', '> 365 Days Offline History', 'Zero External Cloud DB Req.'}, style);
drawEvidenceTag(ax, [0.385, 0.82, 0.08, 0.022], 'DEMONSTRATED', style);

drawBlock(ax, [0.295, 0.15, 0.18, 0.34], 'Database Tables', ...
    {'raw_packets (audit log)', 'hive_telemetry (time-series)', 'colony_alerts (CUSUM flags)', ...
     'classification_results', 'Automated Daily Vacuum'}, style);
drawEvidenceTag(ax, [0.385, 0.45, 0.08, 0.022], 'DEMONSTRATED', style);

drawArrow(ax, [0.49, 0.50], [0.525, 0.50], sprintf('Feature\nVector'), style);

% Layer 3: Edge AI Engine
drawSubsystem(ax, [0.525, 0.09, 0.21, 0.82], 'Layer 3: Edge AI Engine', style);
drawBlock(ax, [0.54, 0.51, 0.18, 0.35], 'Random Forest (Model 2)', ...
    {'Scikit-Learn / NumPy Engine', '100 Decision Trees', 'Input: 8 Audio Bins + Env', ...
     'Trained on Zenodo 1321278', 'Validation Accuracy: 94.2%', '0 False Negatives Queenless'}, style);
drawEvidenceTag(ax, [0.63, 0.82, 0.08, 0.022], 'VALIDATED', style);

drawBlock(ax, [0.54, 0.15, 0.18, 0.32], 'Anomaly State Detector', ...
    {'NORMAL FORAGING (98%)', 'QUEENLESS COLLAPSE (Alert)', 'SWARM PIPING SURGE (Alert)', ...
     'VENTILATION STRESS (Warning)'}, style);
drawEvidenceTag(ax, [0.63, 0.43, 0.08, 0.022], 'VALIDATED', style);

drawArrow(ax, [0.735, 0.50], [0.77, 0.50], sprintf('State &\nPredictions'), style);

% Layer 4: Serving & UI
drawSubsystem(ax, [0.77, 0.09, 0.19, 0.82], 'Layer 4: Serving & UI', style);
drawBlock(ax, [0.785, 0.53, 0.16, 0.33], 'FastAPI Daemon', ...
    {'Async ASGI Service', 'REST: /api/v1/telemetry', 'WebSocket: /ws/live', ...
     'Port 8000 (beevil.local)', 'Zero Cloud Latency'}, style);
drawEvidenceTag(ax, [0.855, 0.82, 0.08, 0.022], 'DEMONSTRATED', style);

drawBlock(ax, [0.785, 0.15, 0.16, 0.34], 'Local PWA Dashboard', ...
    {'Responsive Mobile/Tablet', 'Acoustic Trend Heatmap', 'Thermal Stratification Plot', ...
     'Audio Swarm Alert Popup', 'Zero Monthly SaaS Fees'}, style);
drawEvidenceTag(ax, [0.855, 0.45, 0.08, 0.022], 'DEMONSTRATED', style);

drawLegend(ax, [0.18, 0.016, 0.64, 0.036], style);

end
