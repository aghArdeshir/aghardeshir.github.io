import { randomUUID } from "node:crypto";
import type { Socket } from "socket.io";
import { generateMessageInformPlayerId } from "../common/messageTypes";

export class Player {
  id: string;
  socket: Socket;

  constructor() {
    this.id = randomUUID();
  }

  setSocket(setSocket: Socket) {
    this.socket = setSocket;
  }

  informId() {
    this.socket.emit("message", generateMessageInformPlayerId(this.id));
  }
}
