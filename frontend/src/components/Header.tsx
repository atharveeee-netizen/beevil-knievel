"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 sm:top-4 z-50 transition-all duration-300 px-3 sm:px-4 ${
        isScrolled ? "sm:top-2" : ""
      }`}
    >
      <div
        className={`max-w-[1410px] mx-auto rounded-2xl sm:rounded-[60px] transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between ${
          isScrolled
            ? "bg-[#F8F8F3] shadow-md border border-[#E5E5E0]"
            : "bg-white/90 sm:bg-white/80 backdrop-blur-md shadow-sm border border-black/5"
        }`}
      >
        {/* Brand Logo & Emblem */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Custom Beevil Knievel Hex Shield Emblem */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#4E4540] group-hover:bg-[#7A9979] flex items-center justify-center transition-colors shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 sm:w-6 sm:h-6 fill-[#FDBA12]"
              >
                <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.2l7 3.9v7.8l-7 3.9-7-3.9V8.1l7-3.9z" opacity="0.4" />
                <path d="M12 6.5l-4 2.2v4.6l4 2.2 4-2.2V8.7l-4-2.2zm-2 3.6l2-1.1 2 1.1v2.2l-2 1.1-2-1.1v-2.2z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[17px] sm:text-[19px] font-bold tracking-tight text-[#4E4540] group-hover:text-black transition-colors leading-none">
                BEEVIL KNIEVEL
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-[#7A9979] tracking-wider uppercase mt-0.5">
                Edge AI Hive Intelligence
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center justify-center flex-1 space-x-8 px-6">
          <Link
            href="#problem-solution"
            className="text-[15px] text-black font-normal hover:text-[#65bd60] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#65bd60] after:transition-all"
          >
            Field Realities vs Edge AI
          </Link>
          <Link
            href="#technology"
            className="text-[15px] text-black font-normal hover:text-[#65bd60] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#65bd60] after:transition-all"
          >
            6 TOPS Edge AI
          </Link>
          <Link
            href="#partners"
            className="text-[15px] text-black font-normal hover:text-[#65bd60] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#65bd60] after:transition-all"
          >
            Partners
          </Link>
          <Link
            href="#research"
            className="text-[15px] text-black font-normal hover:text-[#65bd60] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#65bd60] after:transition-all"
          >
            Dataset & Research
          </Link>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="#technology"
            className="btn-beewise-main btn-beewise-small"
          >
            View Technology
          </Link>
          <Link
            href="https://ieee.org"
            target="_blank"
            className="btn-beewise-outline btn-beewise-small"
          >
            IEEE 2026
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#4E4540] hover:text-black focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M22.5 12H1.5M22.5 4.5H1.5M22.5 19.5H1.5"
                  stroke="#4E4540"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-3 top-16 bg-[#F8F8F3] border border-[#E5E5E0] rounded-2xl shadow-xl p-6 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-4">
            <Link
              href="#problem-solution"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[17px] font-medium text-black py-2 border-b border-[#E5E5E0] hover:text-[#65bd60]"
            >
              Field Realities vs Edge AI
            </Link>
            <Link
              href="#technology"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[17px] font-medium text-black py-2 border-b border-[#E5E5E0] hover:text-[#65bd60]"
            >
              6 TOPS Edge AI
            </Link>
            <Link
              href="#partners"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[17px] font-medium text-black py-2 border-b border-[#E5E5E0] hover:text-[#65bd60]"
            >
              Institutional Partners
            </Link>
            <Link
              href="#research"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[17px] font-medium text-black py-2 border-b border-[#E5E5E0] hover:text-[#65bd60]"
            >
              Dataset & Research (47.89 GB)
            </Link>
            <div className="flex flex-col gap-3 pt-4">
              <Link
                href="#technology"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-beewise-main w-full"
              >
                View Technology
              </Link>
              <Link
                href="https://ieee.org"
                target="_blank"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-beewise-outline w-full"
              >
                IEEE Competition 2026
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
