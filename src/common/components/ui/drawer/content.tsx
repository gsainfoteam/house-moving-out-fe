import { AnimatePresence, motion, type MotionProps } from 'motion/react';

import { cn } from '@/common/utils';

import {
  contentTransition,
  getContentAnimation,
  backdropAnimation,
  backdropTransition,
} from './animation';
import { useDrawerContext } from './context';

/**
 * 드로어 본문 컨테이너입니다.
 * 하단/상단/좌/우에서 슬라이드 인/아웃 됩니다.
 */
export const Content = ({ className, children, ...props }: MotionProps & Content.Props) => {
  const { overlay, isOpen, side, titleId, descriptionId } = useDrawerContext('Drawer.Content');

  const [sideLayoutClassName, panelClassName] = (() => {
    switch (side) {
      case 'bottom':
        return [cn('items-end justify-center'), cn('left-0 right-0 bottom-0 rounded-t-2xl')];
      case 'top':
        return [cn('items-start justify-center'), cn('left-0 right-0 top-0 rounded-b-2xl')];
      case 'left':
        return [
          cn('items-stretch justify-start'),
          cn('left-0 top-0 bottom-0 w-[80vw] max-w-sm rounded-r-2xl'),
        ];
      case 'right':
      default:
        return [
          cn('items-stretch justify-end'),
          cn('right-0 top-0 bottom-0 w-[80vw] max-w-sm rounded-l-2xl'),
        ];
    }
  })();

  return (
    <overlay.Container enabled={isOpen} className={cn('flex', sideLayoutClassName)}>
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
              variants={getContentAnimation(side)}
              transition={contentTransition}
              initial="closed"
              animate="open"
              exit="closed"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              className={cn(
                'relative flex max-h-full w-full flex-col gap-4',
                'bg-white',
                'shadow-[0_8px_30px_rgba(0,0,0,0.12)]',
                'p-5',
                'absolute',
                panelClassName,
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
