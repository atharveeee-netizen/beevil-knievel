"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ProductFooter() {
  return (
    <footer className="border-t border-[#222632] bg-[#0a0d14] text-[#8a90a0] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f0b840]" />
            <span className="font-mono text-xs font-bold text-[#f4f4f6] uppercase tracking-widest">
              BEEVIL KNIEVEL
            </span>
          </div>
          <p className="text-xs font-mono text-[#8a90a0]">
            Autonomous edge intelligence for apiculture.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
          <Link href="#the-hive" className="hover:text-[#f4f4f6] transition-colors uppercase">
            The Hive
          </Link>
          <Link href="#the-signal" className="hover:text-[#f4f4f6] transition-colors uppercase">
            The Signal
          </Link>
          <Link href="#the-intelligence" className="hover:text-[#f4f4f6] transition-colors uppercase">
            Technology
          </Link>
          <Link href="/app" className="hover:text-[#f0b840] transition-colors uppercase">
            Field App
          </Link>
          <a
            href="https://github.com/atharveeee-netizen/beevil-knievel"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#f4f4f6] transition-colors uppercase flex items-center gap-1"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-[#8a90a0]" />
          </a>
        </div>

        <div className="text-[11px] font-mono text-[#8a90a0]/60">
          © 2026 Beevil Knievel. Engineered for the field.
        </div>

      </div>
    </footer>
  );
}
