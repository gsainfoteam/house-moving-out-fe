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
 * @see Dialog.Body
 * @see Dialog.Footer
 */
export const Content = ({ className, children, ...props }: MotionProps & Content.Props) => {
  const { overlay, isOpen, titleId, descriptionId } = useDialogContext('Dialog.Content');

  return (
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
        <AnimatePresence>
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
  );
};

export namespace Content {
  export type Props = {
    className?: string;
  };
}
