const ctx = document.querySelector("canvas").getContext("2d");

const rectTopLeft = {
  x: 100,
  y: 100,
};
const rect = { x: rectTopLeft.x, y: rectTopLeft.y, width: 400, height: 400 };
const rectTopRight = {
  x: rectTopLeft.x + rect.width,
  y: rectTopLeft.y,
};
const rectBottomRight = {
  x: rectTopLeft.x + rect.width,
  y: rectTopLeft.y + rect.height,
};
const rectBottomLeft = {
  x: rectTopLeft.x,
  y: rectTopLeft.y + rect.height,
};

const ball = {
  x: rectTopLeft.x + rect.width / 2,
  y: rectTopLeft.y + rect.height / 2,
  radius: 20,
};
const ballDirection = { x: Math.random(), y: Math.random() };
const ballSpeed = 1;

const lineLength = 200;
const lineSpeed = 0.5;
const lineStartPoint = {
  x: rectTopLeft.x,
  y: rectTopLeft.y,
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
  ctx.strokeRect(rectTopLeft.x, rectTopLeft.y, rect.width, rect.height);
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

  const hitRightWall = ball.x + ball.radius > rectTopRight.x;
  const hitLeftWall = ball.x - ball.radius < rectTopLeft.x;
  const hitBottomWall = ball.y + ball.radius > rectBottomLeft.y;
  const hitTopWall = ball.y - ball.radius < rectTopLeft.y;

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
  ctx.strokeStyle = "red";
  ctx.beginPath();

  ctx.arc(lineStartPoint.x, lineStartPoint.y, 5, 0, Math.PI * 2);

  ctx.stroke();
}

function moveLine() {
  const isOnTopEdge =
    lineStartPoint.x < rectTopRight.x && lineStartPoint.y === rectTopLeft.y;
  const isOnRightEdge =
    lineStartPoint.x === rectTopRight.x && lineStartPoint.y < rectBottomRight.y;
  const isOnBottomEdge =
    lineStartPoint.y === rectBottomRight.y &&
    lineStartPoint.x > rectBottomLeft.x;
  const isOnLeftEdge = lineStartPoint.x === rect.x && lineStartPoint.y > rect.y;

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
