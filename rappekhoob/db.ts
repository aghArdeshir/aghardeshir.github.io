type Artist = {
  name: string;
};

type ReleaseLinks = {
  spotify?: string;
  youtube?: string;
  soundcloud?: string;
};

type Album = {
  title: string;
  artists: Artist[];
  year: number;
  links: ReleaseLinks;
};

type Single = {
  title: string;
  artists: Artist[];
  year: number;
  links: ReleaseLinks;
};

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
  links: {
    spotify: "https://open.spotify.com/album/0EzpP7WqNBKAMuzI7MQoGR",
    soundcloud: "https://soundcloud.com/mahdyar/sets/asphalt-jungle",
  },
};

const albumSadeghNashodBegam: Album = {
  title: "Nashod Begam",
  artists: [artistSadegh],
  year: 2023,
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
  links: {
    youtube: "https://www.youtube.com/watch?v=n7WeqZx4oqk",
  },
};

const goodSingles: Single[] = [singleSadeghSogandGhofl];

export { goodAlbums, goodSingles, type Album, type Single, type ReleaseLinks };