export class Canvas {
  getContext() {
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 600;
    canvas.style.position = "absolute";
    document.body.appendChild(canvas);
    this.ctx = canvas.getContext("2d");
    return this.ctx;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}
