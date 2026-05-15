export class Canvas {
  getContext() {
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 600;
    canvas.style.position = "absolute";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    return ctx;
  }
}
