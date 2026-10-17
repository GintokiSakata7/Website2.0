'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function VelozityWork() {
  const [activeScanfeastView, setActiveScanfeastView] = useState<'diner' | 'kds' | 'manager'>('kds');

  return (
    <section id="work" className="py-24 lg:py-32 bg-[#f8faf8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/8 text-xs font-semibold text-[#0a0e0c] mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e676]" />
              <span>PROVEN PRODUCTION TRACK RECORD</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0a0e0c] tracking-tight">
              Featured Case Studies.{' '}
              <span className="gradient-text-emerald">Built & Scaled.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#526159] mt-3">
              Explore concrete products and growth systems engineered by Majin Studios — with real metrics, verified architecture, and zero fluff.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0a0e0c] text-white font-semibold text-xs sm:text-sm hover:bg-[#063d27] transition-all self-start md:self-auto shadow-sm"
          >
            <span>Have a project in mind?</span>
            <span className="text-[#00e676]">→</span>
          </a>
        </div>

        {/* CASE STUDY 01: SCANFEAST */}
        <div className="bg-white rounded-3xl border border-black/8 shadow-card overflow-hidden mb-12 lg:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Info Column */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-black/8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono font-bold text-[#66756d]">01 / CASE STUDY</span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    SaaS & REAL-TIME WEB
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a0e0c] mb-3">
                  ScanFeast Platform
                </h3>
                <p className="text-sm font-medium text-emerald-800 mb-4">
                  Smart Contactless Restaurant Ordering & Kitchen Operations System
                </p>

                <p className="text-xs sm:text-sm text-[#4a5750] leading-relaxed mb-6">
                  Dine-in restaurants struggle with manual paper tickets and communication bottlenecks between diners and kitchens. ScanFeast transformed the ordering flow into a fully synchronized real-time ecosystem connecting diners, kitchen displays, and management.
                </p>

                {/* Key Deliverables & Highlights */}
                <div className="space-y-2.5 mb-8 text-xs text-[#3b4741]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#059669] font-bold">✓</span>
                    <span><strong>Diner Mobile Web:</strong> QR-code scanning with instant dynamic menu & order placement.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#059669] font-bold">✓</span>
                    <span><strong>Kitchen KDS:</strong> Real-time FIFO queue with automated cook timers & delay warnings.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#059669] font-bold">✓</span>
                    <span><strong>Manager Console:</strong> Live revenue tracking, menu pricing controls, and rush-hour buffers.</span>
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {['React', 'Node.js', 'Socket.IO', 'MongoDB', 'Express', 'TailwindCSS'].map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-md bg-[#f1f4f1] text-[#3b4741] text-[11px] font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Metrics and Link */}
              <div className="pt-6 border-t border-black/8 flex items-center justify-between">
                <div>
                  <div className="text-xl font-black text-[#059669]">&lt; 60s</div>
                  <div className="text-[11px] text-[#66756d]">Order Placement Flow</div>
                </div>
                <div className="border-l border-black/8 pl-6">
                  <div className="text-xl font-black text-[#0a0e0c]">100%</div>
                  <div className="text-[11px] text-[#66756d]">Digital Workflow</div>
                </div>
                <Link
                  href="/scanfeast"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#063d27] hover:text-[#00e676] bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200 hover:bg-[#063d27] hover:border-[#063d27] transition-all"
                >
                  <span>Read Full Case Study</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Right Interactive Viewport Column */}
            <div className="lg:col-span-7 bg-[#f8faf8] p-6 sm:p-8 flex flex-col justify-between">
              {/* Interactive Viewport Switcher */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#0a0e0c]">Interactive System Preview</span>
                <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-black/8 shadow-sm">
                  <button
                    onClick={() => setActiveScanfeastView('diner')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      activeScanfeastView === 'diner'
                        ? 'bg-[#063d27] text-white shadow-sm'
                        : 'text-[#66756d] hover:text-[#0a0e0c]'
                    }`}
                  >
                    Diner QR View
                  </button>
                  <button
                    onClick={() => setActiveScanfeastView('kds')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      activeScanfeastView === 'kds'
                        ? 'bg-[#063d27] text-white shadow-sm'
                        : 'text-[#66756d] hover:text-[#0a0e0c]'
                    }`}
                  >
                    Kitchen KDS Queue
                  </button>
                  <button
                    onClick={() => setActiveScanfeastView('manager')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      activeScanfeastView === 'manager'
                        ? 'bg-[#063d27] text-white shadow-sm'
                        : 'text-[#66756d] hover:text-[#0a0e0c]'
                    }`}
                  >
                    Manager Control
                  </button>
                </div>
              </div>

              {/* View Preview Card */}
              <div className="bg-white rounded-2xl border border-black/8 p-5 shadow-sm min-h-[300px] flex flex-col justify-between">
                {activeScanfeastView === 'diner' && (
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-black/6 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#0a0e0c]">Table #04 • Diner Session</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          CONNECTED
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#059669]">Est. Time: 12 min</span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="p-3 rounded-xl bg-[#f8faf8] border border-black/5 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-[#0a0e0c]">1x Truffle Wild Mushroom Risotto</div>
                          <div className="text-[11px] text-[#66756d]">Customization: Extra Parmesan, No Garlic</div>
                        </div>
                        <span className="text-xs font-bold text-emerald-800">$18.50</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#f8faf8] border border-black/5 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-[#0a0e0c]">2x Artisan Crafted Mint Mojito</div>
                          <div className="text-[11px] text-[#66756d]">Status: Being Prepared at Bar</div>
                        </div>
                        <span className="text-xs font-bold text-emerald-800">$14.00</span>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/60 flex items-center justify-between text-xs">
                      <span className="text-[#063d27] font-semibold">Kitchen FIFO Order Broadcasted</span>
                      <span className="text-emerald-700 font-bold">Ticket #204</span>
                    </div>
                  </div>
                )}

                {activeScanfeastView === 'kds' && (
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-black/6 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#0a0e0c]">Kitchen Display System (KDS)</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                          FIFO QUEUE (3 ACTIVE)
                        </span>
                      </div>
                      <span className="text-xs font-bold text-emerald-700">Auto ETA Sync</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-50/40">
                        <div className="flex justify-between items-center text-xs font-bold mb-1">
                          <span className="text-[#063d27]">TICKET #204</span>
                          <span className="text-xs font-mono text-emerald-700">08:42 REMAINING</span>
                        </div>
                        <div className="text-xs font-medium text-[#0a0e0c]">Table #04 • 3 Items</div>
                        <div className="text-[11px] text-[#66756d] mt-1">Truffle Risotto (Prep) • Mojito (Ready)</div>
                      </div>

                      <div className="p-3.5 rounded-xl border border-black/10 bg-white">
                        <div className="flex justify-between items-center text-xs font-bold mb-1">
                          <span className="text-[#3b4741]">TICKET #205</span>
                          <span className="text-xs font-mono text-[#66756d]">14:10 REMAINING</span>
                        </div>
                        <div className="text-xs font-medium text-[#0a0e0c]">Table #11 • 2 Items</div>
                        <div className="text-[11px] text-[#66756d] mt-1">Wood-fired Margherita Pizza</div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#0a0e0c] text-white flex items-center justify-between text-xs font-mono">
                      <span className="text-[#00e676]">● WebSocket Sync: 0 packet loss</span>
                      <span className="text-neutral-400">Rush Hour: AUTO OFF</span>
                    </div>
                  </div>
                )}

                {activeScanfeastView === 'manager' && (
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-black/6 mb-4">
                      <span className="text-sm font-bold text-[#0a0e0c]">Live Manager Operations</span>
                      <span className="text-xs font-bold text-emerald-700">Real-Time Revenue</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                        <div className="text-[10px] text-[#66756d]">TODAY&apos;S REVENUE</div>
                        <div className="text-base font-black text-[#059669]">$4,820</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#f8faf8] border border-black/6">
                        <div className="text-[10px] text-[#66756d]">ACTIVE TABLES</div>
                        <div className="text-base font-black text-[#0a0e0c]">18 / 22</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#f8faf8] border border-black/6">
                        <div className="text-[10px] text-[#66756d]">AVG TICKET TIME</div>
                        <div className="text-base font-black text-[#0a0e0c]">11.4 min</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#f8faf8] border border-black/6 flex items-center justify-between text-xs">
                      <span className="text-[#3b4741]">Rush Hour Buffer Switch:</span>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                        OPTIMAL (No Delay)
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-[#66756d]">
                <span>Architecture: Express REST + Socket.IO Cluster</span>
                <span className="font-semibold text-[#0a0e0c]">Tested across 15+ devices simultaneously</span>
              </div>
            </div>
          </div>
        </div>

        {/* CASE STUDY 02: QUANTUM ARENA */}
        <div className="bg-white rounded-3xl border border-black/8 shadow-card overflow-hidden mb-12 lg:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Info Column */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-black/8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono font-bold text-[#66756d]">02 / CASE STUDY</span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    EVENT INFRASTRUCTURE
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a0e0c] mb-3">
                  Quantum Arena
                </h3>
                <p className="text-sm font-medium text-emerald-800 mb-4">
                  End-to-End Digital Operations Platform Behind a 36-Hour Hackathon
                </p>

                <p className="text-xs sm:text-sm text-[#4a5750] leading-relaxed mb-6">
                  Coordinating check-in, verification, judging, and leaderboard updates for massive competitive events is typically chaotic. Quantum Arena provided a unified digital engine powering participant intake, QR check-in, judging portals, and automated post-event certification.
                </p>

                {/* Key Deliverables & Highlights */}
                <div className="space-y-2.5 mb-8 text-xs text-[#3b4741]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#059669] font-bold">✓</span>
                    <span><strong>QR Check-in & Intake:</strong> Rapid physical venue verification under 5 seconds per participant.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#059669] font-bold">✓</span>
                    <span><strong>Dedicated Judge Portal:</strong> Blind scoring rubrics, master evaluation grids, and live leaderboards.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#059669] font-bold">✓</span>
                    <span><strong>Certificate Engine:</strong> Automated image-based certificate generation and bulk distribution.</span>
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {['React 19', 'Vite', 'Node.js', 'Express', 'MongoDB', 'Cloudinary API'].map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-md bg-[#f1f4f1] text-[#3b4741] text-[11px] font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Metrics and Link */}
              <div className="pt-6 border-t border-black/8 flex items-center justify-between">
                <div>
                  <div className="text-xl font-black text-[#059669]">1,500+</div>
                  <div className="text-[11px] text-[#66756d]">Participants Handled</div>
                </div>
                <div className="border-l border-black/8 pl-6">
                  <div className="text-xl font-black text-[#0a0e0c]">36H</div>
                  <div className="text-[11px] text-[#66756d]">Continuous Operations</div>
                </div>
                <Link
                  href="/quantumarena"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#063d27] hover:text-[#00e676] bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200 hover:bg-[#063d27] hover:border-[#063d27] transition-all"
                >
                  <span>Read Full Case Study</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Right Showcase Column */}
            <div className="lg:col-span-7 bg-[#f8faf8] p-6 sm:p-8 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#0a0e0c]">Event Operations Dashboard</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Live Sync
                </span>
              </div>

              <div className="bg-white rounded-2xl border border-black/8 p-5 shadow-sm space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="p-3 rounded-xl bg-[#f8faf8] border border-black/6">
                    <div className="text-[10px] text-[#66756d]">TEAMS EVALUATED</div>
                    <div className="text-base font-black text-[#0a0e0c]">320 / 320</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#f8faf8] border border-black/6">
                    <div className="text-[10px] text-[#66756d]">JUDGES ACTIVE</div>
                    <div className="text-base font-black text-[#0a0e0c]">24 Judges</div>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <div className="text-[10px] text-[#063d27]">QR SCAN SPEED</div>
                    <div className="text-base font-black text-[#059669]">&lt; 4.2s</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#f8faf8] border border-black/6">
                    <div className="text-[10px] text-[#66756d]">SERVER UPTIME</div>
                    <div className="text-base font-black text-[#0a0e0c]">100%</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#f8faf8] border border-black/6">
                  <div className="text-xs font-bold text-[#0a0e0c] mb-2">Live Judge Evaluation Matrix Sample</div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-white border border-black/5">
                      <span className="font-semibold text-[#0a0e0c]">Team #42 — Synapse AI Healthcare</span>
                      <span className="font-mono text-emerald-700 font-bold">Score: 94.5 / 100 [Rank 1]</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-white border border-black/5">
                      <span className="font-semibold text-[#0a0e0c]">Team #18 — CleanVolt Grid Systems</span>
                      <span className="font-mono text-emerald-700 font-bold">Score: 91.0 / 100 [Rank 2]</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#0a0e0c] text-white rounded-xl text-xs flex items-center justify-between font-mono">
                  <span className="text-[#00e676]">● 1,500+ Verification Emails & Certificates Dispatched</span>
                  <span className="text-neutral-400">Zero Manual Errors</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-[#66756d]">
                <span>Architecture: Express REST + MongoDB + Cloudinary CDN</span>
                <span className="font-semibold text-[#0a0e0c]">Deployed on production cloud</span>
              </div>
            </div>
          </div>
        </div>

        {/* CASE STUDY 03: DIGITAL MARKETING & PAID ACQUISITION */}
        <div className="bg-white rounded-3xl border border-black/8 shadow-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Info Column */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-black/8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono font-bold text-[#66756d]">03 / CASE STUDY</span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    PERFORMANCE MARKETING & ADS
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a0e0c] mb-3">
                  Full-Funnel Paid Acquisition & Ads
                </h3>
                <p className="text-sm font-medium text-emerald-800 mb-4">
                  Multi-Channel Meta & Google Ads Scaling with High-Converting Creative
                </p>

                <p className="text-xs sm:text-sm text-[#4a5750] leading-relaxed mb-6">
                  Most brands waste ad spend on uninspiring creatives and broken landing pages. We build a cohesive acquisition loop: thumb-stopping creative hooks, precision Meta & Google targeting, and high-velocity landing pages engineered for immediate conversions.
                </p>

                {/* Key Deliverables & Highlights */}
                <div className="space-y-2.5 mb-8 text-xs text-[#3b4741]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#059669] font-bold">✓</span>
                    <span><strong>High-Converting Ad Creatives:</strong> Motion graphics, static hooks, and viral social angles.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#059669] font-bold">✓</span>
                    <span><strong>Targeting & Retargeting:</strong> Full-funnel Meta Ads Manager & Google Search/PMax setup.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#059669] font-bold">✓</span>
                    <span><strong>Landing Page CRO:</strong> Sub-second load speeds and frictionless checkout/lead capture.</span>
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {['Meta Ads Manager', 'Google Ads', 'GA4 Analytics', 'Conversions API', 'A/B Testing'].map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-md bg-[#f1f4f1] text-[#3b4741] text-[11px] font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Metrics and Link */}
              <div className="pt-6 border-t border-black/8 flex items-center justify-between">
                <div>
                  <div className="text-xl font-black text-[#059669]">4.2x</div>
                  <div className="text-[11px] text-[#66756d]">Verified ROAS</div>
                </div>
                <div className="border-l border-black/8 pl-6">
                  <div className="text-xl font-black text-[#0a0e0c]">+140%</div>
                  <div className="text-[11px] text-[#66756d]">Conversion Lift</div>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#063d27] hover:text-[#00e676] bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200 hover:bg-[#063d27] hover:border-[#063d27] transition-all"
                >
                  <span>Scale Your Ads</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Right Campaign Showcase */}
            <div className="lg:col-span-7 bg-[#f8faf8] p-6 sm:p-8 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#0a0e0c]">Live Campaign Performance Blueprint</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  ROAS Engine
                </span>
              </div>

              <div className="bg-white rounded-2xl border border-black/8 p-5 shadow-sm space-y-4">
                <div className="grid grid-cols-3 gap-2.5 text-center">
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                    <div className="text-[10px] text-[#063d27]">COST PER ACQUISITION</div>
                    <div className="text-base font-black text-[#059669]">-38% Reduction</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#f8faf8] border border-black/6">
                    <div className="text-[10px] text-[#66756d]">CLICK-THROUGH (CTR)</div>
                    <div className="text-base font-black text-[#0a0e0c]">3.64%</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#f8faf8] border border-black/6">
                    <div className="text-[10px] text-[#66756d]">TRACKING ACCURACY</div>
                    <div className="text-base font-black text-[#0a0e0c]">99.4% CAPI</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#f8faf8] border border-black/6">
                  <div className="text-xs font-bold text-[#0a0e0c] mb-2">Multi-Channel Attribution Loop</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-white border border-black/5">
                      <div className="font-bold text-[#0a0e0c]">Top of Funnel</div>
                      <div className="text-[11px] text-[#66756d]">Video hooks & broad UGC creatives</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-black/5">
                      <div className="font-bold text-[#0a0e0c]">Mid Funnel</div>
                      <div className="text-[11px] text-[#66756d]">Social proof, case studies & demo ads</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-black/5">
                      <div className="font-bold text-[#0a0e0c]">Bottom Funnel</div>
                      <div className="text-[11px] text-[#66756d]">Dynamic retargeting & urgency offers</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#0a0e0c] text-white rounded-xl text-xs flex items-center justify-between font-mono">
                  <span className="text-[#00e676]">● Active Creative Library: 40+ variations tested monthly</span>
                  <span className="text-neutral-400">Targeted ROAS: 4.2x+</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-[#66756d]">
                <span>Attribution: Server-Side Meta Conversions API + GA4</span>
                <span className="font-semibold text-[#0a0e0c]">Data-backed optimization every 48 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
