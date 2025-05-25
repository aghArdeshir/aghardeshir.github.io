import { randomUUID } from "node:crypto";
import type { GameState } from "../common/messageTypes.ts";

export class Cell {
  id = randomUUID();

  serialize(): GameState["cells"][number] {
    return { id: this.id };
  }
}
