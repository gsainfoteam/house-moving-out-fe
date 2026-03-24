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
      'text-body-lg rounded-xl',
      'flex items-center justify-center truncate gap-2',
      'relative',
      'transition-all duration-200',
      'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:outline-none',
      'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
      // State layer base
      'before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-xl before:opacity-0 before:transition-opacity before:duration-200 before:content-[""]',
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
          'bg-primary text-text-white',
          'focus-visible:ring-primary',
          // White overlay state layer
          'before:bg-bg',
        ],
        outline: [
          'bg-bg text-primary inset-ring-primary inset-ring-[1.5px]',
          'focus-visible:ring-primary',
          // Primary color overlay state layer
          'before:bg-primary',
        ],
        failed: [
          'bg-status-fail text-text-white',
          'focus-visible:ring-status-fail',
          // White overlay state layer
          'before:bg-bg',
        ],
        'failed-outline': [
          'bg-bg text-status-fail inset-ring-status-fail inset-ring-[1.5px]',
          'focus-visible:ring-status-fail',
          // Primary color overlay state layer
          'before:bg-status-fail',
        ],
        subtle: [
          'bg-text-primary/8 text-text-secondary',
          'focus-visible:ring-border',
          // Dark overlay state layer
          'before:bg-text-primary',
        ],
        disabled: [
          'bg-icon text-text-white',
          'focus-visible:ring-icon',
          // White overlay state layer
          'before:bg-bg',
        ],
      },
      size: {
        icon: 'p-2.5',
        default: 'px-5 py-2.5',
        full: 'px-6 py-3',
      },
    },
  });
}
