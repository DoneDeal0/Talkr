import * as React from "react";
import { TContext, TProps } from "./models";
export { Autocomplete, TParams } from "./models";
export { T } from "./t";
export declare const TalkrContext: React.Context<TContext>;
export declare function Talkr({ children, languages, defaultLanguage, detectBrowserLanguage }: TProps): JSX.Element;
export declare function useLocale(): TContext;
