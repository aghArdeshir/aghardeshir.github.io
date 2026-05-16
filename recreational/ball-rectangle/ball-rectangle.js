import { Canvas } from "./Canvas.js";
import { Grid } from "./Grid.js";
import { Rectangle } from "./Rectangle.js";
import { Ball } from "./Ball.js";
import { Line } from "./Line.js";

const firstLayerCanvas = new Canvas();
const secondLayerCanvas = new Canvas();

const rectangle = new Rectangle();
const line = new Line(rectangle);

const balls = [
  new Ball({
    centerPoint: rectangle.getCenter(),
  }),
];

requestAnimationFrame(function renderFirstLayer() {
  firstLayerCanvas.clear();
  rectangle.draw(firstLayerCanvas.getContext());
  // new Grid().draw(firstLayerCanvas.getContext());
});

let lastTime = 0;
function rerenderSecondLayer(currentTime) {
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  secondLayerCanvas.clear();

  for (const ball of balls) ball.move({ deltaTime, rectangle });
  line.move({ deltaTime });

  line.draw(secondLayerCanvas.getContext());
  for (const ball of balls) ball.draw(secondLayerCanvas.getContext());

  for (const ball of balls) {
    if (ball.hitsLine(line)) {
      balls.splice(balls.indexOf(ball), 1);
      balls.push(new Ball({ centerPoint: rectangle.getCenter() }));
      balls.push(new Ball({ centerPoint: rectangle.getCenter() }));
    }
  }

  requestAnimationFrame(rerenderSecondLayer);
}
requestAnimationFrame(rerenderSecondLayer);

setTimeout(() => {
  window.location.reload();
}, 20000);