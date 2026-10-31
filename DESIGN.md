# Design Brief

## Direction

AgriNova Sonic Pest Control — Farmer-first landing for Udaan's sustainable pest management platform leveraging sonic wave technology to protect crops without chemicals.

## Tone

Organic trust with precision: clean, authoritative yet accessible editorial voice grounded in agricultural reality, not tech jargon.

## Differentiation

Sonic wave visualization with farmer testimonials and environmental impact metrics create credibility; warm terracotta accents on forest green convey earth and expertise without agricultural cliché.

## Color Palette

| Token      | OKLCH          | Role                                      |
| ---------- | -------------- | ----------------------------------------- |
| background | 0.96 0.015 75  | Warm cream (light mode) for breathing space |
| foreground | 0.2 0.03 50    | Deep charcoal for text hierarchy          |
| primary    | 0.45 0.12 30   | Warm terracotta (farmer/soil warmth)      |
| accent     | 0.5 0.1 160    | Muted sage green (botanical calm)         |
| card       | 0.98 0.01 75   | Slightly warmer white for depth           |
| muted      | 0.92 0.02 75   | Section alternation + secondary surfaces  |

## Typography

- Display: Lora — editorial authority for hero text and section headings; serif heritage conveys trust
- Body: Satoshi — warm, accessible sans-serif for paragraphs and UI labels; human-centered default font
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl md:text-5xl font-bold tracking-tight`, label `text-sm font-semibold uppercase tracking-widest`, body `text-lg`

## Elevation & Depth

Card-based layout with subtle warm shadows (`shadow-subtle` 0.06 opacity for light mode) and elevated states for CTAs; paper-like surfaces build tactile trust without flat design coldness.

## Structural Zones

| Zone    | Background      | Border                  | Notes                                           |
| ------- | --------------- | ----------------------- | ----------------------------------------------- |
| Header  | card (cream)    | border-b subtle tan     | Sticky navigation with logo + CTA              |
| Hero    | muted (off-cream) | —                       | Sonic visualization center + value prop        |
| Content | alternating     | section-specific        | hero → cream → muted → cream for rhythm        |
| Footer  | primary (terracotta) | border-t subtle       | Udaan mission + credibility + contact          |

## Spacing & Rhythm

Spacious generous gaps (`gap-12` between sections, `gap-6` within section content) honor agricultural mindset of natural breathing room; micro-spacing (`gap-3` between list items) maintains human-scale readability.

## Component Patterns

- Buttons: warm terracotta primary with cream text, soft rounded corners (6px), shadow-elevated on hover for tactile feedback
- Cards: cream background with subtle tan border + shadow-subtle; farmer testimonials use muted backgrounds with accent sage accents
- Badges: terracotta primary with cream text or sage accent outline for data labels

## Motion

- Entrance: staggered `slide-up` animations (0.5s ease-out) for section cards as page loads
- Hover: `transition-smooth` on all interactive elements; shadow elevation + subtle scale(1.02) for buttons
- Decorative: continuous `sonic-ripple` animation on hero visualization (2s cubic-bezier pulsing); fade-in on metric counters

## Constraints

- No dark mode drop-in invert; forest ink dark variant preserved as option but light mode primary
- Sonic wave visualizations use chart colors (botanical greens + terracotta) only; no neon gradients
- Text never uses accent color alone; terracotta primary or sage accent for emphasis only

## Signature Detail

Sonic wave ripple animation expanding outward from hero center conveys technology innovation while circular geometry echoes natural cycles; paired with farmer testimonial cards that shift from photo-first (builds trust) to quote-last (amplifies farmer voice).

