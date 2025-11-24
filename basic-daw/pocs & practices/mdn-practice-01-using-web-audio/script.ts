const audioContext = new AudioContext();
const audioElement = document.querySelector("audio");

console.log(audioContext.state);

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);

// track.connect(audioContext.destination);

const playPauseButton = document.querySelector("button");
playPauseButton.addEventListener("click", () => {
  console.log(audioContext.state);
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  setTimeout(() => {
    console.log(audioContext.state);
  }, 1000);

  if (playPauseButton.dataset.playing === "false") {
    audioElement.play();
    playPauseButton.dataset.playing = "true";
    playPauseButton.textContent = "Pause";
  } else if (playPauseButton.dataset.playing === "true") {
    audioElement.pause();
    playPauseButton.dataset.playing = "false";
    playPauseButton.textContent = "Play";
  }
});

audioElement.addEventListener("ended", () => {
  playPauseButton.dataset.playing = "false";
  playPauseButton.textContent = "Play";
});

// for (let i = 0; i < 20; i++) {
const gainNode = audioContext.createGain();
// track.connect(gainNode).connect(audioContext.destination);
// }

const volumeControlDom = document.getElementById("volume");
volumeControlDom.addEventListener("input", () => {
  gainNode.gain.value = volumeControlDom.value;
});

const panner = new StereoPannerNode(audioContext, { pan: 0 });

const pannerControlDom = document.getElementById("panner");
pannerControlDom.addEventListener("input", () => {
  panner.pan.value = pannerControlDom.value;
});

track.connect(gainNode);
gainNode.connect(panner);
panner.connect(audioContext.destination);
