import type { PropsWithChildren } from 'react';

import { cn } from '@/common/utils';

import { Loading, Slot } from '../ui';

/**
 * 레이아웃 카드 루트 컨테이너입니다.
 * @see LayoutCard.Header
 * @see LayoutCard.Body
 * @see LayoutCard.Footer
 */
export const Root = ({ children, isLoading, className, asChild }: Root.Props) => {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      className={cn(
        'bg-bg-white flex h-full min-h-0 flex-col gap-6 overflow-y-auto rounded-3xl p-6 shadow-lg',
        className,
      )}
    >
      {isLoading ? <Loading containerClassName="h-full" /> : children}
    </Comp>
  );
};

export namespace Root {
  export type Props = PropsWithChildren<{
    isLoading?: boolean;
    className?: string;
    asChild?: boolean;
  }>;
}
