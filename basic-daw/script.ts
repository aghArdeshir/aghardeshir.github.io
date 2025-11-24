import { registerWebCompoenent_BasicdawTrack } from "./AudioTrackWebComponent.ts";
import { AudioTrack } from "./AudioTrack.ts";

window.basicdaw = {
  tracks: [],
  audioContext: new AudioContext(),
  deleteTrack(trackToDelete: AudioTrack) {
    trackToDelete.delete();
    this.tracks = this.tracks.filter((track) => track !== trackToDelete);
  },
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
  const track = new AudioTrack();
  track.setFile(file);
  window.basicdaw.tracks.push(track);
  track.renderUi(document.body);
}

registerWebCompoenent_BasicdawTrack();

drawGlobalPlayButton();
drawInsertSampleWavFileButton();

function drawGlobalPlayButton() {
  const playButton = document.createElement("button");
  playButton.textContent = "Play (global)";
  playButton.addEventListener("click", () => {
    window.basicdaw.audioContext.resume();
    window.basicdaw.tracks.forEach((track) => {
      track.play();
    });
  });

  document.body.appendChild(playButton);
}

function drawInsertSampleWavFileButton() {
  const insertSampleWavFileButton = document.createElement("button");
  insertSampleWavFileButton.textContent = "Insert Sample WAV File";
  insertSampleWavFileButton.addEventListener("click", insertSampleWavFile);
  document.body.appendChild(insertSampleWavFileButton);
}

function insertSampleWavFile() {
  const sampleWavFilePath = './sample-wav-file.wav';
  fetch(sampleWavFilePath)
    .then(response => response.blob())
    .then(blob => {
      const file = new File([blob], 'sample-wav-file.wav', { type: 'audio/wav' });
      createTrackFromDroppedFile(file);
    })
    .catch(error => {
      console.error('Error fetching sample WAV file:', error);
    });
}

insertSampleWavFile();
