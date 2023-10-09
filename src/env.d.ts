/// <reference types="vite/client" />

interface ImportMetaEnv {
  REACT_APP_LNG: SupportedLanguages;
}

declare module "import-meta" {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
