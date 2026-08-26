"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Cpu } from "lucide-react";
import { getAssetPath } from "@/lib/utils";

function GithubIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function Section07TheHardware() {
  return (
    <section id="the-hardware" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#222738]">
      <div className="space-y-12">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-[11px] font-mono tracking-widest text-[#8a90a0] uppercase">
            07 - FIELD HARDWARE
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4f4f6] font-sans uppercase">
            Engineered for 10-year field operation.
          </h2>

          <p className="text-sm sm:text-base text-[#8a90a0] font-mono leading-relaxed">
            IP67 UV-stabilized ASA enclosures, conformal-coated PCBs, and solar panels designed for 45°C summers and -20°C winters.
          </p>
        </div>

        {/* 3 Physical Hardware Presentation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Solar Sensor Node */}
          <div className="bg-[#12151e] border border-[#222738] rounded-sm overflow-hidden flex flex-col justify-between">
            <div className="relative h-48 sm:h-56 bg-[#0a0d14]">
              <Image
                src={getAssetPath("/images/hardware/beevil_node_render.jpg")}
                alt="Beevil Knievel IP67 Sensor Node Hardware Enclosure"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-[#f0b840] uppercase font-bold">NODE UNIT • IP67</div>
                <h3 className="text-base font-bold text-white font-sans">Solar Sensor Node</h3>
                <p className="text-xs font-mono text-[#8a90a0] leading-relaxed">
                  IP67 ASA enclosure, 2W monocrystalline solar lid, LiFePO4 battery, Nordic nRF52840 MCU, SX1262 LoRa transceiver, and comb sensor ribbon.
                </p>
              </div>
              <div className="pt-3 border-t border-[#181c28] text-[10px] font-mono text-zinc-400">
                Power: <span className="text-white">2.0 µA Sleep (14-day run without sun)</span>
              </div>
            </div>
          </div>

          {/* Card 2: Central Gateway */}
          <div className="bg-[#12151e] border border-[#222738] rounded-sm overflow-hidden flex flex-col justify-between">
            <div className="relative h-48 sm:h-56 bg-[#0a0d14]">
              <Image
                src={getAssetPath("/images/hardware/beevil_gateway_mast.jpg")}
                alt="Beevil Knievel Central Apiary Gateway Mast"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-[#06b6d4] uppercase font-bold">BASE STATION • CM4</div>
                <h3 className="text-base font-bold text-white font-sans">Apiary Gateway Station</h3>
                <p className="text-xs font-mono text-[#8a90a0] leading-relaxed">
                  Pole-mounted enclosure with Raspberry Pi CM4 baseboard, sub-GHz LoRa antenna, SQLite database, and local INT8 inference.
                </p>
              </div>
              <div className="pt-3 border-t border-[#181c28] text-[10px] font-mono text-zinc-400">
                Inference: <span className="text-white">8.20 ms (INT8 local model)</span>
              </div>
            </div>
          </div>

          {/* Card 3: Antmicro Carrier PCB */}
          <div className="bg-[#12151e] border border-[#222738] rounded-sm overflow-hidden flex flex-col justify-between">
            <div className="relative h-48 sm:h-56 bg-[#0a0d14]">
              <Image
                src={getAssetPath("/images/hardware/beevil_carrier_pcb.jpg")}
                alt="Antmicro Raspberry Pi CM4 Baseboard Carrier PCB"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-[#2ea043] uppercase font-bold">CARRIER PCB • KICAD</div>
                <h3 className="text-base font-bold text-white font-sans">CM4 Carrier Board</h3>
                <p className="text-xs font-mono text-[#8a90a0] leading-relaxed">
                  Open-hardware PCB with power conditioning, isolated I2C channels, SPI interface, and gigabit Ethernet.
                </p>
              </div>
              <div className="pt-3 border-t border-[#181c28] text-[10px] font-mono text-zinc-400">
                OS: <span className="text-white">Debian 64-bit with read-only rootfs (OverlayFS)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Open Engineering & BOM Footer Strip */}
        <div className="bg-[#12151e] border border-[#222738] p-6 sm:p-8 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-mono font-bold text-white uppercase">Open-Source Hardware & Firmware.</div>
            <p className="text-xs font-mono text-[#8a90a0]">
              KiCad schematics, firmware source, CAD STEP files, and bill of materials are public on GitHub.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/atharveeee-netizen/beevil-knievel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#0a0d14] border border-[#222738] hover:border-[#3a4154] text-[#f4f4f6] text-xs font-mono uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0b840]"
            >
              <GithubIcon className="w-3.5 h-3.5 text-[#8a90a0]" />
              <span>GitHub Repository</span>
            </a>

            <Link
              href="/app"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#f0b840] hover:bg-[#f8c454] text-[#0a0d14] font-bold text-xs font-mono uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0b840]"
            >
              <span>Launch Field App</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
