# How I Built My Personal Portfolio Site — A Complete Guide

This doc walks through every decision I made building [savinacai.com](https://savinacai.com): a personal portfolio that covers my professional work, hobby journals, stationery studio, and music playlists. It's meant to be practical enough that you can replicate the approach for your own site.

---

## The Big Picture

A personal site should answer one question fast: **who are you and what do you care about?** Rather than a single scrolling page with every achievement crammed in, I split the site into four distinct sections that each have their own personality:

| Section | Purpose |
|---|---|
| **Pro** | Professional CV — projects, experience, skills |
| **Life** | Hobby journals — vinyl, kendo, ski, pilates |
| **Studio** | Stationery goods (UanLearn Studio) |
| **Music** | Spotify playlists |

The home page is a minimal bento grid with four tiles — one per section. Nothing to read, just navigate.

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15** (App Router) | React Server Components make data fetching clean; file-based routing matches the section structure naturally |
| Language | **TypeScript** (strict) | All content has types — no surprise `undefined` at 2am |
| Styling | **Tailwind CSS v4** | Utility-first means no context-switching; custom theme variables keep the look consistent |
| Content (static) | **MDX + gray-matter** | Write journal entries as markdown files, push, done |
| Content (dynamic) | **Notion + @notionhq/client** | Edit hobby entries through Notion's UI instead of a code editor |
| Deployment | **Vercel** | Zero-config Next.js deploy; preview URLs on every PR |
| Translation | **Weglot** | Drop-in script for multi-language support |

No database, no auth, no CMS login. The site is statically generated at build time and deployed to a CDN.

---

## Project Structure

```
/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── layout.tsx        # Root layout: fonts, metadata, Weglot
│   │   ├── page.tsx          # Home (bento grid)
│   │   ├── pro/page.tsx      # Professional CV
│   │   ├── life/
│   │   │   ├── page.tsx      # Hobby index
│   │   │   └── [hobby]/page.tsx  # Dynamic hobby pages
│   │   ├── studio/page.tsx   # Stationery store
│   │   ├── music/page.tsx    # Playlists
│   │   └── globals.css       # Tailwind + custom theme
│   ├── components/           # Reusable UI pieces
│   │   ├── SectionNav.tsx    # Top nav (logo + section links)
│   │   ├── SiteFooter.tsx    # Bottom nav + social links
│   │   └── MDX.tsx           # Custom MDX element overrides
│   ├── lib/                  # Pure utilities
│   │   ├── site.ts           # Single source of truth: name, URLs, socials
│   │   ├── hobbies.ts        # Hobby metadata (slug, title, accent color)
│   │   ├── content.ts        # Read MDX files from filesystem
│   │   ├── notion.ts         # Fetch + parse Notion database entries
│   │   └── cn.ts             # clsx + tailwind-merge helper
│   └── data/                 # Page-level content (TypeScript objects)
│       ├── pro.ts            # Projects, experience, skills, education
│       ├── studio.ts         # Products + shop metadata
│       └── playlists.ts      # Spotify playlist URIs
└── content/                  # MDX journal entries
    ├── vinyl/
    ├── kendo/
    ├── ski/
    └── pilates/
```

---

## Design System

### Color Palette

The site has a warm, paper-journal feel. All colors are CSS custom properties defined in `globals.css`:

```css
--color-cream:  #f6f1e7   /* page background */
--color-paper:  #fbf8f1   /* card/section background */
--color-ink:    #1c1a17   /* primary text */
--color-muted:  #8a8070   /* secondary text */
```

Each section has its own accent color, used on active nav links, timeline dots, badges, and hover states:

| Section | Accent |
|---|---|
| Pro | `#5b6cff` (indigo-blue) |
| Life | `#ff8a65` (warm orange) |
| Studio | `#6f9a6a` (sage green) |
| Music | `#b88cd9` (soft purple) |

### Typography

Three font families, each with a role:

- **Inter** — body text, UI labels (sans-serif)
- **Fraunces** — headings, display text (optical serif, adds character)
- **JetBrains Mono** — code blocks, technical metadata

### Grain Texture Overlay

A subtle SVG `<feTurbulence>` filter is applied as a full-page overlay at low opacity. It breaks up the flat digital look and makes the "paper" feel more physical. Defined in `globals.css`, it doesn't affect interactions.

---

## Content Strategy: Two Sources, One Site

This is the most important architectural decision: **not all content comes from the same place.**

### Filesystem-backed MDX (for quick writes)

Hobby journal entries live as `.mdx` files in `/content`. Adding a new entry = create a file, push.

```
/content/vinyl/kind-of-blue.mdx
/content/kendo/2026-04-suburi.mdx
```

Each file has a YAML frontmatter block + markdown body:

```mdx
---
title: "Kind of Blue"
artist: "Miles Davis"
year: 1959
cover: "https://..."
rating: 5
---

The default record. Side A is for cooking.
```

The `readCollection()` function in `lib/content.ts` reads all files in a directory, parses them with `gray-matter`, and returns typed objects. It runs at build time — no runtime file I/O.

### Notion-backed Entries (for comfortable editing)

For entries I want to edit through a real UI (not VS Code), I use Notion databases. Each hobby has a corresponding Notion DB. At build time, `lib/notion.ts` fetches all pages, maps Notion properties to the same TypeScript types, and converts page content to markdown.

```
NOTION_TOKEN=...
NOTION_DB_VINYL=...
NOTION_DB_KENDO=...
NOTION_DB_SKI=...
NOTION_DB_PILATES=...
```

The result: whether content comes from a file or Notion, it flows into the same rendering components.

### TypeScript Data Files (for stable, structured content)

Professional data (projects, experience, education, skills) doesn't change often and has a clear schema. It lives in `src/data/pro.ts` as exported arrays of typed objects. No markdown, no database — just data.

```ts
export const projects: Project[] = [
  {
    name: "...",
    status: "active",
    stack: ["Next.js", "TypeScript"],
    highlights: ["..."],
    links: { github: "...", demo: "..." },
  },
  // ...
]
```

Updating a project = edit one object in one file.

---

## Routing

Next.js App Router maps directly to the section structure:

```
/             → app/page.tsx          (home)
/pro          → app/pro/page.tsx
/life         → app/life/page.tsx
/life/vinyl   → app/life/[hobby]/page.tsx  (hobby = "vinyl")
/life/kendo   → same file, different data
/studio       → app/studio/page.tsx
/music        → app/music/page.tsx
```

The `[hobby]` dynamic segment reads the slug from `params`, looks it up in `lib/hobbies.ts` (which defines all four hobbies and their metadata), then decides whether to render a gallery layout (vinyl) or a timeline layout (kendo, ski, pilates).

`generateStaticParams()` pre-renders all hobby pages at build time:

```ts
export async function generateStaticParams() {
  return hobbies.map((h) => ({ hobby: h.slug }))
}
```

---

## Navigation

`SectionNav` is a single component used on every page. It renders:
- A logo/name link back to `/`
- Four section links (Pro, Life, Studio, Music)

Active state is detected with Next.js `usePathname()`. The active link gets the accent color for that section, so the nav itself tells you where you are.

---

## Page-Level Patterns

### Home Page
A 4-tile bento grid. Each tile is a `<Link>` with a title, tagline, and section color. No content rendered — just navigation. Keeps the entry point clean.

### Pro Page
Rendered entirely from `src/data/pro.ts`. Sections: current focus, projects (with status badges and stack chips), experience timeline, education, skills grid. No MDX needed — structured data maps to structured UI.

### Life Index
A grid of hobby cards, one per hobby from `lib/hobbies.ts`. Each card shows the hobby's accent color, emoji badge, and blurb. Clicking navigates to `/life/[hobby]`.

### Dynamic Hobby Pages
Two layout variants, controlled by a `layout` field in hobby metadata:
- **Gallery** (`vinyl`): 4-column image grid, each tile links to a detail view
- **Timeline** (`kendo`, `ski`, `pilates`): Vertical list with colored dots, dates, tags, and MDX body text

### Studio Page
Static product cards from `src/data/studio.ts`. Each product has a name, description, status (`drafting` / `coming-soon` / `stocked`), and color swatches. A Shopify link is stubbed in.

### Music Page
Spotify embed iframes loaded from playlist URIs in `src/data/playlists.ts`. One playlist is marked `featured` and gets a larger display.

---

## Image Handling

Next.js `<Image>` is used throughout for automatic optimization. Remote images (album covers from Discogs, product photos from Shopify, etc.) are whitelisted in `next.config.mjs`:

```js
images: {
  remotePatterns: [
    { hostname: "i.discogs.com" },
    { hostname: "i.scdn.co" },        // Spotify
    { hostname: "cdn.shopify.com" },
    // ...
  ],
}
```

The profile image on the Pro page uses `priority` to ensure it's the LCP element.

---

## Deployment

1. Push to `main` on GitHub
2. Vercel detects the push, runs `npm run build`
3. Built output is deployed to Vercel's CDN
4. Custom domain (`savinacai.com`) is pointed at Vercel via DNS A/CNAME records

PRs automatically get preview deployment URLs, which makes it easy to review content changes before merging.

Environment variables (`NOTION_TOKEN`, `NOTION_DB_*`) are set in the Vercel project settings — never committed to the repo.

---

## Multi-Language Support

A Weglot script tag is injected in `app/layout.tsx`. It intercepts page text and offers a language switcher. No code changes needed to add a new language — it's configured through the Weglot dashboard.

---

## Key Principles Behind Every Decision

**1. Content lives close to its shape.**
Structured data (projects, products) goes in `.ts` files as typed objects. Free-form writing (journals) goes in `.mdx` files. Rich UI editing (hobby logs) goes in Notion.

**2. One source of truth per thing.**
`lib/site.ts` holds the author name and social links once. `lib/hobbies.ts` holds hobby metadata once. If it changes, it changes in one place.

**3. Build time over runtime.**
All data fetching (MDX reads, Notion API calls) runs at build time. The deployed site is static HTML and assets. No server-side latency, no Notion API calls in production.

**4. Design tokens, not magic numbers.**
Colors and fonts are defined as CSS custom properties and Tailwind theme values. No `#f6f1e7` scattered across 40 files.

**5. Minimal dependencies, purposeful choices.**
Every package solves a specific problem. `gray-matter` parses frontmatter. `clsx` + `tailwind-merge` merge classNames. Nothing included "just in case."

---

## Checklist: Starting From Scratch

- [ ] `npx create-next-app@latest --typescript --tailwind --app` to scaffold
- [ ] Define your section map (what are the 3–5 things you want to show?)
- [ ] Set up `lib/site.ts` with name, email, social links
- [ ] Design your color palette in `globals.css` as CSS variables
- [ ] Pick your fonts in `app/layout.tsx` (one serif + one sans is enough)
- [ ] Build `SectionNav` first — it anchors every page
- [ ] Create one `.ts` data file per structured content type
- [ ] Create one `/content/<topic>/` folder per journal-style content type
- [ ] Add Notion integration only when you need a non-developer editing UI
- [ ] Wire up Vercel deploy; add env vars in the Vercel dashboard
- [ ] Configure `next.config.mjs` for remote image domains
- [ ] `generateStaticParams()` for any dynamic routes

---

## File Reference

| File | What to look at |
|---|---|
| `src/lib/hobbies.ts` | How hobby metadata (slug, color, layout) is centralized |
| `src/lib/content.ts` | Generic MDX collection reader |
| `src/lib/notion.ts` | Notion → TypeScript type mapping |
| `src/data/pro.ts` | How complex structured data is typed and exported |
| `src/app/life/[hobby]/page.tsx` | Dynamic routing + layout branching |
| `src/app/globals.css` | Full design token setup + grain overlay |
| `next.config.mjs` | Remote image domains |
