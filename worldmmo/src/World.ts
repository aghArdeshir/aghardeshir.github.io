import { Footer } from './Footer';
import { Cell } from './cell/Cell';
import { CellPopup } from './cell/CellPopup';
import { Header } from './header/Header';

export class World {
	static WORLD_WIDTH = 20;
	static WORLD_HEIGHT = 40;
	rootContainer = document.createElement('div');
	header = new Header();
	footer = new Footer();
	cells: Cell[][] = [];

	render() {
		this.rootContainer.className = 'root-container';
		document.body.appendChild(this.rootContainer);

		this.header.render(this.rootContainer);
		this.renderCells();
		this.footer.render(this.rootContainer);
	}

	renderCells() {
		const cellsContainer = document.createElement('div');
		cellsContainer.className = 'cells-container';
		this.rootContainer.appendChild(cellsContainer);

		for (let i = 0; i < World.WORLD_HEIGHT; i++) {
			this.cells[i] = [];
			for (let j = 0; j < World.WORLD_WIDTH; j++) {
				this.cells[i][j] = new Cell();
				this.cells[i][j].onClick(() => {
					const cellPopup = new CellPopup();
					cellPopup.render();
				});
			}
		}

		let rowNumber = 0;
		let columnNumber = 0;
		for (const row of this.cells) {
			rowNumber++;
			columnNumber = 0;
			const rowDom = document.createElement('div');
			rowDom.className = 'row';
			rowDom.style.height = `${Cell.CELL_HEIGHT}px`;
			cellsContainer.appendChild(rowDom);
			for (const cell of row) {
				columnNumber++;
				cell.setRowNumber(rowNumber);
				cell.setColumnNumber(columnNumber);
				cell.render(rowDom);
			}
		}
	}
}
