import type { HTMLAttributes } from 'react';

import { cn } from '@/common/utils';

/**
 * 드로어 하단 액션 영역 래퍼입니다.
 */
export const Footer = ({ className, ...props }: HTMLAttributes<HTMLDivElement> & Footer.Props) => (
  <div className={cn('flex justify-between gap-2', className)} {...props} />
);

export namespace Footer {
  export type Props = {};
}
