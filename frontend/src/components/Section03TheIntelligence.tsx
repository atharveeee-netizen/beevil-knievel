"use client";

import React from "react";
import { Cpu, Layers, HardDrive, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export function Section03TheIntelligence() {
  return (
    <section id="the-intelligence" className="py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#222632]">
      <div className="space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-[11px] font-mono tracking-widest text-[#8a90a0] uppercase">
            03 - THE INTELLIGENCE
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4f4f6] font-sans uppercase">
            Intelligence at the edge.
          </h2>

          <p className="text-sm sm:text-base text-[#8a90a0] font-mono leading-relaxed">
            Data is interpreted directly where the hive sits, rather than requiring continuous cloud connectivity. The system runs lightweight quantized neural models locally in remote out-yards.
          </p>
        </div>

        {/* 4-Stage Horizontal Pipeline (SENSE -> INTERPRET -> DETECT -> ACT) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: "01",
              title: "SENSE",
              target: "SENSING LAYER",
              desc: "Digital sensors sample brood temperature, acoustics, CO2, and weight continuously inside the hive.",
              hardware: "TMP117 • INMP441 • SCD41",
            },
            {
              step: "02",
              title: "INTERPRET",
              target: "ON-NODE TINYML",
              desc: "Nordic nRF52840 extracts 128-point FFT spectrum and runs 1D-CNN classification in 1.12 milliseconds.",
              hardware: "Arm Cortex-M4F @ 64MHz",
            },
            {
              step: "03",
              title: "DETECT",
              target: "GATEWAY FUSION",
              desc: "Raspberry Pi CM4 runs statistical CUSUM thermal drift detection and multi-sensor neural fusion.",
              hardware: "Debian 64-bit • TorchScript INT8",
            },
            {
              step: "04",
              title: "ACT",
              target: "FIELD DECISION",
              desc: "The beekeeper receives a clear, calm notification specifying the exact anomaly and recommended action.",
              hardware: "LoRaWAN IN865 • Field App HUD",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="bg-[#12151e] border border-[#222632] p-6 rounded-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="text-2xl font-mono font-bold text-[#f0b840]">{s.step}</div>
                <div className="text-[10px] font-mono text-[#8a90a0] uppercase font-bold tracking-wider">{s.target}</div>
                <h3 className="text-lg font-bold text-[#f4f4f6] font-sans">{s.title}</h3>
                <p className="text-xs text-[#8a90a0] font-mono leading-relaxed">{s.desc}</p>
              </div>

              <div className="pt-3 border-t border-[#1e2330] text-[10px] font-mono text-[#8a90a0]">
                {s.hardware}
              </div>
            </div>
          ))}
        </div>

        {/* Dual-Tier Architecture Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#12151e] border border-[#222632] p-6 sm:p-8 rounded-sm">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f0b840]" />
              <span className="text-xs font-mono font-bold text-[#f4f4f6] uppercase">TIER 1: FIELD NODE (TINYML)</span>
            </div>
            <p className="text-xs font-mono text-[#8a90a0] leading-relaxed">
              Executes lightweight 1D-CNN inference directly on the Nordic nRF52840 microcontroller. Classifies raw 24-bit audio frames into nominal, queen transition, and swarm roar states in 1.12 ms with 2.0µA sleep current.
            </p>
            <div className="text-[10px] font-mono text-[#8a90a0]">
              Latency: <strong className="text-[#f4f4f6]">1.12 ms</strong> • Memory: <strong className="text-[#f4f4f6]">48 KB SRAM</strong> • Power: <strong className="text-[#2ea043]">2.0µA Sleep</strong>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8a90a0]" />
              <span className="text-xs font-mono font-bold text-[#f4f4f6] uppercase">TIER 2: CM4 GATEWAY (NEURAL FUSION)</span>
            </div>
            <p className="text-xs font-mono text-[#8a90a0] leading-relaxed">
              Consolidates multi-hive telemetry across the LoRa mesh. Runs quantized INT8 CNN-LSTM models and CUSUM drift algorithms over a local SQLite database, generating apiary-wide risk matrices without cloud round-trips.
            </p>
            <div className="text-[10px] font-mono text-[#8a90a0]">
              Latency: <strong className="text-[#f4f4f6]">8.20 ms</strong> • Model: <strong className="text-[#f4f4f6]">INT8 TorchScript</strong> • OS: <strong className="text-[#f4f4f6]">Debian 64-bit OverlayFS</strong>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
