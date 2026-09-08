"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Cpu, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { StatusDot } from "@/components/ui/StatusDot";

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 border-b border-[#283144] bg-[#090b10] text-[#f1f5f9] overflow-hidden">
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 tech-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        
        {/* Verification Status Banner */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3 py-1.5 rounded-xs bg-[#11141d] border border-[#283144] text-[11px] font-mono text-[#94a3b8] mb-6">
          <StatusDot status="normal" size="sm" showLabel={false} pulse />
          <span className="text-[#f1f5f9] font-bold">IEEE HARDWAIre Challenge Phase 2</span>
          <span className="text-[#64748b]">•</span>
          <span className="text-[#ffc833] font-semibold">Bench Evaluation Prototype Rev 2.1</span>
          <span className="text-[#64748b]">•</span>
          <Badge claim="VALIDATED" size="sm">Audited Standards</Badge>
        </div>

        {/* Primary Identification */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#f1f5f9] font-mono uppercase mb-4">
          BEEVIL KNIEVEL
        </h1>

        {/* System Subtitle */}
        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-[#ffc833] max-w-4xl font-mono uppercase mb-4">
          Sub-GHz Acoustic &amp; Brood Telemetry for Commercial Apiaries
        </h2>

        {/* Secondary Technical Statement */}
        <p className="text-sm sm:text-base md:text-lg text-[#94a3b8] max-w-3xl font-sans leading-relaxed mb-8">
          Continuous hive-state monitoring through precision temperature, acoustic, environmental, weight and motion signals. Grounded in 13 canonical MATLAB engineering proofs, 11 ANSYS multi-physics simulation domains, and zero cloud reliance.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-2xl mb-12">
          <Link
            href="/field"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xs bg-[#f59e0b] hover:bg-[#d97706] text-[#090b10] font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors shadow-sm"
          >
            <span>Launch Field App (/field)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/console"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xs bg-[#181d28] hover:bg-[#222938] border border-[#283144] hover:border-[#3d4964] text-[#f1f5f9] font-mono font-semibold text-xs sm:text-sm uppercase tracking-wider transition-colors"
          >
            <Cpu className="w-4 h-4 text-[#ffc833]" />
            <span>Operations Console (/console)</span>
          </Link>

          <a
            href="https://github.com/atharveeee-netizen/beevil-knievel/raw/main/submission/hart_phase2_report.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xs bg-transparent hover:bg-[#141824] border border-[#283144] text-[#94a3b8] hover:text-[#f1f5f9] font-mono text-xs uppercase tracking-wider transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>IEEE Report PDF</span>
          </a>
        </div>

        {/* Quantitative Performance KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-5xl mb-12 font-mono text-left">
          <div className="p-3.5 rounded-xs bg-[#11141d] border border-[#283144]">
            <div className="text-[10px] text-[#64748b] uppercase tracking-wider">Brood Homeostasis</div>
            <div className="text-xl sm:text-2xl font-bold text-[#10b981] font-tabular mt-0.5">34.5°C</div>
            <div className="text-[10px] text-[#94a3b8] mt-1 flex items-center justify-between">
              <span>±0.1°C NIST RTD</span>
              <Badge claim="VALIDATED" size="sm">TMP117</Badge>
            </div>
          </div>

          <div className="p-3.5 rounded-xs bg-[#11141d] border border-[#283144]">
            <div className="text-[10px] text-[#64748b] uppercase tracking-wider">Deep Sleep Current</div>
            <div className="text-xl sm:text-2xl font-bold text-[#38bdf8] font-tabular mt-0.5">2.0 μA</div>
            <div className="text-[10px] text-[#94a3b8] mt-1 flex items-center justify-between">
              <span>96.5% Duty Rest</span>
              <Badge claim="CALCULATED" size="sm">RaK4631</Badge>
            </div>
          </div>

          <div className="p-3.5 rounded-xs bg-[#11141d] border border-[#283144]">
            <div className="text-[10px] text-[#64748b] uppercase tracking-wider">Acoustic FFT Res</div>
            <div className="text-xl sm:text-2xl font-bold text-[#fbbf24] font-tabular mt-0.5">7.81 Hz</div>
            <div className="text-[10px] text-[#94a3b8] mt-1 flex items-center justify-between">
              <span>256-pt CMSIS-DSP</span>
              <Badge claim="VALIDATED" size="sm">ARM M4F</Badge>
            </div>
          </div>

          <div className="p-3.5 rounded-xs bg-[#11141d] border border-[#283144]">
            <div className="text-[10px] text-[#64748b] uppercase tracking-wider">Sub-GHz Link Margin</div>
            <div className="text-xl sm:text-2xl font-bold text-[#a78bfa] font-tabular mt-0.5">+26.1 dB</div>
            <div className="text-[10px] text-[#94a3b8] mt-1 flex items-center justify-between">
              <span>4.2 km LOS SF7</span>
              <Badge claim="CALCULATED" size="sm">SX1262</Badge>
            </div>
          </div>
        </div>

        {/* Canonical Architecture Figure Display */}
        <div className="w-full max-w-5xl rounded-sm border border-[#283144] bg-[#11141d] overflow-hidden shadow-xl text-left">
          <div className="px-4 py-2.5 border-b border-[#283144] bg-[#141824] flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#f1f5f9]">
                Canonical Figure 0.1: 3-Tier Multi-Modal Cyber-Physical Telemetry Platform
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-[#94a3b8]">
              <span>MATLAB Source Vector</span>
              <span>•</span>
              <a
                href="/figures/canonical/01_system_architecture.svg"
                target="_blank"
                className="text-[#ffc833] hover:underline"
              >
                View Raw SVG
              </a>
            </div>
          </div>

          <div className="p-4 sm:p-6 bg-[#ffffff] flex items-center justify-center">
            {/* Direct Vector SVG Rendering */}
            <img
              src="/figures/canonical/01_system_architecture.svg"
              alt="BEEVIL KNIEVEL System Architecture: In-Hive Transducers, Field Telemetry Node, Dual-Radio Hybrid, Hardened Edge Gateway"
              className="w-full h-auto max-h-[480px] object-contain"
            />
          </div>

          <div className="px-4 py-2.5 border-t border-[#283144] bg-[#0d1017] text-[11px] font-mono text-[#64748b] flex flex-wrap items-center justify-between gap-2">
            <span>Transduction: I2C/I2S/1-Wire DMA → CMSIS-DSP FFT → SX1262 LoRa Star Backhaul → RPi 3B+ SQLite WAL</span>
            <Badge claim="VALIDATED" size="sm">Canonical Architecture</Badge>
          </div>
        </div>

      </div>
    </section>
  );
}
