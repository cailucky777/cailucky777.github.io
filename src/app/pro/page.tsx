import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/lib/site";
import {
  education,
  experience,
  now,
  projects,
  skills
} from "@/data/pro";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects, experience, and skills."
};

export default function ProPage() {
  return (
    <main className="relative z-10 min-h-screen">
      <SectionNav active="pro" />

      <section className="mx-auto w-full max-w-6xl px-6 pt-10 pb-16 sm:pt-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[200px_1fr] md:items-start">
          <div className="relative h-44 w-44 overflow-hidden rounded-2xl border border-[color:var(--color-rule)] bg-[color:var(--color-cream)]">
            <Image
              src="/profile.png"
              alt={site.name}
              fill
              sizes="200px"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-ink-mute)]">
              01 — The Professional Me
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
              Savina (Luying) Cai
            </h1>
            <p className="mt-3 text-lg text-[color:var(--color-ink-soft)]">
              Full-Stack AI Engineer · ML Researcher · CS Educator. I ship
              LLM-powered products and end-to-end ML systems — from the data
              pipeline to the UI.
            </p>
            <p className="mt-3 text-sm text-[color:var(--color-ink-mute)]">
              Currently in Vancouver, open to{" "}
              <span className="text-[color:var(--color-ink)]">
                Full-Stack AI Engineer · ML Engineer · SDE
              </span>{" "}
              roles.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <a
                href={site.social.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-rule)] px-4 py-2 transition-colors hover:border-[color:var(--color-ink)]"
              >
                GitHub <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-rule)] px-4 py-2 transition-colors hover:border-[color:var(--color-ink)]"
              >
                LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Section title="Now" eyebrow="02">
        <ol className="space-y-4">
          {now.map((item) => (
            <li
              key={item.date}
              className="grid grid-cols-1 gap-4 border-t border-[color:var(--color-rule)] pt-4 md:grid-cols-[200px_1fr]"
            >
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)]">
                {item.date}
              </div>
              <p className="text-sm leading-relaxed">{item.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Experience" eyebrow="03">
        <ol className="space-y-6">
          {experience.map((e) => (
            <li
              key={`${e.org}-${e.period}`}
              className="grid grid-cols-1 gap-4 border-t border-[color:var(--color-rule)] pt-6 md:grid-cols-[200px_1fr]"
            >
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)]">
                {e.period}
              </div>
              <div>
                <h3 className="font-serif text-xl leading-tight">{e.role}</h3>
                <p className="mt-1 text-sm text-[color:var(--color-ink-soft)]">
                  {e.org}
                  {e.location ? ` · ${e.location}` : ""}
                </p>
                <ul className="mt-3 space-y-2 text-sm text-[color:var(--color-ink-soft)]">
                  {e.bullets.map((b) => (
                    <li key={b} className="leading-relaxed">
                      — {b}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Selected Projects" eyebrow="04">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.slug}
              className="flex flex-col gap-4 rounded-2xl border border-[color:var(--color-rule)] bg-[color:var(--color-cream)] p-6 transition-colors hover:border-[color:var(--color-pro)]"
            >
              <header className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)]">
                    {p.period}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl leading-tight">
                    {p.title}
                  </h3>
                </div>
                {p.status && (
                  <span className="rounded-full border border-[color:var(--color-rule)] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)]">
                    {p.status}
                  </span>
                )}
              </header>
              <p className="text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
                {p.summary}
              </p>
              <ul className="space-y-1.5 text-sm text-[color:var(--color-ink-soft)]">
                {p.highlights.map((h) => (
                  <li key={h}>— {h}</li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-[color:var(--color-rule)] px-2.5 py-1 text-[11px] text-[color:var(--color-ink-soft)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-[color:var(--color-pro)]"
                  >
                    View <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Toolbox" eyebrow="05">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {skills.map((s) => (
            <div key={s.group}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-ink-mute)]">
                {s.group}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {s.items.map((i) => (
                  <li
                    key={i}
                    className="rounded-full border border-[color:var(--color-rule)] bg-[color:var(--color-cream)] px-3 py-1 text-xs"
                  >
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Education" eyebrow="06">
        <ul className="space-y-4">
          {education.map((e) => (
            <li
              key={e.school}
              className="flex flex-col justify-between gap-1 rounded-2xl border border-[color:var(--color-rule)] bg-[color:var(--color-cream)] p-5 sm:flex-row sm:items-center"
            >
              <div>
                <p className="font-serif text-lg leading-tight">{e.degree}</p>
                <p className="text-sm text-[color:var(--color-ink-soft)]">
                  {e.school}
                </p>
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)]">
                {e.period}
              </p>
            </li>
          ))}
        </ul>
      </Section>

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

function Section({
  title,
  eyebrow,
  children
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-16">
      <header className="mb-6 flex items-baseline justify-between">
        <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">
          {title}
        </h2>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-ink-mute)]">
          {eyebrow}
        </span>
      </header>
      {children}
    </section>
  );
}
