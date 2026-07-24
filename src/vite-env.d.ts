/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BYTEBIN_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
