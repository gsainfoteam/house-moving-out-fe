import { forwardRef } from 'react';

import CheckedIcon from '@/assets/icons/checked.svg?react';
import UncheckedIcon from '@/assets/icons/unchecked.svg?react';
import { cn } from '@/common/utils';

export const Checkbox = forwardRef<
  HTMLInputElement,
  Checkbox.Props & React.ComponentProps<'input'>
>(({ className, ...props }, ref) => {
  return (
    <span className={cn('inline-flex cursor-pointer items-center', className)}>
      <input type="checkbox" ref={ref} className="peer sr-only" {...props} />
      <CheckedIcon className="hidden size-4 peer-checked:block" />
      <UncheckedIcon className="block size-4 peer-checked:hidden" />
    </span>
  );
});

export namespace Checkbox {
  export type Props = {};
}
