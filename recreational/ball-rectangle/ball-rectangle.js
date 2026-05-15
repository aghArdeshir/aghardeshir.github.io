import { Rectangle } from "./rectangle.js";

const ctx = document.querySelector("canvas").getContext("2d");

const rectangle = new Rectangle();
const ball = {
  x: rectangle.topLeft.x + rectangle.width / 2,
  y: rectangle.topLeft.y + rectangle.height / 2,
  radius: 20,
};
const ballDirection = { x: Math.random(), y: Math.random() };
const ballSpeed = 1;

const lineLength = 200;
const lineSpeed = 0.5;
const lineStartPoint = {
  x: rectangle.topLeft.x,
  y: rectangle.topLeft.y,
};

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
  const magnitude = Math.sqrt(ballDirection.x ** 2 + ballDirection.y ** 2);
  ball.x += (ballDirection.x / magnitude) * ballSpeed;
  ball.y += (ballDirection.y / magnitude) * ballSpeed;

  const hitRightWall = ball.x + ball.radius > rectangle.topRight.x;
  const hitLeftWall = ball.x - ball.radius < rectangle.topLeft.x;
  const hitBottomWall = ball.y + ball.radius > rectangle.bottomLeft.y;
  const hitTopWall = ball.y - ball.radius < rectangle.topLeft.y;

  if (hitRightWall) {
    ballDirection.x = -1;
  } else if (hitLeftWall) {
    ballDirection.x = 1;
  }

  if (hitBottomWall) {
    ballDirection.y = -1;
  } else if (hitTopWall) {
    ballDirection.y = 1;
  }
}

function drawLine() {
  const isOnTopEdge =
    lineStartPoint.x < rectangle.topRight.x &&
    lineStartPoint.y === rectangle.topLeft.y;
  const isOnRightEdge =
    lineStartPoint.x === rectangle.topRight.x &&
    lineStartPoint.y < rectangle.bottomRight.y;
  const isOnBottomEdge =
    lineStartPoint.y === rectangle.bottomRight.y &&
    lineStartPoint.x > rectangle.bottomLeft.x;
  const isOnLeftEdge =
    lineStartPoint.x === rectangle.topLeft.x &&
    lineStartPoint.y > rectangle.topLeft.y;

  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(lineStartPoint.x, lineStartPoint.y);
  if (isOnTopEdge) {
    ctx.lineTo(
      Math.min(lineStartPoint.x + lineLength, rectangle.topRight.x),
      lineStartPoint.y,
    );
    if (lineStartPoint.x + lineLength > rectangle.topRight.x) {
      ctx.lineTo(
        rectangle.topRight.x,
        Math.min(
          lineStartPoint.y +
            lineLength -
            (rectangle.topRight.x - lineStartPoint.x),
          rectangle.bottomRight.y,
        ),
      );
    }
  } else if (isOnRightEdge) {
    ctx.lineTo(
      lineStartPoint.x,
      Math.min(lineStartPoint.y + lineLength, rectangle.bottomRight.y),
    );
    if (lineStartPoint.y + lineLength > rectangle.bottomRight.y) {
      ctx.lineTo(
        Math.max(
          lineStartPoint.x -
            lineLength +
            (rectangle.bottomRight.y - lineStartPoint.y),
          rectangle.topLeft.x,
        ),
        rectangle.bottomRight.y,
      );
    }
  } else if (isOnBottomEdge) {
    ctx.lineTo(
      Math.max(lineStartPoint.x - lineLength, rectangle.bottomLeft.x),
      lineStartPoint.y,
    );
    if (lineStartPoint.x - lineLength < rectangle.bottomLeft.x) {
      ctx.lineTo(
        rectangle.bottomLeft.x,
        Math.max(
          lineStartPoint.y -
            lineLength +
            (lineStartPoint.x - rectangle.bottomLeft.x),
          rectangle.topLeft.y,
        ),
      );
    }
  } else if (isOnLeftEdge) {
    ctx.lineTo(
      lineStartPoint.x,
      Math.max(lineStartPoint.y - lineLength, rectangle.topLeft.y),
    );
    if (lineStartPoint.y - lineLength < rectangle.topLeft.y) {
      ctx.lineTo(
        Math.min(
          lineStartPoint.x +
            lineLength -
            (lineStartPoint.y - rectangle.topLeft.y),
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
    lineStartPoint.x < rectangle.topRight.x &&
    lineStartPoint.y === rectangle.topLeft.y;
  const isOnRightEdge =
    lineStartPoint.x === rectangle.topRight.x &&
    lineStartPoint.y < rectangle.bottomRight.y;
  const isOnBottomEdge =
    lineStartPoint.y === rectangle.bottomRight.y &&
    lineStartPoint.x > rectangle.bottomLeft.x;
  const isOnLeftEdge =
    lineStartPoint.x === rectangle.topLeft.x &&
    lineStartPoint.y > rectangle.topLeft.y;

  if (isOnTopEdge) {
    lineStartPoint.x += lineSpeed;
  } else if (isOnRightEdge) {
    lineStartPoint.y += lineSpeed;
  } else if (isOnBottomEdge) {
    lineStartPoint.x -= lineSpeed;
  } else if (isOnLeftEdge) {
    lineStartPoint.y -= lineSpeed;
  }
}
