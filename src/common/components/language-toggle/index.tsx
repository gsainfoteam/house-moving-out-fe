import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '../ui/button';

import { useLanguage } from '@/common/viewmodels';

export function LanguageToggle() {
  const { toggleLanguage, currentLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <Button
      variant="primary"
      icon
      onClick={toggleLanguage}
      aria-label={
        currentLanguage === 'ko'
          ? t('language.switchToEnglish')
          : t('language.switchToKorean')
      }
      title={
        currentLanguage === 'ko' ? t('language.english') : t('language.korean')
      }
    >
      <Languages size={20} />
    </Button>
  );
}
