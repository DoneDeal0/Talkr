import * as React from "react";
import { createContext, useState, useContext } from "react";

export interface TalkrProps {
  children: React.ReactNode;
  languages: { [key: string]: {} };
  defaultLanguage: string;
  detectBrowserLanguage?: boolean;
}

export interface TProps {
  key: string;
  params?: { count?: number; [key: string]: any };
}

export interface TalkrContext {
  locale: string;
  setLocale: (language: string) => void;
  languages: { [key: string]: {} };
  defaultLanguage: string;
}

const browserLanguage = typeof navigator !== 'undefined' ? navigator.language.split("-")[0] : null;
const TalkrContext = createContext<TalkrContext | null>(null);

export function Talkr({
  children,
  languages,
  defaultLanguage,
  detectBrowserLanguage,
}: TalkrProps) {
  const [locale, setLocale] = useState(
    detectBrowserLanguage && browserLanguage ? browserLanguage : defaultLanguage
  );
  return (
    <TalkrContext.Provider
      value={{ locale, setLocale, languages, defaultLanguage }}
    >
      {children}
    </TalkrContext.Provider>
  );
}

export function T(
  key: TProps["key"],
  params?: TProps["params"]
): string | null {
  const { locale, languages, defaultLanguage } = useLocale();
  const currentLocale = !languages[locale] ? defaultLanguage : locale;
  let result = languages[currentLocale] as TalkrProps["languages"];
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
    ) as TProps["params"]);
  return currentParams
    ? result
        //@ts-ignore
        .split("__")
        .map((word: string) =>
          currentParams[word] ? currentParams[word] : word
        )
        .join("")
    : result;
}

export function useLocale(): TalkrContext {
  const data = useContext(TalkrContext);
  if (data == null) {
    throw new Error('This should only be called inside Talkr');
  }
  return data;
}
