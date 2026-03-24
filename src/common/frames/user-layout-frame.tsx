import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router';

import {
  ArrowRightLeft,
  FileTextIcon,
  Globe,
  HomeIcon as HomeLucideIcon,
  LogOut,
  MessageCircle,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Drawer, Layout } from '@/common/components';
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

  const isInspectorSubtree = matches.some((match) =>
    match.routeId.startsWith(InspectorRoute.id.slice(0, -1)), // remove trailing '/'
  );
  const isArticlesRoute = matches.some(
    (match) => match.routeId === ArticlesRoute.id || match.routeId === ArticleDetailRoute.id,
  );

  const openMenu = () => {
    overlay.open(({ close }) => (
      <Drawer.Root side="bottom" closeOnBackdrop>
        <Drawer.Header>
          <Drawer.Title>{t('menu.title')}</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          {isInspector && (
            <button
              type="button"
              className="text-body-lg text-text-primary flex w-full items-center gap-3 py-3"
              onClick={() => {
                close();
                navigate({ to: isInspectorSubtree ? '/' : '/inspector', replace: true });
              }}
            >
              <ArrowRightLeft size={20} className="text-icon" />
              {isInspectorSubtree ? t('fab.toUserMode') : t('fab.toInspectorMode')}
            </button>
          )}
          <button
            type="button"
            className="text-body-lg text-text-primary flex w-full items-center gap-3 py-3"
            onClick={() => {
              close();
              navigate({ to: isArticlesRoute ? '/' : '/articles' });
            }}
          >
            {isArticlesRoute ? (
              <HomeLucideIcon size={20} className="text-icon" />
            ) : (
              <FileTextIcon size={20} className="text-icon" />
            )}
            {isArticlesRoute ? t('fab.home') : t('fab.articles')}
          </button>
          <button
            type="button"
            className="text-body-lg text-text-primary flex w-full items-center gap-3 py-3"
            onClick={() => {
              close();
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
              ));
            }}
          >
            <MessageCircle size={20} className="text-icon" />
            {t('fab.inquiry')}
          </button>
          <button
            type="button"
            className="text-body-lg text-text-primary flex w-full items-center gap-3 py-3"
            onClick={() => {
              toggleLanguage();
              close();
            }}
          >
            <Globe size={20} className="text-icon" />
            {t('fab.languageChange')}
          </button>
          <button
            type="button"
            className="text-body-lg text-status-fail flex w-full items-center gap-3 py-3"
            onClick={() => {
              close();
              logOut({});
            }}
          >
            <LogOut size={20} className="text-status-fail" />
            {t('fab.logout')}
          </button>
        </Drawer.Body>
      </Drawer.Root>
    ));
  };

  return (
    <Layout onMenuOpen={openMenu}>
      <Outlet />
    </Layout>
  );
}
