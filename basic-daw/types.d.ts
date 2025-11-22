import { Track } from "./Track";

// empty export, so this file becomes a module, and typescript is happy about defining types in it
export {};

declare global {
  interface Window {
    opendaw: {
      tracks: Track[];
    };
  }
}
