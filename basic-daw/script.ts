import { registerWebCompoenent_OdTrack } from "./OdTrack.ts";
import { Track } from "./Track.ts";

window.opendaw = {
  tracks: [],
};

const colorPallete = {
  text: "#fffcf2",
  lightgray: "#ccc5b9",
  darkgray: "#403d39",
  bg: "#252422",
  orange: "#eb5e28",
};

document.body.style.backgroundColor = colorPallete.bg;
document.body.style.color = colorPallete.text;

const supportedAudioMimeTypes = ["audio/wav"];

function setupDragDrop() {
  window.addEventListener("dragenter", (event) => {
    // TODO: show a dropzone
  });

  window.addEventListener("dragleave", (event) => {
    // TODO: hide the dropzone
  });

  window.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  window.addEventListener("drop", (event) => {
    event.preventDefault();

    const draggedItems = event.dataTransfer?.items ?? [];

    Array.from(draggedItems).forEach((item) => {
      if (item.kind === "file" && supportedAudioMimeTypes.includes(item.type)) {
        const file = item.getAsFile();

        if (file) {
          createTrackFromDroppedFile(file);
        }
      }
    });
  });
}

setupDragDrop();

function createTrackFromDroppedFile(file: File) {
  const track = new Track();
  track.setFile(file);
  window.opendaw.tracks.push(track);

  const odTrack = document.createElement("od-track");
  odTrack.setAttribute(
    "data-track-index",
    String(window.opendaw.tracks.length - 1)
  );
  document.body.appendChild(odTrack);
}

registerWebCompoenent_OdTrack();

drawGlobalPlayButton();

function drawGlobalPlayButton() {
  const playButton = document.createElement("button");
  playButton.textContent = "Play (global)";
  playButton.addEventListener("click", () => {
    window.opendaw.tracks.forEach((track) => {
      track.play();
    });
  });

  document.body.appendChild(playButton);
}
