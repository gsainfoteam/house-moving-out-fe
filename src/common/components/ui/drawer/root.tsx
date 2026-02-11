import { useCallback, useId, useRef, type PropsWithChildren } from 'react';

import { AnimatePresence, motion, type MotionProps, type PanInfo } from 'motion/react';

import { useOverlayContext, useOverlay, type OverlayOptions } from '@/common/lib';
import { cn } from '@/common/utils';

import {
  backdropAnimation,
  backdropTransition,
  contentAnimationBySide,
  contentTransition,
  createDragEndHandler,
  dragConstraintsBySide,
  dragDirectionBySide,
} from './animation';
import DrawerContext, { type DrawerSide } from './context';

/**
 * 드로어 루트 컴포넌트입니다.
 * OverlayHost 안에서만 사용하며, overlay.open()으로 열립니다.
 */
export const Root = ({
  children,
  className,
  side = 'bottom',
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
  const dragRef = useRef<HTMLDivElement>(null);

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) close();
    },
    [close],
  );

  const handleDragEnd = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) =>
      createDragEndHandler(side, onOpenChange, dragRef)(event, info),
    [side, onOpenChange],
  );

  const [sideLayoutClassName, panelClassName, handleClassName] = (() => {
    switch (side) {
      case 'bottom':
        return [
          cn('items-end justify-center'),
          cn('left-0 right-0 bottom-0 pt-8'),
          cn('top-3 left-1/2 -translate-x-1/2 h-1 w-12'),
        ];
      case 'top':
        return [
          cn('items-start justify-center'),
          cn('left-0 right-0 top-0 pb-8'),
          cn('bottom-3 left-1/2 -translate-x-1/2 h-1 w-12'),
        ];
      case 'left':
        return [
          cn('items-stretch justify-start'),
          cn('left-0 top-0 bottom-0 w-[80vw] max-w-sm pr-8'),
          cn('right-3 top-1/2 -translate-y-1/2 h-12 w-1'),
        ];
      case 'right':
      default:
        return [
          cn('items-stretch justify-end'),
          cn('right-0 top-0 bottom-0 w-[80vw] max-w-sm pl-8'),
          cn('left-3 top-1/2 -translate-y-1/2 h-12 w-1'),
        ];
    }
  })();

  return (
    <DrawerContext.Provider
      value={{
        isOpen,
        onOpenChange,
        overlay,
        side,
        titleId,
        descriptionId,
        onExitComplete: unmount,
      }}
    >
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
          <AnimatePresence onExitComplete={unmount}>
            {isOpen ? (
              <motion.div
                ref={dragRef}
                drag={dragDirectionBySide[side]}
                dragConstraints={dragConstraintsBySide[side]}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                variants={contentAnimationBySide[side]}
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
                  'bg-bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)]',
                  'rounded-2xl p-5',
                  'absolute',
                  'cursor-grab active:cursor-grabbing',
                  panelClassName,
                  className,
                )}
                {...props}
              >
                <div
                  className={cn('bg-logo-gray absolute z-10 rounded-full', handleClassName)}
                  aria-hidden="true"
                />
                {children}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </overlay.FocusTrap>
      </overlay.Container>
    </DrawerContext.Provider>
  );
};

export namespace Root {
  export type Props = OverlayOptions &
    PropsWithChildren<{
      side?: DrawerSide;
      className?: string;
    }> &
    Omit<MotionProps, 'children' | 'className'>;
}
