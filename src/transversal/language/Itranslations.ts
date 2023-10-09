export type TranslationKeys =
  | "_01_LoginTitle"
  | "_01_LoginUserLabel"
  | "_01_LoginUserText"
  | "_01_LoginPasswordLabel"
  | "_01_LoginPasswordText"
  | "_01_LoginSubmitButtonLabel"
  | "_01_LoginSubmitButtonText"
  | "_01_LoginFeedbackOk"
  | "_01_LoginFeedbackError"
  | "_02_ImportTitle"
  | "_02_ImportSelectButtonLabel"
  | "_02_ImportSelectButtonText"
  | "_02_ImportSubmitButtonLabel"
  | "_02_ImportSubmitButtonText"
  | "_02_ImportFeedbackOk"
  | "_02_ImportFeedbackError"
  | "_03_LogoutButtonText"
  | "_03_LogoutButtonLabel";

type Translation = {
  [key in TranslationKeys]: string;
};

interface LanguageResources {
  translation: Translation;
}

// Agregar aquí los idiomas soportados
export type SupportedLanguages = "es" | "en";

export type Resources = {
  [language in SupportedLanguages]: LanguageResources;
};
