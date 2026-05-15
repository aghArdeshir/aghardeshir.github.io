export class Line {
  length = 200;
  speed = 0.1;

  constructor(rectangle) {
    if (!rectangle) throw new Error("Rectangle is required to initialize Line");
    this.rectangle = rectangle;
    this.startPoint = {
      x: this.rectangle.topLeft.x,
      y: this.rectangle.topLeft.y,
    };
  }

  draw(ctx) {
    const isOnTopEdge =
      this.startPoint.x < this.rectangle.topRight.x &&
      this.startPoint.y === this.rectangle.topLeft.y;
    const isOnRightEdge =
      this.startPoint.x === this.rectangle.topRight.x &&
      this.startPoint.y < this.rectangle.bottomRight.y;
    const isOnBottomEdge =
      this.startPoint.y === this.rectangle.bottomRight.y &&
      this.startPoint.x > this.rectangle.bottomLeft.x;
    const isOnLeftEdge =
      this.startPoint.x === this.rectangle.topLeft.x &&
      this.startPoint.y > this.rectangle.topLeft.y;

    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(this.startPoint.x, this.startPoint.y);
    if (isOnTopEdge) {
      ctx.lineTo(
        Math.min(this.startPoint.x + this.length, this.rectangle.topRight.x),
        this.startPoint.y,
      );
      if (this.startPoint.x + this.length > this.rectangle.topRight.x) {
        ctx.lineTo(
          this.rectangle.topRight.x,
          Math.min(
            this.startPoint.y +
              this.length -
              (this.rectangle.topRight.x - this.startPoint.x),
            this.rectangle.bottomRight.y,
          ),
        );
      }
    } else if (isOnRightEdge) {
      ctx.lineTo(
        this.startPoint.x,
        Math.min(this.startPoint.y + this.length, this.rectangle.bottomRight.y),
      );
      if (this.startPoint.y + this.length > this.rectangle.bottomRight.y) {
        ctx.lineTo(
          Math.max(
            this.startPoint.x -
              this.length +
              (this.rectangle.bottomRight.y - this.startPoint.y),
            this.rectangle.topLeft.x,
          ),
          this.rectangle.bottomRight.y,
        );
      }
    } else if (isOnBottomEdge) {
      ctx.lineTo(
        Math.max(this.startPoint.x - this.length, this.rectangle.bottomLeft.x),
        this.startPoint.y,
      );
      if (this.startPoint.x - this.length < this.rectangle.bottomLeft.x) {
        ctx.lineTo(
          this.rectangle.bottomLeft.x,
          Math.max(
            this.startPoint.y -
              this.length +
              (this.startPoint.x - this.rectangle.bottomLeft.x),
            this.rectangle.topLeft.y,
          ),
        );
      }
    } else if (isOnLeftEdge) {
      ctx.lineTo(
        this.startPoint.x,
        Math.max(this.startPoint.y - this.length, this.rectangle.topLeft.y),
      );
      if (this.startPoint.y - this.length < this.rectangle.topLeft.y) {
        ctx.lineTo(
          Math.min(
            this.startPoint.x +
              this.length -
              (this.startPoint.y - this.rectangle.topLeft.y),
            this.rectangle.topRight.x,
          ),
          this.rectangle.topLeft.y,
        );
      }
    }

    ctx.stroke();
  }

  move({ deltaTime }) {
    const isOnTopEdge =
      this.startPoint.x < this.rectangle.topRight.x &&
      this.startPoint.y === this.rectangle.topLeft.y;
    const isOnRightEdge =
      this.startPoint.x === this.rectangle.topRight.x &&
      this.startPoint.y < this.rectangle.bottomRight.y;
    const isOnBottomEdge =
      this.startPoint.y === this.rectangle.bottomRight.y &&
      this.startPoint.x > this.rectangle.bottomLeft.x;
    const isOnLeftEdge =
      this.startPoint.x === this.rectangle.topLeft.x &&
      this.startPoint.y > this.rectangle.topLeft.y;

    if (isOnTopEdge) {
      this.startPoint.x += this.speed * deltaTime;
      this.startPoint.x = Math.min(
        this.startPoint.x,
        this.rectangle.topRight.x,
      );
    } else if (isOnRightEdge) {
      this.startPoint.y += this.speed * deltaTime;
      this.startPoint.y = Math.min(
        this.startPoint.y,
        this.rectangle.bottomRight.y,
      );
    } else if (isOnBottomEdge) {
      this.startPoint.x -= this.speed * deltaTime;
      this.startPoint.x = Math.max(
        this.startPoint.x,
        this.rectangle.bottomLeft.x,
      );
    } else if (isOnLeftEdge) {
      this.startPoint.y -= this.speed * deltaTime;
      this.startPoint.y = Math.max(this.startPoint.y, this.rectangle.topLeft.y);
    } else {
      throw new Error("Line is not on any edge of the rectangle");
    }
  }
}
