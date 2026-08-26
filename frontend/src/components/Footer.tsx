"use client";

import React from "react";
import Link from "next/link";
import { SpotlightCard, DecryptedText, ShinyText, ClickSpark, Magnet } from "@/components/reactbits";
import { Sparkles, ExternalLink, Laptop } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#070a12] text-[#94a3b8] py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-[1360px] mx-auto space-y-12">
        
        {/* Top Brand Info, Live Status & Attribution */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-8 border-b border-white/10 text-xs">
          <div className="space-y-2 max-w-xl text-left">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#f8fafc] text-base tracking-tight font-sans">
                BEEVIL KNIEVEL<span className="text-amber-400 ml-0.5">&reg;</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>100/100 Mesh Nodes Operational</span>
              </span>
            </div>
            <p className="text-[#94a3b8] text-xs leading-relaxed">
              Autonomous Edge-AI Environmental &amp; Acoustic Health Monitoring System for Precision Apiculture. Fusing TI TMP117, Sensirion SCD41, Bosch BME688, TDK INMP441, and Avia HX711 with on-device Nordic nRF52840 TinyML triage and Antmicro CM4 6 TOPS Gateway inference.
            </p>
            <p className="text-slate-500 text-[11px] font-mono">
              &copy; {new Date().getFullYear()} Beevil Knievel Engineering Team. Grounded in Robu.in, Amazon, and PCBPower Verified BOM.
            </p>
          </div>

          <div className="space-y-2 text-left lg:text-right font-mono text-xs text-[#94a3b8]">
            <div className="flex items-center lg:justify-end gap-1.5 text-amber-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>IEEE HardwAIre Challenge Phase 2 Standard</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Antmicro CM4 Baseboard (Rev 1.0.5) • Semtech SX1262 LoRaWAN IN865 (+22 dBm)
            </p>
            <p>
              <Link
                href="https://github.com/atharveeee-netizen/beevil-knievel"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold"
              >
                <span>github.com/atharveeee-netizen/beevil-knievel</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </p>
          </div>
        </div>

        {/* 4-Column Enterprise Sitemap */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm text-left">
          {/* Column 1 */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
              BOM Silicon Stack
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#the_system" className="text-[#94a3b8] hover:text-[#f8fafc] transition-colors">
                  TI TMP117 ±0.05°C RTD
                </Link>
              </li>
              <li>
                <Link href="#the_system" className="text-[#94a3b8] hover:text-[#f8fafc] transition-colors">
                  Sensirion SCD41 NDIR CO2
                </Link>
              </li>
              <li>
                <Link href="#the_system" className="text-[#94a3b8] hover:text-[#f8fafc] transition-colors">
                  Bosch BME688 MOX Scanner
                </Link>
              </li>
              <li>
                <Link href="#the_specs" className="text-[#94a3b8] hover:text-[#f8fafc] transition-colors">
                  Antmicro CM4 6 TOPS Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
              Fleet &amp; Applications
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/app" className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1">
                  <Laptop className="w-3 h-3" />
                  <span>HiveOS App (/app)</span>
                </Link>
              </li>
              <li>
                <Link href="#catalog" className="text-[#94a3b8] hover:text-[#f8fafc] transition-colors">
                  Beevil Solo (1-4 Hives)
                </Link>
              </li>
              <li>
                <Link href="#catalog" className="text-[#94a3b8] hover:text-[#f8fafc] transition-colors">
                  Apiary Pro (5-25 Hives)
                </Link>
              </li>
              <li>
                <Link href="#catalog" className="text-[#94a3b8] hover:text-[#f8fafc] transition-colors">
                  Pollination Grid (25-100+)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
              Research &amp; Provenance
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="https://github.com/atharveeee-netizen/beevil-knievel/tree/main/datasets" target="_blank" rel="noopener noreferrer" className="text-[#94a3b8] hover:text-[#f8fafc] transition-colors">
                  1.05M Field Dataset
                </Link>
              </li>
              <li>
                <Link href="#honey_chain" className="text-[#94a3b8] hover:text-[#f8fafc] transition-colors">
                  SHA-256 Merkle Ledger
                </Link>
              </li>
              <li>
                <Link href="#edge_ai" className="text-[#94a3b8] hover:text-[#f8fafc] transition-colors">
                  GroupKFold Validation
                </Link>
              </li>
              <li>
                <Link href="#our_mission" className="text-[#94a3b8] hover:text-[#f8fafc] transition-colors">
                  Marcus Varro Heritage
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
              Hardware Repositories
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="https://github.com/atharveeee-netizen/beevil-knievel" target="_blank" rel="noopener noreferrer" className="text-[#94a3b8] hover:text-[#f8fafc] transition-colors">
                  GitHub Project Core
                </Link>
              </li>
              <li>
                <Link href="https://github.com/atharveeee-netizen/beevil-knievel/issues" target="_blank" rel="noopener noreferrer" className="text-[#94a3b8] hover:text-[#f8fafc] transition-colors">
                  Issue Tracker
                </Link>
              </li>
              <li>
                <Link href="https://github.com/antmicro/cm4-baseboard" target="_blank" rel="noopener noreferrer" className="text-[#94a3b8] hover:text-[#f8fafc] transition-colors">
                  Antmicro CM4 Baseboard
                </Link>
              </li>
              <li>
                <Link href="#need-help" className="text-[#94a3b8] hover:text-[#f8fafc] transition-colors">
                  Contact Engineering
                </Link>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
}
