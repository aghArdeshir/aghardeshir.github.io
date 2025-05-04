export class CellPopup {
  render() {
    const cellPopupDom = document.createElement("div");
    cellPopupDom.className = "cell-popup";
    document.body.appendChild(cellPopupDom);
    cellPopupDom.textContent = "Cell Popup";

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.onclick = () => {
      cellPopupDom.remove();
    };
    cellPopupDom.appendChild(closeButton);

    const installFactoryButton = document.createElement("button");
    installFactoryButton.textContent = "Install Factory";
    installFactoryButton.onclick = () => {
      console.log("Installing factory");
      cellPopupDom.remove();
    };
    cellPopupDom.appendChild(installFactoryButton);
  }
}
