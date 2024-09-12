import { PropsWithChildren } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TProps extends PropsWithChildren {
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

export type TrContext = Omit<TContext, "setLocale">;

type KeyPrefix<T extends string> = T extends "" ? "" : `.${T}`;

type Suffix = "zero" | "one" | "two" | "few" | "many" | "female" | "male";
type DynamicSuffix = Partial<Record<Suffix, string>>;

export type KeyPath<T> = (
  T extends DynamicSuffix
    ? ""
    : T extends Array<any>
      ? ""
      : T extends object
        ? {
            [K in Exclude<keyof T, symbol>]: `${K}${KeyPrefix<KeyPath<T[K]>>}`;
          }[Exclude<keyof T, symbol>]
        : ""
) extends infer D
  ? Extract<D, string>
  : never;

export type TParams = Record<string, any> & {
  count?: number;
  gender?: "m" | "f";
  listType?: "conjunction" | "disjunction";
  listStyle?: "long" | "narrow";
};

export type Autocomplete<schema> = KeyPath<schema>;

export interface UseT extends TContext {
  T: <Key extends string, Params extends TParams>(
    key: Key,
    params?: Params,
  ) => string;
}
