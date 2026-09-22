# Project structure

This document outlines the architecture, folder layout, and naming conventions of the TableForge Institutional Portal (`TableForge_Institutional`).

---

## Reference implementations
- [app/layout.tsx](../../app/layout.tsx) — Root application layout, global theme injection, Header/Footer wrappers and base SEO.
- [components/ui/badge.tsx](../../components/ui/badge.tsx) — Shared visual token badge supporting Taverna community badges.
- [schemas/taverna.schema.ts](../../schemas/taverna.schema.ts) — Zod-based domain contracts and inferred types.

---

## Where things live

The repository follows Next.js App Router conventions with technical separation by concerns:

- `app/` — Application routes, page components, layouts, and global CSS:
  - `globals.css` — Tailwind CSS v4 entry point with `@theme` token definitions.
  - `layout.tsx` — Global root layout.
  - `page.tsx` — Portal home page.
  - `sobre/` — Manifesto, story and pillars of the ecosystem.
  - `equipe/` — Team members, bios and social links.
  - `para-lojas/` — B2B partner lead acquisition for geek stores and organizers.
  - `blog/` — Blog catalog and dynamic article reader (`[slug]/`).
  - `taverna/` — Community forum hub, category feeds (`[category]/`) and topic threads (`topico/[slug]/`).
- `components/` — Modular, reusable React components:
  - `components/ui/` — Generic design system primitives (`button.tsx`, `badge.tsx`, `card.tsx`, `input.tsx`, `textarea.tsx`, `modal.tsx`, `icons.tsx`).
  - `components/layout/` — Structural layout components (`header.tsx`, `footer.tsx`).
  - `components/blog/` — Blog-specific components (`blog-card.tsx`, `comment-section.tsx`, `taverna-banner.tsx`).
  - `components/taverna/` — Forum-specific components (`category-card.tsx`, `topic-row.tsx`, `reply-item.tsx`, `create-topic-modal.tsx`, `topic-thread-view.tsx`).
- `data/` — Realistic local mock data and pre-populated community content (`blog.mock.ts`, `taverna.mock.ts`, `team.data.ts`).
- `schemas/` — Zod validation schemas and TypeScript types inferred via `z.infer`.
- `public/` — Static assets (favicons, manifest icons, logos).
- `docs/` — Project conventions and architecture documentation.

---

## Naming

- **Files and directories**: `kebab-case` (e.g., `blog-card.tsx`, `topic-thread-view.tsx`).
- **Components**: `PascalCase` function names with named exports (e.g., `export function Header()`, `export function BlogCard(...)`).
- **Props interfaces**: `I` prefix, named after the component (e.g., `IButton`, `IBadge`, `IBlogCard`).
- **Types and enums**: standalone enums and types use `T` or descriptive `PascalCase` (e.g., `TTavernaBadge`).

---

## Rules

1. **Path alias**: Always use `@/*` for imports mapping to the root directory (e.g., `@/components/ui/button`, `@/schemas/taverna.schema`).
2. **Language policy**:
   - Code (identifiers, functions, types, props, file names): **English**.
   - UI strings (labels, placeholders, toasts, user-facing text): **pt-BR** with correct UTF-8 accents.
3. **Single source of truth for types**: All domain and form data structures must be inferred from Zod schemas (`type ITavernaTopic = z.infer<typeof TavernaTopicSchema>`). Never declare parallel disconnected interfaces.
4. **Self-explanatory code**: Do not add unnecessary comments to the codebase. Code structure and names should convey intent.
5. **No direct API calls from page components**: Once backend services are connected, API interaction must be isolated in service hooks/layers rather than raw fetch calls inside JSX.

---

## What NOT to do
- **Don't use default exports for components**: Except for Next.js mandatory page/layout files, always use named exports.
- **Don't install CSS-in-JS or external class merge packages**: Tailwind v4 is the exclusive styling system; do not add `styled-components` or `clsx`/`tailwind-merge`.
- **Don't version temporary specs inside the repository**: Permanent architectural decisions belong in `docs/conventions/`.
