"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function VerifyBatchPage() {
  const params = useParams();
  const batchId = params.batch_id as string;
  const [loading, setLoading] = useState(true);
  
  // Dummy state for demonstration purposes
  const [ledgerStatus, setLedgerStatus] = useState<any>(null);

  useEffect(() => {
    // In a real app we would fetch from the gateway API
    // fetch(`/api/v1/batches/${batchId}/verify`)
    setTimeout(() => {
      setLedgerStatus({
        verified: true,
        chain_intact: true,
        events: 6,
        tampered: false,
        on_chain_anchored: true,
        contract: "0xHoneyChainAddress",
      });
      setLoading(false);
    }, 1500);
  }, [batchId]);

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-200 p-8 font-sans">
      <div className="max-w-2xl mx-auto border border-slate-800 rounded-xl bg-slate-900/50 p-6 backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-amber-500 mb-2">HoneyChain Passport</h1>
        <p className="text-slate-400 mb-8">Verification for Batch: <span className="font-mono text-amber-400">{batchId}</span></p>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-emerald-950/30 border border-emerald-900/50">
              <h2 className="text-xl font-semibold text-emerald-400 flex items-center gap-2">
                <span>✓</span> Local Ledger Verified
              </h2>
              <p className="text-slate-400 text-sm mt-1">High-frequency IoT telemetry hash chain is intact.</p>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-500">Events Recorded:</span>
                  <p className="font-mono">{ledgerStatus?.events}</p>
                </div>
                <div>
                  <span className="text-slate-500">Tamper Status:</span>
                  <p className="font-mono text-emerald-400">CLEAN</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-amber-950/30 border border-amber-900/50">
              <h2 className="text-xl font-semibold text-amber-400 flex items-center gap-2">
                <span>🔗</span> Blockchain Anchored
              </h2>
              <p className="text-slate-400 text-sm mt-1">Batch Merkle root secured on Polygon.</p>
              <div className="mt-4 grid grid-cols-1 gap-4 text-sm">
                <div>
                  <span className="text-slate-500">Smart Contract:</span>
                  <p className="font-mono text-xs break-all text-amber-200/70">{ledgerStatus?.contract}</p>
                </div>
              </div>
            </div>
            
            <button className="w-full py-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold transition-colors">
              View Full Audit Trail
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
