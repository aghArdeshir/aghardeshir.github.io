export class Money {
  amount: number = 0;
  growthRate: number = 1;
  moneyDom = document.createElement("div");

  constructor() {
    setInterval(() => {
      this.amount += this.growthRate;
      this.renderTextContent();
    }, 1000);
  }

  render(rootContainer: HTMLElement) {
    this.moneyDom.className = "money";
    rootContainer.appendChild(this.moneyDom);
    this.renderTextContent();
  }

  renderTextContent() {
    this.moneyDom.textContent = `Money: ${this.amount} (+${this.growthRate}/s)`;
  }
}
