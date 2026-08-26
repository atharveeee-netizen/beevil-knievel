"use client";

import React, { useState } from "react";
import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";

interface HiveData {
  id: number;
  yard: "Yard Alpha" | "Yard Beta";
  status: "nominal" | "watch" | "action";
  temp: number;
  freq: number;
  co2: number;
  weight: number;
  anomaly?: string;
  actionProtocol?: string;
}

const GENERATED_HIVES: HiveData[] = Array.from({ length: 100 }, (_, i) => {
  const id = i + 1;
  const yard = id <= 50 ? "Yard Alpha" : "Yard Beta";

  if (id === 42) {
    return {
      id,
      yard,
      status: "action",
      temp: 37.2,
      freq: 485,
      co2: 2480,
      weight: 42.1,
      anomaly: "Acoustic frequency at 485 Hz (virgin queen piping). Brood temp at 37.2°C.",
      actionProtocol: "Perform Demaree split or remove swarm cells within 24h.",
    };
  }
  if (id === 15) {
    return {
      id,
      yard,
      status: "watch",
      temp: 33.1,
      freq: 285,
      co2: 910,
      weight: 38.4,
      anomaly: "Acoustic frequency at 285 Hz (queenless roar). Brood temp dropped to 33.1°C.",
      actionProtocol: "Inspect frames 3-5 for fresh eggs. Introduce caged mated queen.",
    };
  }
  if (id === 73) {
    return {
      id,
      yard,
      status: "watch",
      temp: 34.6,
      freq: 340,
      co2: 1240,
      weight: 40.2,
      anomaly: "Acoustic grooming vibration at 340 Hz. Mite load estimate at 5.4%.",
      actionProtocol: "Apply Formic Pro flash vapor pads. Schedule sticky board count in 48h.",
    };
  }
  if (id === 88) {
    return {
      id,
      yard,
      status: "watch",
      temp: 34.7,
      freq: 228,
      co2: 1100,
      weight: 39.1,
      anomaly: "Stand tilt at 14.2°. Accelerometer shock vibration logged.",
      actionProtocol: "Relevel foundation blocks. Tighten ratchet tie-down strap.",
    };
  }

  return {
    id,
    yard,
    status: "nominal",
    temp: 34.8 + (Math.sin(id) * 0.15),
    freq: 220 + (id % 15),
    co2: 1100 + (id * 5),
    weight: 40.0 + (id % 4),
    anomaly: "Optimal brood homeostasis (34.8°C).",
    actionProtocol: "No box entry required. Colony healthy.",
  };
});

