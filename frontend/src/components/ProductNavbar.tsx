"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Radio, ArrowUpRight, Menu, X, Terminal, Laptop } from "lucide-react";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-[#0a0d14]/95 border-b border-[#222632]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brandmark */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="w-2 h-2 rounded-full bg-[#f0b840] group-hover:scale-125 transition-transform" />
          <span className="font-mono text-xs tracking-widest text-[#f4f4f6] uppercase font-bold">
            BEEVIL KNIEVEL
          </span>
        </Link>

        {/* Minimal Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider text-[#8a90a0]">
          <Link href="#the-hive" className="hover:text-white transition-colors uppercase">
            The Hive
          </Link>
          <Link href="#the-signal" className="hover:text-white transition-colors uppercase">
            The Signal
          </Link>
          <Link href="#the-intelligence" className="hover:text-white transition-colors uppercase">
            Intelligence
          </Link>
          <Link href="#the-network" className="hover:text-white transition-colors uppercase">
            Network
          </Link>
          <Link href="#the-fleet" className="hover:text-white transition-colors uppercase">
            Fleet
          </Link>
          <Link href="#the-hardware" className="hover:text-white transition-colors uppercase">
            Hardware
          </Link>
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/app"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-[#161922] hover:bg-[#222632] border border-[#2e3444] text-[#f4f4f6] text-xs font-mono uppercase tracking-wider transition-colors"
          >
            <span>Field Console</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#8a90a0]" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#8a90a0] hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0d14] border-b border-[#222632] px-6 py-6 space-y-4 text-xs font-mono">
          <Link
            href="#the-hive"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#8a90a0] hover:text-white uppercase py-1"
          >
            The Hive
          </Link>
          <Link
            href="#the-signal"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#8a90a0] hover:text-white uppercase py-1"
          >
            The Signal
          </Link>
          <Link
            href="#the-intelligence"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#8a90a0] hover:text-white uppercase py-1"
          >
            Intelligence
          </Link>
          <Link
            href="#the-network"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#8a90a0] hover:text-white uppercase py-1"
          >
            Network
          </Link>
          <Link
            href="#the-fleet"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#8a90a0] hover:text-white uppercase py-1"
          >
            Fleet (100 Hives)
          </Link>
          <Link
            href="#the-hardware"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#8a90a0] hover:text-white uppercase py-1"
          >
            Hardware Spec
          </Link>
          <div className="pt-2 border-t border-[#222632]">
            <Link
              href="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-[#f0b840] text-[#0a0d14] font-bold rounded-sm uppercase tracking-wider text-xs"
            >
              <span>Open Field Console</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
