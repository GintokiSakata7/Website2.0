'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './MagneticCursor.module.css';

export default function MagneticCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'card' | 'text'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if device is touch or coarse pointer
    if (typeof window === 'undefined') return;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse || 'ontouchstart' in window) {
      setIsTouch(true);
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check hovered element for cursor behavior
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      const projectCard = target.closest('[data-project-card]') as HTMLElement | null;
      const clickable = target.closest('a, button, [role="button"]') as HTMLElement | null;
      const textElement = target.closest('h1, h2, h3, p, span, li') as HTMLElement | null;

      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor') || 'VIEW';
        setCursorText(text);
        setCursorVariant('card');
      } else if (projectCard) {
        setCursorText('EXPLORE ↗');
        setCursorVariant('card');
      } else if (clickable) {
        setCursorText('');
        setCursorVariant('hover');
      } else if (textElement && !textElement.closest('header, nav, footer')) {
        setCursorText('');
        setCursorVariant('text');
      } else {
        setCursorText('');
        setCursorVariant('default');
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth lerp loop for the outer ring follower
    const render = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (isTouch) return null;

  return (
    <div className={`${styles.cursorContainer} ${isVisible ? styles.visible : ''}`} aria-hidden="true">
      {/* Center pinpoint */}
      <div
        ref={cursorDotRef}
        className={`${styles.cursorDot} ${cursorVariant === 'card' ? styles.dotHidden : ''}`}
      />

      {/* Trailing follower lens */}
      <div
        ref={cursorRingRef}
        className={`${styles.cursorRing} ${styles[cursorVariant] || ''}`}
      >
        {cursorText && (
          <span className={styles.cursorLabel}>
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
