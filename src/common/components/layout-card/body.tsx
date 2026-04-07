import type { PropsWithChildren } from 'react';

import { cn } from '@/common/utils';

/**
 * 레이아웃 카드 본문 영역입니다.
 */
export const Body = ({ children, className }: Body.Props) => (
  <div className="no-scrollbar -m-4 min-h-0 flex-1 overflow-y-auto p-4">
    <div className={cn('flex flex-col items-start justify-start gap-6', className)}>{children}</div>
  </div>
);

export namespace Body {
  export type Props = PropsWithChildren<{
    className?: string;
  }>;
}
