import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router';


import { ArrowRightLeft, FileTextIcon, HomeIcon as HomeLucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import HomeIcon from '@/assets/icons/home.svg?react';
import LogOutIcon from '@/assets/icons/log-out.svg?react';
import TranslateIcon from '@/assets/icons/translate.svg?react';
import { Drawer, Fab, Layout } from '@/common/components';
import { overlay } from '@/common/lib';
import { useLanguage } from '@/common/viewmodels';
import { useAuth } from '@/features/auth';
import { Route as ArticleDetailRoute } from '@/routes/_auth-required/_user/articles/$uuid';
import { Route as ArticlesRoute } from '@/routes/_auth-required/_user/articles/index';
import { Route as InspectorRoute } from '@/routes/_auth-required/_user/inspector/index';

export function UserLayoutFrame() {
  const { t } = useTranslation('common');
  const { toggleLanguage } = useLanguage();
  const { logOut, isInspector } = useAuth({ showToast: true });

  const navigate = useNavigate();
  const { matches } = useRouterState();

  const isInspectorRoute = matches.some((match) => match.routeId === InspectorRoute.id);
  const isArticlesRoute = matches.some(
    (match) => match.routeId === ArticlesRoute.id || match.routeId === ArticleDetailRoute.id,
  );

  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
      <Fab>
        {isInspector && (
          <Fab.Item
            icon={<ArrowRightLeft className="size-6" />}
            label={isInspectorRoute ? t('fab.toUserMode') : t('fab.toInspectorMode')}
            onClick={() =>
              navigate({
                to: isInspectorRoute ? '/' : '/inspector',
                replace: true,
              })
            }
          />
        )}
        <Fab.Item
          icon={<HomeIcon className="size-6" />}
          label={t('fab.inquiry')}
          onClick={() =>
            overlay.open(() => (
              <Drawer.Root>
                <Drawer.Header>
                  <Drawer.Title>{t('inquiryDrawer.title')}</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                  <a
                    href="https://pf.kakao.com/_BIthX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-underline cursor-pointer"
                  >
                    <p>{t('inquiryDrawer.kakaotalk')}</p>
                  </a>
                  <a
                    href="mailto:gist_house@gist.ac.kr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-underline cursor-pointer"
                  >
                    <p>{t('inquiryDrawer.email')}</p>
                  </a>
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
              </Drawer.Root>
            ))
          }
        />
        <Fab.Item
          icon={
            isArticlesRoute ? (
              <HomeLucideIcon className="size-6" />
            ) : (
              <FileTextIcon className="size-6" />
            )
          }
          label={isArticlesRoute ? t('fab.home') : t('fab.articles')}
          onClick={() =>
            navigate({
              to: isArticlesRoute ? '/' : '/articles',
              replace: false,
            })
          }
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
