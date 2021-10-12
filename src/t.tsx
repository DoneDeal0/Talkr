import { useContext } from "react";
import { TalkrContext } from ".";
import { TParams } from "./models";

export function T<Key extends string, Params extends TParams>(
  key: Key,
  params?: Params
): string | null {
  const { locale, languages, defaultLanguage } = useContext(TalkrContext);
  const currentLocale = !languages[locale] ? defaultLanguage : locale;
  let result = languages[currentLocale];
  let currentKey: string = key;
  if (params && Object.keys(params).includes("count")) {
    let plural = new Intl.PluralRules(currentLocale).select(
      params.count as number
    );
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
    console.warn(`Talkr: Missing translation for ${key}`);
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
}
