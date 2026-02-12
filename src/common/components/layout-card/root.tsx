import type { PropsWithChildren } from 'react';

import { cn } from '@/common/utils';

import { Loading } from '../loading';

/**
 * 레이아웃 카드 루트 컨테이너입니다.
 * @see LayoutCard.Header
 * @see LayoutCard.Body
 * @see LayoutCard.Footer
 */
export const Root = ({ children, isLoading, className }: Root.Props) => (
  <div
    className={cn('bg-bg-white flex h-full flex-col gap-6 rounded-3xl p-6 shadow-lg', className)}
  >
    {isLoading ? <Loading containerClassName="h-full" /> : children}
  </div>
);

export namespace Root {
  export type Props = PropsWithChildren<{
    isLoading?: boolean;
    className?: string;
  }>;
}
