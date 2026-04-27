import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";
import { studioItems, studioMeta } from "@/data/studio";

export const metadata: Metadata = {
  title: "Studio",
  description: studioMeta.byline
};

const statusCopy: Record<string, string> = {
  drafting: "Drafting",
  "coming-soon": "Coming soon",
  stocked: "Stocked"
};

export default function StudioPage() {
  return (
    <main className="relative z-10 min-h-screen">
      <SectionNav active="studio" />

      <section className="mx-auto w-full max-w-6xl px-6 pt-10 pb-12 sm:pt-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-ink-mute)]">
          03 — {studioMeta.studioName}
        </p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight tracking-tight sm:text-6xl">
          Small paper goods,
          <br />
          made on a slow shelf.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-[color:var(--color-ink-soft)]">
          {studioMeta.byline}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <a
            href={studioMeta.shopUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-ink)] bg-[color:var(--color-ink)] px-4 py-2 text-[color:var(--color-paper)] transition-opacity hover:opacity-90"
          >
            Visit the shop <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <span className="rounded-full border border-[color:var(--color-rule)] px-3 py-1 text-xs text-[color:var(--color-ink-soft)]">
            Storefront stub — Shopify wiring later
          </span>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <header className="mb-6 flex items-baseline justify-between">
          <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">
            On the workbench
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-ink-mute)]">
            04
          </span>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {studioItems.map((item) => (
            <article
              key={item.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[color:var(--color-rule)] bg-[color:var(--color-cream)] transition-colors hover:border-[color:var(--color-studio)]"
            >
              <div
                className="relative h-40 w-full"
                style={{
                  background: `linear-gradient(135deg, ${item.swatch} 0%, ${item.swatch}cc 70%, ${item.swatch}80 100%)`
                }}
              >
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="rounded-full bg-[color:var(--color-paper)]/80 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-ink-soft)] backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
                <div className="absolute right-4 bottom-4 font-serif text-2xl text-[color:var(--color-ink)]/40">
                  {item.slug.split("-").pop()?.toUpperCase()}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-serif text-xl leading-tight">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-[color:var(--color-ink-soft)]">
                  {item.blurb}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)]">
                    {statusCopy[item.status]}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-[color:var(--color-ink-soft)]">
                    Details soon <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <Link
          href="/"
          className="text-sm text-[color:var(--color-ink-mute)] underline-offset-4 hover:text-[color:var(--color-ink)] hover:underline"
        >
          ← Back to home
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
