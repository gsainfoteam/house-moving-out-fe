import { useEffect } from 'react';

import { Link, Outlet, useRouterState } from '@tanstack/react-router';

import {
  ArrowRightLeft,
  SettingsIcon,
  ExternalLink,
  FileTextIcon,
  Globe,
  HelpCircle,
  HomeIcon as HomeLucideIcon,
  Mail,
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

const InquiryDrawer = () => {
  const { t } = useTranslation('common');
  return (
    <Drawer.Root>
      <Drawer.Header>
        <Drawer.Title>{t('inquiryDrawer.title')}</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <a
          href="https://pf.kakao.com/_BIthX"
          target="_blank"
          rel="noopener noreferrer"
          className="text-body-lg text-text-primary flex w-full items-center gap-3 py-3"
        >
          <MessageCircle size={20} className="text-icon shrink-0" />
          <span>{t('inquiryDrawer.kakaotalk')}</span>
          <ExternalLink size={14} className="text-icon ml-auto shrink-0" />
        </a>
        <a
          href="mailto:gist_house@gist.ac.kr"
          rel="noopener noreferrer"
          className="text-body-lg text-text-primary flex w-full items-center gap-3 py-3"
        >
          <Mail size={20} className="text-icon shrink-0" />
          <span>{t('inquiryDrawer.email')}</span>
          <ExternalLink size={14} className="text-icon ml-auto shrink-0" />
        </a>
        <a
          href="https://sites.google.com/view/gisthouse/home/%EC%9E%90%EC%A3%BC%ED%95%98%EB%8A%94-%EC%A7%88%EB%AC%B8faq?authuser=0"
          target="_blank"
          rel="noopener noreferrer"
          className="text-body-lg text-text-primary flex w-full items-center gap-3 py-3"
        >
          <HelpCircle size={20} className="text-icon shrink-0" />
          <span>{t('inquiryDrawer.faq')}</span>
          <ExternalLink size={14} className="text-icon ml-auto shrink-0" />
        </a>
      </Drawer.Body>
    </Drawer.Root>
  );
};

const DrawerContent = () => {
  const { t } = useTranslation('common');
  const { toggleLanguage } = useLanguage();
  const { isInspector, isAdmin } = useAuth();

  const { matches } = useRouterState();

  const isInspectorSubtree = matches.some(
    (match) => match.routeId.startsWith(InspectorRoute.id.slice(0, -1)), // remove trailing '/'
  );
  const isArticlesRoute = matches.some(
    (match) => match.routeId === ArticlesRoute.id || match.routeId === ArticleDetailRoute.id,
  );

  return (
    <Drawer.Root side="bottom" closeOnBackdrop>
      <Drawer.Header>
        <Drawer.Title>{t('menu.title')}</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        {isAdmin && (
          <Drawer.Close asChild>
            <Link
              to="/admin"
              className="text-body-lg text-text-primary flex w-full items-center gap-3 py-3"
            >
              <SettingsIcon size={20} className="text-icon" />
              {t('fab.toAdmin')}
            </Link>
          </Drawer.Close>
        )}
        {isInspector && (
          <Drawer.Close asChild>
            <Link
              to={isInspectorSubtree ? '/' : '/inspector'}
              replace
              className="text-body-lg text-text-primary flex w-full items-center gap-3 py-3"
            >
              <ArrowRightLeft size={20} className="text-icon" />
              {isInspectorSubtree ? t('fab.toUserMode') : t('fab.toInspectorMode')}
            </Link>
          </Drawer.Close>
        )}
        <Drawer.Close asChild>
          <Link
            to={isArticlesRoute ? '/' : '/articles'}
            className="text-body-lg text-text-primary flex w-full items-center gap-3 py-3"
          >
            {isArticlesRoute ? (
              <HomeLucideIcon size={20} className="text-icon" />
            ) : (
              <FileTextIcon size={20} className="text-icon" />
            )}
            {isArticlesRoute ? t('fab.home') : t('fab.articles')}
          </Link>
        </Drawer.Close>
        <button
          type="button"
          className="text-body-lg text-text-primary flex w-full items-center gap-3 py-3"
          onClick={() => overlay.open(() => <InquiryDrawer />)}
        >
          <MessageCircle size={20} className="text-icon" />
          {t('fab.inquiry')}
        </button>
        <Drawer.Close asChild>
          <button
            type="button"
            className="text-body-lg text-text-primary flex w-full items-center gap-3 py-3"
            onClick={toggleLanguage}
          >
            <Globe size={20} className="text-icon" />
            {t('fab.languageChange')}
          </button>
        </Drawer.Close>
      </Drawer.Body>
    </Drawer.Root>
  );
};

export function UserLayoutFrame() {
  const openMenu = () => {
    overlay.open(() => <DrawerContent />);
  };

  useEffect(() => {
    const html = document.querySelector('html');
    if (!html) return;
    const prev = html.style.overscrollBehavior;
    html.style.overscrollBehavior = 'none';
    return () => {
      html.style.overscrollBehavior = prev;
    };
  }, []);

  useEffect(() => {
    const body = document.body;
    const prev = body.style.backgroundColor;
    body.style.backgroundColor = 'var(--color-bg-surface)';
    return () => {
      body.style.backgroundColor = prev;
    };
  }, []);

  return (
    <Layout onMenuOpen={openMenu}>
      <Outlet />
    </Layout>
  );
}
