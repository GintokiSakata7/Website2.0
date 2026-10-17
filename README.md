# Majin Studios — Studio Website 4.0

A full responsive website refresh for Majin Studios, built around a **light editorial canvas, deep forest-green surfaces, and controlled lime accents**. The hero illustration is a bespoke interface diagram authored in SVG/HTML/CSS; it does not use the supplied reference artwork as a hero image. Real product screenshots are used only in the selected-work and case-study sections.

## Experience overview

- **Homepage:** clear studio positioning, four service groups, a connected-workflow visual, real product work, a four-stage delivery process, studio principles, FAQs, and a project enquiry form.
- **Scanfeast case study (`/scanfeast/`):** QR ordering, kitchen display, manager workflow, real product screenshots, service flow, architecture notes, and the relevant technology stack.
- **Quantum Arena case study (`/quantumarena/`):** participant intake, QR check-in, judging and outcomes, real product screenshots, workflow and architecture content.
- **Builder redirect (`/tools/builder`):** retained as a separate branded tool/redirect experience.

## Design system

- **Canvas:** warm off-white (`#f7f8f4`) with white and pale-sage section surfaces.
- **Core surfaces:** deep forest green (`#123b2d` / related tones) for the studio system visual, selected cards, studio panel, and enquiry form.
- **Accent:** soft electric lime (`#c8f36b`) for small markers, animated connector lines, and important states.
- **Typography:** oversized editorial headlines, restrained uppercase metadata, and more readable body copy.
- **Responsive behaviour:** desktop uses richer split layouts and scroll-linked visual movement; mobile uses single-column/stacked layouts without pinned scrolling.

## Motion and interaction

The homepage uses GSAP and ScrollTrigger for one-time section reveals, hero depth/parallax, path tracing, image movement, a scroll-drawn workflow connector, service-card entrance, and an active process timeline. The case-study pages use their own scroll-triggered reveals, image framing/zoom, and a workflow line. Motion respects `prefers-reduced-motion`; essential content does not depend on animation. There is no scroll hijacking.

## Tech stack

- Next.js App Router / React / TypeScript
- CSS Modules and existing Tailwind setup
- GSAP + ScrollTrigger for motion
- `next/image` for product screenshots
- EmailJS for the existing project-enquiry workflow, with a mailto fallback shown after a failed send
- Existing original product assets and routes retained

## Run locally

Requirements: Node.js compatible with the `package.json` and access to the npm registry for dependency installation.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. To run a production build after dependencies are installed:

```bash
npm run build
npm run start
```

## QA status and important note

Static source checks were run after the redesign: 82 TypeScript/TSX files parsed without syntax diagnostics; all CSS-module references in the new homepage/case-study modules resolved; local imports and literal public-asset references in those components were checked; and all CSS stylesheets parsed without CSS syntax errors.

A full Next.js production build and browser interaction test **could not be completed in the current environment**. The npm registry repeatedly returned `EAI_AGAIN`, and the offline cache is missing at least one locked package. Treat this as a source-validated handoff, not a claimed production build. After running locally, test the menu, scrolling at desktop/tablet/mobile widths, product screenshots and the live enquiry form.

See [`docs/MAJIN-4.0-RELEASE-NOTES.md`](docs/MAJIN-4.0-RELEASE-NOTES.md) for a summary and reference notes.
