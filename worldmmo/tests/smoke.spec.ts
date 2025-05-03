import { test, expect } from "@playwright/test";

test("initial smoke test", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await expect(page).toHaveTitle(/World MMO/);
});

