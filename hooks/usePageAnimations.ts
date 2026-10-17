'use client';

import { useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { useGlobalState } from '../store/useGlobalState';
import { useScrollAnimation } from './useScrollAnimation';

type SceneState =
  | 'CORE'
  | 'CAPABILITIES'
  | 'SYSTEMS'
  | 'AGENTS'
  | 'PRODUCTS'
  | 'TEAM'
  | 'WHY_MAJIN'
  | 'CONTACT';

type AccentState =
  | 'MONOCHROME'
  | 'LIME'
  | 'CYAN'
  | 'AMBER'
  | 'VIOLET';

interface SceneDefinition {
  selector: string;
  state: SceneState;
  accent: AccentState;
}

const SCENES: SceneDefinition[] = [
  { selector: '#home', state: 'CORE', accent: 'LIME' },
  { selector: '#studio-flow', state: 'CAPABILITIES', accent: 'LIME' },
  { selector: '#capabilities', state: 'CAPABILITIES', accent: 'MONOCHROME' },
  { selector: '#systems', state: 'SYSTEMS', accent: 'LIME' },
  { selector: '#agents', state: 'AGENTS', accent: 'LIME' },
  { selector: '#work', state: 'PRODUCTS', accent: 'LIME' },
  { selector: '#studio', state: 'TEAM', accent: 'LIME' },
  { selector: '#why-majin', state: 'WHY_MAJIN', accent: 'LIME' },
  { selector: '#contact', state: 'CONTACT', accent: 'LIME' },
];

export function usePageAnimations() {
  const setScene = useGlobalState((state) => state.setScene);
  const setAccent = useGlobalState((state) => state.setAccent);

  const registerSceneTriggers = useCallback(() => {
    if (typeof window === 'undefined') return;

    SCENES.forEach(({ selector, state, accent }) => {
      const element = document.querySelector(selector);

      if (!element) return;

      ScrollTrigger.create({
        trigger: element,
        start: 'top 48%',
        end: 'bottom 48%',
        invalidateOnRefresh: true,

        onEnter: () => {
          setScene(state as never);
          setAccent(accent as never);
        },

        onEnterBack: () => {
          setScene(state as never);
          setAccent(accent as never);
        },
      });
    });

    /*
     * Determine initial scene.
     */
    const viewportCenter = window.innerHeight * 0.5;

    let activeScene: SceneDefinition | null = null;

    for (const scene of SCENES) {
      const element = document.querySelector(scene.selector);

      if (!element) continue;

      const rect = element.getBoundingClientRect();

      if (
        rect.top <= viewportCenter &&
        rect.bottom >= viewportCenter
      ) {
        activeScene = scene;
        break;
      }
    }

    if (activeScene) {
      setScene(activeScene.state as never);
      setAccent(activeScene.accent as never);
    }
  }, [setAccent, setScene]);

  const animation = useCallback(
    (element: HTMLElement, isReducedMotion: boolean) => {
      if (typeof window === 'undefined') return;

      /*
       * REDUCED MOTION
       */
      if (isReducedMotion) {
        gsap.set(
          element.querySelectorAll(
            '.text-display-giant, .text-display, .text-body-lg, .actions, [data-hero-wordmark], [data-hero-copy], [data-hero-step], [data-hero-scroll], [data-hero-geometry], .manifesto'
          ),
          {
            clearProps: 'all',
            opacity: 1,
            visibility: 'visible',
            y: 0,
            x: 0,
            scale: 1,
          }
        );

        registerSceneTriggers();

        return;
      }

      /*
       * HERO
       */
      const heroText = element.querySelectorAll(
        '.text-display-giant, .text-display'
      );

      const heroBody = element.querySelector('.text-body-lg');
      const heroActions = element.querySelector('.actions');

      const heroTimeline = gsap.timeline({
        defaults: {
          ease: 'power2.out',
        },
      });

      if (heroText.length) {
        heroTimeline.fromTo(
          heroText,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
          },
          0.1
        );
      }

      if (heroBody) {
        heroTimeline.fromTo(
          heroBody,
          {
            y: 15,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          },
          '-=0.4'
        );
      }

      if (heroActions) {
        heroTimeline.fromTo(
          heroActions,
          {
            y: 10,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
          },
          '-=0.3'
        );
      }

      /*
       * MAJIN 3.0 HERO — purposeful entrance and scroll-linked geometry.
       * The lighting shape moves with scroll; copy remains readable and the
       * transition never hijacks or locks the user's scroll position.
       */
      const hero = element.querySelector<HTMLElement>('[data-hero]');
      if (hero) {
        const wordmark = hero.querySelector<HTMLElement>('[data-hero-wordmark]');
        const copy = gsap.utils.toArray<HTMLElement>(hero.querySelectorAll('[data-hero-copy]'));
        const steps = gsap.utils.toArray<HTMLElement>(hero.querySelectorAll('[data-hero-step]'));
        const geometry = hero.querySelector<HTMLElement>('[data-hero-geometry]');
        const scrollCue = hero.querySelector<HTMLElement>('[data-hero-scroll]');
        const manifesto = hero.querySelector<HTMLElement>('.manifesto');
        const statement = hero.querySelector<HTMLElement>('.statement');
        const entranceTargets: HTMLElement[] = [wordmark, ...copy, ...steps, scrollCue]
          .filter((target): target is HTMLElement => target !== null);

        gsap.set(entranceTargets, { opacity: 0, y: 18 });
        if (geometry) gsap.set(geometry, { opacity: 0, scale: 1.04, x: 16 });
        if (manifesto) gsap.set(manifesto, { opacity: 0, x: 22 });

        const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } });
        if (geometry) entrance.to(geometry, { opacity: 1, scale: 1, x: 0, duration: 1.35 }, 0.05);
        if (wordmark) entrance.to(wordmark, { opacity: 1, y: 0, duration: 1.1 }, 0.18);
        if (copy.length) entrance.to(copy, { opacity: 1, y: 0, duration: 0.75, stagger: 0.13 }, 0.42);
        if (manifesto) entrance.to(manifesto, { opacity: 1, x: 0, duration: 0.8 }, 0.62);
        if (steps.length) entrance.to(steps, { opacity: 1, y: 0, duration: 0.55, stagger: 0.09 }, 0.7);
        if (scrollCue) entrance.to(scrollCue, { opacity: 1, y: 0, duration: 0.45 }, 1.25);

        if (!isReducedMotion) {
          const heroScroll = gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          });
          if (geometry) heroScroll.to(geometry, { xPercent: 12, yPercent: -3, scale: 0.86, opacity: 0.42, ease: 'none' }, 0);
          if (wordmark) heroScroll.to(wordmark, { y: -52, opacity: 0.22, scale: 0.96, ease: 'none' }, 0);
          if (statement) heroScroll.to(statement, { y: -35, opacity: 0.2, ease: 'none' }, 0);
          if (manifesto) heroScroll.to(manifesto, { x: 45, opacity: 0.08, ease: 'none' }, 0.02);
          if (scrollCue) heroScroll.to(scrollCue, { opacity: 0, y: 10, ease: 'none' }, 0);
        }
      }

      /*
       * CONTENT GROUPS — stagger components into view, not just headings.
       */
      const revealGroups = gsap.utils.toArray<HTMLElement>(
        '[data-stagger-item]'
      );
      revealGroups.forEach((item) => {
        if (item.closest('[data-hero]')) return;
        gsap.fromTo(
          item,
          { y: 26, opacity: 0, rotateX: 1.5 },
          {
            y: 0, opacity: 1, rotateX: 0, duration: 0.75, ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 91%',
              once: true,
            },
          }
        );
      });

      /*
       * SECTION HEADINGS
       */
      const headings = gsap.utils.toArray<HTMLElement>(
        [
          '.section-heading',
          '[data-reveal-heading]',
          '.text-heading-1',
          '.text-heading-2',
        ].join(',')
      );

      headings.forEach((heading) => {
        gsap.fromTo(
          heading,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',

            scrollTrigger: {
              trigger: heading,
              start: 'top 95%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      /*
       * TECHNICAL LABELS
       */
      const labels = gsap.utils.toArray<HTMLElement>(
        '[data-reveal-label]'
      );

      labels.forEach((label) => {
        gsap.fromTo(
          label,
          {
            x: -10,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.45,
            ease: 'power2.out',

            scrollTrigger: {
              trigger: label,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      /*
       * EDITORIAL STATEMENTS
       */
      const statements = gsap.utils.toArray<HTMLElement>(
        '[data-editorial-statement]'
      );

      statements.forEach((statement, index) => {
        gsap.fromTo(
          statement,
          {
            y: index % 2 === 0 ? 20 : 10,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',

            scrollTrigger: {
              trigger: statement,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      /*
       * SCENE STATE
       */
      registerSceneTriggers();
    },
    [registerSceneTriggers]
  );

  return useScrollAnimation(animation, []);
}
