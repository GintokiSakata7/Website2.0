'use client';

import React, { useState, useRef } from 'react';
import SplineHeroCanvas from '../three/SplineHeroCanvas';

interface PillarCard {
  id: string;
  tag: string;
  title: string;
  description: string;
  icon: string;
  stats: string;
  statsLabel: string;
  href: string;
}

const pillars: PillarCard[] = [
  {
    id: 'web-apps',
    tag: 'ENGINEERING',
    title: 'Web & Mobile Applications',
    description: 'High-velocity Next.js 16, React, and mobile apps built with clean, modular architecture.',
    icon: '⚡',
    stats: '99.9%',
    statsLabel: 'Uptime Reliability',
    href: '#services',
  },
  {
    id: 'digital-marketing',
    tag: 'GROWTH & ADS',
    title: 'Paid Ads & Marketing Engine',
    description: 'Multi-channel Meta & Google ad campaigns engineered to turn ad spend into high-margin revenue.',
    icon: '📈',
    stats: '4.2x',
    statsLabel: 'Average ROAS Multiplier',
    href: '#services',
  },
  {
    id: 'ai-automation',
    tag: 'INTELLIGENCE',
    title: 'Autonomous AI & Agents',
    description: 'Custom autonomous LLM agents and workflow automation that eliminate hours of manual operations.',
    icon: '🧠',
    stats: '85%',
    statsLabel: 'Manual Task Reduction',
    href: '#services',
  },
  {
    id: 'brand-creative',
    tag: 'CREATIVE & UI/UX',
    title: 'Brand Systems & Design',
    description: 'Distinctive visual identities, design systems, and conversion-optimized interfaces that command trust.',
    icon: '✨',
    stats: '100%',
    statsLabel: 'Custom Tailored Identity',
    href: '#services',
  },
  {
    id: 'custom-software',
    tag: 'SYSTEMS & APIS',
    title: 'Custom Backend & APIs',
    description: 'High-throughput REST/GraphQL APIs, real-time WebSocket layers, and resilient cloud architecture.',
    icon: '🛡️',
    stats: '< 45ms',
    statsLabel: 'P95 API Response Time',
    href: '#work',
  },
  {
    id: 'growth-cro',
    tag: 'CONVERSION',
    title: 'Landing Page CRO & SEO',
    description: 'Frictionless sales funnels, sub-second load times, and programmatic SEO designed for maximum signups.',
    icon: '🎯',
    stats: '+140%',
    statsLabel: 'Conversion Rate Lift',
    href: '#work',
  },
];

