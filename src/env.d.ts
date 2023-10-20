/// <reference types="vite/client" />

// Agregar aquí los idiomas soportados
export type SupportedLanguages = "es" | "en";

interface ImportMetaEnv {
  REACT_APP_LNG: SupportedLanguages;
  REACT_APP_CONSOLE_LOG_VISUALIZE_LEVEL: string;
}

declare module "import-meta" {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
