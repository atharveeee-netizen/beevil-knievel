%% BEEVIL KNIEVEL — Embedded Node Power, Duty Cycle & Battery SOC Model
% Script: node_energy_budget_model.m
% Models the periodic 5-minute (300-second) operational duty cycle:
% State 1: Deep Sleep (289.4s @ 2.0 uA, 3.3V)
% State 2: Sensor Wake & Thermal I2C Read (0.15s @ 2.5 mA)
% State 3: Acoustic Acquisition 10s @ 2kHz (10.0s @ 3.2 mA)
% State 4: CMSIS-DSP 256-pt FFT & Feature Extraction (0.05s @ 8.5 mA)
% State 5: LoRa Radio Tx (0.35s @ 38.0 mA, +14 dBm)
% Generates: energy_budget.png, battery_soc_simulation.png, duty_cycle_simulation.png

clear; clc; close all;

%% 1. Duty Cycle Power Parameters (3.3V System Rail)
V_sys = 3.3; % Volts

states = {
    'Deep Sleep',        289.45,   2.0e-6;   % 2.0 uA
    'Sensor Wake/I2C',     0.15,   2.5e-3;   % 2.5 mA
    'Acoustic I2S DMA',   10.00,   3.2e-3;   % 3.2 mA (INMP441 + DMA)
    'CMSIS-DSP FFT',       0.05,   8.5e-3;   % 8.5 mA (64 MHz M4F active)
    'LoRa Radio Tx',       0.35,  38.0e-3    % 38.0 mA (SX1262 +14 dBm)
};

N_states = size(states, 1);
durations = cell2mat(states(:, 2));
currents  = cell2mat(states(:, 3));
powers_mw = currents * V_sys * 1000;
energy_mj = powers_mw .* durations;

t_cycle = sum(durations); % 300 seconds (5.0 minutes)
E_cycle_mj = sum(energy_mj);
E_cycle_mwh = E_cycle_mj / 3600;

% Daily consumption (288 cycles/day)
cycles_per_day = 86400 / t_cycle;
E_daily_mwh = E_cycle_mwh * cycles_per_day;
I_avg_ua = (sum(currents .* durations) / t_cycle) * 1e6;

fprintf('BEEVIL Power Metrics:\n');
fprintf('  Average Current: %.2f uA\n', I_avg_ua);
fprintf('  Energy per 5-min Cycle: %.4f mWh (%.2f mJ)\n', E_cycle_mwh, E_cycle_mj);
fprintf('  Daily Energy Consumption: %.2f mWh/day\n', E_daily_mwh);

%% 2. Plot 1: Energy Budget Breakdown (Pie & State Bar)
fig1 = figure('Position', [100, 100, 950, 480], 'Color', 'w');

subplot(1, 2, 1);
p = pie(energy_mj);
title('Energy Consumption per 5-min Cycle [CALCULATED]', 'FontSize', 11, 'FontWeight', 'bold');
legend(states(:, 1), 'Location', 'southoutside');

subplot(1, 2, 2);
bar_vals = powers_mw;
b = bar(bar_vals, 'FaceColor', [0.85, 0.55, 0.15]);
set(gca, 'XTickLabel', states(:, 1), 'XTickLabelRotation', 30);
grid on;
title('State Active Power Dissipation [mW]', 'FontSize', 11, 'FontWeight', 'bold');
ylabel('Power [mW]', 'FontSize', 10);

annotation('textbox', [0.15, 0.85, 0.35, 0.08], 'String', ...
    {sprintf('Avg Current: %.2f uA | Daily: %.2f mWh', I_avg_ua, E_daily_mwh), ...
     'Battery: 1200 mAh LiFePO4 (3840 mWh)', 'Data Source: CALCULATED FROM DATASHEETS'}, ...
    'FitBoxToText', 'on', 'BackgroundColor', [0.95, 0.95, 0.95]);

saveas(fig1, '../../docs/media/results/energy_budget.png');
saveas(fig1, '../results/energy_budget.png');

%% 3. Plot 2: Periodic Duty Cycle Timeline Simulation
fig2 = figure('Position', [100, 100, 950, 420], 'Color', 'w');
t_sim = 0:0.01:t_cycle;
i_profile = zeros(size(t_sim));

