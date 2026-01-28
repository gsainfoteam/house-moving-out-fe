import { useOverlay } from '@/common/lib';
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
  const overlay = useOverlay(open, {
    close: onClose,
    lockScroll,
    closeOnEscape,
    closeOnBackdrop,
    trapFocus,
  });

  return (
    <overlay.Container>
      <overlay.Backdrop aria-label="Close dialog" />
      <overlay.FocusTrap>
        <div
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
      </overlay.FocusTrap>
    </overlay.Container>
  );
}
