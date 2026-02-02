import type { PropsWithChildren } from 'react';

import { cn } from '@/common/utils';

/**
 * 레이아웃 카드 제목 텍스트입니다.
 */
export const Title = ({ children, className }: Title.Props) => (
  <h1 className={cn('text-h1 text-center', className)}>{children}</h1>
);

export namespace Title {
  export type Props = PropsWithChildren<{
    className?: string;
    children: string;
  }>;
}
