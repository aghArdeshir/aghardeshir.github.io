import { Cell } from "./Cell";
import { World } from "./World";

const world = new World();
const cells: Cell[][] = [];

window.world = world;

const rootContainer = document.createElement("div");
rootContainer.className = "root-container";
document.body.appendChild(rootContainer);

function renderCells() {
  const cellsContainer = document.createElement("div");
  cellsContainer.className = "cells-container";
  rootContainer.appendChild(cellsContainer);

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
    const rowDom = document.createElement("div");
    rowDom.className = "row";
    rowDom.style.height = `${Cell.CELL_HEIGHT}px`;
    cellsContainer.appendChild(rowDom);
    for (const cell of row) {
      columnNumber++;
      const cellDom = document.createElement("div");
      cellDom.className = "cell";
      cellDom.style.width = `${Cell.CELL_WIDTH}px`;
      cellDom.style.height = `${Cell.CELL_HEIGHT}px`;

      cellDom.textContent = `${rowNumber},${columnNumber}`;
      rowDom.appendChild(cellDom);
    }
  }
}

function renderHeader() {
  const headerDom = document.createElement("div");
  headerDom.className = "header";
  rootContainer.appendChild(headerDom);
  headerDom.textContent = "World MMO Header";
}

function renderFooter() {
  const footerDom = document.createElement("div");
  footerDom.className = "footer";
  rootContainer.appendChild(footerDom);
  footerDom.textContent = "World MMO Footer";
}

renderHeader();
renderCells();
renderFooter();

