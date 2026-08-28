"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#6c00ff] text-white py-16 px-4 sm:px-6 lg:px-8 border-t-2 border-white/20">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Brand Info & Attribution */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-white/20 text-xs text-white/80 font-medium">
          <div className="space-y-1">
            <p className="font-bold text-white text-sm">
              &copy; {new Date().getFullYear()} Beevil Knievel Team. All rights reserved.
            </p>
            <p>Autonomous Edge-AI Environmental &amp; Acoustic Health Monitoring System for Precision Apiculture.</p>
          </div>

          <div className="space-y-1 text-left md:text-right">
            <p>IEEE HardwAIre Challenge Master Standard • Standardized on Antmicro CM4 Baseboard (Rev 1.0.5)</p>
            <p>
              <Link
                href="https://github.com/atharveeee-netizen/beevil-knievel"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#ffc833]"
              >
                GitHub Repository: atharveeee-netizen/beevil-knievel
              </Link>
            </p>
          </div>
        </div>

        {/* 4-Column Sitemap */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {/* Column 1 */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-[#ffc833] font-bold">
              System Architecture
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="#the_system" className="hover:text-[#ffc833] transition-colors">
                  The Sensor Node
                </Link>
              </li>
              <li>
                <Link href="#the_specs" className="hover:text-[#ffc833] transition-colors">
                  Antmicro CM4 Gateway
                </Link>
              </li>
              <li>
                <Link href="#edge_ai" className="hover:text-[#ffc833] transition-colors">
                  BeevilFusionNetEdge (96.84%)
                </Link>
              </li>
              <li>
                <Link href="#the_specs" className="hover:text-[#ffc833] transition-colors">
                  TinyML 1D-CNN MCU
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-[#ffc833] font-bold">
              Fleet &amp; Catalog
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="#catalog" className="hover:text-[#ffc833] transition-colors">
                  Beevil Solo (1-4 Hives)
                </Link>
              </li>
              <li>
                <Link href="#catalog" className="hover:text-[#ffc833] transition-colors">
                  Beevil Apiary Pro (5-25 Hives)
                </Link>
              </li>
              <li>
                <Link href="#catalog" className="hover:text-[#ffc833] transition-colors">
                  Pollination Grid (25-100+ Hives)
                </Link>
              </li>
              <li>
                <Link href="#catalog" className="hover:text-[#ffc833] transition-colors">
                  Future Work &amp; Custom Sizing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-[#ffc833] font-bold">
              Research &amp; Data
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="https://github.com/atharveeee-netizen/beevil-knievel/tree/main/datasets" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffc833] transition-colors">
                  1.05M Field Dataset
                </Link>
              </li>
              <li>
                <Link href="#education" className="hover:text-[#ffc833] transition-colors">
                  University Grants (15% Off)
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="hover:text-[#ffc833] transition-colors">
                  Hardware Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="#our_mission" className="hover:text-[#ffc833] transition-colors">
                  Marcus Varro Heritage
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-[#ffc833] font-bold">
              Open Source
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="https://github.com/atharveeee-netizen/beevil-knievel" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffc833] transition-colors">
                  GitHub Repository
                </Link>
              </li>
              <li>
                <Link href="https://github.com/atharveeee-netizen/beevil-knievel/issues" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffc833] transition-colors">
                  Issue Tracker
                </Link>
              </li>
              <li>
                <Link href="https://github.com/antmicro/cm4-baseboard" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffc833] transition-colors">
                  Antmicro CM4 Hardware
                </Link>
              </li>
              <li>
                <Link href="#need-help" className="hover:text-[#ffc833] transition-colors">
                  Contact Engineering
                </Link>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
}
