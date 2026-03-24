import type { PropsWithChildren } from 'react';

import { cn } from '@/common/utils';

export function Title({ children, className }: Title.Props) {
  return <span className={cn('text-body-lg text-text-primary', className)}>{children}</span>;
}

export namespace Title {
  export type Props = PropsWithChildren<{
    className?: string;
  }>;
}
