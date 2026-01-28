import {
  useEffect,
  useId,
  useRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';

import { cn } from '@/common/utils';

import { OverlayPortal } from './portal.tsx';
import { useFocusTrap } from './use-focus-trap';
import { useOverlayStack } from './use-overlay-stack';

export type UseOverlayOptions = {
  close: () => void;
  lockScroll?: boolean;
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
  trapFocus?: boolean;
};

export type OverlayContainerProps = HTMLAttributes<HTMLDivElement>;
export type OverlayBackdropProps = ButtonHTMLAttributes<HTMLButtonElement>;
export type OverlayFocusTrapProps = {
  enabled?: boolean;
  children: ReactNode;
};

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
  {
    close,
    lockScroll = true,
    closeOnEscape = true,
    closeOnBackdrop = true,
    trapFocus = true,
  }: UseOverlayOptions,
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

    const { id, unregister } = register({
      id: overlayId,
      onEscape: closeOnEscape ? close : undefined,
      lockScroll,
    });

    void id;
    unregisterRef.current = unregister;
    return () => {
      unregister();
      unregisterRef.current = null;
    };
  }, [open, closeOnEscape, lockScroll, close, register, overlayId]);

  const entry = entries.find((item) => item.id === overlayId);
  const isTopMost = entry ? entries[entries.length - 1]?.id === entry.id : false;
  const zIndex = entry?.zIndex ?? 1000;

  const handleBringToFront = () => {
    if (overlayId !== null) bringToFront(overlayId);
  };

  const Container = ({ className, onMouseDown, children, ...props }: OverlayContainerProps) => {
    if (!open) return null;

    return (
      <OverlayPortal>
        <div
          className={cn('fixed inset-0 flex items-center justify-center', className)}
          style={{ zIndex }}
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
  };

  const Backdrop = ({ onClick, type = 'button', className, ...props }: OverlayBackdropProps) => {
    if (!open) return null;
    const baseClassName = 'absolute inset-0 bg-black/40';

    return (
      <button
        type={type}
        aria-label={props['aria-label'] ?? 'Close overlay'}
        className={cn(baseClassName, className)}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented) return;
          if (closeOnBackdrop) close();
        }}
        {...props}
      />
    );
  };

  const FocusTrap = ({ enabled, children }: OverlayFocusTrapProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const shouldTrapFocus = open && isTopMost && (enabled ?? trapFocus);
    useFocusTrap(containerRef, shouldTrapFocus);

    return <div ref={containerRef}>{children}</div>;
  };

  return {
    Container,
    Backdrop,
    FocusTrap,
  };
}
