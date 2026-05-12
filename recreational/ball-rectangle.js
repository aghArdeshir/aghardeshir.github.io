const ctx = document.querySelector("canvas").getContext("2d");

const rect = { x: 100, y: 100, width: 400, height: 400 };
const ball = {
  x: rect.x + rect.width / 2,
  y: rect.y + rect.height / 2,
  radius: 20,
};
const direction = { x: Math.random(), y: Math.random() };
const ballSpeed = 1;

const rectTopRight = {
  x: rect.x + rect.width,
  y: rect.y,
};
const rectBottomRight = {
  x: rect.x + rect.width,
  y: rect.y + rect.height,
};

const lineLength = 200;
const lineSpeed = 0.5;
let lineStart = rect.x;

function rerender() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.strokeStyle = "white";
  ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);

  drawLine(ctx);

  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();

  requestAnimationFrame(rerender);
}

requestAnimationFrame(rerender);

setInterval(() => {
  moveBall();
  moveLine();
}, 1);

function moveBall() {
  const magnitude = Math.sqrt(direction.x ** 2 + direction.y ** 2);
  ball.x += (direction.x / magnitude) * ballSpeed;
  ball.y += (direction.y / magnitude) * ballSpeed;

  const hitRightWall = ball.x + ball.radius > rect.x + rect.width;
  const hitLeftWall = ball.x - ball.radius < rect.x;
  const hitBottomWall = ball.y + ball.radius > rect.y + rect.height;
  const hitTopWall = ball.y - ball.radius < rect.y;

  if (hitRightWall) {
    direction.x = -1;
  } else if (hitLeftWall) {
    direction.x = 1;
  }

  if (hitBottomWall) {
    direction.y = -1;
  } else if (hitTopWall) {
    direction.y = 1;
  }
}

function drawLine(ctx) {
  ctx.strokeStyle = "red";
  ctx.beginPath();

  const shouldBeHorizontal = lineStart < rectTopRight.x;
  if (shouldBeHorizontal) {
    ctx.moveTo(lineStart, rect.y);
    const horizontalLineLength = Math.min(
      lineLength,
      rectTopRight.x - lineStart,
    );
    ctx.lineTo(lineStart + horizontalLineLength, rect.y);
  }

  const shouldBeVertical = lineStart + lineLength >= rectTopRight.x;
  if (shouldBeVertical) {
    const horizontalLineLength = Math.min(
      lineLength,
      rectTopRight.x - lineStart,
    );
    const verticalLineLength = lineLength - horizontalLineLength;
    ctx.moveTo(
      rectTopRight.x,
      Math.max(rect.y, rectTopRight.y + verticalLineLength - lineLength),
    );
    ctx.lineTo(rectTopRight.x, rect.y + verticalLineLength);
  }

  ctx.stroke();
}

function moveLine() {
  lineStart += lineSpeed;
}

setInterval(() => {
  window.location.reload();
}, 10000);
