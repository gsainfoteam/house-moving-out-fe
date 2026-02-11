import { useCallback, useId, type PropsWithChildren } from 'react';

import { useOverlayContext, useOverlay, type OverlayOptions } from '@/common/lib';

import DrawerContext, { type DrawerSide } from './context';

/**
 * 드로어 상태/오버레이 컨텍스트를 제공하는 루트 컴포넌트입니다.
 * OverlayHost 안에서만 사용하며, overlay.open()으로 열립니다.
 * @see Drawer.Content
 */
export const Root = ({
  children,
  side = 'bottom',
  lockScroll = true,
  closeOnEscape = true,
  closeOnBackdrop = true,
  trapFocus = true,
}: Root.Props) => {
  const { isOpen, close, unmount } = useOverlayContext();
  const overlay = useOverlay(isOpen, close, {
    lockScroll,
    closeOnEscape,
    closeOnBackdrop,
    trapFocus,
  });

  const titleId = useId();
  const descriptionId = useId();

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) close();
    },
    [close],
  );

  return (
    <DrawerContext.Provider
      value={{
        isOpen,
        onOpenChange,
        overlay,
        side,
        titleId,
        descriptionId,
        onExitComplete: unmount,
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
    }>;
}
