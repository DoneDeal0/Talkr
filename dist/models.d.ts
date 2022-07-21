/// <reference types="react" />
export interface TProps {
    children: React.ReactNode;
    languages: Record<string, any>;
    defaultLanguage: string;
    detectBrowserLanguage?: boolean;
}
export interface TContext {
    locale: string;
    setLocale: (language: string) => void;
    languages: Record<string, any>;
    defaultLanguage: string;
}
export declare type TrContext = Omit<TContext, "setLocale">;
declare type KeyPrefix<T extends string> = T extends "" ? "" : `.${T}`;
export declare type KeyPath<T> = (T extends object ? {
    [K in Exclude<keyof T, symbol>]: `${K}${KeyPrefix<KeyPath<T[K]>>}`;
}[Exclude<keyof T, symbol>] : "") extends infer D ? Extract<D, string> : never;
export declare type TParams = {
    count?: number;
    [key: string]: any;
};
export declare type Autocomplete<schema> = KeyPath<schema> | (string & {});
export interface UseT extends TContext {
    T: <Key extends string, Params extends TParams>(key: Key, params?: Params) => string;
}
export {};
