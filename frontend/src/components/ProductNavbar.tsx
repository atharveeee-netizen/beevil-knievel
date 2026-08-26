"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

export function ProductNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "bg-[#0a0d14]/95 backdrop-blur-md border-b border-[#222738]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brandmark */}
        <Link href="/" className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0b840]">
          <span className="w-2 h-2 rounded-full bg-[#f0b840]" />
          <span className="font-mono text-xs tracking-widest text-[#f4f4f6] uppercase font-bold">
            BEEVIL KNIEVEL
          </span>
        </Link>

        {/* Minimal Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-mono tracking-wider text-[#8a90a0]">
          <Link href="#the-hive" className="hover:text-white transition-colors uppercase focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f0b840]">
            The Brood Nest
          </Link>
          <Link href="#the-signal" className="hover:text-white transition-colors uppercase focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f0b840]">
            Sensors
          </Link>
          <Link href="#the-intelligence" className="hover:text-white transition-colors uppercase focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f0b840]">
            Edge Compute
          </Link>
          <Link href="#the-network" className="hover:text-white transition-colors uppercase focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f0b840]">
            LoRa Mesh
          </Link>
          <Link href="#the-fleet" className="hover:text-white transition-colors uppercase focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f0b840]">
            100-Hive Fleet
          </Link>
          <Link href="#the-hardware" className="hover:text-white transition-colors uppercase focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f0b840]">
            Hardware Specs
          </Link>
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/app"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-[#12151e] hover:bg-[#181c28] border border-[#222738] text-[#f4f4f6] text-xs font-mono uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0b840]"
          >
            <span>Open Field Console</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#8a90a0]" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#8a90a0] hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0b840]"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0d14] border-b border-[#222738] px-6 py-6 space-y-4 text-xs font-mono">
          <Link
            href="#the-hive"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#8a90a0] hover:text-white uppercase py-1"
          >
            The Brood Nest
          </Link>
          <Link
            href="#the-signal"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#8a90a0] hover:text-white uppercase py-1"
          >
            Sensors
          </Link>
          <Link
            href="#the-intelligence"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#8a90a0] hover:text-white uppercase py-1"
          >
            Edge Compute
          </Link>
          <Link
            href="#the-network"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#8a90a0] hover:text-white uppercase py-1"
          >
            LoRa Mesh
          </Link>
          <Link
            href="#the-fleet"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#8a90a0] hover:text-white uppercase py-1"
          >
            100-Hive Fleet
          </Link>
          <Link
            href="#the-hardware"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#8a90a0] hover:text-white uppercase py-1"
          >
            Hardware Specs
          </Link>
          <div className="pt-2 border-t border-[#222738]">
            <Link
              href="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#f0b840] hover:bg-[#f8c454] text-[#0a0d14] font-bold rounded-sm uppercase tracking-wider text-xs min-h-[48px]"
            >
              <span>Launch Field App (/app)</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
