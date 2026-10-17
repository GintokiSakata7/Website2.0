'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './BootLoader.module.css';
import { useGlobalState } from '../../store/useGlobalState';

export function BootLoader() {
  const hasBooted = useGlobalState((state) => state.hasBooted);
  const setHasBooted = useGlobalState((state) => state.setHasBooted);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // If we've already booted in a previous session or hot-reload, don't run again.
    if (hasBooted) return;

    // Keep the branded intro cinematic but brief; honor reduced-motion settings.
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fadeDelay = reducedMotion ? 120 : 1250;
    const finishDelay = reducedMotion ? 180 : 1850;
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, fadeDelay);

    const bootTimer = setTimeout(() => {
      setHasBooted(true);
    }, finishDelay);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(bootTimer);
    };
  }, [hasBooted, setHasBooted]);

  if (hasBooted) return null;

  return (
    <div 
      className={styles.container}
      style={{
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isFadingOut ? 'none' : 'auto'
      }}
    >
      <div className={styles.grid} />
      <div className={styles.scanline} />
      
      <div className={styles.centralLogo}>
        <Image 
          src="/logo.jpg" 
          alt="Majin Studios" 
          width={400} 
          height={100} 
          className={styles.logoImage}
          priority
        />
        <div className={styles.logoSub}>
          SYSTEM INITIALIZED
        </div>
      </div>
    </div>
  );
}
