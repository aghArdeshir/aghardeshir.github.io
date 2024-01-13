import WaveSurfer from './wavesurfer.mjs';
import { songs } from './songs/songs.mjs';

const ANIMATION_DURATION = 0.3;
const CSS_TOP = '10px';
const CSS_NORMAL_FONT_SIZE = '18px';
const CSS_SMALL_FONT_SIZE = '0px';
const CSS_TRANSITION_ALL = `all ${ANIMATION_DURATION}s ease-out`;

const song = [
  songs.aghArdeshir.badAzBad,
  songs.nishkhand.sarbasteyeYekSarbaz,
  songs.aghArdeshir.tann4,
  songs.aghArdeshir.mordBaram,
  songs.aghArdeshir.gheshreKhakestari,
  songs.aghArdeshir.dogaanegi,
][5];

const lyrics = await (await fetch(song.lyricsUrl)).json();

document.querySelector('.cover-art').src = song.coverUrl;
document.querySelector('.title-persian').textContent = song.title;
document.querySelector('.artist-persian').textContent = song.artist;
document.body.style.color = song.textColor;

const backgroundContainerDom = document.querySelector('.background-container');
backgroundContainerDom.style.backgroundImage = `url("${song.coverUrl}")`;

const secondaryBackgroundDom = document.querySelector('.secondary-background');
secondaryBackgroundDom.style.backgroundColor = song.bgColor;

const lyricsDom = document.getElementById('lyrics');
const lyricsBackupDom = document.getElementById('lyrics-backup');

let lyricsText = '';
let lyricsBackupText = '';

function setLyricsText(text = '') {
  lyricsText = text;

  lyricsDom.style.transition = '';
  lyricsDom.style.top = '90px';
  lyricsDom.style.fontSize = CSS_SMALL_FONT_SIZE;
  lyricsDom.style.opacity = '0.5';

  lyricsDom.innerHTML = lyricsText;

  requestAnimationFrame(() => {
    lyricsDom.style.transition = CSS_TRANSITION_ALL;
    lyricsDom.style.top = CSS_TOP;
    lyricsDom.style.fontSize = CSS_NORMAL_FONT_SIZE;
    lyricsDom.style.opacity = '1';
  });
}

function setLyricsBackupText(text = '') {
  lyricsBackupText = text;

  lyricsBackupDom.style.transition = '';
  lyricsBackupDom.style.top = '50px';
  lyricsBackupDom.style.fontSize = CSS_NORMAL_FONT_SIZE;
  lyricsBackupDom.style.opacity = '1';

  lyricsBackupDom.innerHTML = lyricsBackupText;

  requestAnimationFrame(() => {
    lyricsBackupDom.style.transition = CSS_TRANSITION_ALL;
    lyricsBackupDom.style.top = CSS_TOP;
    lyricsBackupDom.style.fontSize = CSS_SMALL_FONT_SIZE;
    lyricsBackupDom.style.opacity = '0.5';
  });
}

const wavesurfer = WaveSurfer.create({
  container: '#waveform',
});

wavesurfer.load(song.songUrl);

let lastIndex = -1;

wavesurfer.on('audioprocess', function (currentTime) {
  const index =
    lyrics.findIndex(
      (member) => member.time - ANIMATION_DURATION >= currentTime
    ) - 1;

  if (index === lastIndex) {
    return;
  }

  lastIndex = index;

  if (index < 0) {
    lyricsDom.innerHTML = '';
    return;
  }

  const newLyricsText = lyrics[index].text;
  setLyricsText(newLyricsText);

  if (lyrics[index - 1]) {
    const newLyricsBackupText = lyrics[index - 1].text;
    setLyricsBackupText(newLyricsBackupText);
  }
});

document.addEventListener('click', () => {
  setTimeout(() => {
    wavesurfer.playPause();
  }, 1000);
});
