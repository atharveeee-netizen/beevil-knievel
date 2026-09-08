import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { InspectionLimitsSection } from "@/components/InspectionLimitsSection";
import { OurApproachSection } from "@/components/OurApproachSection";
import { SensingMatrixSection } from "@/components/SensingMatrixSection";
import { ThermalThermodynamicsSection } from "@/components/ThermalThermodynamicsSection";
import { AcousticIntelligenceSection } from "@/components/AcousticIntelligenceSection";
import { FieldNodeSection } from "@/components/FieldNodeSection";
import { EmbeddedProcessingSection } from "@/components/EmbeddedProcessingSection";
import { DualRadioNetworkSection } from "@/components/DualRadioNetworkSection";
import { GatewayEdgeSection } from "@/components/GatewayEdgeSection";
import { EdgeDiagnosticsSection } from "@/components/EdgeDiagnosticsSection";
import { MultiHiveNetworkSection } from "@/components/MultiHiveNetworkSection";
import { MultiPhysicsSimulationSection } from "@/components/MultiPhysicsSimulationSection";
import { ValidationEvidenceSection } from "@/components/ValidationEvidenceSection";
import { PrototypeBenchSection } from "@/components/PrototypeBenchSection";
import { ResultsSection } from "@/components/ResultsSection";
import { TechnicalDocsSection } from "@/components/TechnicalDocsSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090b10] text-[#f1f5f9] font-sans selection:bg-[#f59e0b] selection:text-[#090b10]">
      {/* Top Technical Navigation */}
      <Navbar />

      {/* Main Narrative Pipeline: 16 Chronological Stages (IEEE HART Phase 2 Standard) */}
      <main className="flex-grow">
        {/* 00. Hero Section: System Identification & Evaluation Prototype Status */}
        <HeroSection />

        {/* 01. The Problem: Commercial Apiary Mortality & Observability Gap */}
        <ProblemSection />

        {/* 02. Why Current Inspection Is Limited: Frame Pulls, Audio Loggers, Cloud Systems */}
        <InspectionLimitsSection />

        {/* 03. Our Approach: 3-Tier Cyber-Physical Pipeline & End-to-End Dataflow */}
        <OurApproachSection />

        {/* 04A. Where We Measure: In-Hive Sensor Matrix & 10-Frame Cutaway */}
        <SensingMatrixSection />

        {/* 04B. Thermal Modeling: Brood Nest Thermoregulation & CUSUM Drift Filter */}
        <ThermalThermodynamicsSection />

        {/* 05. Acoustic Signal: CMSIS-DSP 256-pt Real FFT & Biological Sub-Bands */}
        <AcousticIntelligenceSection />

        {/* 06. Sensor Node: RAK4631 nRF52840, Power Gating & Hardware Architecture */}
        <FieldNodeSection />

        {/* 07. Embedded DSP: State Machine Execution & 300s Power Duty Cycle */}
        <EmbeddedProcessingSection />

        {/* 08. Wireless Link: Sub-GHz LoRa Star Backhaul & Local BLE Topology */}
        <DualRadioNetworkSection />

        {/* 09. Receiver / Gateway: Hardened Base Station, SQLite WAL & OverlayFS */}
        <GatewayEdgeSection />

        {/* 10. Analytics / AI: Multi-Modal Diagnostics & 5-Tier Truth Taxonomy */}
        <EdgeDiagnosticsSection />

        {/* 11. Multi-Hive System: 100-Hive Scalable Apiary Star Topology */}
        <MultiHiveNetworkSection />

        {/* 12. Simulation: 11 ANSYS Multi-Physics FEA/CFD Simulation Domains */}
        <MultiPhysicsSimulationSection />

        {/* 13. Validation: Claims vs. Empirical & Mathematical Evidence Ledger */}
        <ValidationEvidenceSection />

        {/* 14. Prototype: Bench Prototype Bring-Up Reality & Report Previews */}
        <PrototypeBenchSection />

        {/* 15. Results: Defensible Performance Tables (Measured / Calculated / Simulated / Estimated) */}
        <ResultsSection />

        {/* 16. Technical Documentation: Reproducibility Suite & 13 Canonical Figures */}
        <TechnicalDocsSection />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}
