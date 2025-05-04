import { test, expect } from '@playwright/test';

test('initial smoke test', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle(/World MMO/);
});

test('renders all cels', async ({ page }) => {
  await page.goto('/');
  const cells = await page.locator('.cell');
  const celCount = await cells.count();
  expect(celCount).toBe(800);
});