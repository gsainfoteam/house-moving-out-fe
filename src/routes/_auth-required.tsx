import { useState } from 'react';

import { createFileRoute, Navigate, Outlet, useRouter } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import HomeIcon from '@/assets/icons/home.svg?react';
import LogOutIcon from '@/assets/icons/log-out.svg?react';
import TranslateIcon from '@/assets/icons/translate.svg?react';
import { Drawer, Fab } from '@/common/components';
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
          onClick={() => setIsDrawerOpen(true)}
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
      <Drawer.Root isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>{t('inquiryDrawer.title')}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <p>{t('inquiryDrawer.instagram')}</p>
            <p>{t('inquiryDrawer.email')}</p>
            <br />
            <a
              href="https://sites.google.com/view/gisthouse/home/%EC%9E%90%EC%A3%BC%ED%95%98%EB%8A%94-%EC%A7%88%EB%AC%B8faq?authuser=0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-underline cursor-pointer"
            >
              {t('inquiryDrawer.faq')}
            </a>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
}
