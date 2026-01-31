import { cv } from '@/common/utils';

import { Slot } from '../slot';

import type { VariantProps } from 'tailwind-variants';

export function Button({
  variant = 'default',
  size = 'default',
  asChild = false,
  children,
  className,
  ...props
}: Button.Props & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={Button.styles({
        variant: props.disabled ? 'disabled' : variant,
        size,
        className,
      })}
      {...props}
    >
      {children}
    </Comp>
  );
}

export namespace Button {
  export type Props = {
    variant?: VariantProps<typeof Button.styles>['variant'];
    size?: VariantProps<typeof Button.styles>['size'];
    asChild?: boolean;
  };
  export const styles = cv({
    base: [
      'text-button rounded-lg',
      'flex items-center justify-center truncate gap-2',
      'relative',
      'transition-all duration-200',
      'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-white focus-visible:outline-none',
      'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
      // State layer base
      'before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-lg before:opacity-0 before:transition-opacity before:duration-200 before:content-[""]',
      'hover:before:opacity-[0.08]',
      'focus-visible:before:opacity-[0.12]',
      'active:before:opacity-[0.16]',
      'disabled:hover:before:opacity-0',
      // Children z-index
      '*:relative *:z-2',
    ],
    variants: {
      variant: {
        default: [
          'bg-primary-main text-text-white',
          'focus-visible:ring-primary-main',
          // White overlay state layer
          'before:bg-bg-white',
        ],
        outline: [
          'bg-bg-white text-primary-main inset-ring-primary-main inset-ring-[1.5px]',
          'focus-visible:ring-primary-main',
          // Primary color overlay state layer
          'before:bg-primary-main',
        ],
        failed: [
          'bg-status-fail text-text-white',
          'focus-visible:ring-status-fail',
          // White overlay state layer
          'before:bg-bg-white',
        ],
        'failed-outline': [
          'bg-bg-white text-status-fail inset-ring-status-fail inset-ring-[1.5px]',
          'focus-visible:ring-status-fail',
          // Primary color overlay state layer
          'before:bg-status-fail',
        ],
        disabled: [
          'bg-icon-gray text-text-white',
          'focus-visible:ring-icon-gray',
          // White overlay state layer
          'before:bg-bg-white',
        ],
      },
      size: {
        icon: 'p-3',
        default: 'px-6 py-3.5',
        full: 'px-7.5 py-4',
      },
    },
  });
}
