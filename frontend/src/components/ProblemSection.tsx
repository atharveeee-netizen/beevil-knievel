import React from "react";
import { AlertTriangle, Clock, ThermometerSnowflake, Activity } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function ProblemSection() {
  return (
    <section id="problem" className="py-16 md:py-24 border-b border-[#283144] bg-[#0c0e14] text-[#f1f5f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#f59e0b] mb-1">
              01 — Ecological &amp; Agricultural Vulnerability
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono uppercase tracking-tight text-[#f1f5f9]">
              The Commercial Apiary Observability Gap
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge claim="VALIDATED">USDA-ARS Empirical Data</Badge>
          </div>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Context: The Economic Stakes */}
          <div className="lg:col-span-6 space-y-6 text-sm text-[#94a3b8] font-sans leading-relaxed">
            <p>
              Commercial honeybee (<em className="text-[#f1f5f9]">Apis mellifera</em>) pollination underpins over <strong className="text-[#f1f5f9]">$17 Billion USD</strong> in annual agricultural crop value across the United States alone—including 100% of commercial almond production, apples, berries, and seed crops.
            </p>
            <p>
              Despite this economic criticality, commercial migratory beekeeping operations experience unsustainable losses, averaging an alarming <strong className="text-[#ef4444]">55.6% overwinter colony mortality</strong> according to recent USDA-ARS and Bee Informed Partnership surveys.
            </p>

            {/* Authentic Photographic Evidence */}
            <div className="rounded-sm border border-[#283144] bg-[#11141d] overflow-hidden">
              <img
                src="/images/evidence/real_commercial_apiary.jpg"
                alt="Commercial migratory apiary operations in Montana rangeland (USDA NRCS)"
                className="w-full h-56 object-cover"
              />
              <div className="p-3 bg-[#0d1017] text-[11px] font-mono text-[#64748b] flex items-center justify-between">
                <span>Figure 1.1: Commercial apiary holding yard (100+ hives per site)</span>
                <span className="text-[#94a3b8]">Photo: USDA NRCS</span>
              </div>
            </div>
          </div>

          {/* Right Four Failure Modes */}
          <div className="lg:col-span-6 space-y-3 font-mono text-xs">
            
            <div className="p-4 rounded-sm bg-[#11141d] border border-[#283144]">
              <div className="flex items-center gap-2 text-[#f59e0b] font-bold text-sm mb-1">
                <Clock className="w-4 h-4" />
                <span>1. INFREQUENT DISCRETE INSPECTIONS</span>
              </div>
              <p className="text-[#94a3b8] font-sans text-xs leading-relaxed">
                Commercial apiaries operate at scales of 500 to 10,000 colonies. With labor constraints, human beekeepers can physically open and inspect brood boxes only every 14 to 21 days—leaving 95% of colony lifecycle transitions unobserved.
              </p>
            </div>

            <div className="p-4 rounded-sm bg-[#11141d] border border-[#283144]">
              <div className="flex items-center gap-2 text-[#ef4444] font-bold text-sm mb-1">
                <ThermometerSnowflake className="w-4 h-4" />
                <span>2. THERMAL &amp; BIOLOGICAL SHOCK</span>
              </div>
              <p className="text-[#94a3b8] font-sans text-xs leading-relaxed">
                Opening a hive breaks the propolis seal and violently vents the carefully maintained 34.5°C brood nest. Brood cluster temperatures can drop by up to -12°C during inspections, stunting larval development and requiring up to 6 hours of high metabolic heating to recover.
              </p>
            </div>

            <div className="p-4 rounded-sm bg-[#11141d] border border-[#283144]">
              <div className="flex items-center gap-2 text-[#fbbf24] font-bold text-sm mb-1">
                <Activity className="w-4 h-4" />
                <span>3. IMMINENT SWARM BLINDSPOTS</span>
              </div>
              <p className="text-[#94a3b8] font-sans text-xs leading-relaxed">
                Reproductive swarming results in the sudden loss of the queen and 50–70% of the worker population. The acoustic precursor (a dramatic 450 Hz harmonic surge) occurs within a narrow 24- to 48-hour window that bi-weekly manual inspections consistently miss.
              </p>
            </div>

            <div className="p-4 rounded-sm bg-[#11141d] border border-[#283144]">
              <div className="flex items-center gap-2 text-[#f87171] font-bold text-sm mb-1">
                <AlertTriangle className="w-4 h-4" />
                <span>4. UNDETECTED WINTER CLUSTER COLLAPSE</span>
              </div>
              <p className="text-[#94a3b8] font-sans text-xs leading-relaxed">
                Varroa destructor infestation, mite-vectored Deformed Wing Virus (DWV), and starvation manifest as gradual thermal cooling drifts (0.02°C/hr). Without continuous digital logging, colony death is discovered only upon opening dead-out boxes in spring.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
