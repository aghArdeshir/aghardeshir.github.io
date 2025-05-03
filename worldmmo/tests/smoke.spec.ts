import { test, expect } from "@playwright/test";

test("initial smoke test", async ({ page }) => {
  await page.goto("http://localhost:4173/");
  await expect(page).toHaveTitle(/World MMO/);
});

