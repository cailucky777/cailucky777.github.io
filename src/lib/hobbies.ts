export type Hobby = {
  slug: "vinyl" | "kendo" | "ski" | "pilates";
  title: string;
  blurb: string;
  longBlurb: string;
  layout: "gallery" | "timeline";
  accent: string;
  badge: string;
};

export const hobbies: Hobby[] = [
  {
    slug: "vinyl",
    title: "Vinyl Shelf",
    blurb: "Records I bought, played, and built rituals around.",
    longBlurb:
      "A photographic catalog of every record on the shelf. Cover, label notes, where I bought it, and what it sounds like at 7pm.",
    layout: "gallery",
    accent: "#b88cd9",
    badge: "33⅓"
  },
  {
    slug: "kendo",
    title: "Kendo Notebook",
    blurb: "Dojo entries — what I drilled, what I learned, what hurt.",
    longBlurb:
      "A practice journal kept after each keiko. Footwork notes, sensei feedback, and the slow climb up the kyu and dan grades.",
    layout: "timeline",
    accent: "#5b6cff",
    badge: "剣"
  },
  {
    slug: "ski",
    title: "Ski Journal",
    blurb: "Mountains, conditions, lines I took (and ones I bailed on).",
    longBlurb:
      "Trip logs from Whistler, Cypress, Revelstoke and the BC interior. Snow report, vertical, and a few lines I'm trying to keep cleaner.",
    layout: "timeline",
    accent: "#6f9a6a",
    badge: "❄"
  },
  {
    slug: "pilates",
    title: "Pilates Log",
    blurb: "Reformer days. Form, focus, the spine that holds everything else.",
    longBlurb:
      "Reformer-by-reformer notes — what cues clicked, mobility wins, and a quiet weekly count.",
    layout: "timeline",
    accent: "#ff8a65",
    badge: "↻"
  }
];

export function findHobby(slug: string) {
  return hobbies.find((h) => h.slug === slug);
}
