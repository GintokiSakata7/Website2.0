'use client';

import { SectionHeading, TechnicalLabel, Button } from '../ui';
import { useMotionEngine } from '../../hooks/useMotionEngine';

const previewSkills = ['PRODUCT THINKING', 'ENGINEERING', 'AUTOMATION'];

export function Tools() {
  const containerRef = useMotionEngine();

  return (
    <section className="section relative z-10 overflow-hidden py-16 md:py-28" id="tools">
      <div ref={containerRef} className="page-container">
        <div className="mb-10 md:mb-16 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading title={<>A USEFUL TOOL.<br /><span className="text-accent-current">FREE TO USE.</span></>} metadata="FIG. 06 — OPEN RESOURCE" />
          <p className="max-w-md text-sm leading-7 text-secondary">
            Good work deserves a clear introduction. Use our free builder to shape a professional resume and turn your experience into a portfolio people can explore.
          </p>
        </div>

        <article className="group relative grid overflow-hidden border border-line-structural bg-[#060805] lg:grid-cols-[.85fr_1.15fr]">
          <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(157,255,0,.085), transparent 45%)' }} />
          <div className="relative z-10 flex flex-col justify-center p-6 sm:p-9 md:p-12 lg:p-14">
            <TechnicalLabel variant="accent">MAJIN TOOL / 001 — OPEN ACCESS</TechnicalLabel>
            <h3 className="mt-5 max-w-xl font-display text-3xl font-semibold uppercase leading-[.94] tracking-[-.055em] text-text-primary sm:text-4xl md:text-5xl">
              Resume &<br /><span className="text-accent-current">Portfolio Builder.</span>
            </h3>
            <p className="mt-5 max-w-lg text-sm leading-7 text-secondary">
              Put your skills, projects and experience into a clean ATS-friendly resume. Then give your work a home with a shareable portfolio page.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['RESUME STRUCTURE', 'PROJECT STORYTELLING', 'PORTFOLIO LINK'].map((tag) => (
                <span key={tag} className="border border-line-structural px-2.5 py-2 font-mono text-[8px] tracking-[.1em] text-text-secondary">{tag}</span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Button href="/tools/builder" variant="primary" withArrow>START BUILDING</Button>
              <span className="font-mono text-[8px] tracking-[.12em] text-text-metadata">NO COST · MADE BY MAJIN</span>
            </div>
          </div>

          <div className="relative flex min-h-[350px] items-center justify-center overflow-hidden border-t border-line-structural p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-12">
            <div className="absolute inset-0 opacity-[.07]" style={{ backgroundImage: 'linear-gradient(var(--accent-current) 1px, transparent 1px), linear-gradient(90deg, var(--accent-current) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <div className="toolMockup relative z-10 grid w-full max-w-[620px] grid-cols-[.94fr_1.06fr] items-center gap-3 sm:gap-5">
              <div className="resumeSheet relative aspect-[.72/1] translate-y-3 border border-white/15 bg-[#0b0d09] p-3 shadow-[0_25px_75px_rgba(0,0,0,.45)] transition-transform duration-700 group-hover:-translate-y-1 sm:p-5">
                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3 sm:mb-6">
                  <div><div className="h-1.5 w-16 bg-white/85 sm:w-24"/><div className="mt-2 h-1 w-10 bg-white/25 sm:w-16"/></div>
                  <div className="grid h-7 w-7 place-items-center border border-accent-current/40 font-mono text-[8px] text-accent-current sm:h-9 sm:w-9">MS</div>
                </div>
                <div className="space-y-1.5"><div className="h-1 w-11 bg-accent-current/80 sm:w-14"/><div className="h-1 w-full bg-white/15"/><div className="h-1 w-4/5 bg-white/10"/></div>
                <div className="mt-5 space-y-2 sm:mt-7"><div className="mb-3 h-1 w-12 bg-white/65 sm:w-16"/><div className="h-1 w-full bg-white/10"/><div className="h-1 w-[88%] bg-white/10"/><div className="h-1 w-[92%] bg-white/10"/><div className="h-1 w-[70%] bg-white/10"/></div>
                <div className="mt-5 space-y-2 sm:mt-7"><div className="mb-3 h-1 w-16 bg-white/65 sm:w-20"/><div className="h-1 w-full bg-white/10"/><div className="h-1 w-[82%] bg-white/10"/><div className="h-1 w-3/5 bg-white/10"/></div>
                <div className="absolute inset-x-0 top-[36%] h-[2px] origin-left scale-x-0 bg-accent-current shadow-[0_0_20px_#9dff00] transition-transform duration-1000 group-hover:scale-x-100" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between border-t border-white/10 pt-2 font-mono text-[6px] tracking-[.1em] text-white/30 sm:bottom-5 sm:left-5 sm:right-5 sm:text-[7px]"><span>RESUME / 01</span><span>PDF</span></div>
              </div>

              <div className="relative space-y-3 sm:space-y-4">
                <div className="border border-white/12 bg-[#090b07] shadow-[0_20px_65px_rgba(0,0,0,.4)] transition-transform duration-700 group-hover:translate-x-1">
                  <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2"><span className="h-1.5 w-1.5 rounded-full bg-white/20"/><span className="h-1.5 w-1.5 rounded-full bg-white/20"/><span className="h-1.5 w-1.5 rounded-full bg-accent-current/80"/><div className="ml-2 flex-1 bg-white/[.04] px-2 py-1 font-mono text-[6px] text-white/35 sm:text-[7px]">portfolio.yourname.dev</div></div>
                  <div className="p-3 sm:p-5"><div className="font-mono text-[6px] tracking-[.14em] text-accent-current sm:text-[7px]">PROFILE / LIVE PREVIEW</div><div className="mt-3 font-display text-base font-semibold leading-[.9] tracking-[-.04em] text-white sm:text-2xl">Make your<br/><span className="text-accent-current">work visible.</span></div><div className="mt-3 h-1 w-4/5 bg-white/15"/><div className="mt-1.5 h-1 w-3/5 bg-white/10"/><div className="mt-4 grid grid-cols-3 gap-1.5">{previewSkills.map((skill, index) => <div key={skill} className="flex aspect-[1.1/1] flex-col justify-between border border-white/10 p-1.5 sm:p-2"><span className="font-mono text-[6px] text-accent-current">0{index + 1}</span><span className="text-[5px] leading-tight text-white/40 sm:text-[6px]">{skill}</span></div>)}</div></div>
                </div>
                <div className="flex items-center justify-between border border-accent-current/25 bg-[#080b06] px-3 py-3 sm:px-4"><div className="flex items-center gap-2"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-current opacity-45"/><span className="relative inline-flex h-2 w-2 rounded-full bg-accent-current"/></span><span className="font-mono text-[7px] tracking-[.08em] text-white/60 sm:text-[8px]">READY TO SHARE</span></div><span className="font-mono text-[7px] text-accent-current">↗</span></div>
              </div>
            </div>
            <div className="pointer-events-none absolute bottom-4 left-4 font-mono text-[7px] tracking-[.15em] text-white/25">MAJIN / TOOL SERIES</div>
          </div>
        </article>
      </div>
    </section>
  );
}
