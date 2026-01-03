import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import { createTV } from 'tailwind-variants';

const tokens = ['text-h1', 'text-h2', 'text-body', 'text-caption'] as const;

export const twMergeConfig = {
  override: {
    classGroups: {
      'font-size': tokens,
      'font-weight': tokens,
    },
  },
};

export function cn(...classes: ClassValue[]) {
  return extendTailwindMerge(twMergeConfig)(clsx(classes));
}

export const cv = createTV({ twMerge: true, twMergeConfig });
