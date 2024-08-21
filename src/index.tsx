import * as React from "react";
import { createContext, useState, useContext } from "react";
import { initLocale } from "./initLocale";
import { TContext, TParams, TProps, UseT } from "./models";
import { tr } from "./tr";
export { tr } from "./tr";
export * from "./models";

export const TalkrContext = createContext<TContext>({
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
}: TProps) {
  const [locale, setLocale] = useState(
    initLocale(defaultLanguage, detectBrowserLanguage),
  );
  return (
    <TalkrContext.Provider
      value={{ locale, setLocale, languages, defaultLanguage }}
    >
      {children}
    </TalkrContext.Provider>
  );
}
export function useT(): UseT {
  const { setLocale, ...props } = useContext(TalkrContext);
  return {
    ...props,
    setLocale,
    T: <Key extends string, Params extends TParams>(
      key: Key,
      params?: Params,
    ) => tr(props, key, params),
  };
}
