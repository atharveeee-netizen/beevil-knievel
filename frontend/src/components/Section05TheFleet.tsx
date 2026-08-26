"use client";

import React, { useState } from "react";
import { Grid, Thermometer, Volume2, Flame, ShieldAlert, CheckCircle2, Info } from "lucide-react";

export function Section05TheFleet() {
  const [activeHiveId, setActiveHiveId] = useState<number>(42);

  // Generate 100 quiet nodes for spatial representation
  const nodes = Array.from({ length: 100 }, (_, i) => {
    const id = i + 1;
    if (id === 42) {
      return { id, status: "ACTION", label: "Hive 042", temp: "37.2°C", hz: "485 Hz", desc: "Pre-swarm acoustic surge (72h split window)", action: "Prepare vertical swarm split." };
    }
    if (id === 15) {
      return { id, status: "WATCH", label: "Hive 015", temp: "33.1°C", hz: "285 Hz", desc: "Queenless roar & brood nest chill", action: "Inspect center frames for queen presence." };
    }
    if (id === 73) {
      return { id, status: "WATCH", label: "Hive 073", temp: "34.6°C", hz: "310 Hz", desc: "Varroa grooming friction spike", action: "Verify sticky board mite drop count." };
    }
    if (id === 88) {
      return { id, status: "WATCH", label: "Hive 088", temp: "34.9°C", hz: "230 Hz", desc: "Stand tilt displacement (14.2°)", action: "Check hive stand level." };
    }
    return { id, status: "NOMINAL", label: `Hive ${id < 10 ? `00${id}` : id < 100 ? `0${id}` : id}`, temp: "34.8°C", hz: "220 Hz", desc: "Optimal brood homeostasis", action: "No intervention needed." };
  });

  const activeNode = nodes.find((n) => n.id === activeHiveId) || nodes[41];

  return (
    <section id="the-fleet" className="py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#222632]">
      <div className="space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="text-[11px] font-mono tracking-widest text-[#8a90a0] uppercase">
              05 - THE FLEET
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4f4f6] font-sans uppercase">
              Many hives. One intelligence layer.
            </h2>

            <p className="text-sm sm:text-base text-[#8a90a0] font-mono leading-relaxed">
              Managing 100 hives in the field no longer means opening 100 boxes. The fleet command interface isolates only the colonies requiring physical attention.
            </p>
          </div>

          {/* Quiet Metric Summary */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="px-3.5 py-2 bg-[#12151e] border border-[#222632] rounded-sm">
              <span className="text-[#8a90a0] block text-[9px] uppercase">APIARY FLEET</span>
              <span className="text-[#f4f4f6] font-bold text-sm">100 Hives</span>
            </div>
            <div className="px-3.5 py-2 bg-[#12151e] border border-[#2ea043]/30 rounded-sm">
              <span className="text-[#2ea043] block text-[9px] uppercase">NOMINAL</span>
              <span className="text-[#2ea043] font-bold text-sm">96</span>
            </div>
            <div className="px-3.5 py-2 bg-[#12151e] border border-[#f0b840]/30 rounded-sm">
              <span className="text-[#f0b840] block text-[9px] uppercase">WATCH</span>
              <span className="text-[#f0b840] font-bold text-sm">3</span>
            </div>
            <div className="px-3.5 py-2 bg-[#12151e] border border-[#da3633]/30 rounded-sm">
              <span className="text-[#da3633] block text-[9px] uppercase">ACTION</span>
              <span className="text-[#da3633] font-bold text-sm">1</span>
            </div>
          </div>
        </div>

        {/* Spatial Field Matrix Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: 100 Micro-Nodes Array */}
          <div className="lg:col-span-7 bg-[#12151e] border border-[#222632] p-6 rounded-sm space-y-4">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#8a90a0] border-b border-[#222632] pb-2">
              <span>SPATIAL YARD MAP (YARDS ALPHA &amp; BETA)</span>
              <span>CLICK TO SELECT</span>
            </div>

            <div className="grid grid-cols-10 gap-1.5 sm:gap-2">
              {nodes.map((node) => {
                const isSelected = activeHiveId === node.id;
                let dotColor = "bg-[#2ea043]";
                if (node.status === "ACTION") dotColor = "bg-[#da3633] animate-pulse";
                if (node.status === "WATCH") dotColor = "bg-[#f0b840]";

                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveHiveId(node.id)}
                    className={`h-9 rounded-sm border flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#0a0d14] border-[#f0b840] text-[#f4f4f6] shadow-md ring-1 ring-[#f0b840]/30"
                        : "bg-[#0a0d14] border-[#222632] hover:border-[#8a90a0] text-[#8a90a0]"
                    }`}
                  >
                    <span className="text-[9px] font-mono font-bold leading-none mb-1">
                      {node.id}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-[#8a90a0] pt-2 border-t border-[#1e2330]">
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#2ea043]" /> Nominal</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#f0b840]" /> Watch</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#da3633]" /> Field Action</span>
            </div>
          </div>

          {/* Right: Selected Node Detail */}
          <div className="lg:col-span-5 bg-[#12151e] border border-[#2e3444] p-6 rounded-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#222632] pb-3">
              <div>
                <span className="text-[9px] font-mono text-[#8a90a0] block uppercase">SELECTED COLONY</span>
                <h3 className="text-xl font-bold text-[#f4f4f6] font-sans">{activeNode.label}</h3>
              </div>

              <span
                className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-sm border ${
                  activeNode.status === "ACTION"
                    ? "bg-[#da3633]/15 text-[#da3633] border-[#da3633]/40"
                    : activeNode.status === "WATCH"
                    ? "bg-[#f0b840]/15 text-[#f0b840] border-[#f0b840]/40"
                    : "bg-[#2ea043]/15 text-[#2ea043] border-[#2ea043]/40"
                }`}
              >
                {activeNode.status}
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-[#0a0d14] border border-[#222632] p-3 rounded-sm space-y-1">
                <span className="text-[#8a90a0] text-[10px] block uppercase">BROOD TEMP</span>
                <span className="text-base font-bold text-[#f4f4f6]">{activeNode.temp}</span>
              </div>
              <div className="bg-[#0a0d14] border border-[#222632] p-3 rounded-sm space-y-1">
                <span className="text-[#8a90a0] text-[10px] block uppercase">ACOUSTIC PEAK</span>
                <span className="text-base font-bold text-[#f0b840]">{activeNode.hz}</span>
              </div>
            </div>

            {/* Diagnosis */}
            <div className="bg-[#0a0d14] border border-[#222632] p-4 rounded-sm space-y-1">
              <span className="text-[9px] font-mono text-[#8a90a0] uppercase block">DIAGNOSIS</span>
              <p className="text-xs font-mono text-[#f4f4f6]">{activeNode.desc}</p>
            </div>

            {/* Recommended Action */}
            <div className="bg-[#161922] border border-[#2e3444] p-4 rounded-sm space-y-1">
              <span className="text-[9px] font-mono text-[#f0b840] uppercase font-bold block">RECOMMENDED BEEKEEPER ACTION</span>
              <p className="text-xs font-mono text-[#f4f4f6]">{activeNode.action}</p>
            </div>

            <div className="text-[10px] font-mono text-[#8a90a0] text-center">
              DEMO SIMULATION • GROUNDED IN VERIFIED HARDWARE TELEMETRY
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
