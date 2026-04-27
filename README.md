# savinacai.com

Personal site for **Savina (Luying) Cai** — a four-tab home covering pro work, off-hours notebooks, a small paper studio, and a music shelf.

## Stack

- **Next.js 15** (App Router, RSC) + **TypeScript**
- **Tailwind CSS v4** with a custom warm-paper palette
- **next-mdx-remote** for filesystem-backed content collections
- Deployed on **Vercel** with a custom domain

## Layout

```
/             Bento home — four tiles
/pro          Professional: about, experience, projects, skills, education
/life         Hobby index
/life/vinyl   Photo gallery of records
/life/kendo   Practice timeline
/life/ski     Trip timeline
/life/pilates Reformer log
/studio       UanLearn Studio — paper goods showcase
/music        Spotify embeds + scannable QR
```

## Authoring content

Every hobby is a folder under `content/`. Drop a new `.mdx` file; the site renders it on the next build.

### Vinyl entry — `content/vinyl/<slug>.mdx`

```mdx
---
title: "Album Title"
artist: "Artist"
year: 2026
label: "Label · pressing notes"
cover: "https://example.com/cover.jpg"
bought: "2026-04-12"
rating: 5
---

Free-form notes here.
```

### Timeline entry — `content/{kendo,ski,pilates}/<date>-<slug>.mdx`

```mdx
---
title: "Entry title"
date: "2026-04-12"
location: "Optional"
tags: ["tag-a", "tag-b"]
---

Markdown / MDX body.
```

## Editable surfaces

- **Profile + bio** — `src/lib/site.ts`
- **Pro page data** (projects, experience, skills, education) — `src/data/pro.ts`
- **Studio items** — `src/data/studio.ts`
- **Music playlists** — `src/data/playlists.ts`
- **Hobby copy** (titles, blurbs, accent colors) — `src/lib/hobbies.ts`

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run typecheck
npm run build
```

## Deployment

1. Connect this repository to Vercel — framework preset auto-detects Next.js.
2. Add the custom domain (e.g. `savinacai.com`) in Vercel → Settings → Domains.
3. Point the domain's DNS to Vercel (`A` to `76.76.21.21`, or `CNAME` to `cname.vercel-dns.com`).
4. Each push to `main` triggers a production deploy; PRs get preview URLs.
