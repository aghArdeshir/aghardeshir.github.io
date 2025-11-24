export class GainEffect {
  private gainNode = window.basicdaw.audioContext.createGain();

  constructor() {
    this.gainNode.gain.value = 1;
  }

  setInputNode(inputNode: AudioNode): AudioNode {
    inputNode.connect(this.gainNode);
    return this.gainNode;
  }

  disconnect() {
    this.gainNode.disconnect();
  }

  setGain(gain: number) {
    this.gainNode.gain.value = gain;
  }

  renderUi(container: HTMLElement) {
    const wrapper = document.createElement("div");
    container.appendChild(wrapper);

    wrapper.style.border = "1px solid #ccc";

    const label = document.createElement("label");
    label.textContent = "Gain";
    wrapper.appendChild(label);

    const gainSlider = document.createElement("input");
    gainSlider.type = "range";
    gainSlider.min = "0";
    gainSlider.max = "1";
    gainSlider.step = "0.01";
    gainSlider.value = "1";
    wrapper.appendChild(gainSlider);
    gainSlider.addEventListener("input", () => {
      this.setGain(parseFloat(gainSlider.value));
    });

    return wrapper;
  }
}
