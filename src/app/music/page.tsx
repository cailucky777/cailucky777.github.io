import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";
import { featured, playlists } from "@/data/playlists";

export const metadata: Metadata = {
  title: "Music",
  description: "What's on the turntable, in the headphones, on the drive."
};

function spotifyEmbed(uri: string) {
  return `https://open.spotify.com/embed/${uri}?utm_source=generator&theme=0`;
}

function spotifyShareUrl(uri: string) {
  return `https://open.spotify.com/${uri}`;
}

export default function MusicPage() {
  return (
    <main className="relative z-10 min-h-screen">
      <SectionNav active="music" />

      <section className="mx-auto w-full max-w-6xl px-6 pt-10 pb-12 sm:pt-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-ink-mute)]">
          04 — Now Playing
        </p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight tracking-tight sm:text-6xl">
          Press play, or steal the playlist.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-[color:var(--color-ink-soft)]">
          A small carousel of Spotify playlists I keep updated. Hit play below,
          or scan the code into your own app.
        </p>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-12">
        <div className="rounded-3xl border border-[color:var(--color-rule)] bg-[color:var(--color-cream)] p-6 lg:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-ink-mute)]">
            Featured
          </p>
          <h2 className="mt-2 font-serif text-2xl leading-tight">
            {featured.title}
          </h2>
          <p className="mt-2 mb-5 text-sm text-[color:var(--color-ink-soft)]">
            {featured.vibe}
          </p>
          <div className="overflow-hidden rounded-2xl border border-[color:var(--color-rule)] bg-black/5">
            <iframe
              title={`Spotify · ${featured.title}`}
              src={spotifyEmbed(featured.spotifyUri)}
              width="100%"
              height="380"
              frameBorder={0}
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <header className="mb-6 flex items-baseline justify-between">
          <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">
            More playlists
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-ink-mute)]">
            05
          </span>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {playlists
            .filter((p) => p.id !== featured.id)
            .map((p) => (
              <a
                key={p.id}
                href={spotifyShareUrl(p.spotifyUri)}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col gap-3 rounded-2xl border border-[color:var(--color-rule)] bg-[color:var(--color-cream)] p-5 transition-colors hover:border-[color:var(--color-music)]"
              >
                <iframe
                  title={`Spotify · ${p.title}`}
                  src={spotifyEmbed(p.spotifyUri)}
                  width="100%"
                  height="80"
                  frameBorder={0}
                  loading="lazy"
                  className="rounded-lg"
                />
                <div>
                  <h3 className="font-serif text-lg leading-tight">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-[color:var(--color-ink-soft)]">
                    {p.vibe}
                  </p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-[color:var(--color-ink-soft)]">
                  Open in Spotify <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </a>
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
