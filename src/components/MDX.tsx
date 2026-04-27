import { MDXRemote } from "next-mdx-remote/rsc";

const components = {
  h1: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="mt-6 mb-3 font-serif text-3xl leading-tight tracking-tight"
      {...p}
    />
  ),
  h2: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-6 mb-2 font-serif text-2xl leading-tight tracking-tight"
      {...p}
    />
  ),
  h3: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-5 mb-2 font-serif text-xl leading-tight" {...p} />
  ),
  p: (p: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="my-3 text-[15px] leading-relaxed text-[color:var(--color-ink-soft)]"
      {...p}
    />
  ),
  ul: (p: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-3 space-y-1.5 pl-5 text-[15px] [list-style:disc]" {...p} />
  ),
  ol: (p: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="my-3 space-y-1.5 pl-5 text-[15px] [list-style:decimal]"
      {...p}
    />
  ),
  li: (p: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed text-[color:var(--color-ink-soft)]" {...p} />
  ),
  a: (p: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="underline decoration-[color:var(--color-ink-mute)] underline-offset-4 hover:decoration-[color:var(--color-ink)]"
      {...p}
    />
  ),
  blockquote: (p: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-4 border-l-2 border-[color:var(--color-rule)] pl-4 italic text-[color:var(--color-ink-soft)]"
      {...p}
    />
  ),
  code: (p: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded bg-[color:var(--color-cream)] px-1.5 py-0.5 font-mono text-[13px]"
      {...p}
    />
  ),
  hr: () => <hr className="my-6 border-[color:var(--color-rule)]" />
};

export function MDX({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
