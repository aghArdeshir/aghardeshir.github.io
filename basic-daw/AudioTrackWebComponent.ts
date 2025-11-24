import { AudioTrack } from "./AudioTrack";

export class AudioTrackWebComponent extends HTMLElement {
  static observedAttributes = ["data-track-id"];
  private track: AudioTrack;
  private shadow: ShadowRoot;

  attributeChangedCallback() {
    const trackId = this.getAttribute("data-track-id");

    if (!trackId) throw new Error("Track ID is missing");

    this.track = window.basicdaw.tracks.find((t) => t.id === trackId);
  }

  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    wrapper.style.width = "80vw";
    wrapper.style.minHeight = "50px";
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

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Track";
    deleteButton.style.marginLeft = "20px";
    wrapper.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => {
      window.basicdaw.deleteTrack(this.track);
      this.shadow.host.remove();
    });

    const addGainEffectButton = document.createElement("button");
    addGainEffectButton.textContent = "Add Gain Effect";
    addGainEffectButton.style.marginLeft = "20px";
    wrapper.appendChild(addGainEffectButton);

    addGainEffectButton.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("add-gain-effect", { bubbles: true }));
    });

    const addPannerEffectButton = document.createElement("button");
    addPannerEffectButton.textContent = "Add Panner Effect";
    addPannerEffectButton.style.marginLeft = "20px";
    wrapper.appendChild(addPannerEffectButton);

    addPannerEffectButton.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("add-panner-effect", { bubbles: true })
      );
    });

    const effectsContainer = document.createElement("div");
    effectsContainer.style.marginTop = "10px";
    effectsContainer.dataset.role = "effects-container";
    wrapper.appendChild(effectsContainer);

    this.shadow.appendChild(wrapper);
  }

  getEffectsContainer(): HTMLElement {
    return this.shadow.querySelector(
      'div[data-role="effects-container"]'
    ) as HTMLElement;
  }
}

export function registerWebCompoenent_BasicdawTrack() {
  customElements.define("basicdaw-audio-track", AudioTrackWebComponent);
}
