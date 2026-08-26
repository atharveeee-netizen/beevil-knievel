"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { getAssetPath } from "@/lib/utils";

export function ProductHero() {
  return (
    <section className="relative min-h-[88vh] flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Top Header Block */}
      <div className="space-y-5 max-w-3xl pt-6 sm:pt-10">
        <div className="text-[11px] font-mono tracking-widest text-[#f0b840] uppercase font-semibold">
          BEEVIL KNIEVEL / SENSORS AND ACOUSTIC TELEMETRY FOR COMMERCIAL HIVES
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#f4f4f6] font-sans leading-[1.05] uppercase">
          Know what is happening inside the hive.
        </h1>

        <p className="text-sm sm:text-lg text-[#8a90a0] font-mono max-w-2xl leading-relaxed">
          Sensors track brood temperature, acoustic frequencies, and carbon dioxide inside the colony. Detect swarming, queen loss, and colony collapse before flight - without opening the hive box.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href="#the-hive"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#f0b840] hover:bg-[#f8c454] text-[#0a0d14] font-bold text-xs font-mono uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0b840]"
          >
            <span>View System Specs</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/app"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#12151e] hover:bg-[#181c28] border border-[#222738] text-[#f4f4f6] text-xs font-mono uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0b840]"
          >
            <span>Open Field Console</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#8a90a0]" />
          </Link>
        </div>
      </div>

      {/* Hero Product Visual Composition */}
      <div className="mt-10 relative w-full h-[320px] sm:h-[440px] md:h-[500px] rounded-sm overflow-hidden border border-[#222738] bg-[#12151e]">
        <Image
          src={getAssetPath("/images/hardware/beevil_hero_apiary.jpg")}
          alt="Beevil Knievel sensor node deployed in production apiary"
          fill
          priority
          className="object-cover object-center filter brightness-90 contrast-105"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />

        {/* Ambient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-transparent to-transparent opacity-80 pointer-events-none" />

        {/* Telemetry Readout Strip */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-[#0a0d14]/95 backdrop-blur-md border border-[#222738] p-4 rounded-sm flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#2ea043]" />
            <div>
              <span className="text-[9px] font-mono text-[#8a90a0] block uppercase">MONITORED HIVE</span>
              <span className="text-xs font-mono font-bold text-white">Hive #042 • Yard Alpha</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs font-mono">
            <div>
              <span className="text-[9px] text-[#8a90a0] block uppercase">BROOD TEMP (TMP117)</span>
              <span className="font-bold text-white">34.82°C</span>
              <span className="text-[9px] text-[#2ea043] ml-1">±0.05°C</span>
            </div>

            <div>
              <span className="text-[9px] text-[#8a90a0] block uppercase">ACOUSTICS (INMP441)</span>
              <span className="font-bold text-[#f0b840]">220 Hz</span>
              <span className="text-[9px] text-[#8a90a0] ml-1">Worker Hum</span>
            </div>

            <div>
              <span className="text-[9px] text-[#8a90a0] block uppercase">CO2 (SCD41 NDIR)</span>
              <span className="font-bold text-white">1,140 ppm</span>
            </div>

            <div className="hidden sm:block">
              <span className="text-[9px] text-[#8a90a0] block uppercase">RADIO LINK</span>
              <span className="font-bold text-[#8a90a0]">LoRa IN865 (Sub-GHz)</span>
            </div>
          </div>

          <div className="hidden md:block text-right">
            <span className="text-[9px] font-mono text-[#8a90a0] block uppercase">ON-NODE INFERENCE</span>
            <span className="text-xs font-mono font-bold text-[#2ea043]">1.12 ms (Nordic nRF52840)</span>
          </div>

        </div>
      </div>

    </section>
  );
}
