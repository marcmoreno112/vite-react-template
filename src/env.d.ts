/// <reference types="vite/client" />

interface ImportMetaEnv {
  REACT_APP_LNG: SupportedLanguages;
  REACT_APP_CONSOLE_LOG_VISUALIZE_LEVEL: string;
}

declare module "import-meta" {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
