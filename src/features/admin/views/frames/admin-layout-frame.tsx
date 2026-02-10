import { Link, Outlet } from '@tanstack/react-router';

import { HomeIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { LanguageToggle } from '@/common/components';
import { cn } from '@/common/utils';

function SmallScreenBlocker() {
  const { t } = useTranslation('admin');
  return (
    <div className="bg-bg-surface fixed inset-0 z-30 flex flex-col items-center justify-center gap-4 px-6 text-center xl:hidden">
      <h1 className="text-title3 text-text-black font-semibold">{t('smallScreen.title')}</h1>
      <p className="text-body2 text-text-gray">
        {t('smallScreen.descriptionLine1')}
        <br />
        {t('smallScreen.descriptionLine2')}
      </p>
    </div>
  );
}

export function AdminLayoutFrame() {
  const { t } = useTranslation('admin');

  return (
    <>
      {!import.meta.env.DEV && <SmallScreenBlocker />}
      <div
        className={cn(
          'bg-bg-surface h-dvh flex-col',
          import.meta.env.DEV ? 'flex' : 'hidden xl:flex',
        )}
      >
        <header className="bg-bg-white flex shrink-0 items-center gap-6 border-b border-gray-200 px-4 py-3 shadow-sm">
          <Link
            to="/admin"
            className="text-text-gray hover:bg-bg-surface hover:text-text-black flex items-center gap-2 rounded-lg p-2 transition-colors"
          >
            <HomeIcon className="size-5 shrink-0" aria-hidden />
            <span className="text-sub2">{t('home')}</span>
          </Link>
          <nav className="flex flex-1 items-center gap-1">
            <Link
              to="/admin/schedules"
              className="text-sub2 text-text-black hover:bg-bg-surface hover:text-primary-main rounded-lg px-3 py-2 font-medium transition-colors"
            >
              {t('schedule.list')}
            </Link>
          </nav>
          <div className="px-2">
            <LanguageToggle />
          </div>
        </header>
        <main className="flex min-h-0 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
}
