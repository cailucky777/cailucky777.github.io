import Link from "next/link";
import { ArrowUpRight, Briefcase, Sparkles, Store, Disc3 } from "lucide-react";
import { site } from "@/lib/site";
import { SiteFooter } from "@/components/SiteFooter";

type Tile = {
  href: string;
  eyebrow: string;
  title: string;
  blurb: string;
  accent: string;
  Icon: React.ComponentType<{ className?: string }>;
  className: string;
};

const tiles: Tile[] = [
  {
    href: "/pro",
    eyebrow: "01 — Work",
    title: "The Professional Me",
    blurb:
      "AI engineering, ML research, and the projects that ship. Resume, experience, and a curated portfolio.",
    accent: "var(--color-pro)",
    Icon: Briefcase,
    className: "md:col-span-2 md:row-span-2"
  },
  {
    href: "/life",
    eyebrow: "02 — Life",
    title: "The Off-Hours Me",
    blurb:
      "Vinyl shelf, kendo dojo, ski lines, pilates reformer — slow journals from the rest of the week.",
    accent: "var(--color-life)",
    Icon: Sparkles,
    className: "md:col-span-2"
  },
  {
    href: "/studio",
    eyebrow: "03 — Studio",
    title: "UanLearn Studio",
    blurb:
      "Stationery, hobonichi inserts, and small-batch goods. A cabinet of paper things I designed.",
    accent: "var(--color-studio)",
    Icon: Store,
    className: ""
  },
  {
    href: "/music",
    eyebrow: "04 — Music",
    title: "Now Playing",
    blurb:
      "A rotating Spotify playlist. Scan the code, or press play right here.",
    accent: "var(--color-music)",
    Icon: Disc3,
    className: ""
  }
];

export default function Home() {
  return (
    <main className="relative z-10 min-h-screen">
      <header className="mx-auto w-full max-w-6xl px-6 pt-10 sm:pt-14">
        <div className="flex items-center justify-between">
          <span className="font-serif text-lg font-medium tracking-tight">
            {site.shortName}
          </span>
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-[color:var(--color-ink-mute)] underline-offset-4 hover:text-[color:var(--color-ink)] hover:underline"
          >
            Say hi →
          </a>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-6 pt-16 pb-10 sm:pt-24">
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-mute)]">
          Vancouver · 2026
        </p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          Engineer by day,
          <br />
          collector by night.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[color:var(--color-ink-soft)]">
          I build LLM-powered products and end-to-end ML systems. Off the clock
          I keep a vinyl shelf, a kendo notebook, and a stationery studio. Pick
          a door.
        </p>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[14rem]">
          {tiles.map((t) => (
            <Tile key={t.href} {...t} />
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function Tile({ href, eyebrow, title, blurb, accent, Icon, className }: Tile) {
  return (
    <Link
      href={href}
      style={{ "--tile-accent": accent } as React.CSSProperties}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[color:var(--color-rule)] bg-[color:var(--color-cream)] p-6 transition-all hover:-translate-y-0.5 hover:border-[color:var(--tile-accent)] hover:shadow-[0_18px_40px_-20px_var(--tile-accent)] ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: "var(--tile-accent)" }}
      />
      <div className="relative z-10 flex items-start justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-ink-mute)]">
          {eyebrow}
        </span>
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--color-rule)] text-[color:var(--color-ink-soft)] transition-colors group-hover:border-[color:var(--tile-accent)] group-hover:text-[color:var(--tile-accent)]"
          aria-hidden
        >
          <Icon className="h-4 w-4" />
        </span>
      </div>

      <div className="relative z-10 mt-10">
        <h2 className="font-serif text-2xl leading-tight tracking-tight sm:text-3xl">
          {title}
        </h2>
        <p className="mt-3 text-sm text-[color:var(--color-ink-soft)]">
          {blurb}
        </p>
        <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-[color:var(--color-ink)]">
          Enter <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
