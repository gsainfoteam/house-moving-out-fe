import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/common/utils';

import { useDrawerContext } from './context';

/**
 * 드로어 제목 텍스트 컴포넌트입니다.
 */
export const Title = ({ className, children, ...props }: Title.Props) => {
  const { titleId } = useDrawerContext('Drawer.Title');

  return (
    <h1 id={titleId} className={cn('text-modal-title text-center', className)} {...props}>
      {children}
    </h1>
  );
};

export namespace Title {
  export type Props = ComponentPropsWithoutRef<'h1'>;
}
