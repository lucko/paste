/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BYTEBIN_URL?: string;
  readonly VITE_USE_QUERY_ROUTING?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
