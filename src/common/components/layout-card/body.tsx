import type { PropsWithChildren } from 'react';

import { cn } from '@/common/utils';

/**
 * 레이아웃 카드 본문 영역입니다.
 */
export const Body = ({ children, className }: Body.Props) => (
  <div className={cn('no-scrollbar flex min-h-0 flex-1 flex-col items-center justify-start gap-6 overflow-y-auto', className)}>
    {children}
  </div>
);

export namespace Body {
  export type Props = PropsWithChildren<{
    className?: string;
  }>;
}
