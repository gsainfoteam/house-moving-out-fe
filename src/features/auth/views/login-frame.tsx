import { useTranslation } from 'react-i18next';

import { useOAuthLogin } from '../viewmodels';

import { Button, LanguageToggle } from '@/common/components';

export function LoginFrame() {
  const { redirectToProvider } = useOAuthLogin();
  const { t } = useTranslation();

  return (
    <div className="relative flex h-screen flex-col items-center justify-center">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      <h1>{t('auth.title')}</h1>
      <p>{t('auth.subtitle')}</p>
      <Button className="mt-4" onClick={redirectToProvider}>
        {t('auth.loginButton')}
      </Button>
    </div>
  );
}
