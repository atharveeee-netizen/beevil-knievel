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
  Laptop,
  Sparkles
} from "lucide-react";

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
    { title: "HiveOS Interactive 100-Hive Command Center", category: "Command Center", href: "/app", icon: Terminal },
    { title: "System Architecture & 16-Sensor Fusion Array", category: "Hardware Platform", href: "/#the_system", icon: Layers },
    { title: "100-Hive LoRaWAN IN865 Multi-Hop Topology", category: "Network Layer", href: "/#mesh", icon: Radio },
    { title: "BeevilFusionNetEdge (96.84% Edge AI Accuracy)", category: "Edge AI / ML", href: "/#edge_ai", icon: Cpu },
    { title: "Honey Chain Cryptographic Ledger (SHA-256)", category: "Ledger / Crypto", href: "/#honey_chain", icon: ShieldCheck },
    { title: "DJI Enterprise / Antmicro CM4 6 TOPS Gateway", category: "Gateway Hub", href: "/#the_design", icon: Database },
    { title: "Framework Modular Solar Sensor Node Enclosure", category: "Hardware CAD", href: "/#the_system", icon: Activity },
    { title: "Master Hardware, Mesh & Ledger Specifications", category: "Specifications", href: "/#the_specs", icon: Layers },
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
          ? "bg-[#070b14]/92 backdrop-blur-2xl border-b border-slate-800/80 shadow-2xl shadow-black/70"
          : "bg-[#070b14]/70 backdrop-blur-md border-b border-slate-800/40"
      }`}
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3 xl:gap-6">
        
        {/* Left: Brand + Live LoRaWAN IN865 Status Badge */}
        <div className="flex items-center gap-4 xl:gap-5 flex-shrink-0">
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
          >
            {/* Apple Pro / Linear Style Amber Gold Hexagon Brandmark */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/40 p-2 flex items-center justify-center relative overflow-hidden shadow-[0_0_15px_rgba(245,158,11,0.2)] group-hover:border-amber-400 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Hexagon className="w-5 h-5 text-amber-400 stroke-[2.2] group-hover:scale-110 transition-transform" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-amber-300 transition-colors font-sans">
                  Beevil Knievel
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-800/90 text-amber-400 border border-amber-500/30">
                  HIVE-OS v4.2
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-medium">
                Edge AI Precision Apiculture
              </span>
            </div>
          </Link>

          {/* Live LoRaWAN IN865 Mesh Status Badge */}
          <div className="hidden 2xl:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 text-xs font-mono shadow-[0_0_12px_rgba(16,185,129,0.1)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            </span>
            <span className="text-slate-300 font-semibold">LoRaWAN IN865:</span>
            <span className="text-emerald-400 font-bold">100/100 Active</span>
            <span className="text-slate-500 font-normal">| AES-256 Vault</span>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-300">
          <Link 
            href="/#the_system" 
            className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/50 transition-all whitespace-nowrap"
          >
            System Architecture
          </Link>

          <Link 
            href="/#edge_ai" 
            className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/50 transition-all whitespace-nowrap flex items-center gap-1.5"
          >
            <span>Edge AI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          </Link>

          <Link 
            href="/#mesh" 
            className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/50 transition-all whitespace-nowrap"
          >
            100-Hive Mesh
          </Link>

          <Link 
            href="/#honey_chain" 
            className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/50 transition-all whitespace-nowrap"
          >
            Honey Chain
          </Link>

          <Link 
            href="/#the_specs" 
            className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/50 transition-all whitespace-nowrap hidden xl:inline-block"
          >
            Hardware Specs
          </Link>
        </div>

        {/* Right Side: Search + High-Converting Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Universal Search Box */}
          <div className="relative hidden md:block">
            <div
              className={`flex items-center bg-slate-900/90 hover:bg-slate-800/90 rounded-full px-3 py-1.5 transition-all duration-200 border border-slate-700/60 ${
                searchExpanded ? "w-64 ring-2 ring-amber-500/50 border-amber-500/40" : "w-36 lg:w-44"
              }`}
            >
              <Search className="w-3.5 h-3.5 text-slate-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search specs..."
                value={searchQuery}
                onFocus={() => setSearchExpanded(true)}
                onBlur={() => setTimeout(() => setSearchExpanded(false), 250)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-slate-200 placeholder-slate-500 text-xs focus:outline-none w-full"
              />
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono text-slate-400 bg-slate-800 border border-slate-700 rounded">
                ⌘K
              </kbd>
            </div>

            {/* Search Dropdown */}
            {searchExpanded && searchQuery.length > 0 && (
              <div className="absolute top-full mt-2 right-0 w-84 bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-700/80 overflow-hidden z-50">
                <div className="p-3 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 flex justify-between bg-slate-950/60">
                  <span>Telemetry &amp; Architecture Index</span>
                  <span>{filteredResults.length} found</span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60">
                  {filteredResults.length > 0 ? (
                    filteredResults.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={i}
                          href={item.href}
                          onClick={() => setSearchExpanded(false)}
                          className="flex items-center gap-3 px-4 py-3 text-xs text-slate-200 hover:bg-amber-500/10 hover:text-amber-300 transition-colors group"
                        >
                          <div className="p-1.5 rounded-lg bg-slate-800 text-slate-400 group-hover:text-amber-400 transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-100 group-hover:text-amber-300">{item.title}</div>
                            <div className="text-[10px] font-mono text-slate-400">{item.category}</div>
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 ml-auto text-slate-500 group-hover:text-amber-400" />
                        </Link>
                      );
                    })
                  ) : (
                    <div className="px-4 py-4 text-xs text-slate-400 text-center">
                      No matching architecture components for &ldquo;{searchQuery}&rdquo;
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* High-Converting Primary CTA: OPEN FIELD COMMAND APP (/app) with Live Pulse Badge */}
          <Link
            href="/app"
            id="launch-command-center-btn"
            className="group relative inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-black px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-[#ffc833] text-slate-950 hover:from-amber-300 hover:to-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] active:scale-95 transition-all whitespace-nowrap border border-amber-200/60 uppercase tracking-tight"
            title="Open Interactive 100-Hive Field Command App"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-950" />
            </span>
            <Laptop className="w-4 h-4 stroke-[2.5] text-slate-950 group-hover:rotate-12 transition-transform" />
            <span>OPEN FIELD COMMAND APP</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5] text-slate-950 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-amber-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070b14]/98 backdrop-blur-2xl border-t border-slate-800 px-6 py-6 space-y-4 shadow-2xl">
          
          {/* Mobile Live Status Badge */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-emerald-500/30 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-slate-200 font-semibold">LoRaWAN IN865 Mesh</span>
            </div>
            <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
              100/100 NODES
            </span>
          </div>

          {/* Mobile Search */}
          <div className="relative">
            <div className="flex items-center bg-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-800">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input
                type="text"
                placeholder="Search system architecture..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none w-full"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1 pt-2">
            <Link
              href="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold"
            >
              <div className="flex items-center gap-2.5">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span>Field Command App</span>
              </div>
              <span className="text-[10px] font-mono uppercase bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-black">
                OPEN (/app)
              </span>
            </Link>

            <Link
              href="/#the_system"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-3 rounded-lg text-slate-200 hover:bg-slate-900 hover:text-white transition-colors"
            >
              <Layers className="w-4 h-4 text-slate-400" />
              <span>System Architecture</span>
            </Link>

            <Link
              href="/#edge_ai"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-3 rounded-lg text-slate-200 hover:bg-slate-900 hover:text-white transition-colors"
            >
              <Cpu className="w-4 h-4 text-amber-400" />
              <span>Edge AI Neural Models</span>
            </Link>

            <Link
              href="/#mesh"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-3 rounded-lg text-slate-200 hover:bg-slate-900 hover:text-white transition-colors"
            >
              <Radio className="w-4 h-4 text-emerald-400" />
              <span>100-Hive LoRa Mesh</span>
            </Link>

            <Link
              href="/#honey_chain"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-3 rounded-lg text-slate-200 hover:bg-slate-900 hover:text-white transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Honey Chain Cryptography</span>
            </Link>

            <Link
              href="/#the_specs"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-3 rounded-lg text-slate-200 hover:bg-slate-900 hover:text-white transition-colors"
            >
              <Database className="w-4 h-4 text-slate-400" />
              <span>Hardware Specifications</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <Link
              href="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-sm text-center shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 uppercase tracking-tight"
            >
              <Laptop className="w-4 h-4" />
              <span>OPEN FIELD COMMAND APP (/app)</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}


