import type { ButtonHTMLAttributes } from 'react';

import { mergeEventHandlers } from '@/common/utils';

import { useDrawerContext } from './context';
import { Slot } from '../slot';

/**
 * 드로어를 여는 트리거 컴포넌트입니다.
 */
export const Trigger = ({
  asChild,
  children,
  onClick,
  ...props
}: Trigger.Props & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { onOpenChange } = useDrawerContext('Drawer.Trigger');
  const handleClick = mergeEventHandlers(onClick, () => onOpenChange(true));

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp type="button" onClick={handleClick} {...props}>
      {children}
    </Comp>
  );
};

export namespace Trigger {
  export type Props = {
    asChild?: boolean;
    children: React.ReactNode;
  };
}
