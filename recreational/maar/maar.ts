const speed = 1; // Adjust speed as needed

const maarHead = document.createElement("div");
maarHead.style.width = "10px";
maarHead.style.height = "10px";
maarHead.style.backgroundColor = "red";
maarHead.style.position = "fixed";
maarHead.style.top = "0px";
maarHead.style.left = "0px";

document.body.style.cursor = "none";

document.body.appendChild(maarHead);

const target = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  target.x = event.clientX;
  target.y = event.clientY;
});

const positionHistory = [];

setInterval(() => {
  const currentX = Number.parseFloat(maarHead.style.left || "0");
  const currentY = Number.parseFloat(maarHead.style.top || "0");

  const deltaX = target.x - currentX;
  const deltaY = target.y - currentY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  if (distance > speed) {
    maarHead.style.left = currentX + (deltaX / distance) * speed + "px";
    maarHead.style.top = currentY + (deltaY / distance) * speed + "px";
  } else {
    maarHead.style.left = target.x + "px";
    maarHead.style.top = target.y + "px";
  }

  positionHistory.push({ x: currentX, y: currentY });
  console.log('position history', positionHistory);
}, 10);
