"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AppExperienceSection } from "@/components/AppExperienceSection";
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

        {/* 3. Cal AI / Magic UI Mobile Experience & Feature Highlights */}
        <AppExperienceSection />

        {/* 4. Sticky 300vh Horizontal Parallax Hardware Stream (Motion) */}
        <HorizontalScrollGallery />

        {/* 5. Exploded 3-Tier Hardware Architecture & Pinouts */}
        <SystemSection />

        {/* 6. Dual-Tier Edge AI & 8 Diagnostic Neural Classifiers */}
        <EdgeAISection />

        {/* 7. Engineering Specifications & Traceable Carbon Data Table */}
        <SpecsSection />
      </main>

      {/* 8. IBM Carbon Enterprise Footer */}
      <Footer />
    </div>
  );
}
