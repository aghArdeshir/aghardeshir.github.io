document.body.style.backgroundColor = "black";
document.body.style.color = "white";

function renderStartPage() {
  // 0. Show loading
  const loading = document.createElement("div");
  loading.innerText = "Loading...";
  document.body.appendChild(loading);

  // 1. Tell backend a player joined
  const socket = new WebSocket("ws://localhost:3000");
}

renderStartPage();
