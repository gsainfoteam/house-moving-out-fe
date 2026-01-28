import React, { createContext, useContext, type PropsWithChildren } from 'react';

import {
  FloatingFocusManager,
  FloatingOverlay,
  autoUpdate,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  type UseFloatingReturn,
} from '@floating-ui/react';

import MenuIcon from '@/assets/icons/menu.svg?react';
import XCloseIcon from '@/assets/icons/x-close.svg?react';
import Tail from '@/assets/tail.svg?react';
import { cn } from '@/common/utils';

interface FabContextValue {
  close: () => void;
}

const FabContext = createContext<FabContextValue | null>(null);

function useFabContext() {
  const context = useContext(FabContext);
  if (!context) {
    throw new Error('Fab.Item must be used within Fab');
  }
  return context;
}

function FabItem({ icon, label, last = false, className, onClick, ...props }: Fab.ItemProps) {
  const { close } = useFabContext();

  return (
    <div className="relative">
      <button
        className={cn(
          'bg-bg-white hover:bg-bg-surface inset-ring-icon-gray relative z-10 flex w-full items-center justify-center gap-3 rounded-full px-8 py-2.5',
          className,
        )}
        onClick={(e) => {
          close();
          onClick?.(e);
        }}
        {...props}
      >
        {icon}
        <div className="text-h2 text-current">{label}</div>
      </button>
      {last && (
        <div className="absolute bottom-0 left-2/3 z-0 translate-y-2/3" aria-hidden="true">
          <Tail />
        </div>
      )}
    </div>
  );
}

function FabContent({
  isOpen,
  refs,
  floatingStyles,
  context,
  getFloatingProps,
  close,
  children,
}: Fab.ContentProps) {
  const items = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<Fab.ItemProp, typeof FabItem> =>
      React.isValidElement(child) && child.type === FabItem,
  );

  return (
    <>
      <FloatingOverlay
        lockScroll
        className={cn(
          'bg-black/50 transition-opacity duration-200',
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      />
      {isOpen && (
        <FloatingFocusManager context={context} modal>
          <FabContext.Provider value={{ close }}>
            <div
              ref={(node) => refs.setFloating(node)}
              className={cn(
                'flex flex-col gap-1 pb-3 transition-opacity duration-200',
                isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0',
              )}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              {items.map((item, index) =>
                index === items.length - 1 ? React.cloneElement(item, { last: true }) : item,
              )}
            </div>
          </FabContext.Provider>
        </FloatingFocusManager>
      )}
    </>
  );
}

function FabRoot({ children }: Fab.RootProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'top-end',
    middleware: [offset(8), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'dialog' });

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  return (
    <>
      <FabContent
        isOpen={isOpen}
        refs={refs}
        floatingStyles={floatingStyles}
        context={context}
        getFloatingProps={getFloatingProps}
        close={() => setIsOpen(false)}
      >
        {children}
      </FabContent>
      <button
        ref={(node) => refs.setReference(node)}
        className={cn(
          'bg-bg-white hover:bg-bg-surface fixed right-5 bottom-5 z-50 flex size-16 items-center justify-center rounded-full shadow-md',
        )}
        {...getReferenceProps()}
      >
        {isOpen ? (
          <XCloseIcon className="text-primary-main size-8" />
        ) : (
          <MenuIcon className="text-primary-main size-8" />
        )}
      </button>
    </>
  );
}

export const Fab = Object.assign(FabRoot, {
  Item: FabItem,
});

export namespace Fab {
  export type ItemProp = {
    icon: React.ReactElement;
    label: string;
    last?: boolean;
  };

  export type ItemProps = ItemProp & React.ComponentProps<'button'>;

  export type ContentProps = {
    isOpen: boolean;
    refs: UseFloatingReturn['refs'];
    floatingStyles: UseFloatingReturn['floatingStyles'];
    context: UseFloatingReturn['context'];
    getFloatingProps: ReturnType<typeof useInteractions>['getFloatingProps'];
    close: () => void;
    children: React.ReactNode;
  };

  export type RootProps = Props & PropsWithChildren;

  export type Props = {};
}
