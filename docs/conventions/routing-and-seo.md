# Routing and SEO

This document defines route architecture, metadata standards, and structured data (JSON-LD) practices for `TableForge_Institutional`.

---

## Reference implementations
- [app/layout.tsx](../../app/layout.tsx) — Root metadata configuration, OpenGraph and title templates.
- [app/blog/[slug]/page.tsx](../../app/blog/[slug]/page.tsx) — Dynamic metadata generation and `BlogPosting` JSON-LD structured data.
- [app/taverna/topico/[slug]/page.tsx](../../app/taverna/topico/[slug]/page.tsx) — Dynamic metadata and `DiscussionForumPosting` JSON-LD structured data.

---

## Route Map

- `/` — Institutional Home page: hero section, audience-specific segments, active Taverna feed and blog previews.
- `/sobre` — Story, mission and community manifesto.
- `/equipe` — Team members, roles, biographies and favorite systems.
- `/para-lojas` — B2B landing and Partner Lead application form.
- `/blog` — Content machine catalog with real-time text search and category filters.
- `/blog/[slug]` — Full article reader, reading time, tags, comments and Taverna cross-link banner.
- `/taverna` — Community forum hub with 7 core categories, topic counters and new discussion modal.
- `/taverna/[category]` — Themed discussion list with sort options (Recent, Most Replies, Most Upvotes).
- `/taverna/topico/[slug]` — Topic thread with original post, interactive upvoting, nested replies and response form.

---

## Dynamic Routes in Next.js 16

In Next.js 16 App Router, `params` and `searchParams` are delivered as Promises in Server Components. Always `await params` before accessing properties:

```typescript
interface IBlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: IBlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  // ...
}

export default async function BlogPostPage({ params }: IBlogPostPageProps) {
  const { slug } = await params;
  // ...
}
```

---

## SEO and Structured Data (JSON-LD)

To establish organic search authority on Google and ensure RPG discussions and guides are indexed:

1. **Blog Articles (`/blog/[slug]`)**:
   - Injects `BlogPosting` schema containing headline, description, cover image, publication date and author.
2. **Taverna Discussions (`/taverna/topico/[slug]`)**:
   - Injects `DiscussionForumPosting` schema containing topic title, body, author, and interaction statistics (comments and upvotes).
3. **Cross-Synergy (Blog ↔ Taverna)**:
   - Articles in the Blog conclude with a `TavernaBanner` linking to the matching forum category to foster ongoing community retention.
