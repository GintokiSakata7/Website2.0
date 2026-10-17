# Majin Studios 4.0 — Release and implementation notes

## Creative brief interpreted

The intended website direction is **light-first, polished, and studio-led**—not a black hero poster and not a generic SaaS dashboard template. The chosen palette pairs an off-white canvas with deep forest-green cards and panels, white text on those dark surfaces, and small lime details for focus. The attached black/neon reference image was used only to understand brand contrast and geometry; it is not embedded as hero artwork. The homepage illustration is constructed from SVG and CSS shapes, and actual product screenshots appear in the portfolio/case-study context where they communicate real work.

## Reference-site research

- **Velozity (`https://www.velozity.ai/`)** was reviewed for the way it makes a promise quickly, shows concrete product/interface visuals, explains the workflow in digestible steps, and repeats a direct call to action. Majin uses those communication principles but has its own layout, copy, geometry, and motion.
- **Linear (`https://linear.app/`)** was reviewed as a reference for hierarchy, concise navigation, spacing, and a restrained interface system rather than as a layout to reproduce.
- **Ramotion (`https://www.ramotion.com/`) and Clay (`https://clay.global/`)** were reviewed for product-led case-study storytelling and treating project visuals as evidence rather than decoration.
- **Veltro Nexus (`https://veltronexus.org/`)** was treated as a source checklist for relevant service content—web and app development, creative/marketing work, and business-facing digital services—not as a visual reference.

## New homepage

### Hero

The hero uses original HTML/SVG elements: a green signal board, a connected node diagram, small floating annotations, subtle grid, soft ambient glow, and a clear two-column editorial composition on a warm-white background. The visual supports the idea of connecting strategy, brand, engineering, and growth. It is not a raster crop of the supplied poster.

### Story and sections

The information architecture moves from hero and studio positioning, to services, a connected workflow panel, selected work, process, studio principles, FAQs, and a detailed project enquiry area. Service content includes digital products/websites, software and AI/automation, brand and creative, and digital marketing/growth. The copy is written to speak directly to business needs without invented performance claims or fake client metrics.

### Bespoke motion

GSAP/ScrollTrigger creates motion that is specific to the component instead of reusing the old cinematic scene:

- headline and system-board entrance timing;
- scroll-bound depth/parallax on the board and its floating nodes;
- SVG connector lines traced into view;
- product screenshots with restrained scroll zoom/parallax;
- a workflow connector which draws as the section enters view;
- a vertical process line and step activation;
- independent reveal rhythms for cards and section content.

On narrower screens the layout becomes a conventional scrollable sequence; no long pinned sequence forces users through content. Reduced-motion preferences are respected.

## Case-study routes

`/scanfeast/` and `/quantumarena/` now share `components/studio-site/CaseStudyPage.tsx`, which applies a single design language while displaying the distinct actual screenshots and product-specific descriptions. It preserves each route's metadata and structured page data, and links back to the homepage enquiry section. Product feature descriptions stay grounded in the repository's existing work; no unsupported client outcomes are added.

## Technical changes

- New shared component folder: `components/studio-site/`.
- `app/page-client.tsx` renders the new `StudioHome`.
- Product routes render a shared `CaseStudyPage` configuration for each product.
- Global document background, selection colour, viewport theme colour, and web-manifest theme colours now align with the light canvas. The isolated builder redirect retains its separate terminal-like appearance.
- Existing project screenshot assets, EmailJS service/template configuration, social links, original route metadata, and product URLs are retained.
- The Open Graph image is a custom-built light-theme graphic, not the user's attached reference image.

## Static validation

Performed in the current environment:

- 82 TypeScript/TSX source files passed TypeScript transpile syntax checks with zero syntax diagnostics.
- 175 homepage CSS-module class references and 61 case-study CSS-module class references were checked against their stylesheet definitions; no missing references.
- Local/alias imports in the new homepage/case-study components and entry routes were checked; no missing imports found.
- Literal product asset references used in the two new components were checked; no missing paths found.
- All CSS files parsed with `tinycss2` with no CSS syntax errors.

**Not validated:** dependency installation, a full Next.js production compile, real-browser layout screenshots, visual regression testing, or a live EmailJS submission. A regular `npm ci` attempt repeatedly failed to fetch packages from `registry.npmjs.org` with `EAI_AGAIN`; `npm ci --offline` also fails because the cache lacks the `zustand` tarball. No production-build success is being claimed.

## Local handoff checklist

1. Extract the project and run `npm ci`.
2. Run `npm run dev`, then inspect `/`, `/scanfeast/`, and `/quantumarena/` on wide desktop, tablet, and 360–390px mobile widths.
3. Confirm sticky navigation/menu closure, scroll-trigger timing after images load, wrapping/overflow on the hero and feature cards, and reduced-motion behaviour.
4. Submit the enquiry form with valid details and verify the EmailJS configuration is active; also test the mailto fallback state.
5. Run `npm run build` and then `npm run start` before deployment.
