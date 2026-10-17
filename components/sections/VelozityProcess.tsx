'use client';

import React from 'react';

interface Step {
  number: string;
  phase: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

const steps: Step[] = [
  {
    number: '01',
    phase: 'DISCOVER & ARCHITECT',
    title: 'Strategic Blueprint & Technical Mapping',
    duration: 'Days 1 — 3',
    description:
      'We unpack your business objectives, target users, and growth blockers. We define technical architecture, choose the right stack, and map user flows before writing a single line of code.',
    deliverables: [
      'Comprehensive system architecture schema',
      'Database model & API contract definitions',
      'Target customer acquisition strategy & ROAS benchmarks',
      'Fixed transparent roadmap with weekly milestones',
    ],
  },
  {
    number: '02',
    phase: 'ENGINEER & DESIGN',
    title: 'High-Velocity Sprints & UI Prototyping',
    duration: 'Weeks 1 — 3',
    description:
      'We build iteratively with immediate staging preview links. You see real progress every 48 hours, not vague status updates. We refine design systems and frontend interactions side by side.',
    deliverables: [
      'Figma design system with interactive component library',
      'Production-ready Next.js & React frontend interfaces',
      'Mobile-responsive layout tested across iOS & Android',
      'Staging deployments with instant client review links',
    ],
  },
  {
    number: '03',
    phase: 'AUTOMATE & INTEGRATE',
    title: 'AI Workflows & Cloud Infrastructure',
    duration: 'Weeks 2 — 4',
    description:
      'We connect the intelligence layer: autonomous AI agents, LLM pipelines, real-time database indexing, and external SaaS integrations to replace manual operational tasks.',
    deliverables: [
      'Custom AI agent workflows (OpenAI/Anthropic/LangChain)',
      'High-throughput database connections (MongoDB/PostgreSQL)',
      'Automated email/SMS notification pipelines',
      'Third-party payment gateways & webhook synchronization',
    ],
  },
  {
    number: '04',
    phase: 'LAUNCH & SCALE',
    title: 'Production Deploy, Ads & Scaled Growth',
    duration: 'Continuous',
    description:
      'We launch to production with zero downtime. From day one, we activate paid acquisition campaigns on Meta and Google, monitor funnel conversions, and optimize ROAS relentlessly.',
    deliverables: [
      'Production deployment with global CDN & 99.9% uptime',
      'Full Meta Pixel & Google Ads Conversions API tracking',
      'High-converting ad creatives & landing page CRO audits',
      'Ongoing technical maintenance & performance optimization',
    ],
  },
];

export default function VelozityProcess() {
  return (
    <section id="process" className="py-24 lg:py-32 bg-white border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-500/20 text-xs font-semibold text-emerald-800 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>HOW WE EXECUTE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0a0e0c] tracking-tight mb-5">
            A Predictable Method.{' '}
            <span className="gradient-text-emerald">Zero Guesswork.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#4a5750]">
            From your first discovery conversation to live deployment and scaled customer acquisition, here is how we deliver tangible results on time.
          </p>
        </div>

        {/* 4-Step Grid with Connecting Line */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="bg-[#f8faf8] border border-black/8 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-card hover:border-emerald-500/35 hover:shadow-card-hover transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-9 h-9 rounded-full bg-white border border-black/10 flex items-center justify-center font-mono font-extrabold text-sm text-[#0a0e0c] group-hover:bg-[#063d27] group-hover:text-white transition-colors shadow-sm">
                    {step.number}
                  </span>
                  <span className="text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {step.duration}
                  </span>
                </div>

                <div className="text-[10px] tracking-wider font-extrabold text-[#66756d] uppercase mb-1">
                  {step.phase}
                </div>

                <h3 className="text-lg font-extrabold text-[#0a0e0c] mb-3 leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs text-[#526159] leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-black/6">
                <div className="text-[10px] font-bold text-[#0a0e0c] uppercase tracking-wider mb-2">
                  Key Deliverables
                </div>
                <div className="space-y-1.5">
                  {step.deliverables.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-[11px] text-[#4a5750]">
                      <span className="text-[#059669] font-bold mt-0.5">•</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Guarantee Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#0a0e0c] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl text-[#00e676]">
              🛡️
            </span>
            <div>
              <h4 className="text-base font-bold text-white">The Majin Transparency Pledge</h4>
              <p className="text-xs sm:text-sm text-neutral-300">
                You work directly with founders Dhanush and Rishi. Fixed scopes, no hidden hourly billings, and daily communication.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="whitespace-nowrap px-6 py-3 rounded-full bg-[#00e676] text-[#063d27] font-bold text-xs sm:text-sm hover:bg-[#10e872] transition-colors shadow-md"
          >
            Book Discovery Session →
          </a>
        </div>
      </div>
    </section>
  );
}
