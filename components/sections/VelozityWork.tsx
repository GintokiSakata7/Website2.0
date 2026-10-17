'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ScanfeastTabInfo {
  id: 'kds' | 'diner' | 'manager';
  label: string;
  badge: string;
  src: string;
  url: string;
  telemetry: string;
}

interface QuantumTabInfo {
  id: 'command' | 'judge' | 'checkin' | 'teams';
  label: string;
  badge: string;
  src: string;
  url: string;
  telemetry: string;
}

export default function VelozityWork() {
  const scanfeastTabs: ScanfeastTabInfo[] = [
    {
      id: 'kds',
      label: 'Kitchen KDS Queue',
      badge: 'FIFO ENGINE',
      src: '/scanfeast/images/kds.png',
      url: 'scanfeast.com/kds',
      telemetry: 'FIFO Queue • 3 Active Tickets • Auto ETA Sync',
    },
    {
      id: 'diner',
      label: 'Diner QR Mobile',
      badge: 'CONTACTLESS WEB',
      src: '/scanfeast/images/diner.png',
      url: 'scanfeast.com/order',
      telemetry: 'Instant QR Scan • Zero App Download • Live Chat',
    },
    {
      id: 'manager',
      label: 'Manager Operations',
      badge: 'LIVE CONTROL',
      src: '/scanfeast/images/manager.png',
      url: 'scanfeast.com/admin',
      telemetry: 'Live Revenue • Active Tables: 18/22 • Rush Hour Control',
    },
  ];

  const quantumTabs: QuantumTabInfo[] = [
    {
      id: 'command',
      label: 'Command Hub',
      badge: '36H RUNTIME',
      src: '/quantumarena/images/Screenshot 2026-08-25 204631.png',
      url: 'quantumarena.io/command',
      telemetry: 'Master Ops • 1,500+ Participants • Real-Time Stream',
    },
    {
      id: 'judge',
      label: 'Judge Matrix',
      badge: '24 JUDGES LIVE',
      src: '/quantumarena/images/Screenshot 2026-08-25 204859.png',
      url: 'quantumarena.io/judge',
      telemetry: 'Blind Scoring • 320 Teams Evaluated • Top-3 Consolidation',
    },
    {
      id: 'checkin',
      label: 'QR Scanner Pass',
      badge: '< 4.2s SCAN',
      src: '/quantumarena/images/Screenshot 2026-08-25 204746.png',
      url: 'quantumarena.io/checkin',
      telemetry: 'Venue Gate Intake • Multi-Day Attendance • Instant Validation',
    },
    {
      id: 'teams',
      label: 'Participant Roster',
      badge: 'TEAM REPOSITORY',
      src: '/quantumarena/images/Screenshot 2026-08-25 204657.png',
      url: 'quantumarena.io/teams',
      telemetry: 'Identity Verification • Tech Stack Mapping • Scorecards',
    },
  ];

  const [activeScanfeastTab, setActiveScanfeastTab] = useState<ScanfeastTabInfo>(scanfeastTabs[0]);
  const [activeQuantumTab, setActiveQuantumTab] = useState<QuantumTabInfo>(quantumTabs[0]);
  const [activeAdsTab, setActiveAdsTab] = useState<'roas' | 'creatives' | 'funnel'>('roas');

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
              Explore concrete products and growth systems engineered by Majin Studios — featuring verified architecture, production interfaces, and real metrics.
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

        {/* =========================================================================
            CASE STUDY 01: SCANFEAST PLATFORM
           ========================================================================= */}
        <div className="bg-white rounded-3xl border border-black/8 shadow-card overflow-hidden mb-12 lg:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Info Column */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-black/8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono font-bold text-[#66756d]">01 / CASE STUDY</span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#063d27]/8 text-[#063d27] border border-[#063d27]/15 font-mono">
                    SaaS & REAL-TIME WEB
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a0e0c] mb-2 tracking-tight">
                  ScanFeast Platform
                </h3>
                <p className="text-sm font-semibold text-[#063d27] mb-4">
                  Smart Contactless Restaurant Ordering & Kitchen Operations System
                </p>

                <p className="text-xs sm:text-sm text-[#4a5750] leading-relaxed mb-6">
                  Dine-in restaurants struggle with manual paper tickets and communication bottlenecks between diners and kitchens. ScanFeast unified diner ordering, kitchen display queues, and manager analytics into one synchronized real-time web operating layer.
                </p>

                {/* Key Deliverables & Highlights */}
                <div className="space-y-2.5 mb-8 text-xs text-[#3b4741]">
                  <div className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 text-[#059669] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span><strong>Diner Mobile Web:</strong> Frictionless QR scanning with instant dynamic menu & order placement.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 text-[#059669] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span><strong>Kitchen KDS:</strong> Real-time FIFO queue with automated cook timers & delay warnings.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 text-[#059669] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span><strong>Manager Console:</strong> Live revenue tracking, menu pricing controls, and rush-hour buffers.</span>
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {['React', 'Node.js', 'Socket.IO', 'MongoDB', 'Express', 'TailwindCSS'].map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-md bg-[#f1f4f1] text-[#3b4741] text-[11px] font-medium border border-black/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Metrics and Link */}
              <div className="pt-6 border-t border-black/8 flex items-center justify-between gap-4">
                <div>
                  <div className="text-2xl font-black text-[#0a0e0c]">&lt; 60s</div>
                  <div className="text-[11px] text-[#66756d]">Order Placement Flow</div>
                </div>
                <div className="border-l border-black/8 pl-6">
                  <div className="text-2xl font-black text-[#0a0e0c]">100%</div>
                  <div className="text-[11px] text-[#66756d]">Digital Workflow</div>
                </div>
                <Link
                  href="/scanfeast"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#0a0e0c] hover:bg-[#063d27] px-4 py-2.5 rounded-full transition-all shadow-sm ml-auto"
                >
                  <span>Case Study</span>
                  <span className="text-[#00e676]">→</span>
                </Link>
              </div>
            </div>

            {/* Right Rich Visual Showcase Column */}
            <div className="lg:col-span-7 bg-[#0b0f0d] p-5 sm:p-7 flex flex-col justify-between">
              {/* Interactive Viewport Switcher Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 backdrop-blur-md">
                  {scanfeastTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveScanfeastTab(tab)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        activeScanfeastTab.id === tab.id
                          ? 'bg-[#063d27] text-white shadow-sm border border-[#00e676]/30'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-[#063d27]/40 px-3 py-1 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] animate-pulse" />
                  <span>{activeScanfeastTab.badge}</span>
                </div>
              </div>

              {/* Main Screenshot Display Frame with Browser Chrome */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#050706] shadow-2xl group min-h-[380px] flex flex-col">
                {/* Browser Top Bar */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-black/60 border-b border-white/10 backdrop-blur-sm z-20">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    <span className="text-[11px] font-mono font-bold text-neutral-300 ml-2 tracking-wide">
                      SCANFEAST // {activeScanfeastTab.label.toUpperCase()}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2.5 py-0.5 rounded border border-white/8">
                    {activeScanfeastTab.url}
                  </span>
                </div>

                {/* Viewport Display Area */}
                <div className="relative w-full h-[320px] sm:h-[350px] overflow-hidden bg-[#070a08]">
                  <Image
                    key={activeScanfeastTab.id}
                    src={activeScanfeastTab.src}
                    alt={activeScanfeastTab.label}
                    fill
                    sizes="(max-width: 1200px) 100vw, 800px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    priority
                  />

                  {/* Subtle Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Overlapping Diner Mobile Mockup for multi-device depth */}
                  <div className="absolute -bottom-4 right-4 w-[110px] sm:w-[130px] h-[210px] sm:h-[240px] rounded-2xl border-2 border-white/20 bg-black shadow-2xl overflow-hidden z-10 transition-transform duration-300 hover:-translate-y-2">
                    <Image
                      src="/scanfeast/images/diner.png"
                      alt="Diner Mobile Experience"
                      fill
                      sizes="150px"
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    <div className="absolute bottom-1.5 left-2 right-2 text-center text-[9px] font-mono font-bold text-white bg-[#063d27]/90 rounded py-0.5 border border-[#00e676]/30">
                      DINER QR VIEW
                    </div>
                  </div>

                  {/* Floating Telemetry Badges */}
                  <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-[#00e676] animate-pulse" />
                      <span>WEBSOCKET BROADCAST: ACTIVE</span>
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono text-neutral-300 shadow-lg">
                      <span>ORDER PLACEMENT: &lt; 60s</span>
                    </div>
                  </div>
                </div>

                {/* Sub-bar Telemetry */}
                <div className="px-4 py-2 bg-black/80 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span className="truncate">{activeScanfeastTab.telemetry}</span>
                  <span className="text-[#00e676] shrink-0 font-bold ml-2">● 0 PACKET LOSS</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-neutral-400">
                <span>Architecture: Express REST + Socket.IO Cluster</span>
                <span className="font-semibold text-neutral-200">Tested across 15+ concurrent devices</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            CASE STUDY 02: QUANTUM ARENA PLATFORM
           ========================================================================= */}
        <div className="bg-white rounded-3xl border border-black/8 shadow-card overflow-hidden mb-12 lg:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Info Column */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-black/8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono font-bold text-[#66756d]">02 / CASE STUDY</span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#063d27]/8 text-[#063d27] border border-[#063d27]/15 font-mono">
                    EVENT INFRASTRUCTURE
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a0e0c] mb-2 tracking-tight">
                  Quantum Arena
                </h3>
                <p className="text-sm font-semibold text-[#063d27] mb-4">
                  End-to-End Digital Operations Platform Behind a 36-Hour Hackathon
                </p>

                <p className="text-xs sm:text-sm text-[#4a5750] leading-relaxed mb-6">
                  Coordinating check-in, verification, judging, and leaderboard updates for massive competitive events is typically chaotic. Quantum Arena provided a unified digital engine powering participant intake, QR check-in, judging portals, and automated post-event certification.
                </p>

                {/* Key Deliverables & Highlights */}
                <div className="space-y-2.5 mb-8 text-xs text-[#3b4741]">
                  <div className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 text-[#059669] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span><strong>QR Check-in & Intake:</strong> Rapid physical venue verification under 5 seconds per participant.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 text-[#059669] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span><strong>Dedicated Judge Portal:</strong> Blind scoring rubrics, master evaluation grids, and live leaderboards.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 text-[#059669] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span><strong>Certificate Engine:</strong> Automated image-based certificate generation and bulk distribution.</span>
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {['React 19', 'Vite', 'Node.js', 'Express', 'MongoDB', 'Cloudinary API'].map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-md bg-[#f1f4f1] text-[#3b4741] text-[11px] font-medium border border-black/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Metrics and Link */}
              <div className="pt-6 border-t border-black/8 flex items-center justify-between gap-4">
                <div>
                  <div className="text-2xl font-black text-[#0a0e0c]">1,500+</div>
                  <div className="text-[11px] text-[#66756d]">Participants Handled</div>
                </div>
                <div className="border-l border-black/8 pl-6">
                  <div className="text-2xl font-black text-[#0a0e0c]">36H</div>
                  <div className="text-[11px] text-[#66756d]">Continuous Operations</div>
                </div>
                <Link
                  href="/quantumarena"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#0a0e0c] hover:bg-[#063d27] px-4 py-2.5 rounded-full transition-all shadow-sm ml-auto"
                >
                  <span>Case Study</span>
                  <span className="text-[#00e676]">→</span>
                </Link>
              </div>
            </div>

            {/* Right Rich Visual Showcase Column */}
            <div className="lg:col-span-7 bg-[#0b0f0d] p-5 sm:p-7 flex flex-col justify-between">
              {/* Interactive Viewport Switcher Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 backdrop-blur-md overflow-x-auto">
                  {quantumTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveQuantumTab(tab)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                        activeQuantumTab.id === tab.id
                          ? 'bg-[#063d27] text-white shadow-sm border border-[#00e676]/30'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-[#063d27]/40 px-3 py-1 rounded-full border border-emerald-500/30 self-start sm:self-auto shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] animate-pulse" />
                  <span>{activeQuantumTab.badge}</span>
                </div>
              </div>

              {/* Main Screenshot Display Frame with Browser Chrome */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#050706] shadow-2xl group min-h-[380px] flex flex-col">
                {/* Browser Top Bar */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-black/60 border-b border-white/10 backdrop-blur-sm z-20">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    <span className="text-[11px] font-mono font-bold text-neutral-300 ml-2 tracking-wide">
                      QUANTUM ARENA // {activeQuantumTab.label.toUpperCase()}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2.5 py-0.5 rounded border border-white/8">
                    {activeQuantumTab.url}
                  </span>
                </div>

                {/* Viewport Display Area */}
                <div className="relative w-full h-[320px] sm:h-[350px] overflow-hidden bg-[#070a08]">
                  <Image
                    key={activeQuantumTab.id}
                    src={activeQuantumTab.src}
                    alt={activeQuantumTab.label}
                    fill
                    sizes="(max-width: 1200px) 100vw, 800px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    priority
                  />

                  {/* Subtle Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Inset Detail Overlay for layered depth */}
                  <div className="absolute bottom-4 right-4 w-[160px] sm:w-[190px] h-[105px] sm:h-[120px] rounded-xl border border-white/25 bg-black/80 backdrop-blur-md shadow-2xl overflow-hidden z-10 transition-transform duration-300 hover:scale-105">
                    <Image
                      src="/quantumarena/images/Screenshot 2026-08-25 204746.png"
                      alt="QR Gate Scanner Module"
                      fill
                      sizes="200px"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />
                    <div className="absolute bottom-1.5 left-2 right-2 text-center text-[9px] font-mono font-bold text-white bg-[#063d27]/90 rounded py-0.5 border border-[#00e676]/30">
                      LIVE QR GATE SCANNER
                    </div>
                  </div>

                  {/* Floating Telemetry Badges */}
                  <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-[#00e676] animate-pulse" />
                      <span>36H ZERO CRASH UPTIME</span>
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono text-neutral-300 shadow-lg">
                      <span>CHECK-IN SPEED: &lt; 4.2s / PARTICIPANT</span>
                    </div>
                  </div>
                </div>

                {/* Sub-bar Telemetry */}
                <div className="px-4 py-2 bg-black/80 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span className="truncate">{activeQuantumTab.telemetry}</span>
                  <span className="text-[#00e676] shrink-0 font-bold ml-2">● 100% OPERATIONAL</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-neutral-400">
                <span>Architecture: Express REST + MongoDB + Cloudinary CDN</span>
                <span className="font-semibold text-neutral-200">Deployed on production high-availability cloud</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            CASE STUDY 03: DIGITAL MARKETING & PAID ACQUISITION ENGINE
           ========================================================================= */}
        <div className="bg-white rounded-3xl border border-black/8 shadow-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Info Column */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-black/8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono font-bold text-[#66756d]">03 / CASE STUDY</span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#063d27]/8 text-[#063d27] border border-[#063d27]/15 font-mono">
                    PERFORMANCE MARKETING & ADS
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a0e0c] mb-2 tracking-tight">
                  Full-Funnel Paid Acquisition & Ads
                </h3>
                <p className="text-sm font-semibold text-[#063d27] mb-4">
                  Multi-Channel Meta & Google Ads Scaling with High-Converting Creative
                </p>

                <p className="text-xs sm:text-sm text-[#4a5750] leading-relaxed mb-6">
                  Most brands waste ad spend on uninspiring creatives and broken landing pages. We build a cohesive acquisition loop: thumb-stopping creative hooks, precision Meta & Google targeting, and high-velocity landing pages engineered for immediate conversions.
                </p>

                {/* Key Deliverables & Highlights */}
                <div className="space-y-2.5 mb-8 text-xs text-[#3b4741]">
                  <div className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 text-[#059669] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span><strong>High-Converting Ad Creatives:</strong> Motion graphics, static hooks, and viral social angles.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 text-[#059669] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span><strong>Targeting & Retargeting:</strong> Full-funnel Meta Ads Manager & Google Search/PMax setup.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 text-[#059669] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span><strong>Landing Page CRO:</strong> Sub-second load speeds and frictionless checkout/lead capture.</span>
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {['Meta Ads Manager', 'Google Ads', 'GA4 Analytics', 'Conversions API', 'A/B Testing'].map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-md bg-[#f1f4f1] text-[#3b4741] text-[11px] font-medium border border-black/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Metrics and Link */}
              <div className="pt-6 border-t border-black/8 flex items-center justify-between gap-4">
                <div>
                  <div className="text-2xl font-black text-[#0a0e0c]">4.2x</div>
                  <div className="text-[11px] text-[#66756d]">Verified ROAS</div>
                </div>
                <div className="border-l border-black/8 pl-6">
                  <div className="text-2xl font-black text-[#0a0e0c]">+140%</div>
                  <div className="text-[11px] text-[#66756d]">Conversion Lift</div>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#0a0e0c] hover:bg-[#063d27] px-4 py-2.5 rounded-full transition-all shadow-sm ml-auto"
                >
                  <span>Scale Ads</span>
                  <span className="text-[#00e676]">→</span>
                </a>
              </div>
            </div>

            {/* Right Campaign Showcase */}
            <div className="lg:col-span-7 bg-[#0b0f0d] p-5 sm:p-7 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 backdrop-blur-md">
                  <button
                    onClick={() => setActiveAdsTab('roas')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeAdsTab === 'roas'
                        ? 'bg-[#063d27] text-white shadow-sm border border-[#00e676]/30'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    ROAS Metrics
                  </button>
                  <button
                    onClick={() => setActiveAdsTab('funnel')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeAdsTab === 'funnel'
                        ? 'bg-[#063d27] text-white shadow-sm border border-[#00e676]/30'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Funnel Architecture
                  </button>
                  <button
                    onClick={() => setActiveAdsTab('creatives')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeAdsTab === 'creatives'
                        ? 'bg-[#063d27] text-white shadow-sm border border-[#00e676]/30'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Creative Testing
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-[#063d27]/40 px-3 py-1 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] animate-pulse" />
                  <span>ACTIVE ADS ENGINE</span>
                </div>
              </div>

              {/* Interactive Performance Blueprint Panel */}
              <div className="rounded-2xl border border-white/10 bg-[#050706] p-6 shadow-2xl space-y-5">
                {activeAdsTab === 'roas' && (
                  <>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-3.5 rounded-xl bg-[#063d27]/30 border border-[#00e676]/25">
                        <div className="text-[10px] font-mono text-emerald-300">COST PER ACQUISITION</div>
                        <div className="text-xl sm:text-2xl font-black text-white mt-1">-38% Reduction</div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-[10px] font-mono text-neutral-400">AVERAGE CTR</div>
                        <div className="text-xl sm:text-2xl font-black text-white mt-1">3.64%</div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-[10px] font-mono text-neutral-400">TRACKING MATCH</div>
                        <div className="text-xl sm:text-2xl font-black text-[#00e676] mt-1">99.4% CAPI</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8 space-y-3">
                      <div className="flex justify-between items-center text-xs text-neutral-300 font-semibold">
                        <span>Campaign Efficiency Waterfall</span>
                        <span className="text-[#00e676] font-mono font-bold">4.2x Blended ROAS</span>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                            <span>Meta Dynamic Creative (Top of Funnel)</span>
                            <span className="font-mono text-white">3.8x ROAS</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full bg-[#00e676] rounded-full" style={{ width: '85%' }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                            <span>Google Search & High-Intent Retargeting</span>
                            <span className="font-mono text-white">4.9x ROAS</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full bg-emerald-400 rounded-full" style={{ width: '95%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeAdsTab === 'funnel' && (
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8">
                    <div className="text-xs font-bold text-white mb-3">Multi-Channel Attribution Loop</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="font-bold text-[#00e676] text-[11px]">01 / TOP FUNNEL</div>
                        <div className="font-bold text-white mt-1">Video & UGC Hooks</div>
                        <div className="text-[11px] text-neutral-400 mt-1">High-velocity testing across 12 unique pain points.</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="font-bold text-[#00e676] text-[11px]">02 / MID FUNNEL</div>
                        <div className="font-bold text-white mt-1">Social Proof & Demos</div>
                        <div className="text-[11px] text-neutral-400 mt-1">Customer breakdowns and real conversion proof.</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="font-bold text-[#00e676] text-[11px]">03 / BOTTOM FUNNEL</div>
                        <div className="font-bold text-white mt-1">Dynamic Retargeting</div>
                        <div className="text-[11px] text-neutral-400 mt-1">Cart recovery and scarcity-driven limited offers.</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeAdsTab === 'creatives' && (
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8 space-y-2.5">
                    <div className="text-xs font-bold text-white">Active Creative Testing Pipeline</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-3 rounded-lg bg-black/60 border border-white/10">
                        <div className="text-[#00e676] font-mono text-[10px]">WINNING ANGLE #01</div>
                        <div className="font-bold text-white mt-0.5">&ldquo;Stop Wasting 40% on Food Waste&rdquo;</div>
                        <div className="text-[10px] text-neutral-400 mt-1">CTR: 4.12% • CVR: 8.4%</div>
                      </div>
                      <div className="p-3 rounded-lg bg-black/60 border border-white/10">
                        <div className="text-[#00e676] font-mono text-[10px]">WINNING ANGLE #02</div>
                        <div className="font-bold text-white mt-0.5">&ldquo;Run Your Hackathon On Autopilot&rdquo;</div>
                        <div className="text-[10px] text-neutral-400 mt-1">CTR: 3.88% • CVR: 9.1%</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-3 bg-black/80 text-white rounded-xl text-xs flex items-center justify-between font-mono border border-white/10">
                  <span className="text-[#00e676]">● Active Creative Library: 40+ variations tested monthly</span>
                  <span className="text-neutral-400">Targeted ROAS: 4.2x+</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-neutral-400">
                <span>Attribution: Server-Side Meta Conversions API + GA4</span>
                <span className="font-semibold text-neutral-200">Data-backed optimization every 48 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
