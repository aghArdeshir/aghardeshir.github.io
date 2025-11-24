import { AudioTrackWebComponent } from "./AudioTrackWebComponent";
import { GainEffect } from "./GainEffect";
import { PannerEffect } from "./PannerEffect";

export class AudioTrack {
  private blobUrl: string;
  public name: string;
  private effects: (GainEffect | PannerEffect)[] = [];
  public readonly id = crypto.randomUUID();
  private trackComponent: AudioTrackWebComponent;
  private trackSource: MediaElementAudioSourceNode;

  constructor() {
    this.addGainEffect();
  }

  setFile(file: File) {
    this.setName(file.name);

    // TODO: revoke the blob URL when the track is deleted
    this.blobUrl = URL.createObjectURL(file);

    const audioContext = window.basicdaw.audioContext;
    this.trackSource = audioContext.createMediaElementSource(
      new Audio(this.blobUrl)
    );

    this.setupRoutes();
  }

  private disconnectAll() {
    this.trackSource.disconnect();
    this.effects.forEach((effect) => effect.disconnect());
  }

  setupRoutes() {
    this.disconnectAll();

    let lastNode: AudioNode = this.trackSource;
    this.effects.forEach((effect) => {
      lastNode = effect.setInputNode(lastNode);
    });
    lastNode.connect(window.basicdaw.audioContext.destination);
  }

  play() {
    this.trackSource.mediaElement.play();
  }

  delete() {
    this.disconnectAll();

    URL.revokeObjectURL(this.blobUrl);
  }

  setName(name: string) {
    this.name = name;
  }

  addGainEffect() {
    const gainEffect = new GainEffect();
    this.effects.push(gainEffect);
  }

  addPannerEffect() {
    const pannerEffect = new PannerEffect();
    this.effects.push(pannerEffect);
    this.setupRoutes();
  }

  renderUi(container: HTMLElement) {
    this.trackComponent = document.createElement("basicdaw-audio-track");
    this.trackComponent.setAttribute("data-track-id", this.id);
    container.appendChild(this.trackComponent);
    this.trackComponent.addEventListener("add-gain-effect", () => {
      this.addGainEffect();
      this.renderEffectsUi();
    });
    this.trackComponent.addEventListener("add-panner-effect", () => {
      this.addPannerEffect();
      this.renderEffectsUi();
    });
    this.renderEffectsUi();
  }

  renderEffectsUi() {
    const effectsContainer = this.trackComponent.getEffectsContainer();
    effectsContainer.innerHTML = "";
    this.effects.forEach((effect) => {
      const effectWrapper = effect.renderUi(effectsContainer);

      const deleteEffectButton = document.createElement("button");
      deleteEffectButton.textContent = "Delete Effect";
      effectsContainer.appendChild(deleteEffectButton);

      deleteEffectButton.addEventListener("click", () => {
        this.effects = this.effects.filter((e) => e !== effect);
        this.setupRoutes();
        effectsContainer.removeChild(effectWrapper);
        effectsContainer.removeChild(deleteEffectButton);
      });
    });
  }
}

// TODO: what if we add or delete effects?
