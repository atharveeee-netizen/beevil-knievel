"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ChevronRight } from "lucide-react";
import { DeviceMockup } from "./DeviceMockup";

export function Section06TheField() {
  return (
    <section id="the-field" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#222738]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Workflow Narrative */}
        <div className="space-y-6 lg:col-span-6">
          <div className="text-[11px] font-mono tracking-widest text-[#8a90a0] uppercase">
            06 - FIELD CONSOLE
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4f4f6] font-sans uppercase leading-tight">
            The beekeeper makes the decision.
          </h2>

          <p className="text-sm sm:text-base text-[#8a90a0] font-mono leading-relaxed">
            The hardware measures data. The beekeeper makes the call. The app eliminates blind box inspections.
          </p>

          <div className="space-y-4 pt-2">
            {[
              {
                q: "1. What Needs Work?",
                a: "Triage lists the 4 problem hives out of 100 on a high-contrast screen readable in direct sunlight.",
              },
              {
                q: "2. What Is The Cause?",
                a: "128-point FFT, 5-point brood temperature, and CO2 levels show the biological cause.",
              },
              {
                q: "3. What Action To Take?",
                a: "Step-by-step field steps: Demaree split, queen introduction, formic acid treatment, or super addition.",
              },
            ].map((item) => (
              <div key={item.q} className="p-4 bg-[#12151e] border border-[#222738] rounded-sm space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2ea043]" />
                  <span>{item.q}</span>
                </div>
                <p className="text-xs font-mono text-[#8a90a0] pl-5.5 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/app"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#f0b840] hover:bg-[#f8c454] text-[#0a0d14] font-bold text-xs font-mono uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0b840]"
            >
              <span>Open Field Console (/app)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Phone Mockup Rendering Live Telemetry */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[340px] sm:max-w-[380px]">
            <DeviceMockup />
          </div>
        </div>

      </div>
    </section>
  );
}
