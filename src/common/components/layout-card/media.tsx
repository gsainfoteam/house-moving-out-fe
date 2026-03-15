import type { PropsWithChildren } from 'react';

import { cn } from '@/common/utils';

/**
 * 레이아웃 카드 미디어(아이콘/이미지) 영역입니다.
 */
export const Media = ({ children, className }: Media.Props) => (
  <div className={cn('flex items-center justify-center', className)}>{children}</div>
);

export namespace Media {
  export type Props = PropsWithChildren<{
    className?: string;
  }>;
}
