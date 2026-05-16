export class Line {
  length = 200;
  speed = 0.4;
  currentEdge = "top";
  lineSegments = [];
  color = "red";

  constructor(rectangle) {
    if (!rectangle) throw new Error("Rectangle is required to initialize Line");
    this.rectangle = rectangle;
    this.startPoint = {
      x: this.rectangle.topLeft.x,
      y: this.rectangle.topLeft.y,
    };
  }

  move({ deltaTime }) {
    this.lineSegments = [];

    if (
      this.startPoint.x < this.rectangle.topRight.x &&
      this.startPoint.y === this.rectangle.topLeft.y
    )
      this.currentEdge = "top";
    else if (
      this.startPoint.x === this.rectangle.topRight.x &&
      this.startPoint.y < this.rectangle.bottomRight.y
    )
      this.currentEdge = "right";
    else if (
      this.startPoint.y === this.rectangle.bottomRight.y &&
      this.startPoint.x > this.rectangle.bottomLeft.x
    )
      this.currentEdge = "bottom";
    else if (
      this.startPoint.x === this.rectangle.topLeft.x &&
      this.startPoint.y > this.rectangle.topLeft.y
    )
      this.currentEdge = "left";

    if (this.currentEdge === "top") {
      this.startPoint.x += this.speed * deltaTime;
      this.startPoint.x = Math.min(
        this.startPoint.x,
        this.rectangle.topRight.x,
      );
    } else if (this.currentEdge === "right") {
      this.startPoint.y += this.speed * deltaTime;
      this.startPoint.y = Math.min(
        this.startPoint.y,
        this.rectangle.bottomRight.y,
      );
    } else if (this.currentEdge === "bottom") {
      this.startPoint.x -= this.speed * deltaTime;
      this.startPoint.x = Math.max(
        this.startPoint.x,
        this.rectangle.bottomLeft.x,
      );
    } else if (this.currentEdge === "left") {
      this.startPoint.y -= this.speed * deltaTime;
      this.startPoint.y = Math.max(this.startPoint.y, this.rectangle.topLeft.y);
    } else {
      throw new Error("Line is not on any edge of the rectangle");
    }

    if (this.currentEdge === "top") {
      this.lineSegments.push({
        x: Math.min(this.startPoint.x + this.length, this.rectangle.topRight.x),
        y: this.startPoint.y,
      });
      if (this.startPoint.x + this.length > this.rectangle.topRight.x) {
        this.lineSegments.push({
          x: this.rectangle.topRight.x,
          y: Math.min(
            this.startPoint.y +
              this.length -
              (this.rectangle.topRight.x - this.startPoint.x),
            this.rectangle.bottomRight.y,
          ),
        });
      }
    } else if (this.currentEdge === "right") {
      this.lineSegments.push({
        x: this.startPoint.x,
        y: Math.min(
          this.startPoint.y + this.length,
          this.rectangle.bottomRight.y,
        ),
      });
      if (this.startPoint.y + this.length > this.rectangle.bottomRight.y) {
        this.lineSegments.push({
          x: Math.max(
            this.startPoint.x -
              this.length +
              (this.rectangle.bottomRight.y - this.startPoint.y),
            this.rectangle.topLeft.x,
          ),
          y: this.rectangle.bottomRight.y,
        });
      }
    } else if (this.currentEdge === "bottom") {
      this.lineSegments.push({
        x: Math.max(
          this.startPoint.x - this.length,
          this.rectangle.bottomLeft.x,
        ),
        y: this.startPoint.y,
      });
      if (this.startPoint.x - this.length < this.rectangle.bottomLeft.x) {
        this.lineSegments.push({
          x: this.rectangle.bottomLeft.x,
          y: Math.max(
            this.startPoint.y -
              this.length +
              (this.startPoint.x - this.rectangle.bottomLeft.x),
            this.rectangle.topLeft.y,
          ),
        });
      }
    } else if (this.currentEdge === "left") {
      this.lineSegments.push({
        x: this.startPoint.x,
        y: Math.max(this.startPoint.y - this.length, this.rectangle.topLeft.y),
      });
      if (this.startPoint.y - this.length < this.rectangle.topLeft.y) {
        this.lineSegments.push({
          x: Math.min(
            this.startPoint.x +
              this.length -
              (this.startPoint.y - this.rectangle.topLeft.y),
            this.rectangle.topRight.x,
          ),
          y: this.rectangle.topLeft.y,
        });
      }
    }
  }

  draw(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(this.startPoint.x, this.startPoint.y);

    for (const segment of this.lineSegments) {
      ctx.lineTo(segment.x, segment.y);
    }

    ctx.stroke();
  }
}
