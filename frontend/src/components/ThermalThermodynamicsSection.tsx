"use client";

import React from "react";
import { Thermometer, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ThermalGradientPlot, FrameTemperature } from "@/components/ui/ThermalGradientPlot";
import { EngineeringChart, DataPoint } from "@/components/ui/EngineeringChart";

export function ThermalThermodynamicsSection() {
  // 5-Frame Thermal Profile Data
  const FRAME_DATA: FrameTemperature[] = [
    { frame: 1, label: "Outer Left", role: "Honey/Wall", tempC: 24.8, isCore: false },
    { frame: 2, label: "Brood Left", role: "Pollen/Brood", tempC: 31.2, isCore: false },
    { frame: 3, label: "Core Nest", role: "Queen Cluster", tempC: 34.82, isCore: true },
    { frame: 4, label: "Brood Right", role: "Larvae", tempC: 33.9, isCore: false },
    { frame: 5, label: "Outer Right", role: "Honey/Wall", tempC: 25.4, isCore: false },
  ];

  // Diurnal Simulation Data: Brood Core Stability vs Diurnal Ambient Swing
  const DIURNAL_DATA: DataPoint[] = [
    { time: "00:00", value: 34.6, secondaryValue: 16.2 },
    { time: "03:00", value: 34.5, secondaryValue: 14.8 },
    { time: "06:00", value: 34.4, secondaryValue: 15.5 },
    { time: "09:00", value: 34.6, secondaryValue: 22.1 },
    { time: "12:00", value: 34.8, secondaryValue: 29.4 },
    { time: "15:00", value: 34.7, secondaryValue: 33.2 },
    { time: "18:00", value: 34.6, secondaryValue: 26.5 },
    { time: "21:00", value: 34.5, secondaryValue: 19.8 },
  ];

  return (
    <section id="thermodynamics" className="py-16 md:py-24 border-b border-[#283144] bg-[#090b10] text-[#f1f5f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#f59e0b] mb-1">
              04 — Bio-Physics &amp; Thermodynamic Modeling
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono uppercase tracking-tight text-[#f1f5f9]">
              Brood Nest Thermoregulation &amp; CUSUM Drift Filter
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge claim="SIMULATED">2-Node Differential Model</Badge>
          </div>
        </div>

        {/* Narrative & Math Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left: 2-Node Differential Model */}
          <div className="lg:col-span-6 space-y-6 font-mono text-xs">
            <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144] space-y-4">
              <div className="text-sm font-bold text-[#f59e0b] uppercase flex items-center gap-2">
                <Thermometer className="w-4 h-4" />
                <span>2-Node Lumped-Parameter Thermodynamic Model</span>
              </div>
              
              <p className="text-xs text-[#94a3b8] font-sans leading-relaxed">
                Honeybees regulate their central brood nest at a strict biological setpoint of <strong className="text-[#f1f5f9]">34.5°C ± 0.8°C</strong> despite ambient fluctuations spanning -10°C to +40°C. BEEVIL models this dynamic heat balance through coupled thermal differential equations:
              </p>

              {/* Differential Equations Block */}
              <div className="p-3 bg-[#090b10] border border-[#283144] rounded text-[11px] space-y-2 text-[#f1f5f9]">
                <div className="text-[#38bdf8]">
                  C_brood · (dT_brood/dt) = Q_metabolic - (T_brood - T_hive) / R_bh
                </div>
                <div className="text-[#a78bfa]">
                  C_hive · (dT_hive/dt) = (T_brood - T_hive) / R_bh - (T_hive - T_ambient) / R_ha
                </div>
              </div>

              <div className="space-y-1 text-[11px] text-[#94a3b8]">
                <div>• <strong className="text-[#f1f5f9]">Q_metabolic:</strong> Active thoracic heater bee metabolic output (5 to 40 Watts)</div>
                <div>• <strong className="text-[#f1f5f9]">R_bh:</strong> Thermal resistance of outer insulating bee mantle &amp; comb barrier</div>
                <div>• <strong className="text-[#f1f5f9]">R_ha:</strong> Convective and conductive boundary resistance of Langstroth pine box</div>
              </div>
            </div>

            {/* CUSUM Drift Filter Specification */}
            <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144] space-y-3">
              <div className="text-sm font-bold text-[#ef4444] uppercase flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                <span>Page&apos;s (1954) Cumulative Sum (CUSUM) Change-Point Filter</span>
              </div>
              
              <p className="text-xs text-[#94a3b8] font-sans leading-relaxed">
                To isolate subtle pathological cooling (e.g. Varroa collapse or queen mortality) from normal diurnal oscillations, an on-node CUSUM negative drift filter accumulates persistent deviations:
              </p>

              <div className="p-3 bg-[#090b10] border border-[#283144] rounded text-[11px] text-[#f87171]">
                S_t⁻ = max(0, S_{'{'}t-1{'}'}⁻ - (y_t - μ_0) - k)
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px] text-[#94a3b8] pt-1">
                <div>Set Target: <strong className="text-[#f1f5f9]">μ0 = 34.5°C</strong></div>
                <div>Allowance: <strong className="text-[#f1f5f9]">k = 0.15°C</strong></div>
                <div>Threshold: <strong className="text-[#f1f5f9]">h = 1.20°C·hr</strong></div>
              </div>
            </div>
          </div>

          {/* Right: Live Interactive Visualizations */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* 5-Point Frame Gradient Plot */}
            <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144]">
              <div className="text-xs font-mono font-bold uppercase text-[#f1f5f9] mb-3 flex items-center justify-between">
                <span>5-Point Cross-Frame Thermal Gradient</span>
                <Badge claim="REAL_SENSOR" size="sm">Frame 1 to 5</Badge>
              </div>
              <ThermalGradientPlot
                frames={FRAME_DATA}
                ambientTempC={18.5}
                optimalSetpointC={34.5}
              />
              <div className="mt-3 text-[11px] text-[#64748b] font-mono">
                TI TMP117 measures central Frame 3; DS18B20 probes map Frame 1, 2, 4, and 5 boundary heat loss.
              </div>
            </div>

            {/* Diurnal Response Chart */}
            <div className="p-5 rounded-sm bg-[#11141d] border border-[#283144]">
              <EngineeringChart
                data={DIURNAL_DATA}
                title="Diurnal Response: Brood T(core) vs Ambient Temp"
                unit="°C"
                secondaryUnit="°C Amb"
                targetRange={{ min: 33.7, max: 35.3, label: "Biological Setpoint" }}
                strokeColor="#10b981"
                secondaryStrokeColor="#64748b"
                height={150}
              />
              <div className="mt-3 text-[11px] text-[#64748b] font-mono flex items-center justify-between">
                <span>Brood nest remains stable (±0.25°C) across a 15°C to 33°C ambient swing</span>
                <Badge claim="SIMULATED" size="sm">MATLAB Model</Badge>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
