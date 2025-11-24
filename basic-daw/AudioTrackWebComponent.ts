import { AudioTrack } from "./AudioTrack";

class AudioTrackWebComponent extends HTMLElement {
  static observedAttributes = ["data-track-index"];
  private track: AudioTrack;

  attributeChangedCallback() {
    const trackIndexAsString = this.getAttribute("data-track-index");

    if (!trackIndexAsString) {
      return;
    }

    const trackIndex = parseInt(trackIndexAsString);
    this.track = window.basicdaw.tracks[trackIndex];
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    wrapper.style.width = "80vw";
    wrapper.style.height = "50px";
    wrapper.style.border = "1px solid white";
    wrapper.style.padding = "10px";

    const trackText = document.createElement("span");
    trackText.textContent = "Track";
    trackText.style.display = "block";
    wrapper.appendChild(trackText);

    const trackTitle = document.createElement("span");
    trackTitle.textContent = this.track.name;
    trackTitle.style.display = "block";
    wrapper.appendChild(trackTitle);

    const gainSlider = document.createElement("input");
    gainSlider.type = "range";
    gainSlider.min = "0";
    gainSlider.max = "1";
    gainSlider.step = "0.01";
    gainSlider.value = "1";
    wrapper.appendChild(gainSlider);
    gainSlider.addEventListener("input", () => {
      this.track.setGain(parseFloat(gainSlider.value));
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Track";
    deleteButton.style.marginLeft = "20px";
    wrapper.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => {
      window.basicdaw.deleteTrack(this.track);
      shadow.host.remove();
    });

    const addEffectButton = document.createElement("button");
    addEffectButton.textContent = "Add Effect";
    addEffectButton.style.marginLeft = "20px";
    wrapper.appendChild(addEffectButton);

    shadow.appendChild(wrapper);
  }
}

export function registerWebCompoenent_BasicdawTrack() {
  customElements.define("basicdaw-track", AudioTrackWebComponent);
}
