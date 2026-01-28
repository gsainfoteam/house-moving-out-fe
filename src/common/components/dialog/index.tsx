import { useRef } from 'react';

import { OverlayPortal, useOverlay } from '@/common/lib';
import { cn } from '@/common/utils';

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  lockScroll?: boolean;
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
  trapFocus?: boolean;
  className?: string;
};

export function Dialog({
  open,
  onClose,
  title,
  children,
  lockScroll = true,
  closeOnEscape = true,
  closeOnBackdrop = true,
  trapFocus = true,
  className,
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const { zIndex, bringToFront } = useOverlay(open, {
    onClose,
    lockScroll,
    closeOnEscape,
    focusTrapRef: trapFocus ? dialogRef : null,
  });

  if (!open) return null;

  return (
    <OverlayPortal>
      <div
        className="fixed inset-0 flex items-center justify-center"
        style={{ zIndex }}
        onMouseDown={() => bringToFront()}
      >
        <button
          type="button"
          aria-label="Close dialog"
          className="absolute inset-0 bg-black/40"
          onClick={() => {
            if (closeOnBackdrop) onClose();
          }}
        />
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className={cn(
            'relative max-h-[80vh] w-[90vw] max-w-md overflow-auto rounded-2xl bg-white p-5 shadow-lg',
            className,
          )}
        >
          {title ? <h2 className="text-h2 mb-3">{title}</h2> : null}
          {children}
        </div>
      </div>
    </OverlayPortal>
  );
}
