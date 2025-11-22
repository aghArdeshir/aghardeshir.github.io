import { AudioTrack } from "./AudioTrack";

// empty export, so this file becomes a module, and typescript is happy about defining types in it
export {};

declare global {
  interface Window {
    basicdaw: {
      tracks: AudioTrack[];
      audioContext: AudioContext;
    };
  }
}
