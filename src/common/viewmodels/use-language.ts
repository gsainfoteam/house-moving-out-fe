import { useTranslation } from 'react-i18next';

import type { Language } from '@/common/lib/i18n';
import { SUPPORTED_LANGUAGES } from '@/common/lib/i18n';

export const useLanguage = () => {
  const { i18n: i18nInstance } = useTranslation();

  const currentLanguage = i18nInstance.language as Language;

  const changeLanguage = (lng: Language) => {
    i18nInstance.changeLanguage(lng);
  };

  const toggleLanguage = () => {
    const currentIndex = SUPPORTED_LANGUAGES.indexOf(currentLanguage);
    const safeIndex = currentIndex !== -1 ? currentIndex : 0;
    const nextIndex = (safeIndex + 1) % SUPPORTED_LANGUAGES.length;
    changeLanguage(SUPPORTED_LANGUAGES[nextIndex]);
  };

  return {
    currentLanguage,
    changeLanguage,
    toggleLanguage,
  };
};
