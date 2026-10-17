'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './StudioSequence.module.css';
import { TechnicalLabel } from '../ui';
import { useGlobalState } from '../../store/useGlobalState';

const SCENE_STAGE_MAP = ['products', 'data', 'ai', 'cloud'] as const;

type Stage = {
  number: string;
  verb: string;
  noun: string;
  category: string;
  intro: string;
  detail: string;
  capabilities: string[];
};

const stages: Stage[] = [
  {
    number: '01', verb: 'BUILD', noun: 'the thing.', category: 'ENGINEERING / PRODUCT',
    intro: 'Useful software, designed around the way your business actually works.',
    detail: 'From high-converting websites and mobile experiences to bespoke platforms, dashboards and API-connected systems, we turn requirements into products people can rely on.',
    capabilities: ['Websites & web apps', 'Mobile-ready products', 'Custom business software', 'APIs & integrations'],
  },
  {
    number: '02', verb: 'CREATE', noun: 'the feeling.', category: 'IDENTITY / CREATIVE',
    intro: 'Make every interaction feel like it belongs to your brand.',
    detail: 'We shape the visual system around the product: positioning, identity, UX/UI, campaign concepts and social assets that look considered together—not assembled from templates.',
    capabilities: ['Brand identity', 'Product UI / UX', 'Campaign creative', 'Social & motion design'],
  },
  {
    number: '03', verb: 'AUTOMATE', noun: 'the repeatable.', category: 'AI / INTELLIGENT WORKFLOWS',
    intro: 'Give repetitive work a better system—and your team more room to think.',
    detail: 'We connect AI models, agents, retrieval, business rules and existing tools to take real work off people’s plates, with clear boundaries and useful human oversight.',
    capabilities: ['AI assistants & agents', 'Workflow automation', 'RAG & knowledge search', 'System integrations'],
  },
  {
    number: '04', verb: 'GROW', noun: 'with intent.', category: 'DIGITAL GROWTH / MARKETING',
    intro: 'Bring the right people to the work you’ve built.',
    detail: 'From campaign creative and paid advertising to social content, SEO foundations and landing pages, we help connect a clear message with a measurable next step.',
    capabilities: ['Paid ad campaigns', 'Content & social media', 'SEO foundations', 'Landing pages & reporting'],
  },
];

function StageArtwork({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className={`${styles.artwork} ${styles.artworkBuild}`} aria-hidden="true">
        <div className={styles.artTopbar}><span /><span /><span /><i>MAJIN / STUDIO BUILD</i><b>01</b></div>
        <div className={styles.buildGrid}>
          <div className={styles.buildSidebar}><b /><i /><i /><i /><i /><i /></div>
          <div className={styles.buildCanvas}>
            <span className={styles.canvasTag}>PRODUCT SYSTEM / 001</span>
            <strong>Ideas into<br /><em>interfaces.</em></strong>
            <div className={styles.canvasFooter}><span>01 — STRUCTURE</span><span className={styles.canvasAction}>VIEW SYSTEM ↗</span></div>
          </div>
        </div>
        <div className={styles.buildBeam} />
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className={`${styles.artwork} ${styles.artworkCreate}`} aria-hidden="true">
        <div className={styles.createHeader}><span>IDENTITY STUDY / 02</span><span>FORM FOLLOWS FEELING</span></div>
        <div className={styles.createComposition}>
          <div className={styles.createPoster}><span>MAKE IT<br />MEAN<br /><em>SOMETHING.</em></span><i>MAJIN CREATIVE / 026</i></div>
          <div className={styles.createShape}><div /><span /></div>
        </div>
        <div className={styles.createPalette}><i /><i /><i /><i /><span>ONE SYSTEM. MANY EXPRESSIONS.</span></div>
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className={`${styles.artwork} ${styles.artworkAutomate}`} aria-hidden="true">
        <div className={styles.autoHeader}><span>WORKFLOW / LIVE TRACE</span><span className={styles.live}>● SYSTEM READY</span></div>
        <div className={styles.autoGraph}>
          <div className={styles.autoNode}><small>INPUT</small><b>Request</b><i>01</i></div>
          <span className={styles.autoLink}><i /></span>
          <div className={`${styles.autoNode} ${styles.autoNodeActive}`}><small>REASON</small><b>AI agent</b><i>02</i></div>
          <span className={styles.autoLink}><i /></span>
          <div className={styles.autoNode}><small>OUTPUT</small><b>Action</b><i>03</i></div>
        </div>
        <div className={styles.autoLog}><span>EVENT LOG</span><b>Task classified</b><b>Context retrieved</b><b className={styles.logActive}>Next action prepared <i>●</i></b></div>
      </div>
    );
  }
  return (
    <div className={`${styles.artwork} ${styles.artworkGrow}`} aria-hidden="true">
      <div className={styles.growHeader}><span>CAMPAIGN / PERFORMANCE VIEW</span><span>LAST 30 DAYS ↗</span></div>
      <div className={styles.growMetrics}><div><small>REACH</small><b>01</b><i>Audience</i></div><div><small>ENGAGEMENT</small><b>02</b><i>Attention</i></div><div><small>CONVERSION</small><b>03</b><i>Action</i></div></div>
      <div className={styles.growChart}><div className={styles.chartLabels}><span>PERFORMANCE SIGNAL</span><span>GROWTH IS A SYSTEM</span></div><svg viewBox="0 0 600 190" preserveAspectRatio="none"><defs><linearGradient id="growthArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9dff00" stopOpacity=".28"/><stop offset="1" stopColor="#9dff00" stopOpacity="0"/></linearGradient></defs><path d="M0 160 C50 145 55 120 95 130 S150 120 190 105 S245 120 275 85 S340 105 370 55 S425 76 460 43 S540 48 600 10 L600 190 L0 190Z" fill="url(#growthArea)"/><path d="M0 160 C50 145 55 120 95 130 S150 120 190 105 S245 120 275 85 S340 105 370 55 S425 76 460 43 S540 48 600 10" fill="none" stroke="#9dff00" strokeWidth="2.5" vectorEffect="non-scaling-stroke"/></svg></div>
    </div>
  );
}

