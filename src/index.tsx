import * as React from "react";
import { createContext, useState, useContext } from "react";
import { initLocale } from "./initLocale";
import { TContext, TProps } from "./models";
export * from "./models";
export { T } from "./t";

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

export function useLocale() {
  return useContext(TalkrContext);
}
