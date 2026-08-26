"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Smartphone, CheckCircle2, ShieldCheck, Compass, Mic } from "lucide-react";
import { DeviceMockup } from "./DeviceMockup";

export function Section06TheField() {
  return (
    <section id="the-field" className="py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#222632]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Narrative */}
        <div className="lg:col-span-6 space-y-6">
          <div className="text-[11px] font-mono tracking-widest text-[#8a90a0] uppercase">
            06 - THE FIELD
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4f4f6] font-sans uppercase leading-tight">
            The beekeeper still decides.
          </h2>

          <p className="text-sm sm:text-base text-[#8a90a0] font-mono leading-relaxed">
            The system watches the hive. The beekeeper makes the decision. Beevil Knievel does not replace apicultural judgment; it eliminates the guesswork of blind hive inspections.
          </p>

          <div className="space-y-3 pt-2">
            {[
              {
                title: "What Needs Attention?",
                desc: "Exception-first triage surfaces the 4 anomalous colonies out of 100 on a single high-contrast screen.",
              },
              {
                title: "Why Is It Happening?",
                desc: "Instant bio-acoustic FFT, 5-point brood thermal gradient, and CO2 plume metrics explain root cause.",
              },
              {
                title: "What Should I Do?",
                desc: "Clear field protocols: artificial swarm split, queen replacement check, or honey super addition.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-[#12151e] border border-[#222632] p-4 rounded-sm space-y-1">
                <span className="text-xs font-bold text-[#f4f4f6] font-mono uppercase block">{item.title}</span>
                <p className="text-xs text-[#8a90a0] font-mono leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Link
              href="/app"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-[#f0b840] hover:bg-[#f8c454] text-[#0a0d14] font-bold text-xs font-mono uppercase tracking-wider transition-colors"
            >
              <span>Open Field Application (/app)</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Phone Mockup in Real Field Ergonomics */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="transform hover:scale-[1.02] transition-transform duration-300">
            <DeviceMockup screen="triage" />
          </div>
        </div>

      </div>
    </section>
  );
}
