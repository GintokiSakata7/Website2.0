'use client';

import React from 'react';
import Link from 'next/link';

export default function ModernFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a0e0c] text-white pt-20 pb-12 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group inline-block">
              <div className="w-9 h-9 rounded-xl bg-white text-[#0a0e0c] flex items-center justify-center font-black text-sm tracking-tighter">
                M<span className="text-[#059669]">▲</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-base tracking-tight text-white leading-none">
                  MAJIN
                </span>
                <span className="text-[10px] font-bold tracking-widest text-[#00e676] uppercase">
                  STUDIOS
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
              An independent digital product and growth studio. We engineer high-performance web applications, deploy autonomous AI systems, and scale paid acquisition campaigns.
            </p>

            <div className="pt-2 text-xs text-neutral-400 space-y-1">
              <div>📍 Hyderabad, India • Global Remote Delivery</div>
              <div>✉️ hello@majin.studio</div>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://www.linkedin.com/company/majin-studios"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#00e676] hover:text-[#063d27] transition-colors flex items-center justify-center text-xs font-bold"
                aria-label="LinkedIn"
              >
                in
              </a>
              <a
                href="https://www.instagram.com/majin_studios/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#00e676] hover:text-[#063d27] transition-colors flex items-center justify-center text-xs font-bold"
                aria-label="Instagram"
              >
                ig
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#00e676] hover:text-[#063d27] transition-colors flex items-center justify-center text-xs font-bold"
                aria-label="GitHub"
              >
                gh
              </a>
            </div>
          </div>

          {/* Column 1: Engineering */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Engineering & Software
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Next.js Web Applications
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Mobile Apps (iOS & Android)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  High-Throughput REST & APIs
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  WebSocket Real-Time Systems
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Database & Cloud Arch
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Growth & Ads */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Marketing & Growth
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Meta (FB & IG) Ads Scaling
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Google Search & Performance Max
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  High-Converting Ad Creatives
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Landing Page CRO Audits
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Attribution & Conversions API
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Flagships & Case Studies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Flagship Products
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link href="/scanfeast" className="hover:text-[#00e676] transition-colors">
                  ScanFeast Platform ↗
                </Link>
              </li>
              <li>
                <Link href="/quantumarena" className="hover:text-[#00e676] transition-colors">
                  Quantum Arena ↗
                </Link>
              </li>
              <li>
                <a href="#work" className="hover:text-white transition-colors">
                  Paid Ads ROAS Engine
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  Delivery Roadmap
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-white transition-colors">
                  Project Estimator
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} Majin Studios. All rights reserved. Built with Next.js, Three.js & Tailwind.
          </div>

          <div className="flex items-center gap-6">
            <span>Leadership: Dhanush A & Rishivardhan Chepuri</span>
            <button
              onClick={scrollToTop}
              className="text-xs font-semibold text-[#00e676] hover:underline flex items-center gap-1"
            >
              <span>Back to Top</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
