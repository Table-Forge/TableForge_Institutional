# Styling

This document explains our styling approach using Tailwind CSS v4 in `TableForge_Institutional`.

---

## Reference implementations
- [app/globals.css](../../app/globals.css) — Tailwind v4 entry point and `@theme inline` token definitions.
- [components/ui/button.tsx](../../components/ui/button.tsx) — Variant class maps and utility composition.
- [components/ui/badge.tsx](../../components/ui/badge.tsx) — Color tokens and community badge styling.

---

## Tailwind CSS v4

Tailwind CSS v4 runs through `@tailwindcss/postcss` (registered in `postcss.config.mjs`); the entry point is `app/globals.css` (`@import "tailwindcss"`).
We do not use styled-components, CSS modules, or class-merge libraries (`clsx`, `tailwind-merge`).

The `@theme` block in `app/globals.css` is the single source of truth for design tokens.

---

## The Theme (Dark / HUD)

The application operates strictly on a **dark theme**:

- `background`: `#000000` (pure black)
- `primary`: `#3a3a3a` (forge surfaces, inputs and containers)
- `secondary` / `tertiary` / `danger`: `#ff2400` (crimson forge accent)
- `white`: `#faf3e0` (soft parchment/cream tone for typography)
- `black`: `#000000`
- `grays-50` to `grays-600`: grayscale palette from `#F1F1F1` down to `#1E1E1E`
- Fonts: Inter (`--font-inter`, body copy) and Cinzel (`--font-cinzel`, display), both loaded with `next/font/google` in `app/layout.tsx` and exposed as `font-sans` / `font-display`.

Tokens are exposed as standard Tailwind utility classes (`bg-primary`, `text-secondary`, `bg-[#1E1E1E]`, `text-[#faf3e0]`).

---

## The Forge visual language

The site follows the illustration language of the hero (`components/home/hero-banner/`): flat vector shapes, dark outlines, stone/iron surfaces and fire accents. The shared building blocks are:

- **Typography**: page titles, section titles and card titles use `font-display font-bold uppercase` (Cinzel, chiseled capitals) with a light tracking (`tracking-[0.02em]` to `tracking-[0.06em]`). Body copy, form controls, forum topics and long user content stay in Inter.
- **Forge marks**: every section opens with `SectionHeading` (`components/ui/section-heading.tsx`): a small-caps kicker with the keystone glyph and an optional roman numeral (`I`, `II`, …), the display title and an optional description/action. `ForgeKicker` is available for inline kickers. Do not use pill badges as section kickers.
- **Surfaces**: containers are stone slabs, never gradient boxes. `Card` renders a flat `#121214` surface with a 1px chiseled edge and two corner brackets; `ForgeBand` renders a full-bleed band with the `stone-pattern` utility and a vignette. Chamfered corners come from the `chamfer-sm` / `chamfer-md` / `chamfer-lg` utilities declared in `app/globals.css`.
- **Motifs**: `ForgeDivider` (hairline with the keystone glyph), `KeystoneIcon` bullets, wax-seal style community badges (`Badge` with `tavernaBadge`), the d20 spinner in `Button` loading states, and spot illustrations from `components/ui/spot-art.tsx` instead of icons inside tinted squares.
- **Accents**: only the brand fire palette (`#ff2400`, `#ff5a36`, `#ffb700`, `#faf3e0`) on top of the stone grays. Do not introduce purple/cyan/amber tints for variety; the community badge colors are the single documented exception.
- **Texture**: a global film grain overlay is applied in `app/globals.css` (`body::after`), so surfaces should stay flat and let the grain add depth.

---

## Community Badges (A Taverna)

Community recognition badges follow specific thematic color accents:
- **Ferreiro Fundador**: Amber gold tone (`bg-amber-950/50 text-amber-300 border-amber-500/40`) with hammer icon.
- **Mestre da Forja**: Mystic purple tone (`bg-purple-950/50 text-purple-300 border-purple-500/40`) with sparkles icon.
- **Parceiro Fundador**: Crimson forge tone (`bg-[#ff2400]/15 text-[#ff5a36] border-[#ff2400]/50`) with shield icon.
- **Criador da Forja**: Cyan media tone (`bg-cyan-950/50 text-cyan-300 border-cyan-500/40`) with video icon.
- **Moderador**: Crimson fire tone (`bg-red-950/60 text-red-300 border-red-600/50`) with flame icon.

---

## Rules

1. **Utility-first**: Build components with inline Tailwind classes.
2. **Variants maps**: For components with fixed visual variants, use typed `Record` class maps inside the component (e.g., `variantStyles` in `button.tsx`). Compose with template literals.
3. **Consistency**: Use the designated token colors across all pages. Do not introduce arbitrary unaligned color palettes.
4. **Responsive design**: Use Tailwind's default breakpoints (`sm:`, `md:`, `lg:`, `xl:`).
5. **No CSS-in-JS**: Do not install or import `styled-components` or `@emotion/styled`.
6. **Button styling**: Buttons follow sleek, compact proportions with chamfered corners (`chamfer-sm`, `chamfer-md` for xl), a forged inset highlight on filled variants, natural-case typography (`font-medium` / `font-semibold text-sm`), and scaled heights (`h-7` to `h-12`). They avoid pill shapes and forced uppercase.
7. **Corner hierarchy**: UI elements adhere to the forge corner standard:
   - **Form controls** (Inputs, Textareas, Selects, Dropdowns): `rounded-lg` (8px), keeping fields recognizable as fields.
   - **Actions and micro-elements** (Buttons, badges, tags, tabs): `chamfer-sm` (6px cut corners).
   - **Surfaces and containers** (Cards, panels, modals, empty states, preview frames): `chamfer-md` (12px); large editorial pieces (featured article, article cover) use `chamfer-lg` (20px).
   - Circles stay circular only for physical objects: avatars, medallions, rivets, nails and device screens.
   - Rounded radii above `rounded-lg` (`rounded-xl`, `rounded-2xl`, `rounded-3xl`) are not used on surfaces.
