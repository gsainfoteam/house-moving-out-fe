import { useTranslation } from 'react-i18next';

import { useUserAuth } from '../viewmodels';

import { Button, LanguageToggle } from '@/common/components';

// TODO: consent 왜 안들어가져? 테스트 필요

export function LoginFrame() {
  const { t } = useTranslation();
  const { idpLogIn } = useUserAuth();

  return (
    <div className="relative flex h-screen flex-col items-center justify-center">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      <div className="flex flex-col items-center justify-center gap-2.5">
        <h1>{t('auth.title')}</h1>
        <p>{t('auth.subtitle')}</p>
      </div>
      <Button className="mt-4" onClick={() => idpLogIn()}>
        {t('auth.loginButton')}
      </Button>
    </div>
  );
}
