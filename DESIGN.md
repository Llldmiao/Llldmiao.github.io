# Personal Site Design System

## Visual Thesis

A warm technical field notebook: calm Chinese editorial typography, a living code-map hero, restrained color, and small interactions that make engineering work feel tangible.

## Content Plan

- Hero: establish "Llldmiao / 冷冷冷的喵" as the first-viewport signal, with one interactive canvas that behaves like a map of projects and notes.
- Work map: show the current focus areas at a glance: AI tools, market data, browser utilities, and personal systems.
- Projects: list selected public work with sharp descriptions and direct links.
- Notes: keep a writing surface for future technical notes without pretending the old Hexo archive is still the main product.
- About/contact: short human context, GitHub-first contact path, and a clear invitation to explore the work.

## Interaction Thesis

- The hero canvas drifts slowly and responds to pointer movement, making the page feel alive without becoming a game.
- Project filters tighten the page from broad overview to a specific work stream.
- Theme switching is immediate, persistent, and designed as a core feature rather than an afterthought.

## Art Direction

- Mood: focused, curious, handmade, technical.
- Composition: full-bleed hero, then dense but calm editorial sections.
- Shape language: straight edges, quiet rules, small circular nodes only inside the canvas.
- Texture: generated canvas field, not decorative gradients or generic cards.
- Copy: direct Chinese-first labels with a few English product names where the work itself uses them.

## Typography

- UI/body: system sans stack for clean Chinese rendering.
- Code/accent: system monospace for small labels and technical metadata.
- Display: same sans stack at larger size; no decorative display face.

## Color

Light mode:

- Background: `#f6f2ea`
- Surface: `#fffaf1`
- Ink: `#191713`
- Muted: `#6f675c`
- Rule: `#ded4c5`
- Accent: `#1b6b63`
- Warm accent: `#a85f2a`

Dark mode:

- Background: `#11100e`
- Surface: `#1b1915`
- Ink: `#f5eee1`
- Muted: `#b8ad9d`
- Rule: `#39342b`
- Accent: `#63d2bf`
- Warm accent: `#ffb36b`

## Layout Rules

- Use full-width bands and constrained inner content, not nested cards.
- Keep hero content readable over the canvas with a stable text column.
- Use project rows and lists instead of card mosaics.
- Keep mobile sections linear and avoid text overlapping canvas controls.

## Motion Rules

- Keep animations slow, useful, and disable them under `prefers-reduced-motion`.
- Use transform/opacity for UI transitions.
- Do not animate large text blocks while the user is reading.

## Implementation Notes

- Ship as static HTML/CSS/JS for GitHub Pages.
- Avoid external dependencies.
- Preserve accessibility: semantic landmarks, visible focus states, color contrast, keyboard-friendly controls.
