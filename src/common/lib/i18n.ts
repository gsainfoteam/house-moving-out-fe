import { mapAsync } from 'es-toolkit';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const SUPPORTED_LANGUAGES = ['ko', 'en'] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

const localeModules = await mapAsync(SUPPORTED_LANGUAGES, async (lang) => ({
  lang,
  translation: (await import(`../../locales/${lang}.json`)).default,
}));

const resources = Object.fromEntries(
  localeModules.map(({ lang, translation }) => [lang, { translation }]),
);

await i18n.use(initReactI18next).init({
  resources,
  lng: 'ko',
  fallbackLng: 'ko',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
