"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, Download, Laptop, Radio, Zap, ShieldCheck, Sparkles, Layers, Lock } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchExpanded, setSearchExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const SEARCH_DATABASE = [
    { title: "HiveOS App (Interactive 100-Hive Console)", category: "Software", href: "/app" },
    { title: "System Design (16-Sensor Fusion & Zero-Disturbance Enclosure)", category: "Hardware", href: "/#the_system" },
    { title: "100-Hive Mesh Topology & Multi-Hop LoRa", category: "Network", href: "/#mesh" },
    { title: "Edge AI (BeevilFusionNetEdge 96.84% Out-of-Sample Acc)", category: "Edge AI", href: "/#edge_ai" },
    { title: "Honey Chain (Cryptographic SHA-256 Provenance)", category: "Provenance", href: "/#honey_chain" },
    { title: "Download HiveOS App & Research SDK", category: "Download", href: "/#sdk" },
    { title: "Antmicro CM4 Baseboard 6 TOPS Gateway Hub", category: "Hardware", href: "/#gateway-package" },
    { title: "Off-Shore COTS Solar Sensor Node ($189)", category: "Hardware", href: "/#all-for-just" },
    { title: "Hardware Specifications & Benchmarks", category: "Specs", href: "/#the_specs" },
    { title: "Apiary Field Photo Gallery", category: "Gallery", href: "/#gallery" },
    { title: "Our Mission (Marcus Varro 2,000-Year Heritage)", category: "About", href: "/#our_mission" },
    { title: "University Research Grants (15% Academic Off)", category: "Education", href: "/#education" },
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
          ? "bg-[#212223]/95 backdrop-blur-md text-white shadow-xl border-b border-white/10"
          : "bg-[#212223]/60 backdrop-blur-sm text-white border-b border-white/5"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left: Brand */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2 font-extrabold text-xl sm:text-2xl tracking-tight text-white hover:text-[#ffc833] transition-colors"
          >
            <span>Beevil Knievel</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffc833] inline-block animate-pulse" />
          </Link>
        </div>

        {/* Center: Search & Primary Navigation */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium">
          {/* Universal Search Box */}
          <div className="relative">
            <div
              className={`flex items-center bg-black/40 hover:bg-black/60 rounded-full px-3.5 py-1.5 transition-all duration-200 border border-white/15 ${
                searchExpanded ? "w-56 ring-2 ring-[#ffc833]" : "w-36 xl:w-44"
              }`}
            >
              <Search className="w-3.5 h-3.5 text-white/70 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onFocus={() => setSearchExpanded(true)}
                onBlur={() => setTimeout(() => setSearchExpanded(false), 250)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-white placeholder-white/60 text-xs focus:outline-none w-full"
              />
            </div>

            {/* Search Dropdown */}
            {searchExpanded && searchQuery.length > 0 && (
              <div className="absolute top-full mt-2 left-0 w-80 bg-[#1d1c18] rounded-2xl shadow-2xl border border-white/15 overflow-hidden z-50">
                <div className="p-2.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#ffc833] border-b border-white/10 flex justify-between">
                  <span>Search Results</span>
                  <span>{filteredResults.length} found</span>
                </div>
                <div className="max-h-60 overflow-y-auto divide-y divide-white/5">
                  {filteredResults.length > 0 ? (
                    filteredResults.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        onClick={() => setSearchExpanded(false)}
                        className="block px-3.5 py-2.5 text-xs text-white/90 hover:bg-[#ffc833] hover:text-[#312f28] transition-colors"
                      >
                        <div className="font-bold">{item.title}</div>
                        <div className="text-[10px] text-white/50">{item.category}</div>
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-xs text-white/50">
                      No results for &ldquo;{searchQuery}&rdquo;
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <Link 
            href="/app" 
            className="flex items-center gap-1.5 text-[#ffc833] font-bold bg-[#ffc833]/15 border border-[#ffc833]/40 px-3 py-1 rounded-full hover:bg-[#ffc833] hover:text-[#312f28] transition-all whitespace-nowrap shadow-sm"
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>HiveOS App</span>
          </Link>

          <Link href="/#the_system" className="hover:text-[#ffc833] transition-colors whitespace-nowrap">
            System Design
          </Link>

          <Link href="/#mesh" className="hover:text-[#ffc833] transition-colors whitespace-nowrap">
            100-Hive Mesh
          </Link>

          <Link href="/#edge_ai" className="hover:text-[#ffc833] transition-colors whitespace-nowrap">
            Edge AI
          </Link>

          <Link href="/#honey_chain" className="hover:text-[#ffc833] transition-colors whitespace-nowrap">
            Honey Chain
          </Link>

          <Link href="/#the_specs" className="hover:text-[#ffc833] transition-colors whitespace-nowrap hidden xl:inline-block">
            Specs
          </Link>

          <Link href="/#our_mission" className="hover:text-[#ffc833] transition-colors whitespace-nowrap hidden xl:inline-block">
            Our Mission
          </Link>
        </div>

        {/* Right Side: Prominent DOWNLOAD CTA Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/#sdk"
            id="header-download-btn"
            className="btn-header-download flex items-center justify-center gap-2 text-xs sm:text-sm font-extrabold px-5 py-2 sm:px-7 sm:py-2.5 rounded-full shadow-xl bg-[#ffc833] text-[#312f28] hover:bg-[#ffd659] active:scale-95 transition-all uppercase tracking-wide"
            title="Download HiveOS App &amp; SDK"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            <span>DOWNLOAD</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#ffc833] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1d1c18] border-t border-white/15 px-6 py-6 space-y-4 text-base font-semibold shadow-2xl">
          <div className="mb-4">
            <div className="flex items-center bg-black/50 rounded-full px-4 py-2 border border-white/20">
              <Search className="w-4 h-4 text-white/70 mr-2" />
              <input
                type="text"
                placeholder="Search Beevil Knievel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-white placeholder-white/50 text-sm focus:outline-none w-full"
              />
            </div>
          </div>

          <Link
            href="/app"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-[#ffc833] font-bold border-b border-white/10"
          >
            <div className="flex items-center gap-2">
              <Laptop className="w-4 h-4" />
              <span>HiveOS App (/app)</span>
            </div>
            <span className="text-[10px] font-mono uppercase bg-[#ffc833] text-[#312f28] px-2 py-0.5 rounded font-black">
              LIVE
            </span>
          </Link>

          <Link
            href="/#the_system"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-white hover:text-[#ffc833]"
          >
            System Design
          </Link>

          <Link
            href="/#mesh"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-white hover:text-[#ffc833]"
          >
            100-Hive Mesh
          </Link>

          <Link
            href="/#edge_ai"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-white hover:text-[#ffc833]"
          >
            Edge AI
          </Link>

          <Link
            href="/#honey_chain"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-white hover:text-[#ffc833]"
          >
            Honey Chain
          </Link>

          <Link
            href="/#the_specs"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-white hover:text-[#ffc833]"
          >
            Hardware &amp; Software Specs
          </Link>

          <Link
            href="/#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-white hover:text-[#ffc833]"
          >
            Hardware Photo Gallery
          </Link>

          <Link
            href="/#our_mission"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-white hover:text-[#ffc833]"
          >
            Our Mission
          </Link>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <Link
              href="/#sdk"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-header-download w-full justify-center py-3 text-center"
            >
              <Download className="w-5 h-5" />
              <span>DOWNLOAD APP</span>
            </Link>
            <Link
              href="/#all-for-just"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-white/10 text-white text-center py-2.5 rounded-full font-bold text-sm"
            >
              Pre-Order Solar Node $189
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
