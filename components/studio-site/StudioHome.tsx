'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import Image from 'next/image';
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
        <path d="M22.5 27.5 30 8.5l4 11" stroke="var(--lime)" strokeWidth="3.2" strokeLinecap="square" strokeLinejoin="miter" />
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

function ButtonLink({ href, children, secondary = false, external = false, className = '' }: {
  href: string; children: ReactNode; secondary?: boolean; external?: boolean; className?: string;
}) {
  return (
    <a className={`${styles.button} ${secondary ? styles.buttonSecondary : ''} ${className}`} href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {children}<ArrowIcon diagonal={external} />
    </a>
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
    index: '01', type: 'web' as const, title: 'Websites & digital products',
    copy: 'Clear, considered digital experiences built around what your customers need to do—not just what a page needs to say.',
    items: ['Business and product websites', 'Web apps and customer portals', 'Mobile-first interface design'],
    tint: 'paper' as const,
  },
  {
    index: '02', type: 'systems' as const, title: 'Software, AI & automation',
    copy: 'Practical systems that take repetitive work off your plate, connect the tools you already use, and make operations easier to manage.',
    items: ['Custom internal tools', 'AI-powered workflows', 'APIs, integrations and dashboards'],
    tint: 'green' as const,
  },
  {
    index: '03', type: 'creative' as const, title: 'Brand & creative design',
    copy: 'A sharper visual identity and a consistent creative system for the places people discover, recognize, and remember your business.',
    items: ['Brand identity and design systems', 'Campaign and ad creatives', 'Social media design and content'],
    tint: 'lime' as const,
  },
  {
    index: '04', type: 'growth' as const, title: 'Digital marketing & growth',
    copy: 'Campaigns and digital touchpoints that make the next step clear, connect the message to the audience, and give you a way to learn.',
    items: ['Paid ad campaign setup', 'Landing pages and conversion paths', 'Content planning and campaign reporting'],
    tint: 'paper' as const,
  },
];

