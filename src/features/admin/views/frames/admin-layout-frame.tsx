import { Link, Outlet } from '@tanstack/react-router';

import { HomeIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { LanguageToggle } from '@/common/components';
import { cn } from '@/common/utils';

import { useDatabaseSize } from '../../viewmodels';

function SmallScreenBlocker() {
  const { t } = useTranslation('admin');
  return (
    <div className="bg-bg-surface fixed inset-0 z-30 flex flex-col items-center justify-center gap-4 px-6 text-center xl:hidden">
      <h1 className="text-title3 text-text-primary font-semibold">{t('smallScreen.title')}</h1>
      <p className="text-body text-text-secondary">
        {t('smallScreen.descriptionLine1')}
        <br />
        {t('smallScreen.descriptionLine2')}
      </p>
    </div>
  );
}

function DatabaseSizeBar() {
  const { t } = useTranslation('admin');
  const { data } = useDatabaseSize();
  if (!data) return null;

  const percentage = (data.bytes / (1024 * 1024 * 500)) * 100;
  return (
    <div className="flex items-center gap-2">
      {`${t('databaseSize')} (${data.pretty}/500 MB)`}
      <div className="relative h-3 w-36 overflow-hidden rounded-2xl bg-border">
        <div
          className={cn(
            'bg-primary absolute left-0 h-3',
            percentage >= 80 && 'bg-yellow-500',
            percentage >= 90 && 'bg-red-500',
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
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
        <header className="bg-bg flex shrink-0 items-center gap-6 border-b border-border px-4 py-3">
          <Link
            to="/admin"
            className="text-text-secondary hover:bg-bg-surface hover:text-text-primary flex items-center gap-2 rounded-lg p-2 transition-colors"
          >
            <HomeIcon className="size-5 shrink-0" aria-hidden />
            <span className="text-body">{t('home')}</span>
          </Link>
          <nav className="flex flex-1 items-center gap-1">
            <Link
              to="/admin/schedules"
              className="text-body text-text-primary hover:bg-bg-surface hover:text-primary rounded-lg px-3 py-2 font-medium transition-colors"
            >
              {t('schedule.list')}
            </Link>
            <Link
              to="/admin/articles"
              className="text-body text-text-primary hover:bg-bg-surface hover:text-primary rounded-lg px-3 py-2 font-medium transition-colors"
            >
              {t('article.list.nav')}
            </Link>
          </nav>
          <DatabaseSizeBar />
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