export function Section05TheFleet() {
  const [selectedHive, setSelectedHive] = useState<HiveData>(GENERATED_HIVES[41]);

  return (
    <section id="the-fleet" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#222738]">
      <div className="space-y-12">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-[11px] font-mono tracking-widest text-[#8a90a0] uppercase">
            05 - 100-HIVE FLEET
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4f4f6] font-sans uppercase">
            100-Hive fleet triage.
          </h2>

          <p className="text-sm sm:text-base text-[#8a90a0] font-mono leading-relaxed">
            Manage 100 hives without opening every box. The fleet screen isolates the 4 hives that need work.
          </p>

          {/* Status Counts */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-sm bg-[#12151e] border border-[#222738] text-white">
              TOTAL: 100 Hives
            </span>
            <span className="px-2.5 py-1 rounded-sm bg-[#12151e] border border-[#2ea043]/40 text-[#2ea043]">
              NOMINAL: 96
            </span>
            <span className="px-2.5 py-1 rounded-sm bg-[#12151e] border border-[#f0b840]/40 text-[#f0b840]">
              WATCH: 3
            </span>
            <span className="px-2.5 py-1 rounded-sm bg-[#12151e] border border-[#da3633]/40 text-[#da3633]">
              ACTION: 1
            </span>
          </div>
        </div>

        {/* 100-Hive Spatial Grid + Reactive Lateral Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 100 Nodes Spatial Matrix (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-[#12151e] border border-[#222738] p-5 sm:p-6 rounded-sm space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#8a90a0] border-b border-[#222738] pb-3">
              <span className="uppercase font-bold">YARD MAP (YARDS ALPHA & BETA)</span>
              <span className="text-[10px]">CLICK ANY NODE TO INSPECT</span>
            </div>

            {/* 10x10 Matrix Grid */}
            <div className="grid grid-cols-10 gap-1.5 sm:gap-2">
              {GENERATED_HIVES.map((hive) => {
                const isSelected = selectedHive.id === hive.id;
                let bgClass = "bg-[#181c28] hover:bg-[#252c40] text-[#8a90a0]";
                let dotClass = "bg-[#2ea043]";

                if (hive.status === "action") {
                  bgClass = "bg-[#da3633]/20 border border-[#da3633] text-[#da3633] font-bold";
                  dotClass = "bg-[#da3633] animate-pulse";
                } else if (hive.status === "watch") {
                  bgClass = "bg-[#f0b840]/15 border border-[#f0b840] text-[#f0b840]";
                  dotClass = "bg-[#f0b840]";
                }

                if (isSelected) {
                  bgClass += " ring-2 ring-white";
                }

                return (
                  <button
                    key={hive.id}
                    onClick={() => setSelectedHive(hive)}
                    className={`h-7 sm:h-8 rounded-xs flex items-center justify-center text-[10px] font-mono transition-all relative ${bgClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0b840]`}
                    title={`Hive #${hive.id} (${hive.yard}) - ${hive.status.toUpperCase()}`}
                    aria-label={`Inspect Hive ${hive.id} in ${hive.yard}`}
                  >
                    <span>{hive.id}</span>
                    <span
                      className={`absolute top-0.5 right-0.5 w-1 h-1 rounded-full ${dotClass}`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2 text-[10px] font-mono text-[#8a90a0]">
              <span>Rows 1-5: Yard Alpha</span>
              <span>Rows 6-10: Yard Beta</span>
            </div>
          </div>

          {/* Lateral Diagnostic Inspector (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-[#12151e] border border-[#222738] p-6 rounded-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#222738] pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#8a90a0] block uppercase">{selectedHive.yard}</span>
                <h3 className="text-xl font-mono font-bold text-white">Hive #{selectedHive.id.toString().padStart(3, "0")}</h3>
              </div>

              <div>
                {selectedHive.status === "action" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-[#da3633]/20 border border-[#da3633] text-[#da3633] text-xs font-mono font-bold uppercase">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Action Required</span>
                  </span>
                )}
                {selectedHive.status === "watch" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-[#f0b840]/20 border border-[#f0b840] text-[#f0b840] text-xs font-mono font-bold uppercase">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Watch List</span>
                  </span>
                )}
                {selectedHive.status === "nominal" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-[#2ea043]/20 border border-[#2ea043] text-[#2ea043] text-xs font-mono font-bold uppercase">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Nominal</span>
                  </span>
                )}
              </div>
            </div>

            {/* Diagnostic Readings Strip */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-[#0a0d14] p-3 rounded-sm border border-[#222738]">
                <span className="text-[9px] text-[#8a90a0] block uppercase">BROOD TEMP</span>
                <span className="text-base font-bold text-white">{selectedHive.temp.toFixed(2)}°C</span>
              </div>
              <div className="bg-[#0a0d14] p-3 rounded-sm border border-[#222738]">
                <span className="text-[9px] text-[#8a90a0] block uppercase">ACOUSTIC PEAK</span>
                <span className="text-base font-bold text-[#f0b840]">{selectedHive.freq} Hz</span>
              </div>
              <div className="bg-[#0a0d14] p-3 rounded-sm border border-[#222738]">
                <span className="text-[9px] text-[#8a90a0] block uppercase">CO2 LEVEL</span>
                <span className="text-base font-bold text-white">{selectedHive.co2} ppm</span>
              </div>
              <div className="bg-[#0a0d14] p-3 rounded-sm border border-[#222738]">
                <span className="text-[9px] text-[#8a90a0] block uppercase">TOTAL WEIGHT</span>
                <span className="text-base font-bold text-white">{selectedHive.weight.toFixed(1)} kg</span>
              </div>
            </div>

            {/* Diagnosis & Action Protocol */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono space-y-1">
                <span className="text-[#8a90a0] uppercase block text-[10px]">DIAGNOSTIC EVIDENCE:</span>
                <p className="text-white leading-relaxed">{selectedHive.anomaly}</p>
              </div>

              <div className="text-xs font-mono space-y-1 p-3 bg-[#0a0d14] border border-[#222738] rounded-sm">
                <span className="text-[#f0b840] font-bold uppercase block text-[10px]">FIELD PROTOCOL:</span>
                <p className="text-zinc-300 leading-relaxed">{selectedHive.actionProtocol}</p>
              </div>
            </div>

          </div>

        </div>

        <div className="text-[10px] font-mono text-[#8a90a0] text-center">
          SIMULATED FLEET FEED • 100-HIVE FIELD DATA
        </div>

      </div>
    </section>
  );
}
