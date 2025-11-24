import { AudioTrackWebComponent } from "./AudioTrackWebComponent";
import { GainEffect } from "./GainEffect";

export class AudioTrack {
  private blobUrl: string;
  public name: string;
  private effects: GainEffect[] = [];
  public readonly id = crypto.randomUUID();
  private trackComponent: AudioTrackWebComponent;
  private trackSource: MediaElementAudioSourceNode;

  constructor() {
    const gainEffect = new GainEffect();
    this.effects.push(gainEffect);
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

  setupRoutes() {
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
    this.effects.forEach((effect) => {
      effect.disconnect();
    });

    URL.revokeObjectURL(this.blobUrl);
  }

  setName(name: string) {
    this.name = name;
  }

  renderUi(container: HTMLElement) {
    this.trackComponent = document.createElement("basicdaw-audio-track");
    this.trackComponent.setAttribute("data-track-id", this.id);
    container.appendChild(this.trackComponent);

    this.effects.forEach((effect) => {
      const effectsContainer = this.trackComponent.getEffectsContainer();
      const effectWrapper = effect.renderUi(effectsContainer);

      const deleteEffectButton = document.createElement("button");
      deleteEffectButton.textContent = "Delete Effect";
      effectsContainer.appendChild(deleteEffectButton);

      deleteEffectButton.addEventListener("click", () => {
        effect.disconnect();
        this.effects = this.effects.filter((e) => e !== effect);
        this.setupRoutes();
        effectsContainer.removeChild(effectWrapper);
        effectsContainer.removeChild(deleteEffectButton);
      });
    });
  }
}

// TODO: what if we add or delete effects?
