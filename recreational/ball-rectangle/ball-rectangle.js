import { Canvas } from "./Canvas.js";
import { Rectangle } from "./Rectangle.js";
import { Ball } from "./Ball.js";
import { Line } from "./Line.js";

const firstLayerCanvas = new Canvas();
const secondLayerCanvas = new Canvas();

const rectangle = new Rectangle();
const line = new Line(rectangle);
const ball = new Ball({
  centerPoint: {
    x: rectangle.topLeft.x + rectangle.width / 2,
    y: rectangle.topLeft.y + rectangle.height / 2,
  },
});

requestAnimationFrame(function rerenderFirstLayer() {
  firstLayerCanvas.clear();
  rectangle.draw(firstLayerCanvas.getContext());
});

let lastTime = 0;
function rerenderSecondLayer(currentTime) {
  secondLayerCanvas.clear();

  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  ball.move({ deltaTime, rectangle });
  line.move({ deltaTime });

  line.draw(secondLayerCanvas.getContext());
  ball.draw(secondLayerCanvas.getContext());

  requestAnimationFrame(rerenderSecondLayer);
}
requestAnimationFrame(rerenderSecondLayer);
