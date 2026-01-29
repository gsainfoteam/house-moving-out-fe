import { cv } from '@/common/utils';

import type { VariantProps } from 'tailwind-variants';

export function Input({
  className,
  variant,
  ref,
  ...props
}: Input.Props &
  React.InputHTMLAttributes<HTMLInputElement> & { ref: React.Ref<HTMLInputElement> }) {
  return <input className={Input.styles({ variant, className })} ref={ref} {...props} />;
}

export namespace Input {
  export type Props = {
    variant?: VariantProps<typeof Input.styles>['variant'];
  };

  export const styles = cv({
    base: [
      'w-full rounded-lg border bg-bg-white px-4 py-3',
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
}
