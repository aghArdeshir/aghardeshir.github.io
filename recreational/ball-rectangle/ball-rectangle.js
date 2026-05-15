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

let lastTime = 0;
function rerenderSecondLayer(currentTime) {
  firstLayerCanvas.clear();

  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  ball.move({ deltaTime, rectangle });
  line.move({ deltaTime });

  line.draw(firstLayerCanvas.getContext());
  ball.draw(firstLayerCanvas.getContext());

  requestAnimationFrame(rerenderSecondLayer);
}
requestAnimationFrame(rerenderSecondLayer);

requestAnimationFrame(function rerenderFirstLayer() {
  secondLayerCanvas.clear();
  rectangle.draw(secondLayerCanvas.getContext());
});
