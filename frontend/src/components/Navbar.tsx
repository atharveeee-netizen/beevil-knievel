"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, 
  Menu, 
  X, 
  Radio, 
  ShieldCheck, 
  Activity, 
  ChevronRight, 
  Layers, 
  Cpu, 
  Database,
  ArrowUpRight,
  Terminal,
  Hexagon,
  Laptop
} from "lucide-react";
import { 
  ShinyText, 
  DecryptedText, 
  Magnet, 
  ClickSpark 
} from "@/components/reactbits";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchExpanded, setSearchExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const SEARCH_DATABASE = [
    { title: "Field Telemetry & Command App", category: "Application", href: "/app", icon: Terminal },
    { title: "System Architecture & 16-Sensor Fusion", category: "Hardware Layer", href: "/#the_system", icon: Layers },
    { title: "100-Hive LoRaWAN IN865 Mesh Topology", category: "Network Layer", href: "/#mesh", icon: Radio },
    { title: "Edge AI Neural Inference & Spectrograms", category: "Edge AI / ML", href: "/#edge_ai", icon: Cpu },
    { title: "Cryptographic Honey Chain Ledger (SHA-256)", category: "Ledger", href: "/#honey_chain", icon: ShieldCheck },
    { title: "Antmicro CM4 Edge Computing Gateway Hub", category: "Gateway Hub", href: "/#the_system", icon: Database },
    { title: "Hardware, RF Mesh & Sensor Specifications", category: "Specifications", href: "/#the_specs", icon: Activity },
  ];

  const filteredResults = SEARCH_DATABASE.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#070a12]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/80"
          : "bg-[#070a12]/80 backdrop-blur-md border-b border-white/10"
      }`}
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3 xl:gap-6">
        
        {/* Left: Brandmark + Live LoRaWAN IN865 Link Beacon */}
        <div className="flex items-center gap-4 xl:gap-6 flex-shrink-0">
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
          >
            {/* Precision Amber Gold Hexagon Brandmark */}
            <div className="w-10 h-10 rounded-lg bg-[#0b0f19] border border-amber-500/40 p-2 flex items-center justify-center relative overflow-hidden shadow-[0_0_15px_rgba(245,158,11,0.15)] group-hover:border-amber-400 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Hexagon className="w-5 h-5 text-amber-400 stroke-[2.2] group-hover:scale-105 transition-transform" />
            </div>
            
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <ShinyText 
                  text="BEEVIL KNIEVEL" 
                  speed={4} 
                  className="font-extrabold text-base sm:text-lg tracking-wider text-[#f8fafc] group-hover:text-amber-400 transition-colors font-sans uppercase" 
                />
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-[#0b0f19] text-amber-400 border border-amber-500/30 tabular-nums">
                  v4.2
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#94a3b8] font-semibold">
                CYBER-PHYSICAL APICULTURE
              </span>
            </div>
          </Link>

          {/* Live Hardware Link Beacon: 'LoRaWAN IN865: 100/100 Active | AES-256' with DecryptedText */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0b0f19] border border-white/10 text-xs font-mono tabular-nums shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            </span>
            <span className="text-[#94a3b8]">LoRaWAN IN865:</span>
            <DecryptedText text="100/100 Active" speed={35} className="text-emerald-400 font-bold" />
            <span className="text-slate-600">|</span>
            <DecryptedText text="AES-256" speed={40} className="text-[#94a3b8]" />
          </div>
        </div>

        {/* Center Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-mono font-semibold tracking-wider uppercase">
          <Link 
            href="/#the-signal" 
            className="px-3 py-1.5 rounded-sm text-[#f8fafc]/90 hover:text-white hover:bg-slate-800/60 transition-all whitespace-nowrap"
          >
            Platform
          </Link>

          <Link 
            href="/#the-timeline" 
            className="px-3 py-1.5 rounded-sm text-[#f8fafc]/90 hover:text-white hover:bg-slate-800/60 transition-all whitespace-nowrap flex items-center gap-1.5"
          >
            <span>Timeline</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </Link>

          <Link 
            href="/#command-center" 
            className="px-3 py-1.5 rounded-sm text-[#f8fafc]/90 hover:text-white hover:bg-slate-800/60 transition-all whitespace-nowrap flex items-center gap-1.5"
          >
            <span>100-Hive Matrix</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          </Link>

          <Link 
            href="/#the_system" 
            className="px-3 py-1.5 rounded-sm text-[#f8fafc]/90 hover:text-white hover:bg-slate-800/60 transition-all whitespace-nowrap"
          >
            Hardware &amp; Mesh
          </Link>

          <Link 
            href="/#the_specs" 
            className="px-3 py-1.5 rounded-sm text-[#f8fafc]/90 hover:text-white hover:bg-slate-800/60 transition-all whitespace-nowrap"
          >
            Specs &amp; BOM
          </Link>
        </div>

        {/* Right Side: Universal Search + Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Telemetry Index Search */}
          <div className="relative hidden md:block">
            <div
              className={`flex items-center bg-[#0b0f19] hover:bg-slate-900 rounded-full px-3 py-1.5 transition-all duration-200 border border-white/10 ${
                searchExpanded ? "w-64 ring-1 ring-amber-500/50 border-amber-500/40" : "w-36 lg:w-44"
              }`}
            >
              <Search className="w-3.5 h-3.5 text-[#94a3b8] mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search specs..."
                value={searchQuery}
                onFocus={() => setSearchExpanded(true)}
                onBlur={() => setTimeout(() => setSearchExpanded(false), 250)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-[#f8fafc] placeholder-slate-500 text-xs focus:outline-none w-full"
              />
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono text-[#94a3b8] bg-[#070a12] border border-white/10 rounded">
                /
              </kbd>
            </div>

            {/* Search Dropdown */}
            {searchExpanded && searchQuery.length > 0 && (
              <div className="absolute top-full mt-2 right-0 w-84 bg-[#0b0f19]/98 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50">
                <div className="p-3 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 border-b border-white/10 flex justify-between bg-[#070a12]">
                  <span>Telemetry &amp; Component Index</span>
                  <span className="tabular-nums">{filteredResults.length} found</span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-white/5">
                  {filteredResults.length > 0 ? (
                    filteredResults.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={i}
                          href={item.href}
                          onClick={() => setSearchExpanded(false)}
                          className="flex items-center gap-3 px-4 py-3 text-xs text-[#f8fafc] hover:bg-amber-500/10 hover:text-amber-300 transition-colors group"
                        >
                          <div className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-[#94a3b8] group-hover:text-amber-400 transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-[#f8fafc] group-hover:text-amber-300">{item.title}</div>
                            <div className="text-[10px] font-mono text-[#94a3b8]">{item.category}</div>
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 ml-auto text-slate-500 group-hover:text-amber-400" />
                        </Link>
                      );
                    })
                  ) : (
                    <div className="px-4 py-4 text-xs text-[#94a3b8] text-center">
                      No matching components for &ldquo;{searchQuery}&rdquo;
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Primary CTA: 'Launch Field App' (/app) with ReactBits Magnet and ClickSpark */}
          <Magnet padding={25} magnetStrength={2}>
            <ClickSpark sparkColor="#f59e0b" sparkCount={8} sparkRadius={20}>
              <Link
                href="/app"
                id="launch-command-center-btn"
                className="group relative inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#f59e0b] text-[#070a12] hover:bg-[#fbbf24] shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] active:scale-[0.98] transition-all whitespace-nowrap border border-amber-300/40"
                title="Launch Field App"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#070a12] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#070a12]" />
                </span>
                <Laptop className="w-4 h-4 stroke-[2.2] text-[#070a12]" />
                <span>Launch Field App</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5] text-[#070a12] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </ClickSpark>
          </Magnet>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#0b0f19] border border-white/10 text-[#94a3b8] hover:text-white hover:border-slate-700 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-amber-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070a12]/98 backdrop-blur-2xl border-t border-white/10 px-6 py-6 space-y-4 shadow-2xl">
          
          {/* Mobile Live Hardware Link Beacon */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#0b0f19] border border-white/10 font-mono text-xs tabular-nums">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[#94a3b8]">LoRaWAN IN865</span>
            </div>
            <span className="text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
              100/100 Active | AES-256
            </span>
          </div>

          {/* Mobile Search */}
          <div className="relative">
            <div className="flex items-center bg-[#0b0f19] rounded-xl px-3.5 py-2.5 border border-white/10">
              <Search className="w-4 h-4 text-[#94a3b8] mr-2" />
              <input
                type="text"
                placeholder="Search telemetry &amp; specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-[#f8fafc] placeholder-slate-500 text-sm focus:outline-none w-full"
              />
            </div>
          </div>

          {/* Direct Navigation Links */}
          <div className="space-y-1 pt-2">
            <Link
              href="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold"
            >
              <div className="flex items-center gap-2.5">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span>Launch Field App</span>
              </div>
              <span className="text-[10px] font-mono uppercase bg-[#f59e0b] text-[#070a12] px-2 py-0.5 rounded font-black">
                LAUNCH
              </span>
            </Link>

            <Link
              href="/#the_system"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-3 rounded-lg text-[#f8fafc] hover:bg-slate-900 transition-colors"
            >
              <Layers className="w-4 h-4 text-[#94a3b8]" />
              <span>System Architecture</span>
            </Link>

            <Link
              href="/#edge_ai"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-3 rounded-lg text-[#f8fafc] hover:bg-slate-900 transition-colors"
            >
              <Cpu className="w-4 h-4 text-amber-400" />
              <span>Edge AI</span>
            </Link>

            <Link
              href="/#mesh"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-3 rounded-lg text-[#f8fafc] hover:bg-slate-900 transition-colors"
            >
              <Radio className="w-4 h-4 text-emerald-400" />
              <span>100-Hive Mesh</span>
            </Link>

            <Link
              href="/#the_specs"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-3 rounded-lg text-[#f8fafc] hover:bg-slate-900 transition-colors"
            >
              <Database className="w-4 h-4 text-[#94a3b8]" />
              <span>Specs</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <Link
              href="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-[#f59e0b] text-[#070a12] font-bold text-sm text-center shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 hover:bg-[#fbbf24] transition-colors"
            >
              <Laptop className="w-4 h-4 text-[#070a12]" />
              <span>Launch Field App</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
