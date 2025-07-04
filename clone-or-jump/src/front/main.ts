import type { PlayerId } from "../common/gameTypes";
import {
  type GameState,
  type GameStateCell,
  type GameStateFinished,
  type GameStatePlaying,
  type GameStateWaitingForOtherPlayers,
  generateMessageExistingPlayerJoined,
  generateMessageMove,
  generateMessageNewPlayerJoined,
} from "../common/messageTypes";
import { ping, sendMessageToBack } from "./connection";
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
  loading.dataset.testid = "loading";
  loading.innerText = "Loading...";
  document.body.appendChild(loading);

  // for some reason, the dev tools does not show complete logs of the socket
  // message exchanges. 🤷 but according to console.logs a full exchange is
  // happening. putting this small timeout fixes the issue at least on my
  // machine. keeping it here, so I have easier times debugging. and it does not
  // hurt the ux that much.
  // plus (it may sound weird), but I also want to assert the loading in the
  // tests, so I need to wait for a bit before the loading is removed.
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 1. Tell backend a player joined
  const playerId = player.getId();
  if (playerId) {
    sendMessageToBack(generateMessageExistingPlayerJoined(playerId));
  } else {
    sendMessageToBack(generateMessageNewPlayerJoined());
  }

  // 2. Start pinging backend to get online status
  ping();
}

export function showPlayButton() {
  clear();

  const playButton = document.createElement("button");
  playButton.dataset.testid = "play-button";
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
      // we don't clear, so we can see the game
      renderGameFinished(gameState);
      break;
  }
}

function renderGameWaitingForPlayers(
  gameState: GameStateWaitingForOtherPlayers
) {
  const waitingMessage = document.createElement("div");
  waitingMessage.dataset.testid = "waiting-for-players";
  waitingMessage.innerText = "Waiting for players to join...";
  document.body.appendChild(waitingMessage);
}

function renderGamePlaying(gameState: GameStatePlaying) {
  if (gameState.turnPlayerId === player.getId()) {
    document.body.classList.add("player-turn");
  } else {
    document.body.classList.remove("player-turn");
  }

  renderGameCells(gameState.cells, gameState.turnPlayerId);
}

function renderGameCells(cells: GameStateCell[], turnPlayerId?: PlayerId) {
  let gameBoardDom: HTMLDivElement | null =
    document.querySelector(".game-board");
  if (gameBoardDom) gameBoardDom.remove();

  gameBoardDom = document.createElement("div");
  gameBoardDom.classList.add("game-board");
  gameBoardDom.dataset.testid = "game-board";
  gameBoardDom.style.position = "absolute";
  gameBoardDom.style.width = "200px";
  gameBoardDom.style.height = "200px";
  document.body.appendChild(gameBoardDom);

  for (const cell of cells) {
    const cellDiv = document.createElement("div");

    cellDiv.classList.add("cell");
    cellDiv.style.left = `${cell.x * 40}px`;
    cellDiv.style.top = `${cell.y * 40}px`;

    cellDiv.dataset.cellId = cell.id;
    cellDiv.dataset.x = cell.x.toString();
    cellDiv.dataset.y = cell.y.toString();

    if (cell.ownerId) {
      cellDiv.dataset.ownerId = cell.ownerId;

      if (cell.ownerId === player.getId()) {
        cellDiv.classList.add("my-cell");
        cellDiv.dataset.testid = "my-cell";
        if (turnPlayerId === player.getId()) {
          cellDiv.addEventListener("click", () => {
            setTimeout(() => {
              // setTimeout, because the other click handler on document body
              // removes the class immediately, we wait and then add the class
              cellDiv.classList.add("selected-for-action");
              renderTargets();
            });
          });
        }
      } else {
        cellDiv.classList.add("enemy-cell");
        cellDiv.dataset.testid = "enemy-cell";
      }
    } else {
      cellDiv.dataset.testid = "empty-cell";
    }

    gameBoardDom.appendChild(cellDiv);
  }
}

