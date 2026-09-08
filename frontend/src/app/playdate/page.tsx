"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PlaydateRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to the dedicated field app
    router.replace("/field");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#090b10] text-[#f1f5f9] flex flex-col items-center justify-center p-6 font-mono text-center">
      <div className="max-w-md p-6 rounded-sm bg-[#11141d] border border-[#283144] space-y-4">
        <div className="text-xs text-[#f59e0b] font-bold uppercase tracking-wider">
          Redirecting to Industrial Field Interface...
        </div>
        <p className="text-xs text-[#94a3b8] font-sans">
          The retro console emulator has been superseded by the canonical IEEE Phase 2 Field Application and Operations Console.
        </p>
        <div className="flex flex-col gap-2 pt-2">
          <Link
            href="/field"
            className="px-4 py-2.5 rounded bg-[#f59e0b] text-[#090b10] font-bold text-xs uppercase"
          >
            Launch Field App (/field)
          </Link>
          <Link
            href="/console"
            className="px-4 py-2.5 rounded bg-[#181d28] border border-[#283144] text-[#f1f5f9] text-xs uppercase"
          >
            Launch Telemetry Console (/console)
          </Link>
        </div>
      </div>
    </div>
  );
}
