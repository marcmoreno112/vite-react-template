import { SupportedLanguages } from "../env";
import { ErrorKeys } from "../error/IerrorController";

export type TranslationKeys =
  | ErrorKeys
  | "_01_LoginTitle"
  | "_01_LoginUserLabel"
  | "_01_LoginUserText"
  | "_01_LoginPasswordLabel"
  | "_01_LoginPasswordText"
  | "_01_LoginSubmitButtonText"
  | "_01_LoginFeedbackOk"
  | "_01_LoginFeedbackErrorHeading"
  | "_02_ImportColumn"
  | "_02_ImportRow"
  | "_02_ImportTitle"
  | "_02_ImportSelectButtonLabel"
  | "_02_ImportSelectButtonText"
  | "_02_ImportSubmitButtonLabel"
  | "_02_ImportSubmitButtonText"
  | "_02_ImportFeedbackOk"
  | "_03_LogoutButtonText"
  | "_03_LogoutButtonLabel";

type Translation = {
  [key in TranslationKeys]: string;
};

interface LanguageResources {
  translation: Translation;
}

export type Resources = {
  [language in SupportedLanguages]: LanguageResources;
};
