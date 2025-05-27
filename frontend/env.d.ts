// add that vite types reference
/// <reference types="vite/client" />
export {};

declare module "*.mp3" {
  const src: string;
  export default src;
}

// augment import meta env from vite