// Interactive 3D Tilt Card
function TiltCard({ card }: { card: PillarCard }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('');
    setIsHovered(false);
  };

  return (
    <a
      ref={cardRef}
      href={card.href}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: transformStyle ? 'transform 0.08s ease-out' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
      }}
      className={`relative p-6 rounded-3xl bg-white border transition-all flex flex-col justify-between group overflow-hidden ${
        isHovered
          ? 'border-emerald-500/40 shadow-xl shadow-emerald-950/5'
          : 'border-black/8 shadow-card hover:border-black/15'
      }`}
    >
      {/* Top subtle emerald gradient highlight on hover */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-[#00e676] to-emerald-400 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div>
        {/* Card Header: Icon & Tag */}
        <div className="flex items-center justify-between mb-4">
          <span className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-xl group-hover:scale-110 group-hover:bg-[#063d27] group-hover:text-white transition-all shadow-sm">
            {card.icon}
          </span>
          <span className="text-[10px] tracking-wider font-extrabold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80">
            {card.tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-extrabold text-[#0a0e0c] group-hover:text-[#059669] transition-colors mb-2 leading-snug">
          {card.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-[#526159] leading-relaxed mb-6">
          {card.description}
        </p>
      </div>

      {/* Card Footer: Metrics Badge & Arrow */}
      <div className="pt-4 border-t border-black/6 flex items-center justify-between">
        <div>
          <div className="text-base font-black text-[#0a0e0c] group-hover:text-[#059669] transition-colors">
            {card.stats}
          </div>
          <div className="text-[10px] text-[#66756d] font-medium">
            {card.statsLabel}
          </div>
        </div>
        <span className="w-7 h-7 rounded-full bg-[#f8faf8] border border-black/8 flex items-center justify-center text-xs text-[#0a0e0c] group-hover:bg-[#063d27] group-hover:text-white group-hover:translate-x-0.5 transition-all">
          →
        </span>
      </div>
    </a>
  );
}

export default function VelozityHero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-[#f8faf8] bg-grid-subtle">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-emerald-200/25 via-emerald-400/10 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Main Container with Generous Breathing Room */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Top Grid: Headline on Left/Center, 3D Canvas on Right/Center */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-20 lg:mb-28">
          {/* Left Text Column: Spacious, Breathable Typography */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-emerald-500/30 shadow-sm text-xs font-semibold text-emerald-950 mb-6 backdrop-blur-md hover:border-emerald-500/60 transition-colors">
              <span className="w-2 h-2 rounded-full bg-[#00e676] shadow-[0_0_8px_#00e676] pulse-emerald" />
              <span>Independent Digital Studio • Accepting Client Projects for Q4</span>
            </div>

            {/* Majestic Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-[4.25rem] font-extrabold tracking-tight text-[#0a0e0c] leading-[1.08] mb-6">
              Turning Ideas Into{' '}
              <span className="block mt-1 sm:inline gradient-text-emerald">
                High-Performance Solutions.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#3b4741] max-w-xl font-normal leading-relaxed mb-8">
              We design, engineer, and scale full-stack <strong className="font-semibold text-[#0a0e0c]">web applications</strong>, deploy <strong className="font-semibold text-[#0a0e0c]">autonomous AI automation</strong>, and run high-ROI <strong className="font-semibold text-[#0a0e0c]">paid marketing campaigns</strong>.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href="#work"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#0a0e0c] text-white font-semibold text-sm hover:bg-[#063d27] transition-all duration-200 shadow-md hover:shadow-emerald-950/20 hover:-translate-y-0.5"
              >
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs text-[#00e676]">
                  ▶
                </span>
                <span>Explore Case Studies</span>
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-[#0a0e0c] font-semibold text-sm border border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all duration-200 shadow-sm hover:-translate-y-0.5"
              >
                <span>Start Your Project</span>
                <span className="text-[#059669] font-bold">→</span>
              </a>
            </div>

            {/* Trust Proof Badges */}
            <div className="pt-6 border-t border-black/8 w-full flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-[#66756d]">
              <span className="flex items-center gap-1.5">
                <span className="text-[#059669] font-bold">✓</span> 100% In-House Engineering
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#059669] font-bold">✓</span> Direct Access to Founders
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#059669] font-bold">✓</span> Transparent Milestone Pricing
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#059669] font-bold">✓</span> 1,500+ Users Handled
              </span>
            </div>
          </div>

          {/* Right Column: Prominent Interactive 3D Centerpiece */}
          <div className="lg:col-span-5 relative w-full h-[380px] sm:h-[450px] lg:h-[500px] flex items-center justify-center">
            {/* Soft luminous framing container */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-emerald-50/30 to-white/90 rounded-3xl border border-black/6 shadow-card overflow-hidden">
              <SplineHeroCanvas />

              {/* Interactive Cue Badge */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-white/90 border border-black/8 shadow-sm backdrop-blur-md text-[11px] font-mono font-medium text-[#526159] pointer-events-none flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] animate-pulse" />
                <span>Three.js Kinetic Core • Interactive</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Core Pillars Suite: Spacious, Un-cramped 3-Column Grid */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-800 tracking-widest uppercase">
                DISCIPLINES & CAPABILITIES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a0e0c] tracking-tight mt-1">
                Engineered for Growth. Across Every Channel.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#526159] max-w-md">
              Hover over each capability to inspect real-time performance indicators and production deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.map((card) => (
              <TiltCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
