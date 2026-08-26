"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Cpu, Layers, Radio, ShieldCheck, Database, HardDrive } from "lucide-react";

export function Section07TheHardware() {
  return (
    <section id="the-hardware" className="py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#222632]">
      <div className="space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-[11px] font-mono tracking-widest text-[#8a90a0] uppercase">
            07 - THE HARDWARE
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4f4f6] font-sans uppercase">
            Engineered for 10-year field survivability.
          </h2>

          <p className="text-sm sm:text-base text-[#8a90a0] font-mono leading-relaxed">
            Every physical node uses IP67 weatherproof polymers, parylene-coated sensor probes, and monocrystalline solar lids to operate autonomously through extreme summer heat and sub-zero winters.
          </p>
        </div>

        {/* 3 Physical Product Architecture Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Solar Field Transmitter Node */}
          <div className="bg-[#12151e] border border-[#222632] rounded-sm overflow-hidden flex flex-col justify-between">
            <div className="relative h-60 w-full bg-[#0a0d14]">
              <Image
                src="/images/node_enclosure.jpg"
                alt="Solar Field Sensor Node Enclosure"
                fill
                className="object-cover filter brightness-95"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute top-3 left-3 bg-[#0a0d14]/90 px-2 py-0.5 rounded-sm text-[9px] font-mono text-[#2ea043] border border-[#2ea043]/30">
                VERIFIED HARDWARE
              </div>
            </div>

            <div className="p-6 space-y-3">
              <span className="text-[10px] font-mono text-[#8a90a0] uppercase block">NODE TIER</span>
              <h3 className="text-lg font-bold text-[#f4f4f6] font-sans">Solar Sensor Transmitter</h3>
              <p className="text-xs text-[#8a90a0] font-mono leading-relaxed">
                IP67 UV-stabilized enclosure with 2W monocrystalline solar lid, Nordic nRF52840 MCU, Semtech SX1262 LoRa, and 6-sensor multi-modal probe array.
              </p>
              <div className="text-[10px] font-mono text-[#8a90a0] pt-2 border-t border-[#1e2330]">
                Power: <span className="text-[#2ea043] font-bold">2.0µA Deep Sleep (14d autonomy without sun)</span>
              </div>
            </div>
          </div>

          {/* Card 2: Central Apiary Gateway Station */}
          <div className="bg-[#12151e] border border-[#222632] rounded-sm overflow-hidden flex flex-col justify-between">
            <div className="relative h-60 w-full bg-[#0a0d14]">
              <Image
                src="/images/gateway_apiary.jpg"
                alt="Central Apiary Gateway Station"
                fill
                className="object-cover filter brightness-95"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute top-3 left-3 bg-[#0a0d14]/90 px-2 py-0.5 rounded-sm text-[9px] font-mono text-[#2ea043] border border-[#2ea043]/30">
                VERIFIED HARDWARE
              </div>
            </div>

            <div className="p-6 space-y-3">
              <span className="text-[10px] font-mono text-[#8a90a0] uppercase block">BASE STATION TIER</span>
              <h3 className="text-lg font-bold text-[#f4f4f6] font-sans">Apiary Gateway Hub</h3>
              <p className="text-xs text-[#8a90a0] font-mono leading-relaxed">
                Weatherproof mast station with Antmicro Raspberry Pi CM4 baseboard, 6 TOPS neural accelerator, SQLite WAL database, and sub-GHz LoRa receiver.
              </p>
              <div className="text-[10px] font-mono text-[#8a90a0] pt-2 border-t border-[#1e2330]">
                Inference: <span className="text-[#f0b840] font-bold">8.20 ms INT8 TorchScript</span>
              </div>
            </div>
          </div>

          {/* Card 3: Antmicro Custom Carrier PCB */}
          <div className="bg-[#12151e] border border-[#222632] rounded-sm overflow-hidden flex flex-col justify-between">
            <div className="relative h-60 w-full bg-[#0a0d14]">
              <Image
                src="/images/hardware/cm4-baseboard-render.png"
                alt="Antmicro CM4 Baseboard PCB"
                fill
                className="object-contain p-4 filter brightness-95"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute top-3 left-3 bg-[#0a0d14]/90 px-2 py-0.5 rounded-sm text-[9px] font-mono text-[#f0b840] border border-[#f0b840]/30">
                OPEN HARDWARE CAD
              </div>
            </div>

            <div className="p-6 space-y-3">
              <span className="text-[10px] font-mono text-[#8a90a0] uppercase block">SILICON CARRIER</span>
              <h3 className="text-lg font-bold text-[#f4f4f6] font-sans">CM4 Baseboard Carrier</h3>
              <p className="text-xs text-[#8a90a0] font-mono leading-relaxed">
                Industrial power conditioning, dual isolated I2C buses, high-speed SPI, and Gigabit Ethernet supporting 100-hive telemetry streams.
              </p>
              <div className="text-[10px] font-mono text-[#8a90a0] pt-2 border-t border-[#1e2330]">
                OS: <span className="text-[#f4f4f6] font-bold">Debian 64-bit with OverlayFS</span>
              </div>
            </div>
          </div>

        </div>

        {/* Verification Status Legend & GitHub Callout */}
        <div className="bg-[#12151e] border border-[#222632] p-6 sm:p-8 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#f4f4f6] uppercase block">
              Built in Public. Verified in the Field.
            </span>
            <p className="text-xs text-[#8a90a0] font-mono">
              Complete firmware source, KiCad PCB schematics, TFLite models, and enclosure CAD files are open-source.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/atharveeee-netizen/beevil-knievel"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0a0d14] hover:bg-[#1a1e2a] border border-[#2e3444] text-[#f4f4f6] text-xs font-mono uppercase tracking-wider rounded-sm transition-colors"
            >
              <span>GitHub Repository</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8a90a0]" />
            </a>

            <Link
              href="/app"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#f0b840] hover:bg-[#f8c454] text-[#0a0d14] text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-colors"
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
