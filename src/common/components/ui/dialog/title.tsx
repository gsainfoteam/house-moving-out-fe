import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/common/utils';

import { useDialogContext } from './context';

/**
 * 다이얼로그 제목 텍스트 컴포넌트입니다.
 */
export const Title = ({ className, children, ...props }: Title.Props) => {
  const { titleId } = useDialogContext('Dialog.Title');

  return (
    <h1 id={titleId} className={cn('text-modal-title text-center', className)} {...props}>
      {children}
    </h1>
  );
};

export namespace Title {
  export type Props = ComponentPropsWithoutRef<'h1'>;
}
