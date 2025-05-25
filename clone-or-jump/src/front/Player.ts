import { generateMessageRequestPlay } from "../common/messageTypes";
import { sendMessageToBack } from "./connection";

class Player {
  getId() {
    return localStorage.getItem("playerId") ?? null;
  }

  setId(playerId: string) {
    localStorage.setItem("playerId", playerId);
  }

  requestPlay() {
    sendMessageToBack(generateMessageRequestPlay());
  }
}

export const player = new Player();
