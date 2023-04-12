import { TParams, TrContext } from "./models";

const getPlural = (count: number, locale: string) => {
  if (typeof Intl == "object" && typeof Intl.PluralRules == "function") {
    return new Intl.PluralRules(locale).select(count);
  }
  
  switch (count){
  case 0:
    return 'zero'
  case 1:
    return 'one'
  default:
    return 'many'
  }
};

export function tr<Key extends string, Params extends TParams>(
  { locale, languages, defaultLanguage }: TrContext,
  key: Key,
  params?: Params
): string {
  const currentLocale = !languages[locale] ? defaultLanguage : locale;
  let result = languages[currentLocale];
  let currentKey: string = key;
  
  if (params && typeof params.count === 'number'){
    const plural = getPlural(params.count, currentLocale)

    currentKey += `.${plural}`
  }

  if (params && params["gender"]) {
    currentKey += params.gender === "m" ? ".male" : ".female";
  }
  currentKey.split(".").forEach((k: string) => {
    if (!result[k]) return;
    return (result = result[k]);
  });
  if (typeof result !== "string") {
    console.warn(`Talkr: Missing translation for ${key}`);
    return "";
  }
  return params
    ? result
        .split("__")
        .map((word: string) => params[word] || word)
        .join("")
    : result;
}
