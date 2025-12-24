import { Single } from "../types";
import { artists } from "./artists";

const Sadegh_Sogand_Ghofl: Single = {
  title: "Ghofl",
  artists: [artists.Sadegh, artists.Sogand],
  year: 2025,
  coverArtUrl:
    "https://i.scdn.co/image/ab67616d00001e02d64dfec7e53a90b51c62126c",
  links: [
    {
      url: "https://www.youtube.com/watch?v=n7WeqZx4oqk",
      channel: "YouTube",
      isOfficial: true,
    },
  ],
};

const goodSingles: Single[] = [Sadegh_Sogand_Ghofl];

goodSingles.sort(() => Math.random() - 0.5);

export { goodSingles };


// singles: (every artist that had albums of course, but also:)
//  yekii