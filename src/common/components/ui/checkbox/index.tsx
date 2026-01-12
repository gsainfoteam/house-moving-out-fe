import { forwardRef } from 'react';

import CheckedIcon from '@/assets/checked.svg?react';
import UncheckedIcon from '@/assets/unchecked.svg?react';
import { cn } from '@/common/utils';

const CheckboxRoot = forwardRef<
  HTMLInputElement,
  Checkbox.Props & React.ComponentProps<'input'>
>(({ className, ...props }, ref) => {
  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        ref={ref}
        className={cn(
          'peer absolute inset-0 size-6 cursor-pointer opacity-0',
          className,
        )}
        {...props}
      />
      <CheckedIcon className="hidden size-6 peer-checked:block" />
      <UncheckedIcon className="block size-6 peer-checked:hidden" />
    </div>
  );
});

export const Checkbox = forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof CheckboxRoot>
>((props, ref) => {
  return <CheckboxRoot {...props} ref={ref} />;
});

Checkbox.displayName = 'Checkbox';

export namespace Checkbox {
  export type Props = {};
}
