import { goodAlbums } from "./db/albums";
import { goodSingles } from "./db/singles";
import { Album, Single } from "./types";

const root = document.createElement("div");
document.body.appendChild(root);

const albumsSection = document.createElement("section");
root.appendChild(albumsSection);

const albumsTitle = document.createElement("h1");
albumsTitle.textContent = "Albums";
albumsSection.appendChild(albumsTitle);

const albumsContainer = document.createElement("div");
albumsContainer.className = "albums-container";
albumsSection.appendChild(albumsContainer);

const singlesSection = document.createElement("section");
root.appendChild(singlesSection);

const singlesTitle = document.createElement("h1");
singlesTitle.textContent = "Singles";
singlesSection.appendChild(singlesTitle);

const singlesContainer = document.createElement("div");
singlesContainer.className = "singles-container";
singlesSection.appendChild(singlesContainer);

function createCard(release: Album | Single) {
  const card = document.createElement("div");
  card.className = "release-card";

  card.style.backgroundImage = `radial-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${release.coverArtUrl})`;
  card.style.backgroundSize = "cover";
  card.style.backgroundPosition = "center";

  const title = document.createElement("h2");
  title.textContent = release.title;
  card.appendChild(title);

  const artists = document.createElement("p");
  artists.textContent =
    "Artists: " + release.artists.map((artist) => artist.name).join(", ");
  card.appendChild(artists);

  const year = document.createElement("p");
  year.textContent = "Year: " + release.year;
  card.appendChild(year);

  const links = document.createElement("ul");
  links.textContent = "Links: ";

  if (release.links.spotify) {
    const spotify = document.createElement("li");
    const spotifyLink = document.createElement("a");
    spotifyLink.setAttribute("target", "_blank");
    spotifyLink.href = release.links.spotify;
    spotifyLink.textContent = "Spotify ";
    spotify.appendChild(spotifyLink);
    links.appendChild(spotify);
  }

  if (release.links.youtube) {
    const youtube = document.createElement("li");
    const youtubeLink = document.createElement("a");
    youtubeLink.setAttribute("target", "_blank");
    youtubeLink.href = release.links.youtube;
    youtubeLink.textContent = "YouTube ";
    youtube.appendChild(youtubeLink);
    links.appendChild(youtube);
  }

  if (release.links.soundcloud) {
    const soundcloud = document.createElement("li");
    const soundcloudLink = document.createElement("a");
    soundcloudLink.setAttribute("target", "_blank");
    soundcloudLink.href = release.links.soundcloud;
    soundcloudLink.textContent = "SoundCloud ";
    soundcloud.appendChild(soundcloudLink);
    links.appendChild(soundcloud);
  }

  card.appendChild(links);

  return card;
}

goodAlbums.forEach((album) => {
  const albumCard = createCard(album);
  albumsContainer.appendChild(albumCard);
});

goodSingles.forEach((single) => {
  const singleCard = createCard(single);
  singlesContainer.appendChild(singleCard);
});
