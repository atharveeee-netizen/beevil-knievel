"use client";

import React from "react";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

export function Section01TheHive() {
  return (
    <section id="the-hive" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#222738]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Narrative */}
        <div className="space-y-5 lg:col-span-6">
          <div className="text-[11px] font-mono tracking-widest text-[#8a90a0] uppercase">
            01 - THE BROOD NEST
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4f4f6] font-sans uppercase leading-tight">
            Colony collapse starts inside the brood chamber.
          </h2>

          <p className="text-sm sm:text-base text-[#8a90a0] font-mono leading-relaxed">
            A healthy colony regulates core brood temperature to 34.8°C, hums between 220 and 250 Hz, and exhausts carbon dioxide during brood cycles.
          </p>

          <p className="text-sm sm:text-base text-[#8a90a0] font-mono leading-relaxed">
            When symptoms show at the hive entrance - beard clusters, reduced flight, or robbing bees - the queen has failed or half the worker bees have swarmed.
          </p>

          <div className="pt-2">
            <div className="p-4 rounded-sm bg-[#12151e] border border-[#222738] text-xs font-mono text-[#f4f4f6] space-y-1">
              <span className="text-[#f0b840] font-bold block uppercase text-[10px]">THE BEEKEEPER&apos;S PROBLEM</span>
              <span className="text-[#8a90a0]">Opening 100 hives tears propolis seals, chills larvae, and takes 40 hours of box lifting in 38°C heat.</span>
            </div>
          </div>
        </div>

        {/* Right Macro Biological / Hardware Imagery */}
        <div className="lg:col-span-6 relative h-[360px] sm:h-[440px] rounded-sm overflow-hidden border border-[#222738] bg-[#12151e]">
          <Image
            src={getAssetPath("/images/hardware/beevil_detect_macro.jpg")}
            alt="Honeybee colony acoustic and thermal observation inside the brood chamber"
            fill
            className="object-cover object-center filter brightness-95"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute bottom-3 left-3 bg-[#0a0d14]/90 backdrop-blur-md px-3 py-1 rounded-sm border border-[#222738] text-[10px] font-mono text-[#8a90a0]">
            BROOD SENSORS • ZERO SEAL DISRUPTION
          </div>
        </div>

      </div>
    </section>
  );
}
