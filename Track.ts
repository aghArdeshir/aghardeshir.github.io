export class Track {
  private file: File;
  private blob: string;
  public name: string;

  constructor() {}

  setFile(file: File) {
    this.file = file;
    this.blob = URL.createObjectURL(file);
    this.setName(file.name);
  }

  play() {
    const audio = new Audio(this.blob);
    audio.play();
  }

  setName(name: string) {
    this.name = name;
  }
}
