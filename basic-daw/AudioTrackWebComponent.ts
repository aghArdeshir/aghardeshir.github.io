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
    trackText.style.display = 'block';
    wrapper.appendChild(trackText);

    const trackTitle = document.createElement("span");
    trackTitle.textContent = this.track.name;
    trackTitle.style.display = 'block';
    wrapper.appendChild(trackTitle);

    shadow.appendChild(wrapper);
  }
}

export function registerWebCompoenent_BasicdawTrack() {
  customElements.define("basicdaw-track", AudioTrackWebComponent);
}
