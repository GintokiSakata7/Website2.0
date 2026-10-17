'use client';

import React, { useEffect, useState } from 'react';

export default function PageAnimationsOverlay() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const revealElements = document.querySelectorAll('.scroll-reveal, section');
    revealElements.forEach((el) => observer.observe(el));

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Top Scroll Progress Line (Spline / Velozity style) */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] bg-black/5 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#063d27] via-[#059669] to-[#00e676] shadow-[0_0_10px_#00e676] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Ambient Mouse Radial Spotlight */}
      <div
        className="fixed pointer-events-none z-30 transition-opacity duration-300 opacity-60 hidden md:block"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: 'translate(-50%, -50%)',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(0, 230, 118, 0.07) 0%, rgba(5, 150, 105, 0.02) 40%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
    </>
  );
}
