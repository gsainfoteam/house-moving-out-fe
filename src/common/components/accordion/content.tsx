import type { PropsWithChildren } from 'react';

import { cn } from '@/common/utils';

import { useAccordionContext } from './context';

export function Content({ children, className }: Content.Props) {
  const { isOpen } = useAccordionContext();

  return (
    <div
      className={cn(
        'grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out',
        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
      )}
      aria-hidden={!isOpen}
    >
      <div className="min-h-0 overflow-hidden">
        <div className={cn('bg-bg-white px-4 py-3', className)}>{children}</div>
      </div>
    </div>
  );
}

export namespace Content {
  export type Props = PropsWithChildren<{
    className?: string;
  }>;
}
