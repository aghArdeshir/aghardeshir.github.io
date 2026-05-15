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

  drawRectangle();
  drawLine();
  drawBall();

  requestAnimationFrame(rerender);
}

requestAnimationFrame(rerender);

setInterval(() => {
  moveBall();
  moveLine();
}, 1);

function drawRectangle() {
  ctx.strokeStyle = "white";
  ctx.strokeRect(
    rectangle.topLeft.x,
    rectangle.topLeft.y,
    rectangle.width,
    rectangle.height,
  );
}

function drawBall() {
  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();
}

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

function drawLine() {
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

  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(line.startPoint.x, line.startPoint.y);
  if (isOnTopEdge) {
    ctx.lineTo(
      Math.min(line.startPoint.x + line.length, rectangle.topRight.x),
      line.startPoint.y,
    );
    if (line.startPoint.x + line.length > rectangle.topRight.x) {
      ctx.lineTo(
        rectangle.topRight.x,
        Math.min(
          line.startPoint.y +
            line.length -
            (rectangle.topRight.x - line.startPoint.x),
          rectangle.bottomRight.y,
        ),
      );
    }
  } else if (isOnRightEdge) {
    ctx.lineTo(
      line.startPoint.x,
      Math.min(line.startPoint.y + line.length, rectangle.bottomRight.y),
    );
    if (line.startPoint.y + line.length > rectangle.bottomRight.y) {
      ctx.lineTo(
        Math.max(
          line.startPoint.x -
            line.length +
            (rectangle.bottomRight.y - line.startPoint.y),
          rectangle.topLeft.x,
        ),
        rectangle.bottomRight.y,
      );
    }
  } else if (isOnBottomEdge) {
    ctx.lineTo(
      Math.max(line.startPoint.x - line.length, rectangle.bottomLeft.x),
      line.startPoint.y,
    );
    if (line.startPoint.x - line.length < rectangle.bottomLeft.x) {
      ctx.lineTo(
        rectangle.bottomLeft.x,
        Math.max(
          line.startPoint.y -
            line.length +
            (line.startPoint.x - rectangle.bottomLeft.x),
          rectangle.topLeft.y,
        ),
      );
    }
  } else if (isOnLeftEdge) {
    ctx.lineTo(
      line.startPoint.x,
      Math.max(line.startPoint.y - line.length, rectangle.topLeft.y),
    );
    if (line.startPoint.y - line.length < rectangle.topLeft.y) {
      ctx.lineTo(
        Math.min(
          line.startPoint.x +
            line.length -
            (line.startPoint.y - rectangle.topLeft.y),
          rectangle.topRight.x,
        ),
        rectangle.topLeft.y,
      );
    }
  }

  ctx.stroke();
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
