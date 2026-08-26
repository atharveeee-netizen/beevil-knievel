"use client";

import React, { useState } from "react";
import {
  Cpu, Radio, Network, ShieldCheck, ArrowRight,
  Zap, Layers, Database, Lock, CheckCircle2,
  Share2, Signal, WifiOff, HardDrive
} from "lucide-react";
import { DecryptedText, ShinyText } from "@/components/reactbits";

const MESH_HOPS = [
  {
    node: "Hive #001",
    role: "Outlying Edge Node",
    loc: "Deep Tree Line (1.8 km)",
    status: "Transmitting via Mesh Relay",
    latency: "18 ms",
    accent: "#f59e0b",
  },
  {
    node: "Hive #015",
    role: "Intermediate Hop Repeater",
    loc: "Hillcrest Boundary (850 m)",
    status: "Forwarding Encrypted LoRa Packet",
    latency: "12 ms",
    accent: "#06b6d4",
  },
  {
    node: "Hive #042",
    role: "Gateway Proxy Node",
    loc: "Apiary Central Yard (120 m)",
    status: "Direct Sub-GHz Uplink",
    latency: "4 ms",
    accent: "#10b981",
  },
  {
    node: "CM4 Hub",
    role: "Central Apiary Gateway",
    loc: "Weatherproof Mast Station",
    status: "Local SQLite WAL + Neural Fusion",
    latency: "8.2 ms INT8",
    accent: "#a855f7",
  },
];

export function EdgeFirstSection() {
  const [activeTab, setActiveTab] = useState<"EDGE_AI" | "MESH_NET" | "PRIVACY">("EDGE_AI");

  return (
    <section id="edge-first" className="bg-[#070a12] text-[#f8fafc] py-28 px-4 sm:px-6 lg:px-8 border-t border-[#262626]">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#161616] border border-amber-500/30 text-[#f59e0b] px-3.5 py-1.5 rounded-sm text-xs font-mono font-semibold uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>ARCHITECTURAL DIFFERENTIATOR // ZERO CLOUD DEPENDENCY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-sans uppercase">
            Intelligence where the hive is.
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 font-mono leading-relaxed">
            The system does not need to stream megabytes of raw audio and thermal telemetry to a distant cloud server. Full bio-acoustic FFT and neural anomaly classification execute on-device at the edge of the apiary.
          </p>
        </div>

        {/* 6-Stage Edge Dataflow Visualization */}
        <div className="bg-[#161616] border border-[#393939] p-8 rounded-sm space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              EDGE-FIRST LOCAL PIPELINE ARCHITECTURE
            </span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              100% OFFLINE CAPABLE
            </span>
          </div>

          {/* Linear Flow Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {[
              { label: "1. PHYSICAL HIVE", tech: "Brood Nest Cavity", detail: "Propolis envelope" },
              { label: "2. FIELD NODE", tech: "Nordic nRF52840", detail: "2.0µA System ON" },
              { label: "3. TINYML 1D-CNN", tech: "TFLite Quantized", detail: "1.12ms inference" },
              { label: "4. BEEVILMESH", tech: "LoRa SX1262 (IN865)", detail: "15km multi-hop" },
              { label: "5. CM4 GATEWAY", tech: "Raspberry Pi CM4", detail: "8.2ms INT8 Torch" },
              { label: "6. FIELD ACTION", tech: "HiveOS Field App", detail: "1-Tap Triage HUD" },
            ].map((step, idx) => (
              <div
                key={step.label}
                className="bg-[#070a12] border border-[#262626] p-4 rounded-sm space-y-1 relative group hover:border-amber-500/50 transition-colors"
              >
                <div className="text-[10px] font-mono text-amber-400 font-bold">{step.label}</div>
                <div className="text-xs font-bold text-white font-sans truncate">{step.tech}</div>
                <div className="text-[10px] font-mono text-zinc-500">{step.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* BeevilMesh 15km Multi-Hop Communication Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Why Mesh Networking Matters */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1 rounded-sm">
                <Network className="w-3.5 h-3.5" />
                <span>BEEVILMESH PROTOCOL (IN865)</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans uppercase">
                Self-Healing Multi-Hop Radio.
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-mono leading-relaxed">
                Commercial apiaries are located in remote out-yards with zero cellular coverage, dense tree canopies, and rolling terrain. BeevilMesh uses dynamic packet forwarding so every node acts as a resilient mesh repeater.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { title: "Zero Cellular Dependency", desc: "No monthly SIM subscriptions required. Operates across license-free sub-GHz bands (IN865 / EU868 / US915)." },
                { title: "Dynamic Tree Routing", desc: "If a direct line-of-sight path is blocked by foliage, packets automatically hop through neighboring nodes." },
                { title: "AES-256 Hardware Encryption", desc: "Every payload is signed with hardware Cryptocell-310 keys directly on the transceiver silicon." },
              ].map((f) => (
                <div key={f.title} className="bg-[#161616] border border-[#262626] p-4 rounded-sm space-y-1">
                  <h4 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{f.title}</span>
                  </h4>
                  <p className="text-xs text-zinc-400 font-mono pl-6">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Simulated Live Multi-Hop Routing Diagram */}
          <div className="lg:col-span-6 bg-[#161616] border border-[#393939] p-6 sm:p-8 rounded-sm space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                REAL-WORLD 4-HOP PACKET STREAM
              </span>
              <span className="text-xs font-mono text-emerald-400">99.8% PDR</span>
            </div>

            <div className="space-y-3">
              {MESH_HOPS.map((hop, idx) => (
                <div
                  key={hop.node}
                  className="bg-[#070a12] border border-[#262626] p-4 rounded-sm flex items-center justify-between hover:border-zinc-600 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white font-mono">{hop.node}</span>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase">({hop.loc})</span>
                    </div>
                    <div className="text-xs font-mono text-zinc-300">{hop.status}</div>
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] font-mono text-zinc-500 block uppercase">HOP LATENCY</span>
                    <span className="text-xs font-mono font-bold" style={{ color: hop.accent }}>
                      {hop.latency}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-[#0b0f19] border border-white/5 rounded-sm text-center text-[10px] font-mono text-zinc-400">
              FIELD TESTED // VERIFIED 15KM TRANSMISSION ACROSS COMMERCIAL APIARIES
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
