"use client";

import React, { useState } from "react";
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
} from "lucide-react";

interface SpecCard {
  id: string;
  category: "HARDWARE" | "SOFTWARE";
  title: string;
  icon: React.ReactNode;
  items: string[];
  highlight?: string;
}

const ALL_SPECS: SpecCard[] = [
  // HARDWARE FEATURES
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
  },
  {
    id: "sensors-hw",
    category: "HARDWARE",
    title: "16-Sensor Telemetry Fusion",
    icon: <Activity className="w-5 h-5 text-[#ffc833]" />,
    items: [
      "TI TMP117 Medical-Grade Brood Temperature (±0.08°C accuracy)",
      "Sensirion SHT45 High-Precision Hive Humidity & Ambient Delta-T",
      "Bosch BME688 AI Volatile Organic Gas Profiler (AFB/EFB detection)",
      "TDK ICS-43434 24-bit Digital MEMS Acoustic Ear (100Hz - 6kHz)",
    ],
    highlight: "±0.08°C Brood Temp",
  },
  {
    id: "node-hw",
    category: "HARDWARE",
    title: "Field Node Hardware",
    icon: <Zap className="w-5 h-5 text-[#ffc833]" />,
    items: [
      "Ultra-low-power Dual-Core 64MHz ARM Cortex-M4F MCU",
      "Factory-Integrated Off-Shore COTS Solar Sensor Node",
      "Hardware DMA Audio Capture with Zero CPU Jitter",
      "3-Axis Micro-Vibration IMU for Pest Agitation Tracking",
    ],
    highlight: "Off-Shore COTS Node",
  },
  {
    id: "power-hw",
    category: "HARDWARE",
    title: "Solar & Power Harvester",
    icon: <Sun className="w-5 h-5 text-[#ffc833]" />,
    items: [
      "2W High-Efficiency Monocrystalline Solar Top Lid",
      "3.7V 3500mAh Industrial Cold-Weather LiFePO4 Battery",
      "14 Days Autonomous Operation Under Complete Sunlight Deprivation",
      "Over 3.2 Years Expected Field Operating Life",
    ],
    highlight: "14-Day Sunless Reserve",
  },
  {
    id: "wireless-hw",
    category: "HARDWARE",
    title: "Long-Range Telemetry",
    icon: <Radio className="w-5 h-5 text-[#ffc833]" />,
    items: [
      "Semtech LoRaWAN 868 MHz / 915 MHz (Up to 15km Line-of-Sight)",
      "Wi-Fi 802.11b/g/n 2.4GHz for Local Gateway Sync",
      "Bluetooth 5.0 LE for Direct Smartphone Commissioning",
      "Ultra-Low Power TX Duty Cycle (< 0.1% Airtime)",
    ],
    highlight: "15 km LoRaWAN",
  },
  {
    id: "enclosure-hw",
    category: "HARDWARE",
    title: "Chassis & Environmental",
    icon: <ShieldCheck className="w-5 h-5 text-[#ffc833]" />,
    items: [
      "IP67 Weatherproof UV-Stabilized Polycarbonate Enclosure",
      "-20°C to +65°C Operating Temperature Tolerance",
      "Propolis-Resistant Acoustic Grille Membrane",
      "Universal Magnetic Clamp (Langstroth, Warre, Top-Bar)",
    ],
    highlight: "IP67 Weatherproof",
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
  },
  {
    id: "latency-sw",
    category: "SOFTWARE",
    title: "Latency & Real-Time Throughput",
    icon: <Terminal className="w-5 h-5 text-emerald-400" />,
    items: [
      "Hardware Inference Latency: 3.35 ms on Edge NPU",
      "Throughput: 298 Hives / Second Real-Time Monitoring Capacity",
      "Single Antmicro Gateway Supports Up to 50 Field Hives",
      "Sub-5ms Real-Time Alarm Dispatch to Mobile Devices",
    ],
    highlight: "3.35 ms Inference",
  },
  {
    id: "tinyml-sw",
    category: "SOFTWARE",
    title: "TinyML MCU Node Model",
    icon: <Layers className="w-5 h-5 text-emerald-400" />,
    items: [
      "1D-CNN Micro Architecture (3,955 INT8 Parameters)",
      "Memory Footprint: 3.8 KB SRAM / 8.0 KB Flash",
      "On-Node Triage Recall: 99.80% (Suppresses 91.4% of Redundant Radio TX)",
      "Executes in 1.12 ms on nRF52840 MCU",
    ],
    highlight: "3.8 KB SRAM TinyML",
  },
  {
    id: "dataset-sw",
    category: "SOFTWARE",
    title: "100% Real Field Data Provenance",
    icon: <Database className="w-5 h-5 text-emerald-400" />,
    items: [
      "1,050,000 Real-World Telemetry Records (Zero Synthetic Data)",
      "Strict Hive-Level GroupKFold Isolation (Zero Leakage)",
      "Multi-Apiary Provenance Across European & North American Field Stations",
      "Open Formats: PyTorch Tensor, NumPy Arrays, Standard CSV",
    ],
    highlight: "Zero Synthetic Data",
  },
];

export function SpecsSection() {
  const [activeTab, setActiveTab] = useState<"ALL" | "HARDWARE" | "SOFTWARE">("ALL");

  const filteredSpecs = activeTab === "ALL" 
    ? ALL_SPECS 
    : ALL_SPECS.filter(s => s.category === activeTab);

  return (
    <section
      id="the_specs"
      className="bg-[#212223] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t-2 border-white/10"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#ffc833] text-[#312f28] px-4 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Master Engineering Specifications</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Hardware &amp; Software Specs.
          </h2>

          <p className="text-base sm:text-lg text-white/70">
            Engineered from silicon to neural network for verifiable apiculture intelligence.
          </p>

          {/* Hardware vs Software Tabs */}
          <div className="flex justify-center gap-3 pt-4">
            {(["ALL", "HARDWARE", "SOFTWARE"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition-all ${
                  activeTab === tab
                    ? "bg-[#ffc833] text-[#312f28] shadow-lg scale-105"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                {tab === "ALL" ? "All Features (10)" : `${tab} Features`}
              </button>
            ))}
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpecs.map((spec) => (
            <div
              key={spec.id}
              className="bg-[#1d1c18] border border-white/10 rounded-2xl p-6 hover:border-[#ffc833]/60 transition-colors shadow-md flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ffc833]">
                      {spec.category}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-wide mt-0.5">
                      {spec.title}
                    </h3>
                  </div>
                  <div className="p-2 bg-white/5 rounded-lg">{spec.icon}</div>
                </div>

                <ul className="space-y-2 text-xs text-white/80 leading-relaxed">
                  {spec.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffc833] mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {spec.highlight && (
                <div className="mt-6 pt-3 border-t border-white/10 flex justify-between items-center text-[11px] font-mono">
                  <span className="text-white/50">Benchmark:</span>
                  <span className="font-bold text-[#ffc833]">{spec.highlight}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
