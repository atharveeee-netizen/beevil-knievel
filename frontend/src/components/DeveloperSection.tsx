"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Code2, Monitor, Download, Laptop, Terminal, ExternalLink, ArrowRight } from "lucide-react";

export function DeveloperSection() {
  return (
    <section
      id="sdk"
      className="bg-[#0b101b] text-slate-100 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-slate-800"
    >
      <div className="max-w-5xl mx-auto space-y-24">
        
        {/* SDK & Open Research Stack */}
        <div className="space-y-8 max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-amber-500/30 text-[#ffc833] px-4 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Code2 className="w-4 h-4 text-amber-400" />
            <span>Open-Source Research Stack</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
            Build Your Own Hive Models.
          </h2>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl">
            Beevil Knievel is 100% open for research. Our Python, C++, and FreeRTOS libraries let university labs and commercial beekeepers train custom models on raw acoustic WAV and multi-modal sensor telemetry without vendor lock-in.
          </p>

          <div className="pt-2">
            <Link
              href="https://github.com/atharveeee-netizen/beevil-knievel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-base px-6 py-3.5 rounded-xl shadow-lg transition-all"
            >
              <Terminal className="w-5 h-5 text-[#ffc833]" />
              <span>Explore GitHub Repository &amp; SDK</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          {/* Model Benchmark Table Image */}
          <div className="my-6 w-full max-w-4xl h-[280px] sm:h-[420px] relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 p-2 group">
            <Image
              src="/images/hardware/tinyml_comparison_table.jpg"
              alt="Beevil Knievel TinyML Model Evaluation and Latency Benchmarks"
              fill
              className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 rounded-2xl"
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>
        </div>

        {/* HiveOS Desktop & Mobile Companion */}
        <div id="mirror" className="space-y-8 max-w-4xl mx-auto text-center flex flex-col items-center pt-16 border-t border-slate-800">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-emerald-500/30 text-emerald-400 px-4 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Laptop className="w-4 h-4 text-emerald-400" />
            <span>HiveOS Live Telemetry Console</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
            Real-Time Apiary Telemetry.
          </h2>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl">
            Monitor all your colonies in real-time with the <strong className="text-white">HiveOS App</strong>. Streams live acoustic spectrograms, brood temperatures, and swarm alerts directly from your Antmicro CM4 Gateway to macOS, Windows, Linux, iOS, and Android.
          </p>

          <div className="pt-2">
            <Link
              href="/app"
              className="inline-flex items-center gap-2 bg-[#ffc833] hover:bg-amber-300 text-slate-950 font-extrabold text-base px-8 py-3.5 rounded-xl shadow-lg transition-all"
            >
              <Monitor className="w-5 h-5 text-slate-950" />
              <span>Launch HiveOS Console (/app)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Gateway Hub Photo */}
          <div className="my-6 w-full max-w-3xl h-[260px] sm:h-[380px] relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 p-2 group">
            <Image
              src="/images/hardware/beevil_gateway_hub.jpg"
              alt="Beevil Central Gateway Hub"
              fill
              className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

