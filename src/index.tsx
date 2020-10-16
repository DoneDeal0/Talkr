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

const browserLanguage = navigator.language.split("-")[0];
const TalkrContext = createContext<TalkrContext>({
  locale: "",
  setLocale: () => null,
  languages: {},
  defaultLanguage: "",
});

export function Talkr({
  children,
  languages,
  defaultLanguage,
  detectBrowserLanguage,
}: TalkrProps) {
  const [locale, setLocale] = useState(
    detectBrowserLanguage ? browserLanguage : defaultLanguage
  );
  return (
    <TalkrContext.Provider
      value={{ locale, setLocale, languages, defaultLanguage }}
    >
      {children}
    </TalkrContext.Provider>
  );
}

export function t(
  key: TProps["key"],
  params?: TProps["params"]
): string | null {
  const { locale, languages, defaultLanguage } = useContext<TalkrContext>(
    TalkrContext
  );
  const currentLocale = !languages[locale] ? defaultLanguage : locale;
  let result = languages[currentLocale] as TalkrProps["languages"];
  let currentKey = key;
  if (params && Object.keys(params).includes("count")) {
    //@ts-ignore
    currentKey = params.count > 1 ? `${key}.plural` : `${key}.default`;
  }
  currentKey.split(".").forEach((k: string) => {
    if (!result[k]) return;
    return (result = result[k]);
  });
  if (typeof result !== "string") return null;
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

export function useLocale() {
  return useContext(TalkrContext);
}
