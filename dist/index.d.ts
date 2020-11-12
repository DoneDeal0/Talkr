import * as React from "react";
export interface TalkrProps {
    children: React.ReactNode;
    languages: {
        [key: string]: {};
    };
    defaultLanguage: string;
    detectBrowserLanguage?: boolean;
}
export interface TProps {
    key: string;
    params?: {
        count?: number;
        [key: string]: any;
    };
}
export interface TalkrContext {
    locale: string;
    setLocale: (language: string) => void;
    languages: {
        [key: string]: {};
    };
    defaultLanguage: string;
}
export declare function Talkr({ children, languages, defaultLanguage, detectBrowserLanguage, }: TalkrProps): JSX.Element;
export declare function T(key: TProps["key"], params?: TProps["params"]): string | null;
export declare function useLocale(): TalkrContext;
