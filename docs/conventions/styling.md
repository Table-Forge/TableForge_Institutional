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
- Font: Inter / HUD font stack applied to `body`

Tokens are exposed as standard Tailwind utility classes (`bg-primary`, `text-secondary`, `bg-[#1E1E1E]`, `text-[#faf3e0]`).

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
6. **Button styling**: Buttons follow sleek, compact proportions with `rounded-lg` (and `rounded-md` for xs/sm, `rounded-xl` for xl), natural-case typography (`font-medium` / `font-semibold text-sm`), and scaled heights (`h-7` to `h-12`). They avoid bulky pill shapes (`rounded-2xl`) and forced uppercase, maintaining a clean, modern aesthetic.
