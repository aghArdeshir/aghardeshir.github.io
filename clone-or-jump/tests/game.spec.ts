import { expect, test } from "@playwright/test";
import { spawn } from "node:child_process";

let runGameProcess: ReturnType<typeof spawn>;

test.beforeEach(async () => {
  runGameProcess = spawn("npm", ["run", "dev"]);
  runGameProcess.stdout?.on("data", (data) => console.log(data.toString()));
  runGameProcess.stderr?.on("data", (data) => console.error(data.toString()));
});

test("Play Game", async ({ page: originalPage_DontUse, browser }) => {
  await test.step("wait for the game server to start", async () => {
    await originalPage_DontUse.waitForTimeout(2000);
  });
  const context1 = await browser.contexts()[0];
  const page1 = await context1.pages()[0];

  await test.step("player 1 navigate to the game page and assert loading screen is shown", async () => {
    page1.goto("http://localhost:5173"); // no await, instead we wait for loading screen
    await expect(page1.getByTestId("loading")).toBeVisible();
  });

  const context2 = await browser.newContext();
  const page2 = await context2.newPage();

  await test.step("player 2 navigate to the game page and assert loading screen is shown", async () => {
    page2.goto("http://localhost:5173"); // no await, instead we wait for loading screen
    await expect(page2.getByTestId("loading")).toBeVisible();
  });

  await test.step("play button is visible for both players", async () => {
    await expect(page1.getByTestId("play-button")).toBeVisible();
    await expect(page2.getByTestId("play-button")).toBeVisible();
  });

  await test.step("both players see their status as online", async () => {
    await expect(page1.getByTestId("self-status-online")).toBeVisible();
    await expect(page2.getByTestId("self-status-online")).toBeVisible();
  });

  await test.step("player 1 clicks play button", async () => {
    page1.getByTestId("play-button").click(); // no await, instead we wait for the waiting screen
    await expect(page1.getByTestId("waiting-for-players")).toBeVisible();
  });

  await test.step("player 2 clicks play button", async () => {
    await page2.getByTestId("play-button").click(); // no await, instead we wait for the waiting screen
  });

  await test.step("both players should see the game board", async () => {
    await expect(page1.getByTestId("game-board")).toBeVisible();
    await expect(page2.getByTestId("game-board")).toBeVisible();
  });

  await test.step("player 1 sees online status for self and for player 2", async () => {
    await expect(page1.getByTestId("self-status-online")).toBeVisible();
    await expect(page1.getByTestId("other-player-status-online")).toBeVisible();
  });

  await test.step("player 2 sees online status for self and for player 1", async () => {
    await expect(page2.getByTestId("self-status-online")).toBeVisible();
    await expect(page2.getByTestId("other-player-status-online")).toBeVisible();
  });

  await test.step("player 1 sees game state correctly", async () => {
    const player1Cells = [
      page1.locator(`[data-testid="my-cell"][data-x="0"][data-y="0"]`),
    ];
    const player2Cells = [
      page1.locator(`[data-testid="enemy-cell"][data-x="3"][data-y="3"]`),
    ];
    const emptyCells = [
      page1.locator(`[data-testid="empty-cell"][data-x="0"][data-y="1"]`),
      page1.locator(`[data-testid="empty-cell"][data-x="0"][data-y="2"]`),
      page1.locator(`[data-testid="empty-cell"][data-x="0"][data-y="3"]`),
      page1.locator(`[data-testid="empty-cell"][data-x="1"][data-y="0"]`),
      page1.locator(`[data-testid="empty-cell"][data-x="1"][data-y="1"]`),
      page1.locator(`[data-testid="empty-cell"][data-x="1"][data-y="2"]`),
      page1.locator(`[data-testid="empty-cell"][data-x="1"][data-y="3"]`),
      page1.locator(`[data-testid="empty-cell"][data-x="2"][data-y="0"]`),
      page1.locator(`[data-testid="empty-cell"][data-x="2"][data-y="1"]`),
      page1.locator(`[data-testid="empty-cell"][data-x="2"][data-y="2"]`),
      page1.locator(`[data-testid="empty-cell"][data-x="2"][data-y="3"]`),
      page1.locator(`[data-testid="empty-cell"][data-x="3"][data-y="0"]`),
      page1.locator(`[data-testid="empty-cell"][data-x="3"][data-y="1"]`),
      page1.locator(`[data-testid="empty-cell"][data-x="3"][data-y="2"]`),
    ];

    for (const cell of [...player1Cells, ...player2Cells, ...emptyCells]) {
      await expect(cell).toBeVisible();
    }
  });

  await test.step("player 2 sees game state correctly", async () => {
    const player1Cells = [
      page2.locator(`[data-testid="enemy-cell"][data-x="0"][data-y="0"]`),
    ];
    const player2Cells = [
      page2.locator(`[data-testid="my-cell"][data-x="3"][data-y="3"]`),
    ];
    const emptyCells = [
      page2.locator(`[data-testid="empty-cell"][data-x="0"][data-y="1"]`),
      page2.locator(`[data-testid="empty-cell"][data-x="0"][data-y="2"]`),
      page2.locator(`[data-testid="empty-cell"][data-x="0"][data-y="3"]`),
      page2.locator(`[data-testid="empty-cell"][data-x="1"][data-y="0"]`),
      page2.locator(`[data-testid="empty-cell"][data-x="1"][data-y="1"]`),
      page2.locator(`[data-testid="empty-cell"][data-x="1"][data-y="2"]`),
      page2.locator(`[data-testid="empty-cell"][data-x="1"][data-y="3"]`),
      page2.locator(`[data-testid="empty-cell"][data-x="2"][data-y="0"]`),
      page2.locator(`[data-testid="empty-cell"][data-x="2"][data-y="1"]`),
      page2.locator(`[data-testid="empty-cell"][data-x="2"][data-y="2"]`),
      page2.locator(`[data-testid="empty-cell"][data-x="2"][data-y="3"]`),
      page2.locator(`[data-testid="empty-cell"][data-x="3"][data-y="0"]`),
      page2.locator(`[data-testid="empty-cell"][data-x="3"][data-y="1"]`),
      page2.locator(`[data-testid="empty-cell"][data-x="3"][data-y="2"]`),
    ];

    for (const cell of [...player1Cells, ...player2Cells, ...emptyCells]) {
      await expect(cell).toBeVisible();
    }
  });

  await page1.waitForTimeout(2000);
});

test.afterEach(async () => {
  console.log("Closing game process");
  runGameProcess.kill();
});

