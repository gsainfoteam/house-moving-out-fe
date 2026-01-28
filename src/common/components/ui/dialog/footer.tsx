import type { HTMLAttributes } from 'react';

import { cn } from '@/common/utils';

/**
 * 다이얼로그 하단 액션 영역 래퍼입니다.
 * @see Dialog.Close
 */
export const Footer = ({ className, ...props }: HTMLAttributes<HTMLDivElement> & Footer.Props) => (
  <div className={cn('mt-4 flex justify-end gap-2', className)} {...props} />
);

export namespace Footer {
  export type Props = {};
}
