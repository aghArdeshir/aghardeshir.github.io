import { test, expect } from '@playwright/test';

test('initial smoke test', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle(/World MMO/);
});
