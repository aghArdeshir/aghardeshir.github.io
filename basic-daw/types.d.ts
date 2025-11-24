import { AudioTrack } from "./AudioTrack";
import { AudioTrackWebComponent } from "./AudioTrackWebComponent";

// empty export, so this file becomes a module, and typescript is happy about defining types in it
export {};

declare global {
  interface Window {
    basicdaw: {
      tracks: AudioTrack[];
      audioContext: AudioContext;
      deleteTrack(trackToDelete: AudioTrack): void;
    };
  }

  interface HTMLElementTagNameMap {
    "basicdaw-audio-track": AudioTrackWebComponent;
  }
}
