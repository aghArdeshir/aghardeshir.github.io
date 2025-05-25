import { randomUUID } from "node:crypto";
import type { Socket } from "socket.io";
import {
  generateMessageInformPlayerId,
  generateMessagePlayerReadyToPlay,
  isMessageRequestPlay,
} from "../common/messageTypes.ts";

const playersMap = new Map<string, Player>();

export class Player {
  id: string;
  socket: Socket;

  constructor(id?: string) {
    this.id = id || randomUUID();
  }

  setSocket(socket: Socket) {
    if (socket === this.socket) return;

    this.socket = socket;

    this.socket.on("message", (message) => {
      if (isMessageRequestPlay(message)) {
        console.log("i should createa game");
      }
    });
  }

  informId() {
    this.socket.emit("message", generateMessageInformPlayerId(this.id));
  }

  informReadyToPlay() {
    this.socket.emit("message", generateMessagePlayerReadyToPlay());
  }

  static getPlayerById(playerId: string): Player | undefined {
    const existingPlayer = playersMap.get(playerId);
    if (existingPlayer) return existingPlayer;
  }

  static createNewPlayer({
    socket,
    playerId,
  }: {
    socket: Socket;
    playerId?: string;
  }): Player {
    const player = new Player(playerId);
    playersMap.set(player.id, player);

    player.setSocket(socket);
    if (!playerId) {
      player.informId();
      player.informReadyToPlay();
    }

    return player;
  }
}
