import { forwardRef } from 'react';

import { cv } from '@/common/utils';

import type { VariantProps } from 'tailwind-variants';

export const Input = forwardRef<
  HTMLInputElement,
  Input.Props & React.InputHTMLAttributes<HTMLInputElement>
>(({ className, variant, error, ...props }, ref) => {
  return (
    <>
      <input
        className={styles({ variant: variant ?? (error ? 'error' : undefined), className })}
        {...props}
        ref={ref}
      />
      {error && <span className="text-status-fail mt-1 text-sm">{error}</span>}
    </>
  );
});

const styles = cv({
  base: [
    'w-full rounded-xl border bg-bg px-4 py-2.5',
    'text-body-lg text-text-primary placeholder:text-text-secondary',
    'transition-all duration-200',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'focus-visible:outline-none focus-visible:ring-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  variants: {
    variant: {
      default: [
        'border-border',
        'focus-visible:border-primary focus-visible:ring-primary',
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
    error?: string;
  };
}
