import { AnimatePresence, motion, type MotionProps } from 'motion/react';

import { cn } from '@/common/utils';

import {
  backdropAnimation,
  backdropTransition,
  contentAnimation,
  contentTransition,
} from './animation';
import { useDialogContext } from './context';

/**
 * 다이얼로그 본문 컨테이너입니다.
 * @see Dialog.Header
 * @see Dialog.Footer
 */
export const Content = ({ className, children, ...props }: MotionProps & Content.Props) => {
  const { overlay, open, titleId, descriptionId } = useDialogContext('Dialog.Content');

  return (
    <overlay.Container className={cn(!open && 'pointer-events-none')}>
      <overlay.Backdrop
        variants={backdropAnimation}
        transition={backdropTransition}
        initial="closed"
        animate="open"
        exit="closed"
        enabled={open}
      />
      <overlay.FocusTrap enabled={open}>
        <AnimatePresence>
          {open ? (
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
                'border-logo-gray relative max-h-[80vh] w-[90vw] max-w-md overflow-auto rounded-2xl border bg-white p-5',
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
  );
};

export namespace Content {
  export type Props = {
    className?: string;
  };
}
