import * as React from "react";
export interface TalkrProps {
    children: React.ReactNode;
    languages: {
        [key: string]: {};
    };
    mainLanguage?: string;
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
    mainLanguage: string;
}
export declare function Talkr({ children, languages, mainLanguage }: TalkrProps): JSX.Element;
export declare function t(key: TProps["key"], params?: TProps["params"]): string | null;
export declare function useLocale(): any;
