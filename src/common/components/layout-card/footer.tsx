import type { PropsWithChildren } from 'react';

import { cn } from '@/common/utils';

/**
 * 레이아웃 카드 하단 버튼 영역입니다.
 */
export const Footer = ({ children, className }: Footer.Props) => (
  <div className={cn('text-button mt-auto flex w-full gap-2', className)}>{children}</div>
);

export namespace Footer {
  export type Props = PropsWithChildren<{
    className?: string;
  }>;
}
