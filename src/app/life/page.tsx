import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";
import { hobbies } from "@/lib/hobbies";

export const metadata: Metadata = {
  title: "Life",
  description: "Vinyl, kendo, ski, pilates — the off-hours notebooks."
};

export default function LifePage() {
  return (
    <main className="relative z-10 min-h-screen">
      <SectionNav active="life" />

      <section className="mx-auto w-full max-w-6xl px-6 pt-10 pb-12 sm:pt-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-ink-mute)]">
          02 — The Off-Hours Me
        </p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight tracking-tight sm:text-6xl">
          Notebooks for everything
          <br />
          that isn't a terminal.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-[color:var(--color-ink-soft)]">
          Four small, slow journals — kept honestly, updated often. Pick one.
        </p>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {hobbies.map((h) => (
            <Link
              key={h.slug}
              href={`/life/${h.slug}`}
              style={
                {
                  "--tile-accent": h.accent
                } as React.CSSProperties
              }
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[color:var(--color-rule)] bg-[color:var(--color-cream)] p-7 transition-all hover:-translate-y-0.5 hover:border-[color:var(--tile-accent)] hover:shadow-[0_18px_40px_-20px_var(--tile-accent)]"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-ink-mute)]">
                  /life/{h.slug}
                </span>
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-rule)] font-serif text-base"
                  style={{ color: h.accent }}
                  aria-hidden
                >
                  {h.badge}
                </span>
              </div>

              <div className="mt-12">
                <h2 className="font-serif text-3xl leading-tight tracking-tight">
                  {h.title}
                </h2>
                <p className="mt-3 text-sm text-[color:var(--color-ink-soft)]">
                  {h.longBlurb}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium">
                  Open notebook <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
