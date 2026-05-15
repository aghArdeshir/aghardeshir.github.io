export class Ball {
  radius = 20;
  direction = { x: Math.random(), y: Math.random() };
  speed = 1;

  constructor({ centerPoint }) {
    this.x = centerPoint.x;
    this.y = centerPoint.y;
  }

  draw(ctx) {
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
