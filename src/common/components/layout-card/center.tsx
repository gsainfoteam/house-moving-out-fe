import type { PropsWithChildren } from 'react';

import { cn } from '@/common/utils';

/**
 * 레이아웃 카드 내부에서 헤더/본문 블록을 세로 중앙에 배치하는 선택적 래퍼입니다.
 * 레이아웃에 따라 필요할 때만 감싸서 사용합니다.
 *
 * @see LayoutCard.Header
 * @see LayoutCard.Body
 */
export const Center = ({ children, className }: Center.Props) => (
  <div className={cn('flex flex-1 flex-col justify-center gap-6', className)}>{children}</div>
);

export namespace Center {
  export type Props = PropsWithChildren<{
    className?: string;
  }>;
}
