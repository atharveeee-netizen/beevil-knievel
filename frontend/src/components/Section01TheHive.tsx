"use client";

import React from "react";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

export function Section01TheHive() {
  return (
    <section id="the-hive" className="py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#222632]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Editorial Narrative */}
        <div className="lg:col-span-6 space-y-6">
          <div className="text-[11px] font-mono tracking-widest text-[#8a90a0] uppercase">
            01 - THE HIVE
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4f4f6] font-sans uppercase leading-tight">
            The most important changes inside a colony aren&apos;t always visible from outside.
          </h2>

          <p className="text-sm sm:text-base text-[#8a90a0] font-mono leading-relaxed">
            A honeybee colony is a biological superorganism. It maintains a strict 34.8°C core temperature, shifts wing-beat acoustic harmonics before swarming, and alters respiration gases during brood development.
          </p>

          <p className="text-sm sm:text-base text-[#8a90a0] font-mono leading-relaxed">
            By the time a queen failure, swarm flight, or robbing frenzy is noticeable from the outside flight board, the critical intervention window has already closed.
          </p>

          <div className="pt-2">
            <div className="p-4 rounded-sm bg-[#12151e] border border-[#222632] text-xs font-mono text-[#f4f4f6] space-y-1">
              <span className="text-[#f0b840] font-bold block uppercase text-[10px]">THE FIELD CHALLENGE</span>
              <span>Opening 100 hives manually breaks the propolis thermal seal, chills young larvae, and takes 40+ hours of physical box lifting in 38°C summer heat.</span>
            </div>
          </div>
        </div>

        {/* Right Macro Biological / Hardware Imagery */}
        <div className="lg:col-span-6 relative h-[380px] sm:h-[460px] rounded-sm overflow-hidden border border-[#222632] bg-[#12151e]">
          <Image
            src={getAssetPath("/images/hardware/beevil_detect_macro.jpg")}
            alt="Honeybee colony acoustic and thermal observation inside the brood chamber"
            fill
            className="object-cover object-center filter brightness-95"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute bottom-3 left-3 bg-[#0a0d14]/95 px-3 py-1 rounded-sm border border-[#2e3444] text-[10px] font-mono text-[#8a90a0]">
            IN-SITU BROOD CHAMBER SENSING • NON-INVASIVE
          </div>
        </div>

      </div>
    </section>
  );
}
