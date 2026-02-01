import type { PropsWithChildren } from 'react';

import { cn } from '@/common/utils';

/**
 * 레이아웃 카드 제목/설명 텍스트 래퍼입니다.
 * @see LayoutCard.Title
 * @see LayoutCard.Description
 */
export const Text = ({ children, className }: Text.Props) => (
  <div className={cn('flex flex-col gap-2 text-center', className)}>{children}</div>
);

export namespace Text {
  export type Props = PropsWithChildren<{
    className?: string;
  }>;
}
