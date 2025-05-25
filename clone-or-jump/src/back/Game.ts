import type { GameState } from "../common/messageTypes.ts";
import type { Player } from "./Player.ts";

export const games: Game[] = [];

export class Game {
  id: string = crypto.randomUUID();
  private players: Player[] = [];
  state: "waitingForPlayers" | "playing" | "finished" = "waitingForPlayers";

  constructor(player: Player) {
    games.push(this);
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
    };
  }
}
