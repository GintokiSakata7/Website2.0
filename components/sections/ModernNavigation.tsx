'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ModernNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none">
      <nav
        className={`pointer-events-auto w-full max-w-5xl rounded-full transition-all duration-300 px-4 sm:px-6 py-3 flex items-center justify-between ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border border-black/10 shadow-lg shadow-black/5'
            : 'bg-white/80 backdrop-blur-md border border-black/8 shadow-sm'
        }`}
      >
        {/* Brand Logo with Electric Chevron */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-[#0a0e0c] flex items-center justify-center text-white font-black text-xs tracking-tighter group-hover:bg-[#063d27] transition-colors shadow-sm">
            M<span className="text-[#00e676]">▲</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-extrabold text-sm tracking-tight text-[#0a0e0c] leading-none">
              MAJIN
            </span>
            <span className="text-[9px] font-bold tracking-widest text-[#66756d] uppercase">
              STUDIOS
            </span>
          </div>
        </Link>

        {/* Center Desktop Links (Velozity Style) */}
        <div className="hidden md:flex items-center gap-7 text-xs font-semibold text-[#526159]">
          <a href="#services" className="hover:text-[#0a0e0c] transition-colors">
            Services
          </a>
          <a href="#work" className="hover:text-[#0a0e0c] transition-colors">
            Case Studies
          </a>
          <a href="#process" className="hover:text-[#0a0e0c] transition-colors">
            Process
          </a>
          <a href="#estimator" className="hover:text-[#0a0e0c] transition-colors">
            Estimator
          </a>
          <Link href="/scanfeast" className="hover:text-[#059669] transition-colors">
            ScanFeast
          </Link>
          <Link href="/quantumarena" className="hover:text-[#059669] transition-colors">
            Quantum Arena
          </Link>
        </div>

        {/* Right CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0a0e0c] text-white font-semibold text-xs hover:bg-[#063d27] transition-all shadow-sm hover:shadow-emerald-950/20 hover:-translate-y-0.5"
          >
            <span>Start Project</span>
            <span className="text-[#00e676] font-bold">→</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-8 h-8 rounded-full bg-black/5 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <span
            className={`w-4 h-0.5 bg-[#0a0e0c] transition-all ${
              mobileMenuOpen ? 'rotate-45 translate-y-1' : ''
            }`}
          />
          <span
            className={`w-4 h-0.5 bg-[#0a0e0c] transition-all ${
              mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu Dropdown Sheet */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden fixed top-20 left-4 right-4 bg-white/95 backdrop-blur-2xl border border-black/10 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-3 duration-200">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold text-[#0a0e0c] py-2 border-b border-black/5"
          >
            Services & Capabilities
          </a>
          <a
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold text-[#0a0e0c] py-2 border-b border-black/5"
          >
            Featured Case Studies
          </a>
          <a
            href="#process"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold text-[#0a0e0c] py-2 border-b border-black/5"
          >
            Studio Execution Process
          </a>
          <a
            href="#estimator"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold text-[#0a0e0c] py-2 border-b border-black/5"
          >
            Project Estimator
          </a>
          <Link
            href="/scanfeast"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold text-emerald-800 py-2 border-b border-black/5"
          >
            ScanFeast System
          </Link>
          <Link
            href="/quantumarena"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold text-emerald-800 py-2 border-b border-black/5"
          >
            Quantum Arena System
          </Link>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center py-3 rounded-full bg-[#0a0e0c] text-white font-bold text-xs mt-2"
          >
            Start Your Project →
          </a>
        </div>
      )}
    </header>
  );
}
