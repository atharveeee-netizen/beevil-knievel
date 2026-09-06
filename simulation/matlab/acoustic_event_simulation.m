%% BEEVIL KNIEVEL — Synthetic Acoustic Colony State Transition Simulation
% Script: acoustic_event_simulation.m
% Models multi-state acoustic sequence across 4 distinct biological phases:
% Phase 1 (0–10s): NORMAL COLONY (baseline ventilation 140 Hz, foraging 240 Hz)
% Phase 2 (10–20s): ELEVATED ACTIVITY (foraging surge, high waggle dance power)
% Phase 3 (20–30s): ABNORMAL ACOUSTIC STATE (pre-swarm piping surge 340 Hz, queenless roar)
% Phase 4 (30–40s): RECOVERY (stabilized baseline equilibrium)
% Output: docs/media/results/acoustic_event_simulation.png

clear; clc; close all;

fs = 2000;
N = 256;
duration = 40.0; % 40 seconds
t = 0:(1/fs):(duration - 1/fs);
L = length(t);

rng(101);

% Phase masks
p1 = (t >= 0 & t < 10);
p2 = (t >= 10 & t < 20);
p3 = (t >= 20 & t < 30);
p4 = (t >= 30 & t <= 40);

% Acoustic generators
% 140 Hz Fanning
s_140 = (0.35*p1 + 0.30*p2 + 0.20*p3 + 0.35*p4) .* sin(2 * pi * 140 * t);
% 240 Hz Waggle (surges in Phase 2)
s_240 = (0.25*p1 + 0.75*p2 + 0.20*p3 + 0.25*p4) .* sin(2 * pi * 240 * t);
% 340 Hz Swarm Piping (spikes heavily in Phase 3)
s_340 = (0.05*p1 + 0.10*p2 + 0.85*p3 + 0.05*p4) .* sin(2 * pi * 340 * t);
% 520 Hz Queenless Distress
s_520 = (0.02*p1 + 0.02*p2 + 0.45*p3 + 0.02*p4) .* sin(2 * pi * 520 * t);

noise = 0.12 * randn(size(t));
x = s_140 + s_240 + s_340 + s_520 + noise;

% Compute sliding sub-band power
hop = N / 2;
num_frames = floor((L - N) / hop) + 1;
t_eval = zeros(num_frames, 1);
E_norm = zeros(num_frames, 1);
E_active = zeros(num_frames, 1);
E_abnormal = zeros(num_frames, 1);

f_bins = (0:(N/2)) * fs / N;
k_norm = find(f_bins >= 100 & f_bins <= 180);
k_act  = find(f_bins >= 200 & f_bins <= 280);
k_abn  = find(f_bins >= 300 & f_bins <= 400);

for i = 1:num_frames
    idx = (i-1)*hop + 1;
    frame = x(idx : idx + N - 1) .* hann(N)';
    X_mag = abs(fft(frame, N) / N);
    t_eval(i) = idx / fs;
    E_norm(i) = sum(X_mag(k_norm).^2);
    E_active(i) = sum(X_mag(k_act).^2);
    E_abnormal(i) = sum(X_mag(k_abn).^2);
end

% Plot Multi-Panel Simulation Figure
fig = figure('Position', [100, 100, 1000, 650], 'Color', 'w');

% Subplot 1: Waveform with state zones
subplot(3, 1, 1);
plot(t, x, 'Color', [0.3, 0.4, 0.5], 'LineWidth', 0.5);
hold on;
xline(10, '--r', 'Elevated Activity', 'LabelVerticalAlignment', 'top', 'FontSize', 9);
xline(20, '--r', 'Abnormal Swarm Surge', 'LabelVerticalAlignment', 'top', 'FontSize', 9);
xline(30, '--g', 'Colony Recovery', 'LabelVerticalAlignment', 'top', 'FontSize', 9);
grid on;
title('Synthetic Acoustic Colony State Transitions [MODEL-BASED SIMULATION]', 'FontSize', 11, 'FontWeight', 'bold');
ylabel('Audio Amplitude', 'FontSize', 10);
xlim([0, 40]);

% Subplot 2: Spectrogram
subplot(3, 1, 2);
[S, F, T_s] = spectrogram(x, hann(N), hop, N, fs);
imagesc(T_s, F, 10*log10(abs(S) + 1e-6));
axis xy; colormap('jet');
ylim([0, 600]);
ylabel('Frequency [Hz]', 'FontSize', 10);
title('Sliding STFT Spectrogram (256-pt, 50% overlap)', 'FontSize', 10, 'FontWeight', 'bold');
caxis([-35, -5]);

% Subplot 3: Feature Trajectories & State Classifier
subplot(3, 1, 3);
plot(t_eval, E_norm, 'Color', [0.1, 0.6, 0.2], 'LineWidth', 1.5, 'DisplayName', 'Normal Baseline Band (100-180 Hz)');
hold on;
plot(t_eval, E_active, 'Color', [0.1, 0.4, 0.8], 'LineWidth', 1.5, 'DisplayName', 'Elevated Foraging Band (200-280 Hz)');
plot(t_eval, E_abnormal, 'Color', [0.85, 0.2, 0.1], 'LineWidth', 2.0, 'DisplayName', 'Pre-Swarm Piping Band (300-400 Hz)');
yline(0.12, ':k', 'Anomaly Threshold \tau = 0.12', 'LineWidth', 1.2);
grid on;
xlabel('Time [seconds]', 'FontSize', 10);
ylabel('Band Energy [V^2/Hz]', 'FontSize', 10);
title('Sub-Band Feature Trajectories & Threshold Trigger', 'FontSize', 10, 'FontWeight', 'bold');
xlim([0, 40]);
legend('Location', 'northwest');

saveas(fig, '../../docs/media/results/acoustic_event_simulation.png');
saveas(fig, '../results/acoustic_event_simulation.png');
fprintf('Acoustic event simulation plot generated successfully.\n');
