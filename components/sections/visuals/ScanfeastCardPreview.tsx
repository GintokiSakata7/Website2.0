'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './CardPreview.module.css';

const scanfeastSlides = [
  {
    id: 'dining',
    label: 'FINE DINING & QR',
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85',
    url: 'scanfeast.com/dining-service',
    badge: 'FINE DINING & TABLE QR',
    stat: '42S KITCHEN PREP',
    caption: 'Dine-in guests order directly from table QR codes without waitstaff friction.',
  },
  {
    id: 'kds',
    label: 'KITCHEN POS HUD',
    src: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1600&q=85',
    url: 'scanfeast.com/kds-queue',
    badge: 'TOUCHSCREEN KDS',
    stat: '100% WEBSOCKET SYNC',
    caption: 'Kitchen Display System receives tickets instantly across kitchen stations.',
  },
  {
    id: 'culinary',
    label: 'CHEF LINE EXPEDITE',
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85',
    url: 'scanfeast.com/chef-line',
    badge: 'GOURMET EXPEDITE',
    stat: 'ZERO TICKET LOSS',
    caption: 'Real-time order routing ensures precision plating and zero missed courses.',
  },
  {
    id: 'lounge',
    label: 'COCKTAIL BAR OPS',
    src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=85',
    url: 'scanfeast.com/bar-lounge',
    badge: 'BAR CONTACTLESS',
    stat: '14 VENUES ACTIVE',
    caption: 'High-volume bar ordering keeps drink queues moving during rush hours.',
  },
];

export function ScanfeastCardPreview({ className = '' }: { className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeSlide = scanfeastSlides[currentIndex];

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % scanfeastSlides.length);
    }, 4500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + scanfeastSlides.length) % scanfeastSlides.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % scanfeastSlides.length);
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
            SCANFEAST OS · LIVE WEB
          </span>
        </div>

        {/* Tab Group */}
        <div className={styles.tabGroup}>
          {scanfeastSlides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              className={`${styles.tabButton} ${currentIndex === idx ? styles.tabActiveCyan : ''}`}
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
          alt={`Scanfeast ${activeSlide.label}`}
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
          {scanfeastSlides.map((slide, idx) => (
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
          <span style={{ color: '#00ff85', fontWeight: 700 }}>STACK:</span>
          <span>NEXT.JS &rarr; WEBSOCKET &rarr; POSTGRES KDS &rarr; STRIPE</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span>HYDERABAD PILOT: 14 VENUES</span>
          <span style={{ color: '#00ff85', fontWeight: 700 }}>ACTIVE PRODUCTION</span>
        </div>
      </div>
    </div>
  );
}