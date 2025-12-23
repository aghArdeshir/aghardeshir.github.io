import { Album, Artist, Single } from "./types";

const artistHichkas: Artist = {
  name: "Hichkas",
};

const artistSadegh: Artist = {
  name: "Sadegh",
};

const artistSogand: Artist = {
  name: "Sogand",
};

const artists: Artist[] = [artistHichkas, artistSadegh];

const albumHichkasJangaleAsfalt: Album = {
  title: "Jangale Asfalt",
  artists: [artistHichkas],
  year: 2006,
  coverArtUrl: 'https://ia902902.us.archive.org/7/items/mbid-8b6a64b9-bf0b-45c8-a408-f4914f0e9cf8/__ia_thumb.jpg',
  links: {
    spotify: "https://open.spotify.com/album/0EzpP7WqNBKAMuzI7MQoGR",
    soundcloud: "https://soundcloud.com/mahdyar/sets/asphalt-jungle",
  },
};

const albumSadeghNashodBegam: Album = {
  title: "Nashod Begam",
  artists: [artistSadegh],
  year: 2023,
  coverArtUrl: 'https://i.scdn.co/image/ab67616d00001e02b31f3fbb63cab35e89bb5989',
  links: {
    spotify: "https://open.spotify.com/album/22C1OnNz1EvwYCEmrpBPxd",
    youtube:
      "https://www.youtube.com/playlist?list=PLtMUwssBNKDeI4TAH-dbqo8qHFfgb-jZW",
  },
};

const goodAlbums: Album[] = [albumHichkasJangaleAsfalt, albumSadeghNashodBegam];

const singleSadeghSogandGhofl: Single = {
  title: "Ghofl",
  artists: [artistSadegh, artistSogand],
  year: 2025,
  coverArtUrl: 'https://i.scdn.co/image/ab67616d00001e02d64dfec7e53a90b51c62126c',
  links: {
    youtube: "https://www.youtube.com/watch?v=n7WeqZx4oqk",
  },
};

const goodSingles: Single[] = [singleSadeghSogandGhofl];

export { goodAlbums, goodSingles };