const steps = [
  { number: '01', title: 'Understand the problem', copy: 'We start with the people you serve, the outcome you need, and the constraints that matter. A clearer brief saves time later.', caption: 'DISCOVERY / DIRECTION' },
  { number: '02', title: 'Shape the right response', copy: 'We map the experience, agree on priorities, and make the important decisions visible before the details multiply.', caption: 'STRATEGY / DESIGN' },
  { number: '03', title: 'Build and refine', copy: 'We turn the plan into a working experience, test the important paths, and refine the details that make it feel complete.', caption: 'ENGINEERING / REVIEW' },
  { number: '04', title: 'Launch with purpose', copy: 'We prepare the hand-off, connect the moving parts, and identify the next useful improvement based on the goals we set together.', caption: 'DELIVERY / NEXT STEPS' },
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
        let scrollProxy = { skew: 0 };
        let skewSetter = gsap.quickSetter(skewTargets, 'skewY', 'deg');
        let clamp = gsap.utils.clamp(-3.5, 3.5);

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

      // 2. Continuous scrubbed image parallax on product visuals
      const projectVisuals = Array.from(root.querySelectorAll<HTMLElement>('[data-project-visual]'));
      projectVisuals.forEach((visual) => {
        const img = visual.querySelector('img');
        if (img) {
          gsap.fromTo(img,
            { yPercent: -12, scale: 1.08 },
            {
              yPercent: 12,
              scale: 0.98,
              ease: 'none',
              scrollTrigger: {
                trigger: visual,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        }
      });

      // 3. Continuous multi-plane parallax depth on project cards
      const projectCards = Array.from(root.querySelectorAll<HTMLElement>('[data-project-card]'));
      projectCards.forEach((card) => {
        const info = card.querySelector('.' + styles.projectInfo);
        const visual = card.querySelector('.' + styles.projectVisual);

        if (visual) {
          gsap.fromTo(visual,
            { y: 35 },
            {
              y: -35,
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
            { y: -20 },
            {
              y: 20,
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

      // 4. Staggered scrub on service cards
      const serviceCards = Array.from(root.querySelectorAll<HTMLElement>('[data-service-card]'));
      serviceCards.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 35 + index * 12, opacity: 0.7 },
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

      // 5. Section reveals
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

      const heroCopy = root.querySelector<HTMLElement>('[data-hero-copy]');
      if (heroCopy) {
        gsap.from(heroCopy, {
          autoAlpha: 0,
          y: 20,
          duration: 0.75,
          ease: 'power3.out',
          clearProps: 'opacity,visibility,transform',
        });
      }

      const flowFill = root.querySelector<HTMLElement>('[data-flow-fill]');
      const flowSection = root.querySelector<HTMLElement>('[data-flow-section]');
      if (flowFill && flowSection) {
        const isCompactFlow = window.matchMedia('(max-width: 740px)').matches;
        gsap.fromTo(flowFill, isCompactFlow ? { scaleY: 0 } : { scaleX: 0 }, {
          ...(isCompactFlow ? { scaleY: 1 } : { scaleX: 1 }),
          ease: 'none',
          scrollTrigger: { trigger: flowSection, start: 'top 72%', end: 'bottom 58%', scrub: 0.6 },
        });
      }

      const processFill = root.querySelector<HTMLElement>('.' + styles.processTrackFill);
      const processTimeline = root.querySelector<HTMLElement>('.' + styles.processTimeline);
      if (processFill && processTimeline) {
        gsap.fromTo(processFill, { scaleY: 0 }, {
          scaleY: 1, ease: 'none',
          scrollTrigger: { trigger: processTimeline, start: 'top 72%', end: 'bottom 42%', scrub: 0.55 },
        });
      }

      const processSteps = Array.from(root.querySelectorAll<HTMLElement>('[data-process-step]'));
      processSteps.forEach((step, index) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 66%', end: 'bottom 38%',
          onToggle: (self) => {
            step.dataset.active = self.isActive ? 'true' : 'false';
            if (self.isActive) step.style.setProperty('--step-index', String(index));
          },
        });
      });
    }, root);

    return () => {
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
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
        <div className={styles.headerInner}>
          <a href="#top" className={styles.brand} onClick={closeMenu} aria-label="Majin Studios home">
            <BrandMark />
            <span className={styles.brandText}>
              majin<span>studios</span>
            </span>
            <span className={styles.brandDivider}>✕</span>
            <span className={styles.brandTagline}>A DIGITAL PRODUCT HOUSE</span>
          </a>
          <nav id="main-navigation" className={`${styles.navigation} ${menuOpen ? styles.navigationOpen : ''}`} aria-label="Main navigation">
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#work" onClick={closeMenu}>Selected work</a>
            <a href="#approach" onClick={closeMenu}>Approach</a>
            <a href="#studio" onClick={closeMenu}>Studio</a>
            <a className={styles.mobileNavCta} href="#contact" onClick={closeMenu}>Start a project <ArrowIcon /></a>
          </nav>
          <div className={styles.headerRight}>
            <a className={styles.headerCta} href="#contact">
              <span className={styles.headerCtaDot} />
              Let’s talk <ArrowIcon diagonal />
            </a>
            <button className={`${styles.menuToggle} ${menuOpen ? styles.menuToggleOpen : ''}`} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((open) => !open)}>
              <span /><span />
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section id="top" className={styles.hero} data-hero-section>
          <div className={styles.heroAtmosphere} aria-hidden="true" />

          {/* Centered Velozity & Webcros-inspired Cosmic Hero Stage */}
          <div className={styles.heroConstellationStage} data-hero-visual>
            {/* Central Headline, Subtitle, and CTAs */}
            <div className={styles.heroCenter} data-hero-copy>
              <div className={styles.heroEyebrow}>
                <span className={styles.eyebrowPulse} />
                <span>INDEPENDENT DIGITAL STUDIO · HYDERABAD, INDIA</span>
              </div>

              <h1 className={styles.heroTitle}>
                Make your next{' '}
                <span className={styles.heroBadgeHighlight}>move</span>{' '}
                <span className={`${styles.heroGlowWord} ${styles.editorialSerif}`}>matter.</span>
              </h1>

              <p className={styles.heroLead}>
                We turn business ideas into thoughtful digital products, useful systems, and creative work that move things forward.
              </p>

              {/* Social Proof Stack (Webcros inspired) */}
              <div className={styles.heroSocialProof}>
                <div className={styles.clientAvatars}>
                  <span className={styles.avatarPill} style={{ background: '#00ff85', color: '#011e11' }}>⚡</span>
                  <span className={styles.avatarPill} style={{ background: '#38bdf8', color: '#031726' }}>SF</span>
                  <span className={styles.avatarPill} style={{ background: '#f43f5e', color: '#fff' }}>QA</span>
                  <span className={styles.avatarPill} style={{ background: '#a855f7', color: '#fff' }}>AI</span>
                </div>
                <div className={styles.proofText}>
                  <div className={styles.starsRow}>
                    <span className={styles.ratingNumber}>5.0</span>
                    <span className={styles.starsIcon}>★★★★★</span>
                    <span className={styles.ratingCount}>/ 5.0 Rating</span>
                  </div>
                  <span className={styles.proofLabel}>Built by senior engineers · Zero hand-off</span>
                </div>
              </div>

              <div className={styles.heroActions}>
                <a href="#contact" className={styles.primaryHeroBtn}>
                  Tell us what you’re building <ArrowIcon />
                </a>
                <a href="#work" className={styles.secondaryHeroBtn}>
                  <span className={styles.playArrow}>▶</span>
                  Explore selected work
                </a>
              </div>

              <div className={styles.heroTrust}>
                <span className={styles.trustBadge}><i /> Small dedicated team</span>
                <span className={styles.trustSep}>·</span>
                <span className={styles.trustBadge}><i /> Direct founder collaboration</span>
                <span className={styles.trustSep}>·</span>
                <span className={styles.trustBadge}><i /> Production-grade velocity</span>
              </div>
            </div>
          </div>

          <div className={`${styles.container} ${styles.heroBottomRow}`}>
            <span>PRODUCTS · SYSTEMS · CREATIVE · GROWTH</span>
            <a href="#services" className={styles.scrollCue}>
              A closer look <span>↓</span>
            </a>
          </div>

          <div className={styles.liquidHeroCurtain} aria-hidden="true" />
        </section>

        <div className={styles.serviceTicker} aria-label="Majin Studios capabilities">
          <div className={styles.tickerTrack} aria-hidden="true">
            {[0, 1].map((copy) => <div className={styles.tickerGroup} key={copy}><span>Digital products</span><i>✳</i><span>Custom software</span><i>✳</i><span>AI & automation</span><i>✳</i><span>Brand & creative</span><i>✳</i><span>Digital marketing</span><i>✳</i></div>)}
          </div>
        </div>

        <div className={styles.liquidPaperCurtain} aria-hidden="true" />

        <section className={styles.servicesSection} id="services">
          <div className={styles.container}>
            <SectionIntro
              label="WHAT WE DO"
              title={<>Good ideas need the <span className={styles.editorialSerif}>right things around them.</span></>}
              copy="A website is only one part of the picture. We bring the product, the systems behind it, the way it looks, and the way it reaches people into the same conversation."
            />
            <div className={styles.servicesGrid}>
              {services.map((service) => (
                <TiltCard key={service.index} maxTilt={6} className={styles.serviceTiltWrapper}>
                  <article className={`${styles.serviceCard} ${service.tint === 'green' ? styles.serviceCardGreen : ''} ${service.tint === 'lime' ? styles.serviceCardLime : ''}`} data-service-card data-scroll-skew
                    onPointerMove={(event) => {
                      const bounds = event.currentTarget.getBoundingClientRect();
                      event.currentTarget.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
                      event.currentTarget.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
                    }}>
                    <div className={styles.serviceCardTop}><span className={styles.serviceIconWrap}><ServiceIcon type={service.type} /></span><span className={styles.cardIndex}>{service.index} / 04</span></div>
                    <h3>{service.title}</h3>
                    <p>{service.copy}</p>
                    <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
                    <a className={styles.cardLink} href="#contact">Talk through this service <ArrowIcon diagonal /></a>
                    <span className={styles.cardDecoration} aria-hidden="true">{service.index}</span>
                  </article>
                </TiltCard>
              ))}
            </div>
            <div className={styles.servicesNote} data-reveal><span className={styles.noteSpark}>✳</span><p><strong>Not sure what you need yet?</strong> That’s a good place to start. Tell us what you want to improve and we’ll work out the right first step together.</p><a href="#contact" className={styles.textLink}>Start with a conversation <ArrowIcon /></a></div>
          </div>
        </section>

        <div className={styles.liquidFlowTransition} aria-hidden="true" />

        <section className={styles.flowSection} data-flow-section id="approach">
          <div className={styles.container}>
            <div className={styles.flowHeader} data-reveal>
              <div className={styles.flowHeaderLeft}>
                <Eyebrow light>HOW THE PARTS CONNECT</Eyebrow>
                <h2>One clear direction. <span className={styles.editorialSerif}>Four connected disciplines.</span></h2>
              </div>
              <p className={styles.flowLead}>
                The value isn’t in doing everything at once. It’s in knowing what each part needs to do—and making sure the hand-offs make sense.
              </p>
            </div>

            <div className={styles.flowBoard} data-reveal>
              <div className={styles.flowSteps}>
                {/* 01 STRATEGY */}
                <TiltCard maxTilt={5} className={styles.flowTiltWrapper}>
                  <article className={styles.flowCard} data-scroll-skew>
                    <div className={styles.flowCardTop}>
                      <span className={styles.flowNumber}>01</span>
                      <span className={styles.flowMeta}>STRATEGY</span>
                    </div>
                    <div className={styles.flowCardBody}>
                      <div className={styles.flowGlyphWrap}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" />
                          <line x1="12" y1="3" x2="12" y2="7" /><line x1="12" y1="17" x2="12" y2="21" />
                          <line x1="3" y1="12" x2="7" y2="12" /><line x1="17" y1="12" x2="21" y2="12" />
                        </svg>
                      </div>
                      <h3>Find the signal</h3>
                      <p>Get clear on the real problem, audience, and desired outcome.</p>
                    </div>
                    <div className={styles.flowTags}>
                      <span>Problem definition</span>
                      <span>Audience</span>
                      <span>KPIs</span>
                    </div>
                  </article>
                </TiltCard>

                {/* 02 DESIGN */}
                <TiltCard maxTilt={5} className={styles.flowTiltWrapper}>
                  <article className={styles.flowCard} data-scroll-skew>
                    <div className={styles.flowCardTop}>
                      <span className={styles.flowNumber}>02</span>
                      <span className={styles.flowMeta}>DESIGN</span>
                    </div>
                    <div className={styles.flowCardBody}>
                      <div className={styles.flowGlyphWrap}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2L2 7l10 5 10-5-10-5z" />
                          <path d="M2 17l10 5 10-5" />
                          <path d="M2 12l10 5 10-5" />
                        </svg>
                      </div>
                      <h3>Shape the experience</h3>
                      <p>Make the idea understandable, usable, and recognisable.</p>
                    </div>
                    <div className={styles.flowTags}>
                      <span>UX/UI</span>
                      <span>Design Systems</span>
                      <span>Prototypes</span>
                    </div>
                  </article>
                </TiltCard>

                {/* 03 ENGINEERING */}
                <TiltCard maxTilt={5} className={styles.flowTiltWrapper}>
                  <article className={styles.flowCard} data-scroll-skew>
                    <div className={styles.flowCardTop}>
                      <span className={styles.flowNumber}>03</span>
                      <span className={styles.flowMeta}>ENGINEERING</span>
                    </div>
                    <div className={styles.flowCardBody}>
                      <div className={styles.flowGlyphWrap}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="4" y="4" width="16" height="16" rx="3" />
                          <path d="M9 9h6v6H9z" />
                          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
                        </svg>
                      </div>
                      <h3>Make it work</h3>
                      <p>Turn the plan into a reliable product or operating system.</p>
                    </div>
                    <div className={styles.flowTags}>
                      <span>Full-Stack</span>
                      <span>APIs & Data</span>
                      <span>Cloud & AI</span>
                    </div>
                  </article>
                </TiltCard>

                {/* 04 GROWTH */}
                <TiltCard maxTilt={5} className={styles.flowTiltWrapper}>
                  <article className={styles.flowCard} data-scroll-skew>
                    <div className={styles.flowCardTop}>
                      <span className={styles.flowNumber}>04</span>
                      <span className={styles.flowMeta}>GROWTH</span>
                    </div>
                    <div className={styles.flowCardBody}>
                      <div className={styles.flowGlyphWrap}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                          <polyline points="16 7 22 7 22 13" />
                        </svg>
                      </div>
                      <h3>Help it move</h3>
                      <p>Prepare the launch and connect the work to the right audience.</p>
                    </div>
                    <div className={styles.flowTags}>
                      <span>Launch</span>
                      <span>Funnels</span>
                      <span>Performance</span>
                    </div>
                  </article>
                </TiltCard>
              </div>

              <div className={styles.flowFooter}>
                <span>NO DECORATIVE COMPLEXITY. NO DISCONNECTED HAND-OFFS.</span>
                <a href="#contact" className={styles.flowFooterLink}>THE MAJIN APPROACH <b>↗</b></a>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.liquidWorkTransition} aria-hidden="true" />

        <section className={styles.workSection} id="work">
          <div className={styles.container}>
            <SectionIntro
              label="SELECTED WORK"
              title={<>Built around a real <span className={styles.editorialSerif}>job to be done.</span></>}
              copy="A look at two products from our studio. Each solves a different kind of operational problem, with the same care for how people move through the experience."
            />

            {/* Project 01: Scanfeast */}
            <TiltCard maxTilt={4} scale={1.012} className={styles.projectTiltWrapper}>
              <article className={`${styles.projectCard} ${styles.projectCardScanfeast}`} data-project-card data-scroll-skew data-reveal>
                <div className={styles.projectVisual}>
                  <ScanfeastCardPreview />
                </div>
                <div className={styles.projectInfo}>
                  <div className={styles.projectPill}>
                    <span className={styles.projectPillDot} />
                    <span className={styles.projectPillText}>01 / PRODUCT &amp; SAAS · HOSPITALITY TECH</span>
                  </div>
                  <h3>Scanfeast</h3>
                  <p className={styles.projectLead}>
                    Restaurant ordering that keeps the front of house and the kitchen in sync.
                  </p>
                  <p className={styles.projectCopy}>
                    Scanfeast connects QR-based menu access and ordering with kitchen order handling and a manager view—so the diner, kitchen, and operator aren’t working from disconnected screens.
                  </p>
                  <div className={styles.projectFeatureList}>
                    <span>QR-based ordering</span>
                    <span>Kitchen display system</span>
                    <span>Manager dashboard</span>
                    <span>Live order flow</span>
                    <span>Real-time WebSocket</span>
                  </div>
                  <div className={styles.projectActionRow}>
                    <a href="/scanfeast/" className={styles.projectCtaBtn}>
                      Explore the case study <ArrowIcon diagonal />
                    </a>
                    <span className={styles.projectMetaTag}>Live Production SaaS</span>
                  </div>
                </div>
              </article>
            </TiltCard>

            {/* Project 02: Quantum Arena */}
            <TiltCard maxTilt={4} scale={1.012} className={styles.projectTiltWrapper}>
              <article className={`${styles.projectCard} ${styles.projectCardQuantum}`} data-project-card data-scroll-skew data-reveal>
                <div className={styles.projectInfo}>
                  <div className={styles.projectPill}>
                    <span className={styles.projectPillDot} />
                    <span className={styles.projectPillText}>02 / DIGITAL PLATFORM · EVENT INFRASTRUCTURE</span>
                  </div>
                  <h3>Quantum Arena</h3>
                  <p className={styles.projectLead}>
                    Event operations with fewer loose ends.
                  </p>
                  <p className={styles.projectCopy}>
                    An event platform concept bringing participant registration, QR check-in, competition information, and judging workflows together—so organisers and participants can follow the same process.
                  </p>
                  <div className={styles.projectFeatureList}>
                    <span>Participant workflows</span>
                    <span>QR gate check-in</span>
                    <span>Judging &amp; scoring matrix</span>
                    <span>Live team portals</span>
                    <span>1,500+ Attendees</span>
                  </div>
                  <div className={styles.projectActionRow}>
                    <a href="/quantumarena/" className={styles.projectCtaBtn}>
                      Explore the experience <ArrowIcon diagonal />
                    </a>
                    <span className={styles.projectMetaTag}>Hackathon Infrastructure</span>
                  </div>
                </div>
                <div className={styles.projectVisual}>
                  <QuantumArenaCardPreview />
                </div>
              </article>
            </TiltCard>

            {/* Project 03: Nexus AI */}
            <TiltCard maxTilt={4} scale={1.012} className={styles.projectTiltWrapper}>
              <article className={`${styles.projectCard} ${styles.projectCardScanfeast}`} data-project-card data-scroll-skew data-reveal>
                <div className={styles.projectVisual}>
                  <NexusAICardPreview />
                </div>
                <div className={styles.projectInfo}>
                  <div className={styles.projectPill}>
                    <span className={styles.projectPillDot} />
                    <span className={styles.projectPillText}>03 / ARTIFICIAL INTELLIGENCE · AGENTIC WORKFLOWS</span>
                  </div>
                  <h3>Nexus AI</h3>
                  <p className={styles.projectLead}>
                    Autonomous agent architectures that execute multi-step operations without human bottlenecks.
                  </p>
                  <p className={styles.projectCopy}>
                    Built for teams operating high-frequency workflows. Nexus connects large language models directly with tool execution, private enterprise databases, and real-time streaming interfaces.
                  </p>
                  <div className={styles.projectFeatureList}>
                    <span>Multi-agent planning</span>
                    <span>Tool invocation mesh</span>
                    <span>Vector memory persistence</span>
                    <span>Enterprise security guardrails</span>
                    <span>Streaming WebSocket UI</span>
                  </div>
                  <div className={styles.projectActionRow}>
                    <a href="#contact" className={styles.projectCtaBtn}>
                      Request an AI audit <ArrowIcon diagonal />
                    </a>
                    <span className={styles.projectMetaTag}>Enterprise AI Suite</span>
                  </div>
                </div>
              </article>
            </TiltCard>

            <div className={styles.workClosing} data-reveal>
              <p>The next project doesn’t have to look like either of these.</p>
              <a href="#contact" className={styles.closingCtaBtn}>
                Tell us what you have in mind <ArrowIcon />
              </a>
            </div>
          </div>
        </section>

        <section className={styles.approachSection} id="approach">
          <div className={styles.container}>
            <SectionIntro label="A PRACTICAL PROCESS" title={<>Make the important decisions <span className={styles.editorialSerif}>before they become expensive.</span></>} copy="A good process should make the work clearer, not heavier. Here’s how we move from an open question to a finished delivery." />
            <div className={styles.processTimeline}>
              <div className={styles.processTrack} aria-hidden="true"><span className={styles.processTrackFill} /></div>
              {steps.map((step, index) => (
                <article className={styles.processStep} key={step.number} data-process-step data-active={index === 0 ? 'true' : 'false'} data-reveal>
                  <div className={styles.processMarker}><span>{step.number}</span><i /></div>
                  <div className={styles.processCopy}><span className={styles.processCaption}>{step.caption}</span><h3>{step.title}</h3><p>{step.copy}</p></div>
                  <span className={styles.processArrow} aria-hidden="true">↗</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.studioSection} id="studio">
          <div className={styles.container}>
            <TiltCard maxTilt={2.5} scale={1.005} className={styles.studioTiltWrapper}>
              <div className={styles.studioPanel}>
                <div className={styles.studioTopGrid}>
                  {/* Left Column: Brand Story & Ethos */}
                  <div className={styles.studioCopy} data-reveal>
                    <Eyebrow light>ABOUT THE STUDIO · HYDERABAD &amp; REMOTE</Eyebrow>
                    <h2>
                      Good work happens when the people making it{' '}
                      <span className={styles.editorialSerif}>stay close to the problem.</span>
                    </h2>
                    <p className={styles.studioLead}>
                      Majin Studios is an independent digital product studio based in Hyderabad, India. We bring product architecture, engineering, and creative execution into the same room—eliminating disconnected hand-offs and keeping communication direct from day one.
                    </p>

                    <div className={styles.studioPills}>
                      <span className={styles.studioPill}><i /> Product Architecture</span>
                      <span className={styles.studioPill}><i /> Full-Stack Engineering</span>
                      <span className={styles.studioPill}><i /> Brand &amp; Design Systems</span>
                      <span className={styles.studioPill}><i /> AI &amp; Cloud Workflows</span>
                    </div>

                    <div className={styles.studioDirectCommitment}>
                      <span className={styles.commitmentDot} />
                      <div>
                        <strong>Direct Founder Collaboration</strong>
                        <p>Senior engineers &amp; designers on every sprint. Zero junior account managers.</p>
                      </div>
                    </div>

                    <div className={styles.studioActions}>
                      <a href="#contact" className={styles.studioPrimaryCta}>
                        Start a conversation <ArrowIcon diagonal />
                      </a>
                      <div className={styles.studioStatusBadge}>
                        <span className={styles.studioStatusDot} />
                        <span>Q4/Q1 INTAKE OPEN</span>
                      </div>
                    </div>

                    <div className={styles.studioSignature}>
                      <BrandMark inverse />
                      <span>
                        <b>MAJIN STUDIOS</b>
                        <small>INDEPENDENT BY DESIGN · HYDERABAD, IN</small>
                      </span>
                    </div>
                  </div>

                  {/* Right Column: 3 Interactive Bento Glass Principle Cards */}
                  <div className={styles.studioPrinciples}>
                    {/* Card 01 */}
                    <article
                      className={styles.principleCard}
                      data-reveal
                      data-scroll-skew
                      onPointerMove={(e) => {
                        const bounds = e.currentTarget.getBoundingClientRect();
                        e.currentTarget.style.setProperty('--spot-x', `${e.clientX - bounds.left}px`);
                        e.currentTarget.style.setProperty('--spot-y', `${e.clientY - bounds.top}px`);
                      }}
                    >
                      <div className={styles.principleCardHeader}>
                        <div className={styles.principleTag}>
                          <span className={styles.principleIndex}>01</span>
                          <span className={styles.principleCategory}>PROBLEM DISCOVERY</span>
                        </div>
                        <div className={styles.principleIconWrap}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
                          </svg>
                        </div>
                      </div>
                      <h3>Start with the actual problem</h3>
                      <p>
                        We diagnose the operational bottleneck before choosing what to build, design, or promote. Uncovering the root constraint prevents weeks of wasted engineering and decorative complexity.
                      </p>
                      <div className={styles.principleFooter}>
                        <span>ROOT-CAUSE ANALYSIS</span>
                        <span>·</span>
                        <span>0 WASTED SPRINTS</span>
                        <i className={styles.principleArrow}>↗</i>
                      </div>
                    </article>

                    {/* Card 02 */}
                    <article
                      className={styles.principleCard}
                      data-reveal
                      data-scroll-skew
                      onPointerMove={(e) => {
                        const bounds = e.currentTarget.getBoundingClientRect();
                        e.currentTarget.style.setProperty('--spot-x', `${e.clientX - bounds.left}px`);
                        e.currentTarget.style.setProperty('--spot-y', `${e.clientY - bounds.top}px`);
                      }}
                    >
                      <div className={styles.principleCardHeader}>
                        <div className={styles.principleTag}>
                          <span className={styles.principleIndex}>02</span>
                          <span className={styles.principleCategory}>HIGH-CRAFT SYSTEMS</span>
                        </div>
                        <div className={styles.principleIconWrap}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                          </svg>
                        </div>
                      </div>
                      <h3>Make the details work</h3>
                      <p>
                        Fluid 60fps interfaces, resilient database schemas, tactile feedback, and robust edge deployments. We obsess over the micro-interactions that make digital products feel exceptionally responsive.
                      </p>
                      <div className={styles.principleFooter}>
                        <span>SUB-100MS LATENCY</span>
                        <span>·</span>
                        <span>PRODUCTION-GRADE UX</span>
                        <i className={styles.principleArrow}>↗</i>
                      </div>
                    </article>

                    {/* Card 03 */}
                    <article
                      className={styles.principleCard}
                      data-reveal
                      data-scroll-skew
                      onPointerMove={(e) => {
                        const bounds = e.currentTarget.getBoundingClientRect();
                        e.currentTarget.style.setProperty('--spot-x', `${e.clientX - bounds.left}px`);
                        e.currentTarget.style.setProperty('--spot-y', `${e.clientY - bounds.top}px`);
                      }}
                    >
                      <div className={styles.principleCardHeader}>
                        <div className={styles.principleTag}>
                          <span className={styles.principleIndex}>03</span>
                          <span className={styles.principleCategory}>END-TO-END CONTINUITY</span>
                        </div>
                        <div className={styles.principleIconWrap}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
                          </svg>
                        </div>
                      </div>
                      <h3>Keep the whole picture in view</h3>
                      <p>
                        Brand identity, frontend mechanics, API architecture, and conversion loops reinforce each other into a cohesive flywheel. No fragmented vendor silos or hand-off misunderstandings.
                      </p>
                      <div className={styles.principleFooter}>
                        <span>ZERO HAND-OFF LOSS</span>
                        <span>·</span>
                        <span>MEASURABLE GROWTH</span>
                        <i className={styles.principleArrow}>↗</i>
                      </div>
                    </article>
                  </div>
                </div>

                {/* Bottom Studio Metrics Ribbon */}
                <div className={styles.studioMetricsRibbon} data-reveal>
                  <div className={styles.metricItem}>
                    <span className={styles.metricValue}>100%</span>
                    <span className={styles.metricLabel}>DIRECT FOUNDER COLLABORATION</span>
                    <span className={styles.metricSub}>No account manager middlemen</span>
                  </div>
                  <div className={styles.metricItem}>
                    <span className={styles.metricValue}>&lt; 48H</span>
                    <span className={styles.metricLabel}>RAPID PROTOTYPE VELOCITY</span>
                    <span className={styles.metricSub}>From concept to interactive click-through</span>
                  </div>
                  <div className={styles.metricItem}>
                    <span className={styles.metricValue}>14+</span>
                    <span className={styles.metricLabel}>DEPLOYED PRODUCTION SYSTEMS</span>
                    <span className={styles.metricSub}>Real SaaS, event &amp; enterprise platforms</span>
                  </div>
                  <div className={styles.metricItem}>
                    <span className={styles.metricValue}>GLOBAL</span>
                    <span className={styles.metricLabel}>HYDERABAD HQ · WORLDWIDE TEAMS</span>
                    <span className={styles.metricSub}>Async agility + real-time coordination</span>
                  </div>
                </div>

                <div className={styles.studioTexture} aria-hidden="true"><span /><span /><span /></div>
              </div>
            </TiltCard>
          </div>
        </section>

        <section className={styles.faqSection} id="faq">
          <div className={styles.container}>
            <div className={styles.faqLayout}>
              <div className={styles.faqIntro} data-reveal><Eyebrow>GOOD QUESTIONS</Eyebrow><h2>A few things worth <span className={styles.editorialSerif}>knowing.</span></h2><p>Every project starts somewhere. Here are some of the questions we usually work through at the beginning.</p><a href="#contact" className={styles.textLink}>Ask us directly <ArrowIcon /></a></div>
              <div className={styles.faqList} data-reveal>
                <details><summary>Can you help if we only have an idea? <span>+</span></summary><p>Yes. We can help clarify the problem, decide what is worth building first, and turn the idea into a practical scope and next steps.</p></details>
                <details><summary>Can you handle the website and the marketing? <span>+</span></summary><p>Yes. We work across digital products, creative design, and digital marketing, so the experience and the way it reaches people can be considered together.</p></details>
                <details><summary>Do you work with small businesses and startups? <span>+</span></summary><p>Yes. Our small-studio model is built around direct collaboration and solutions shaped around the needs and constraints of the team we’re working with.</p></details>
                <details><summary>How much does a project cost? <span>+</span></summary><p>It depends on the work involved, complexity, and timeline. Share what you have in mind and we can discuss scope and options before proposing a plan.</p></details>
                <details><summary>Can we start with one service and expand later? <span>+</span></summary><p>Absolutely. We can start with the most useful piece, keep the wider goal in mind, and plan the next phase when there’s a clear reason to do it.</p></details>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.contactSection} id="contact">
          <div className={styles.container}>
            <div className={styles.contactLayout}>
              <div className={styles.contactIntro} data-reveal>
                <Eyebrow>START A CONVERSATION</Eyebrow>
                <h2>What are you trying to <span className={styles.editorialSerif}>make possible?</span></h2>
                <p>A rough idea is enough to start. Tell us what you want to build, improve, or grow; we’ll take it from there.</p>
                <div className={styles.contactDirect}><span>Prefer email?</span><a href="mailto:hello@majin.studio">hello@majin.studio <ArrowIcon diagonal /></a></div>
                <div className={styles.contactLocation}><span className={styles.locationDot} />Based in Hyderabad, India <i /> Working with teams remotely</div>
                <div className={styles.contactAside}><span>01 — 04</span><p>Tell us the goal.<br />We’ll help map the way forward.</p></div>
              </div>
              <div className={styles.contactFormCard} data-reveal>
                {formStatus === 'success' ? <div className={styles.formSuccess}><span className={styles.successIcon}>✓</span><h3>Thanks for reaching out.</h3><p>Your message has been sent. We’ll get back to you as soon as we can.</p><button type="button" className={styles.resetButton} onClick={() => setFormStatus('idle')}>Send another message <ArrowIcon /></button></div> : <>
                  <div className={styles.formHeading}><div><span className={styles.formEyebrow}>PROJECT ENQUIRY</span><strong>Let’s get the conversation started.</strong></div><span className={styles.formClock}>~ 2 MIN</span></div>
                  <form ref={formRef} onSubmit={handleSubmit} className={styles.contactForm}>
                    <div className={styles.formGrid}><label>Your name<input name="name" type="text" placeholder="Name" autoComplete="name" required /></label><label>Email address<input name="email" type="email" placeholder="you@company.com" autoComplete="email" required /></label></div>
                    <label>Business or project name <span className={styles.optional}>(optional)</span><input name="company" type="text" placeholder="Company or project" autoComplete="organization" /></label>
                    <label>What can we help with?<select name="service" defaultValue=""><option value="" disabled>Choose an area (optional)</option><option>Website or digital product</option><option>Custom software, AI or automation</option><option>Branding and creative design</option><option>Digital marketing and ads</option><option>A mix of services / not sure yet</option></select></label>
                    <label>Tell us a little about it<textarea name="query" placeholder="What are you hoping to build, improve, or grow?" rows={4} required /></label>
                    {formStatus === 'error' && <p className={styles.formError} role="alert">We couldn’t send this just now. Please email <a href="mailto:hello@majin.studio">hello@majin.studio</a> and we’ll take it from there.</p>}
                    <button className={styles.submitButton} type="submit" disabled={formStatus === 'sending'}>{formStatus === 'sending' ? 'Sending your message…' : 'Send project enquiry'} <ArrowIcon /></button>
                    <p className={styles.formPrivacy}>Your details are only used to reply to your enquiry.</p>
                  </form>
                </>}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerTop}>
            <a href="#top" className={styles.footerBrand}><BrandMark inverse /><span><b>majin<span>studios</span></b><small>BUILD WITH INTENT.</small></span></a>
            <p>Digital products, thoughtful design, and practical growth—connected from the start.</p>
            <a className={styles.footerCta} href="#contact">Have a project in mind? <span>Let’s talk <ArrowIcon diagonal /></span></a>
          </div>
          <div className={styles.footerLinks}>
            <div><span>EXPLORE</span><a href="#services">Services</a><a href="#work">Selected work</a><a href="#approach">Approach</a><a href="#studio">Studio</a></div>
            <div><span>PRODUCTS</span><a href="/scanfeast/">Scanfeast <ArrowIcon diagonal /></a><a href="/quantumarena/">Quantum Arena <ArrowIcon diagonal /></a></div>
            <div><span>CONNECT</span><a href="mailto:hello@majin.studio">hello@majin.studio <ArrowIcon diagonal /></a><a href="https://www.linkedin.com/company/majin-studios" target="_blank" rel="noreferrer">LinkedIn <ArrowIcon diagonal /></a><a href="https://www.instagram.com/majin_studios/" target="_blank" rel="noreferrer">Instagram <ArrowIcon diagonal /></a></div>
          </div>
          <div className={styles.footerBottom}><span>© {new Date().getFullYear()} Majin Studios. All rights reserved.</span><span>HYDERABAD, INDIA · WORKING REMOTELY</span><a href="#top">Back to top ↑</a></div>
        </div>
      </footer>
    </div>
  );
}
