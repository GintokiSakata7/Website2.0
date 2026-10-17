'use client';

import React, { useState } from 'react';

interface ServiceOption {
  id: string;
  name: string;
  category: string;
  typicalWeeks: number;
  highlight: string;
}

const serviceOptions: ServiceOption[] = [
  {
    id: 'webapp',
    name: 'Custom Web Application',
    category: 'Engineering',
    typicalWeeks: 3,
    highlight: 'Next.js 16, TypeScript, REST/WebSocket APIs, Database',
  },
  {
    id: 'mobileapp',
    name: 'Mobile Application',
    category: 'Engineering',
    typicalWeeks: 4,
    highlight: 'Cross-platform iOS & Android, offline sync, push notifications',
  },
  {
    id: 'ai-agents',
    name: 'AI Agents & Automation',
    category: 'AI & Data',
    typicalWeeks: 2,
    highlight: 'Autonomous LLM workflows, custom RAG knowledge bases, n8n',
  },
  {
    id: 'paid-ads',
    name: 'Paid Ads & Marketing Engine',
    category: 'Growth',
    typicalWeeks: 2,
    highlight: 'Meta & Google Ads, creative production, ROAS optimization',
  },
  {
    id: 'uiux-brand',
    name: 'Brand Identity & UI/UX',
    category: 'Creative',
    typicalWeeks: 2,
    highlight: 'Figma prototypes, design system, interactive 3D assets',
  },
  {
    id: 'cro-seo',
    name: 'Landing Page CRO & SEO',
    category: 'Growth',
    typicalWeeks: 1,
    highlight: 'Sub-second page speeds, programmatic SEO, high-converting funnels',
  },
];

export default function VelozityEstimator() {
  const [selectedServices, setSelectedServices] = useState<string[]>(['webapp', 'ai-agents']);
  const [urgency, setUrgency] = useState<'rapid' | 'standard' | 'retainer'>('standard');

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const calculatedWeeks = Math.max(
    ...selectedServices.map((id) => serviceOptions.find((s) => s.id === id)?.typicalWeeks || 2)
  ) + (selectedServices.length > 2 ? 1 : 0);

  return (
    <section id="estimator" className="py-24 bg-[#f8faf8]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-black/8 p-8 sm:p-12 shadow-card">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              INTERACTIVE PROJECT ESTIMATOR
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0a0e0c] mt-3 mb-2 tracking-tight">
              Design Your Ideal Project Scope
            </h2>
            <p className="text-xs sm:text-sm text-[#526159]">
              Select the capabilities you need to see estimated timelines and recommended studio architecture.
            </p>
          </div>

          {/* Service Selector Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-8">
            {serviceOptions.map((service) => {
              const isSelected = selectedServices.includes(service.id);
              return (
                <div
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-50/60 border-emerald-500 shadow-sm'
                      : 'bg-white border-black/8 hover:border-black/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#66756d]">
                      {service.category}
                    </span>
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isSelected
                          ? 'bg-[#059669] text-white'
                          : 'border border-black/20 text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#0a0e0c] mb-1">{service.name}</h4>
                  <p className="text-xs text-[#526159] leading-snug">{service.highlight}</p>
                </div>
              );
            })}
          </div>

          {/* Timeline Speed Selector */}
          <div className="pt-6 border-t border-black/8 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <span className="text-xs font-bold text-[#0a0e0c]">Target Delivery Velocity:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setUrgency('rapid')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  urgency === 'rapid'
                    ? 'bg-[#063d27] text-white shadow-sm'
                    : 'bg-[#f1f4f1] text-[#526159] hover:text-[#0a0e0c]'
                }`}
              >
                Rapid Sprint (2–4 wks)
              </button>
              <button
                onClick={() => setUrgency('standard')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  urgency === 'standard'
                    ? 'bg-[#063d27] text-white shadow-sm'
                    : 'bg-[#f1f4f1] text-[#526159] hover:text-[#0a0e0c]'
                }`}
              >
                Standard (4–6 wks)
              </button>
              <button
                onClick={() => setUrgency('retainer')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  urgency === 'retainer'
                    ? 'bg-[#063d27] text-white shadow-sm'
                    : 'bg-[#f1f4f1] text-[#526159] hover:text-[#0a0e0c]'
                }`}
              >
                Monthly Dedicated Pod
              </button>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="p-6 rounded-2xl bg-[#0a0e0c] text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-[11px] font-mono text-[#00e676] uppercase tracking-wider mb-1">
                Estimated Timeline & Architecture
              </div>
              <div className="text-lg font-bold text-white">
                {selectedServices.length} Selected Capabilities • ~{calculatedWeeks} to {calculatedWeeks + 2} Weeks Turnaround
              </div>
              <p className="text-xs text-neutral-300 mt-1">
                Direct sprint managed by founders Dhanush and Rishi with weekly milestones.
              </p>
            </div>

            <a
              href={`#contact?scope=${selectedServices.join(',')}`}
              className="whitespace-nowrap px-6 py-3 rounded-full bg-[#00e676] text-[#063d27] font-bold text-xs sm:text-sm hover:bg-[#10e872] transition-colors shadow-md"
            >
              Get Exact Quote & Plan →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
