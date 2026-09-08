import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { SensingMatrixSection } from "@/components/SensingMatrixSection";
import { AcousticIntelligenceSection } from "@/components/AcousticIntelligenceSection";
import { ThermalThermodynamicsSection } from "@/components/ThermalThermodynamicsSection";
import { FieldNodeSection } from "@/components/FieldNodeSection";
import { DualRadioNetworkSection } from "@/components/DualRadioNetworkSection";
import { GatewayEdgeSection } from "@/components/GatewayEdgeSection";
import { EdgeDiagnosticsSection } from "@/components/EdgeDiagnosticsSection";
import { MultiPhysicsSimulationSection } from "@/components/MultiPhysicsSimulationSection";
import { ValidationEvidenceSection } from "@/components/ValidationEvidenceSection";
import { PrototypeBenchSection } from "@/components/PrototypeBenchSection";
import { TechnicalDocsSection } from "@/components/TechnicalDocsSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090b10] text-[#f1f5f9] font-sans selection:bg-[#f59e0b] selection:text-[#090b10]">
      {/* Top Technical Navigation */}
      <Navbar />

      {/* Main Narrative Pipeline: Problem -> Transduction -> DSP -> Radio -> Gateway -> Simulation -> Evidence */}
      <main className="flex-grow">
        {/* 00. Hero Section & System Identification */}
        <HeroSection />

        {/* 01. Problem: Commercial Apiary Mortality & Observability Gap */}
        <ProblemSection />

        {/* 02. In-Hive Transducers: Multi-Modal Sensor Matrix & 10-Frame Cutaway */}
        <SensingMatrixSection />

        {/* 03. Acoustic DSP: CMSIS-DSP 256-pt Real FFT & Biological Sub-Bands */}
        <AcousticIntelligenceSection />

        {/* 04. Thermodynamics: 2-Node Lumped Model & CUSUM Brood Filter */}
        <ThermalThermodynamicsSection />

        {/* 05. Field Node: RAK4631, SX1262, Power Gating & 300s Duty Cycle */}
        <FieldNodeSection />

        {/* 06. Dual-Radio: BLE Mesh Intra-Yard + LoRa Star Backhaul */}
        <DualRadioNetworkSection />

        {/* 07. Edge Gateway: Raspberry Pi 3B+, SQLite WAL & OverlayFS Root */}
        <GatewayEdgeSection />

        {/* 08. Edge Diagnostics: 8-State Multi-Modal Decision Engine */}
        <EdgeDiagnosticsSection />

        {/* 09. Multi-Physics: 11 ANSYS FEA/CFD Simulation Domains */}
        <MultiPhysicsSimulationSection />

        {/* 10. Engineering Validation Matrix & Claims Evidence Ledger */}
        <ValidationEvidenceSection />

        {/* 11. Hardware Bring-Up Report & Physical Bench Prototype Status */}
        <PrototypeBenchSection />

        {/* 12. Reproducibility Suite & 13 Canonical Figures Index */}
        <TechnicalDocsSection />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}
