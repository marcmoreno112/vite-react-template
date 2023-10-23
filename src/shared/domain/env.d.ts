/// <reference types="vite/client" />

// Agregar aquí los idiomas soportados
export type SupportedLanguages = "es" | "en";

interface ImportMetaEnv {
  VITE_REACT_APP_LNG: SupportedLanguages;
  VITE_REACT_APP_CONSOLE_LOG_VISUALIZE_LEVEL: string;
}

declare module "import-meta" {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
