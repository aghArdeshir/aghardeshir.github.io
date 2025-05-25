import {
  type GameState,
  type GameStateFinished,
  type GameStatePlaying,
  type GameStateWaitingForOtherPlayers,
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
  setTimeout(() => {
    console.log("DEBUG MODE: Requesting play automatically");
    player.requestPlay(); // in case the player is already ready
  }, 500);
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

function renderGameWaitingForPlayers(
  gameState: GameStateWaitingForOtherPlayers
) {
  const waitingMessage = document.createElement("div");
  waitingMessage.innerText = "Waiting for players to join...";
  document.body.appendChild(waitingMessage);
}

function renderGamePlaying(gameState: GameStatePlaying) {
  console.log("i should render the game", gameState);
  for (const cell of gameState.cells) {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.style.left = `${cell.x * 40}px`;
    cellDiv.style.top = `${cell.y * 40}px`;

    if (cell.ownerId) {
      if (cell.ownerId === player.getId()) {
        cellDiv.classList.add("my-cell");
        cellDiv.addEventListener("click", () => {
          document
            .querySelector(".selected-for-action")
            ?.classList.remove("selected-for-action");
          setTimeout(() => {
            cellDiv.classList.add("selected-for-action");
          });
        });
      } else {
        cellDiv.classList.add("enemy-cell");
      }
    }

    document.body.appendChild(cellDiv);
  }
}

function renderGameFinished(gameState: GameStateFinished) {}

renderStartPage();

document.addEventListener("click", () => {
  document.querySelector(".selected-for-action")?.classList.remove("selected-for-action");
});