function renderGameFinished(gameState: GameStateFinished) {
  renderGameCells(gameState.cells);
  document.body.classList.remove("player-turn");
  const gameFinishedMessageDom = document.createElement("div");
  gameFinishedMessageDom.dataset.testid = "game-finished";
  gameFinishedMessageDom.innerText = "Game finished!";
  document.body.appendChild(gameFinishedMessageDom);

  if (gameState.playerStatus === "win") {
    const winMessage = document.createElement("div");
    winMessage.dataset.testid = "you-won";
    winMessage.innerText = "You won!";
    document.body.appendChild(winMessage);
  } else if (gameState.playerStatus === "lose") {
    const loseMessage = document.createElement("div");
    loseMessage.dataset.testid = "you-lost";
    loseMessage.innerText = "You lost!";
    document.body.appendChild(loseMessage);
  } else if (gameState.playerStatus === "draw") {
    const drawMessage = document.createElement("div");
    drawMessage.innerText = "It's a draw!";
    document.body.appendChild(drawMessage);
  }

  const playAgainButton = document.createElement("button");
  playAgainButton.dataset.testid = "play-again-button";
  playAgainButton.style.position = "relative";
  playAgainButton.style.left = "200px";
  playAgainButton.innerText = "Play Again";
  playAgainButton.onclick = () => {
    player.requestPlay();
  };
  document.body.appendChild(playAgainButton);
}

function renderTargets() {
  const selectedCell = document.querySelector(".selected-for-action");
  if (!(selectedCell instanceof HTMLDivElement)) return; // to shut up TS

  const x = Number.parseInt(selectedCell.dataset.x || "0");
  const y = Number.parseInt(selectedCell.dataset.y || "0");
  const possibleTargetCoordinates = [
    // adjacent
    { x: x - 1, y },
    { x: x + 1, y },
    { x, y: y - 1 },
    { x, y: y + 1 },

    // two cells away
    { x: x - 2, y },
    { x: x + 2, y },
    { x, y: y - 2 },
    { x, y: y + 2 },
  ];

  const availableTargetCoordinates = possibleTargetCoordinates.filter(
    (coord) => {
      const cell = document.querySelector(
        `.cell[data-x="${coord.x}"][data-y="${coord.y}"]`
      );

      if (!cell) return false;
      if (cell.getAttribute("data-owner-id")) return false;

      return true;
    }
  );

  for (const coord of availableTargetCoordinates) {
    const targetCell = document.querySelector(
      `.cell[data-x="${coord.x}"][data-y="${coord.y}"]`
    );

    if (!(targetCell instanceof HTMLDivElement)) continue; // to shut up TS

    targetCell.classList.add("target-cell");

    const isTwoBlocksAway =
      Math.abs(coord.x - x) === 2 || Math.abs(coord.y - y) === 2;

    if (isTwoBlocksAway) {
      targetCell.classList.add("two-blocks-away");
      targetCell.setAttribute("available-jump", "true");
    } else {
      targetCell.setAttribute("available-clone", "true");
    }
  }
}

renderStartPage();

document.addEventListener("click", ({ target }) => {
  if (target instanceof HTMLDivElement) {
    if (target.classList.contains("cell")) {
      if (target.classList.contains("target-cell")) {
        const sourceCellId = document
          .querySelector(".selected-for-action")
          ?.getAttribute("data-cell-id");
        const targetCellId = target.dataset.cellId;

        if (sourceCellId && targetCellId) {
          sendMessageToBack(generateMessageMove(sourceCellId, targetCellId));
        }
      }
    }
  }

  document
    .querySelector(".selected-for-action")
    ?.classList.remove("selected-for-action");
  for (const targetCell of document.querySelectorAll(".target-cell")) {
    targetCell.classList.remove("target-cell");
    targetCell.classList.remove("two-blocks-away");
  }
});