export function StudioSequence() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<Array<HTMLElement | null>>([]);
  const lastStageRef = useRef(0);
  const [activeStage, setActiveStage] = useState(0);
  const setCapabilitiesStage = useGlobalState((state) => state.setCapabilitiesStage);

  // The pinned chapter and the actual WebGL network move together.
  useEffect(() => {
    setCapabilitiesStage(SCENE_STAGE_MAP[activeStage] ?? 'ai');
  }, [activeStage, setCapabilitiesStage]);

  const goToStage = useCallback((index: number) => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(min-width: 901px) and (prefers-reduced-motion: no-preference)').matches) {
      const rootTop = root.getBoundingClientRect().top + window.scrollY;
      const stageOffset = (window.innerHeight * 3.1) * (index / (stages.length - 1));
      window.scrollTo({ top: rootTop + stageOffset, behavior: 'smooth' });
    } else {
      panelsRef.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setActiveStage(index);
    }
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    if (!root || !pin) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const panels = panelsRef.current.filter((panel): panel is HTMLElement => Boolean(panel));
      if (panels.length !== stages.length) return;
      const copies = panels.map((panel) => panel.querySelector<HTMLElement>('[data-stage-copy]')).filter((node): node is HTMLElement => node !== null);
      const visuals = panels.map((panel) => panel.querySelector<HTMLElement>('[data-stage-visual]')).filter((node): node is HTMLElement => node !== null);
      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        scrollTrigger: {
          trigger: root,
          pin,
          start: 'top top',
          end: '+=320%',
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(stages.length - 1, Math.floor(self.progress * stages.length));
            if (lastStageRef.current !== index) {
              lastStageRef.current = index;
              setActiveStage(index);
            }
          },
        },
      });
      gsap.set(panels, { autoAlpha: 0, y: 50, scale: 0.985 });
      gsap.set(copies, { autoAlpha: 0, x: 20 });
      gsap.set(visuals, { autoAlpha: 0, x: 40, rotateY: -7, scale: 0.96, transformPerspective: 1200 });
      tl.set(panels[0], { autoAlpha: 1, y: 0, scale: 1 }, 0);
      if (copies[0]) tl.set(copies[0], { autoAlpha: 1, x: 0 }, 0);
      if (visuals[0]) tl.set(visuals[0], { autoAlpha: 1, x: 0, rotateY: 0, scale: 1 }, 0);
      for (let i = 1; i < panels.length; i += 1) {
        const at = i;
        tl.to(panels[i - 1], { autoAlpha: 0, y: -42, scale: 0.99, duration: 0.42 }, at - 0.1);
        tl.to(panels[i], { autoAlpha: 1, y: 0, scale: 1, duration: 0.5 }, at);
        if (copies[i - 1]) tl.to(copies[i - 1], { autoAlpha: 0, x: -20, duration: 0.25 }, at - 0.1);
        if (copies[i]) tl.to(copies[i], { autoAlpha: 1, x: 0, duration: 0.45 }, at + 0.04);
        if (visuals[i - 1]) tl.to(visuals[i - 1], { autoAlpha: 0, x: -26, rotateY: 6, scale: 0.97, duration: 0.3 }, at - 0.12);
        if (visuals[i]) tl.to(visuals[i], { autoAlpha: 1, x: 0, rotateY: 0, scale: 1, duration: 0.55 }, at - 0.02);
      }
      tl.to(pin.querySelector(`.${styles.progressFill}`), { scaleX: 1, ease: 'none' }, 0);
      return () => { tl.scrollTrigger?.kill(); tl.kill(); };
    });

    media.add('(max-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const panels = panelsRef.current.filter((panel): panel is HTMLElement => Boolean(panel));
      gsap.set(panels, { clearProps: 'all' });
      const reveals = panels.map((panel) => gsap.fromTo(panel, { y: 24, autoAlpha: 0.35 }, {
        y: 0, autoAlpha: 1, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: panel, start: 'top 90%', toggleActions: 'play none none reverse' },
      }));
      return () => reveals.forEach((tween) => { tween.scrollTrigger?.kill(); tween.kill(); });
    });

    media.add('(max-width: 900px) and (prefers-reduced-motion: reduce), (min-width: 901px) and (prefers-reduced-motion: reduce)', () => {
      const panels = panelsRef.current.filter((panel): panel is HTMLElement => Boolean(panel));
      gsap.set(panels, { clearProps: 'all', autoAlpha: 1, y: 0, scale: 1 });
      gsap.set(pin.querySelectorAll('[data-stage-copy], [data-stage-visual]'), { clearProps: 'all', autoAlpha: 1, x: 0, rotateY: 0, scale: 1 });
      const fill = pin.querySelector<HTMLElement>(`.${styles.progressFill}`);
      if (fill) gsap.set(fill, { clearProps: 'all', scaleX: 1 });
    });

    return () => media.revert();
  }, []);

  return (
    <section id="studio-flow" ref={rootRef} className={styles.section} aria-label="The Majin studio approach">
      <div className={styles.pinFrame} ref={pinRef}>
        <div className={styles.topLine}>
          <TechnicalLabel variant="accent">THE STUDIO METHOD / 01—04</TechnicalLabel>
          <span className={styles.topLineNote}>SCROLL TO MOVE THROUGH THE SYSTEM <b>↓</b></span>
        </div>
        <div className={styles.introRow}>
          <h2 className={styles.sectionTitle}>ONE STUDIO.<br /><span>EVERY LAYER.</span></h2>
          <p className={styles.sectionIntro}>Strategy, engineering, creative and growth are better when they work together. We bring the right layers into one connected build—from the first question to what goes live.</p>
        </div>

        <div className={styles.experience}>
          <nav className={styles.stageNav} aria-label="Studio stages">
            <span className={styles.stageNavCaption}>SELECT A DISCIPLINE</span>
            {stages.map((stage, index) => (
              <button
                key={stage.number}
                type="button"
                onClick={() => goToStage(index)}
                className={`${styles.stageNavButton} ${activeStage === index ? styles.stageNavActive : ''}`}
                aria-current={activeStage === index ? 'step' : undefined}
              >
                <span>{stage.number}</span><b>{stage.verb}</b><i aria-hidden="true">↗</i>
              </button>
            ))}
            <div className={styles.stageProgress} aria-hidden="true"><span className={styles.progressFill} /></div>
          </nav>

          <div className={styles.panelStack}>
            {stages.map((stage, index) => (
              <article
                key={stage.number}
                ref={(node) => { panelsRef.current[index] = node; }}
                className={`${styles.stagePanel} ${index === activeStage ? styles.stagePanelActive : ''}`}
                aria-label={`${stage.verb}: ${stage.intro}`}
              >
                <div className={styles.stageCopy} data-stage-copy>
                  <TechnicalLabel variant="accent">{stage.number} / {stage.category}</TechnicalLabel>
                  <h3>{stage.verb}<br /><span>{stage.noun}</span></h3>
                  <p className={styles.stageLead}>{stage.intro}</p>
                  <p className={styles.stageDetail}>{stage.detail}</p>
                  <ul className={styles.capabilityList}>
                    {stage.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
                  </ul>
                  <div className={styles.stageFooter}><span>MAJIN STUDIOS</span><span>BUILD · CREATE · AUTOMATE · GROW</span></div>
                </div>
                <div className={styles.stageVisual} data-stage-visual>
                  <div className={styles.visualOrdinal}>MS / {stage.number}</div>
                  <StageArtwork index={index} />
                  <div className={styles.visualEdge}><span>DESIGNED WITH INTENT</span><span>17°23&apos; N / 78°29&apos; E</span></div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className={styles.bottomLine}><span>NOT MORE TOOLS. BETTER CONNECTED WORK.</span><span className={styles.bottomIndex}>0{activeStage + 1}<i> / 04</i></span></div>
      </div>
    </section>
  );
}
