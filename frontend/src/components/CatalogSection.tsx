"use client";

import React from "react";
import Link from "next/link";
import { Layers, Sparkles, ArrowRight, ShieldCheck, Cpu, Radio, Network } from "lucide-react";

export function CatalogSection() {
  const MODEL_VARIATIONS = [
    {
      name: "Beevil Solo",
      range: "1 – 4 Hives",
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
      range: "5 – 25 Hives",
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
      range: "25 – 100+ Hives",
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
      className="bg-[#efefef] text-[#312f28] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b-2 border-black/10"
    >
      <div id="mesh" className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#ffc833] text-[#312f28] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-[#312f28]" />
            <span>Apiary Sizing &amp; Catalog</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#312f28]">
            Model Variations by Hive Count.
          </h2>

          <p className="text-lg sm:text-xl font-medium text-[#312f28]/80 leading-relaxed">
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
                  ? "bg-[#312f28] text-white shadow-2xl border-4 border-[#ffc833] relative"
                  : "bg-white text-[#312f28] shadow-md border-2 border-black/10 hover:shadow-lg"
              }`}
            >
              {model.featured && (
                <div className="absolute -top-3.5 left-8 bg-[#ffc833] text-[#312f28] text-[10px] font-mono font-black uppercase px-3 py-0.5 rounded-full shadow-sm">
                  Recommended Setup
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <span
                    className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      model.featured
                        ? "bg-white/10 text-[#ffc833]"
                        : "bg-[#ffc833]/30 text-[#312f28]"
                    }`}
                  >
                    {model.badge}
                  </span>
                  <h3 className="text-3xl font-extrabold mt-3 tracking-tight">
                    {model.name}
                  </h3>
                  <div
                    className={`text-sm font-mono font-bold mt-1 ${
                      model.featured ? "text-white/70" : "text-[#312f28]/70"
                    }`}
                  >
                    Capacity: {model.range}
                  </div>
                </div>

                <p
                  className={`text-sm leading-relaxed ${
                    model.featured ? "text-white/80" : "text-[#312f28]/80"
                  }`}
                >
                  {model.description}
                </p>

                {/* Features list */}
                <ul className="space-y-2.5 text-xs font-medium pt-2">
                  {model.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffc833] flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href="#all-for-just"
                  className={`w-full py-3 rounded-full text-center text-sm font-bold block transition-all ${
                    model.featured
                      ? "bg-[#ffc833] text-[#312f28] hover:bg-[#ffd659] shadow-md"
                      : "bg-[#312f28] text-white hover:bg-black"
                  }`}
                >
                  {model.cta} →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Future Work & Custom Apiary Sizing Callout */}
        <div className="bg-gradient-to-r from-[#212223] to-[#312f28] text-white p-8 sm:p-10 rounded-3xl border-2 border-white/10 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#ffc833]">
            <Network className="w-4 h-4" />
            <span>Future Work &amp; Research Roadmap</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Expanding Model Variations for Massive Apiaries
          </h3>

          <p className="text-sm sm:text-base text-white/80 max-w-3xl leading-relaxed">
            Our engineering roadmap is actively expanding model variations to accommodate dense industrial pollination zones (100+ hives per mobile trailer), automated drone relay links, and sub-second acoustic classification on extreme edge silicon.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <Link
              href="#need-help"
              className="btn-pill-yellow text-xs font-bold py-2.5 px-6 inline-flex items-center gap-1.5"
            >
              <span>Request Custom Apiary Sizing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-xs text-white/50 font-mono">
              Custom LoRa channels &amp; custom ML thresholds available for research institutions.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
