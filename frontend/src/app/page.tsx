"use client";

import React from "react";
import { ProductNavbar } from "@/components/ProductNavbar";
import { ProductHero } from "@/components/ProductHero";
import { Section01TheHive } from "@/components/Section01TheHive";
import { Section02TheSignal } from "@/components/Section02TheSignal";
import { Section03TheIntelligence } from "@/components/Section03TheIntelligence";
import { Section04TheNetwork } from "@/components/Section04TheNetwork";
import { Section05TheFleet } from "@/components/Section05TheFleet";
import { Section06TheField } from "@/components/Section06TheField";
import { Section07TheHardware } from "@/components/Section07TheHardware";
import { ProductFooter } from "@/components/ProductFooter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0d14] text-[#f4f4f6] selection:bg-[#f0b840] selection:text-[#0a0d14]">
      {/* Precision Product Header */}
      <ProductNavbar />

      {/* 7-Chapter World-Class Narrative */}
      <main className="flex-grow">
        {/* Hero: "KNOW WHAT'S HAPPENING INSIDE THE HIVE." */}
        <ProductHero />

        {/* 01 - THE HIVE: Biological Problem & Hidden Dynamics */}
        <Section01TheHive />

        {/* 02 - THE SIGNAL: Scientific Sensing Channels */}
        <Section02TheSignal />

        {/* 03 - THE INTELLIGENCE: Edge-First Local Inference */}
        <Section03TheIntelligence />

        {/* 04 - THE NETWORK: BeevilMesh Self-Healing Radio */}
        <Section04TheNetwork />

        {/* 05 - THE FLEET: Many Hives. One Intelligence Layer (100-Node Map) */}
        <Section05TheFleet />

        {/* 06 - THE FIELD: The Beekeeper Still Decides (Mobile Field Tool) */}
        <Section06TheField />

        {/* 07 - THE HARDWARE: Physical Hardware Breakdown & Open Engineering */}
        <Section07TheHardware />
      </main>

      {/* Quiet Minimal Footer */}
      <ProductFooter />
    </div>
  );
}
