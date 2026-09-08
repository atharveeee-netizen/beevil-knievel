"use client";

import React, { useState } from "react";
import OperationsConsolePage from "../console/page";
import FieldAppPage from "../field/page";
import { Smartphone, Cpu, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UnifiedAppPage() {
  const [selectedSurface, setSelectedSurface] = useState<"console" | "field">("console");

  return (
    <div className="min-h-screen flex flex-col bg-[#090b10]">
      {/* Top Surface Switcher Banner */}
      <div className="bg-[#141824] border-b border-[#283144] px-4 py-1.5 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-[#94a3b8] hover:text-[#f1f5f9] flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Public Portal</span>
          </Link>
          <span className="text-[#64748b]">•</span>
          <span className="text-[#f1f5f9] font-bold uppercase tracking-wider">
            SURFACE SELECTOR:
          </span>
        </div>

        <div className="flex items-center gap-1 bg-[#090b10] p-0.5 rounded border border-[#283144]">
          <button
            onClick={() => setSelectedSurface("console")}
            className={`px-3 py-1 rounded text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              selectedSurface === "console"
                ? "bg-[#f59e0b] text-[#090b10] shadow-sm"
                : "text-[#94a3b8] hover:text-[#f1f5f9]"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Operations Console</span>
          </button>

          <button
            onClick={() => setSelectedSurface("field")}
            className={`px-3 py-1 rounded text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              selectedSurface === "field"
                ? "bg-[#f59e0b] text-[#090b10] shadow-sm"
                : "text-[#94a3b8] hover:text-[#f1f5f9]"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Field App</span>
          </button>
        </div>
      </div>

      {/* Surface Stage */}
      <div className="flex-1">
        {selectedSurface === "console" ? <OperationsConsolePage /> : <FieldAppPage />}
      </div>
    </div>
  );
}
