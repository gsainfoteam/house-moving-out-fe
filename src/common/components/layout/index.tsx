import type { ReactElement } from 'react';

import { Link } from '@tanstack/react-router';

import { Menu, UserRound } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';
import { useAuth } from '@/features/auth';

import { Button } from '../ui/button';

import type { LayoutCard } from '../layout-card';

export function Layout({ className, onMenuOpen, children }: Layout.Props) {
  const { user } = useAuth();
  const { t } = useTranslation('common');

  return (
    <div className={cn('bg-bg-surface h-dvh px-5 py-6', className)}>
      <div className="mx-auto flex h-full min-h-0 w-full max-w-100 flex-col gap-5">
        <div className="flex items-center justify-between">
          {user && (
            <div className="flex flex-col gap-1.5">
              <h1 className="text-heading text-text-primary">
                {t('header.title', { ns: 'common', name: user.name })}
              </h1>
              <p className="text-label text-text-secondary">
                {user.roomNumber
                  ? t('header.subtitle.room', {
                      ns: 'common',
                      studentId: user.studentNumber,
                      room: user.roomNumber,
                    })
                  : t('header.subtitle.noRoom', {
                      ns: 'common',
                      studentId: user.studentNumber,
                    })}
              </p>
            </div>
          )}
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
    children: ReactElement<LayoutCard.Root.Props>;
  };
}
