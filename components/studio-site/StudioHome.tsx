'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
  return <div className={`${styles.eyebrow} ${light ? styles.eyebrowLight : ''}`}><span aria-hidden="true" />{children}</div>;
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
        <h2>{title}{accent && <> <span>{accent}</span></>}</h2>
        {copy && <p>{copy}</p>}
      </div>
    </div>
  );
}

function HeroSystem() {
  return (
    <div className={styles.heroArt} data-hero-visual aria-label="An illustration of strategy, design, engineering and growth connected into one system">
      <div className={styles.heroArtAura} aria-hidden="true" />
      <div className={styles.heroBoard} data-hero-depth>
        <div className={styles.boardTop}>
          <div className={styles.boardIdentity}><span className={styles.boardLogo}><BrandMark inverse /></span><span><b>MAJIN / STUDIO SYSTEM</b><small>FROM FIRST THOUGHT TO LIVE PRODUCT</small></span></div>
          <span className={styles.boardStatus}><i /> IN MOTION</span>
        </div>
        <div className={styles.boardCanvas}>
          <svg className={styles.boardConnections} viewBox="0 0 620 380" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="flowLine" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#c8f36b" stopOpacity=".15" /><stop offset=".48" stopColor="#c8f36b" /><stop offset="1" stopColor="#9ae3b4" stopOpacity=".4" /></linearGradient>
              <filter id="softGlow"><feGaussianBlur stdDeviation="3.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <path className={styles.connectionBase} d="M310 188 C235 188 232 91 140 91 S55 154 85 218 S194 306 306 264 S458 322 515 255 S476 100 405 108 S361 188 310 188" />
            <path data-draw-line className={styles.connectionTrace} pathLength="1" d="M310 188 C235 188 232 91 140 91 S55 154 85 218 S194 306 306 264 S458 322 515 255 S476 100 405 108 S361 188 310 188" />
            <path data-draw-line pathLength="1" className={styles.connectionBranch} d="M140 91 C142 150 201 188 310 188 S444 186 515 255" />
            <circle className={styles.signalDot} cx="140" cy="91" r="4" filter="url(#softGlow)" />
            <circle className={styles.signalDot} cx="515" cy="255" r="4" filter="url(#softGlow)" />
          </svg>
          <div className={`${styles.orbitNode} ${styles.orbitStrategy}`} data-float="1"><span className={styles.nodeNumber}>01</span><span className={styles.nodeCopy}><b>Understand</b><small>Strategy & direction</small></span><span className={styles.nodeStatus}>↗</span></div>
          <div className={`${styles.orbitNode} ${styles.orbitDesign}`} data-float="2"><span className={styles.nodeNumber}>02</span><span className={styles.nodeCopy}><b>Shape</b><small>Brand & experience</small></span><span className={styles.nodeStatus}>↗</span></div>
          <div className={`${styles.orbitNode} ${styles.orbitBuild}`} data-float="3"><span className={styles.nodeNumber}>03</span><span className={styles.nodeCopy}><b>Build</b><small>Product & systems</small></span><span className={styles.nodeStatus}>↗</span></div>
          <div className={`${styles.orbitNode} ${styles.orbitGrow}`} data-float="4"><span className={styles.nodeNumber}>04</span><span className={styles.nodeCopy}><b>Move forward</b><small>Launch & growth</small></span><span className={styles.nodeStatus}>↗</span></div>
          <div className={styles.systemCore} data-float="core"><span className={styles.coreRing} aria-hidden="true" /><span className={styles.coreMark}><BrandMark inverse /></span><small>THE IDEA</small><strong>Made useful.</strong></div>
          <div className={styles.boardAnnotation}><span>CONNECTED BY DESIGN</span><span>MS—01 / 04</span></div>
        </div>
        <div className={styles.boardBottom}><span>PRODUCT <i>×</i> CREATIVE <i>×</i> ENGINEERING <i>×</i> GROWTH</span><span className={styles.boardBottomMark}>↗</span></div>
      </div>
      <div className={`${styles.floatNote} ${styles.floatNoteTop}`} data-float="5"><span className={styles.floatNoteIcon}>✳</span><span><b>One connected team</b><small>Fewer hand-offs. Clearer decisions.</small></span></div>
      <div className={`${styles.floatNote} ${styles.floatNoteBottom}`} data-float="6"><span className={styles.floatNotePulse} /><span><b>Made for the real world</b><small>Useful before impressive.</small></span></div>
      <div className={styles.artIndex} aria-hidden="true"><span>01</span><i /> <span>04</span></div>
    </div>
  );
}

