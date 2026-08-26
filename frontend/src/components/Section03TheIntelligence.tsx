"use client";

import React from "react";

export function Section03TheIntelligence() {
  return (
    <section id="the-intelligence" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#222738]">
      <div className="space-y-12">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-[11px] font-mono tracking-widest text-[#8a90a0] uppercase">
            03 - EDGE COMPUTE
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4f4f6] font-sans uppercase">
            Local edge computation in remote yards.
          </h2>

          <p className="text-sm sm:text-base text-[#8a90a0] font-mono leading-relaxed">
            Processing runs on-node and at the yard gateway. The system operates with zero internet access.
          </p>
        </div>

        {/* 4-Stage Horizontal Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: "01",
              title: "SENSE",
              target: "DUTY-CYCLED ACQUISITION",
              desc: "10s acoustic analysis + 5-min telemetry cycle with interrupt-driven tilt wake.",
              hardware: "TMP117 • INMP441 • SCD41",
            },
            {
              step: "02",
              title: "PROCESS",
              target: "ON-NODE MCU",
              desc: "Nordic nRF52840 computes 256-point Real FFT and runs 1D-CNN INT8 classification in 1.12 ms.",
              hardware: "Arm Cortex-M4F @ 64MHz",
            },
            {
              step: "03",
              title: "CORRELATE",
              target: "YARD GATEWAY",
              desc: "Raspberry Pi CM4 runs CUSUM drift and multi-sensor models over local SQLite.",
              hardware: "Debian 64-bit • TorchScript INT8",
            },
            {
              step: "04",
              title: "ALERT",
              target: "FIELD CONSOLE",
              desc: "The beekeeper receives hive ID, diagnostic cause, and exact field protocol.",
              hardware: "Sub-GHz LoRa • Field App",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="bg-[#12151e] border border-[#222738] p-6 rounded-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="text-2xl font-mono font-bold text-[#f0b840]">{s.step}</div>
                <div className="text-[10px] font-mono text-[#8a90a0] uppercase font-bold tracking-wider">{s.target}</div>
                <h3 className="text-lg font-bold text-white font-sans">{s.title}</h3>
                <p className="text-xs text-[#8a90a0] font-mono leading-relaxed">{s.desc}</p>
              </div>

              <div className="pt-3 border-t border-[#181c28] text-[10px] font-mono text-zinc-400">
                {s.hardware}
              </div>
            </div>
          ))}
        </div>

        {/* Dual-Tier Architecture Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#12151e] border border-[#222738] p-6 sm:p-8 rounded-sm">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f0b840]" />
              <span className="text-xs font-mono font-bold text-white uppercase">TIER 1: FIELD NODE (TINYML)</span>
            </div>
            <p className="text-xs font-mono text-[#8a90a0] leading-relaxed">
              Runs 1D-CNN inference directly on the Nordic nRF52840. Classifies audio frames into nominal, queenless, and pre-swarm states in 1.12 ms. Draws 2.0 µA in sleep.
            </p>
            <div className="text-[10px] font-mono text-zinc-400">
              Benchmark Latency: <strong className="text-white">1.12 ms</strong> • Memory: <strong className="text-white">48 KB SRAM</strong> • Power: <strong className="text-[#2ea043]">2.0 µA SoC Sleep</strong>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
              <span className="text-xs font-mono font-bold text-white uppercase">TIER 2: CM4 GATEWAY (LOCAL FUSION)</span>
            </div>
            <p className="text-xs font-mono text-[#8a90a0] leading-relaxed">
              Aggregates yard data over sub-GHz LoRa. Runs INT8 models and CUSUM drift calculations against local SQLite. Generates yard triage tables without cloud servers.
            </p>
            <div className="text-[10px] font-mono text-zinc-400">
              Model Format: <strong className="text-white">INT8 TorchScript</strong> • Storage: <strong className="text-white">SQLite WAL</strong> • OS: <strong className="text-white">Debian 64-bit OverlayFS</strong>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
