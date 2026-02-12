import type { ButtonHTMLAttributes } from 'react';

import { cn, mergeEventHandlers } from '@/common/utils';

import { useDrawerContext } from './context';
import { Slot } from '../ui';

/**
 * 드로어를 닫는 트리거 컴포넌트입니다.
 */
export const Close = ({
  asChild,
  children,
  onClick,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & Close.Props) => {
  const { onOpenChange } = useDrawerContext('Drawer.Close');
  const handleClick = mergeEventHandlers(onClick, () => onOpenChange(false));

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp type="button" onClick={handleClick} className={cn('w-full', className)} {...props}>
      {children}
    </Comp>
  );
};

export namespace Close {
  export type Props = {
    asChild?: boolean;
  };
}
