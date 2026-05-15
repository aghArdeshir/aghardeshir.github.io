const ctx = document.querySelector("canvas").getContext("2d");

const rectTopLeft = {
  x: 100,
  y: 100,
};
const rectDimensions = { width: 400, height: 400 };
const rectTopRight = {
  x: rectTopLeft.x + rectDimensions.width,
  y: rectTopLeft.y,
};
const rectBottomRight = {
  x: rectTopLeft.x + rectDimensions.width,
  y: rectTopLeft.y + rectDimensions.height,
};
const rectBottomLeft = {
  x: rectTopLeft.x,
  y: rectTopLeft.y + rectDimensions.height,
};

const ball = {
  x: rectTopLeft.x + rectDimensions.width / 2,
  y: rectTopLeft.y + rectDimensions.height / 2,
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
  ctx.strokeRect(
    rectTopLeft.x,
    rectTopLeft.y,
    rectDimensions.width,
    rectDimensions.height,
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
  const isOnTopEdge =
    lineStartPoint.x < rectTopRight.x && lineStartPoint.y === rectTopLeft.y;
  const isOnRightEdge =
    lineStartPoint.x === rectTopRight.x && lineStartPoint.y < rectBottomRight.y;
  const isOnBottomEdge =
    lineStartPoint.y === rectBottomRight.y &&
    lineStartPoint.x > rectBottomLeft.x;
  const isOnLeftEdge = lineStartPoint.x === rectTopLeft.x && lineStartPoint.y > rectTopLeft.y;

  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(lineStartPoint.x, lineStartPoint.y);
  if (isOnTopEdge) {
    ctx.lineTo(
      Math.min(lineStartPoint.x + lineLength, rectTopRight.x),
      lineStartPoint.y,
    );
    if (lineStartPoint.x + lineLength > rectTopRight.x) {
      ctx.lineTo(
        rectTopRight.x,
        Math.min(
          lineStartPoint.y + lineLength - (rectTopRight.x - lineStartPoint.x),
          rectBottomRight.y,
        ),
      );
    }
  } else if (isOnRightEdge) {
    ctx.lineTo(
      lineStartPoint.x,
      Math.min(lineStartPoint.y + lineLength, rectBottomRight.y),
    );
    if (lineStartPoint.y + lineLength > rectBottomRight.y) {
      ctx.lineTo(
        Math.max(
          lineStartPoint.x -
            lineLength +
            (rectBottomRight.y - lineStartPoint.y),
          rectTopLeft.x,
        ),
        rectBottomRight.y,
      );
    }
  } else if (isOnBottomEdge) {
    ctx.lineTo(
      Math.max(lineStartPoint.x - lineLength, rectBottomLeft.x),
      lineStartPoint.y,
    );
    if (lineStartPoint.x - lineLength < rectBottomLeft.x) {
      ctx.lineTo(
        rectBottomLeft.x,
        Math.max(
          lineStartPoint.y - lineLength + (lineStartPoint.x - rectBottomLeft.x),
          rectTopLeft.y,
        ),
      );
    }
  } else if (isOnLeftEdge) {
    ctx.lineTo(
      lineStartPoint.x,
      Math.max(lineStartPoint.y - lineLength, rectTopLeft.y),
    );
    if (lineStartPoint.y - lineLength < rectTopLeft.y) {
      ctx.lineTo(
        Math.min(
          lineStartPoint.x + lineLength - (lineStartPoint.y - rectTopLeft.y),
          rectTopRight.x,
        ),
        rectTopLeft.y,
      );
    }
  }

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
  const isOnLeftEdge = lineStartPoint.x === rectTopLeft.x && lineStartPoint.y > rectTopLeft.y;

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
