import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

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
