import * as React from "react";
import { TContext, TProps, UseT } from "./models";
export { tr } from "./tr";
export { Autocomplete, TParams } from "./models";
export declare const TalkrContext: React.Context<TContext>;
export declare function Talkr({ children, languages, defaultLanguage, detectBrowserLanguage, }: TProps): JSX.Element;
export declare function useT(): UseT;
