"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, HelpCircle, CheckCircle2, ArrowRight, MessageSquare, ExternalLink } from "lucide-react";

export function NewsletterAndHelpSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section className="bg-[#0b101b] text-slate-100 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-4xl mx-auto space-y-20">
        
        {/* Newsletter Signup Form */}
        <div id="get-alerted" className="bg-slate-950/90 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6 flex flex-col items-center">
          <div className="p-3.5 bg-[#ffc833] text-slate-950 rounded-2xl shadow-lg">
            <Mail className="w-6 h-6" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Stay in Touch with Beevil Research!
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-md">
            Subscribe to receive new Edge AI model weights, dataset releases, and apiculture hardware updates.
          </p>

          {submitted ? (
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-6 py-3.5 rounded-2xl text-sm font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>You&apos;re subscribed to Beevil Knievel research dispatches!</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="w-full max-w-md flex flex-col sm:flex-row gap-3 items-center"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-5 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#ffc833] transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-[#ffc833] text-slate-950 hover:bg-amber-300 px-7 py-3.5 rounded-xl text-sm font-extrabold flex-shrink-0 shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                {loading ? "Submitting..." : "Subscribe"}
              </button>
            </form>
          )}
        </div>

        {/* Need Help Support Portal */}
        <div id="need-help" className="text-center space-y-6 flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Need Engineering Support or Custom Sizing?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-md">
            Our apiculture and hardware engineering team is here to assist with custom apiary topologies and university research inquiries.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 justify-center">
            <Link
              href="https://github.com/atharveeee-netizen/beevil-knievel/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-white inline-flex items-center gap-2 text-sm font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all"
            >
              <MessageSquare className="w-5 h-5 text-[#ffc833]" />
              <span>Open GitHub Issue</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="https://github.com/atharveeee-netizen/beevil-knievel"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ffc833] hover:bg-amber-300 text-slate-950 inline-flex items-center gap-2 text-sm font-extrabold px-6 py-3.5 rounded-xl shadow-lg transition-all"
            >
              <HelpCircle className="w-5 h-5 text-slate-950" />
              <span>Documentation &amp; FAQ</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

