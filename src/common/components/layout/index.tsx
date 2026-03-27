import type { ReactNode } from 'react';

import { Link } from '@tanstack/react-router';

import { Menu, UserRound } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';

import { Button } from '../ui/button';

export function Layout({ className, onMenuOpen, children }: Layout.Props) {
  const { t } = useTranslation('common');

  return (
    <div className={cn('bg-bg-surface h-dvh px-5 py-6', className)}>
      <div className="mx-auto flex h-full min-h-0 w-full max-w-100 flex-col gap-5">
        <div className="no-transition flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/house-full-logo.png" alt={t('header.title')} className="h-8" />
            {/* <span className="text-text-primary text-display font-bold">{t('header.title')}</span> */}
          </div>
          <div className="flex items-center gap-2">
            {onMenuOpen && (
              <Button
                variant="subtle"
                size="icon"
                aria-label={t('header.menu')}
                onClick={onMenuOpen}
              >
                <Menu size={20} />
              </Button>
            )}
            <Button variant="subtle" size="icon" aria-label={t('header.mypage')} asChild>
              <Link to="/mypage">
                <UserRound size={20} />
              </Link>
            </Button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export namespace Layout {
  export type Props = {
    className?: string;
    onMenuOpen?: () => void;
    children: ReactNode;
  };
}
