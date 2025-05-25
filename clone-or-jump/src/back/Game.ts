import type { GameState } from "../common/messageTypes.ts";
import type { Player } from "./Player.ts";

export class Game {
  id: string = crypto.randomUUID();
  players: Player[] = [];
  state: "waitingForPlayers" | "playing" | "finished" = "waitingForPlayers";

  constructor(player: Player) {
    this.players.push(player);
  }

  serialize(): GameState {
    return {
      id: this.id,
      players: this.players.map((player) => player.id),
      state: this.state,
    };
  }
}
