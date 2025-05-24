import {
  generateMessageExistingPlayerJoined,
  generateMessageNewPlayerJoined,
} from "../common/messageTypes";
import { sendMessageToBack } from "./connection";
import { player } from "./Player";

document.body.style.backgroundColor = "black";
document.body.style.color = "white";

async function renderStartPage() {
  // 0. Show loading
  const loading = document.createElement("div");
  loading.innerText = "Loading...";
  document.body.appendChild(loading);

  // 1. Tell backend a player joined
  const playerId = player.getId();
  if (playerId) {
    sendMessageToBack(generateMessageExistingPlayerJoined(playerId));
  } else {
    sendMessageToBack(generateMessageNewPlayerJoined());
  }


}

renderStartPage();
