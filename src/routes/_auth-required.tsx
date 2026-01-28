import { createFileRoute, Navigate, Outlet, useRouter } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import HomeIcon from '@/assets/icons/home.svg?react';
import LogOutIcon from '@/assets/icons/log-out.svg?react';
import TranslateIcon from '@/assets/icons/translate.svg?react';
import { Fab } from '@/common/components';
import { useLanguage } from '@/common/viewmodels';
import { useToken, useAuth } from '@/features/auth';

export const Route = createFileRoute('/_auth-required')({
  component: AuthRequiredLayout,
});

function AuthRequiredLayout() {
  const { token } = useToken();
  const router = useRouter();
  const { logOut } = useAuth({ showToast: true });
  const { toggleLanguage } = useLanguage();
  const { t } = useTranslation('common');

  const redirect = router.state.location.pathname + router.state.location.searchStr;

  if (!token) {
    return <Navigate to="/auth/login" search={{ redirect }} replace />;
  }

  return (
    <>
      <Outlet />
      <Fab>
        <Fab.Item
          icon={<HomeIcon className="size-6" />}
          label={t('fab.inquiry')}
          onClick={() => {
            // TODO: 문의하기 기능 구현
            alert(
              '인스타 디엠: @gist.house.ask\ne-mail: gist_house@gist.ac.kr\nFAQ (자주 묻는 질문) 보러가기',
            );
          }}
        />
        <Fab.Item
          icon={<TranslateIcon className="size-6" />}
          label={t('fab.languageChange')}
          onClick={toggleLanguage}
        />
        <Fab.Item
          icon={<LogOutIcon className="size-6" />}
          label={t('fab.logout')}
          className="text-status-fail"
          onClick={() => logOut({})}
        />
      </Fab>
    </>
  );
}
