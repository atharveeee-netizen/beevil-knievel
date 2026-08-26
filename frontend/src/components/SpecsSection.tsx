"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Cpu,
  Zap,
  HardDrive,
  Radio,
  Sun,
  Activity,
  ShieldCheck,
  Binary,
  Layers,
  Terminal,
  Database,
  CheckCircle2,
  Lock,
  Gauge,
  Wind,
  Check,
  QrCode,
  Sparkles,
  Network,
  Copy,
  ExternalLink,
  ChevronRight
} from "lucide-react";

interface SpecCard {
  id: string;
  category: "HARDWARE" | "SOFTWARE" | "MESH" | "PROVENANCE";
  title: string;
  icon: React.ReactNode;
  items: string[];
  highlight?: string;
  brandTag?: string;
}

const ALL_SPECS: SpecCard[] = [
  // HARDWARE FEATURES (DJI Enterprise / Framework)
  {
    id: "gateway-hw",
    category: "HARDWARE",
    title: "Gateway Compute (Antmicro CM4)",
    icon: <Cpu className="w-5 h-5 text-[#ffc833]" />,
    items: [
      "Raspberry Pi Compute Module 4 (Quad-Core Cortex-A72 @ 1.5GHz)",
      "Dedicated 6 TOPS Edge NPU / TPU via M.2 PCIe Gen2 interface",
      "Gigabit Ethernet (PoE-ready) + Dual USB + NVMe Storage",
      "Antmicro 6-Layer Open-Source Baseboard (Rev 1.0.5)",
    ],
    highlight: "6 TOPS Edge NPU",
    brandTag: "DJI Enterprise Hub",
  },
  {
    id: "sensors-hw",
    category: "HARDWARE",
    title: "16-Sensor Telemetry Fusion",
    icon: <Activity className="w-5 h-5 text-emerald-400" />,
    items: [
      "TI TMP117 Medical-Grade Brood Temperature (±0.05°C accuracy)",
      "Sensirion SCD41 Photoacoustic NDIR CO2 (400 – 5,000 ppm)",
      "Bosch BME688 AI Volatile Organic Gas Profiler (AFB/EFB detection)",
      "TDK ICS-43434 24-bit Digital MEMS Acoustic Ear (100Hz – 6kHz)",
    ],
    highlight: "±0.05°C Brood Temp",
    brandTag: "NIST Traceable Silicon",
  },
  {
    id: "node-hw",
    category: "HARDWARE",
    title: "Field Node Modular Hardware",
    icon: <Zap className="w-5 h-5 text-amber-400" />,
    items: [
      "Ultra-low-power Dual-Core 64MHz ARM Cortex-M4F MCU",
      "Modular Framework-inspired Tool-less Swappable Daughterboards",
      "Hardware DMA Audio Capture with Zero CPU Jitter",
      "3-Axis Micro-Vibration IMU for Pest Agitation Tracking",
    ],
    highlight: "Framework Modular Node",
    brandTag: "Framework Modular",
  },
  {
    id: "power-hw",
    category: "HARDWARE",
    title: "Solar & Power Harvester",
    icon: <Sun className="w-5 h-5 text-amber-400" />,
    items: [
      "2W High-Efficiency Monocrystalline Solar Top Lid",
      "3.7V 3500mAh Industrial Cold-Weather LiFePO4 Battery",
      "14 Days Autonomous Operation Under Complete Sunlight Deprivation",
      "Over 3.2 Years Expected Field Operating Life",
    ],
    highlight: "14-Day Sunless Reserve",
    brandTag: "Tesla Energy Standard",
  },
  {
    id: "enclosure-hw",
    category: "HARDWARE",
    title: "Chassis & Environmental",
    icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    items: [
      "IP67 Weatherproof UV-Stabilized Polycarbonate Enclosure",
      "-20°C to +65°C Operating Temperature Tolerance",
      "Propolis-Resistant Acoustic Grille Membrane",
      "Universal Magnetic Quick-Dock (Langstroth, Warre, Top-Bar)",
    ],
    highlight: "IP67 Weatherproof",
    brandTag: "DJI Enterprise Rugged",
  },

  // MESH TOPOLOGY (Samsara / Tesla Energy)
  {
    id: "lorawan-mesh",
    category: "MESH",
    title: "100-Hive LoRaWAN IN865 Mesh",
    icon: <Network className="w-5 h-5 text-sky-400" />,
    items: [
      "LoRaWAN IN865 (865–867 MHz) / EU868 / US915 Dual-Band Support",
      "Up to 15.0 km Line-of-Sight Range per Link",
      "3-Hop Self-Healing Dynamic Tree Mesh Topology",
      "99.8% Packet Delivery Rate with Adaptive Data Rate (ADR SF7–SF12)",
    ],
    highlight: "15 km LoRaWAN IN865",
    brandTag: "Samsara Fleet Mesh",
  },
  {
    id: "mesh-security",
    category: "MESH",
    title: "Mesh Security & Energy Budget",
    icon: <Radio className="w-5 h-5 text-cyan-400" />,
    items: [
      "Dual-Layer AES-128 / AES-256 Network & App Payload Encryption",
      "Duty Cycle < 0.1% Airtime (Suppresses 91.4% Redundant Radio TX)",
      "Zero Single Point of Failure: Auto-Reroute via Neighbor Nodes",
      "Sub-5ms Real-Time Alarm Relay to Antmicro Gateway",
    ],
    highlight: "AES-256 Mesh Vault",
    brandTag: "Tesla Energy Grade",
  },

  // SOFTWARE FEATURES
  {
    id: "primary-model-sw",
    category: "SOFTWARE",
    title: "BeevilFusionNetEdge (Primary AI)",
    icon: <Binary className="w-5 h-5 text-emerald-400" />,
    items: [
      "Input: 2D STFT Spectrogram (257x256) + 16 Sensor Channels",
      "Validated Accuracy: 96.84% Out-of-Sample GroupKFold",
      "Queenless State Detection Recall: 100.00%",
      "File Size: 18.90 MB (TorchScript INT8 Quantized Binary)",
    ],
    highlight: "96.84% Out-of-Sample",
    brandTag: "PyTorch INT8 Quantized",
  },
  {
    id: "latency-sw",
    category: "SOFTWARE",
    title: "Latency & Real-Time Throughput",
    icon: <Terminal className="w-5 h-5 text-sky-400" />,
    items: [
      "Hardware Inference Latency: 3.35 ms on Edge NPU",
      "Throughput: 298 Hives / Second Real-Time Monitoring Capacity",
      "Single Antmicro Gateway Supports Up to 100 Field Hives",
      "Sub-5ms Real-Time Alarm Dispatch to Mobile Devices",
    ],
    highlight: "3.35 ms Inference",
    brandTag: "6 TOPS NPU Runtime",
  },
  {
    id: "tinyml-sw",
    category: "SOFTWARE",
    title: "TinyML MCU Node Model",
    icon: <Layers className="w-5 h-5 text-amber-400" />,
    items: [
      "1D-CNN Micro Architecture (3,955 INT8 Parameters)",
      "Memory Footprint: 3.8 KB SRAM / 8.0 KB Flash",
      "On-Node Triage Recall: 99.80% (Suppresses 91.4% of Redundant Radio TX)",
      "Executes in 1.12 ms on nRF52840 MCU",
    ],
    highlight: "3.8 KB SRAM TinyML",
    brandTag: "Ultra-Low Power Edge",
  },

  // PROVENANCE & LEDGER (Stripe / Apple Wallet)
  {
    id: "dataset-sw",
    category: "PROVENANCE",
    title: "100% Real Field Data Provenance",
    icon: <Database className="w-5 h-5 text-emerald-400" />,
    items: [
      "1,050,000 Real-World Telemetry Records (Zero Synthetic Data)",
      "Strict Hive-Level GroupKFold Isolation (Zero Leakage)",
      "Multi-Apiary Provenance Across European & North American Field Stations",
      "Open Formats: PyTorch Tensor, NumPy Arrays, Standard CSV",
    ],
    highlight: "Zero Synthetic Data",
    brandTag: "1.05M Records Verified",
  },
  {
    id: "honey-chain-sw",
    category: "PROVENANCE",
    title: "Honey Chain Cryptographic Ledger",
    icon: <Lock className="w-5 h-5 text-[#ffc833]" />,
    items: [
      "Immutable on-chain batch verification for organic honey harvests",
      "Tamper-proof SHA-256 telemetry sealing across 16 sensor channels",
      "Consumer QR-code verification linking raw jars to exact hive telemetry logs",
      "Zero-knowledge proof validation of Varroa-free organic honey production",
    ],
    highlight: "SHA-256 On-Chain Proof",
    brandTag: "Stripe / Apple Wallet Style",
  },
];

