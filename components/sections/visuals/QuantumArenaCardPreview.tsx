'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './CardPreview.module.css';

const quantumSlides = [
  {
    id: 'arena',
    label: 'ARENA MAINSTAGE',
    src: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=85',
    url: 'quantumarena.io/stage-live',
    badge: 'NEON ARENA STAGE',
    stat: '1,500+ ATTENDEES',
  },
  {
    id: 'builders',
    label: 'HACKATHON CODING',
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=85',
    url: 'quantumarena.io/builder-mesh',
    badge: '1,500+ BUILDERS',
    stat: '36H CONTINUOUS OPS',
  },
  {
    id: 'command',
    label: 'COMMAND MATRIX',
    src: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=85',
    url: 'quantumarena.io/ops-matrix',
    badge: 'REAL-TIME JUDGING',
    stat: 'ZERO LATENCY SCORING',
  },
  {
    id: 'crowd',
    label: 'KEYNOTE ARENA',
    src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1600&q=85',
    url: 'quantumarena.io/keynote-hub',
    badge: 'KEYNOTE AUDITORIUM',
    stat: 'ZERO DOWNTIME',
  },
];

export function QuantumArenaCardPreview({ className = '' }: { className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeSlide = quantumSlides[currentIndex];

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quantumSlides.length);
    }, 4500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + quantumSlides.length) % quantumSlides.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % quantumSlides.length);
  };

  return (
    <div
      className={`${styles.showcaseWrapper} ${className}`}
      data-cursor="3d"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top HUD Control Bar */}
      <div className={styles.topControlBar}>
        <div className={styles.windowControls}>
          <div className={styles.winDotRed} />
          <div className={styles.winDotYellow} />
          <div className={styles.winDotGreen} />
          <span style={{ fontSize: '0.62rem', color: '#00ff85', fontWeight: 800, marginLeft: '0.4rem', letterSpacing: '0.08em' }}>
            QUANTUM ARENA · LIVE WEB
          </span>
        </div>

        {/* Tab Group */}
        <div className={styles.tabGroup}>
          {quantumSlides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              className={`${styles.tabButton} ${currentIndex === idx ? styles.tabActiveLime : ''}`}
            >
              {slide.label}
            </button>
          ))}
        </div>

        <div className={styles.urlBar}>{activeSlide.url}</div>
      </div>

      {/* Main Photographic Display Area */}
      <div className={styles.frameViewport} data-project-visual>
        <Image
          key={activeSlide.src}
          src={activeSlide.src}
          alt={`Quantum Arena ${activeSlide.label}`}
          fill
          sizes="(max-width: 1200px) 100vw, 1000px"
          className={styles.mainScreenshot}
          priority
        />

        <div className={styles.overlayGradient} />

        {/* Navigation Arrows */}
        <button
          className={`${styles.navArrowBtn} ${styles.navArrowPrev}`}
          onClick={handlePrev}
          aria-label="Previous image"
        >
          ‹
        </button>
        <button
          className={`${styles.navArrowBtn} ${styles.navArrowNext}`}
          onClick={handleNext}
          aria-label="Next image"
        >
          ›
        </button>

        {/* Floating Telemetry Badges */}
        <div className={`${styles.floatingBadge} ${styles.badgeLime}`} style={{ top: '15px', right: '15px' }}>
          <div className={styles.pulseDotLime} />
          <span>{activeSlide.badge}</span>
        </div>

        <div className={`${styles.floatingBadge} ${styles.badgeLime}`} style={{ top: '15px', left: '15px' }}>
          <span>{activeSlide.stat}</span>
        </div>

        {/* Miniature Thumbnail Strip Dock */}
        <div className={styles.thumbnailDock} aria-label="Photo gallery navigation">
          {quantumSlides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              className={`${styles.thumbnailItem} ${currentIndex === idx ? styles.thumbnailActive : ''}`}
              aria-label={`View ${slide.label}`}
            >
              <Image
                src={slide.src}
                alt={slide.label}
                width={46}
                height={30}
                className={styles.thumbnailImg}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Telemetry Footer */}
      <div className={styles.bottomFooter}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ color: '#00ff85', fontWeight: 700 }}>INFRASTRUCTURE:</span>
          <span>GATE QR &rarr; REAL-TIME JUDGE MATRIX &rarr; CERT ENGINE</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span>SCALE: 1,500+ DEVELOPERS</span>
          <span style={{ color: '#00ff85', fontWeight: 700 }}>STATUS: PRODUCTION READY</span>
        </div>
      </div>
    </div>
  );
}