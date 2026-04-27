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
    id: "mrs-green-apple-radio",
    title: "Mrs. GREEN APPLE Radio",
    vibe: "Japanese pop-rock and whatever the algorithm thinks I need next.",
    spotifyUri: "playlist/37i9dQZF1E4EFxbqxoXbdY"
  },
  {
    id: "j-pop-hits",
    title: "J-Pop Hits",
    vibe: "86 tracks of J-Pop for the commute, the gym, the everything.",
    spotifyUri: "playlist/37i9dQZF1DXdbRLJPSmnyq"
  },
  {
    id: "van-gogh-soundtrack",
    title: "Beyond Van Gogh: The Immersive Experience",
    vibe: "15 songs selected for a room full of swirling paintings.",
    spotifyUri: "playlist/0o9CxXVDyDHqZ33cNEhUp5"
  },
  {
    id: "murakami-vinyl",
    title: "Haruki Murakami's Vinyl Collection",
    vibe: "3,500 records. Jazz, classical, and the music Murakami writes to.",
    spotifyUri: "playlist/7LxqhxqClpyc76C85V7Zs2"
  }
];

export const featured = playlists[0];
