import { Rectangle } from "./Rectangle.js";
import { Ball } from "./Ball.js";
import { Line } from "./Line.js";

const ctx = document.querySelector("canvas").getContext("2d");

const rectangle = new Rectangle();
const ball = new Ball({
  centerPoint: {
    x: rectangle.topLeft.x + rectangle.width / 2,
    y: rectangle.topLeft.y + rectangle.height / 2,
  },
});
const line = new Line(rectangle);

function rerender() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  rectangle.draw(ctx);
  line.draw(ctx);
  ball.draw(ctx);

  requestAnimationFrame(rerender);
}

requestAnimationFrame(rerender);

setInterval(() => {
  moveBall();
  moveLine();
}, 1);

function moveBall() {
  const magnitude = Math.sqrt(ball.direction.x ** 2 + ball.direction.y ** 2);
  ball.x += (ball.direction.x / magnitude) * ball.speed;
  ball.y += (ball.direction.y / magnitude) * ball.speed;

  const hitRightWall = ball.x + ball.radius > rectangle.topRight.x;
  const hitLeftWall = ball.x - ball.radius < rectangle.topLeft.x;
  const hitBottomWall = ball.y + ball.radius > rectangle.bottomLeft.y;
  const hitTopWall = ball.y - ball.radius < rectangle.topLeft.y;

  if (hitRightWall) {
    ball.direction.x = -1;
  } else if (hitLeftWall) {
    ball.direction.x = 1;
  }

  if (hitBottomWall) {
    ball.direction.y = -1;
  } else if (hitTopWall) {
    ball.direction.y = 1;
  }
}

function moveLine() {
  const isOnTopEdge =
    line.startPoint.x < rectangle.topRight.x &&
    line.startPoint.y === rectangle.topLeft.y;
  const isOnRightEdge =
    line.startPoint.x === rectangle.topRight.x &&
    line.startPoint.y < rectangle.bottomRight.y;
  const isOnBottomEdge =
    line.startPoint.y === rectangle.bottomRight.y &&
    line.startPoint.x > rectangle.bottomLeft.x;
  const isOnLeftEdge =
    line.startPoint.x === rectangle.topLeft.x &&
    line.startPoint.y > rectangle.topLeft.y;

  if (isOnTopEdge) {
    line.startPoint.x += line.speed;
  } else if (isOnRightEdge) {
    line.startPoint.y += line.speed;
  } else if (isOnBottomEdge) {
    line.startPoint.x -= line.speed;
  } else if (isOnLeftEdge) {
    line.startPoint.y -= line.speed;
  }
}
