import { Cell } from "./Cell";
import { World } from "./World";

const world = new World();
const cells: Cell[][] = [];

window.world = world;

const rootContainerDom = document.createElement('div');
rootContainerDom.style.width = `${World.WORLD_WIDTH * Cell.CELL_WIDTH}px`;
rootContainerDom.style.height = `${World.WORLD_HEIGHT * Cell.CELL_HEIGHT}px`;
document.body.appendChild(rootContainerDom);

for (let i = 0; i < World.WORLD_HEIGHT; i++) {
	cells[i] = [];
	for (let j = 0; j < World.WORLD_WIDTH; j++) {
		cells[i][j] = new Cell();
	}
}

let rowNumber = 0;
let columnNumber = 0;
for (const row of cells) {
	rowNumber++;
	columnNumber = 0;
	const rowDom = document.createElement('div');
	rowDom.className = 'row';
	rootContainerDom.appendChild(rowDom);
	for (const cell of row) {
		columnNumber++;
		const cellDom = document.createElement('div');
		cellDom.className = 'cell';
		cellDom.style.width = `${Cell.CELL_WIDTH}px`;
		cellDom.style.height = `${Cell.CELL_HEIGHT}px`;

		cellDom.textContent = `${rowNumber},${columnNumber}`;
		rowDom.appendChild(cellDom);
	}
}
