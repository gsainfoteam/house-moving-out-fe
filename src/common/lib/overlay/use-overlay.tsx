import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactElement,
} from 'react';

import { AnimatePresence, motion, type MotionProps } from 'motion/react';

import { backdropAnimation, backdropTransition } from '@/common/components/ui/dialog/animation.ts';
import { cn } from '@/common/utils';

import { OverlayPortal } from './portal.tsx';
import { useFocusTrap } from './use-focus-trap';
import { useOverlayStack } from './use-overlay-stack';

export type OverlayOptions = {
  lockScroll?: boolean;
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
  trapFocus?: boolean;
};

export type OverlayContainerProps = HTMLAttributes<HTMLDivElement>;
export type OverlayBackdropProps = MotionProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    enabled?: boolean;
  };
export type OverlayFocusTrapProps = PropsWithChildren<{
  enabled?: boolean;
}>;

export type OverlayContainerComponent = (props: OverlayContainerProps) => ReactElement | null;
export type OverlayBackdropComponent = (props: OverlayBackdropProps) => ReactElement | null;
export type OverlayFocusTrapComponent = (props: OverlayFocusTrapProps) => ReactElement | null;

export type OverlayApi = {
  Container: OverlayContainerComponent;
  Backdrop: OverlayBackdropComponent;
  FocusTrap: OverlayFocusTrapComponent;
};

export function useOverlay(
  open: boolean,
  close: () => void,
  {
    lockScroll = true,
    closeOnEscape = true,
    closeOnBackdrop = true,
    trapFocus = true,
  }: OverlayOptions,
): OverlayApi {
  const { register, bringToFront, entries } = useOverlayStack();
  const unregisterRef = useRef<null | (() => void)>(null);
  const overlayId = useId();

  useEffect(() => {
    if (!open) {
      unregisterRef.current?.();
      unregisterRef.current = null;
      return;
    }

    const { unregister } = register({
      id: overlayId,
      onEscape: closeOnEscape ? close : undefined,
      lockScroll,
    });

    unregisterRef.current = unregister;
    return () => {
      unregister();
      unregisterRef.current = null;
    };
  }, [open, closeOnEscape, lockScroll, close, register, overlayId]);

  const entry = entries.find((item) => item.id === overlayId);
  const isTopMost = entry ? entries[entries.length - 1]?.id === entry.id : false;
  const zIndex = entry?.zIndex ?? 1000;

  const latestRef = useRef({
    zIndex,
    close,
    closeOnBackdrop,
    isTopMost,
    trapFocus,
    bringToFront,
  });
  latestRef.current = {
    zIndex,
    close,
    closeOnBackdrop,
    isTopMost,
    trapFocus,
    bringToFront,
  };

  const Container = useCallback<OverlayContainerComponent>(
    ({ className, onMouseDown, children, ...props }) => {
      const handleBringToFront = () => {
        if (overlayId !== null) latestRef.current.bringToFront(overlayId);
      };

      return (
        <OverlayPortal>
          <div
            className={cn('fixed inset-0 flex items-center justify-center', className)}
            style={{ zIndex: latestRef.current.zIndex }}
            onMouseDown={(event) => {
              handleBringToFront();
              onMouseDown?.(event);
            }}
            {...props}
          >
            {children}
          </div>
        </OverlayPortal>
      );
    },
    [overlayId],
  );

  const Backdrop = useCallback<OverlayBackdropComponent>(
    ({ enabled = true, onClick, type = 'button', className, ...props }) => {
      return (
        <AnimatePresence>
          {enabled ? (
            <motion.button
              variants={backdropAnimation}
              transition={backdropTransition}
              initial="closed"
              animate="open"
              exit="closed"
              type={type}
              aria-label={props['aria-label'] ?? 'Close overlay'}
              className={cn('absolute inset-0 bg-black/10 backdrop-blur-sm', className)}
              onClick={(event) => {
                onClick?.(event);
                if (event.defaultPrevented) return;
                if (latestRef.current.closeOnBackdrop) {
                  latestRef.current.close();
                }
              }}
              {...props}
            />
          ) : null}
        </AnimatePresence>
      );
    },
    [],
  );

  const FocusTrap = useMemo<OverlayFocusTrapComponent>(() => {
    function FocusTrapComponent({ enabled, children }: OverlayFocusTrapProps) {
      const containerRef = useRef<HTMLDivElement | null>(null);
      const shouldTrapFocus =
        latestRef.current.isTopMost && (enabled ?? latestRef.current.trapFocus);
      useFocusTrap(containerRef, shouldTrapFocus);

      return <div ref={containerRef}>{children}</div>;
    }

    return FocusTrapComponent;
  }, []);

  return {
    Container,
    Backdrop,
    FocusTrap,
  };
}
