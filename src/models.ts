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

type KeyPrefix<T extends string> = T extends "" ? "" : `.${T}`;

export type KeyPath<T> = (
  T extends object
    ? {
        [K in Exclude<keyof T, symbol>]: `${K}${KeyPrefix<KeyPath<T[K]>>}`;
      }[Exclude<keyof T, symbol>]
    : string
) extends infer D
  ? Extract<D, string>
  : never;

export type TParams = { count?: number; [key: string]: any };
