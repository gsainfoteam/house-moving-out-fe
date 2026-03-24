import { useTranslation } from 'react-i18next';

import { Button, LanguageToggle } from '@/common/components';

export function LoginScreen({ onLogin }: LoginScreen.Props) {
  const { t } = useTranslation('auth');

  return (
    <div className="relative flex h-dvh flex-col items-center justify-center">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      <div className="flex flex-col items-center justify-center gap-2.5">
        <img src="/3d/logo.png" alt="logo" className="size-60" />
        <h1 className="text-display text-text-primary">{t('title')}</h1>
        <p className="text-body text-text-secondary">{t('subtitle')}</p>
      </div>
      <Button className="mt-10" onClick={onLogin}>
        {t('loginButton')}
      </Button>
    </div>
  );
}

export namespace LoginScreen {
  export type Props = {
    onLogin: () => void;
  };
}
