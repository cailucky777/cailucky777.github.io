export type Playlist = {
  id: string;
  title: string;
  vibe: string;
  spotifyUri: string; // e.g. playlist/37i9dQZF1DX...
};

// Update spotifyUri to your actual playlist IDs.
// Format: "playlist/<id>" or "album/<id>" or "track/<id>".
export const playlists: Playlist[] = [
  {
    id: "late-bench-press",
    title: "Late Bench Press",
    vibe: "Strings, broken pianos, things that ache slowly.",
    spotifyUri: "playlist/37i9dQZF1DX4sWSpwq3LiO"
  },
  {
    id: "kendo-warmup",
    title: "Keiko Warm-Up",
    vibe: "Taiko, low brass, before the men is on.",
    spotifyUri: "playlist/37i9dQZF1DXdxcBWuJkbcy"
  },
  {
    id: "lift-off-the-mountain",
    title: "Lift Off the Mountain",
    vibe: "House for a 7-minute chair ride.",
    spotifyUri: "playlist/37i9dQZF1DX4dyzvuaRJ0n"
  }
];

export const featured = playlists[0];
