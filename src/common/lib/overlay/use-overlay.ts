import { useEffect, useId, useRef } from 'react';

import { useFocusTrap } from './use-focus-trap';
import { useOverlayStack } from './use-overlay-stack';

export type UseOverlayOptions = {
  onClose: () => void;
  lockScroll?: boolean;
  closeOnEscape?: boolean;
  focusTrapRef?: React.RefObject<HTMLElement | null> | null;
};

export function useOverlay(
  open: boolean,
  { onClose, lockScroll = true, closeOnEscape = true, focusTrapRef = null }: UseOverlayOptions,
) {
  const { register, bringToFront, entries } = useOverlayStack();
  const unregisterRef = useRef<null | (() => void)>(null);
  const overlayId = useId();

  const fallbackRef = useRef<HTMLElement | null>(null);
  const overlayRef = focusTrapRef ?? fallbackRef;

  useEffect(() => {
    if (!open) {
      unregisterRef.current?.();
      unregisterRef.current = null;
      return;
    }

    const { id, unregister } = register({
      id: overlayId,
      onEscape: closeOnEscape ? onClose : undefined,
      lockScroll,
    });

    void id;
    unregisterRef.current = unregister;
    return () => {
      unregister();
      unregisterRef.current = null;
    };
  }, [open, closeOnEscape, lockScroll, onClose, register, overlayId]);

  const entry = entries.find((item) => item.id === overlayId);
  const isTopMost = entry ? entries[entries.length - 1]?.id === entry.id : false;
  const zIndex = entry?.zIndex ?? 1000;

  const shouldTrapFocus = open && isTopMost && focusTrapRef !== null;
  useFocusTrap(overlayRef, shouldTrapFocus);

  return {
    zIndex,
    isTopMost,
    bringToFront: () => {
      if (overlayId !== null) bringToFront(overlayId);
    },
    overlayRef,
  };
}
