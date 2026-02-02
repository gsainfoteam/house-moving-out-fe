import type { PropsWithChildren } from 'react';

/**
 * 레이아웃 카드 미디어(아이콘/이미지) 영역입니다.
 */
export const Media = ({ children, className }: Media.Props) => (
  <div className={className}>{children}</div>
);

export namespace Media {
  export type Props = PropsWithChildren<{
    className?: string;
  }>;
}
