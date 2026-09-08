"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Radio, 
  Smartphone, 
  Cpu, 
  FileText, 
  Menu, 
  X, 
  ShieldCheck,
  Activity,
  Layers
} from "lucide-react";
import { StatusDot } from "@/components/ui/StatusDot";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NAV_LINKS = [
    { href: "/", label: "Public System", icon: Layers },
    { href: "/field", label: "Field App", icon: Smartphone, badge: "Mobile" },
    { href: "/console", label: "Telemetry Console", icon: Cpu, badge: "Edge RPi" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#090b10]/95 backdrop-blur-md border-b border-[#283144] font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        
        {/* Brand & System Node Status */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-[#f1f5f9] hover:text-[#ffc833] transition-colors">
            <span className="w-2.5 h-2.5 bg-[#f59e0b] rounded-xs" />
            <span className="font-bold text-sm tracking-wider uppercase">BEEVIL KNIEVEL</span>
          </Link>
          <div className="hidden md:flex items-center gap-2 border-l border-[#283144] pl-3">
            <StatusDot status="normal" size="sm" showLabel={false} pulse />
            <span className="text-[10px] text-[#94a3b8] uppercase">BENCH PROTOTYPE REV 2.1</span>
          </div>
        </div>

        {/* Desktop Surface Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-[#11141d] p-1 border border-[#283144] rounded-sm">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xs transition-all font-semibold uppercase tracking-wider ${
                  isActive
                    ? "bg-[#1f2637] text-[#ffc833] shadow-sm border border-[#3d4964]"
                    : "text-[#94a3b8] hover:text-[#f1f5f9] hover:bg-[#181d28]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[9px] px-1 py-0.2 rounded bg-[#090b10] text-[#64748b] border border-[#283144]">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Utility Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://github.com/atharveeee-netizen/beevil-knievel/raw/main/submission/hart_phase2_report.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xs bg-[#181d28] border border-[#283144] hover:border-[#3d4964] text-[#f1f5f9] transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>IEEE Report (PDF)</span>
          </a>
          <a
            href="https://github.com/atharveeee-netizen/beevil-knievel"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-xs text-[#94a3b8] hover:text-[#f1f5f9] hover:bg-[#181d28] border border-transparent hover:border-[#283144] transition-colors"
            title="GitHub Repository"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/field"
            className="px-2.5 py-1 rounded-xs bg-[#f59e0b] text-[#090b10] font-bold text-[11px] uppercase tracking-wider"
          >
            Field App
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xs text-[#94a3b8] hover:text-white border border-[#283144]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#283144] bg-[#0e1118] p-4 space-y-2">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-xs text-xs font-semibold uppercase tracking-wider border ${
                  isActive
                    ? "bg-[#181d28] border-[#3d4964] text-[#ffc833]"
                    : "border-transparent text-[#94a3b8] hover:bg-[#141824]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#090b10] text-[#94a3b8] border border-[#283144]">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-[#283144] flex items-center justify-between text-xs text-[#94a3b8]">
            <a
              href="https://github.com/atharveeee-netizen/beevil-knievel/raw/main/submission/hart_phase2_report.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2"
            >
              <FileText className="w-4 h-4 text-[#f59e0b]" />
              <span>IEEE Report PDF</span>
            </a>
            <a
              href="https://github.com/atharveeee-netizen/beevil-knievel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
