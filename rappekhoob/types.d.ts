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
  coverArtUrl: string;
  links: ReleaseLinks;
};

type Single = {
  title: string;
  artists: Artist[];
  year: number;
  coverArtUrl: string;
  links: ReleaseLinks;
};

export { type Artist, type Album, type Single, type ReleaseLinks };