"use client";

import React from "react";
import Link from "next/link";
import { Heart, Sparkles, Compass, ShieldCheck, Terminal, BookOpen, Award, CheckCircle2 } from "lucide-react";

export function MissionSection() {
  return (
    <section
      id="our_mission"
      className="bg-[#212223] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10"
    >
      <div className="max-w-4xl mx-auto space-y-20">
        
        {/* 1. The Heritage & Animated Quote */}
        <div className="space-y-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-[#ffc833] text-[#312f28] px-4 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>2,000-Year Heritage of Apiculture</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Our Mission.
          </h2>

          {/* Animated Heritage Quote Card */}
          <div className="relative my-4 p-8 sm:p-12 max-w-3xl bg-[#7a8085] rounded-[36px] shadow-2xl border border-white/10 animate-blobble flex flex-col items-center justify-center text-center">
            <blockquote className="text-lg sm:text-2xl font-bold leading-relaxed text-white">
              &ldquo;Over 2,000 years ago, Marcus Terentius Varro wrote that the survival of agriculture is bound to the murmur of the hive. We gave that murmur a voice.&rdquo;
            </blockquote>
            <div className="mt-4 text-xs font-mono font-bold tracking-widest text-[#ffc833] uppercase">
              — Marcus Terentius Varro (116–27 BC) • De Re Rustica
            </div>
          </div>
        </div>

        {/* 2. Our Approach / How It Works (Normal, clean naming) */}
        <div className="space-y-8 bg-[#1d1c18] border border-white/15 p-8 sm:p-12 rounded-3xl shadow-xl">
          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              How Beevil Knievel Works
            </h3>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal">
              Honeybees pollinate over 75% of global food crops, yet commercial and wild colonies face catastrophic annual losses from <em>Varroa destructor</em> mites, foulbrood pathogens, and climate stress. Traditional beekeeping requires tearing hives apart, stressing the brood nest and disrupting colony thermoregulation.
            </p>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal">
              <strong>Beevil Knievel</strong> combines non-invasive physical sensing with continuous acoustic Edge AI. By fusing 16 multi-sensor physical telemetry channels with on-device intelligence, we provide beekeepers with instant health diagnostics 24/7 without opening the hive.
            </p>
          </div>

          {/* 3 Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
            <div className="space-y-2">
              <div className="text-sm font-bold text-[#ffc833] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>100% Real-World Data</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                Zero synthetic data. Over 1,050,000 real field telemetry records tested on unseen apiaries.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-bold text-[#ffc833] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Non-Invasive Sensing</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                Mounts in seconds on any standard hive. Solar-powered for 3.2+ years of continuous autonomy.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-bold text-[#ffc833] flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Sub-Second Edge AI</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                Instant 3.35 ms on-premise inference with 96.84% accuracy and 100% queenless recall.
              </p>
            </div>
          </div>

          {/* Contact / Links */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
            <Link
              href="#need-help"
              className="btn-pill-yellow text-xs font-bold py-2.5 px-6 inline-flex items-center gap-2"
            >
              <span>Get in Touch with Our Team</span>
            </Link>
            <span className="text-xs text-white/60 font-mono">
              Designed &amp; Maintained by the Beevil Knievel Team
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
