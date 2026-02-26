import { ChevronDown } from 'lucide-react';

import { cn } from '@/common/utils';

import { useAccordionContext } from './context';

export function Header({ children, className }: Header.Props) {
  const { isOpen, toggle } = useAccordionContext();

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        'bg-bg-surface/80 flex w-full items-center justify-between gap-3 px-4 py-3 text-left',
        isOpen && 'border-b border-icon-light-gray',
        className,
      )}
      aria-expanded={isOpen}
    >
      {children}
      <ChevronDown
        className={cn(
          'text-icon-gray shrink-0 transition-transform duration-300 ease-out',
          isOpen && 'rotate-180',
        )}
        size={24}
        aria-hidden
      />
    </button>
  );
}

export namespace Header {
  export type Props = {
    children: React.ReactNode;
    className?: string;
  };
}
