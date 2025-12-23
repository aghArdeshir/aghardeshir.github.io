import { Album } from "../types";
import { artists } from "./artists";

const Hichkas_JangaleAsfalt: Album = {
  title: "Jangale Asfalt",
  artists: [artists.Hichkas, artists.Mahdyar],
  year: 2006,
  coverArtUrl:
    "https://ia902902.us.archive.org/7/items/mbid-8b6a64b9-bf0b-45c8-a408-f4914f0e9cf8/__ia_thumb.jpg",
  links: [
    {
      url: "https://open.spotify.com/album/0EzpP7WqNBKAMuzI7MQoGR",
      channel: "Spotify",
      isOfficial: true,
    },
    {
      url: "https://soundcloud.com/mahdyar/sets/asphalt-jungle",
      channel: "SoundCloud",
      isOfficial: true,
    },
  ],
};

const Sadegh_NashodBegam: Album = {
  title: "Nashod Begam",
  artists: [artists.Sadegh],
  year: 2023,
  coverArtUrl:
    "https://i.scdn.co/image/ab67616d00001e02b31f3fbb63cab35e89bb5989",
  links: [
    {
      url: "https://open.spotify.com/album/22C1OnNz1EvwYCEmrpBPxd",
      channel: "Spotify",
      isOfficial: true,
    },
    {
      url: "https://www.youtube.com/playlist?list=PLtMUwssBNKDeI4TAH-dbqo8qHFfgb-jZW",
      channel: "YouTube",
      isOfficial: true,
    },
  ],
};

const Bahram_Heech: Album = {
  title: "Heech",
  artists: [artists.Bahram],
  year: 2025,
  coverArtUrl:
    "https://i1.sndcdn.com/artworks-G0pFlPgSIzEDbw5y-sacW8Q-t500x500.jpg",
  links: [
    {
      url: "https://soundcloud.com/bahramnouraei/sets/heech",
      channel: "SoundCloud",
      isOfficial: true,
    },
  ],
};

const Bahram_Sokoot: Album = {
  title: "Sokoot",
  artists: [artists.Bahram],
  year: 2011,
  coverArtUrl:
    "https://i1.sndcdn.com/artworks-Ii20YbDXFAUuEvXK-Zqh2FQ-t500x500.jpg",
  links: [
    {
      channel: "SoundCloud",
      isOfficial: false,
      url: "https://soundcloud.com/bahramnouraeiarchive/sets/sokoot",
    },
  ],
};

const Bahram_24Saat: Album = {
  title: "24 Saat",
  artists: [artists.Bahram, artists.Atour],
  year: 2008,
  coverArtUrl:
    "https://i1.sndcdn.com/artworks-0LZNGXEczUdKJJq5-6VzJ6Q-t500x500.jpg",
  links: [
    {
      url: "https://soundcloud.com/bahramnouraeiarchive/sets/24-saat",
      channel: "SoundCloud",
      isOfficial: false,
    },
  ],
};

const Bahram_Sorena_KhooneKhorshid: Album = {
  title: "Khoone Khorshid",
  artists: [artists.Bahram, artists.Sorena],
  year: 2024,
  coverArtUrl:
    "https://i1.sndcdn.com/artworks-a5sK4KyTsuPqlrZV-VsASVQ-t500x500.jpg",
  links: [
    {
      url: "https://soundcloud.com/bahramnouraei/sets/khoonekhorshidep",
      channel: "SoundCloud",
      isOfficial: true,
    },
  ],
};

const Bahram_Khodha: Album = {
  title: "Khodha",
  artists: [artists.Bahram],
  year: 2023,
  coverArtUrl:
    "https://i1.sndcdn.com/artworks-LhbcrJ1yhaLs6Xt5-ZnkxBQ-t500x500.jpg",
  links: [
    {
      url: "https://soundcloud.com/bahramnouraei/sets/khodha",
      channel: "SoundCloud",
      isOfficial: true,
    },
  ],
};

const Bahram_Gozaar: Album = {
  title: "Gozaar",
  artists: [artists.Bahram],
  coverArtUrl:
    "https://i1.sndcdn.com/artworks-6ROTTModesHK8MNG-iTdytQ-t500x500.jpg",
  year: 2020,
  links: [
    {
      url: "https://soundcloud.com/bahramnouraei/sets/eiz8ykd6t6rk",
      channel: "SoundCloud",
      isOfficial: true,
    },
  ],
};

const Bahram_EshtebaheKhoob: Album = {
  title: "Eshtebahe Khoob",
  artists: [artists.Bahram],
  coverArtUrl:
    "https://i1.sndcdn.com/artworks-nmfqCUJsH6V82gOd-rZRn6w-t500x500.jpg",
  year: 2015,
  links: [
    {
      url: "https://soundcloud.com/bahramnouraei/sets/eshtebahe-khoob",
      channel: "SoundCloud",
      isOfficial: true,
    },
  ],
};

const goodAlbums: Album[] = [
  Bahram_EshtebaheKhoob,
  Bahram_Gozaar,
  Bahram_Khodha,
  Bahram_Sorena_KhooneKhorshid,
  Bahram_24Saat,
  Bahram_Heech,
  Bahram_Sokoot,
  Hichkas_JangaleAsfalt,
  Sadegh_NashodBegam,
];

goodAlbums.sort(() => Math.random() - 0.5);

export { goodAlbums };

// TODO:
// check all bahram reposts, sadegh, sorena, sayf, yekii, hichkas, pishro, owj, ghadar, all their albums, playlists, reposts
// sogand zakhmi atour rez navid bamdad kaboos daygard hidden hamzad yaserbinam eblis/hosein epicure shayea, sciah/tahamtan, aghardeshir
// every artist I follow on soundcloud
// arash lavar