import { forwardRef } from 'react';

import { Check } from 'lucide-react';

import { cn } from '@/common/utils';

export const Checkbox = forwardRef<
  HTMLInputElement,
  Checkbox.Props & React.ComponentProps<'input'>
>(({ className, ...props }, ref) => (
  <span className={cn('group relative inline-flex cursor-pointer items-center', className)}>
    <input
      type="checkbox"
      ref={ref}
      className={cn(
        'peer absolute inset-0 z-10 size-4 cursor-pointer opacity-0',
        'focus-visible:ring-primary-main focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
      )}
      {...props}
    />
    <span
      aria-hidden
      className={cn(
        'flex size-4 shrink-0 items-center justify-center rounded border-2 transition-colors',
        'border-icon-light-gray peer-checked:border-primary-main peer-checked:bg-primary-main',
        'pointer-events-none',
      )}
    >
      <Check
        className="text-text-white hidden size-3 group-has-checked:block"
        strokeWidth={3}
        aria-hidden
      />
    </span>
  </span>
));

export namespace Checkbox {
  export type Props = {};
}
