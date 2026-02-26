import { useState, useCallback, type PropsWithChildren } from 'react';

import { cn } from '@/common/utils';

import { AccordionContext } from './context';

export function Root({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  children,
  className,
}: Root.Props) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const toggle = useCallback(() => {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }, [isOpen, isControlled, onOpenChange]);

  return (
    <AccordionContext.Provider value={{ isOpen, toggle }}>
      <div
        className={cn(
          'w-full overflow-hidden rounded-lg border border-icon-light-gray bg-bg-white',
          className,
        )}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export namespace Root {
  export type Props = PropsWithChildren<{
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    className?: string;
  }>;
}
