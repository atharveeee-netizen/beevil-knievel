"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Activity, Terminal, ExternalLink, Cpu, Laptop, Layers } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#060911] text-slate-300 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Top Brand Info, Live Status & Attribution */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-8 border-b border-slate-800/80 text-xs">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-lg tracking-tight font-sans">
                Beevil Knievel<span className="text-[#ffc833] ml-0.5">&reg;</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>All 100 Mesh Nodes Operational</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Autonomous Edge-AI Environmental &amp; Acoustic Health Monitoring System for Precision Apiculture. Fusing TI TMP117, Sensirion SCD41, Bosch BME688, TDK INMP441, and Avia HX711 with on-device Nordic nRF52840 TinyML triage and Antmicro CM4 6 TOPS Gateway inference.
            </p>
            <p className="text-slate-500 text-[11px] font-mono">
              &copy; {new Date().getFullYear()} Beevil Knievel Engineering Team. Grounded in Robu.in &bull; Amazon &bull; PCBPower Verified BOM.
            </p>
          </div>

          <div className="space-y-2 text-left lg:text-right font-mono text-xs text-slate-400">
            <div className="flex items-center lg:justify-end gap-2 text-amber-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>IEEE HardwAIre Challenge Phase 2 Master Standard</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Standardized on Antmicro CM4 Baseboard (Rev 1.0.5) &bull; Semtech SX1262 LoRaWAN IN865 (+22 dBm)
            </p>
            <p>
              <Link
                href="https://github.com/atharveeee-netizen/beevil-knievel"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#ffc833] hover:underline font-bold"
              >
                <span>github.com/atharveeee-netizen/beevil-knievel</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </p>
          </div>
        </div>

        {/* 4-Column Enterprise Sitemap */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {/* Column 1 */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-[#ffc833] font-bold">
              BOM Silicon Stack
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#the_system" className="text-slate-400 hover:text-white transition-colors">
                  TI TMP117 ±0.05°C RTD
                </Link>
              </li>
              <li>
                <Link href="#the_system" className="text-slate-400 hover:text-white transition-colors">
                  Sensirion SCD41 NDIR CO2
                </Link>
              </li>
              <li>
                <Link href="#the_system" className="text-slate-400 hover:text-white transition-colors">
                  Bosch BME688 MOX Scanner
                </Link>
              </li>
              <li>
                <Link href="#the_specs" className="text-slate-400 hover:text-white transition-colors">
                  Antmicro CM4 6 TOPS Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-[#ffc833] font-bold">
              Fleet &amp; Applications
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/app" className="text-[#ffc833] hover:underline font-bold flex items-center gap-1">
                  <Laptop className="w-3 h-3" />
                  <span>HiveOS App (/app)</span>
                </Link>
              </li>
              <li>
                <Link href="#catalog" className="text-slate-400 hover:text-white transition-colors">
                  Beevil Solo (1-4 Hives)
                </Link>
              </li>
              <li>
                <Link href="#catalog" className="text-slate-400 hover:text-white transition-colors">
                  Apiary Pro (5-25 Hives)
                </Link>
              </li>
              <li>
                <Link href="#catalog" className="text-slate-400 hover:text-white transition-colors">
                  Pollination Grid (25-100+)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-[#ffc833] font-bold">
              Research &amp; Provenance
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="https://github.com/atharveeee-netizen/beevil-knievel/tree/main/datasets" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  1.05M Field Dataset
                </Link>
              </li>
              <li>
                <Link href="#honey_chain" className="text-slate-400 hover:text-white transition-colors">
                  SHA-256 Merkle Ledger
                </Link>
              </li>
              <li>
                <Link href="#edge_ai" className="text-slate-400 hover:text-white transition-colors">
                  GroupKFold Validation
                </Link>
              </li>
              <li>
                <Link href="#our_mission" className="text-slate-400 hover:text-white transition-colors">
                  Marcus Varro Heritage
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-[#ffc833] font-bold">
              Hardware Repositories
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="https://github.com/atharveeee-netizen/beevil-knievel" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  GitHub Project Core
                </Link>
              </li>
              <li>
                <Link href="https://github.com/atharveeee-netizen/beevil-knievel/issues" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  Issue Tracker
                </Link>
              </li>
              <li>
                <Link href="https://github.com/antmicro/cm4-baseboard" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  Antmicro CM4 Baseboard
                </Link>
              </li>
              <li>
                <Link href="#need-help" className="text-slate-400 hover:text-white transition-colors">
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