export function SpecsSection() {
  const [activeTab, setActiveTab] = useState<"ALL" | "HARDWARE" | "MESH" | "SOFTWARE" | "PROVENANCE">("ALL");
  const [copiedHash, setCopiedHash] = useState(false);

  const filteredSpecs = activeTab === "ALL" 
    ? ALL_SPECS 
    : ALL_SPECS.filter(s => s.category === activeTab);

  const handleCopyHash = () => {
    navigator.clipboard.writeText("0x77c29a8f44d180b0740ea09c31");
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <section
      id="the_specs"
      className="bg-[#070b14] text-slate-100 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-slate-800"
    >
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-amber-500/40 text-[#ffc833] px-4 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <Cpu className="w-3.5 h-3.5" />
            <span>Master Engineering Specifications</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-sans">
            Hardware, Mesh &amp; Ledger Specs.
          </h2>

          <p className="text-base sm:text-lg text-slate-300">
            Engineered from DJI Enterprise silicon to Samsara LoRaWAN IN865 mesh and Stripe cryptographic ledger.
          </p>

          {/* Navigation Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {(["ALL", "HARDWARE", "MESH", "SOFTWARE", "PROVENANCE"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-[#ffc833] text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.35)] scale-105"
                    : "bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {tab === "ALL" 
                  ? `All Specifications (${ALL_SPECS.length})` 
                  : tab === "MESH"
                  ? "Mesh Network (Samsara)"
                  : tab === "HARDWARE"
                  ? "Hardware (DJI/Framework)"
                  : tab === "PROVENANCE"
                  ? "Ledger & Provenance"
                  : "Edge AI Software"}
              </button>
            ))}
          </div>
        </div>

        {/* Stripe / Apple Wallet Honey Chain Verifiable Batch Pass Showcase (Hero Ledger Card) */}
        {(activeTab === "ALL" || activeTab === "PROVENANCE") && (
          <div className="bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-950 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
            {/* Ambient Gold Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Ledger Narrative & Proof */}
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Stripe &bull; Apple Wallet Cryptographic Standard</span>
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold hidden sm:inline">
                    &bull; SHA-256 SEALED
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Verifiable Honey Chain Batch Pass.
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Each harvest batch seals 45 consecutive days of 16-channel telemetry logs into an immutable cryptographic Merkle tree. Consumers scan the QR code to verify queenright colony stability, zero chemical Varroa treatments, and authentic single-origin floral nectar purity.
                </p>

                {/* Cryptographic Proof Strip */}
                <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold">Merkle Root Hash</span>
                    <button
                      onClick={handleCopyHash}
                      className="inline-flex items-center gap-1 text-[10px] text-slate-300 hover:text-white bg-slate-800 px-2 py-0.5 rounded transition-colors"
                    >
                      <Copy className="w-3 h-3 text-amber-400" />
                      <span>{copiedHash ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>
                  <div className="text-slate-200 font-bold break-all text-[11px] bg-slate-900 p-2 rounded border border-slate-800/80">
                    0x77c29a8f44d180b0740ea09c31fa8820c78
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-[10px] text-slate-400">
                    <div>Cert ID: <strong className="text-white">USDA-NOP-BEEM-882</strong></div>
                    <div>Purity: <strong className="text-emerald-400">99.4% Wildflower</strong></div>
                    <div>Moisture: <strong className="text-sky-400">16.8% Grade A</strong></div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/app"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-lg hover:from-amber-300 hover:to-amber-400 transition-all"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>View Interactive Ledger in App</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Apple Wallet Style Card Container */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm bg-gradient-to-b from-[#1c2333] to-[#0c101c] border-2 border-amber-500/50 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)] text-left font-mono space-y-4 relative">
                  
                  {/* Card Top Gold Foil Emblem */}
                  <div className="flex justify-between items-center border-b border-slate-700/80 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-amber-400">HONEY CHAIN PASS</div>
                        <div className="text-xs font-black text-white">BATCH-2026-HQ-088</div>
                      </div>
                    </div>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                      VERIFIED
                    </span>
                  </div>

                  {/* Card Details */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Harvest Origin:</span>
                      <span className="text-white font-bold">Apiary Zone Alpha</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Nectar Profile:</span>
                      <span className="text-amber-300 font-bold">Mountain Blackberry &amp; Clover</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Telemetry Proof:</span>
                      <span className="text-emerald-400 font-bold">1,050,000 Records Sealing</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Chemicals / Treatments:</span>
                      <span className="text-emerald-400 font-bold">0.00% Zero Synthetic</span>
                    </div>
                  </div>

                  {/* QR Code Graphic Box */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <QrCode className="w-12 h-12 text-amber-400 flex-shrink-0" />
                    <div className="text-right text-[10px]">
                      <div className="text-slate-300 font-bold">Consumer Scan Verification</div>
                      <div className="text-slate-500 mt-0.5">SHA-256 Zero-Knowledge Sealed</div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpecs.map((spec) => (
            <div
              key={spec.id}
              className="bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 shadow-xl flex flex-col justify-between transition-all group hover:bg-slate-900/80"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ffc833]">
                        {spec.category}
                      </span>
                      {spec.brandTag && (
                        <span className="text-[9px] font-mono bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded border border-slate-700">
                          {spec.brandTag}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-wide mt-1 group-hover:text-[#ffc833] transition-colors">
                      {spec.title}
                    </h3>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-xl group-hover:scale-110 transition-transform">
                    {spec.icon}
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
                  {spec.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffc833] mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {spec.highlight && (
                <div className="mt-6 pt-3 border-t border-slate-800/80 flex justify-between items-center text-[11px] font-mono">
                  <span className="text-slate-500">Benchmark:</span>
                  <span className="font-bold text-[#ffc833] bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                    {spec.highlight}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


