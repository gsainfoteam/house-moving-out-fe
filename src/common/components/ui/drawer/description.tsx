import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/common/utils';

import { useDrawerContext } from './context';

/**
 * 드로어 보조 설명 텍스트 컴포넌트입니다.
 */
export const Description = ({ className, ...props }: Description.Props) => {
  const { descriptionId } = useDrawerContext('Drawer.Description');

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
