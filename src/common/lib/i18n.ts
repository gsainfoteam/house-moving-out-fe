import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next, useTranslation } from 'react-i18next';

import { type Language } from './languages';

export function useLocale(): Language {
  const { i18n: i18nInstance } = useTranslation();
  return i18nInstance.language as Language;
}

const initialLang = navigator.language.split('-')[0] === 'ko' ? 'ko' : 'en';

await i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: initialLang,
    fallbackLng: 'ko',
    defaultNS: '_',
    ns: ['_', 'auth', 'common', 'user', 'checklist'],
    nsSeparator: ':',
    keySeparator: '.',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export { i18n };
