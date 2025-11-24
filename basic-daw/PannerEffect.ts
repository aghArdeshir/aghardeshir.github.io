export class PannerEffect {
  private pannerNode = window.basicdaw.audioContext.createStereoPanner();

  constructor() {
    this.pannerNode.pan.value = 0;
  }

  setInputNode(inputNode: AudioNode): AudioNode {
    inputNode.connect(this.pannerNode);
    return this.pannerNode;
  }

  disconnect() {
    this.pannerNode.disconnect();
  }

  setPan(pan: number) {
    this.pannerNode.pan.value = pan;
  }

  renderUi(container: HTMLElement) {
    const wrapper = document.createElement("div");
    container.appendChild(wrapper);
    wrapper.style.border = "1px solid #ccc";

    const label = document.createElement("label");
    label.textContent = "Pan";
    wrapper.appendChild(label);

    const panSlider = document.createElement("input");
    panSlider.type = "range";
    panSlider.min = "-1";
    panSlider.max = "1";
    panSlider.step = "0.01";
    panSlider.value = "0";
    wrapper.appendChild(panSlider);
    panSlider.addEventListener("input", () => {
      this.setPan(parseFloat(panSlider.value));
    });

    return wrapper;
  }
}
