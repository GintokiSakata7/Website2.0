# Majin Studios 3.0 — implementation notes

## Creative direction

The supplied MAJIN reference image is the primary brand direction: near-black surfaces, crisp white display type, geometric architecture, electric-lime lighting, and high contrast. The redesign deliberately moves away from the previous generic light SaaS template. Green is used as a focused accent, not as a blanket fill.

The studio message is framed around four connected disciplines:

- **Build** — websites, applications, custom software, APIs and integrations.
- **Create** — brand systems, product UI/UX, campaign creative, social and motion assets.
- **Automate** — AI agents, knowledge retrieval, repeatable workflows and tool integrations.
- **Grow** — paid advertising, social content, SEO foundations, landing pages and reporting.

The copy is grounded in the current products and capabilities. No unsupported client revenue or conversion claims have been added.

## Homepage architecture

### Hero

`components/sections/Hero.tsx` and `Hero.module.css` provide the brand treatment: the current wordmark, animated SVG chevron/light trail, oversized statement, studio-method sequence, service rail and scroll cue. The hero background is intentionally translucent so the fixed WebGL scene can be seen through it.

### Scroll-led studio sequence

`components/sections/StudioSequence.tsx` and its CSS provide four desktop chapters. GSAP ScrollTrigger pins the story and scrubs the transition as the visitor scrolls; separate UI artwork illustrates each discipline. The active chapter also updates the original Zustand capability state, which morphs the Three.js network scene.

Below 900px, the sequence becomes a normal vertically stacked set of content panels instead of a long pinned interaction. Reduced-motion preferences keep the content visible and disable the pinned/scrubbed sequence.

### Three.js world

- `components/three/ParticleField.tsx` adds a stable seeded particle field with restrained motion and pointer parallax.
- `components/three/NeonChevron.tsx` adds a dimensional mesh version of the geometric lime chevron.
- `components/three/UniverseScene.tsx`, `CoreScene.tsx`, and `NetworkScene.tsx` retain the original scene system and tie its composition to scroll/section state.
- Store subscriptions use selectors rather than subscribing to the entire Zustand store, preventing unnecessary scene rerenders while scroll progress is updated.

The WebGL scene remains an enhancement; the main site content and primary actions remain DOM content.

## Product pages retained and refined

The existing product-detail routes and content are preserved rather than replaced with blank templates:

- `/scanfeast` keeps the restaurant workflow film, diner ordering, real-time updates, kitchen display FIFO queue, manager surface, architecture, engineering and outcome sections. The former orange accent is now electric lime.
- `/quantumarena` keeps the event-operations story, participant workflows, check-in/evaluation/ranking/certification details, interface gallery, architecture and automation sections. Red accents were unified with Majin lime, and the global CSS selectors were scoped to the Quantum Arena page so it cannot unexpectedly restyle other routes.
- `/tools/builder` remains available.

Quantum Arena's image gallery advances more slowly and respects reduced-motion preferences. The route also removes event listeners, observers, intervals and animation frames when unmounted.

## Responsive and accessibility notes

- The desktop pinned sequence becomes a stack on mobile.
- Focus-visible outlines use the brand accent.
- Reduced-motion styles are provided for the key animated sections and product pages.
- The Quantum Arena custom cursor is hidden on coarse-pointer/touch devices.
- Existing semantic copy, labels and real project links are kept in the DOM.

## References reviewed

- [Velozity](https://www.velozity.ai/) — reviewed for communicating a clear promise, supporting it with concrete interface/product visuals, and explaining a process in steps. The implementation uses those communication principles without copying its layout.
- [Three.js documentation](https://threejs.org/docs/) — used as the reference point for the existing WebGL scene foundation.
- [GSAP ScrollTrigger documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) — reviewed for pinning, scrubbed timelines, progress and responsive scene cleanup.

## Validation performed

Static checks completed in the current working environment:

- Parsed all 80 TypeScript/TSX source files with the installed TypeScript transpiler; no syntax diagnostics were reported.
- Parsed all 31 CSS files with PostCSS.
- Checked 380 CSS-module class references against their module stylesheets.
- Checked 146 local/alias imports, literal public-asset references, package metadata and PWA manifest JSON.
- Checked Quantum Arena's queried static element IDs.
- Confirmed the legacy orange/red accent values targeted for the product-page retheme are gone from the relevant components.

**A full Next.js production build and browser interaction test were not completed.** The sandbox could not fetch dependencies from the npm registry, and an offline install failed because the `zustand` package archive was not cached. Do not treat the static checks as a substitute for a production build.

## Run and verify locally

From the project root, with npm registry access:

```bash
npm ci
npm run dev
```

Then check the homepage at desktop, tablet and mobile widths, and verify `/scanfeast`, `/quantumarena`, and `/tools/builder`. For a production verification, run:

```bash
npm run build
npm run start
```

Pay particular attention to ScrollTrigger pin spacing after font and image loading, the Three.js scene visibility behind the hero and the pinned chapter, mobile navigation, and the EmailJS contact submission/fallback.
