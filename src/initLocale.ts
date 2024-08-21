const getBrowserLanguage = (defaultLanguage: string) => {
  if (typeof navigator !== "undefined") {
    return navigator.language.split("-")[0];
  }
  return defaultLanguage;
};

export const initLocale = (
  defaultLanguage: string,
  detectBrowserLanguage: boolean = false,
) => {
  if (detectBrowserLanguage) return getBrowserLanguage(defaultLanguage);
  return defaultLanguage;
};
