export class Header {
  render(rootContainer: HTMLElement) {
    const headerDom = document.createElement("div");
    headerDom.className = "header";
    rootContainer.appendChild(headerDom);
    headerDom.textContent = "World MMO Header";
  }
}
