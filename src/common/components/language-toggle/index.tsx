import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';
import { useLanguage } from '@/common/viewmodels';

export function LanguageToggle() {
  const { toggleLanguage, currentLanguage } = useLanguage();
  const { t } = useTranslation();

  const isKorean = currentLanguage === 'ko';

  return (
    <div className="flex items-center justify-center gap-1.5 rounded-lg">
      <button
        type="button"
        onClick={() => {
          if (!isKorean) toggleLanguage();
        }}
        className={cn(
          'text-h2 uppercase transition-colors',
          isKorean ? 'text-primary-main font-bold' : 'text-text-gray',
        )}
        aria-label={t('language.switchToKorean')}
      >
        KOR
      </button>
      <div className="bg-primary-main h-4 w-0.5" />
      <button
        type="button"
        onClick={() => {
          if (isKorean) toggleLanguage();
        }}
        className={cn(
          'text-h2 uppercase transition-colors',
          !isKorean ? 'text-primary-main font-bold' : 'text-text-gray',
        )}
        aria-label={t('language.switchToEnglish')}
      >
        ENG
      </button>
    </div>
  );
}
