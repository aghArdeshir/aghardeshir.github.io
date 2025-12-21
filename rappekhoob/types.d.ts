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

export { type Artist, type Album, type Single, type ReleaseLinks };