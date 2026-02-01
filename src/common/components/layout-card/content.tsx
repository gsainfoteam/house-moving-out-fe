import type { PropsWithChildren } from 'react';

import { cn } from '@/common/utils';

/**
 * 레이아웃 카드 본문 영역입니다.
 * @see LayoutCard.Header
 * @see LayoutCard.Details
 * @see LayoutCard.Footer
 */
export const Content = ({ children, className }: Content.Props) => (
  <div className={cn('flex flex-1 flex-col items-center justify-center gap-6', className)}>
    {children}
  </div>
);

export namespace Content {
  export type Props = PropsWithChildren<{
    className?: string;
  }>;
}
