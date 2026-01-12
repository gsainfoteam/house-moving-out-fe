import type { VariantProps } from 'tailwind-variants';

import { cv } from '@/common/utils';

export function Button({
  variant = 'primary',
  icon = false,
  children,
  className,
  ...props
}: Button.Props & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={Button.styles({ variant, icon, className })} {...props}>
      {children}
    </button>
  );
}

export namespace Button {
  export type Props = {
    variant?: VariantProps<typeof Button.styles>['variant'];
    icon?: VariantProps<typeof Button.styles>['icon'];
  };
  export const styles = cv({
    base: [
      'text-body rounded-lg',
      'flex items-center justify-center',
      'relative overflow-hidden',
      'transition-all duration-200',
      'ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
      'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
      // State layer base
      'before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-lg before:opacity-0 before:transition-opacity before:duration-200 before:content-[""]',
      // Children z-index
      '*:relative *:z-2',
    ],
    variants: {
      variant: {
        primary: [
          'bg-primary text-white',
          // White overlay state layer
          'before:bg-white',
          'hover:before:opacity-[0.08]',
          'focus-visible:before:opacity-[0.12]',
          'active:before:opacity-[0.16]',
          'disabled:bg-gray-400 disabled:text-gray-200',
          'disabled:hover:before:opacity-0',
        ],
        secondary: [
          'border-primary text-primary border bg-transparent',
          // Primary color overlay state layer
          'before:bg-primary',
          'hover:before:opacity-[0.08]',
          'focus-visible:before:opacity-[0.12]',
          'active:before:opacity-[0.16]',
          'disabled:hover:before:opacity-0',
        ],
      },
      icon: {
        true: 'p-2',
        false: 'gap-2 px-4 py-2',
      },
    },
  });
}
