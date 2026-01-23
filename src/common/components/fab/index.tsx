import React, { createContext, useContext, type PropsWithChildren } from 'react';

import {
  autoUpdate,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  type UseFloatingReturn,
} from '@floating-ui/react';

import MenuIcon from '@/assets/icons/menu.svg?react';
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

function FabItem({
  icon,
  label,
  last: _last = false,
  className,
  onClick,
  ...props
}: Fab.ItemProps) {
  const { close } = useFabContext();
  // TODO: last가 true면 꼭다리 붙이기

  return (
    <button
      className={cn(
        'bg-bg-white inset-ring-icon-gray flex w-full items-center justify-center gap-3 rounded-full px-8 py-3 inset-ring',
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
  );
}

function FabContent({
  isOpen,
  refs,
  floatingStyles,
  getFloatingProps,
  close,
  children,
}: Fab.ContentProps) {
  if (!isOpen) return null;

  const items = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<Fab.ItemProp, typeof FabItem> =>
      React.isValidElement(child) && child.type === FabItem,
  );

  return (
    <FabContext.Provider value={{ close }}>
      <div
        ref={(node) => refs.setFloating(node)}
        className="flex w-40 flex-col gap-1"
        style={floatingStyles}
        {...getFloatingProps()}
      >
        {items.map((item, index) =>
          index === items.length - 1 ? React.cloneElement(item, { last: true }) : item,
        )}
      </div>
    </FabContext.Provider>
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

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  return (
    <>
      <button
        ref={(node) => refs.setReference(node)}
        className={cn(
          'bg-bg-white flex size-16 items-center justify-center rounded-full shadow-md',
        )}
        {...getReferenceProps()}
      >
        <MenuIcon className="text-primary-main size-8" />
      </button>
      <FabContent
        isOpen={isOpen}
        refs={refs}
        floatingStyles={floatingStyles}
        getFloatingProps={getFloatingProps}
        close={() => setIsOpen(false)}
      >
        {children}
      </FabContent>
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
    getFloatingProps: ReturnType<typeof useInteractions>['getFloatingProps'];
    close: () => void;
    children: React.ReactNode;
  };

  export type RootProps = Props & PropsWithChildren;

  export type Props = {};
}
