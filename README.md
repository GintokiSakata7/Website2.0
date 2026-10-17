# Majin Studios — Cinematic Digital Studio

The primary Majin Studios website pairs a black, white and electric-green brand system with detailed service content, product case studies, and scroll-responsive visual storytelling.

## Architecture

The experience is built on a layered visual system:

1. **Brand hero**: Cropped Majin wordmark, neon chevron geometry, and build/create/automate/grow sequence.
2. **Content**: Detailed services, interactive system architecture, selected product work, tools, process, studio and contact.
3. **Three.js**: Persistent WebGL scene that changes composition with scroll and section state.
4. **GSAP / ScrollTrigger**: Entrance choreography, scroll-linked hero parallax, heading reveals, content assembly and a process timeline.
5. **Responsive fallback**: The service content remains readable on smaller screens; reduced-motion preferences remove scroll choreography and reveal all essential content.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS + Custom CSS Modules (Vanilla)
- **3D Engine**: Three.js + React Three Fiber + Drei
- **Animation**: GSAP + ScrollTrigger
- **State**: Zustand

## Design notes

- Palette: near-black, off-white, and electric lime green.
- Service groups include AI systems and agents, digital products, custom software, brand/creative design, and digital marketing.
- Existing `/scanfeast`, `/quantumarena`, and `/tools/builder` routes are retained.
- The homepage scroll movement is scrubbed to normal scrolling; it does not lock or hijack the browser scroll position.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Majin 3.0 interaction notes

The homepage's four-stage **BUILD / CREATE / AUTOMATE / GROW** chapter uses GSAP ScrollTrigger on desktop and a regular stacked experience on smaller screens. Its active stage drives the capability state in the retained Three.js scene. `ParticleField` and `NeonChevron` add low-cost brand-specific depth to the persistent WebGL world.

Both existing product case-study routes are retained and now share the electric-lime accent system. See [the implementation notes](docs/MAJIN-3.0-IMPLEMENTATION-NOTES.md) for reference research, architecture details and validation limitations.
