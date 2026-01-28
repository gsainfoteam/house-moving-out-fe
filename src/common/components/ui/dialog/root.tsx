import { useCallback, useId, useState, type PropsWithChildren } from 'react';

import { useOverlay, type OverlayOptions } from '@/common/lib';

import DialogContext from './context';

/**
 * 다이얼로그 상태/오버레이 컨텍스트를 제공하는 루트 컴포넌트입니다.
 * @see Dialog.Trigger
 * @see Dialog.Content
 */
export const Root = ({
  children,
  lockScroll = true,
  closeOnEscape = true,
  closeOnBackdrop = true,
  trapFocus = true,
}: Root.Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);
  const overlay = useOverlay(isOpen, close, {
    lockScroll,
    closeOnEscape,
    closeOnBackdrop,
    trapFocus,
  });

  const titleId = useId();
  const descriptionId = useId();

  return (
    <DialogContext.Provider
      value={{
        isOpen,
        onOpenChange: setIsOpen,
        overlay,
        titleId,
        descriptionId,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export namespace Root {
  export type Props = OverlayOptions & PropsWithChildren;
}
