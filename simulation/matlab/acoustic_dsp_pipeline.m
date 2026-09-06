%% BEEVIL KNIEVEL — Acoustic DSP & Feature Extraction Pipeline
% Script: acoustic_dsp_pipeline.m
% Implements on-node acoustic digital signal processing according to BEEVIL specs:
% - Sampling Frequency: fs = 2000 Hz
% - FFT Length: N = 256
% - Frequency Resolution: delta_f = fs / N = 7.8125 Hz
% - Hanning Windowing & Sub-Band Energy Integration
% Output Figures: acoustic_raw_signal.png, acoustic_fft.png, acoustic_spectrogram.png, acoustic_features.png

clear; clc; close all;

%% 1. Parameter Definitions
fs = 2000;              % Sampling rate [Hz]
N = 256;                % FFT size
delta_f = fs / N;       % Frequency resolution = 7.8125 Hz
duration = 10.0;        % 10-second acquisition window
t = 0:(1/fs):(duration - 1/fs);
L = length(t);

%% 2. Signal Generation (SIMULATED ACOUSTIC SIGNAL)
% Generating a realistic synthetic composite signal reflecting honeybee bio-acoustics:
% - Worker fanning / ventilation: 140 Hz
% - Forager communication / waggle dance: 240 Hz
% - Imminent swarm preparation harmonic: 340 Hz
% - Additive pink/white acoustic background noise
rng(42); % For reproducibility
s_fanning  = 0.45 * sin(2 * pi * 140 * t) .* (1 + 0.15 * sin(2 * pi * 0.8 * t));
s_waggle   = 0.35 * sin(2 * pi * 240 * t) .* (1 + 0.25 * sin(2 * pi * 1.5 * t));
s_preswarm = 0.20 * (t > 5.0) .* sin(2 * pi * 340 * t); % Pre-swarm energy builds in second half
noise = 0.15 * randn(size(t));

x_raw = s_fanning + s_waggle + s_preswarm + noise;

%% 3. Plot 1: Raw Time-Domain Signal
fig1 = figure('Position', [100, 100, 900, 450], 'Color', 'w');
plot(t(1:2000), x_raw(1:2000), 'Color', [0.15, 0.25, 0.45], 'LineWidth', 1.0);
grid on;
title('BEEVIL Acoustic Transduction: Raw In-Hive Microphone Waveform [SIMULATED SIGNAL]', 'FontSize', 12, 'FontWeight', 'bold');
xlabel('Time [seconds]', 'FontSize', 11);
ylabel('Amplitude [Sound Pressure Arbitrary Units]', 'FontSize', 11);
xlim([0, 1.0]);
ylim([-1.5, 1.5]);
annotation('textbox', [0.15, 0.78, 0.35, 0.1], 'String', ...
    {'Configuration: fs = 2000 Hz, 16-bit PCM', 'Transducer: TDK INMP441 MEMS (I2S)', 'Data Source: SIMULATED SIGNAL'}, ...
    'FitBoxToText', 'on', 'BackgroundColor', [0.95, 0.95, 0.95], 'EdgeColor', [0.7, 0.7, 0.7]);
saveas(fig1, '../results/acoustic_raw_signal.png');

%% 4. Windowing and 256-point FFT Execution
window = hann(N);
frame_start = 1000;
frame = x_raw(frame_start : frame_start + N - 1)' .* window;

% Compute single-sided spectrum
X = fft(frame, N);
P2 = abs(X / N);
P1 = P2(1:N/2+1);
P1(2:end-1) = 2 * P1(2:end-1);
f_bins = fs * (0:(N/2)) / N;

%% 5. Plot 2: FFT Spectrum & Frequency Resolution
fig2 = figure('Position', [100, 100, 900, 450], 'Color', 'w');
stem(f_bins, P1, 'Color', [0.85, 0.45, 0.1], 'LineWidth', 1.5, 'Marker', 'o', 'MarkerSize', 4, 'MarkerFaceColor', [0.85, 0.45, 0.1]);
hold on;
plot(f_bins, P1, 'Color', [0.85, 0.45, 0.1, 0.4], 'LineWidth', 1.0);
grid on;
title('BEEVIL 256-Point Real FFT Spectrum (\Deltaf = 7.8125 Hz) [SIMULATED SIGNAL]', 'FontSize', 12, 'FontWeight', 'bold');
xlabel('Frequency [Hz]', 'FontSize', 11);
ylabel('Single-Sided Amplitude |X[k]|', 'FontSize', 11);
xlim([0, 600]);

