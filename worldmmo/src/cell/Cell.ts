// biome-ignore lint/complexity/noStaticOnlyClass: Will be done later
export class Cell {
  static CELL_WIDTH = 40;
  static CELL_HEIGHT = 40;

  rowNumber: number = 0;
  columnNumber: number = 0;

  setRowNumber(rowNumber: number) {
    this.rowNumber = rowNumber;
  }
  setColumnNumber(columnNumber: number) {
    this.columnNumber = columnNumber;
  }

  render(rowDom: HTMLDivElement) {
    const cellDom = document.createElement("div");
    cellDom.className = "cell";
    cellDom.style.width = `${Cell.CELL_WIDTH}px`;
    cellDom.style.height = `${Cell.CELL_HEIGHT}px`;

    cellDom.textContent = `${this.rowNumber},${this.columnNumber}`;
    rowDom.appendChild(cellDom);
  }
}
