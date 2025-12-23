import { Album } from "../types";
import { artists } from "./artists";

const Hichkas_JangaleAsfalt: Album = {
  title: "Jangale Asfalt",
  artists: [artists.hichkas],
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
  artists: [artists.sadegh],
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

export const goodAlbums: Album[] = [Hichkas_JangaleAsfalt, Sadegh_NashodBegam];
