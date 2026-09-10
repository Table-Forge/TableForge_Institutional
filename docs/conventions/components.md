# Components

This document defines how we build, structure, and consume UI components in `TableForge_Institutional`.

---

## Reference implementations
- [components/ui/button.tsx](../../components/ui/button.tsx) — Primitive button with visual variants and loading state.
- [components/ui/card.tsx](../../components/ui/card.tsx) — Surface container with default, surface, and interactive variants.
- [components/taverna/topic-row.tsx](../../components/taverna/topic-row.tsx) — Composite domain component consuming badges, avatars and routing.

---

## Where things live

- **Shared UI primitives (`components/ui/`)**: Reusable building blocks agnostic to domain logic (`button.tsx`, `badge.tsx`, `card.tsx`, `input.tsx`, `textarea.tsx`, `modal.tsx`, `icons.tsx`).
- **Controlled form components (`components/input/`, `components/label/`, `components/input-group/`, `components/error-message/`)**: React Hook Form controlled primitives (`input.default.controlled.tsx`, `input.password.tsx`, `password-requirements.tsx`, `input.date.controlled.tsx`, `input.masked.tsx`, `label.tsx`, `input-group.tsx`, `error-message.tsx`).
- **Layout primitives (`components/layout/`)**: Structural components rendered across all pages (`header.tsx`, `footer.tsx`).
- **Domain components (`components/blog/`, `components/taverna/`)**: Feature-specific components (`blog-card.tsx`, `comment-section.tsx`, `category-card.tsx`, `topic-row.tsx`, `reply-item.tsx`, `create-topic-modal.tsx`).

---

## Naming

- **Component files**: `kebab-case.tsx` (e.g., `blog-card.tsx`, `topic-thread-view.tsx`).
- **Function components**: `PascalCase` named exports (e.g., `export function CategoryCard(...)`).
- **Props interfaces**: `I` prefix, matching the component name (e.g., `IButton`, `ICategoryCard`, `ITopicRow`).
- **Icons**: Clean SVG implementations reside in `components/ui/icons.tsx` for brand icons not provided by `lucide-react`.

---

## Rules

1. **Named exports only**: Always export components with named exports. Default exports are reserved strictly for Next.js route page/layout files.
2. **Accessible inputs**: Inputs and textareas must support `label` and `error` props, providing clear visual error states in red.
3. **Modal accessibility**: Modals must trap or disable body scrolling when active, provide a visible close trigger, and handle the `Escape` key.
4. **UI text language**: User-facing copy must always be in **pt-BR with correct UTF-8 accents**.
5. **No inline arbitrary hex values in components**: Rely on theme tokens or shared styling variables.
