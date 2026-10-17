'use client';

import React from 'react';

export default function VelozityWhyUs() {
  const comparisons = [
    {
      metric: 'Communication & Leadership',
      traditional: 'Layered account managers, delayed relays, junior coders executing the work.',
      majin: 'Direct technical collaboration with founders Dhanush & Rishi from day one.',
    },
    {
      metric: 'Speed of Iteration',
      traditional: 'Slow waterfall cycles. Weeks of meetings before seeing staging links.',
      majin: '48-hour iteration sprints with live interactive staging previews.',
    },
    {
      metric: 'Scope Integration',
      traditional: 'Fragmented vendors: one agency for code, another for ads, another for design.',
      majin: 'One unified powerhouse: Software engineering + AI agents + Paid ads + Brand identity.',
    },
    {
      metric: 'Pricing Model',
      traditional: 'Opaque hourly billing with surprise scope creep charges.',
      majin: 'Transparent, milestone-based fixed pricing agreed upon upfront.',
    },
    {
      metric: 'Code Quality & Ownership',
      traditional: 'Messy third-party templates with heavy vendor lock-in.',
      majin: 'Clean TypeScript/Next.js repositories with 100% IP ownership transferred to you.',
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-white border-t border-black/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-500/20 text-xs font-semibold text-emerald-800 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>THE MAJIN ADVANTAGE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0a0e0c] tracking-tight mb-4">
            Why High-Growth Teams{' '}
            <span className="gradient-text-emerald">Choose Majin Studios.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#526159]">
            We designed our studio from the ground up to eliminate the bloated overhead, generic templates, and endless delays of legacy agencies.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-[#f8faf8] rounded-3xl border border-black/8 overflow-hidden shadow-card">
          <div className="grid grid-cols-12 bg-white border-b border-black/8 p-5 text-xs font-bold text-[#0a0e0c] tracking-wider uppercase">
            <div className="col-span-12 sm:col-span-4">Evaluation Dimension</div>
            <div className="col-span-12 sm:col-span-4 text-[#66756d] mt-2 sm:mt-0">Traditional Agencies</div>
            <div className="col-span-12 sm:col-span-4 text-[#063d27] mt-2 sm:mt-0 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00e676]" />
              <span>Majin Studios Standard</span>
            </div>
          </div>

          <div className="divide-y divide-black/6">
            {comparisons.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 p-5 sm:p-6 text-xs sm:text-sm items-start hover:bg-white/60 transition-colors"
              >
                <div className="col-span-12 sm:col-span-4 font-bold text-[#0a0e0c] mb-2 sm:mb-0">
                  {item.metric}
                </div>
                <div className="col-span-12 sm:col-span-4 text-[#66756d] pr-4 mb-2 sm:mb-0 flex items-start gap-2">
                  <span className="text-neutral-400 font-bold">✕</span>
                  <span>{item.traditional}</span>
                </div>
                <div className="col-span-12 sm:col-span-4 font-medium text-[#063d27] flex items-start gap-2 bg-emerald-50/50 p-2 sm:p-0 rounded-xl sm:bg-transparent">
                  <span className="text-[#059669] font-bold">✓</span>
                  <span>{item.majin}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Founder Bio Mini-Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
          <div className="p-6 rounded-3xl bg-[#f8faf8] border border-black/8 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#063d27] text-white flex items-center justify-center font-extrabold text-xl shadow-md">
              DA
            </div>
            <div>
              <div className="text-xs font-mono text-emerald-700 font-bold">CO-FOUNDER & CPO</div>
              <h4 className="text-base font-extrabold text-[#0a0e0c]">Dhanush A</h4>
              <p className="text-xs text-[#526159] mt-0.5">
                Product strategy, AI applications, full-stack development, and UX velocity.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#f8faf8] border border-black/8 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0a0e0c] text-white flex items-center justify-center font-extrabold text-xl shadow-md">
              RC
            </div>
            <div>
              <div className="text-xs font-mono text-emerald-700 font-bold">CO-FOUNDER & CTO</div>
              <h4 className="text-base font-extrabold text-[#0a0e0c]">Rishivardhan Chepuri</h4>
              <p className="text-xs text-[#526159] mt-0.5">
                Technical architecture, AI/ML agentic systems, scalable cloud infra, and algorithms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