export function renderSelfLastOnline({
  selfLastOnlineDate,
  otherPlayerLastOnlineDate,
}: {
  selfLastOnlineDate: Date | null;
  otherPlayerLastOnlineDate: Date | null;
}) {
  if (selfLastOnlineDate) {
    // SELF
    const selfLastOnlineSecondsAgo =
      new Date().getTime() - selfLastOnlineDate.getTime();

    const isSelfLastOnlineLessThan_3_seconds = selfLastOnlineSecondsAgo < 3000;
    const isSelfLastOnlineLessThan_5_seconds = selfLastOnlineSecondsAgo < 5000;

    const selfLastOnlineDom: HTMLDivElement =
      document.querySelector(".self-last-online") ||
      document.createElement("div");
    selfLastOnlineDom.classList.remove("online", "connecting", "offline"); // clear previous status classes
    selfLastOnlineDom.classList.add("self-last-online");
    selfLastOnlineDom.innerHTML = ""; // clear previous content

    const selfStatusCircleDom = document.createElement("div");
    selfStatusCircleDom.classList.add("self-status-circle");
    selfLastOnlineDom.appendChild(selfStatusCircleDom);

    const selfStatusTextDom = document.createTextNode("");
    selfLastOnlineDom.appendChild(selfStatusTextDom);

    if (isSelfLastOnlineLessThan_3_seconds) {
      selfLastOnlineDom.classList.add("online");
      selfStatusTextDom.textContent = "Self: Online";
      selfLastOnlineDom.dataset.testid = "self-status-online";
    } else if (isSelfLastOnlineLessThan_5_seconds) {
      selfLastOnlineDom.classList.add("connecting");
      selfStatusTextDom.textContent = "Self: Connecting...";
    } else {
      selfLastOnlineDom.classList.add("offline");
      selfStatusTextDom.textContent = "Self: Offline";
    }

    document.body.appendChild(selfLastOnlineDom);
  }

  if (otherPlayerLastOnlineDate) {
    // OTHER PLAYER
    const otherPlayerLastOnlineSecondsAgo =
      new Date().getTime() - otherPlayerLastOnlineDate.getTime();
    const isOtherPlayerLastOnlineLessThan_3_seconds =
      otherPlayerLastOnlineSecondsAgo < 3000;
    const isOtherPlayerLastOnlineLessThan_5_seconds =
      otherPlayerLastOnlineSecondsAgo < 5000;

    const otherPlayerLastOnlineDom: HTMLDivElement =
      document.querySelector(".other-player-last-online") ||
      document.createElement("div");
    otherPlayerLastOnlineDom.classList.remove(
      "online",
      "connecting",
      "offline"
    ); // clear previous status classes

    otherPlayerLastOnlineDom.classList.add("other-player-last-online");
    otherPlayerLastOnlineDom.innerHTML = ""; // clear previous content

    const otherPlayerStatusCircleDom = document.createElement("div");
    otherPlayerStatusCircleDom.classList.add("other-player-status-circle");
    otherPlayerLastOnlineDom.appendChild(otherPlayerStatusCircleDom);

    const otherPlayerStatusTextDom = document.createTextNode("");
    otherPlayerLastOnlineDom.appendChild(otherPlayerStatusTextDom);

    if (isOtherPlayerLastOnlineLessThan_3_seconds) {
      otherPlayerLastOnlineDom.classList.add("online");
      otherPlayerLastOnlineDom.dataset.testid = "other-player-status-online";
      otherPlayerStatusTextDom.textContent = "Other Player: Online";
    } else if (isOtherPlayerLastOnlineLessThan_5_seconds) {
      otherPlayerLastOnlineDom.classList.add("connecting");
      otherPlayerStatusTextDom.textContent = "Other Player: Connecting...";
    } else {
      otherPlayerLastOnlineDom.classList.add("offline");
      otherPlayerStatusTextDom.textContent = "Other Player: Offline";
    }

    document.body.appendChild(otherPlayerLastOnlineDom);
  }
}
