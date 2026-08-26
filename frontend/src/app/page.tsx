"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SystemSection } from "@/components/SystemSection";
import { EdgeAISection } from "@/components/EdgeAISection";
import { CatalogSection } from "@/components/CatalogSection";
import { DeveloperSection } from "@/components/DeveloperSection";
import { EducationSection } from "@/components/EducationSection";
import { OrderAccessoriesSection } from "@/components/OrderAccessoriesSection";
import { SpecsSection } from "@/components/SpecsSection";
import { GallerySection } from "@/components/GallerySection";
import { MissionSection } from "@/components/MissionSection";
import { NewsletterAndHelpSection } from "@/components/NewsletterAndHelpSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#070a12] text-[#f8fafc]">
      {/* Top Sticky Navbar with Universal Search */}
      <Navbar />

      {/* Main Page Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section with Live Telemetry & Bento Grid */}
        <HeroSection />

        {/* 2. Hardware Architecture & Sensor Suite */}
        <SystemSection />

        {/* 3. Edge AI Intelligence & 8 Diagnostic Models */}
        <EdgeAISection />

        {/* 4. Model Variations by Hive Count (Catalog) */}
        <CatalogSection />

        {/* 5. Open Apiculture SDK & HiveOS App */}
        <DeveloperSection />

        {/* 6. University Research & Education Program */}
        <EducationSection />

        {/* 7. Hardware Packages & Antmicro CM4 Gateway */}
        <OrderAccessoriesSection />

        {/* 8. Master Hardware & Software Specifications */}
        <SpecsSection />

        {/* 9. Hardware Gallery */}
        <GallerySection />

        {/* 10. Consolidated Mission & Marcus Varro 2,000-Year Heritage */}
        <MissionSection />

        {/* 11. Research Newsletter & Support Portal */}
        <NewsletterAndHelpSection />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}
