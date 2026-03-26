import { useMemo } from 'react';
import type { PropsWithChildren, ReactNode } from 'react';

import { cn } from '@/common/utils';

type EmptyProps = PropsWithChildren<{
  className?: string;
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
}>;

type RootProps = PropsWithChildren<{
  className?: string;
  scrollable?: boolean;
}>;

export function useList<T>(items: T[]) {
  const isEmpty = items.length === 0;

  type BuilderProps = {
    children: (item: T, index: number) => ReactNode;
    className?: string;
  };

  return useMemo(
    () => ({
      Root: ({ children, className, scrollable = true }: RootProps) => (
        <div
          className={cn(
            'no-scrollbar flex min-h-0 w-full flex-col',
            scrollable && 'overflow-y-auto',
            className,
          )}
        >
          {children}
        </div>
      ),
      Empty: ({ children, className, icon, title, description }: EmptyProps) => {
        if (!isEmpty) return null;
        if (children) return <>{children}</>;
        if (!icon && !title && !description) return null;

        return (
          <div
            className={cn(
              'border-border bg-bg-surface/30 flex h-full w-full flex-col items-center justify-center gap-3 rounded-xl border px-4 py-8 text-center',
              className,
            )}
          >
            {icon ? <div className="text-icon [&_svg]:size-8">{icon}</div> : null}
            <div className="flex flex-col gap-1">
              {title ? (
                <div className="text-heading text-text-primary leading-tight font-semibold">
                  {title}
                </div>
              ) : null}
              {description ? <p className="text-caption text-text-muted">{description}</p> : null}
            </div>
          </div>
        );
      },
      Present: ({ children }: PropsWithChildren) => (!isEmpty ? <>{children}</> : null),
      Builder: ({ children, className }: BuilderProps) => {
        if (isEmpty) return null;
        return <ul className={cn('flex flex-col', className)}>{items.map(children)}</ul>;
      },
    }),
    [items, isEmpty],
  );
}
