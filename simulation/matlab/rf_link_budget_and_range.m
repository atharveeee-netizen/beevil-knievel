%% BEEVIL KNIEVEL — RF Link Budget & Range Sweep Analysis
% Script: rf_link_budget_and_range.m
% Calculates Semtech SX1262 LoRa IN865 (865 MHz) link parameters:
% - Tx Power P_t = +14.0 dBm
% - Rx Sensitivity P_rx = -132.0 dBm (@ SF10, 125 kHz BW)
% - G_t = +2.15 dBi (Omni Stub), G_r = +3.0 dBi (Gateway Mast Collinear)
% - Free Space Path Loss (FSPL) and ITU-R P.833-9 Foliage Canopy Model (0.18 dB/m)
% Outputs: docs/media/results/rf_link_budget.png, docs/media/results/rf_range_sweep.png

clear; clc; close all;

%% 1. Parameter Definitions
f_mhz = 865.0;          % Operating frequency [MHz]
c = 299792458.0;        % Speed of light [m/s]
lambda = c / (f_mhz * 1e6); % Wavelength ~ 0.3468 m

P_t = 14.0;             % Transmit power [dBm]
G_t = 2.15;             % Node antenna gain [dBi]
G_r = 3.00;             % Gateway antenna gain [dBi]
L_tx_cable = 0.50;      % Node cable/connector loss [dB]
L_rx_cable = 1.00;      % Gateway feedline loss [dB]
L_hive_dielectric = 8.72; % Stratified pine wood + comb loss [dB]

% Sensitivity thresholds
P_sens_sf7  = -124.0;   % dBm (Fastest rate)
P_sens_sf10 = -132.0;   % dBm (Nominal apiary link)
P_sens_sf12 = -137.0;   % dBm (Maximum range)

Fade_Margin = 15.0;     % Reserved fade margin [dB]

%% 2. Plot 1: RF Link Budget Waterfall (Nominal 1.5 km Canopy Link)
d_nom_m = 1500.0; % 1.5 km
fspl_nom = 20 * log10(d_nom_m) + 20 * log10(f_mhz) - 27.55; % ~94.7 dB
foliage_nom = 18.0; % 100m equivalent dense canopy attenuation [dB]

fig1 = figure('Position', [100, 100, 950, 500], 'Color', 'w');

stages = {
    'Tx Power (SX1262)',        P_t;
    'Tx Antenna Gain',          G_t;
    'Tx Coax Loss',            -L_tx_cable;
    'Hive Wall/Comb Loss',     -L_hive_dielectric;
    'Free Space Path Loss',    -fspl_nom;
    'Canopy Foliage Loss',     -foliage_nom;
    'Rx Antenna Gain',          G_r;
    'Rx Coax Loss',            -L_rx_cable
};

stage_names = stages(:, 1);
stage_deltas = cell2mat(stages(:, 2));
cumulative_pwr = zeros(length(stage_deltas) + 1, 1);
cumulative_pwr(1) = 0;
for i = 1:length(stage_deltas)
    cumulative_pwr(i+1) = cumulative_pwr(i) + stage_deltas(i);
end

P_rx_final = cumulative_pwr(end);
link_margin_nom = P_rx_final - P_sens_sf10;

plot(1:length(cumulative_pwr), cumulative_pwr, '-o', 'Color', [0.2, 0.4, 0.7], 'LineWidth', 2.0, ...
    'MarkerSize', 6, 'MarkerFaceColor', [0.2, 0.4, 0.7]);
hold on;
yline(P_sens_sf10, '--r', sprintf('Rx Sensitivity SF10: %.1f dBm', P_sens_sf10), 'LineWidth', 1.5);
yline(P_sens_sf10 + Fade_Margin, ':k', sprintf('Required Reliable Floor (+15 dB): %.1f dBm', P_sens_sf10 + Fade_Margin), 'LineWidth', 1.2);
grid on;
set(gca, 'XTick', 1:length(cumulative_pwr), 'XTickLabel', [{'Base'}; stage_names], 'XTickLabelRotation', 30);
ylabel('Power Level [dBm]', 'FontSize', 10);
title(sprintf('BEEVIL RF Link Budget Waterfall (1.5 km Dense Canopy) [CALCULATED: Margin = +%.1f dB]', link_margin_nom), ...
    'FontSize', 11, 'FontWeight', 'bold');
