"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Award, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";

export function EducationSection() {
  return (
    <section
      id="education"
      className="bg-[#0f172a] text-slate-100 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-slate-800"
    >
      <div className="max-w-4xl mx-auto space-y-8 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 bg-slate-900 border border-emerald-500/30 text-emerald-400 px-4 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
          <GraduationCap className="w-4 h-4 text-emerald-400" />
          <span>University Research &amp; Apiculture Programs</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-sans">
          Beevil for Research &amp; Academia
        </h2>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-200 max-w-3xl leading-relaxed">
          Calibrated physical sensors and open Edge-AI models designed for university pollination biology.
        </h3>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          With Beevil Knievel, research teams gather verifiable acoustic WAV files, temperature gradients, and VOC gas dynamics across hundreds of colonies. All datasets export in standard CSV, NumPy, and PyTorch tensors for published peer-reviewed science.
        </p>

        {/* Education Discount Callout */}
        <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl max-w-xl text-center shadow-xl">
          <div className="inline-flex items-center gap-2 text-sm font-bold text-[#ffc833]">
            <Award className="w-4 h-4 text-[#ffc833]" />
            <span>15% Academic Research Grant Discount</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
            Entomology departments, USDA/EU research stations, and non-profit bee reserves receive 15% off all hardware nodes and gateways!
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="#need-help"
            className="inline-flex items-center gap-2 bg-[#ffc833] hover:bg-amber-300 text-slate-950 font-bold text-base px-8 py-3.5 rounded-xl shadow-lg transition-all"
          >
            <span>Apply for Research Pricing</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

