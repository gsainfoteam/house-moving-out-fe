import type { HTMLAttributes } from 'react';

import { cn } from '@/common/utils';

/**
 * 드로어 상단 영역 래퍼입니다.
 * @see Drawer.Title
 * @see Drawer.Description
 */
export const Header = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-1', className)} {...props} />
);

export namespace Header {
  export type Props = {};
}
