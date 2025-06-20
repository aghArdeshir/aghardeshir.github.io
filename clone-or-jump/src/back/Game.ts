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
  players: Player[] = [];
  state: "waitingForPlayers" | "playing" | "finished" = "waitingForPlayers";
  private cells = new Array(16).fill(null).map(() => new Cell());
  turnPlayerId: PlayerId;
  winnerId: PlayerId | null = null;

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

    if (this.isGameFinished()) {
      this.state = "finished";
      this.winnerId = this.findWinnerPlayerId();
    }

    for (const player of this.players) {
      player.informGameState();
    }
  }

  findWinnerPlayerId(): PlayerId | null {
    const player1Cells = this.cells.filter(
      (cell) => cell.ownerId === this.players[0].id
    );

    const player2Cells = this.cells.filter(
      (cell) => cell.ownerId === this.players[1].id
    );

    if (player1Cells.length > player2Cells.length) {
      return this.players[0].id;
    }

    if (player2Cells.length > player1Cells.length) {
      return this.players[1].id;
    }

    return null;
  }

  isGameFinished(): boolean {
    if (this.areAllCellsOwned()) return true;
    if (!this.playerCanMove(this.turnPlayerId)) return true;
    return false;
  }

  areAllCellsOwned() {
    return this.cells.every((cell) => cell.ownerId !== null);
  }

  playerCanMove(playerId: PlayerId): boolean {
    const playerCells = this.cells.filter((cell) => cell.ownerId === playerId);

    for (const playerCell of playerCells) {
      const adjacentCells = this.cells.filter(
        (adjCell) =>
          (adjCell.x === playerCell.x &&
            Math.abs(adjCell.y - playerCell.y) === 1) ||
          (adjCell.y === playerCell.y &&
            Math.abs(adjCell.x - playerCell.x) === 1)
      );

      for (const adjCell of adjacentCells) {
        if (!adjCell.ownerId) return true;
      }

      const cellsTwoBlocksAway = this.cells.filter(
        (twoCellAway) =>
          (twoCellAway.x === playerCell.x &&
            Math.abs(twoCellAway.y - playerCell.y) === 2) ||
          (twoCellAway.y === playerCell.y &&
            Math.abs(twoCellAway.x - playerCell.x) === 2)
      );

      for (const twoCellAway of cellsTwoBlocksAway) {
        if (!twoCellAway.ownerId) return true;
      }
    }

    return false;
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
    return dx === 2 || dy === 2;
  }

  serializeFor({ playerId }: { playerId: PlayerId }): GameState {
    if (this.state === "waitingForPlayers") {
      const gameState: GameStateWaitingForOtherPlayers = {
        id: this.id,
        state: this.state,
      };
      return gameState;
    }

    if (this.state === "playing") {
      const gameState: GameStatePlaying = {
        id: this.id,
        state: this.state,
        turnPlayerId: this.turnPlayerId,
        cells: this.cells.map((cell) => cell.serialize()),
      };
      return gameState;
    }

    if (this.state === "finished") {
      const playerStatus =
        this.winnerId === playerId
          ? "win"
          : this.winnerId === null
          ? "draw"
          : "lose";

      const gameState: GameStateFinished = {
        id: this.id,
        state: this.state,
        cells: this.cells.map((cell) => cell.serialize()),
        playerStatus,
      };
      return gameState;
    }

    throw new Error("Unknown game state. This should never happen.");
  }
}
