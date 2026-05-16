export class Canvas {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 600;
    this.canvas.height = 600;
    this.canvas.style.position = "absolute";
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
  }

  getContext() {
    return this.ctx;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
