import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";
import { MDX } from "@/components/MDX";
import { hobbies, findHobby } from "@/lib/hobbies";
import { getVinylEntries, getTimelineEntries } from "@/lib/notion";

export const revalidate = 3600;


export function generateStaticParams() {
  return hobbies.map((h) => ({ hobby: h.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ hobby: string }>;
}): Promise<Metadata> {
  const { hobby } = await params;
  const h = findHobby(hobby);
  if (!h) return {};
  return { title: h.title, description: h.blurb };
}

export default async function HobbyPage({
  params
}: {
  params: Promise<{ hobby: string }>;
}) {
  const { hobby } = await params;
  const h = findHobby(hobby);
  if (!h) notFound();

  return (
    <main className="relative z-10 min-h-screen">
      <SectionNav active="life" />

      <section className="mx-auto w-full max-w-6xl px-6 pt-10 pb-12 sm:pt-16">
        <Link
          href="/life"
          className="text-sm text-[color:var(--color-ink-mute)] underline-offset-4 hover:text-[color:var(--color-ink)] hover:underline"
        >
          ← All notebooks
        </Link>
        <div className="mt-6 flex items-baseline gap-4">
          <span
            className="font-serif text-3xl"
            style={{ color: h.accent }}
            aria-hidden
          >
            {h.badge}
          </span>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-ink-mute)]">
            /life/{h.slug}
          </p>
        </div>
        <h1 className="mt-3 font-serif text-4xl leading-tight tracking-tight sm:text-6xl">
          {h.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[color:var(--color-ink-soft)]">
          {h.longBlurb}
        </p>
      </section>

      {h.layout === "gallery" ? (
        <VinylGallery accent={h.accent} />
      ) : (
        <Timeline collection={h.slug as "kendo" | "ski" | "pilates"} accent={h.accent} />
      )}

      <SiteFooter />
    </main>
  );
}

async function VinylGallery({ accent }: { accent: string }) {
  const records = await getVinylEntries();

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-20">
      {records.length === 0 ? (
        <EmptyState
          message="The shelf is dusted but empty here. Drop your first .mdx into content/vinyl/."
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {records.map((r) => (
            <article
              key={r.slug}
              className="group overflow-hidden rounded-xl border border-[color:var(--color-rule)] bg-[color:var(--color-cream)] transition-colors"
              style={
                { "--tile-accent": accent } as React.CSSProperties
              }
            >
              <div className="relative aspect-square w-full bg-[color:var(--color-rule)]">
                {r.frontmatter.cover ? (
                  <Image
                    src={r.frontmatter.cover}
                    alt={`${r.frontmatter.title} — ${r.frontmatter.artist}`}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-serif text-3xl text-[color:var(--color-ink-mute)]">
                    33⅓
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-serif text-base leading-tight">
                  {r.frontmatter.title}
                </h3>
                <p className="mt-1 text-xs text-[color:var(--color-ink-soft)]">
                  {r.frontmatter.artist}
                  {r.frontmatter.year ? ` · ${r.frontmatter.year}` : ""}
                </p>
                {r.frontmatter.label && (
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)]">
                    {r.frontmatter.label}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

async function Timeline({
  collection,
  accent
}: {
  collection: "kendo" | "ski" | "pilates";
  accent: string;
}) {
  const entries = await getTimelineEntries(collection);

  return (
    <section className="mx-auto w-full max-w-3xl px-6 pb-20">
      {entries.length === 0 ? (
        <EmptyState
          message={`No entries yet. Drop your first .mdx into content/${collection}/.`}
        />
      ) : (
        <ol className="relative space-y-10 border-l border-[color:var(--color-rule)] pl-6">
          {entries.map((e) => (
            <li key={e.slug} className="relative">
              <span
                className="absolute -left-[27px] top-2 h-2.5 w-2.5 rounded-full ring-2 ring-[color:var(--color-paper)]"
                style={{ background: accent }}
                aria-hidden
              />
              <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <time className="font-mono text-xs uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)]">
                  {e.frontmatter.date}
                </time>
                {e.frontmatter.location && (
                  <span className="text-xs text-[color:var(--color-ink-mute)]">
                    · {e.frontmatter.location}
                  </span>
                )}
              </header>
              <h2 className="mt-1 font-serif text-2xl leading-tight">
                {e.frontmatter.title}
              </h2>
              {e.frontmatter.tags && e.frontmatter.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {e.frontmatter.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[color:var(--color-rule)] px-2.5 py-0.5 text-[11px] text-[color:var(--color-ink-soft)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-3">
                <MDX source={e.body} />
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[color:var(--color-rule)] bg-[color:var(--color-cream)] p-10 text-center">
      <p className="font-serif text-xl">Coming soon</p>
      <p className="mt-2 text-sm text-[color:var(--color-ink-soft)]">
        {message}
      </p>
      <a
        href="https://github.com/cailucky777/cailucky777.github.io"
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-1 text-xs font-medium"
      >
        Authoring guide <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
