import type { PlayerId } from "../common/gameTypes";
import { generateMessageRequestPlay } from "../common/messageTypes";
import { sendMessageToBack } from "./connection";
import { renderSelfLastOnline } from "./main";

class Player {
  private lastOnlineDate: Date | null = null;

  constructor() {
    setInterval(() => {
      if (this.lastOnlineDate) renderSelfLastOnline(this.lastOnlineDate);
    }, 1000);
  }

  getId() {
    return localStorage.getItem("playerId") ?? null;
  }

  setId(playerId: PlayerId) {
    localStorage.setItem("playerId", playerId);
  }

  requestPlay() {
    sendMessageToBack(generateMessageRequestPlay());
  }

  setLastPing(date: Date) {
    this.lastOnlineDate = date;
  }
}

export const player = new Player();
