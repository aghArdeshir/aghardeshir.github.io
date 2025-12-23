import { Single } from "../types";
import { artists } from "./artists";

const singleSadeghSogandGhofl: Single = {
  title: "Ghofl",
  artists: [artists.sadegh, artists.sogand],
  year: 2025,
  coverArtUrl:
    "https://i.scdn.co/image/ab67616d00001e02d64dfec7e53a90b51c62126c",
  links: {
    youtube: "https://www.youtube.com/watch?v=n7WeqZx4oqk",
  },
};

export const goodSingles: Single[] = [singleSadeghSogandGhofl];
