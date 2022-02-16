import * as React from "react";
import { createContext, useState, useContext } from "react";
import { initLocale } from "./initLocale";
import { TContext, TParams, TProps } from "./models";
export * from "./models";
import { tr } from "./tr";

export const TalkrContext = createContext<TContext>({
  locale: "",
  setLocale: () => null,
  languages: {},
  defaultLanguage: ""
});

export function Talkr({
  children,
  languages,
  defaultLanguage,
  detectBrowserLanguage
}: TProps) {
  const [locale, setLocale] = useState(
    initLocale(defaultLanguage, detectBrowserLanguage)
  );
  return (
    <TalkrContext.Provider
      value={{ locale, setLocale, languages, defaultLanguage }}
    >
      {children}
    </TalkrContext.Provider>
  );
}

export function useT(){
  const { locale, setLocale, languages, defaultLanguage } = useContext(TalkrContext);
  return {
      locale,
      setLocale,
      T: (key: string, params?: TParams)=> tr({ locale, languages, defaultLanguage }, key, params)
}
}