import { Track } from "./Track";

class OdTrack extends HTMLElement {
  static observedAttributes = ["data-track-index"];
  private track: Track;

  attributeChangedCallback() {
    const trackIndexAsString = this.getAttribute("data-track-index");

    if (!trackIndexAsString) {
      return;
    }

    const trackIndex = parseInt(trackIndexAsString);
    this.track = window.opendaw.tracks[trackIndex];
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    wrapper.style.width = "100vw";

    wrapper.textContent = this.track.name;

    const playButton = document.createElement("button");
    playButton.textContent = "Play";

    wrapper.appendChild(playButton);
    playButton.addEventListener("click", this.play.bind(this));

    shadow.appendChild(wrapper);
  }

  play() {
    this.track.play();
  }
}

export function registerWebCompoenent_OdTrack() {
  customElements.define("od-track", OdTrack);
}
