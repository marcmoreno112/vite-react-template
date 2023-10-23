import { SupportedLanguages } from "../../shared/domain/env";
import { TranslationKeys } from "./Itranslations";
import resources from "./translations";

export default function t(tag: TranslationKeys): string {
  const traduction =
    resources[import.meta.env.VITE_VITE_REACT_APP_LNG as SupportedLanguages]
      .translation[tag];

  if (traduction === undefined) {
    return tag;
  }

  return traduction;
}
