import {
  type GameState,
  generateMessageExistingPlayerJoined,
  generateMessageNewPlayerJoined,
} from "../common/messageTypes";
import { sendMessageToBack } from "./connection";
import { player } from "./Player";

document.body.style.backgroundColor = "black";
document.body.style.color = "white";

function clear() {
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }
}

async function renderStartPage() {
  clear();

  // 0. Show loading
  const loading = document.createElement("div");
  loading.innerText = "Loading...";
  document.body.appendChild(loading);

  // for some reason, the dev tools does not show complete logs of the socket
  // message exchanges. 🤷 but according to console.logs a full exchange is
  // happening. putting this small timeout fixes the issue at least on my
  // machine. keeping it here, so I have easier times debugging. and it does not
  // hurt the ux that much.
  await new Promise((resolve) => setTimeout(resolve, 10));

  // 1. Tell backend a player joined
  const playerId = player.getId();
  if (playerId) {
    sendMessageToBack(generateMessageExistingPlayerJoined(playerId));
  } else {
    sendMessageToBack(generateMessageNewPlayerJoined());
  }
}

export function showPlayButton() {
  clear();

  const playButton = document.createElement("button");
  playButton.innerText = "Play";
  playButton.onclick = () => {
    player.requestPlay();
  };
  document.body.appendChild(playButton);
}

export function renderGame(gameState: GameState) {
  clear();

  switch (gameState.state) {
    case "waitingForPlayers":
      renderGameWaitingForPlayers(gameState);
      break;
    case "playing":
      renderGamePlaying(gameState);
      break;
    case "finished":
      renderGameFinished(gameState);
      break;
  }
}

function renderGameWaitingForPlayers(gameState: GameState) {
  const waitingMessage = document.createElement("div");
  waitingMessage.innerText = "Waiting for players to join...";
  document.body.appendChild(waitingMessage);
}

function renderGamePlaying(gameState: GameState) {}

function renderGameFinished(gameState: GameState) {}

renderStartPage();
