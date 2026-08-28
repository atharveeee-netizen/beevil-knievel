"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Award, ArrowRight, BookOpen } from "lucide-react";

export function EducationSection() {
  return (
    <section
      id="education"
      className="bg-[#21c6a9] text-[#127866] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t-2 border-black/10"
    >
      <div className="max-w-4xl mx-auto space-y-8 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 bg-[#127866] text-white px-4 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
          <GraduationCap className="w-4 h-4 text-[#ffc833]" />
          <span>University Research &amp; Apiculture Programs</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0b4d41]">
          Beevil for Research &amp; Academia
        </h2>

        <h3 className="text-xl sm:text-3xl font-extrabold text-[#0d594b] max-w-3xl leading-snug">
          Calibrated physical sensors and open Edge-AI models designed for university pollination biology.
        </h3>

        <p className="text-lg sm:text-xl font-medium text-[#0b4d41]/90 max-w-2xl leading-relaxed">
          With Beevil Knievel, research teams gather verifiable acoustic WAV files, temperature gradients, and VOC gas dynamics across hundreds of colonies. All datasets export in standard CSV, NumPy, and PyTorch tensors for published peer-reviewed science.
        </p>

        {/* Education Discount Callout */}
        <div className="bg-white/80 backdrop-blur-sm border-2 border-[#127866]/30 p-5 rounded-2xl max-w-xl text-center shadow-sm">
          <div className="inline-flex items-center gap-2 text-sm font-bold text-[#0d594b]">
            <Award className="w-4 h-4 text-[#ffc833] fill-[#ffc833]" />
            <span>15% Academic Research Grant Discount</span>
          </div>
          <p className="text-sm font-medium text-[#0b4d41]/90 mt-1">
            Entomology departments, USDA/EU research stations, and non-profit bee reserves receive 15% off all hardware nodes and gateways!
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="#need-help"
            className="btn-pill-aqua-dark inline-flex items-center gap-2 text-lg shadow-md hover:shadow-lg"
          >
            <span>Apply for Research Pricing</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
