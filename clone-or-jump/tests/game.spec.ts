import { expect, test } from "@playwright/test";
import { spawn } from "node:child_process";

let runGameProcess: ReturnType<typeof spawn>;

test.beforeEach(async () => {
  runGameProcess = spawn("npm", ["run", "dev"]);
  runGameProcess.stdout?.on("data", (data) => console.log(data.toString()));
  runGameProcess.stderr?.on("data", (data) => console.error(data.toString()));
});

test("Play Game", async ({ page, browser }) => {
  await test.step("wait for the game server to start", async () => {
    await page.waitForTimeout(2000);
  });

  const context1 = await browser.contexts()[0];
  const page1 = await context1.pages()[0];
  page1.goto("http://localhost:5173");

  await expect(page1.getByTestId("loading")).toBeVisible();

  const context2 = await browser.newContext();
  const page2 = await context2.newPage();
  page2.goto("http://localhost:5173");

  await expect(page2.getByTestId("loading")).toBeVisible();

  await page.waitForTimeout(2000);
});

test.afterEach(async () => {
  console.log("Closing game process");
  runGameProcess.kill();
});

