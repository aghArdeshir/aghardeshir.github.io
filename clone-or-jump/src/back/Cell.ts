import { randomUUID } from "node:crypto";
import type { GameStateCell } from "../common/messageTypes.ts";

export class Cell {
  id = randomUUID();
  x: number;
  y: number;

  serialize(): GameStateCell {
    return { id: this.id, x: this.x, y: this.y };
  }

  setPosition({ x, y }: { x: number; y: number }): void {
    this.x = x;
    this.y = y;
  }
}
