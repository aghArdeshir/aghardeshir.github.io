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
test("Play Game: 1v1 4x4", async ({ page: originalPage_DontUse, browser }) => {
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
    await player_2_page.getByTestId("play-button").click(); // no await, instead we wait for the waiting screen
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

  await test.step("player 1 clones to the right", async () => {
    const cellToClone = player_1_page.locator(
      `[data-testid="my-cell"][data-x="0"][data-y="0"]`
    );
    await cellToClone.click();

    const availableClones = [
      player_1_page.locator(`[available-clone][data-x="1"][data-y="0"]`),
      player_1_page.locator(`[available-clone][data-x="0"][data-y="1"]`),
    ];
    const availableJumps = [
      player_1_page.locator(`[available-jump][data-x="2"][data-y="0"]`),
      player_1_page.locator(`[available-jump][data-x="0"][data-y="2"]`),
    ];

    await test.step("assert move hints are visible", async () => {
      for (const cell of [...availableClones, ...availableJumps]) {
        await expect(cell).toBeVisible();
      }
    });

    await availableClones[0].click(); // clone to the right

    await test.step("assert move hints are no longer visible", async () => {
      for (const cell of [...availableClones, ...availableJumps]) {
        await expect(cell).not.toBeVisible();
      }
    });
  });

  await assertBothPlayersSeeGameStateCorrectly([
    [1, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 2],
  ]);

  await test.step("player 2 clones to top", async () => {
    const cellToClone = player_2_page.locator(
      `[data-testid="my-cell"][data-x="3"][data-y="3"]`
    );
    await cellToClone.click();

    const availableClones = [
      player_2_page.locator(`[available-clone][data-x="3"][data-y="2"]`),
      player_2_page.locator(`[available-clone][data-x="2"][data-y="3"]`),
    ];
    const availableJumps = [
      player_2_page.locator(`[available-jump][data-x="3"][data-y="1"]`),
      player_2_page.locator(`[available-jump][data-x="1"][data-y="3"]`),
    ];

    await test.step("assert move hints are visible", async () => {
      for (const cell of [...availableClones, ...availableJumps]) {
        await expect(cell).toBeVisible();
      }
    });

    await availableClones[0].click(); // clone to the top

    await test.step("assert move hints are no longer visible", async () => {
      for (const cell of [...availableClones, ...availableJumps]) {
        await expect(cell).not.toBeVisible();
      }
    });
  });

  await assertBothPlayersSeeGameStateCorrectly([
    [1, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 2],
    [0, 0, 0, 2],
  ]);

  await test.step("player 1 jumps to the right", async () => {
    const cellToJump = player_1_page.locator(
      `[data-testid="my-cell"][data-x="1"][data-y="0"]`
    );
    await cellToJump.click();

    const availableClones = [
      player_1_page.locator(`[available-clone][data-x="2"][data-y="0"]`),
      player_1_page.locator(`[available-clone][data-x="1"][data-y="1"]`),
    ];
    const availableJumps = [
      player_1_page.locator(`[available-jump][data-x="3"][data-y="0"]`),
      player_1_page.locator(`[available-jump][data-x="1"][data-y="2"]`),
    ];
    await test.step("assert move hints are visible", async () => {
      for (const cell of [...availableClones, ...availableJumps]) {
        await expect(cell).toBeVisible();
      }
    });
    await availableJumps[0].click(); // jump to the right
    await test.step("assert move hints are no longer visible", async () => {
      for (const cell of [...availableClones, ...availableJumps]) {
        await expect(cell).not.toBeVisible();
      }
    });
  });

  await test.step("player 2 clones to the top", async () => {
    const cellToClone = player_2_page.locator(
      `[data-testid="my-cell"][data-x="3"][data-y="2"]`
    );
    await cellToClone.click();

    const availableClones = [
      player_2_page.locator(`[available-clone][data-x="3"][data-y="1"]`),
      player_2_page.locator(`[available-clone][data-x="2"][data-y="2"]`),
    ];
    const availableJumps = [
      player_2_page.locator(`[available-jump][data-x="1"][data-y="2"]`),
    ];

    await test.step("assert move hints are visible", async () => {
      for (const cell of [...availableClones, ...availableJumps]) {
        await expect(cell).toBeVisible();
      }
    });

    await test.step("jump to the enemy cell should not be available", async () => {
      await expect(
        player_2_page.locator(`[available-jump][data-x="3"][data-y="0"]`)
      ).not.toBeVisible();
    });

    await availableClones[0].click(); // clone to the top

    await test.step("assert move hints are no longer visible", async () => {
      for (const cell of [...availableClones, ...availableJumps]) {
        await expect(cell).not.toBeVisible();
      }
    });
  });

  await test.step("player 1 clones to right", async () => {
    const player1CellToClone = player_1_page.locator(
      `[data-testid="my-cell"][data-x="0"][data-y="0"]`
    );
    await player1CellToClone.click();
    const player1RightClone = player_1_page.locator(
      `[available-clone][data-x="1"][data-y="0"]`
    );
    await player1RightClone.click();
  });

  await test.step("player 2 clones left", async () => {
    const player2CellToClone = player_2_page.locator(
      `[data-testid="my-cell"][data-x="3"][data-y="1"]`
    );
    await player2CellToClone.click();
    const player2LeftClone = player_2_page.locator(
      `[available-clone][data-x="2"][data-y="1"]`
    );
    await player2LeftClone.click();
  });

  await test.step("player 1 jumps bottom", async () => {
    const player1CellToClone = player_1_page.locator(
      `[data-testid="my-cell"][data-x="0"][data-y="0"]`
    );
    await player1CellToClone.click();
    const player1BottomClone = player_1_page.locator(
      `[available-jump][data-x="0"][data-y="2"]`
    );
    await player1BottomClone.click();
  });

  await assertBothPlayersSeeGameStateCorrectly([
    [0, 1, 0, 2],
    [0, 0, 2, 2],
    [1, 0, 0, 2],
    [0, 0, 0, 2],
  ]);

  await test.step("Player 2 clones left to attack", async () => {
    const enemyCellToOccupy = player_2_page.locator(
      `[data-testid="enemy-cell"][data-x="1"][data-y="0"]`
    );
    await expect(enemyCellToOccupy).toBeVisible();

    const cellToClone = player_2_page.locator(
      `[data-testid="my-cell"][data-x="2"][data-y="1"]`
    );
    await cellToClone.click();
    const cellToCloneTo = player_2_page.locator(
      `[available-clone][data-x="1"][data-y="1"]`
    );
    await cellToCloneTo.click();

    const occupiedCell = player_2_page.locator(
      `[data-testid="my-cell"][data-x="1"][data-y="0"]`
    );

    await expect(occupiedCell).toBeVisible();
  });

  await test.step("player 1 clones down", async () => {
    const sourceCell = player_1_page.locator(
      `[data-testid="my-cell"][data-x="0"][data-y="2"]`
    );
    await sourceCell.click();
    const targetCell = player_1_page.locator(
      `[available-clone][data-x="0"][data-y="3"]`
    );
    await targetCell.click();
  });

  await test.step("player 2 clones down", async () => {
    const sourceCell = player_2_page.locator(
      `[data-testid="my-cell"][data-x="1"][data-y="1"]`
    );
    await sourceCell.click();
    const targetCell = player_2_page.locator(
      `[available-clone][data-x="1"][data-y="2"]`
    );
    await targetCell.click();
  });

  await test.step("player1 jumps right", async () => {
    const sourceCell = player_1_page.locator(
      `[data-testid="my-cell"][data-x="0"][data-y="3"]`
    );
    await sourceCell.click();
    const targetCell = player_1_page.locator(
      `[available-jump][data-x="2"][data-y="3"]`
    );
    await targetCell.click();
  });

  await test.step("both playes still see each other as online", async () => {
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
    const sourceCell = player_2_page.locator(
      `[data-testid="my-cell"][data-x="1"][data-y="2"]`
    );
    await sourceCell.click();
    const targetCell = player_2_page.locator(
      `[available-clone][data-x="1"][data-y="3"]`
    );
    await targetCell.click();
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

