const ctx = document.querySelector("canvas").getContext("2d");

const rect = { x: 100, y: 100, width: 400, height: 400 };
const ball = {
  x: rect.x + rect.width / 2,
  y: rect.y + rect.height / 2,
  radius: 20,
};
const direction = { x: Math.random(), y: Math.random() };
const ballSpeed = 1;
const lineLength = 200;
const line = [
  {
    x: rect.x,
    y: rect.y,
    length: lineLength,
  },
  {
    x: 0,
    y: 0,
    length: 0,
  },
];
const lineSpeed = 0.5;

const rectTopRight = {
  x: rect.x + rect.width,
  y: rect.y,
};
const rectBottomRight = {
  x: rect.x + rect.width,
  y: rect.y + rect.height,
};

function rerender() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.strokeStyle = "white";
  ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);

  ctx.strokeStyle = "red";
  ctx.beginPath();
  if (line[0].length) {
    ctx.moveTo(line[0].x, line[0].y);
    ctx.lineTo(line[0].x + line[0].length, line[0].y);
  }
  if (line[1].length) {
    ctx.lineTo(line[1].x, line[1].y);
    ctx.lineTo(line[1].x, line[1].y + line[1].length);
  }
  ctx.stroke();

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

function moveLine() {
  const isOnTopEdge = line[0].x + line[0].length <= rect.x + rect.width;
  const sharesTopAndRightEdge =
    line[0].x < rect.x + rect.width &&
    line[0].x + line[0].length > rect.x + rect.width;

  const isOnRightEdge = line[0].x >= rectTopRight.x;

  if (isOnTopEdge) {
    line[1].length = 0;
    line[1].x = 0;
    line[1].y = 0;
    line[0].x += lineSpeed;
  } else if (sharesTopAndRightEdge) {
    line[0].length = rectTopRight.x - line[0].x;
    line[0].x += lineSpeed;

    line[1].length = lineLength - line[0].length;
    line[1].x = rectTopRight.x;
    line[1].y = rectTopRight.y + lineSpeed;
  } else if (isOnRightEdge) {
    line[0].length = 0;
    line[0].x += rectTopRight.x;

    line[1].length = lineLength;
    line[1].x = rectTopRight.x;
    line[1].y = line[1].y + lineSpeed;

    if (line[0].x > rectTopRight.x) {
      line[0].x = rectTopRight.x;
    }
  }
}

function randomBool() {
  return Math.random() < 0.5;
}

function randomSign() {
  return randomBool() ? 1 : -1;
}

setInterval(() => {
  window.location.reload();
}, 10000);
