import type { PropsWithChildren } from 'react';

import { cn } from '@/common/utils';

/**
 * 레이아웃 카드 추가 정보(예: 아코디언) 영역입니다.
 * @see LayoutCard.Content
 * @see LayoutCard.Footer
 */
export const Details = ({ children, className }: Details.Props) => (
  <div className={cn('w-full', className)}>{children}</div>
);

export namespace Details {
  export type Props = PropsWithChildren<{
    className?: string;
  }>;
}