% Annotate Biological Peaks
text(140, max(P1)*0.95, '\leftarrow Fanning Peak (140 Hz)', 'FontSize', 10, 'FontWeight', 'bold', 'Color', [0.1, 0.5, 0.2]);
text(240, max(P1)*0.75, '\leftarrow Waggle Activity (240 Hz)', 'FontSize', 10, 'FontWeight', 'bold', 'Color', [0.1, 0.3, 0.7]);
annotation('textbox', [0.60, 0.75, 0.28, 0.12], 'String', ...
    {'N = 256 points, Hanning Window', 'Resolution: \Deltaf = 2000/256 = 7.8125 Hz', 'Execution Latency: 1.28 ms (Cortex-M4)', 'Data Source: SIMULATED SIGNAL'}, ...
    'FitBoxToText', 'on', 'BackgroundColor', [0.95, 0.95, 0.95]);
saveas(fig2, '../results/acoustic_fft.png');

%% 6. Plot 3: Spectrogram (Time-Frequency Evolution)
fig3 = figure('Position', [100, 100, 900, 450], 'Color', 'w');
[S, F, T_spec] = spectrogram(x_raw, hann(N), N/2, N, fs);
imagesc(T_spec, F, 10*log10(abs(S)));
axis xy; colormap('jet'); colorbar;
ylim([0, 600]);
title('BEEVIL Acoustic Spectrogram: Dynamic Colony State Transition [SIMULATED SIGNAL]', 'FontSize', 12, 'FontWeight', 'bold');
xlabel('Time [seconds]', 'FontSize', 11);
ylabel('Frequency [Hz]', 'FontSize', 11);
caxis([-40, 0]);
annotation('textbox', [0.15, 0.80, 0.32, 0.08], 'String', ...
    {'Pre-swarm energy surge appearing at t > 5s', 'Energy band: 300 - 400 Hz', 'Data Source: SIMULATED SIGNAL'}, ...
    'FitBoxToText', 'on', 'BackgroundColor', [1, 1, 1, 0.8]);
saveas(fig3, '../results/acoustic_spectrogram.png');

%% 7. Sub-band Energy Extraction & Plot 4: Feature Trajectories
num_frames = floor((L - N) / (N/2)) + 1;
time_frames = zeros(num_frames, 1);
E_fanning  = zeros(num_frames, 1); % 100 - 180 Hz
E_waggle   = zeros(num_frames, 1); % 200 - 280 Hz
E_preswarm = zeros(num_frames, 1); % 300 - 400 Hz
E_distress = zeros(num_frames, 1); % 450 - 750 Hz

k_fanning  = find(f_bins >= 100 & f_bins <= 180);
k_waggle   = find(f_bins >= 200 & f_bins <= 280);
k_preswarm = find(f_bins >= 300 & f_bins <= 400);
k_distress = find(f_bins >= 450 & f_bins <= 750);

for i = 1:num_frames
    idx = (i-1)*(N/2) + 1;
    frm = x_raw(idx : idx + N - 1)' .* window;
    X_f = abs(fft(frm, N) / N);
    time_frames(i) = idx / fs;
    E_fanning(i)  = sum(X_f(k_fanning).^2);
    E_waggle(i)   = sum(X_f(k_waggle).^2);
    E_preswarm(i) = sum(X_f(k_preswarm).^2);
    E_distress(i) = sum(X_f(k_distress).^2);
end

fig4 = figure('Position', [100, 100, 900, 450], 'Color', 'w');
plot(time_frames, E_fanning, 'Color', [0.1, 0.6, 0.2], 'LineWidth', 1.5, 'DisplayName', 'E_{fanning} (100–180 Hz)');
hold on;
plot(time_frames, E_waggle, 'Color', [0.1, 0.4, 0.8], 'LineWidth', 1.5, 'DisplayName', 'E_{waggle} (200–280 Hz)');
plot(time_frames, E_preswarm, 'Color', [0.85, 0.2, 0.1], 'LineWidth', 2.0, 'DisplayName', 'E_{preswarm} (300–400 Hz)');
plot(time_frames, E_distress, 'Color', [0.6, 0.1, 0.7], 'LineWidth', 1.2, 'LineStyle', '--', 'DisplayName', 'E_{distress} (450–750 Hz)');
grid on;
title('BEEVIL On-Node Sub-Band Energy Extraction [SIMULATED SIGNAL]', 'FontSize', 12, 'FontWeight', 'bold');
xlabel('Time [seconds]', 'FontSize', 11);
ylabel('Integrated Band Energy [V^2/Hz]', 'FontSize', 11);
legend('Location', 'northwest');
saveas(fig4, '../results/acoustic_features.png');

fprintf('Acoustic DSP pipeline simulation completed. 4 figures exported to simulation/results/.\n');
