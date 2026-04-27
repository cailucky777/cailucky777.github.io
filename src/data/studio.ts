export type StudioItem = {
  slug: string;
  title: string;
  blurb: string;
  category: "stationery" | "hobonichi" | "links" | "merch";
  swatch: string;
  status: "drafting" | "coming-soon" | "stocked";
};

export const studioItems: StudioItem[] = [
  {
    slug: "uan-weekly-insert",
    title: "UAN Weekly Insert",
    blurb:
      "A2 weekly planner sheets — one quiet column for tasks, one for the rest of life.",
    category: "hobonichi",
    swatch: "#f0c8a4",
    status: "drafting"
  },
  {
    slug: "kendo-grid-cards",
    title: "Kendo Grid Cards",
    blurb:
      "Pocket-sized 5mm dot-grid cards for keiko notes — small enough to fit a bogu bag.",
    category: "stationery",
    swatch: "#a4b8d8",
    status: "drafting"
  },
  {
    slug: "vinyl-tracker",
    title: "Vinyl Tracker Sheet",
    blurb:
      "Single-page printable for cataloging your shelf — sleeve, label, condition, mood.",
    category: "stationery",
    swatch: "#c8b4d8",
    status: "drafting"
  },
  {
    slug: "stamp-set-001",
    title: "Stamp Set No. 001",
    blurb:
      "Six rubber stamps — milestones, weather, mood. Carved by hand, set in beech.",
    category: "merch",
    swatch: "#d8b4a4",
    status: "coming-soon"
  },
  {
    slug: "links-stationery-shops",
    title: "Stationery Shops I Trust",
    blurb:
      "A curated link garden — Tokyu Hands, Kakimori, Bungu Box, Yoseka, the corner shops worth the detour.",
    category: "links",
    swatch: "#b8d8b4",
    status: "stocked"
  },
  {
    slug: "links-hobonichi-hacks",
    title: "Hobonichi Hacks",
    blurb:
      "Templates, page tours, and ink/paper combinations that actually behave on Tomoe River.",
    category: "links",
    swatch: "#d8d4a4",
    status: "stocked"
  }
];

export const studioMeta = {
  studioName: "UanLearn Studio",
  byline:
    "A small paper studio I run on the side. Originals, planner inserts, and a link garden of the stationery I'd buy again.",
  shopUrl: "https://uanlearn.myshopify.com"
};
