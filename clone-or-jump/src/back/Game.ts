import { randomUUID } from "node:crypto";
import type {
  GameState,
  GameStateFinished,
  GameStatePlaying,
  GameStateWaitingForOtherPlayers,
} from "../common/messageTypes.ts";
import { Cell } from "./Cell.ts";
import type { Player } from "./Player.ts";
import type { PlayerId } from "../common/gameTypes.ts";

export const games: Game[] = [];

export class Game {
  id: string = randomUUID();
  private players: Player[] = [];
  state: "waitingForPlayers" | "playing" | "finished" = "waitingForPlayers";
  private cells = new Array(16).fill(null).map(() => new Cell());
  turnPlayerId: PlayerId;

  constructor() {
    games.push(this);
    this.arrangeCells();
  }

  arrangeCells(): void {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const cell = this.cells[i * 4 + j];
        cell.setPosition({ x: j, y: i });
      }
    }
  }

  getPlayersCount(): number {
    return this.players.length;
  }

  addPlayer(player: Player): void {
    this.players.push(player);

    if (this.getPlayersCount() === 2) {
      this.state = "playing";
      this.turnPlayerId = this.players[0].id;
      this.cells[0].setOwnerId(this.players[0].id);
      this.cells[this.cells.length - 1].setOwnerId(this.players[1].id);
    }

    for (const player of this.players) {
      player.informGameState();
    }
  }

  move({
    playerId,
    sourceCellId,
    targetCellId,
  }: {
    playerId: PlayerId;
    sourceCellId: string;
    targetCellId: string;
  }): void {
    const player = this.players.find((p) => p.id === playerId);
    const sourceCell = this.cells.find((cell) => cell.id === sourceCellId);
    const targetCell = this.cells.find((cell) => cell.id === targetCellId);
    const otherPlayer = this.players.find((p) => p.id !== playerId);
    if (!player || !sourceCell || !targetCell || !otherPlayer) return;

    const isMoveValid = this.validateMove({
      player,
      sourceCell,
      targetCell,
    });

    if (!isMoveValid) return;

    targetCell.setOwnerId(player.id);

    if (this.isMoveJump(sourceCell, targetCell)) {
      sourceCell.setOwnerId(null);
      const cellInMiddle = this.cells.find(
        (cell) =>
          cell.x === (sourceCell.x + targetCell.x) / 2 &&
          cell.y === (sourceCell.y + targetCell.y) / 2
      );
      if (cellInMiddle && cellInMiddle.ownerId === otherPlayer.id) {
        cellInMiddle.setOwnerId(player.id);
      }
    }

    const targetCellAdjacentCells = this.cells.filter(
      (cell) =>
        (cell.x === targetCell.x && Math.abs(cell.y - targetCell.y) === 1) ||
        (cell.y === targetCell.y && Math.abs(cell.x - targetCell.x) === 1)
    );

    for (const targetCellAdjacentCell of targetCellAdjacentCells) {
      if (targetCellAdjacentCell.ownerId === otherPlayer.id) {
        targetCellAdjacentCell.setOwnerId(player.id);
      }
    }

    this.turnPlayerId = otherPlayer.id;

    for (const player of this.players) {
      player.informGameState();
    }
  }

  validateMove({
    player,
    sourceCell,
    targetCell,
  }: {
    player: Player;
    sourceCell: Cell;
    targetCell: Cell;
  }): boolean {
    if (!sourceCell) return false;
    if (!targetCell) return false;
    if (this.state !== "playing") return false;
    if (sourceCell.id === targetCell.id) return false;
    if (sourceCell.ownerId === targetCell.ownerId) return false;
    if (sourceCell.ownerId !== player.id) return false;
    if (targetCell.ownerId) return false;
    if (this.turnPlayerId !== player.id) return false;

    return true;
  }

  isMoveJump(sourceCell: Cell, targetCell: Cell): boolean {
    const dx = Math.abs(sourceCell.x - targetCell.x);
    const dy = Math.abs(sourceCell.y - targetCell.y);
    return dx === 1 || dy === 1;
  }

  serialize(): GameState {
    if (this.state === "waitingForPlayers") {
      const gameState: GameStateWaitingForOtherPlayers = {
        id: this.id,
        playerIds: this.players.map((player) => player.id),
        state: this.state,
      };
      return gameState;
    }

    if (this.state === "playing") {
      const gameState: GameStatePlaying = {
        id: this.id,
        playerIds: this.players.map((player) => player.id),
        state: this.state,
        turnPlayerId: this.turnPlayerId,
        cells: this.cells.map((cell) => cell.serialize()),
      };
      return gameState;
    }

    if (this.state === "finished") {
      const gameState: GameStateFinished = {
        id: this.id,
        state: this.state,
        playerIds: this.players.map((player) => player.id),
        cells: this.cells.map((cell) => cell.serialize()),
      };
      return gameState;
    }

    throw new Error("Unknown game state. This should never happen.");
  }
}
