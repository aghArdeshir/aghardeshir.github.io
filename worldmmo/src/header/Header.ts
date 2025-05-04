import { Money } from "./Money";

export class Header {
  money = new Money();

  render(rootContainer: HTMLElement) {
    const headerDom = document.createElement("div");
    headerDom.className = "header";
    rootContainer.appendChild(headerDom);

    this.money.render(headerDom);
  }
}
