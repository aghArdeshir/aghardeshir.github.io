export class Ball {
  radius = 20;
  direction = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };
  speed = 0.4;
  color = "green";

  constructor({ centerPoint }) {
    this.x = centerPoint.x;
    this.y = centerPoint.y;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  move({ deltaTime, rectangle }) {
    const magnitude = Math.sqrt(this.direction.x ** 2 + this.direction.y ** 2);
    this.x += (this.direction.x / magnitude) * this.speed * deltaTime;
    this.y += (this.direction.y / magnitude) * this.speed * deltaTime;

    const hitRightWall = this.x + this.radius >= rectangle.topRight.x;
    const hitLeftWall = this.x - this.radius <= rectangle.topLeft.x;
    const hitBottomWall = this.y + this.radius >= rectangle.bottomLeft.y;
    const hitTopWall = this.y - this.radius <= rectangle.topLeft.y;

    if (hitRightWall) {
      this.direction.x *= -1;
      this.x = Math.min(rectangle.topRight.x - this.radius - 1, this.x);
    } else if (hitLeftWall) {
      this.direction.x *= -1;
      this.x = Math.max(rectangle.topLeft.x + this.radius + 1, this.x);
    }

    if (hitBottomWall) {
      this.direction.y *= -1;
      this.y = Math.min(rectangle.bottomLeft.y - this.radius - 1, this.y);
    } else if (hitTopWall) {
      this.direction.y *= -1;
      this.y = Math.max(rectangle.topLeft.y + this.radius + 1, this.y);
    }
  }

  hitsLine(line) {
    if (line.currentEdge === "top") {
      if (
        this.x > line.startPoint.x &&
        this.x < line.lineSegments[0].x &&
        this.y - this.radius - 3 <= line.startPoint.y
      ) {
        return true;
      }

      if (line.lineSegments[1]) {
        if (
          this.y > line.lineSegments[0].y &&
          this.y < line.lineSegments[1].y &&
          this.x + this.radius + 3 >= line.lineSegments[0].x
        ) {
          return true;
        }
      }
    }

    if (line.currentEdge === "right") {
      if (
        this.y > line.startPoint.y &&
        this.y < line.lineSegments[0].y &&
        this.x + this.radius + 3 >= line.startPoint.x
      ) {
        return true;
      }

      if (line.lineSegments[1]) {
        if (
          this.x < line.lineSegments[0].x &&
          this.x > line.lineSegments[1].x &&
          this.y + this.radius + 3 >= line.lineSegments[0].y
        ) {
          return true;
        }
      }
    }

    if (line.currentEdge === "bottom") {
      if (
        this.x < line.startPoint.x &&
        this.x > line.lineSegments[0].x &&
        this.y + this.radius + 3 >= line.startPoint.y
      ) {
        return true;
      }

      if (line.lineSegments[1]) {
        if (
          this.y < line.lineSegments[0].y &&
          this.y > line.lineSegments[1].y &&
          this.x - this.radius - 3 <= line.lineSegments[0].x
        ) {
          return true;
        }
      }
    }

    if (line.currentEdge === "left") {
      if (
        this.y < line.startPoint.y &&
        this.y > line.lineSegments[0].y &&
        this.x - this.radius - 3 <= line.startPoint.x
      ) {
        return true;
      }

      if (line.lineSegments[1]) {
        if (
          this.x > line.lineSegments[0].x &&
          this.x < line.lineSegments[1].x &&
          this.y - this.radius - 3 <= line.lineSegments[0].y
        ) {
          return true;
        }
      }
    }
  }
}
