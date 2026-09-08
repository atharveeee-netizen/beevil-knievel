import React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function Footer() {
  return (
    <footer className="w-full border-t border-[#283144] bg-[#07080c] text-[#94a3b8] font-mono text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-8">
        
        {/* Top Grid: System Identity & Direct Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Identity */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-[#f1f5f9] font-bold text-sm uppercase tracking-wider">
              <span className="w-2.5 h-2.5 bg-[#f59e0b] rounded-xs" />
              <span>BEEVIL KNIEVEL</span>
            </div>
            <p className="text-xs text-[#94a3b8] font-sans leading-relaxed max-w-md">
              Continuous Cyber-Physical Telemetry for Commercial Apiaries. Combining multi-modal in-hive transduction (TMP117, DS18B20, INMP441, SCD41, BME688, HX711, LIS3DH), ARM CMSIS-DSP acoustic spectral classification, and dual-radio BLE Mesh + LoRa star telemetry.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <Badge claim="VALIDATED">IEEE HART Phase 2</Badge>
              <Badge claim="REAL_SILICON">Bench Prototype Rev 2.1</Badge>
            </div>
          </div>

          {/* Surface Navigation */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#f1f5f9]">
              Connected Surfaces
            </div>
            <ul className="space-y-1.5 text-xs text-[#94a3b8]">
              <li>
                <Link href="/" className="hover:text-[#f59e0b] transition-colors">
                  Surface A: Public System Portal
                </Link>
              </li>
              <li>
                <Link href="/field" className="hover:text-[#f59e0b] transition-colors">
                  Surface B: Field Inspection App
                </Link>
              </li>
              <li>
                <Link href="/console" className="hover:text-[#f59e0b] transition-colors">
                  Surface C: Operations Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Technical Documentation */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#f1f5f9]">
              Engineering Artifacts
            </div>
            <ul className="space-y-1.5 text-xs text-[#94a3b8]">
              <li>
                <a
                  href="https://github.com/atharveeee-netizen/beevil-knievel/raw/main/submission/hart_phase2_report.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#f59e0b] transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>2-Page IEEE Report (PDF)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/atharveeee-netizen/beevil-knievel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#f59e0b] transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>Source Code Repository</span>
                </a>
              </li>
              <li>
                <span className="text-[#64748b] text-[11px]">
                  BOM Cost: $64.54 USD (₹5,380)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Reproducibility & Truth Disclaimer */}
        <div className="pt-6 border-t border-[#1d2332] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#64748b]">
          <div>
            Evaluated on hardware bench prototype. Physical sensor registers polled dynamically; absent peripherals report NOT_CONNECTED.
          </div>
          <div className="flex items-center gap-4">
            <span>License: MIT</span>
            <span>•</span>
            <span>IEEE HardwAIre Challenge 2026</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
