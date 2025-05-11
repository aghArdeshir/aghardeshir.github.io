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

test('I can see money and its growing', async ({ page }) => {
	await page.goto('/');
	const money = await page.locator('.money');
	const initialText = await money.textContent();
	expect(initialText).toBe('Money: 0 (+1/s)');
	await page.waitForTimeout(1000);
	const updatedText = await money.textContent();
	expect(updatedText).toBe('Money: 1 (+1/s)');
});
