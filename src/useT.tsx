import { useContext } from "react";
import { TalkrContext } from ".";
import { KeyPath, TParams } from "./models";

export function useT() {
  const { languages, locale } = useContext(TalkrContext);
  const schemaLanguage = languages[locale];
  type Path = KeyPath<typeof schemaLanguage>;

  const T = (key: Path, params?: TParams): string | null => {
    const { locale, languages, defaultLanguage } = useContext(TalkrContext);
    const currentLocale = !languages[locale] ? defaultLanguage : locale;
    let result = languages[currentLocale] as TParams["languages"];
    let currentKey = key;
    if (params && Object.keys(params).includes("count")) {
      let plural = new Intl.PluralRules(currentLocale).select(
        params.count as number
      );
      //@ts-ignore
      currentKey =
        params.count === 0
          ? `${key}.zero`
          : plural === "other"
          ? `${key}.many`
          : `${key}.${plural}`;
    }
    currentKey.split(".").forEach((k: string) => {
      if (!result[k]) return;
      return (result = result[k]);
    });
    if (typeof result !== "string") {
      console.warn(`Talkr bot: Missing translation for ${key}`);
      return null;
    }
    const currentParams =
      params &&
      (Object.entries(params).reduce(
        (acc, cur) => ({ ...acc, [cur[0]]: cur[1].toString() }),
        {}
      ) as TParams["params"]);
    return currentParams
      ? result
          .split("__")
          .map((word: string) =>
            currentParams[word] ? currentParams[word] : word
          )
          .join("")
      : result;
  };
  return {
    T,
  };
}
