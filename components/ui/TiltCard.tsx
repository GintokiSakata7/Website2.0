'use client';

import React, { useRef, useState, useCallback, type ReactNode } from 'react';
import styles from './TiltCard.module.css';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  glare?: boolean;
  scale?: number;
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 7,
  perspective = 1100,
  glare = true,
  scale = 1.018,
  ...rest
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef<number>(0);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // If mobile/touch device, don't tilt
    if (e.pointerType === 'touch') return;

    const card = cardRef.current;
    if (!card) return;

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles
      const rotateX = -((y - centerY) / centerY) * maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      card.style.setProperty('--card-rx', `${rotateX.toFixed(2)}deg`);
      card.style.setProperty('--card-ry', `${rotateY.toFixed(2)}deg`);
      card.style.setProperty('--card-scale', `${scale}`);

      if (glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        card.style.setProperty('--glare-x', `${glareX.toFixed(1)}%`);
        card.style.setProperty('--glare-y', `${glareY.toFixed(1)}%`);
        card.style.setProperty('--glare-opacity', '0.65');
      }
    });
  }, [maxTilt, scale, glare]);

  const handlePointerEnter = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;

    cancelAnimationFrame(rafRef.current);
    setIsHovered(false);

    card.style.setProperty('--card-rx', '0deg');
    card.style.setProperty('--card-ry', '0deg');
    card.style.setProperty('--card-scale', '1');
    card.style.setProperty('--glare-opacity', '0');
  }, []);

  return (
    <div
      ref={cardRef}
      className={`${styles.tiltWrapper} ${isHovered ? styles.tiltActive : ''} ${className}`}
      style={{ perspective: `${perspective}px` }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      {...rest}
    >
      <div className={styles.tiltInner}>
        {children}
        {glare && (
          <div className={styles.glareOverlay} aria-hidden="true" />
        )}
      </div>
    </div>
  );
}
