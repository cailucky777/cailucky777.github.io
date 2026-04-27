import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints/common";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const DB = {
  vinyl: process.env.NOTION_DB_VINYL!,
  kendo: process.env.NOTION_DB_KENDO!,
  ski: process.env.NOTION_DB_SKI!,
  pilates: process.env.NOTION_DB_PILATES!,
} as const;

async function listPages(databaseId: string): Promise<PageObjectResponse[]> {
  const views = await notion.views.list({ database_id: databaseId });
  if (!views.results.length) return [];

  const viewId = views.results[0].id;
  const query = await notion.views.queries.create({ view_id: viewId });
  const pageIds = query.results.map((r) => r.id);

  const pages = await Promise.all(
    pageIds.map((id) => notion.pages.retrieve({ page_id: id }))
  );
  return pages.filter(
    (p): p is PageObjectResponse => p.object === "page" && "properties" in p
  );
}

async function pageMarkdown(pageId: string): Promise<string> {
  const res = await notion.pages.retrieveMarkdown({ page_id: pageId });
  return res.markdown;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function text(prop: any): string {
  if (!prop) return "";
  if (prop.type === "title") return prop.title?.map((t: any) => t.plain_text).join("") ?? "";
  if (prop.type === "rich_text") return prop.rich_text?.map((t: any) => t.plain_text).join("") ?? "";
  if (prop.type === "url") return prop.url ?? "";
  return "";
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function num(prop: any): number | undefined {
  return prop?.type === "number" ? (prop.number ?? undefined) : undefined;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dateStr(prop: any): string {
  return prop?.type === "date" ? (prop.date?.start ?? "") : "";
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function multiSelect(prop: any): string[] {
  return prop?.type === "multi_select" ? prop.multi_select.map((s: any) => s.name) : [];
}

export type VinylEntry = {
  slug: string;
  frontmatter: {
    title: string;
    artist: string;
    year?: number;
    label?: string;
    cover?: string;
    bought?: string;
    rating?: number;
  };
  body: string;
};

export type TimelineEntry = {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    location?: string;
    tags?: string[];
  };
  body: string;
};

export async function getVinylEntries(): Promise<VinylEntry[]> {
  const pages = await listPages(DB.vinyl);
  return Promise.all(
    pages.map(async (page) => {
      const p = page.properties;
      return {
        slug: page.id,
        frontmatter: {
          title: text(p.Name),
          artist: text(p.Artist),
          year: num(p.Year),
          label: text(p.Label) || undefined,
          cover: text(p.Cover) || undefined,
          bought: dateStr(p.Bought) || undefined,
          rating: num(p.Rating),
        },
        body: await pageMarkdown(page.id),
      };
    })
  );
}

export async function getTimelineEntries(
  collection: "kendo" | "ski" | "pilates"
): Promise<TimelineEntry[]> {
  const pages = await listPages(DB[collection]);
  return Promise.all(
    pages.map(async (page) => {
      const p = page.properties;
      return {
        slug: page.id,
        frontmatter: {
          title: text(p.Name),
          date: dateStr(p.Date),
          location: text(p.Location) || undefined,
          tags: multiSelect(p.Tags),
        },
        body: await pageMarkdown(page.id),
      };
    })
  );
}
