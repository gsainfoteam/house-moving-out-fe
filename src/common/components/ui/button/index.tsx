import type { VariantProps } from 'tailwind-variants';

import { cv } from '@/common/utils';

export function Button({
  variant = 'default',
  iconOnly = false,
  children,
  className,
  ...props
}: Button.Props & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={Button.styles({
        variant: props.disabled ? 'disabled' : variant,
        iconOnly,
        className,
      })}
      {...props}
    >
      {children}
    </button>
  );
}

export namespace Button {
  export type Props = {
    variant?: VariantProps<typeof Button.styles>['variant'];
    iconOnly?: VariantProps<typeof Button.styles>['iconOnly'];
  };
  export const styles = cv({
    base: [
      // FIXME: typography leading 추가 후 지우기
      'text-button rounded-lg leading-none',
      'flex items-center justify-center',
      'relative overflow-hidden',
      'transition-all duration-200',
      'ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
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
          // White overlay state layer
          'before:bg-bg-white',
        ],
        change: [
          'bg-bg-white text-primary-main inset-ring-primary-main inset-ring-[1.5px]',
          // Primary color overlay state layer
          'before:bg-primary-main',
        ],
        failed: [
          'bg-status-fail text-text-white',
          // White overlay state layer
          'before:bg-bg-white',
        ],
        disabled: [
          'bg-icon-gray text-text-white',
          // White overlay state layer
          'before:bg-bg-white',
        ],
      },
      iconOnly: {
        true: 'p-3',
        false: 'gap-2 px-7.5 py-4',
      },
    },
  });
}
