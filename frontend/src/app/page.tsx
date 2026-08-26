"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { HorizontalScrollGallery } from "@/components/HorizontalScrollGallery";
import { SystemSection } from "@/components/SystemSection";
import { EdgeAISection } from "@/components/EdgeAISection";
import { SpecsSection } from "@/components/SpecsSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#070a12] text-[#f8fafc]">
      {/* 1. Precision 48px Header with Live LoRa Link Status */}
      <Navbar />

      {/* Main Streamlined Narrative */}
      <main className="flex-grow">
        {/* 2. Command Telemetry Hero & 16-Col Bento HUD */}
        <HeroSection />

        {/* 3. Sticky 300vh Horizontal Parallax Hardware Stream (Powered by Motion) */}
        <HorizontalScrollGallery />

        {/* 4. Exploded 3-Tier Hardware Architecture & Pinouts */}
        <SystemSection />

        {/* 5. Dual-Tier Edge AI & 8 Diagnostic Neural Classifiers */}
        <EdgeAISection />

        {/* 6. Engineering Specifications & Traceable Carbon Data Table */}
        <SpecsSection />
      </main>

      {/* 7. IBM Carbon Enterprise Footer */}
      <Footer />
    </div>
  );
}
