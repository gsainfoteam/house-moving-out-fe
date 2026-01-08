import { useTranslation } from 'react-i18next';
import { useAuthContext } from 'react-oauth2-code-pkce';

import { Button, LanguageToggle } from '@/common/components';

export function LoginFrame() {
  const { logIn } = useAuthContext();
  const { t } = useTranslation();

  return (
    <div className="relative flex h-screen flex-col items-center justify-center">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      <div className="flex flex-col items-center justify-center gap-2.5">
        <h1>{t('auth.title')}</h1>
        <p>{t('auth.subtitle')}</p>
      </div>
      <Button className="mt-4" onClick={() => logIn()}>
        {t('auth.loginButton')}
      </Button>
    </div>
  );
}
