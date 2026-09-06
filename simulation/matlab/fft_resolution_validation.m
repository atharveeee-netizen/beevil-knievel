%% BEEVIL KNIEVEL — FFT Resolution & Windowing Validation
% Script: fft_resolution_validation.m
% Validates the on-node FFT parameter selection:
% - fs = 2000 Hz, N = 256 -> delta_f = 7.8125 Hz
% - Compares Rectangular vs Hanning window spectral leakage
% - Demonstrates peak resolution of close acoustic tones (e.g., 230 Hz vs 250 Hz)
% Output: docs/media/results/fft_resolution_validation.png

clear; clc; close all;

%% 1. Parameters
fs = 2000;              % Sampling rate [Hz]
N = 256;                % Number of points
delta_f = fs / N;       % 7.8125 Hz
t = (0:(N-1)) / fs;     % Time vector for one frame (128 ms)

% Two closely spaced frequencies representing waggle harmonic modes
f1 = 235.0; % Hz
f2 = 255.0; % Hz
s = sin(2 * pi * f1 * t) + 0.8 * sin(2 * pi * f2 * t);

%% 2. Window Comparison
w_rect = rectwin(N)';
w_hann = hann(N)';

s_rect = s .* w_rect;
s_hann = s .* w_hann;

% FFT Execution
X_rect = abs(fft(s_rect, N)) / N;
X_hann = abs(fft(s_hann, N)) / (N / 2); % Amplitude corrected

% Over-sampled FFT to show true continuous DTFT leakage
N_dense = 2048;
f_dense = (0:(N_dense/2)) * fs / N_dense;
X_rect_dense = abs(fft(s_rect, N_dense)) / N;
X_hann_dense = abs(fft(s_hann, N_dense)) / (N / 2);

f_bins = (0:(N/2)) * fs / N;

%% 3. Plotting Validation Figure
fig = figure('Position', [100, 100, 950, 500], 'Color', 'w');

subplot(2, 1, 1);
plot(f_dense, 20*log10(X_rect_dense(1:N_dense/2+1) + 1e-6), 'Color', [0.7, 0.2, 0.2], 'LineWidth', 1.0, 'DisplayName', 'Rectangular Window (Continuous DTFT)');
hold on;
stem(f_bins, 20*log10(X_rect(1:N/2+1) + 1e-6), 'Color', [0.7, 0.2, 0.2], 'LineWidth', 1.5, 'Marker', 'x', 'DisplayName', '256-pt Discrete Bins (\Deltaf = 7.8125 Hz)');
grid on;
title('Rectangular Window: Severe Sidelobe Leakage (-13 dB peak sidelobe) [MODEL VALIDATION]', 'FontSize', 11, 'FontWeight', 'bold');
ylabel('Magnitude [dB]', 'FontSize', 10);
xlim([150, 350]);
ylim([-50, 5]);
legend('Location', 'northeast');

subplot(2, 1, 2);
plot(f_dense, 20*log10(X_hann_dense(1:N_dense/2+1) + 1e-6), 'Color', [0.1, 0.5, 0.2], 'LineWidth', 1.2, 'DisplayName', 'Hanning Window (Continuous DTFT)');
hold on;
stem(f_bins, 20*log10(X_hann(1:N/2+1) + 1e-6), 'Color', [0.1, 0.5, 0.2], 'LineWidth', 1.5, 'Marker', 'o', 'MarkerFaceColor', [0.1, 0.5, 0.2], 'DisplayName', '256-pt Discrete Bins (\Deltaf = 7.8125 Hz)');
grid on;
title('Hanning Window (BEEVIL Standard): Suppressed Sidelobes (-32 dB) Isolating Peaks at 235 Hz & 255 Hz', 'FontSize', 11, 'FontWeight', 'bold');
xlabel('Frequency [Hz]', 'FontSize', 11);
ylabel('Magnitude [dB]', 'FontSize', 10);
xlim([150, 350]);
ylim([-50, 5]);
legend('Location', 'northeast');

% Global Annotation
annotation('textbox', [0.13, 0.01, 0.75, 0.05], 'String', ...
    'MATLAB model-based validation of the BEEVIL acoustic FFT configuration: fs = 2000 Hz, N = 256, \Deltaf = 7.8125 Hz. Sidelobe suppression prevents acoustic false positives.', ...
    'FitBoxToText', 'on', 'EdgeColor', 'none', 'FontSize', 9, 'FontAngle', 'italic');

saveas(fig, '../../docs/media/results/fft_resolution_validation.png');
saveas(fig, '../results/fft_resolution_validation.png');
fprintf('FFT resolution validation plot generated successfully.\n');
