import * as React from "react";
import { createContext, useState, useContext, useMemo } from "react";

export interface TalkrProps {
  children: React.ReactNode;
  languages: { [key: string]: {} };
  mainLanguage?: string;
}

export interface TProps {
  key: string;
  params?: { count?: number; [key: string]: any };
}

export interface TalkrContext {
  locale: string;
  setLocale: (language: string) => void;
  languages: { [key: string]: {} };
  mainLanguage: string;
}

const defaultLanguage = navigator.language.split("-")[0];
const TalkrContext = createContext<any>(null);

export function Talkr({ children, languages, mainLanguage }: TalkrProps) {
  const [locale, setLocale] = useState(mainLanguage || defaultLanguage);
  return (
    <TalkrContext.Provider
      value={{ locale, setLocale, languages, mainLanguage }}
    >
      {children}
    </TalkrContext.Provider>
  );
}

export function t(
  key: TProps["key"],
  params?: TProps["params"]
): string | null {
  const { locale, languages, mainLanguage } = useContext<TalkrContext>(
    TalkrContext
  );
  const currentLocale = !languages[locale] ? mainLanguage : locale;
  let currentKey = key;
  if (params && Object.keys(params).includes("count")) {
    //@ts-ignore
    currentKey = params.count > 1 ? `${key}.plural` : `${key}.default`;
  }
  let result = languages[currentLocale];
  useMemo(
    () =>
      currentKey.split(".").forEach((k) => {
        //@ts-ignore
        if (!result[k]) return;
        //@ts-ignore
        return (result = result[k]);
      }),
    []
  );
  if (typeof result !== "string") return null;
  const currentParams =
    params &&
    Object.entries(params).reduce(
      (acc, cur) => ({ ...acc, [cur[0]]: cur[1].toString() }),
      {}
    );
  return currentParams
    ? result
        .split("__")
        //@ts-ignore
        .map((word) => (currentParams[word] ? currentParams[word] : word))
        .join("")
    : result;
}

export function useLocale() {
  return useContext(TalkrContext);
}
