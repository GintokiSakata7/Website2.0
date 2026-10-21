'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroThreeCanvas from './HeroThreeCanvas';
import { ScanfeastCardPreview } from '../sections/visuals/ScanfeastCardPreview';
import { QuantumArenaCardPreview } from '../sections/visuals/QuantumArenaCardPreview';
import { NexusAICardPreview } from '../sections/visuals/NexusAICardPreview';
import TiltCard from '../ui/TiltCard';
import styles from './StudioHome.module.css';

function ArrowIcon({ diagonal = false, className = '' }: { diagonal?: boolean; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={`${styles.arrowIcon} ${className}`}>
      {diagonal ? <path d="M5 15 15 5M6 5h9v9" /> : <path d="M3.5 10h12m-5-5 5 5-5 5" />}
    </svg>
  );
}

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`${styles.brandMark} ${inverse ? styles.brandMarkInverse : ''}`} aria-hidden="true">
      <svg viewBox="0 0 36 36" fill="none">
        <path d="M5.5 27.5V8.5l9 11 9-11v19" stroke="currentColor" strokeWidth="3.2" strokeLinecap="square" strokeLinejoin="miter" />
        <path d="M22.5 27.5 30 8.5l4 11" stroke="var(--lime, #00ff85)" strokeWidth="3.2" strokeLinecap="square" strokeLinejoin="miter" />
      </svg>
    </span>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className={`${styles.eyebrow} ${light ? styles.eyebrowLight : ''}`}>
      <span className={styles.accentBlock} aria-hidden="true" />
      {children}
    </div>
  );
}

