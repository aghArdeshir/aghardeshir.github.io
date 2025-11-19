export class Track {
  private blobUrl: string;
  public name: string;

  constructor() {}

  setFile(file: File) {
    this.setName(file.name);

    // TODO: revoke the blob URL when the track is deleted
    this.blobUrl = URL.createObjectURL(file);
  }

  play() {
    const audio = new Audio(this.blobUrl);
    audio.play();
  }

  setName(name: string) {
    this.name = name;
  }
}
