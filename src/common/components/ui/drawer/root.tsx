import { useCallback, useId, useState, type PropsWithChildren } from 'react';

import { useOverlay, type OverlayOptions } from '@/common/lib';

import DrawerContext, { type DrawerSide } from './context';

/**
 * 드로어 상태/오버레이 컨텍스트를 제공하는 루트 컴포넌트입니다.
 * @see Drawer.Trigger
 * @see Drawer.Content
 */
export const Root = ({
  children,
  side = 'bottom',
  lockScroll = true,
  closeOnEscape = true,
  closeOnBackdrop = true,
  trapFocus = true,
  isOpen: isOpenProp,
  onOpenChange,
}: Root.Props) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = isOpenProp !== undefined;
  const isOpen = isControlled ? isOpenProp : uncontrolledOpen;

  const setOpen = useCallback(
    (open: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(open);
      }
      onOpenChange?.(open);
    },
    [isControlled, onOpenChange],
  );

  const close = useCallback(() => setOpen(false), [setOpen]);
  const overlay = useOverlay(isOpen, close, {
    lockScroll,
    closeOnEscape,
    closeOnBackdrop,
    trapFocus,
  });

  const titleId = useId();
  const descriptionId = useId();

  return (
    <DrawerContext.Provider
      value={{
        isOpen,
        onOpenChange: setOpen,
        overlay,
        side,
        titleId,
        descriptionId,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export namespace Root {
  export type Props = OverlayOptions &
    PropsWithChildren<{
      side?: DrawerSide;
      isOpen?: boolean;
      onOpenChange?: (open: boolean) => void;
    }>;
}
