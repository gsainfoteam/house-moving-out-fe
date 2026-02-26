import type { HTMLAttributes } from 'react';

import { cn } from '@/common/utils';

/**
 * 드로어 내부 스크롤 영역 래퍼입니다.
 */
export const Body = ({ className, ...props }: HTMLAttributes<HTMLDivElement> & Body.Props) => (
  <div
    className={cn('no-scrollbar -mx-4 min-h-0 flex-1 overflow-y-auto px-4', className)}
    {...props}
  />
);

export namespace Body {
  export type Props = {};
}
