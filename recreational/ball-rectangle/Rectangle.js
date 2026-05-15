export class Rectangle {
  width = 400;
  height = 400;
  topLeft = {
    x: 100,
    y: 100,
  };
  topRight = {
    x: this.topLeft.x + this.width,
    y: this.topLeft.y,
  };
  bottomRight = {
    x: this.topLeft.x + this.width,
    y: this.topLeft.y + this.height,
  };
  bottomLeft = {
    x: this.topLeft.x,
    y: this.topLeft.y + this.height,
  };

  draw(ctx) {
    ctx.strokeStyle = "white";
    ctx.strokeRect(this.topLeft.x, this.topLeft.y, this.width, this.height);
  }
}
