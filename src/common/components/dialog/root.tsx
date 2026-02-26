import { useCallback, useId, type PropsWithChildren } from 'react';

import { AnimatePresence, motion, type MotionProps } from 'motion/react';

import { useOverlayContext, useOverlay, type OverlayOptions } from '@/common/lib';
import { cn } from '@/common/utils';

import {
  backdropAnimation,
  backdropTransition,
  contentAnimation,
  contentTransition,
} from './animation';
import DialogContext from './context';

/**
 * 다이얼로그 루트 컴포넌트입니다.
 * OverlayHost 안에서만 사용하며, overlay.open()으로 열립니다.
 */
export const Root = ({
  children,
  className,
  lockScroll = true,
  closeOnEscape = true,
  closeOnBackdrop = true,
  trapFocus = true,
  ...props
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
    <DialogContext.Provider
      value={{
        isOpen,
        onOpenChange,
        overlay,
        titleId,
        descriptionId,
        onExitComplete: unmount,
      }}
    >
      <overlay.Container enabled={isOpen} className="flex items-center justify-center">
        <overlay.Backdrop
          variants={backdropAnimation}
          transition={backdropTransition}
          initial="closed"
          animate="open"
          exit="closed"
          enabled={isOpen}
        />
        <overlay.FocusTrap enabled={isOpen}>
          <AnimatePresence onExitComplete={unmount}>
            {isOpen ? (
              <motion.div
                variants={contentAnimation}
                transition={contentTransition}
                initial="closed"
                animate="open"
                exit="closed"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                className={cn(
                  'relative flex h-full max-h-[70vh] max-w-md flex-col',
                  'mx-5 gap-4 overflow-hidden p-5',
                  'border-logo-gray bg-bg-white rounded-2xl border',
                  className,
                )}
                {...props}
              >
                {children}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </overlay.FocusTrap>
      </overlay.Container>
    </DialogContext.Provider>
  );
};

export namespace Root {
  export type Props = OverlayOptions &
    PropsWithChildren<{
      className?: string;
    }> &
    Omit<MotionProps, 'children' | 'className'>;
}
