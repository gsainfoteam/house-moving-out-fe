import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/common/utils';

import { useDialogContext } from './context';

/**
 * 다이얼로그 보조 설명 텍스트 컴포넌트입니다.
 */
export const Description = ({ className, ...props }: Description.Props) => {
  const { descriptionId } = useDialogContext('Dialog.Description');

  return (
    <p
      id={descriptionId}
      className={cn('text-modal-description text-text-gray text-center', className)}
      {...props}
    />
  );
};

export namespace Description {
  export type Props = ComponentPropsWithoutRef<'p'>;
}