function ServiceIcon({ type }: { type: 'web' | 'systems' | 'creative' | 'growth' }) {
  const paths: Record<typeof type, ReactNode> = {
    web: <><rect x="3" y="4" width="18" height="15" rx="2" /><path d="M3 8h18M7 6h.01M10 6h.01M8 22h8m-4-3v3" /></>,
    systems: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><path d="M10 6.5h4M6.5 10v4m11-4v4M10 17.5h4" /></>,
    creative: <><path d="m12 3 2.6 5.3L20 11l-5.4 2.6L12 19l-2.6-5.4L4 11l5.4-2.7L12 3Z" /><path d="m19 16 1.3 2.7L23 20l-2.7 1.3L19 24l-1.3-2.7L15 20l2.7-1.3L19 16Z" /></>,
    growth: <><path d="M4 20V4m0 16h17" /><path d="m7 15 4-4 3 2 6-7" /><path d="M15.5 6H20v4.5" /></>,
  };
  return <svg className={styles.serviceIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>;
}

function SectionIntro({ label, title, accent, copy, light = false }: {
  label: string; title: ReactNode; accent?: string; copy?: string; light?: boolean;
}) {
  return (
    <div className={`${styles.sectionIntro} ${light ? styles.sectionIntroLight : ''}`} data-reveal>
      <Eyebrow light={light}>{label}</Eyebrow>
      <div className={styles.sectionIntroBody}>
        <h2>{title}{accent && <> <span className={styles.editorialSerif}>{accent}</span></>}</h2>
        {copy && <p>{copy}</p>}
      </div>
    </div>
  );
}

const services = [
  {
    index: '01',
    type: 'web' as const,
    title: 'Digital products',
    copy: 'Websites, web applications, mobile apps, SaaS platforms, and customer portals.',
    outcome: 'Turn an idea or manual workflow into a usable product.',
    items: ['Web applications & SaaS', 'Customer & client portals', 'Product marketing websites', 'Mobile-first interface design'],
  },
  {
    index: '02',
    type: 'systems' as const,
    title: 'Software & AI',
    copy: 'AI agents, intelligent automation, internal tools, API integrations, and data-driven systems.',
    outcome: 'Reduce repetitive work and make systems more useful.',
    items: ['Autonomous AI workflows & agents', 'Custom internal tools & dashboards', 'APIs & third-party integrations', 'Database & backend architecture'],
  },
  {
    index: '03',
    type: 'creative' as const,
    title: 'Brand & creative',
    copy: 'Visual identities, UI/UX design, campaign creatives, and digital brand experiences.',
    outcome: 'Make the business recognizable and its products easier to use.',
    items: ['Brand identity & guidelines', 'Design systems & component libraries', 'Product UI/UX design', 'Campaign & motion creative'],
  },
  {
    index: '04',
    type: 'growth' as const,
    title: 'Digital growth',
    copy: 'Landing pages, social content, digital campaigns, and conversion-focused improvements.',
    outcome: 'Help the business reach its audience and turn interest into enquiries.',
    items: ['High-conversion landing pages', 'Performance ad creative & setup', 'Analytics & conversion tracking', 'Strategic content planning'],
  },
];

const steps = [
  {
    number: '01',
    title: 'Discover',
    copy: 'Understand the business, users, constraints, and desired outcome.',
    caption: 'DISCOVERY / DIRECTION',
  },
  {
    number: '02',
    title: 'Define & design',
    copy: 'Shape the solution, user journeys, scope, and interface.',
    caption: 'STRATEGY / DESIGN',
  },
  {
    number: '03',
    title: 'Build & integrate',
    copy: 'Develop the product, connect services, and test core workflows.',
    caption: 'ENGINEERING / REVIEW',
  },
  {
    number: '04',
    title: 'Launch & improve',
    copy: 'Deploy, validate, monitor, and improve based on feedback.',
    caption: 'DELIVERY / NEXT STEPS',
  },
];

export default function StudioHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 28);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handlePointerMove = (e: MouseEvent) => {
      root.style.setProperty('--mouse-x', `${e.clientX}px`);
      root.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      root.setAttribute('data-motion', 'reduced');
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousemove', handlePointerMove);
      };
    }

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      // 0. Top Viewport Scroll Progress Bar
      const progressBar = root.querySelector<HTMLElement>('[data-scroll-progress]');
      if (progressBar) {
        gsap.fromTo(progressBar, { scaleX: 0 }, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.15,
          },
        });
      }

      // 1. Dynamic Mouse Scroll Velocity Inertia Skew on cards
      const skewTargets = Array.from(root.querySelectorAll<HTMLElement>('[data-scroll-skew]'));
      if (skewTargets.length > 0) {
        const scrollProxy = { skew: 0 };
        const skewSetter = gsap.quickSetter(skewTargets, 'skewY', 'deg');
        const clamp = gsap.utils.clamp(-3, 3);

        ScrollTrigger.create({
          onUpdate: (self) => {
            const skew = clamp(self.getVelocity() / -110);
            if (Math.abs(skew) > Math.abs(scrollProxy.skew)) {
              scrollProxy.skew = skew;
              gsap.to(scrollProxy, {
                skew: 0,
                duration: 0.75,
                ease: 'power3.out',
                overwrite: true,
                onUpdate: () => skewSetter(scrollProxy.skew),
              });
            }
          },
        });
      }

      // 2. Continuous multi-plane parallax depth on project cards
      const projectCards = Array.from(root.querySelectorAll<HTMLElement>('[data-project-card]'));
      projectCards.forEach((card) => {
        const info = card.querySelector('.' + styles.projectInfo);
        const visual = card.querySelector('.' + styles.projectVisual);

        if (visual) {
          gsap.fromTo(visual,
            { y: 30 },
            {
              y: -30,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.0,
              },
            }
          );
        }
        if (info) {
          gsap.fromTo(info,
            { y: -16 },
            {
              y: 16,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            }
          );
        }
      });

      // 3. Staggered scrub on service cards
      const serviceCards = Array.from(root.querySelectorAll<HTMLElement>('[data-service-card]'));
      serviceCards.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 30 + index * 10, opacity: 0.75 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 95%',
              end: 'top 65%',
              scrub: 0.5,
            },
          }
        );
      });

      // 4. Section reveals
      const reveals = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
      reveals.forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 24,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 90%', once: true },
          clearProps: 'opacity,visibility,transform',
        });
      });

      // 5. Hero Copy Stagger Entrance
      const heroCopy = root.querySelector<HTMLElement>('[data-hero-copy]');
      if (heroCopy) {
        gsap.from(heroCopy.children, {
          autoAlpha: 0,
          y: 28,
          stagger: 0.12,
          duration: 0.85,
          ease: 'power3.out',
          clearProps: 'opacity,visibility,transform',
        });
      }

      // 6. Process Timeline Fill & Interactive Scroll-Driven Steps
      const processFill = root.querySelector<HTMLElement>('.' + styles.processTrackFill);
      const processTimeline = root.querySelector<HTMLElement>('.' + styles.processTimeline);
      const processSteps = Array.from(root.querySelectorAll<HTMLElement>('[data-process-step]'));

      if (processTimeline && processSteps.length > 0) {
        const updateSteps = (progress: number) => {
          const p = Math.max(0, Math.min(1, progress));
          if (processFill) {
            gsap.set(processFill, { scaleY: p, transformOrigin: 'top center' });
          }

          // Step thresholds for 4 steps:
          // Step 0: [0, 0.25)
          // Step 1: [0.25, 0.58)
          // Step 2: [0.58, 0.88)
          // Step 3: [0.88, 1.0]
          let activeIdx = 0;
          if (p >= 0.88) activeIdx = 3;
          else if (p >= 0.58) activeIdx = 2;
          else if (p >= 0.25) activeIdx = 1;
          else activeIdx = 0;

          processSteps.forEach((step, idx) => {
            const isActive = idx === activeIdx;
            const isPassed = idx < activeIdx || (idx === activeIdx && p > 0.05);

            step.dataset.active = isActive ? 'true' : 'false';
            step.dataset.passed = isPassed ? 'true' : 'false';
            if (isActive) {
              step.style.setProperty('--step-index', String(idx));
            }
          });
        };

        // Initialize first step as active
        updateSteps(0);

        ScrollTrigger.create({
          trigger: processTimeline,
          start: 'top 75%',
          end: 'bottom 45%',
          scrub: 0.35,
          onUpdate: (self) => {
            updateSteps(self.progress);
          },
        });

        // Interactive click allows user to focus directly on any step
        processSteps.forEach((step, idx) => {
          step.addEventListener('click', () => {
            processSteps.forEach((s, i) => {
              s.dataset.active = i === idx ? 'true' : 'false';
              s.dataset.passed = i <= idx ? 'true' : 'false';
            });
            if (processFill) {
              const targetScale = idx === 0 ? 0 : idx === 1 ? 0.33 : idx === 2 ? 0.66 : 1;
              gsap.to(processFill, { scaleY: targetScale, duration: 0.4, ease: 'power2.out' });
            }
          });
        });
      }
    }, root);

    // Refresh ScrollTrigger as dynamic images/canvases/fonts finish loading
    const refreshST = () => ScrollTrigger.refresh();
    const t1 = setTimeout(refreshST, 150);
    const t2 = setTimeout(refreshST, 600);
    const t3 = setTimeout(refreshST, 1500);
    window.addEventListener('load', refreshST);
    window.addEventListener('resize', refreshST);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('load', refreshST);
      window.removeEventListener('resize', refreshST);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handlePointerMove);
      context.revert();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;
    setFormStatus('sending');
    try {
      await emailjs.sendForm('service_wmrsyml', 'template_48fvrme', formRef.current, '8fJxCzFEsIZ75m-59');
      setFormStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.error('Unable to submit the Majin Studios enquiry form:', error);
      setFormStatus('error');
    }
  };

  return (
    <div className={styles.site} ref={rootRef} data-home-root>
      {/* Top Viewport Scroll Progress Bar */}
      <div className={styles.scrollProgressBar} data-scroll-progress aria-hidden="true" />

      {/* Global Persistent Full-Page 3D Space Warp Canvas */}
      <div className={styles.globalThreeBackdrop} aria-hidden="true">
        <HeroThreeCanvas />
      </div>

      <a className={styles.skipLink} href="#main">Skip to content</a>

      {/* Clean, Refined Header */}
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
        <div className={styles.headerInner}>
          <a href="#top" className={styles.brand} onClick={closeMenu} aria-label="Majin Studios home">
            <BrandMark />
            <span className={styles.brandText}>
              majin<span>studios</span>
            </span>
          </a>

          <nav id="main-navigation" className={`${styles.navigation} ${menuOpen ? styles.navigationOpen : ''}`} aria-label="Main navigation">
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#work" onClick={closeMenu}>Work</a>
            <a href="#process" onClick={closeMenu}>Process</a>
            <a href="#studio" onClick={closeMenu}>Studio</a>
            <a className={styles.mobileNavCta} href="#contact" onClick={closeMenu}>Let&apos;s talk <ArrowIcon diagonal /></a>
          </nav>

          <div className={styles.headerRight}>
            <a className={styles.headerCta} href="#contact">
              Let&apos;s talk <ArrowIcon diagonal />
            </a>
            <button className={`${styles.menuToggle} ${menuOpen ? styles.menuToggleOpen : ''}`} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((open) => !open)}>
              <span /><span />
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        {/* 1. Hero Section */}
        <section id="top" className={styles.hero} data-hero-section>
          <div className={styles.heroAtmosphere} aria-hidden="true" />

          <div className={styles.heroConstellationStage} data-hero-visual>
            <div className={styles.heroCenter} data-hero-copy>
              <div className={styles.heroStatusPill}>
                <span className={styles.statusPulseDot} />
                <span>STUDIO INTAKE OPEN · Q4 2026</span>
              </div>

              <div className={styles.heroEyebrow}>
                <span>DESIGN · ENGINEERING · INTELLIGENCE</span>
              </div>

              <h1 className={styles.heroTitle}>
                Make your next<br />
                <span className={styles.heroGlowWord}>move matter.</span>
              </h1>

              <p className={styles.heroLead}>
                We turn ambitious ideas into digital products, intelligent systems, and creative experiences built to move businesses forward.
              </p>

              <div className={styles.heroActions}>
                <a href="#contact" className={styles.primaryHeroBtn}>
                  Let&apos;s build something <ArrowIcon diagonal />
                </a>
                <a href="#work" className={styles.secondaryHeroBtn}>
                  Explore our work <span className={styles.btnDownArrow}>↓</span>
                </a>
              </div>

              {/* Interactive Capability Deck — Gives high-tech substance and texture on mobile & desktop */}
              <div className={styles.heroMobileDeck}>
                <a href="#services" className={styles.heroMobileCard}>
                  <div className={styles.heroMobileCardTop}>
                    <span className={styles.mobileCardIndex}>01</span>
                    <span className={styles.mobileCardTag}>PRODUCTS</span>
                  </div>
                  <strong>Digital products</strong>
                  <p>Web apps, SaaS &amp; mobile interfaces</p>
                </a>
                <a href="#services" className={styles.heroMobileCard}>
                  <div className={styles.heroMobileCardTop}>
                    <span className={styles.mobileCardIndex}>02</span>
                    <span className={styles.mobileCardTag}>AI SYSTEMS</span>
                  </div>
                  <strong>Software &amp; AI</strong>
                  <p>Intelligent workflows &amp; automation</p>
                </a>
                <a href="#services" className={styles.heroMobileCard}>
                  <div className={styles.heroMobileCardTop}>
                    <span className={styles.mobileCardIndex}>03</span>
                    <span className={styles.mobileCardTag}>BRAND</span>
                  </div>
                  <strong>Brand &amp; design</strong>
                  <p>Identities &amp; design systems</p>
                </a>
                <a href="#services" className={styles.heroMobileCard}>
                  <div className={styles.heroMobileCardTop}>
                    <span className={styles.mobileCardIndex}>04</span>
                    <span className={styles.mobileCardTag}>GROWTH</span>
                  </div>
                  <strong>Digital growth</strong>
                  <p>Landing pages &amp; conversion</p>
                </a>
              </div>

              {/* Quick trust metrics row */}
              <div className={styles.heroTrustStrip}>
                <span>100% In-house</span>
                <i className={styles.trustSep}>•</i>
                <span>Direct founders</span>
                <i className={styles.trustSep}>•</i>
                <span>4-week sprints</span>
              </div>
            </div>
          </div>

          <div className={`${styles.container} ${styles.heroBottomRow}`}>
            <a href="#transition" className={styles.scrollCue}>
              Explore the studio <span>↓</span>
            </a>
          </div>

          <div className={styles.liquidHeroCurtain} aria-hidden="true" />
        </section>

        {/* 3. Hero Transition & Capabilities Strip */}
        <section className={styles.transitionStripSection} id="transition">
          <div className={styles.container}>
            <div className={styles.transitionStripContent} data-reveal>
              <div className={styles.transitionEyebrow}>THE STUDIO</div>
              <h2 className={styles.transitionTitle}>
                Good ideas need more than good design.
              </h2>
              <p className={styles.transitionLead}>
                We bring product thinking, engineering, and creative execution together to build digital experiences that solve real problems.
              </p>
              <div className={styles.capabilitiesPillRow}>
                <span className={styles.capabilityPill}><i /> Web applications</span>
                <span className={styles.capabilityPill}><i /> AI systems</span>
                <span className={styles.capabilityPill}><i /> Automation</span>
                <span className={styles.capabilityPill}><i /> Product design</span>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.liquidPaperCurtain} aria-hidden="true" />

        {/* 4. Services Section */}
        <section className={styles.servicesSection} id="services">
          <div className={styles.container}>
            <SectionIntro
              label="SERVICES"
              title={<>Clear solutions built around <span className={styles.editorialSerif}>actual business outcomes.</span></>}
              copy="A website is only one part of the picture. We connect digital products, the systems behind them, and how they reach customers into a single, cohesive offering."
            />
            <div className={styles.servicesGrid}>
              {services.map((service) => (
                <TiltCard key={service.index} maxTilt={5} className={styles.serviceTiltWrapper}>
                  <article className={styles.serviceCard} data-service-card data-scroll-skew
                    onPointerMove={(event) => {
                      const bounds = event.currentTarget.getBoundingClientRect();
                      event.currentTarget.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
                      event.currentTarget.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
                    }}>
                    <div className={styles.serviceCardTop}>
                      <span className={styles.serviceIconWrap}><ServiceIcon type={service.type} /></span>
                      <span className={styles.cardIndex}>{service.index}</span>
                    </div>
                    <h3>{service.title}</h3>
                    <p className={styles.serviceCardDesc}>{service.copy}</p>

                    <div className={styles.serviceOutcomeBox}>
                      <span className={styles.outcomeTag}>OUTCOME</span>
                      <p>{service.outcome}</p>
                    </div>

                    <ul className={styles.serviceItemList}>
                      {service.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>

                    <a className={styles.cardLink} href="#contact">
                      Explore service <ArrowIcon diagonal />
                    </a>
                  </article>
                </TiltCard>
              ))}
            </div>

            <div className={styles.servicesNote} data-reveal>
              <span className={styles.noteSpark}>✳</span>
              <p><strong>Not sure which service you need?</strong> Tell us the business bottleneck you’re trying to solve and we’ll map out the right first step together.</p>
              <a href="#contact" className={styles.textLink}>Start with a conversation <ArrowIcon /></a>
            </div>
          </div>
        </section>

        <div className={styles.liquidWorkTransition} aria-hidden="true" />

        {/* 5. Selected Work Section */}
        <section className={styles.workSection} id="work">
          <div className={styles.container}>
            <SectionIntro
              label="SELECTED WORK"
              title={<>Built around a real <span className={styles.editorialSerif}>job to be done.</span></>}
              copy="Proof of execution. Each case study demonstrates how we diagnose operational bottlenecks, engineer robust solutions, and deliver measurable outcomes."
            />

            {/* Case Study 01: Scanfeast */}
            <TiltCard maxTilt={3.5} scale={1.01} className={styles.projectTiltWrapper}>
              <article className={`${styles.projectCard} ${styles.projectCardScanfeast}`} data-project-card data-scroll-skew data-reveal>
                <div className={styles.projectVisual}>
                  <ScanfeastCardPreview />
                </div>
                <div className={styles.projectInfo}>
                  <div className={styles.projectPill}>
                    <span className={styles.projectPillDot} />
                    <span className={styles.projectPillText}>01 / PRODUCT &amp; SAAS · HOSPITALITY</span>
                  </div>
                  <h3>Scanfeast</h3>
                  <p className={styles.projectLead}>
                    A restaurant ordering and operations platform built around QR ordering, kitchen order management, and a manager dashboard.
                  </p>

                  <div className={styles.caseStudyQuestions}>
                    <div className={styles.caseQuestionItem}>
                      <strong>The Problem:</strong>
                      <p>Traditional dining rooms suffer from communication friction and order inaccuracies caused by disconnected staff, paper tickets, and fragmented terminals.</p>
                    </div>
                    <div className={styles.caseQuestionItem}>
                      <strong>What We Built:</strong>
                      <p>An instant, frictionless QR ordering web client for guests, synchronized in real time with an active Kitchen Display System (KDS) and analytics console.</p>
                    </div>
                    <div className={styles.caseQuestionItem}>
                      <strong>Key Decisions:</strong>
                      <p>Sub-second WebSocket order dispatching, zero app download barrier, and offline-tolerant kitchen ticket sync.</p>
                    </div>
                  </div>

                  <div className={styles.projectFeatureList}>
                    <span>QR ordering</span>
                    <span>Kitchen display</span>
                    <span>Operations</span>
                    <span>Real-time WebSocket</span>
                  </div>

                  <div className={styles.projectActionRow}>
                    <a href="/scanfeast/" className={styles.projectCtaBtn}>
                      Explore case study <ArrowIcon diagonal />
                    </a>
                    <span className={styles.projectMetaTag}>Live Production SaaS</span>
                  </div>
                </div>
              </article>
            </TiltCard>

            {/* Case Study 02: Quantum Arena */}
            <TiltCard maxTilt={3.5} scale={1.01} className={styles.projectTiltWrapper}>
              <article className={`${styles.projectCard} ${styles.projectCardQuantum}`} data-project-card data-scroll-skew data-reveal>
                <div className={styles.projectInfo}>
                  <div className={styles.projectPill}>
                    <span className={styles.projectPillDot} />
                    <span className={styles.projectPillText}>02 / DIGITAL PLATFORM · GAMING &amp; EVENTS</span>
                  </div>
                  <h3>Quantum Arena</h3>
                  <p className={styles.projectLead}>
                    A gaming-focused tournament experience and event operations infrastructure platform.
                  </p>

                  <div className={styles.caseStudyQuestions}>
                    <div className={styles.caseQuestionItem}>
                      <strong>The Problem:</strong>
                      <p>Large competitive events struggle with gate congestion, paper-based judging delays, and delayed bracket updates that disrupt event schedules.</p>
                    </div>
                    <div className={styles.caseQuestionItem}>
                      <strong>What We Built:</strong>
                      <p>A unified infrastructure suite bringing participant registration, sub-200ms QR gate check-in, live matchmaking brackets, and judge scoring together.</p>
                    </div>
                    <div className={styles.caseQuestionItem}>
                      <strong>Key Decisions:</strong>
                      <p>High-concurrency ticket verification, multi-criteria score matrix aggregation, and low-latency team status updates.</p>
                    </div>
                  </div>

                  <div className={styles.projectFeatureList}>
                    <span>Product experience</span>
                    <span>Interactive UI</span>
                    <span>QR gate check-in</span>
                    <span>Judging matrix</span>
                  </div>

                  <div className={styles.projectActionRow}>
                    <a href="/quantumarena/" className={styles.projectCtaBtn}>
                      Explore case study <ArrowIcon diagonal />
                    </a>
                    <span className={styles.projectMetaTag}>Hackathon Infrastructure</span>
                  </div>
                </div>
                <div className={styles.projectVisual}>
                  <QuantumArenaCardPreview />
                </div>
              </article>
            </TiltCard>

            {/* Concept Exploration: Nexus AI */}
            <TiltCard maxTilt={3.5} scale={1.01} className={styles.projectTiltWrapper}>
              <article className={`${styles.projectCard} ${styles.projectCardScanfeast}`} data-project-card data-scroll-skew data-reveal>
                <div className={styles.projectVisual}>
                  <NexusAICardPreview />
                </div>
                <div className={styles.projectInfo}>
                  <div className={styles.projectPill}>
                    <span className={styles.projectPillDot} />
                    <span className={styles.projectPillText}>03 / AI PLATFORM · CONCEPT EXPLORATION</span>
                  </div>
                  <h3>Nexus AI</h3>
                  <p className={styles.projectLead}>
                    Autonomous multi-agent orchestration architecture demo built to test complex workflow automation.
                  </p>

                  <div className={styles.caseStudyQuestions}>
                    <div className={styles.caseQuestionItem}>
                      <strong>The Exploration:</strong>
                      <p>Investigating how agentic LLM systems can plan and execute multi-step operations without manual human intervention.</p>
                    </div>
                    <div className={styles.caseQuestionItem}>
                      <strong>What We Prototyped:</strong>
                      <p>An interactive agent mesh connecting planner models directly with tool invocation, private vector memory, and streaming UI.</p>
                    </div>
                  </div>

                  <div className={styles.projectFeatureList}>
                    <span>Agent orchestration</span>
                    <span>Tool invocation mesh</span>
                    <span>Vector memory</span>
                    <span>Interactive demo</span>
                  </div>

                  <div className={styles.projectActionRow}>
                    <a href="#contact" className={styles.projectCtaBtn}>
                      Discuss AI systems <ArrowIcon diagonal />
                    </a>
                    <span className={styles.conceptBadge}>Concept &amp; Demo</span>
                  </div>
                </div>
              </article>
            </TiltCard>

            <div className={styles.workClosing} data-reveal>
              <p>Looking for a custom solution tailored to your operational constraints?</p>
              <a href="#contact" className={styles.closingCtaBtn}>
                Tell us what you’re building <ArrowIcon />
              </a>
            </div>
          </div>
        </section>

        {/* 6. Consolidated Process Section */}
        <section className={styles.approachSection} id="process">
          <div className={styles.container}>
            <SectionIntro
              label="PROCESS"
              title={<>One clear sequence. <span className={styles.editorialSerif}>No disconnected hand-offs.</span></>}
              copy="A good process makes the work clearer, not heavier. Here’s how we move from an open business question to a finished, verified deployment."
            />
            <div className={styles.processTimeline} data-reveal>
              <div className={styles.processTrack} aria-hidden="true"><span className={styles.processTrackFill} /></div>
              {steps.map((step, index) => (
                <article
                  className={styles.processStep}
                  key={step.number}
                  data-process-step
                  data-active={index === 0 ? 'true' : 'false'}
                  data-passed="false"
                >
                  <div className={styles.processMarker}><span>{step.number}</span><i /></div>
                  <div className={styles.processCopy}>
                    <span className={styles.processCaption}>{step.caption}</span>
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                  </div>
                  <span className={styles.processArrow} aria-hidden="true">↗</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Why Majin Section */}
        <section className={styles.whyMajinSection} id="why-majin">
          <div className={styles.container}>
            <div className={styles.whyMajinGrid} data-reveal>
              <div className={styles.whyMajinLeft}>
                <div className={styles.whyEyebrow}>OUR PHILOSOPHY</div>
                <h2 className={styles.whyTitle}>
                  Thoughtful by design.<br />
                  <span className={styles.editorialSerif}>Built to work.</span>
                </h2>
                <p className={styles.whyLead}>
                  We are an independent digital product house that values direct collaboration over agency bureaucracy. We bridge the gap between product strategy, engineering rigor, and aesthetic craft so nothing is lost in translation.
                </p>
                <div className={styles.whyHighlightBox}>
                  <span className={styles.whyDot} />
                  <span>Direct founder collaboration on every project. Zero junior account managers.</span>
                </div>
              </div>

              <div className={styles.whyMajinPrinciples}>
                <div className={styles.editorialPrincipleItem}>
                  <div className={styles.principleHeader}>
                    <span className={styles.principleNumber}>01</span>
                    <h3>Product thinking</h3>
                  </div>
                  <p>
                    Focus on the problem before choosing the technology. Uncovering root operational constraints prevents weeks of wasted engineering and decorative complexity.
                  </p>
                </div>

                <div className={styles.editorialPrincipleItem}>
                  <div className={styles.principleHeader}>
                    <span className={styles.principleNumber}>02</span>
                    <h3>Engineering with intent</h3>
                  </div>
                  <p>
                    Build maintainable systems that fit the actual requirements. We prioritize production-grade reliability, clean schemas, and responsive edge performance.
                  </p>
                </div>

                <div className={styles.editorialPrincipleItem}>
                  <div className={styles.principleHeader}>
                    <span className={styles.principleNumber}>03</span>
                    <h3>Design that serves the outcome</h3>
                  </div>
                  <p>
                    Make products clear, usable, and consistent with the brand. Interfaces should reduce cognitive load, eliminate confusion, and move people effortlessly toward action.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Studio & Team Section */}
        <section className={styles.studioSection} id="studio">
          <div className={styles.container}>
            <div className={styles.studioPanel} data-reveal>
              <div className={styles.studioHeader}>
                <div className={styles.studioEyebrow}>THE STUDIO &amp; TEAM</div>
                <h2>
                  Senior hands on the work.{' '}
                  <span className={styles.editorialSerif}>Direct communication from day one.</span>
                </h2>
              </div>

              <div className={styles.studioOverviewGrid}>
                <div className={styles.studioOverviewText}>
                  <p className={styles.studioDescP}>
                    Majin Studios is an independent digital studio based in Hyderabad, India, collaborating with forward-thinking founders and teams worldwide. We intentionally stay small so that the people you talk with in discovery are the exact engineers and designers building your system.
                  </p>
                  <p className={styles.studioDescP}>
                    No layers of account management. No bait-and-switch hand-offs. Just direct, transparent execution focused on shipping software that actually works for your business.
                  </p>

                  <div className={styles.studioSpecsRow}>
                    <div className={styles.studioSpec}>
                      <strong>Model</strong>
                      <span>Direct Founder Partnership</span>
                    </div>
                    <div className={styles.studioSpec}>
                      <strong>Location</strong>
                      <span>Hyderabad, IN &amp; Remote</span>
                    </div>
                    <div className={styles.studioSpec}>
                      <strong>Availability</strong>
                      <span>Accepting Q4/Q1 Projects</span>
                    </div>
                  </div>
                </div>

                <div className={styles.studioGraphicCard}>
                  <div className={styles.studioGraphicBrand}>
                    <BrandMark inverse />
                    <div>
                      <strong>MAJIN STUDIOS</strong>
                      <small>DIGITAL PRODUCT HOUSE</small>
                    </div>
                  </div>
                  <div className={styles.studioGraphicDivider} />
                  <p className={styles.studioGraphicQuote}>
                    &ldquo;We measure our success not by awards, but by whether the software we build solves the problem and endures in production.&rdquo;
                  </p>
                  <div className={styles.studioGraphicContact}>
                    <a href="mailto:hello@majin.studio" className={styles.studioEmailLink}>
                      hello@majin.studio <ArrowIcon diagonal />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Contact Section */}
        <section className={styles.contactSection} id="contact">
          <div className={styles.container}>
            <div className={styles.contactLayout}>
              <div className={styles.contactLeftPanel} data-reveal>
                <div>
                  <div className={styles.contactEyebrow}>
                    <span className={styles.contactPulseDot} />
                    <span>START A CONVERSATION · INTAKE OPEN</span>
                  </div>

                  <h2 className={styles.contactTitle}>
                    Have a project in mind?<br />
                    <span className={styles.heroGlowWord}>Let&apos;s make it real.</span>
                  </h2>

                  <p className={styles.contactLead}>
                    Tell us what you&apos;re trying to build, automate, or scale. We review every brief personally and reply within 24 hours with practical technical and architectural direction.
                  </p>

                  {/* What to Expect / Studio Guarantees */}
                  <div className={styles.contactExpectGrid}>
                    <div className={styles.expectCard}>
                      <div className={styles.expectIcon}>⚡</div>
                      <div>
                        <strong>Direct Founder Review</strong>
                        <p>Zero junior account managers. You speak directly with senior engineers and designers from day one.</p>
                      </div>
                    </div>

                    <div className={styles.expectCard}>
                      <div className={styles.expectIcon}>🎯</div>
                      <div>
                        <strong>Pragmatic Scope &amp; Tech</strong>
                        <p>We help prioritize what is worth building first to prevent weeks of wasted engineering and decorative complexity.</p>
                      </div>
                    </div>

                    <div className={styles.expectCard}>
                      <div className={styles.expectIcon}>🛡️</div>
                      <div>
                        <strong>Full IP Ownership</strong>
                        <p>Strict confidentiality and mutual NDA upfront. You retain 100% intellectual property ownership of all deliverables.</p>
                      </div>
                    </div>

                    <div className={styles.expectCard}>
                      <div className={styles.expectIcon}>🚀</div>
                      <div>
                        <strong>Fast Sprint Cadence</strong>
                        <p>From agreed brief to working production deployments in focused, weekly staging checkpoints.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Connect & Availability Hub */}
                <div className={styles.contactDirectHub}>
                  <div className={styles.contactDirectItem}>
                    <span>DIRECT INBOX</span>
                    <a href="mailto:hello@majin.studio" className={styles.directEmailLink}>
                      hello@majin.studio <ArrowIcon diagonal />
                    </a>
                  </div>
                  <div className={styles.contactDirectDivider} />
                  <div className={styles.contactDirectItem}>
                    <span>STUDIO LOCATION</span>
                    <span className={styles.directLocationText}>Hyderabad, India · Working Globally</span>
                  </div>
                </div>
              </div>

              <div className={styles.contactFormCard} data-reveal>
                {formStatus === 'success' ? (
                  <div className={styles.formSuccess}>
                    <span className={styles.successIcon}>✓</span>
                    <h3>Thanks for reaching out.</h3>
                    <p>Your message has been received. We’ll review your project details and get back to you within 24 hours.</p>
                    <button type="button" className={styles.resetButton} onClick={() => setFormStatus('idle')}>
                      Send another message <ArrowIcon />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className={styles.formHeading}>
                      <div>
                        <span className={styles.formEyebrow}>PROJECT ENQUIRY</span>
                        <strong>Let’s get the conversation started.</strong>
                      </div>
                      <span className={styles.formClock}>~ 2 MIN</span>
                    </div>
                    <form ref={formRef} onSubmit={handleSubmit} className={styles.contactForm}>
                      <div className={styles.formGrid}>
                        <label>
                          Your name
                          <input name="name" type="text" placeholder="Name" autoComplete="name" required />
                        </label>
                        <label>
                          Email address
                          <input name="email" type="email" placeholder="you@company.com" autoComplete="email" required />
                        </label>
                      </div>
                      <label>
                        Business or project name <span className={styles.optional}>(optional)</span>
                        <input name="company" type="text" placeholder="Company or project" autoComplete="organization" />
                      </label>
                      <label>
                        What can we help with?
                        <select name="service" defaultValue="">
                          <option value="" disabled>Choose an area (optional)</option>
                          <option>Digital products &amp; web apps</option>
                          <option>Software, AI &amp; automation</option>
                          <option>Brand &amp; creative design</option>
                          <option>Digital marketing &amp; growth</option>
                          <option>A mix of services / not sure yet</option>
                        </select>
                      </label>
                      <label>
                        Tell us a little about it
                        <textarea name="query" placeholder="What problem are you trying to solve or build?" rows={4} required />
                      </label>
                      {formStatus === 'error' && (
                        <p className={styles.formError} role="alert">
                          We couldn’t send this just now. Please email <a href="mailto:hello@majin.studio">hello@majin.studio</a> directly.
                        </p>
                      )}
                      <button className={styles.submitButton} type="submit" disabled={formStatus === 'sending'}>
                        {formStatus === 'sending' ? 'Sending enquiry…' : 'Send project enquiry'} <ArrowIcon diagonal />
                      </button>
                      <p className={styles.formPrivacy}>Your details are confidential and only used to reply to your enquiry.</p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 10. Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerTop}>
            <a href="#top" className={styles.footerBrand}>
              <BrandMark inverse />
              <span>
                <b>majin<span>studios</span></b>
                <small>DIGITAL PRODUCT HOUSE</small>
              </span>
            </a>
            <p>Digital products, thoughtful design, and practical systems—connected from the start.</p>
            <a className={styles.footerCta} href="#contact">
              Have a project in mind? <span>Let’s talk <ArrowIcon diagonal /></span>
            </a>
          </div>

          <div className={styles.footerLinks}>
            <div>
              <span>EXPLORE</span>
              <a href="#services">Services</a>
              <a href="#work">Work</a>
              <a href="#process">Process</a>
              <a href="#studio">Studio</a>
              <a href="#contact">Contact</a>
            </div>
            <div>
              <span>CASE STUDIES</span>
              <a href="/scanfeast/">Scanfeast <ArrowIcon diagonal /></a>
              <a href="/quantumarena/">Quantum Arena <ArrowIcon diagonal /></a>
            </div>
            <div>
              <span>CONNECT</span>
              <a href="mailto:hello@majin.studio">hello@majin.studio <ArrowIcon diagonal /></a>
              <a href="https://www.linkedin.com/company/majin-studios" target="_blank" rel="noreferrer">LinkedIn <ArrowIcon diagonal /></a>
              <a href="https://www.instagram.com/majin_studios/" target="_blank" rel="noreferrer">Instagram <ArrowIcon diagonal /></a>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <span>© {new Date().getFullYear()} Majin Studios. All rights reserved.</span>
            <span>HYDERABAD, INDIA · WORKING REMOTELY WORLDWIDE</span>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
