import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/common/utils';

export function Accordion({
  title,
  children,
  defaultOpen = false,
  className,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={cn(
        'border-status-fail w-full rounded-lg border-[1.5px]',
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'border-status-fail flex w-full items-center justify-between border-b-[1.5px] px-5 py-3 text-left transition-[border-color] duration-300',
          isOpen ? 'border-status-fail' : 'border-transparent',
        )}
      >
        <div className="text-box text-status-fail">{title}</div>
        <ChevronDown
          className={cn(
            'text-status-fail transition-transform duration-300',
            isOpen && 'rotate-180',
          )}
          size={24}
        />
      </button>
      <div
        className={cn(
          'grid overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="min-h-0">
          <div className="px-5 py-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
