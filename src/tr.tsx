import { TParams, TrContext } from "./models";

const getPlural = (count: number, locale: string) => {
  if (typeof Intl == "object" && typeof Intl.PluralRules == "function") {
    return new Intl.PluralRules(locale).select(count);
  }
  return count === 0 ? "zero" : count === 1 ? "one" : "other";
};

const getList = (list: Array<string>, locale: string, options: TParams) => {
  if (typeof Intl == "object" && typeof Intl.ListFormat == "function") {
    const formatter = new Intl.ListFormat(locale, {
      style: options?.listStyle || "narrow",
      type: options?.listType || "conjunction",
    });
    return formatter.format(list);
  }
  return list.join(", ");
};

export function tr<Key extends string, Params extends TParams>(
  { locale, languages, defaultLanguage }: TrContext,
  key: Key,
  params?: Params,
): string {
  const currentLocale = !languages[locale] ? defaultLanguage : locale;
  let result = languages[currentLocale];
  let currentKey: string = key;

  if (params && Object.keys(params).includes("count")) {
    const plural = getPlural(params.count as number, currentLocale);
    currentKey +=
      params.count === 0
        ? ".zero"
        : plural === "other"
          ? ".many"
          : `.${plural}`;
  }
  if (params?.gender) {
    currentKey += params.gender === "m" ? ".male" : ".female";
  }
  currentKey.split(".").forEach((k: string) => {
    if (!result[k]) return;
    return (result = result[k]);
  });
  if (Array.isArray(result)) {
    console.log("IS ARRAY", result);
    return getList(result, locale, params as Params);
  }
  if (typeof result === "string") {
    return params
      ? result
          .split("__")
          .map((word: string) => params[word] || word)
          .join("")
      : result;
  }
  //console.warn(`Talkr: Missing translation for ${key}`);
  return "";
}
