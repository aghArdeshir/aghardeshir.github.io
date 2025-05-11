import { existsSync, readFileSync } from 'node:fs';
import { z } from 'zod';

const configFilePath = new URL('./.test-config.json', import.meta.url);
const configOverrideFilePath = new URL(
	'./.test-config-override.json',
	import.meta.url,
);

export function getTestConfig() {
	const configSchema = z
		.object({
			__COMMENT__: z.array(z.string()).optional(),
			BASE_URL: z.string().url(),
			BROWSERS: z.array(
				z.enum([
					'firefox',
					'webkit',
					'chromium',
					'edge',
					'chrome',
					'mobile-chrome',
					'mobile-safari',
				]),
			),
		})
		.strict();

	const overrideConfigSchema = configSchema.partial();

	const mainConfig = JSON.parse(
		readFileSync(configFilePath, 'utf-8'),
	);
	const mainConfigParsed = configSchema.parse(mainConfig);

	let overrideConfig = {};
	if (existsSync(configOverrideFilePath)) {
		const configOverrides = JSON.parse(
			readFileSync(configOverrideFilePath, 'utf-8'),
		);
		overrideConfig = overrideConfigSchema.parse(configOverrides);
	}

	const testsConfig = {
		...mainConfigParsed,
		...overrideConfig,
	};

	return testsConfig;
}
