import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/common/utils';

import { useDialogContext } from './dialog-context';

/**
 * 다이얼로그 제목 텍스트 컴포넌트입니다.
 */
export const Title = ({ className, children, ...props }: Title.Props) => {
  const { titleId } = useDialogContext('Dialog.Title');

  return (
    <h2 id={titleId} className={cn('text-h2', className)} {...props}>
      {children}
    </h2>
  );
};

export namespace Title {
  export type Props = ComponentPropsWithoutRef<'h2'>;
}
