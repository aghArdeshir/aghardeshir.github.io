import { randomUUID } from "node:crypto";
import type { Socket } from "socket.io";
import {
  generateMessageInformGameState,
  generateMessageInformPlayerId,
  generateMessagePlayerReadyToPlay,
  isMessageMove,
  isMessageRequestPlay,
} from "../common/messageTypes.ts";
import { Game, games } from "./Game.ts";
import type { PlayerId } from "../common/gameTypes.ts";

const playersMap = new Map<PlayerId, Player>();

export class Player {
  id: PlayerId;
  socket: Socket;
  game: Game;
  lastOnlineDate: Date | null = null;

  constructor(id?: PlayerId) {
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
      } else if (isMessageMove(message)) {
        this.game.move({
          playerId: this.id,
          sourceCellId: message.sourceCellId,
          targetCellId: message.targetCellId,
        });
      }
    });

    socket.on("ping", (ack) => {
      this.lastOnlineDate = new Date();
      const otherPlayer = this.game.players.find((p) => p.id !== this.id);
      ack({
        otherPlayerLastOnline: otherPlayer?.lastOnlineDate || null,
      });
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
      generateMessageInformGameState(this.game.serializeFor({playerId: this.id})),
    );
  }

  static getPlayerById(playerId: PlayerId): Player | undefined {
    const existingPlayer = playersMap.get(playerId);
    if (existingPlayer) return existingPlayer;
  }

  static createNewPlayer({
    socket,
    playerId,
  }: {
    socket: Socket;
    playerId?: PlayerId;
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
