import { expect, test } from "@playwright/test";
import { spawn } from "node:child_process";

let runGameProcess: ReturnType<typeof spawn>;

const GAME_URL = "http://localhost:5173";

test.beforeEach(async () => {
  runGameProcess = spawn("npm", ["run", "dev"]);
  runGameProcess.stdout?.on("data", (data) => console.log(data.toString()));
  runGameProcess.stderr?.on("data", (data) => console.error(data.toString()));

  await test.step("wait for the game server to start", async () => {
    await new Promise((resolve) => {
      const interval = setInterval(async () => {
        try {
          await fetch(GAME_URL).then((response) => {
            if (response.ok) {
              clearInterval(interval);
              resolve(true);
            }
          });
        } catch (e) {}
      }, 10);
    });
  });
});

// if we don't add `page` as argument here, the tests and browser contexts won't
// be properly created. This needs to be here for the tests to work.
// TODO: I really don't know how playwright knows about the `page` argument here,
//       is it a getter? Could be cool to know how it works.
test("Play Game: 1v1 4x4", async ({
  page: originalPage_DontUse_AlsoDontRemove,
  browser,
}) => {
  const player_1_context = await browser.contexts()[0];
  const player_1_page = await player_1_context.pages()[0];

  await test.step("player 1 navigate to the game page and assert loading screen is shown", async () => {
    player_1_page.goto(GAME_URL); // no await, instead we wait for loading screen
    await expect(player_1_page.getByTestId("loading")).toBeVisible();
  });

  const player_2_context = await browser.newContext();
  const player_2_page = await player_2_context.newPage();

  await test.step("player 2 navigate to the game page and assert loading screen is shown", async () => {
    player_2_page.goto(GAME_URL); // no await, instead we wait for loading screen
    await expect(player_2_page.getByTestId("loading")).toBeVisible();
  });

  await test.step("play button is visible for both players", async () => {
    await expect(player_1_page.getByTestId("play-button")).toBeVisible();
    await expect(player_2_page.getByTestId("play-button")).toBeVisible();
  });

  await test.step("both players see their status as online", async () => {
    await expect(player_1_page.getByTestId("self-status-online")).toBeVisible();
    await expect(player_2_page.getByTestId("self-status-online")).toBeVisible();
  });

  await test.step("player 1 clicks play button", async () => {
    player_1_page.getByTestId("play-button").click(); // no await, instead we wait for the waiting screen
    await expect(
      player_1_page.getByTestId("waiting-for-players")
    ).toBeVisible();
  });

  await test.step("player 2 clicks play button", async () => {
    await player_2_page.getByTestId("play-button").click();
  });

  await test.step("both players should see the game board", async () => {
    await expect(player_1_page.getByTestId("game-board")).toBeVisible();
    await expect(player_2_page.getByTestId("game-board")).toBeVisible();
  });

  await test.step("player 1 sees online status for self and for player 2", async () => {
    await expect(player_1_page.getByTestId("self-status-online")).toBeVisible();
    await expect(
      player_1_page.getByTestId("other-player-status-online")
    ).toBeVisible();
  });

  await test.step("player 2 sees online status for self and for player 1", async () => {
    await expect(player_2_page.getByTestId("self-status-online")).toBeVisible();
    await expect(
      player_2_page.getByTestId("other-player-status-online")
    ).toBeVisible();
  });

  /**
   *
   * @param gameState should be a formatted array, e.g.
   * [
   *   [1, 0, 0, 1],
   *   [2, 0, 0, 0],
   *   [0, 0, 0, 0],
   *   [0, 0, 0, 2]
   * ]
   * 0 indicates an empty cell,
   * 1 indicates a cell occupied by player 1,
   * 2 indicates a cell occupied by player 2
   */
  async function assertBothPlayersSeeGameStateCorrectly(
    gameState: (1 | 2 | 0)[][]
  ) {
    if (
      gameState.length !== 4 ||
      gameState.some((row) => row.length !== 4) ||
      gameState.flat().some((cellValue) => ![1, 2, 0].includes(cellValue)) ||
      gameState.flat().length !== 16
    ) {
      throw new Error(
        "gameState should be a 4x4 array including `1`, `2` or `0`"
      );
    }

    const player1Cells: string[] = [];
    const player2Cells: string[] = [];
    const emptyCells: string[] = [];

    gameState.forEach((row, rowIndex) => {
      row.forEach((cellValue, columnIndex) => {
        if (cellValue === 1) {
          player1Cells.push(`[data-x="${columnIndex}"][data-y="${rowIndex}"]`);
        } else if (cellValue === 2) {
          player2Cells.push(`[data-x="${columnIndex}"][data-y="${rowIndex}"]`);
        } else {
          emptyCells.push(`[data-x="${columnIndex}"][data-y="${rowIndex}"]`);
        }
      });
    });

    await test.step("player 1 sees own and enemy cells correctly", async () => {
      for (const cellLocator of player1Cells.map(
        (coordinates) => `[data-testid="my-cell"]${coordinates}`
      )) {
        await expect(player_1_page.locator(cellLocator)).toBeVisible();
      }

      for (const cellLocator of player2Cells.map(
        (coordinates) => `[data-testid="enemy-cell"]${coordinates}`
      )) {
        await expect(player_1_page.locator(cellLocator)).toBeVisible();
      }
    });

    await test.step("player 2 sees own and enemy cells correctly", async () => {
      for (const cellLocator of player1Cells.map(
        (coordinates) => `[data-testid="enemy-cell"]${coordinates}`
      )) {
        await expect(player_2_page.locator(cellLocator)).toBeVisible();
      }

      for (const cellLocator of player2Cells.map(
        (coordinates) => `[data-testid="my-cell"]${coordinates}`
      )) {
        console.log("AM I EVEN RUNNING?", cellLocator);
        await expect(player_2_page.locator(cellLocator)).toBeVisible();
      }
    });

    await test.step("both player see empty game cells correctly", async () => {
      for (const cellLocator of emptyCells.map(
        (coordinates) => `[data-testid="empty-cell"]${coordinates}`
      )) {
        await expect(player_1_page.locator(cellLocator)).toBeVisible();
        await expect(player_2_page.locator(cellLocator)).toBeVisible();
      }
    });
  }

  await assertBothPlayersSeeGameStateCorrectly([
    [1, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 2],
  ]);

  async function move({
    player,
    action,
    from,
    to,
  }: {
    player: "player1" | "player2";
    action: "jump" | "clone";
    from: { x: number; y: number };
    to: { x: number; y: number };
  }) {
    const pageObject = player === "player1" ? player_1_page : player_2_page;

    const cellToClone = pageObject.locator(
      `[data-testid="my-cell"][data-x="${from.x}"][data-y="${from.y}"]`
    );
    await expect(cellToClone).toBeVisible();
    await cellToClone.click();

    const possibleCloneCoordinates = [
      [from.x + 1, from.y],
      [from.x, from.y + 1],
      [from.x - 1, from.y],
      [from.x, from.y - 1],
    ].filter(([x, y]) => x >= 0 && x < 4 && y >= 0 && y < 4);

    const possibleJumpCoordinates = [
      [from.x + 2, from.y],
      [from.x, from.y + 2],
      [from.x - 2, from.y],
      [from.x, from.y - 2],
    ].filter(([x, y]) => x >= 0 && x < 4 && y >= 0 && y < 4);

    const availableCloneCoordinates: { x: number; y: number }[] = [];
    const availableJumpCoordinates: { x: number; y: number }[] = [];

    await test.step("filtering out available clone and jump coordinates (no already-occupied cells)", async () => {
      for (const [x, y] of possibleCloneCoordinates) {
        const isMyCell = await pageObject
          .locator(`[data-testid="my-cell"][data-x="${x}"][data-y="${y}"]`)
          .isVisible();
        const isEnemyCell = await pageObject
          .locator(`[data-testid="enemy-cell"][data-x="${x}"][data-y="${y}"]`)
          .isVisible();

        if (isMyCell || isEnemyCell) {
          await expect(
            pageObject.locator(
              `[available-clone][data-x="${x}"][data-y="${y}"]`
            )
          ).not.toBeVisible();
        } else {
          availableCloneCoordinates.push({ x, y });
        }
      }

      for (const [x, y] of possibleJumpCoordinates) {
        const isMyCell = await pageObject
          .locator(`[data-testid="my-cell"][data-x="${x}"][data-y="${y}"]`)
          .isVisible();
        const isEnemyCell = await pageObject
          .locator(`[data-testid="enemy-cell"][data-x="${x}"][data-y="${y}"]`)
          .isVisible();

        if (isMyCell || isEnemyCell) {
          await expect(
            pageObject.locator(`[available-jump][data-x="${x}"][data-y="${y}"]`)
          ).not.toBeVisible();
        } else {
          availableJumpCoordinates.push({ x, y });
        }
      }
    });

    await test.step("assert available clone and jump coordinates are visible", async () => {
      for (const { x, y } of availableCloneCoordinates) {
        await expect(
          pageObject.locator(`[available-clone][data-x="${x}"][data-y="${y}"]`)
        ).toBeVisible();
      }

      for (const { x, y } of availableJumpCoordinates) {
        await expect(
          pageObject.locator(`[available-jump][data-x="${x}"][data-y="${y}"]`)
        ).toBeVisible();
      }
    });

    await test.step("make the move", async () => {
      if (action === "clone") {
        const targetCell = pageObject.locator(
          `[available-clone][data-x="${to.x}"][data-y="${to.y}"]`
        );
        await expect(targetCell).toBeVisible();
        await targetCell.click();
      } else if (action === "jump") {
        const targetCell = pageObject.locator(
          `[available-jump][data-x="${to.x}"][data-y="${to.y}"]`
        );
        await expect(targetCell).toBeVisible();
        await targetCell.click();
      }
    });

    await test.step("assert available clone and jump coordinates are no longer visible", async () => {
      for (const { x, y } of availableCloneCoordinates) {
        await expect(
          pageObject.locator(`[available-clone][data-x="${x}"][data-y="${y}"]`)
        ).not.toBeVisible();
      }

      for (const { x, y } of availableJumpCoordinates) {
        await expect(
          pageObject.locator(`[available-jump][data-x="${x}"][data-y="${y}"]`)
        ).not.toBeVisible();
      }
    });
  }

  await move({
    player: "player1",
    action: "clone",
    from: { x: 0, y: 0 },
    to: { x: 1, y: 0 },
  });

  await assertBothPlayersSeeGameStateCorrectly([
    [1, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 2],
  ]);

  await move({
    player: "player2",
    action: "clone",
    from: { x: 3, y: 3 },
    to: { x: 3, y: 2 },
  });

  await assertBothPlayersSeeGameStateCorrectly([
    [1, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 2],
    [0, 0, 0, 2],
  ]);

  await move({
    player: "player1",
    action: "jump",
    from: { x: 1, y: 0 },
    to: { x: 3, y: 0 },
  });

  await move({
    player: "player2",
    action: "clone",
    from: { x: 3, y: 2 },
    to: { x: 3, y: 1 },
  });

  await move({
    player: "player1",
    action: "clone",
    from: { x: 0, y: 0 },
    to: { x: 1, y: 0 },
  });

  await move({
    player: "player2",
    action: "clone",
    from: { x: 3, y: 1 },
    to: { x: 2, y: 1 },
  });

  await move({
    player: "player1",
    action: "jump",
    from: { x: 0, y: 0 },
    to: { x: 0, y: 2 },
  });

  await assertBothPlayersSeeGameStateCorrectly([
    [0, 1, 0, 2],
    [0, 0, 2, 2],
    [1, 0, 0, 2],
    [0, 0, 0, 2],
  ]);

  await move({
    player: "player2",
    action: "clone",
    from: { x: 2, y: 1 },
    to: { x: 1, y: 1 },
  });

  await move({
    player: "player1",
    action: "clone",
    from: { x: 0, y: 2 },
    to: { x: 0, y: 3 },
  });

  await move({
    player: "player2",
    action: "clone",
    from: { x: 1, y: 1 },
    to: { x: 1, y: 2 },
  });

  await move({
    player: "player1",
    action: "jump",
    from: { x: 0, y: 3 },
    to: { x: 2, y: 3 },
  });

  await test.step("both players still see each other as online", async () => {
    await expect(player_1_page.getByTestId("self-status-online")).toBeVisible();
    await expect(
      player_1_page.getByTestId("other-player-status-online")
    ).toBeVisible();
    await expect(player_2_page.getByTestId("self-status-online")).toBeVisible();
    await expect(
      player_2_page.getByTestId("other-player-status-online")
    ).toBeVisible();
  });

  await test.step("player 2 clones down and blocks player 1 and wins the game", async () => {
    await move({
      player: "player2",
      action: "clone",
      from: { x: 1, y: 2 },
      to: { x: 1, y: 3 },
    });
  });

  await assertBothPlayersSeeGameStateCorrectly([
    [0, 2, 0, 2],
    [0, 2, 2, 2],
    [2, 2, 0, 2],
    [0, 2, 2, 1],
  ]);

  await test.step("assert both players see the game finished screen", async () => {
    await expect(player_1_page.getByTestId("game-finished")).toBeVisible();
    await expect(player_2_page.getByTestId("game-finished")).toBeVisible();
  });

  await test.step('player 1 sees "you lost" message', async () => {
    await expect(player_1_page.getByTestId("you-lost")).toBeVisible();
  });

  await test.step('player 2 sees "you won" message', async () => {
    await expect(player_2_page.getByTestId("you-won")).toBeVisible();
  });

  await test.step('both players see "play again" button', async () => {
    await expect(player_1_page.getByTestId("play-again-button")).toBeVisible();
    await expect(player_2_page.getByTestId("play-again-button")).toBeVisible();
  });

  await test.step('player 1 clicks "play again" button', async () => {
    await player_1_page.getByTestId("play-again-button").click();
    await expect(
      player_1_page.getByTestId("waiting-for-players")
    ).toBeVisible();
  });

  await test.step('player 2 clicks "play again" button', async () => {
    await player_2_page.getByTestId("play-again-button").click();
  });

  await assertBothPlayersSeeGameStateCorrectly([
    [1, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 2],
  ]);

  // little timeout, so playwright previews the state correctly
  await player_1_page.waitForTimeout(100); // wait for the game to process the moves
  await player_2_page.waitForTimeout(100); // wait for the game to process the moves
});

test.afterEach(async () => {
  console.log("Closing game process");
  runGameProcess.kill();
});

