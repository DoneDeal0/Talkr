import * as React from "react";
import { TContext, TProps } from "./models";
export * from "./models";
export * from "./t";
export declare const TalkrContext: React.Context<TContext>;
export declare function Talkr({ children, languages, defaultLanguage, detectBrowserLanguage }: TProps): JSX.Element;
export declare function useLocale(): TContext;
