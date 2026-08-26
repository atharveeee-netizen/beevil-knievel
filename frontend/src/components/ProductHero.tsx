"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Activity, Thermometer, Radio, Volume2 } from "lucide-react";
import { getAssetPath } from "@/lib/utils";

export function ProductHero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Top Header Block */}
      <div className="space-y-6 max-w-3xl pt-8 sm:pt-12">
        <div className="text-[11px] font-mono tracking-widest text-[#f0b840] uppercase font-semibold">
          BEEVIL KNIEVEL / EDGE INTELLIGENCE FOR COMMERCIAL APICULTURE
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#f4f4f6] font-sans leading-[1.05] uppercase">
          Know what&apos;s happening inside the hive.
        </h1>

        <p className="text-base sm:text-xl text-[#8a90a0] font-mono max-w-2xl leading-relaxed">
          Continuous edge intelligence for commercial apiaries. Detect swarms, queen loss, and colony distress <span className="text-[#f4f4f6] font-semibold">72 hours before failure</span> - without cracking propolis seals.
        </p>

        {/* Physical Engineering Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px] text-[#8a90a0]">
          <span className="px-2.5 py-1 rounded-sm bg-[#12151e] border border-[#222632] text-[#f4f4f6]">
            IP67 Solar Node
          </span>
          <span className="px-2.5 py-1 rounded-sm bg-[#12151e] border border-[#222632] text-[#f4f4f6]">
            Antmicro CM4 Hub
          </span>
          <span className="px-2.5 py-1 rounded-sm bg-[#12151e] border border-[#222632] text-[#f4f4f6]">
            15km LoRa Mesh
          </span>
          <span className="px-2.5 py-1 rounded-sm bg-[#12151e] border border-[#2ea043]/40 text-[#2ea043]">
            Verified Field BOM
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href="#the-hive"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#f0b840] hover:bg-[#f8c454] text-[#0a0d14] font-bold text-xs font-mono uppercase tracking-wider transition-colors"
          >
            <span>Explore the system</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/app"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#161922] hover:bg-[#222632] border border-[#2e3444] text-[#f4f4f6] text-xs font-mono uppercase tracking-wider transition-colors"
          >
            <span>Open field app</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#8a90a0]" />
          </Link>
        </div>
      </div>

      {/* Hero Product Visual Composition (Quiet, Industrial, Natural) */}
      <div className="mt-14 relative w-full h-[360px] sm:h-[480px] md:h-[540px] rounded-sm overflow-hidden border border-[#222632] bg-[#12151e]">
        <Image
          src={getAssetPath("/images/hardware/beevil_hero_apiary.jpg")}
          alt="Beevil Knievel autonomous field node deployed in production apiary"
          fill
          priority
          className="object-cover object-center filter brightness-90 contrast-105"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />

        {/* Subtle Ambient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-transparent to-transparent opacity-80 pointer-events-none" />

        {/* Minimal Precision Telemetry HUD Banner */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-[#0a0d14]/95 border border-[#2e3444] p-4 rounded-sm flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#2ea043] animate-pulse" />
            <div>
              <span className="text-[10px] font-mono text-[#8a90a0] block uppercase">MONITORED COLONY</span>
              <span className="text-xs font-mono font-bold text-[#f4f4f6]">Hive #042 • Yard Alpha</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
            <div>
              <span className="text-[9px] text-[#8a90a0] block uppercase">BROOD RTD</span>
              <span className="font-bold text-[#f4f4f6]">34.82°C</span>
              <span className="text-[9px] text-[#2ea043] ml-1">±0.05°C</span>
            </div>

            <div>
              <span className="text-[9px] text-[#8a90a0] block uppercase">ACOUSTIC PEAK</span>
              <span className="font-bold text-[#f0b840]">220 Hz</span>
              <span className="text-[9px] text-[#8a90a0] ml-1">Nominal</span>
            </div>

            <div>
              <span className="text-[9px] text-[#8a90a0] block uppercase">NDIR CO2</span>
              <span className="font-bold text-[#f4f4f6]">1,140 ppm</span>
            </div>

            <div className="hidden sm:block">
              <span className="text-[9px] text-[#8a90a0] block uppercase">RADIO LINK</span>
              <span className="font-bold text-[#8a90a0]">LoRa IN865 (15km)</span>
            </div>
          </div>

          <div className="hidden md:block text-right">
            <span className="text-[9px] font-mono text-[#8a90a0] block uppercase">INFERENCE LATENCY</span>
            <span className="text-xs font-mono font-bold text-[#2ea043]">1.12 ms on-node</span>
          </div>

        </div>
      </div>

    </section>
  );
}
