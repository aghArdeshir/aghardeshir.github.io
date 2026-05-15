export class Line {
  constructor(rectangle) {
    if (!rectangle) throw new Error("Rectangle is required to initialize Line");
    this.startPoint = {
      x: rectangle.topLeft.x,
      y: rectangle.topLeft.y,
    };
  }
  length = 200;
  speed = 0.5;
}
