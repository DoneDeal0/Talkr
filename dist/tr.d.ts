import { TParams, TrContext } from "./models";
export declare function tr<Key extends string, Params extends TParams>({ locale, languages, defaultLanguage, showWarning }: TrContext, key: Key, params?: Params): string;