function ProjectFrame({ src, alt, kind }: { src: string; alt: string; kind: 'scanfeast' | 'quantum' }) {
  return (
    <div className={`${styles.projectFrame} ${kind === 'quantum' ? styles.projectFrameQuantum : ''}`} data-project-frame>
      <div className={styles.projectWindowTop}><div className={styles.windowDots}><i /><i /><i /></div><span>{kind === 'scanfeast' ? 'SCANFEAST / OPERATIONS' : 'QUANTUM ARENA / EVENT PLATFORM'}</span><span className={styles.windowArrow}>↗</span></div>
      <div className={styles.projectImageViewport} data-image-viewport>
        <Image src={src} alt={alt} fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 48vw, 620px" className={styles.projectImage} data-parallax-image priority={false} />
      </div>
      <div className={styles.projectFrameMeta}><span>{kind === 'scanfeast' ? 'PRODUCT INTERFACE' : 'DIGITAL EXPERIENCE'}</span><span>MAJIN STUDIOS / SELECTED WORK</span></div>
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
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      root.setAttribute('data-motion', 'reduced');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const reveals = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
      gsap.set(reveals, { autoAlpha: 0, y: 28 });
      reveals.forEach((element) => {
        gsap.to(element, {
          autoAlpha: 1, y: 0, duration: 0.82, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });

      const heroCopy = root.querySelector<HTMLElement>('[data-hero-copy]');
      if (heroCopy) {
        gsap.fromTo(heroCopy, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.92, ease: 'power3.out', delay: 0.08 });
      }
      const heroVisual = root.querySelector<HTMLElement>('[data-hero-visual]');
      if (heroVisual) {
        gsap.fromTo(heroVisual, { autoAlpha: 0, y: 32, rotate: 1.2, scale: 0.975 }, { autoAlpha: 1, y: 0, rotate: 0, scale: 1, duration: 1.12, ease: 'expo.out', delay: 0.18 });
        const heroDepth = heroVisual.querySelector<HTMLElement>('[data-hero-depth]');
        const heroSection = root.querySelector<HTMLElement>('[data-hero-section]');
        if (heroDepth && heroSection) {
          gsap.to(heroDepth, {
            y: 40, rotate: -1, scale: 0.98, ease: 'none',
            scrollTrigger: { trigger: heroSection, start: 'top top', end: 'bottom top', scrub: 0.7 },
          });
        }
        if (heroSection) {
          gsap.to(heroVisual.querySelectorAll('[data-float]'), {
            y: (index) => (index % 2 === 0 ? -10 : 10), ease: 'none', stagger: 0.02,
            scrollTrigger: { trigger: heroSection, start: 'top top', end: 'bottom top', scrub: 1 },
          });
        }
      }

      const traces = Array.from(root.querySelectorAll<SVGPathElement>('[data-draw-line]'));
      gsap.set(traces, { strokeDasharray: 1, strokeDashoffset: 1 });
      traces.forEach((trace, index) => {
        gsap.to(trace, {
          strokeDashoffset: 0, duration: 1.45, ease: 'power2.inOut', delay: 0.55 + index * 0.16,
          scrollTrigger: { trigger: heroVisual, start: 'top 70%', once: true },
        });
      });

      const imageLayers = Array.from(root.querySelectorAll<HTMLElement>('[data-parallax-image]'));
      imageLayers.forEach((image) => {
        gsap.fromTo(image, { scale: 1.11, yPercent: -2 }, {
          scale: 1.015, yPercent: 2, ease: 'none',
          scrollTrigger: { trigger: image, start: 'top bottom', end: 'bottom top', scrub: 0.65 },
        });
      });

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

      const serviceCards = Array.from(root.querySelectorAll<HTMLElement>('[data-service-card]'));
      serviceCards.forEach((card, index) => {
        gsap.fromTo(card, { y: 30, rotate: index % 2 ? 0.6 : -0.6 }, {
          y: 0, rotate: 0, duration: 0.76, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 90%', once: true },
        });
      });
    }, root);

    return () => {
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
      <a className={styles.skipLink} href="#main">Skip to content</a>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#top" className={styles.brand} onClick={closeMenu} aria-label="Majin Studios home">
            <BrandMark /><span className={styles.brandText}>majin<span>studios</span></span>
          </a>
          <nav id="main-navigation" className={`${styles.navigation} ${menuOpen ? styles.navigationOpen : ''}`} aria-label="Main navigation">
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#work" onClick={closeMenu}>Selected work</a>
            <a href="#approach" onClick={closeMenu}>Approach</a>
            <a href="#studio" onClick={closeMenu}>Studio</a>
            <a className={styles.mobileNavCta} href="#contact" onClick={closeMenu}>Start a project <ArrowIcon /></a>
          </nav>
          <a className={styles.headerCta} href="#contact">Let’s talk <ArrowIcon diagonal /></a>
          <button className={`${styles.menuToggle} ${menuOpen ? styles.menuToggleOpen : ''}`} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((open) => !open)}>
            <span /><span />
          </button>
        </div>
      </header>

      <main id="main">
        <section id="top" className={styles.hero} data-hero-section>
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={`${styles.container} ${styles.heroLayout}`}>
            <div className={styles.heroCopy} data-hero-copy>
              <Eyebrow>INDEPENDENT DIGITAL STUDIO · HYDERABAD, INDIA</Eyebrow>
              <h1>Make your next move <span>matter.</span></h1>
              <p className={styles.heroLead}>We turn business ideas into thoughtful digital products, useful systems, and creative work that move things forward.</p>
              <p className={styles.heroSupport}>From the first question to launch day, strategy, design, engineering, and growth work better when they’re connected.</p>
              <div className={styles.heroActions}>
                <ButtonLink href="#contact">Tell us what you’re building</ButtonLink>
                <a href="#work" className={styles.heroTextLink}>Explore selected work <span><ArrowIcon /></span></a>
              </div>
              <div className={styles.heroProof}><span className={styles.proofMark}><i /></span><span>Small team. Direct collaboration. Work made for the real world.</span></div>
            </div>
            <HeroSystem />
            <div className={styles.heroBottom}><span>PRODUCTS · SYSTEMS · CREATIVE · GROWTH</span><a href="#services" className={styles.scrollCue}>A closer look <span>↓</span></a></div>
          </div>
        </section>

        <div className={styles.serviceTicker} aria-label="Majin Studios capabilities">
          <div className={styles.tickerTrack} aria-hidden="true">
            {[0, 1].map((copy) => <div className={styles.tickerGroup} key={copy}><span>Digital products</span><i>✳</i><span>Custom software</span><i>✳</i><span>AI & automation</span><i>✳</i><span>Brand & creative</span><i>✳</i><span>Digital marketing</span><i>✳</i></div>)}
          </div>
        </div>

        <section className={styles.servicesSection} id="services">
          <div className={styles.container}>
            <SectionIntro label="WHAT WE DO" title={<>Good ideas need the <span>right things around them.</span></>} copy="A website is only one part of the picture. We bring the product, the systems behind it, the way it looks, and the way it reaches people into the same conversation." />
            <div className={styles.servicesGrid}>
              {services.map((service) => (
                <article key={service.index} className={`${styles.serviceCard} ${service.tint === 'green' ? styles.serviceCardGreen : ''} ${service.tint === 'lime' ? styles.serviceCardLime : ''}`} data-service-card data-reveal
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
              ))}
            </div>
            <div className={styles.servicesNote} data-reveal><span className={styles.noteSpark}>✳</span><p><strong>Not sure what you need yet?</strong> That’s a good place to start. Tell us what you want to improve and we’ll work out the right first step together.</p><a href="#contact" className={styles.textLink}>Start with a conversation <ArrowIcon /></a></div>
          </div>
        </section>

        <section className={styles.flowSection} data-flow-section>
          <div className={styles.container}>
            <div className={styles.flowHeader} data-reveal>
              <Eyebrow light>HOW THE PARTS CONNECT</Eyebrow>
              <h2>One clear direction.<br /><span>Four connected disciplines.</span></h2>
              <p>The value isn’t in doing everything at once. It’s in knowing what each part needs to do—and making sure the hand-offs make sense.</p>
            </div>
            <div className={styles.flowBoard}>
              <div className={styles.flowTrack} aria-hidden="true"><span data-flow-fill /></div>
              <div className={styles.flowSteps}>
                <article data-reveal><span className={styles.flowNumber}>01</span><span className={styles.flowGlyph}><i className={styles.glyphAim} /></span><h3>Find the signal</h3><p>Get clear on the real problem, audience, and desired outcome.</p><span className={styles.flowMeta}>STRATEGY</span></article>
                <article data-reveal><span className={styles.flowNumber}>02</span><span className={styles.flowGlyph}><i className={styles.glyphShape} /></span><h3>Shape the experience</h3><p>Make the idea understandable, usable, and recognisable.</p><span className={styles.flowMeta}>DESIGN</span></article>
                <article data-reveal><span className={styles.flowNumber}>03</span><span className={styles.flowGlyph}><i className={styles.glyphBuild} /></span><h3>Make it work</h3><p>Turn the plan into a reliable product or operating system.</p><span className={styles.flowMeta}>ENGINEERING</span></article>
                <article data-reveal><span className={styles.flowNumber}>04</span><span className={styles.flowGlyph}><i className={styles.glyphGrow} /></span><h3>Help it move</h3><p>Prepare the launch and connect the work to the right audience.</p><span className={styles.flowMeta}>GROWTH</span></article>
              </div>
              <div className={styles.flowFooter}><span>NO DECORATIVE COMPLEXITY. NO DISCONNECTED HAND-OFFS.</span><span>THE MAJIN APPROACH <b>↗</b></span></div>
            </div>
          </div>
        </section>

        <section className={styles.workSection} id="work">
          <div className={styles.container}>
            <SectionIntro label="SELECTED WORK" title={<>Built around a real <span>job to be done.</span></>} copy="A look at two products from our studio. Each solves a different kind of operational problem, with the same care for how people move through the experience." />
            <article className={`${styles.projectCard} ${styles.projectCardScanfeast}`} data-reveal>
              <div className={styles.projectVisualScanfeast}>
                <div className={styles.projectVisualLabel}><span>01 / PRODUCT ENGINEERING</span><span>HOSPITALITY TECH</span></div>
                <ProjectFrame src="/scanfeast/images/Screenshot%202026-08-27%20001503.png" alt="Scanfeast restaurant manager dashboard interface" kind="scanfeast" />
                <div className={styles.phoneMockup}><div className={styles.phoneSpeaker} /><Image src="/scanfeast/images/diner.png" alt="Scanfeast diner mobile ordering interface" width={485} height={805} sizes="180px" /></div>
                <span className={styles.projectVisualIndex}>SF—01</span>
              </div>
              <div className={styles.projectInfo}>
                <div className={styles.projectPill}><span /> PRODUCT / SAAS</div>
                <h3>Scanfeast</h3>
                <p className={styles.projectLead}>Restaurant ordering that keeps the front of house and the kitchen in sync.</p>
                <p className={styles.projectCopy}>Scanfeast connects QR-based menu access and ordering with kitchen order handling and a manager view—so the diner, kitchen, and operator aren’t working from disconnected screens.</p>
                <div className={styles.projectFeatureList}><span>QR-based ordering</span><span>Kitchen display system</span><span>Manager dashboard</span><span>Live order flow</span></div>
                <a href="/scanfeast/" className={styles.projectLink}>Explore the case study <ArrowIcon diagonal /></a>
                <span className={styles.projectIndexLarge}>01</span>
              </div>
            </article>

            <article className={`${styles.projectCard} ${styles.projectCardQuantum}`} data-reveal>
              <div className={styles.projectInfo}>
                <div className={styles.projectPill}><span /> DIGITAL PLATFORM / EVENTS</div>
                <h3>Quantum Arena</h3>
                <p className={styles.projectLead}>Event operations with fewer loose ends.</p>
                <p className={styles.projectCopy}>An event platform concept bringing participant registration, QR check-in, competition information, and judging workflows together—so organisers and participants can follow the same process.</p>
                <div className={styles.projectFeatureList}><span>Participant workflows</span><span>QR check-in</span><span>Event information</span><span>Judging and results</span></div>
                <a href="/quantumarena/" className={styles.projectLink}>Explore the experience <ArrowIcon diagonal /></a>
                <span className={styles.projectIndexLarge}>02</span>
              </div>
              <div className={styles.projectVisualQuantum}>
                <div className={styles.projectVisualLabel}><span>02 / DIGITAL EXPERIENCE</span><span>EVENT OPERATIONS</span></div>
                <ProjectFrame src="/quantumarena/images/Screenshot%202026-08-25%20204631.png" alt="Quantum Arena website interface showing the event platform" kind="quantum" />
                <div className={styles.quantumAccentCard}><span className={styles.quantumAccentIcon}>Q</span><span><b>Quantum Arena</b><small>REGISTER · VERIFY · COMPETE</small></span><ArrowIcon diagonal /></div>
                <span className={styles.projectVisualIndex}>QA—02</span>
              </div>
            </article>
            <div className={styles.workClosing} data-reveal><p>The next project doesn’t have to look like either of these.</p><ButtonLink href="#contact" secondary>Tell us what you have in mind</ButtonLink></div>
          </div>
        </section>

        <section className={styles.approachSection} id="approach">
          <div className={styles.container}>
            <SectionIntro label="A PRACTICAL PROCESS" title={<>Make the important decisions <span>before they become expensive.</span></>} copy="A good process should make the work clearer, not heavier. Here’s how we move from an open question to a finished delivery." />
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
            <div className={styles.studioPanel}>
              <div className={styles.studioCopy} data-reveal>
                <Eyebrow light>ABOUT THE STUDIO</Eyebrow>
                <h2>Good work happens when the people making it <span>stay close to the problem.</span></h2>
                <p>Majin Studios is an independent digital studio based in Hyderabad, India. We bring product thinking, engineering, and creative execution together—and keep collaboration direct from the first conversation.</p>
                <a href="#contact" className={styles.studioLink}>Meet us at the start <ArrowIcon /></a>
                <div className={styles.studioSignature}><BrandMark inverse /><span><b>MAJIN STUDIOS</b><small>INDEPENDENT BY DESIGN</small></span></div>
              </div>
              <div className={styles.studioPrinciples}>
                <article data-reveal><span>01</span><div><h3>Start with the actual problem</h3><p>We ask why before choosing what to build, design, or promote.</p></div><i>↗</i></article>
                <article data-reveal><span>02</span><div><h3>Make the details work</h3><p>Clear interfaces, dependable systems, and a finish that feels considered.</p></div><i>↗</i></article>
                <article data-reveal><span>03</span><div><h3>Keep the whole picture in view</h3><p>Brand, product, operations, and marketing should reinforce one another.</p></div><i>↗</i></article>
                <div className={styles.studioPrincipleFooter}><span className={styles.principlePulse} />THOUGHTFUL IN THE DETAILS. PRACTICAL IN THE DELIVERY.</div>
              </div>
              <div className={styles.studioTexture} aria-hidden="true"><span /><span /><span /></div>
            </div>
          </div>
        </section>

        <section className={styles.faqSection} id="faq">
          <div className={styles.container}>
            <div className={styles.faqLayout}>
              <div className={styles.faqIntro} data-reveal><Eyebrow>GOOD QUESTIONS</Eyebrow><h2>A few things worth <span>knowing.</span></h2><p>Every project starts somewhere. Here are some of the questions we usually work through at the beginning.</p><a href="#contact" className={styles.textLink}>Ask us directly <ArrowIcon /></a></div>
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
                <h2>What are you trying to <span>make possible?</span></h2>
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