% Construct timeline waveform
for k = 1:length(t_sim)
    tt = mod(t_sim(k), t_cycle);
    if tt < 289.45
        i_profile(k) = 0.002; % 2 uA
    elseif tt < 289.60
        i_profile(k) = 2.5;   % Wake
    elseif tt < 299.60
        i_profile(k) = 3.2;   % Audio
    elseif tt < 299.65
        i_profile(k) = 8.5;   % FFT
    else
        i_profile(k) = 38.0;  % LoRa Tx
    end
end

plot(t_sim, i_profile, 'Color', [0.8, 0.2, 0.1], 'LineWidth', 1.5);
grid on;
title('BEEVIL 5-Minute Node Operational Duty-Cycle Current Profile [SIMULATED]', 'FontSize', 11, 'FontWeight', 'bold');
xlabel('Cycle Time [seconds]', 'FontSize', 10);
ylabel('Current [mA]', 'FontSize', 10);
xlim([285, 301]); % Zoom in on active transition window
ylim([0, 45]);
text(287, 3, 'Deep Sleep (2.0 \muA)', 'FontSize', 9, 'Color', [0.2, 0.5, 0.2]);
text(291, 5, 'INMP441 Sampling (3.2 mA)', 'FontSize', 9, 'Color', [0.1, 0.4, 0.8]);
text(299.7, 40, 'SX1262 LoRa Tx (38 mA)', 'FontSize', 9, 'Color', [0.8, 0.2, 0.1], 'FontWeight', 'bold');

saveas(fig2, '../../docs/media/results/duty_cycle_simulation.png');
saveas(fig2, '../results/duty_cycle_simulation.png');

%% 4. Plot 3: 18-Month Battery SOC Simulation with Solar MPPT
fig3 = figure('Position', [100, 100, 950, 450], 'Color', 'w');

days = 1:540; % 18 Months (540 days)
batt_cap_mwh = 1200 * 3.2; % 3840 mWh nominal LiFePO4

% Modeled solar energy harvest per day (0.5W panel, seasonal irradiance 2.5 to 5.0 peak sun hours)
sun_hours = 3.5 + 1.2 * sin(2 * pi * (days - 80) / 365);
p_panel_w = 0.5;
eff_mppt = 0.85;
solar_harvest_mwh = p_panel_w * sun_hours * eff_mppt * 1000; % ~1000 - 2000 mWh/day

% No-solar drain curve (pure battery autonomy)
soc_no_solar = max(0, 100 * (1 - (days * E_daily_mwh) / batt_cap_mwh));

% With solar harvesting (maintains 92-100% SOC)
soc_with_solar = zeros(size(days));
current_energy = batt_cap_mwh;
for d = 1:length(days)
    current_energy = current_energy - E_daily_mwh + solar_harvest_mwh(d);
    current_energy = min(batt_cap_mwh, max(0, current_energy));
    soc_with_solar(d) = 100 * (current_energy / batt_cap_mwh);
end

plot(days / 30, soc_with_solar, 'Color', [0.1, 0.6, 0.2], 'LineWidth', 2.0, 'DisplayName', 'With 0.5W Solar MPPT Harvesting');
hold on;
plot(days / 30, soc_no_solar, 'Color', [0.8, 0.2, 0.1], 'LineWidth', 1.5, 'LineStyle', '--', 'DisplayName', 'Pure Battery Autonomy (Zero Sunlight Worst-Case)');
grid on;
title('BEEVIL 18-Month Battery State-of-Charge (SOC) Projection [MODEL-BASED SIMULATION]', 'FontSize', 11, 'FontWeight', 'bold');
xlabel('Deployment Time [Months]', 'FontSize', 10);
ylabel('Battery SOC [%]', 'FontSize', 10);
xlim([0, 18]);
ylim([0, 105]);
legend('Location', 'southwest');

% Annotate Autonomy Limit
zero_idx = find(soc_no_solar <= 0, 1);
if ~isempty(zero_idx)
    t_dead_mo = zero_idx / 30;
    xline(t_dead_mo, ':r', sprintf('Zero-Solar Battery Depletion: %.1f Months', t_dead_mo), 'LineWidth', 1.2);
end

saveas(fig3, '../../docs/media/results/battery_soc_simulation.png');
saveas(fig3, '../results/battery_soc_simulation.png');
fprintf('Energy budget, duty cycle, and battery SOC plots generated successfully.\n');
