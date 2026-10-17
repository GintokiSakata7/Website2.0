'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';
import { Button, TechnicalLabel } from '../ui';

const studioSteps = [
  { number: '01', label: 'BUILD', detail: 'Digital products that work.' },
  { number: '02', label: 'CREATE', detail: 'Design people remember.' },
  { number: '03', label: 'AUTOMATE', detail: 'Less busywork. Better flow.' },
  { number: '04', label: 'GROW', detail: 'Marketing with a clear job.' },
];

const serviceRail = ['WEB', 'APPS', 'AI', 'DESIGN', 'GROWTH'];

export function Hero() {
  return (
    <section className={styles.hero} id="home" data-hero aria-labelledby="hero-title">
      <div className={styles.gridTexture} aria-hidden="true" />
      <div className={styles.geometry} data-hero-geometry aria-hidden="true">
        <div className={styles.geometryFacet} />
        <svg className={styles.chevronSvg} viewBox="0 0 900 1000" preserveAspectRatio="xMidYMid slice" fill="none">
          <defs>
            <linearGradient id="majinBeam" x1="230" y1="20" x2="780" y2="500" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#D8FF9C" />
              <stop offset="0.44" stopColor="#9DFF00" />
              <stop offset="0.7" stopColor="#62D900" />
              <stop offset="1" stopColor="#2B7C16" />
            </linearGradient>
            <filter id="majinBeamGlow" x="-60%" y="-40%" width="220%" height="180%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <path className={styles.chevronEcho} d="M245 -90 L758 500 L245 1090" />
          <path className={styles.chevronEchoSecondary} d="M345 -90 L858 500 L345 1090" />
          <path className={styles.chevronBeam} d="M265 -100 L770 500 L265 1100" stroke="url(#majinBeam)" filter="url(#majinBeamGlow)" />
          <path className={styles.chevronCore} d="M285 -100 L790 500 L285 1100" />
          <path className={styles.chevronFine} d="M680 -100 L200 455 L800 1100" />
        </svg>
      </div>

      <div className={`page-container ${styles.container}`}>
        <div className={styles.topline} data-hero-copy>
          <span className={styles.toplineLeft}><i className={styles.statusDot} /> INDEPENDENT DIGITAL STUDIO <b>/</b> HYDERABAD, INDIA</span>
          <span className={styles.toplineRight}>STRATEGY <span>×</span> DESIGN <span>×</span> ENGINEERING</span>
        </div>

        <div className={styles.heroGrid}>
          <div className={styles.primary}>
            <div className={styles.wordmarkFrame} data-hero-wordmark>
              <Image
                src="/logo.jpg"
                alt="Majin Studios"
                width={1200}
                height={1200}
                priority
                className={styles.wordmarkImage}
                sizes="(max-width: 640px) 94vw, (max-width: 1200px) 68vw, 900px"
              />
              <span className={styles.wordmarkRule} aria-hidden="true" />
            </div>

            <div className={styles.statement} data-hero-copy>
              <TechnicalLabel variant="accent" className={styles.statementLabel}>IDEAS, MADE USEFUL <span>— 01 / 05</span></TechnicalLabel>
              <h1 id="hero-title" className={styles.headline}>
                <span className={styles.headlineSmall}>TURNING</span>
                <span>IDEAS INTO</span>
                <span className={styles.headlineAccent}>SOLUTIONS<span className={styles.period}>.</span></span>
              </h1>
              <p className={styles.description}>
                We bring digital products, custom software, creative design and marketing together—so your next good idea has a clear path from first sketch to launch.
              </p>
              <div className={styles.actions}>
                <Button href="#contact" withArrow>LET&apos;S BUILD SOMETHING</Button>
                <Button href="#work" variant="secondary" withArrow>SEE SELECTED WORK</Button>
              </div>
            </div>
          </div>

          <aside className={styles.manifesto} aria-label="What Majin does">
            <div className={styles.manifestoHeader}>
              <span>THE STUDIO METHOD</span>
              <span className={styles.manifestoIndex}>MS / 2026</span>
            </div>
            <ol className={styles.stepList}>
              {studioSteps.map((step, index) => (
                <li className={styles.step} key={step.number} data-hero-step>
                  <span className={styles.stepNumber}>{step.number}</span>
                  <div className={styles.stepCopy}>
                    <strong>{step.label}</strong>
                    <span>{step.detail}</span>
                  </div>
                  <span className={styles.stepMarker} aria-hidden="true">↗</span>
                  <span className={styles.stepProgress} style={{ ['--step-index' as string]: index }} aria-hidden="true" />
                </li>
              ))}
            </ol>
            <div className={styles.manifestoFooter}>
              <span className={styles.greenDash} />
              <p>One team for the things your business needs to move forward.</p>
            </div>
          </aside>
        </div>

        <div className={styles.bottomRail}>
          <div className={styles.serviceRail} aria-label="Studio services">
            {serviceRail.map((service, index) => (
              <React.Fragment key={service}>
                {index > 0 && <span className={styles.railDivider} aria-hidden="true" />}
                <span>{service}</span>
              </React.Fragment>
            ))}
          </div>
          <a className={styles.scrollCue} href="#studio-flow" data-hero-scroll>
            <span className={styles.scrollLine} aria-hidden="true"><i /></span>
            <span>SCROLL TO EXPLORE</span>
            <span className={styles.scrollArrow} aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <div className={styles.heroCoordinates} aria-hidden="true"><span>17°23&apos; N</span><span>MAJIN / 001</span></div>
    </section>
  );
}
