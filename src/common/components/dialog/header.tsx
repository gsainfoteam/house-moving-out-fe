import type { HTMLAttributes } from 'react';

import { cn } from '@/common/utils';

/**
 * 다이얼로그 상단 영역 래퍼입니다.
 * @see Dialog.Title
 * @see Dialog.Description
 */
export const Header = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col items-center gap-1', className)} {...props} />
);

export namespace Header {
  export type Props = {};
}
