import type { PropsWithChildren } from 'react';

import { cn } from '@/common/utils';

/**
 * 레이아웃 카드 설명 텍스트입니다.
 */
export const Description = ({ children, className }: Description.Props) => (
  <div className={cn('text-sub2 text-text-gray text-center', className)}>{children}</div>
);

export namespace Description {
  export type Props = PropsWithChildren<{
    className?: string;
    children: string;
  }>;
}
