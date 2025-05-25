import { randomUUID } from "node:crypto";
import type { GameState } from "../common/messageTypes.ts";
import { Cell } from "./Cell.ts";
import type { Player } from "./Player.ts";

export const games: Game[] = [];

export class Game {
  id: string = randomUUID();
  private players: Player[] = [];
  state: "waitingForPlayers" | "playing" | "finished" = "waitingForPlayers";
  private cells = new Array(16).fill(null).map(() => new Cell());

  constructor() {
    games.push(this);
    this.arrangeCells();
  }

  arrangeCells(): void {

  }

  getPlayersCount(): number {
    return this.players.length;
  }

  addPlayer(player: Player): void {
    this.players.push(player);

    if (this.getPlayersCount() === 2) {
      this.state = "playing";
    }

    for (const player of this.players) {
      player.informGameState();
    }
  }

  serialize(): GameState {
    return {
      id: this.id,
      players: this.players.map((player) => player.id),
      state: this.state,
      cells: this.cells.map((cell) => cell.serialize()),
    };
  }
}
