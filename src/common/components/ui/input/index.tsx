import { forwardRef } from 'react';

import { cv } from '@/common/utils';

import type { VariantProps } from 'tailwind-variants';

export const Input = forwardRef<
  HTMLInputElement,
  Input.Props & React.InputHTMLAttributes<HTMLInputElement>
>(({ className, variant, ...props }, ref) => {
  return <input className={styles({ variant, className })} {...props} ref={ref} />;
});

const styles = cv({
  base: [
    'w-full rounded-lg border-[1.5px] bg-bg-white px-4 py-3',
    'text-box text-text-black placeholder:text-text-gray',
    'transition-all duration-200',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'focus-visible:outline-none focus-visible:ring-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  variants: {
    variant: {
      default: [
        'border-icon-gray',
        'focus-visible:border-primary-main focus-visible:ring-primary-main',
      ],
      error: [
        'border-status-fail',
        'focus-visible:border-status-fail focus-visible:ring-status-fail',
      ],
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export namespace Input {
  export type Props = {
    variant?: VariantProps<typeof styles>['variant'];
  };
}
