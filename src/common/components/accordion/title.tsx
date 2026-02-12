import type { PropsWithChildren } from 'react';

import { cn } from '@/common/utils';

export function Title({ children, className }: Title.Props) {
  return (
    <span className={cn('text-box text-text-black', className)}>
      {children}
    </span>
  );
}

export namespace Title {
  export type Props = PropsWithChildren<{
    className?: string;
  }>;
}
