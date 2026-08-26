"use client";

import React from "react";
import Link from "next/link";
import { Layers, Sparkles, ArrowRight, ShieldCheck, Cpu, Radio, Network } from "lucide-react";

export function CatalogSection() {
  const MODEL_VARIATIONS = [
    {
      name: "Beevil Solo",
      range: "1 - 4 Hives",
      badge: "Hobbyist & Backyard",
      description: "Direct Bluetooth 5.0 LE & Wi-Fi telemetry reporting directly to the HiveOS mobile app without needing an external base station.",
      features: [
        "Standalone Solar Sensor Node",
        "Direct Smartphone BLE Sync",
        "Local Acoustic Triage Engine",
        "Instant Queen Loss Alerts",
      ],
      cta: "Explore Solo",
    },
    {
      name: "Beevil Apiary Pro",
      range: "5 - 25 Hives",
      badge: "Commercial Apiary Standard",
      description: "Includes 1x Central Antmicro CM4 Base Station Gateway with up to 15km LoRaWAN range for complete apiary coverage.",
      features: [
        "1x Antmicro CM4 Edge Gateway",
        "Multi-Node Sub-GHz LoRa Mesh",
        "Full 96.84% Edge AI Net Execution",
        "24/7 Remote Telemetry & Cloud Backup",
      ],
      cta: "Explore Apiary Pro",
      featured: true,
    },
    {
      name: "Beevil Pollination Grid",
      range: "25 - 100+ Hives",
      badge: "Industrial Orchard Fleet",
      description: "Multi-gateway mesh network designed for commercial migratory beekeeping, almond pollination contracts, and corporate research.",
      features: [
        "Multi-Gateway Redundant Mesh",
        "LTE-M / Satellite Uplink Option",
        "Fleet-Wide Varroa Heatmaps",
        "API Integration & Export",
      ],
      cta: "Contact Enterprise",
    },
  ];

  return (
    <section
      id="catalog"
      className="bg-[#090d16] text-slate-100 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-slate-800"
    >
      <div id="mesh" className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-amber-500/30 text-[#ffc833] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Apiary Sizing &amp; Catalog</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-sans">
            Model Variations by Hive Count.
          </h2>

          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
            Every apiary is unique. Beevil Knievel hardware and Edge AI models scale dynamically according to your colony count, radio topology, and operational goals.
          </p>
        </div>

        {/* 3 Model Tier Variations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {MODEL_VARIATIONS.map((model, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all ${
                model.featured
                  ? "bg-slate-950 text-white shadow-2xl border-2 border-amber-400 relative"
                  : "bg-slate-950/70 text-slate-200 shadow-xl border border-slate-800 hover:border-slate-700"
              }`}
            >
              {model.featured && (
                <div className="absolute -top-3.5 left-8 bg-[#ffc833] text-slate-950 text-[10px] font-mono font-black uppercase px-3.5 py-0.5 rounded-full shadow-md">
                  Recommended Setup
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <span
                    className={`text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                      model.featured
                        ? "bg-amber-500/20 text-[#ffc833] border border-amber-500/30"
                        : "bg-slate-900 text-slate-400 border border-slate-800"
                    }`}
                  >
                    {model.badge}
                  </span>
                  <h3 className="text-3xl font-extrabold mt-4 tracking-tight text-white font-sans">
                    {model.name}
                  </h3>
                  <div className="text-xs font-mono font-bold mt-1 text-amber-400">
                    Capacity: {model.range}
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-slate-300">
                  {model.description}
                </p>

                {/* Features list */}
                <ul className="space-y-2.5 text-xs font-medium pt-2 text-slate-300">
                  {model.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffc833] flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href="#all-for-just"
                  className={`w-full py-3.5 rounded-xl text-center text-xs font-mono font-bold block transition-all ${
                    model.featured
                      ? "bg-[#ffc833] text-slate-950 hover:bg-amber-300 shadow-lg"
                      : "bg-slate-900 hover:bg-slate-800 text-white border border-slate-700"
                  }`}
                >
                  {model.cta} →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Future Work & Custom Apiary Sizing Callout */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#ffc833]">
            <Network className="w-4 h-4" />
            <span>Future Work &amp; Research Roadmap</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans">
            Expanding Model Variations for Massive Industrial Apiaries
          </h3>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Our engineering roadmap is actively expanding model variations to accommodate dense industrial pollination zones (100+ hives per mobile trailer), automated drone relay links, and sub-second acoustic classification on extreme edge silicon.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <Link
              href="#need-help"
              className="inline-flex items-center gap-2 bg-[#ffc833] hover:bg-amber-300 text-slate-950 font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition-all"
            >
              <span>Request Custom Apiary Sizing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-xs text-slate-400 font-mono">
              Custom LoRa channels &amp; custom ML thresholds available for research institutions.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

