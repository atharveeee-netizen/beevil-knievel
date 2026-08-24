"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Code2, Monitor, Download, Laptop, Terminal } from "lucide-react";

export function DeveloperSection() {
  return (
    <section
      id="sdk"
      className="bg-[#ffc833] text-[#312f28] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t-2 border-[#312f28]/10"
    >
      <div className="max-w-5xl mx-auto space-y-24">
        
        {/* SDK & Open Research Stack */}
        <div className="space-y-8 max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-[#312f28] text-[#ffc833] px-4 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Code2 className="w-4 h-4 text-[#ffc833]" />
            <span>Open-Source Research Stack</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Build Your Own Hive Models.
          </h2>

          <p className="text-xl sm:text-2xl leading-relaxed font-medium max-w-3xl">
            Beevil Knievel is 100% open for research. Our Python, C++, and FreeRTOS libraries let university labs and commercial beekeepers train custom models on raw acoustic WAV and sensor telemetry without vendor lock-in.
          </p>

          <div className="pt-2">
            <Link
              href="https://github.com/atharveeee-netizen/beevil-knievel"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-black inline-flex items-center gap-2 text-lg shadow-md hover:shadow-lg"
            >
              <Terminal className="w-5 h-5 text-[#ffc833]" />
              <span>Explore GitHub Repository &amp; SDK</span>
            </Link>
          </div>

          {/* Model Benchmark Table Image */}
          <div className="my-6 w-full max-w-4xl h-[280px] sm:h-[420px] relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#312f28]/20 bg-[#312f28]">
            <Image
              src="/images/hardware/tinyml_comparison_table.jpg"
              alt="Beevil Knievel TinyML Model Evaluation and Latency Benchmarks"
              fill
              className="object-contain p-2 hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>
        </div>

        {/* HiveOS Desktop & Mobile Companion */}
        <div id="mirror" className="space-y-8 max-w-4xl mx-auto text-center flex flex-col items-center pt-8 border-t-2 border-[#312f28]/20">
          <div className="inline-flex items-center gap-2 bg-[#6c00ff] text-white px-4 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Laptop className="w-4 h-4 text-[#ffc833]" />
            <span>HiveOS Live Telemetry Console</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Real-Time Apiary Telemetry.
          </h2>

          <p className="text-xl sm:text-2xl leading-relaxed font-medium max-w-3xl">
            Monitor all your colonies in real-time with the <strong>HiveOS App</strong>. Streams live acoustic spectrograms, brood temperatures, and swarm alerts directly from your Antmicro CM4 Gateway to macOS, Windows, Linux, iOS, and Android.
          </p>

          <div className="pt-2">
            <Link
              href="#the_specs"
              className="btn-pill-black inline-flex items-center gap-2 text-lg shadow-md hover:shadow-lg"
            >
              <Monitor className="w-5 h-5 text-[#ffc833]" />
              <span>Explore HiveOS Architecture</span>
            </Link>
          </div>

          {/* Gateway Hub Photo */}
          <div className="my-6 w-full max-w-3xl h-[260px] sm:h-[380px] relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#312f28]/20 bg-[#312f28]">
            <Image
              src="/images/hardware/beevil_gateway_hub.jpg"
              alt="Beevil Central Gateway Hub"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
