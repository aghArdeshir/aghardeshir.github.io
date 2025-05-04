import { CellPopup } from "./CellPopup";

// biome-ignore lint/complexity/noStaticOnlyClass: Will be done later
export class Cell {
  static CELL_WIDTH = 40;
  static CELL_HEIGHT = 40;

  lotitude: number = 0;
  longitude: number = 0;

  setRowNumber(rowNumber: number) {
    this.lotitude = rowNumber;
  }
  setColumnNumber(columnNumber: number) {
    this.longitude = columnNumber;
  }

  render(rowDom: HTMLDivElement) {
    const cellDom = document.createElement("div");
    cellDom.className = "cell";
    cellDom.style.width = `${Cell.CELL_WIDTH}px`;
    cellDom.style.height = `${Cell.CELL_HEIGHT}px`;

    cellDom.textContent = `${this.lotitude},${this.longitude}`;
    rowDom.appendChild(cellDom);

    cellDom.onclick = this.onClick.bind(this);
  }

  onClick() {
    const cellPopup = new CellPopup();
    cellPopup.render();
  }
}
