import Link from "next/link";
import { site } from "@/lib/site";

const sections = [
  { href: "/pro", label: "Pro" },
  { href: "/life", label: "Life" },
  { href: "/studio", label: "Studio" },
  { href: "/music", label: "Music" }
];

export function SectionNav({ active }: { active?: string }) {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
      <Link
        href="/"
        className="font-serif text-lg font-medium tracking-tight"
      >
        {site.shortName}
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className={`transition-colors hover:text-[color:var(--color-ink)] ${
              active === s.label.toLowerCase()
                ? "text-[color:var(--color-ink)]"
                : "text-[color:var(--color-ink-mute)]"
            }`}
          >
            {s.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
