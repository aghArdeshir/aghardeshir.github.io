import type { World } from './World';

declare global {
	interface Window {
		world: World;
	}
}
