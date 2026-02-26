import type { HTMLAttributes } from 'react';

import { cn } from '@/common/utils';

/**
 * 다이얼로그 하단 액션 영역 래퍼입니다.
 * @see Dialog.Close
 */
export const Footer = ({
  className,
  orientation = 'horizontal',
  ...props
}: HTMLAttributes<HTMLDivElement> & Footer.Props) => (
  <div
    className={cn(
      'text-modal-button flex gap-2',
      orientation === 'horizontal' ? 'justify-between' : 'flex-col',
      className,
    )}
    {...props}
  />
);

export namespace Footer {
  export type Props = {
    orientation?: 'horizontal' | 'vertical';
  };
}
