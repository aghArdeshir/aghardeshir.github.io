import { randomUUID } from "node:crypto";
import type { Socket } from "socket.io";
import {
  generateMessageInformGameState,
  generateMessageInformPlayerId,
  generateMessagePlayerReadyToPlay,
  isMessageRequestPlay,
} from "../common/messageTypes.ts";
import { Game, games } from "./Game.ts";

const playersMap = new Map<string, Player>();

export class Player {
  id: string;
  socket: Socket;
  game: Game;

  constructor(id?: string) {
    this.id = id || randomUUID();
  }

  setSocket(socket: Socket) {
    if (socket === this.socket) return;

    if (this.socket) this.cleanupExistingSocket();

    this.socket = socket;

    this.socket.on("message", (message) => {
      if (isMessageRequestPlay(message)) {
        const existingGame = games.find((game) => game.getPlayersCount() === 1);
        if (existingGame) {
          this.game = existingGame;
        } else {
          this.game = new Game();
        }

        this.game.addPlayer(this);
      }
    });
  }

  cleanupExistingSocket() {
    this.socket.removeAllListeners("message");
    this.socket.disconnect();
  }

  informId() {
    this.socket.emit("message", generateMessageInformPlayerId(this.id));
  }

  informReadyToPlay() {
    this.socket.emit("message", generateMessagePlayerReadyToPlay());
  }

  informGameState() {
    this.socket.emit(
      "message",
      generateMessageInformGameState(this.game.serialize())
    );
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
