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

  card.style.backgroundImage = `radial-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url(${release.coverArtUrl})`;
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

  release.links.forEach((link) => {
    const listItemDom = document.createElement("li");
    links.appendChild(listItemDom);

    const anchorLinkDom = document.createElement("a");
    anchorLinkDom.setAttribute("target", "_blank");
    anchorLinkDom.href = link.url;
    anchorLinkDom.textContent = link.channel;
    if (link.isOfficial) {
      anchorLinkDom.textContent += " ✅";
      anchorLinkDom.setAttribute("title", "Official Artist Channel");
    }
    listItemDom.appendChild(anchorLinkDom);
  });

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
