import type { PropsWithChildren } from 'react';

import { cn } from '@/common/utils';

/**
 * 레이아웃 카드 루트 컨테이너입니다.
 * @see LayoutCard.Header
 * @see LayoutCard.Body
 * @see LayoutCard.Footer
 */
export const Root = ({ children, className }: Root.Props) => (
  <div
    className={cn('bg-bg-white flex h-full flex-col gap-6 rounded-3xl p-6 shadow-lg', className)}
  >
    {children}
  </div>
);

export namespace Root {
  export type Props = PropsWithChildren<{
    className?: string;
  }>;
}
