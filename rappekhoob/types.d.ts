type Artist = {
  name: string;
};

type ReleaseLink = {
  url: string;
  channel: 'Spotify' | 'YouTube' | 'SoundCloud';
  isOfficial: boolean;
};

type Album = {
  title: string;
  artists: Artist[];
  year: number | '????';
  coverArtUrl: string;
  links: ReleaseLink[];
};

type Single = {
  title: string;
  artists: Artist[];
  year: number;
  coverArtUrl: string;
  links: ReleaseLink[];
};

export { type Artist, type Album, type Single };
