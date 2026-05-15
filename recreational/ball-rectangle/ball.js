export class Ball {
  constructor({ centerPoint }) {
    this.x = centerPoint.x;
    this.y = centerPoint.y;
  }
  radius = 20;
  direction = { x: Math.random(), y: Math.random() };
  speed = 1;
}
