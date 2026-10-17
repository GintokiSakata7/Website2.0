'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CaseStudyPage.module.css';

export type CaseStudyName = 'scanfeast' | 'quantumarena';

type CaseStudy = {
  id: string;
  name: string;
  eyebrow: string;
  title: string;
  description: string;
  category: string;
  scope: string[];
  problemHeading: string;
  problem: string;
  approachHeading: string;
  approach: string;
  features: { number: string; title: string; copy: string }[];
  workflow: { number: string; title: string; copy: string }[];
  gallery: { src: string; alt: string; label: string }[];
  architectureTitle: string;
  architectureCopy: string;
  architecture: string[];
  stack?: string[];
  nextTitle: string;
};

const products: Record<CaseStudyName, CaseStudy> = {
  scanfeast: {
    id: 'SF—01', name: 'Scanfeast', eyebrow: 'PRODUCT CASE STUDY / 01',
    title: 'Restaurant ordering, with the moving parts connected.',
    description: 'A contactless restaurant ordering system that connects diners, kitchen teams, and managers through one real-time flow.',
    category: 'Hospitality technology', scope: ['Product design', 'Full-stack engineering', 'Real-time workflows'],
    problemHeading: 'A restaurant runs on timing. Its tools should keep up.',
    problem: 'Diner menus, order tickets, kitchen status, and manager oversight can easily become separate conversations. Scanfeast was shaped around one practical need: give each role a clear interface while keeping the order journey connected.',
    approachHeading: 'One order. The right view for every role.',
    approach: 'The experience is split by the job each person needs to do: diners browse and place an order, the kitchen works through an incoming queue, and managers get a wider view of restaurant activity.',
    features: [
      { number: '01', title: 'QR menu & ordering', copy: 'Guests open the menu on their own device and move through the order flow without needing a separate app install.' },
      { number: '02', title: 'Kitchen display', copy: 'Incoming orders appear in a kitchen-focused queue designed to make status and preparation work easier to follow.' },
      { number: '03', title: 'Manager view', copy: 'A central dashboard brings order status and restaurant activity into one operational view.' },
    ],
    workflow: [
      { number: '01', title: 'Scan', copy: 'A guest scans the table QR code and opens the menu.' },
      { number: '02', title: 'Order', copy: 'The guest selects items and submits their order.' },
      { number: '03', title: 'Prepare', copy: 'The kitchen receives the order in its display queue.' },
      { number: '04', title: 'Oversee', copy: 'Managers keep track of order activity and delivery status.' },
    ],
    gallery: [
      { src: '/scanfeast/images/Screenshot%202026-08-27%20001503.png', alt: 'Scanfeast manager dashboard with order and sales overview', label: 'MANAGER / OVERVIEW' },
      { src: '/scanfeast/images/kds.png', alt: 'Scanfeast kitchen display and order queue', label: 'KITCHEN / LIVE QUEUE' },
      { src: '/scanfeast/images/diner.png', alt: 'Scanfeast mobile diner menu and ordering interface', label: 'DINER / MOBILE ORDERING' },
      { src: '/scanfeast/images/Screenshot%202026-08-27%20001600.png', alt: 'Scanfeast restaurant operations dashboard', label: 'OPERATIONS / STATUS' },
    ],
    architectureTitle: 'A simple path through a live order.',
    architectureCopy: 'The system connects the front-of-house action to the kitchen workflow, with a manager view for wider operational visibility.',
    architecture: ['Diner QR', 'Menu & order', 'Kitchen queue', 'Manager view'],
    stack: ['React', 'Node.js', 'Socket.IO', 'MongoDB'],
    nextTitle: 'Need a product to connect your own workflow?',
  },
  quantumarena: {
    id: 'QA—02', name: 'Quantum Arena', eyebrow: 'PLATFORM CASE STUDY / 02',
    title: 'Event operations, from registration to results.',
    description: 'A digital event platform designed to bring participant journeys, check-in, event information, judging, and post-event workflows into one organised system.',
    category: 'Event operations', scope: ['Participant workflows', 'Event information architecture', 'Admin and judging flows'],
    problemHeading: 'An event has many stages. None should live in a silo.',
    problem: 'Registration, identity checks, event-day entry, project evaluation, rankings, and certificates involve different people at different times. When each stage uses a separate process, organisers have to reconcile the details themselves.',
    approachHeading: 'A visible process for organisers, judges, and participants.',
    approach: 'Quantum Arena frames the event around the workflow: participants register and submit required details, check-in is handled through QR verification, judges use structured evaluation flows, and results can be consolidated for the final stages.',
    features: [
      { number: '01', title: 'Registration & intake', copy: 'A structured entry point for participant details, team information, track selection, and the required submission steps.' },
      { number: '02', title: 'QR check-in', copy: 'A verification-led entry workflow with attendance tracking across event days.' },
      { number: '03', title: 'Judging & outcomes', copy: 'Dedicated judging flows organise participant information, evaluation inputs, and score consolidation.' },
    ],
    workflow: [
      { number: '01', title: 'Register', copy: 'Participants submit the details required to enter.' },
      { number: '02', title: 'Verify', copy: 'QR check-in supports entry and attendance tracking.' },
      { number: '03', title: 'Evaluate', copy: 'Judges review submissions through a structured workflow.' },
      { number: '04', title: 'Publish', copy: 'Scores and rankings can be consolidated for event outcomes.' },
    ],
    gallery: [
      { src: '/quantumarena/images/Screenshot%202026-08-25%20204631.png', alt: 'Quantum Arena event platform main experience', label: 'PLATFORM / EXPERIENCE' },
      { src: '/quantumarena/images/Screenshot%202026-08-25%20204657.png', alt: 'Quantum Arena competition tracks and participant information', label: 'TRACKS / DISCOVERY' },
      { src: '/quantumarena/images/Screenshot%202026-08-25%20204800.png', alt: 'Quantum Arena event timeline and operational information', label: 'EVENT / TIMELINE' },
      { src: '/quantumarena/images/Screenshot%202026-08-25%20204842.png', alt: 'Quantum Arena event rules and participant requirements', label: 'RULES / GOVERNANCE' },
      { src: '/quantumarena/images/Screenshot%202026-08-25%20204825.png', alt: 'Quantum Arena competition results and winners view', label: 'RESULTS / OUTCOMES' },
      { src: '/quantumarena/images/Screenshot%202026-08-25%20204859.png', alt: 'Quantum Arena event location and attendee information', label: 'LOCATION / CONTEXT' },
    ],
    architectureTitle: 'The workflow is the product.',
    architectureCopy: 'Quantum Arena connects the stages that make an event run: intake, verification, evaluation, result processing, and post-event follow-through.',
    architecture: ['Registration', 'QR verification', 'Judging & scoring', 'Rankings & certificates'],
    nextTitle: 'Planning a platform with multiple roles and moving parts?',
  },
};

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d={diagonal ? 'M5 15 15 5M6 5h9v9' : 'M3.5 10h12m-5-5 5 5-5 5'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Mark() {
  return <span className={styles.mark} aria-hidden="true"><svg viewBox="0 0 36 36" fill="none"><path d="M5.5 27.5V8.5l9 11 9-11v19" stroke="currentColor" strokeWidth="3.2" /><path d="M22.5 27.5 30 8.5l4 11" stroke="#c8f36b" strokeWidth="3.2" /></svg></span>;
}

export default function CaseStudyPage({ product }: { product: CaseStudyName }) {
  const data = products[product];

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>('[data-case-study]');
    if (!root) return;
    const context = gsap.context(() => {
      const reveals = Array.from(root.querySelectorAll<HTMLElement>('[data-study-reveal]'));
      gsap.set(reveals, { autoAlpha: 0, y: 25 });
      reveals.forEach((node) => gsap.to(node, {
        autoAlpha: 1, y: 0, duration: .78, ease: 'power3.out',
        scrollTrigger: { trigger: node, start: 'top 88%', once: true },
      }));
      const hero = root.querySelector<HTMLElement>('[data-study-hero-visual]');
      if (hero) gsap.fromTo(hero, { autoAlpha: 0, y: 22, rotate: .8, scale: .985 }, { autoAlpha: 1, y: 0, rotate: 0, scale: 1, duration: 1, ease: 'expo.out', delay: .12 });
      const images = Array.from(root.querySelectorAll<HTMLElement>('[data-study-image]'));
      images.forEach((image) => gsap.fromTo(image, { scale: 1.08 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: image, start: 'top bottom', end: 'bottom top', scrub: .6 } }));
      const route = root.querySelector<HTMLElement>('[data-study-route-fill]');
      const routeSection = root.querySelector<HTMLElement>('[data-study-route]');
      if (route && routeSection) gsap.fromTo(route, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: routeSection, start: 'top 72%', end: 'bottom 52%', scrub: .55 } });
    }, root);
    return () => context.revert();
  }, [product]);

  return (
    <div className={styles.page} data-case-study>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="/" className={styles.brand} aria-label="Majin Studios home"><Mark /><span>majin<small>studios</small></span></a>
          <nav aria-label="Case study navigation"><a href="/#services">Services</a><a href="/#work">Selected work</a><a href="/#studio">Studio</a></nav>
          <a className={styles.headerCta} href="/#contact">Discuss a project <Arrow diagonal /></a>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.container}>
            <a className={styles.backLink} href="/#work"><Arrow /> Back to selected work</a>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy} data-study-reveal>
                <span className={styles.eyebrow}><i />{data.eyebrow}</span>
                <h1>{data.title}</h1>
                <p>{data.description}</p>
                <div className={styles.metaPills}><span>{data.category}</span>{data.scope.map((item) => <span key={item}>{item}</span>)}</div>
                <a href="#the-work" className={styles.heroLink}>Explore the work <span>↓</span></a>
              </div>
              <div className={styles.heroVisual} data-study-hero-visual>
                <div className={`${styles.heroStage} ${product === 'quantumarena' ? styles.heroStageQuantum : ''}`}>
                  <div className={styles.stageTop}><span><i /><i /><i /></span><b>{data.name.toUpperCase()} / LIVE VIEW</b><span>{data.id}</span></div>
                  <div className={styles.stageImage} data-study-image>
                    <Image src={data.gallery[0].src} alt={data.gallery[0].alt} fill sizes="(max-width: 900px) 90vw, 48vw" priority />
                  </div>
                  <div className={styles.stageFoot}><span>{product === 'scanfeast' ? 'DINER · KITCHEN · MANAGER' : 'REGISTER · VERIFY · EVALUATE'}</span><span>↗</span></div>
                </div>
                <div className={styles.stageNote}><span className={styles.stageNoteIcon}>{product === 'scanfeast' ? 'S' : 'Q'}</span><span><b>{data.name}</b><small>{product === 'scanfeast' ? 'ONE CONNECTED ORDER FLOW' : 'ONE VISIBLE EVENT WORKFLOW'}</small></span></div>
                <div className={styles.stageCoordinate}>{data.id} <i /> SELECTED WORK</div>
              </div>
            </div>
            <div className={styles.heroBottom}><span>MAJIN STUDIOS / SELECTED WORK</span><span>SCROLL TO EXPLORE <b>↓</b></span></div>
          </div>
        </section>

        <section className={styles.problemSection}>
          <div className={`${styles.container} ${styles.problemGrid}`}>
            <div data-study-reveal><span className={styles.sectionIndex}>01 / THE CHALLENGE</span><h2>{data.problemHeading}</h2></div>
            <div className={styles.problemCopy} data-study-reveal><p>{data.problem}</p><div className={styles.problemNote}><span>↗</span><p>Designed around the work people actually need to do—not just a list of features.</p></div></div>
          </div>
        </section>

        <section className={styles.featuresSection} id="the-work">
          <div className={styles.container}>
            <div className={styles.sectionHeader} data-study-reveal><span className={styles.sectionIndex}>02 / THE APPROACH</span><h2>{data.approachHeading}</h2><p>{data.approach}</p></div>
            <div className={styles.featureGrid}>
              {data.features.map((feature, index) => <article className={`${styles.featureCard} ${index === 1 ? styles.featureCardGreen : ''}`} key={feature.number} data-study-reveal><div className={styles.featureTop}><span>{feature.number}</span><i>{index === 0 ? '↗' : index === 1 ? '⌁' : '＋'}</i></div><h3>{feature.title}</h3><p>{feature.copy}</p><div className={styles.featureRule}><span style={{ width: `${36 + index * 20}%` }} /></div></article>)}
            </div>
          </div>
        </section>

        <section className={styles.workflowSection} data-study-route>
          <div className={styles.container}>
            <div className={styles.workflowHead} data-study-reveal><span className={styles.sectionIndex}>03 / THE WORKFLOW</span><h2>Make the next step <span>obvious.</span></h2><p>Each stage has its own job. The experience works when people can see what’s happening and understand what comes next.</p></div>
            <div className={styles.workflowTrack} aria-hidden="true"><span data-study-route-fill /></div>
            <div className={styles.workflowGrid}>
              {data.workflow.map((step) => <article key={step.number} data-study-reveal><span className={styles.workflowNumber}>{step.number}</span><h3>{step.title}</h3><p>{step.copy}</p></article>)}
            </div>
            <div className={styles.architecturePanel} data-study-reveal>
              <div><span className={styles.sectionIndex}>SYSTEM VIEW</span><h3>{data.architectureTitle}</h3><p>{data.architectureCopy}</p></div>
              <div className={styles.architectureFlow}>{data.architecture.map((item, index) => <div className={styles.architectureItem} key={item}><span>{String(index + 1).padStart(2, '0')}</span><b>{item}</b>{index < data.architecture.length - 1 && <i aria-hidden="true">→</i>}</div>)}</div>
            </div>
          </div>
        </section>

        <section className={styles.gallerySection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader} data-study-reveal><span className={styles.sectionIndex}>04 / INSIDE THE EXPERIENCE</span><h2>The details make the system.</h2><p>Selected screens from the actual product experience. The visual language within each product stays true to its own identity.</p></div>
            <div className={styles.galleryGrid}>
              {data.gallery.map((item, index) => <figure className={`${styles.galleryItem} ${index === 0 ? styles.galleryItemLarge : ''}`} key={item.src} data-study-reveal>
                <div className={styles.galleryImage} data-study-image><Image src={item.src} alt={item.alt} fill sizes="(max-width: 700px) 90vw, (max-width: 1050px) 44vw, 600px" /></div>
                <figcaption><span>{item.label}</span><span>{String(index + 1).padStart(2, '0')} / {String(data.gallery.length).padStart(2, '0')}</span></figcaption>
              </figure>)}
            </div>
          </div>
        </section>

        <section className={styles.detailsSection}>
          <div className={`${styles.container} ${styles.detailsGrid}`}>
            <div data-study-reveal><span className={styles.sectionIndex}>05 / DELIVERY PRINCIPLES</span><h2>Considered from interface to operation.</h2><p>Beyond the screens, the project is about making the underlying process easier to follow—clear states, predictable steps, and the right information available to the right person.</p></div>
            <div className={styles.detailsPoints} data-study-reveal>
              <article><span>01</span><div><b>Role-aware interfaces</b><p>Give each user a clear view of the tasks they need to complete.</p></div></article>
              <article><span>02</span><div><b>Visible process states</b><p>Make the hand-offs and stages understandable rather than implicit.</p></div></article>
              <article><span>03</span><div><b>Built for practical use</b><p>Keep the experience grounded in how the work happens day to day.</p></div></article>
              {data.stack && <div className={styles.stackBlock}><span>TECHNOLOGIES</span><div>{data.stack.map((item) => <b key={item}>{item}</b>)}</div></div>}
            </div>
          </div>
        </section>

        <section className={styles.nextSection}>
          <div className={styles.container}>
            <div className={styles.nextPanel} data-study-reveal><div><span className={styles.sectionIndex}>HAVE A SIMILAR CHALLENGE?</span><h2>{data.nextTitle}</h2><p>Bring us the goal, the constraints, and what isn’t working. We’ll help you work out a sensible first step.</p></div><a href="/#contact" className={styles.nextButton}>Start a conversation <Arrow diagonal /></a><span className={styles.nextOrbit} aria-hidden="true" /></div>
            <div className={styles.otherWork}><span>MORE FROM MAJIN</span><a href={product === 'scanfeast' ? '/quantumarena/' : '/scanfeast/'}>Explore {product === 'scanfeast' ? 'Quantum Arena' : 'Scanfeast'} <Arrow diagonal /></a><a href="/#work">All selected work <Arrow diagonal /></a></div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}><div className={styles.container}><a href="/" className={styles.footerBrand}><Mark /><span>majin<small>studios</small></span></a><p>Build with intent. Make it useful.</p><div><a href="mailto:hello@majin.studio">hello@majin.studio</a><a href="/">Back to the studio ↗</a></div><span className={styles.footerCopyright}>© {new Date().getFullYear()} Majin Studios · Hyderabad, India</span></div></footer>
    </div>
  );
}
