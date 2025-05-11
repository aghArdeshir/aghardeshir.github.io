import {
	type PlaywrightTestConfig,
	defineConfig,
	devices,
} from '@playwright/test';
import { getTestConfig } from './tests/test-config';

const testConfig = getTestConfig();

const projects: PlaywrightTestConfig['projects'] = [];
if (testConfig.BROWSERS.includes('firefox')) {
	projects.push({
		name: 'firefox',
		use: { ...devices['Desktop Firefox'] },
	});
}
if (testConfig.BROWSERS.includes('webkit')) {
	projects.push({
		name: 'webkit',
		use: { ...devices['Desktop Safari'] },
	});
}
if (testConfig.BROWSERS.includes('chromium')) {
	projects.push({
		name: 'chromium',
		use: { ...devices['Desktop Chrome'] },
	});
}
if (testConfig.BROWSERS.includes('edge')) {
	projects.push({
		name: 'Microsoft Edge',
		use: { ...devices['Desktop Edge'], channel: 'msedge' },
	});
}
if (testConfig.BROWSERS.includes('chrome')) {
	projects.push({
		name: 'Google Chrome',
		use: { ...devices['Desktop Chrome'], channel: 'chrome' },
	});
}
if (testConfig.BROWSERS.includes('mobile-chrome')) {
	projects.push({
		name: 'Mobile Chrome',
		use: { ...devices['Pixel 5'] },
	});
}
if (testConfig.BROWSERS.includes('mobile-safari')) {
	projects.push({
		name: 'Mobile Safari',
		use: { ...devices['iPhone 12'] },
	});
}

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './tests',
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'html',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: testConfig.BASE_URL,

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on',
	},

	/* Configure projects for major browsers */
	projects,

	/* Run your local dev server before starting the tests */
	// webServer: {
	//   command: 'npm run start',
	//   url: 'http://127.0.0.1:3000',
	//   reuseExistingServer: !process.env.CI,
	// },
});
