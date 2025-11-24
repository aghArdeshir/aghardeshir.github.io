export class AudioTrack {
  private blobUrl: string;
  public name: string;
  private gainNode: GainNode;
  public readonly id = crypto.randomUUID();

  constructor() {
    this.gainNode = window.basicdaw.audioContext.createGain();
    this.gainNode.gain.value = 1;
  }

  setFile(file: File) {
    this.setName(file.name);

    // TODO: revoke the blob URL when the track is deleted
    this.blobUrl = URL.createObjectURL(file);
  }

  play() {
    const audioContext = window.basicdaw.audioContext;
    const trackSource = audioContext.createMediaElementSource(
      new Audio(this.blobUrl)
    );

    trackSource.connect(this.gainNode);
    this.gainNode.connect(audioContext.destination);
    trackSource.mediaElement.play();
  }

  setGain(gain: number) {
    this.gainNode.gain.value = gain;
  }

  delete() {
    this.gainNode.disconnect();
    URL.revokeObjectURL(this.blobUrl);
  }

  setName(name: string) {
    this.name = name;
  }

  renderUi(container: HTMLElement) {
    const trackComponent = document.createElement("basicdaw-audio-track");
    trackComponent.setAttribute("data-track-id", this.id);
    container.appendChild(trackComponent);
  }
}
