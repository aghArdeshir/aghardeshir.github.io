import { CellPopup } from './CellPopup';

export class Cell {
	static CELL_WIDTH = 40;
	static CELL_HEIGHT = 40;

	#lotitude = 0;
	#longitude = 0;
	#onClick = () => {};

	setRowNumber(rowNumber: number) {
		this.#lotitude = rowNumber;
	}
	setColumnNumber(columnNumber: number) {
		this.#longitude = columnNumber;
	}

	onClick(callback: () => void) {
		this.#onClick = callback;
	}

	render(rowDom: HTMLDivElement) {
		const cellDom = document.createElement('div');
		cellDom.className = 'cell';
		cellDom.style.width = `${Cell.CELL_WIDTH}px`;
		cellDom.style.height = `${Cell.CELL_HEIGHT}px`;

		cellDom.textContent = `${this.#lotitude},${this.#longitude}`;
		rowDom.appendChild(cellDom);

		cellDom.onclick = this.#onClick;
	}
}
