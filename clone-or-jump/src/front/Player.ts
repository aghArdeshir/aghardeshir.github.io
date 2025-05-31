import type { PlayerId } from "../common/gameTypes";
import { generateMessageRequestPlay } from "../common/messageTypes";
import { sendMessageToBack } from "./connection";
import { renderSelfLastOnline } from "./main";

class Player {
  private lastOnlineDate: Date | null = null;
  private otherPlayerLastOnlineDate: Date | null = null;

  constructor() {
    setInterval(() => {
      if (this.lastOnlineDate)
        renderSelfLastOnline({
          selfLastOnlineDate: this.lastOnlineDate,
          otherPlayerLastOnlineDate: this.otherPlayerLastOnlineDate,
        });
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

  setLastPing({
    selfLastOnlineDate,
    otherPlayerLastOnlineDate,
  }: {
    selfLastOnlineDate: Date;
    otherPlayerLastOnlineDate: string | null;
  }) {
    this.lastOnlineDate = selfLastOnlineDate;
    if (otherPlayerLastOnlineDate) {
      this.otherPlayerLastOnlineDate = new Date(otherPlayerLastOnlineDate);
    }
  }
}

export const player = new Player();
