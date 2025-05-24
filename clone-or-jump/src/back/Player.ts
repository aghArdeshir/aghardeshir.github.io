import { randomUUID } from "node:crypto";
import type { Socket } from "socket.io";
import { generateMessageInformPlayerId } from "../common/messageTypes.ts";

const playersMap = new Map<string, Player>();

export class Player {
  id: string;
  socket: Socket;

  constructor(id?: string) {
    this.id = id || randomUUID();
  }

  setSocket(setSocket: Socket) {
    this.socket = setSocket;
  }

  informId() {
    this.socket.emit("message", generateMessageInformPlayerId(this.id));
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
    player.setSocket(socket);
    playersMap.set(player.id, player);
    player.informId();
    playersMap.set(player.id, player);
    return player;
  }
}
