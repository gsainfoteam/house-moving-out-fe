import { useSearch } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Button, LanguageToggle } from '@/common/components';

import { useAuth, useAuthRedirect } from '../../viewmodels';

export function LoginFrame() {
  const { t } = useTranslation('auth');
  const { idpLogIn } = useAuth();
  const { redirect } = useSearch({ from: '/auth' });

  return (
    <div className="relative flex h-screen flex-col items-center justify-center">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      <div className="flex flex-col items-center justify-center gap-2.5">
        <img src="/3d/logo.png" alt="logo" className="size-60" />
        <h1 className="text-text-black">{t('title')}</h1>
        <p className="text-text-gray">{t('subtitle')}</p>
      </div>
      <Button
        className="mt-10"
        onClick={() => {
          useAuthRedirect.getState().setRedirect(redirect);
          idpLogIn();
        }}
      >
        {t('loginButton')}
      </Button>
    </div>
  );
}
