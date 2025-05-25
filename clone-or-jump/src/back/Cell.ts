import { randomUUID } from "node:crypto";
import type { GameStateCell } from "../common/messageTypes.ts";
import type { PlayerId } from "../common/gameTypes.ts";

export class Cell {
  id = randomUUID();
  x: number;
  y: number;
  ownerId: PlayerId | null = null;

  serialize(): GameStateCell {
    return { id: this.id, x: this.x, y: this.y, ownerId: this.ownerId };
  }

  setPosition({ x, y }: { x: number; y: number }): void {
    this.x = x;
    this.y = y;
  }

  setOwner(playerId: PlayerId) {
    this.ownerId = playerId;
  }
}
