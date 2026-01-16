import { useTranslation } from 'react-i18next';

import { useUserAuth } from '../../viewmodels';

import { Button, LanguageToggle } from '@/common/components';

// TODO: consent 왜 안들어가져? 테스트 필요
// FIXME: 디자인 수정되면 typography, color 토큰 사용해야 함

export function LoginFrame() {
  const { t } = useTranslation('auth');
  const { idpLogIn } = useUserAuth();

  return (
    <div className="relative flex h-screen flex-col items-center justify-center">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      <div className="flex flex-col items-center justify-center gap-2.5">
        <h1>{t('title')}</h1>
        <p>{t('subtitle')}</p>
      </div>
      <Button className="mt-4" onClick={() => idpLogIn()}>
        {t('loginButton')}
      </Button>
    </div>
  );
}
