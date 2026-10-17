'use client';

import React, { useState } from 'react';

type TabKey = 'ai' | 'marketing' | 'apps' | 'design';

interface CapabilityTab {
  key: TabKey;
  number: string;
  badge: string;
  title: string;
  tagline: string;
  deliverables: string[];
  techStack: string[];
  metrics: string;
}

const capabilities: CapabilityTab[] = [
  {
    key: 'apps',
    number: '01',
    badge: 'SOFTWARE & PLATFORMS',
    title: 'Web & Application Development',
    tagline: 'Custom applications engineered for speed, responsiveness, and enterprise reliability.',
    deliverables: [
      'Next.js 16 & React full-stack web applications',
      'Mobile apps with cross-platform deployment',
      'High-throughput REST & WebSocket real-time APIs',
      'Database architecture, caching & cloud hosting',
      'Zero-downtime CI/CD deployment pipelines',
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Socket.IO', 'MongoDB', 'PostgreSQL', 'TailwindCSS'],
    metrics: '< 60ms Average API Response',
  },
  {
    key: 'marketing',
    number: '02',
    badge: 'PAID ACQUISITION & GROWTH',
    title: 'Digital Marketing & Paid Ads',
    tagline: 'Turn digital advertising into a predictable, profit-generating acquisition engine.',
    deliverables: [
      'Meta Ads (Facebook & Instagram) performance campaigns',
      'Google Ads (Search, Performance Max & Display)',
      'High-converting ad creatives, copy, and video hooks',
      'Landing page Conversion Rate Optimization (CRO)',
      'Complete tracking setup: Meta Pixel, CAPI & GA4',
    ],
    techStack: ['Meta Ads Manager', 'Google Ads', 'GA4', 'PostHog', 'A/B Testing', 'Creative Production'],
    metrics: '3.8x - 5.2x Verified ROAS Multiplier',
  },
  {
    key: 'ai',
    number: '03',
    badge: 'INTELLIGENCE & WORKFLOWS',
    title: 'Autonomous AI & Workflow Automation',
    tagline: 'Automate manual operations, enrich customer data, and build custom AI-powered products.',
    deliverables: [
      'Autonomous multi-agent workflows for repetitive tasks',
      'Custom LLM integrations with company knowledge (RAG)',
      'Intelligent document processing & data extraction',
      'API-based workflow pipelines (n8n, Python, webhooks)',
      'Smart customer communication & support agents',
    ],
    techStack: ['OpenAI / Anthropic APIs', 'LangChain', 'Python', 'n8n', 'Vector DBs', 'Custom Embeddings'],
    metrics: '85% Reduction in Repetitive Work',
  },
  {
    key: 'design',
    number: '04',
    badge: 'CREATIVE & EXPERIENCE',
    title: 'Brand Systems & Product UI/UX',
    tagline: 'Distinctive visual identities and interfaces that capture market trust instantly.',
    deliverables: [
      'Comprehensive brand identity & logo design systems',
      'High-fidelity Figma UI/UX design & interactive prototypes',
      '3D web assets, kinetic micro-animations & Spline visuals',
      'Design token systems compatible with React & Tailwind',
      'Marketing collateral, pitch decks & social assets',
    ],
    techStack: ['Figma', 'Three.js', 'Spline 3D', 'GSAP', 'TailwindCSS', 'Adobe Suite'],
    metrics: '100% Custom Tailored Aesthetic',
  },
];

export default function VelozityCapabilities() {
  const [activeTab, setActiveTab] = useState<TabKey>('apps');
  const [budget, setBudget] = useState(2500);

  const currentCap = capabilities.find((c) => c.key === activeTab) || capabilities[0];

  return (
    <section id="services" className="relative py-24 lg:py-32 bg-white border-y border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-500/20 text-xs font-semibold text-emerald-800 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>FULL-SPECTRUM DIGITAL CAPABILITIES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0a0e0c] tracking-tight mb-5">
            One Connected Studio.{' '}
            <span className="gradient-text-emerald">Every Crucial Layer.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#4a5750]">
            We bridge the gap between engineering, creative design, AI workflows, and customer acquisition — so you never have to juggle five disconnected agencies.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {capabilities.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 border ${
                  isActive
                    ? 'bg-[#0a0e0c] text-white border-[#0a0e0c] shadow-md shadow-emerald-950/10'
                    : 'bg-[#f8faf8] text-[#526159] border-black/8 hover:bg-emerald-50/50 hover:border-emerald-300'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isActive ? 'bg-[#00e676]' : 'bg-black/20'
                  }`}
                />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Split Screen Showcase (Velozity Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Interactive Visualizer */}
          <div className="lg:col-span-7 bg-[#f8faf8] border border-black/8 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-card relative overflow-hidden">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-5 border-b border-black/8 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block" />
                <span className="ml-2 text-xs font-mono text-[#66756d]">
                  majin://{activeTab}-engine.v2
                </span>
              </div>
              <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                LIVE DEMO
              </span>
            </div>

            {/* Dynamic Interactive Body based on Tab */}
            <div className="flex-1">
              {activeTab === 'apps' && (
                <div className="space-y-4">
                  <div className="bg-white p-5 rounded-2xl border border-black/6 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
                          ⚡
                        </span>
                        <div>
                          <div className="text-xs font-bold text-[#0a0e0c]">High-Throughput Web App Architecture</div>
                          <div className="text-[11px] text-[#66756d]">Real-time synchronization with WebSocket fallback</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600">Active</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-black/5 text-center">
                      <div className="p-2.5 rounded-xl bg-[#f8faf8]">
                        <div className="text-[10px] text-[#66756d]">Lighthouse Score</div>
                        <div className="text-base font-extrabold text-[#059669]">98 / 100</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#f8faf8]">
                        <div className="text-[10px] text-[#66756d]">API Latency</div>
                        <div className="text-base font-extrabold text-[#0a0e0c]">38ms</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#f8faf8]">
                        <div className="text-[10px] text-[#66756d]">Client Rehydration</div>
                        <div className="text-base font-extrabold text-[#059669]">Instant</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-black/6 text-xs font-mono space-y-1.5 text-[#3b4741]">
                    <div className="text-[#059669]">✓ Initializing Next.js 16 Turbopack build...</div>
                    <div className="text-[#3b4741]">✓ Compiling client hydration bundles (0.12s)</div>
                    <div className="text-[#3b4741]">✓ Connecting MongoDB Atlas replica set [healthy]</div>
                    <div className="text-[#00e676] bg-[#063d27] px-2 py-1 rounded inline-block font-bold">
                      ● WebSocket broadcast live: 1,500+ events/sec
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'marketing' && (
                <div className="space-y-4">
                  <div className="bg-white p-5 rounded-2xl border border-black/6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-xs font-bold text-[#0a0e0c]">Campaign Budget & ROAS Simulator</div>
                        <div className="text-[11px] text-[#66756d]">Slide to simulate expected monthly results</div>
                      </div>
                      <span className="text-sm font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        ${budget.toLocaleString()} / mo
                      </span>
                    </div>

                    <input
                      type="range"
                      min={1000}
                      max={20000}
                      step={500}
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-full accent-[#059669] cursor-pointer mb-5"
                    />

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/50">
                        <div className="text-[10px] font-semibold text-[#063d27]">EST. REVENUE</div>
                        <div className="text-lg font-black text-[#059669]">
                          ${Math.round(budget * 4.2).toLocaleString()}
                        </div>
                        <div className="text-[10px] text-emerald-700">4.2x ROAS</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#f8faf8] border border-black/5">
                        <div className="text-[10px] text-[#66756d]">TARGET REACH</div>
                        <div className="text-lg font-black text-[#0a0e0c]">
                          {Math.round(budget * 45).toLocaleString()}+
                        </div>
                        <div className="text-[10px] text-[#66756d]">Meta & Google</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#f8faf8] border border-black/5">
                        <div className="text-[10px] text-[#66756d]">QUALIFIED LEADS</div>
                        <div className="text-lg font-black text-[#0a0e0c]">
                          {Math.round(budget * 0.16)}
                        </div>
                        <div className="text-[10px] text-[#66756d]">Direct bookings</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-black/6 text-xs text-[#526159]">
                    <span className="w-2 h-2 rounded-full bg-[#00e676]" />
                    <span>Multi-channel funnel: Top-of-Funnel Hooks → Retargeting Testimonial Ads → CRO Checkout</span>
                  </div>
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="space-y-4">
                  <div className="bg-white p-5 rounded-2xl border border-black/6 shadow-sm">
                    <div className="text-xs font-bold text-[#0a0e0c] mb-1">Autonomous Execution Pipeline</div>
                    <div className="text-[11px] text-[#66756d] mb-4">Visual trigger-to-completion workflow sequence</div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">1</span>
                        <span className="font-semibold text-[#063d27]">Incoming Customer Inquiry / Order</span>
                        <span className="ml-auto font-mono text-[10px] text-emerald-800">Trigger [Instant]</span>
                      </div>
                      <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#f8faf8] border border-black/6">
                        <span className="w-5 h-5 rounded-full bg-[#0a0e0c] text-white flex items-center justify-center text-[10px] font-bold">2</span>
                        <span className="font-medium text-[#3b4741]">LLM Agent Context Retrieval & Validation</span>
                        <span className="ml-auto font-mono text-[10px] text-[#66756d]">Embeddings Search</span>
                      </div>
                      <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#f8faf8] border border-black/6">
                        <span className="w-5 h-5 rounded-full bg-[#0a0e0c] text-white flex items-center justify-center text-[10px] font-bold">3</span>
                        <span className="font-medium text-[#3b4741]">Automated Execution: DB Update + Discord/Slack Alert</span>
                        <span className="ml-auto font-mono text-[10px] text-[#66756d]">Webhook Action</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-950 text-white rounded-xl text-xs flex items-center justify-between font-mono">
                    <span className="text-[#00e676]">● Agent status: IDLE (Awaiting prompt)</span>
                    <span className="text-emerald-300/80">Latency: 120ms</span>
                  </div>
                </div>
              )}

              {activeTab === 'design' && (
                <div className="space-y-4">
                  <div className="bg-white p-5 rounded-2xl border border-black/6 shadow-sm">
                    <div className="text-xs font-bold text-[#0a0e0c] mb-1">Modern Visual System & Component Tokens</div>
                    <div className="text-[11px] text-[#66756d] mb-4">Precision typography, luxury dark-and-bright green palette</div>

                    <div className="grid grid-cols-4 gap-2 mb-4">
                      <div className="p-3 rounded-xl bg-[#063d27] text-white text-center">
                        <div className="text-[9px] uppercase tracking-wider text-emerald-300">Forest</div>
                        <div className="text-xs font-mono font-bold mt-1">#063D27</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#00e676] text-[#063d27] text-center">
                        <div className="text-[9px] uppercase tracking-wider text-[#063d27]">Neon</div>
                        <div className="text-xs font-mono font-bold mt-1">#00E676</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0a0e0c] text-white text-center">
                        <div className="text-[9px] uppercase tracking-wider text-neutral-400">Ink</div>
                        <div className="text-xs font-mono font-bold mt-1">#0A0E0C</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#f8faf8] border border-black/10 text-center">
                        <div className="text-[9px] uppercase tracking-wider text-[#66756d]">Pearl</div>
                        <div className="text-xs font-mono font-bold mt-1 text-[#0a0e0c]">#F8FAF8</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#f8faf8] border border-black/6 flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#0a0e0c]">Display: Plus Jakarta Sans</span>
                      <span className="text-[#66756d]">Body: Inter</span>
                      <span className="text-emerald-700 font-mono">Code: JetBrains</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Proof Metric */}
            <div className="pt-6 border-t border-black/8 mt-6 flex items-center justify-between text-xs font-semibold text-[#0a0e0c]">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Verified Metric:</span>
              </span>
              <span className="text-emerald-700 font-bold">{currentCap.metrics}</span>
            </div>
          </div>

          {/* Right Column: Deep Deliverables Card */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-black/8 rounded-3xl p-6 sm:p-8 shadow-card">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold tracking-widest text-[#66756d]">
                  DISCIPLINE {currentCap.number}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {currentCap.badge}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a0e0c] mb-3">
                {currentCap.title}
              </h3>

              <p className="text-sm text-[#4a5750] leading-relaxed mb-6">
                {currentCap.tagline}
              </p>

              {/* Concrete Deliverables List */}
              <div className="space-y-3 mb-8">
                <div className="text-xs font-bold text-[#0a0e0c] uppercase tracking-wider">
                  Key Deliverables
                </div>
                {currentCap.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#3b4741]">
                    <span className="text-[#059669] font-bold text-sm leading-none mt-0.5">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div>
                <div className="text-xs font-bold text-[#0a0e0c] uppercase tracking-wider mb-2.5">
                  Technologies & Platforms
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentCap.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-[#f1f4f1] text-[#3b4741] text-[11px] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct CTA */}
            <div className="pt-8 mt-8 border-t border-black/8">
              <a
                href="#contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#0a0e0c] text-white font-semibold text-xs sm:text-sm hover:bg-[#063d27] transition-all shadow-sm hover:shadow-emerald-950/20"
              >
                <span>Request Scope & Timeline for {currentCap.title.split('&')[0]}</span>
                <span className="text-[#00e676]">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
