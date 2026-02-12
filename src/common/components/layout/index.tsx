import type { ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';
import { useAuth } from '@/features/auth';

import type { LayoutCard } from '../layout-card';

export function Layout({ className, children }: Layout.Props) {
  const { user } = useAuth();
  const { t } = useTranslation('common');

  return (
    <div className={cn('bg-bg-surface h-dvh px-5 py-6', className)}>
      <div className="mx-auto flex h-full w-full max-w-100 flex-col gap-5">
        <div className="flex items-center justify-between">
          {user && (
            <div className="flex flex-col gap-2">
              <h1 className="text-h1 text-text-black font-bold">
                {t('header.title', { ns: 'common', name: user.name })}
              </h1>
              <h2 className="text-sub text-text-gray">
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
              </h2>
            </div>
          )}
          <img src="/house-logo.png" alt="house-logo" className="h-15" />
        </div>
        {children}
      </div>
    </div>
  );
}

export namespace Layout {
  export type Props = {
    className?: string;
    children: ReactElement<LayoutCard.Root.Props>;
  };
}
