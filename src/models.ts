export interface TProps {
  children: React.ReactNode;
  languages: { [key: string]: {} };
  defaultLanguage: string;
  detectBrowserLanguage?: boolean;
}

export interface TContext {
  locale: string;
  setLocale: (language: string) => void;
  languages: { [key: string]: {} };
  defaultLanguage: string;
}

type KeyPrefix<T extends string> = T extends "" ? "" : `.${T}`;

export type KeyPath<T> = (
  T extends object
    ? {
        [K in Exclude<keyof T, symbol>]: `${K}${KeyPrefix<KeyPath<T[K]>>}`;
      }[Exclude<keyof T, symbol>]
    : ""
) extends infer D
  ? Extract<D, string>
  : never;

export type TParams = { count?: number; [key: string]: any };
