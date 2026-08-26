"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

function GithubIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function ProductFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#222738] bg-[#0a0d14] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-[#8a90a0]">
        
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#f0b840]" />
          <span className="font-bold text-white uppercase tracking-wider">BEEVIL KNIEVEL</span>
          <span className="text-[#3a4154]">/</span>
          <span>Sensors and edge telemetry for commercial beekeepers.</span>
        </div>

        {/* Quiet Links */}
        <div className="flex flex-wrap items-center gap-6">
          <Link href="#the-hive" className="hover:text-white transition-colors uppercase focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f0b840]">
            The Brood Nest
          </Link>
          <Link href="#the-signal" className="hover:text-white transition-colors uppercase focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f0b840]">
            Sensors
          </Link>
          <Link href="#the-hardware" className="hover:text-white transition-colors uppercase focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f0b840]">
            Hardware Specs
          </Link>
          <Link href="/app" className="hover:text-[#f0b840] transition-colors uppercase font-bold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f0b840]">
            Field Console
          </Link>
          <a
            href="https://github.com/atharveeee-netizen/beevil-knievel"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors inline-flex items-center gap-1 uppercase focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f0b840]"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="p-2 rounded-sm bg-[#12151e] border border-[#222738] hover:border-[#3a4154] text-white flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0b840]"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span className="text-[10px] uppercase">Top</span>
        </button>

      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-[#181c28] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-[#8a90a0]">
        <div>© 2026 Beevil Knievel. Open hardware for apiaries.</div>
        <div>ARM Cortex-M4F • Raspberry Pi CM4 • Sub-GHz LoRa • FreeRTOS</div>
      </div>
    </footer>
  );
}
