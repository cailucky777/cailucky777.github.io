import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type ContentEntry<T = Record<string, unknown>> = {
  slug: string;
  body: string;
  frontmatter: T;
};

export async function readCollection<T = Record<string, unknown>>(
  collection: string
): Promise<ContentEntry<T>[]> {
  const dir = path.join(CONTENT_ROOT, collection);
  let files: string[];
  try {
    files = await fs.readdir(dir);
  } catch {
    return [];
  }
  const entries = await Promise.all(
    files
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(dir, file), "utf8");
        const { data, content } = matter(raw);
        return {
          slug: file.replace(/\.(mdx|md)$/, ""),
          body: content,
          frontmatter: data as T
        };
      })
  );
  return entries;
}

export async function readEntry<T = Record<string, unknown>>(
  collection: string,
  slug: string
): Promise<ContentEntry<T> | null> {
  const candidates = [".mdx", ".md"];
  for (const ext of candidates) {
    try {
      const raw = await fs.readFile(
        path.join(CONTENT_ROOT, collection, `${slug}${ext}`),
        "utf8"
      );
      const { data, content } = matter(raw);
      return { slug, body: content, frontmatter: data as T };
    } catch {
      // try next
    }
  }
  return null;
}
