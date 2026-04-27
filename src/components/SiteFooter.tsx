import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative z-10 mx-auto w-full max-w-6xl px-6 py-10 text-xs text-[color:var(--color-ink-mute)]">
      <div className="flex flex-col gap-2 border-t border-[color:var(--color-rule)] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.shortName}. Made with attention.
        </p>
        <div className="flex gap-4">
          <a href={site.social.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={site.social.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`}>Email</a>
        </div>
      </div>
    </footer>
  );
}
