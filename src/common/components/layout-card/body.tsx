import type { PropsWithChildren } from 'react';

import { cn } from '@/common/utils';

/**
 * 레이아웃 카드 본문 영역입니다.
 */
export const Body = ({ children, className }: Body.Props) => (
  <div className={cn('flex h-full flex-col items-center justify-start gap-6', className)}>
    {children}
  </div>
);

export namespace Body {
  export type Props = PropsWithChildren<{
    className?: string;
  }>;
}
