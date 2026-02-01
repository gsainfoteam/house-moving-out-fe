import type { PropsWithChildren } from 'react';

import { cn } from '@/common/utils';

/**
 * 레이아웃 카드 상단 영역(미디어 + 텍스트) 래퍼입니다.
 * @see LayoutCard.Media
 * @see LayoutCard.Text
 */
export const Header = ({ children, className }: Header.Props) => (
  <div className={cn('flex flex-col items-center justify-center gap-6 text-center', className)}>
    {children}
  </div>
);

export namespace Header {
  export type Props = PropsWithChildren<{
    className?: string;
  }>;
}