ylim([-145, 25]);

saveas(fig1, '../../docs/media/results/rf_link_budget.png');
saveas(fig1, '../results/rf_link_budget.png');

%% 3. Plot 2: Range Sweep (Line-of-Sight vs. Forest Canopy)
d_km = logspace(-1, 1.4, 300); % 0.1 km to 25 km
d_m = d_km * 1000.0;

% 1. Pure Line-of-Sight (LOS) Model
fspl = 20 * log10(d_m) + 20 * log10(f_mhz) - 27.55;
p_rx_los = P_t + G_t - L_tx_cable - L_hive_dielectric - fspl + G_r - L_rx_cable;
margin_los = p_rx_los - P_sens_sf12;

% 2. Dense Forest Canopy Model (ITU-R P.833-9: 0.18 dB/m up to 35 dB max clutter saturation)
foliage_loss = min(35.0, 0.18 * min(d_m, 200.0) + 0.05 * max(0, d_m - 200.0));
p_rx_canopy = p_rx_los - foliage_loss;
margin_canopy = p_rx_canopy - P_sens_sf10;

fig2 = figure('Position', [100, 100, 950, 520], 'Color', 'w');

subplot(2, 1, 1);
semilogx(d_km, p_rx_los, 'Color', [0.1, 0.6, 0.2], 'LineWidth', 2.0, 'DisplayName', 'Line-of-Sight (LOS, Hops across clear terrain)');
hold on;
semilogx(d_km, p_rx_canopy, 'Color', [0.8, 0.3, 0.1], 'LineWidth', 2.0, 'DisplayName', 'Dense Pine Canopy Clutter (ITU-R P.833-9)');
yline(P_sens_sf12, '--r', 'SX1262 SF12 Floor (-137 dBm)', 'LineWidth', 1.2);
yline(P_sens_sf10, '--k', 'SX1262 SF10 Floor (-132 dBm)', 'LineWidth', 1.2);
grid on;
title('Received Signal Power vs. Distance [CALCULATED LINK BUDGET]', 'FontSize', 11, 'FontWeight', 'bold');
ylabel('P_{rx} [dBm]', 'FontSize', 10);
xlim([0.1, 25]);
ylim([-150, -40]);
legend('Location', 'northeast');

subplot(2, 1, 2);
semilogx(d_km, margin_los, 'Color', [0.1, 0.6, 0.2], 'LineWidth', 2.0, 'DisplayName', 'LOS Link Margin (SF12)');
hold on;
semilogx(d_km, margin_canopy, 'Color', [0.8, 0.3, 0.1], 'LineWidth', 2.0, 'DisplayName', 'Canopy Clutter Margin (SF10)');
yline(0, '-k', 'Zero Margin Crossing (Link Drop)', 'LineWidth', 1.5);
yline(Fade_Margin, ':r', '15 dB Fade Margin (Reliable Link Limit)', 'LineWidth', 1.2);
grid on;
title('RF Link Margin vs. Distance & Zero-Margin Crossing', 'FontSize', 11, 'FontWeight', 'bold');
xlabel('Propagation Distance [km]', 'FontSize', 10);
ylabel('Link Margin [dB]', 'FontSize', 10);
xlim([0.1, 25]);
ylim([-20, 50]);
legend('Location', 'northeast');

% Annotate Key Crossings
text(15.2, 2, '\leftarrow 15.0 km LOS Limit', 'FontSize', 9, 'FontWeight', 'bold', 'Color', [0.1, 0.5, 0.2]);
text(1.5, 2, '\leftarrow 1.5 km Canopy Limit', 'FontSize', 9, 'FontWeight', 'bold', 'Color', [0.8, 0.3, 0.1]);

saveas(fig2, '../../docs/media/results/rf_range_sweep.png');
saveas(fig2, '../results/rf_range_sweep.png');
fprintf('RF link budget and range sweep plots generated successfully.\n');
