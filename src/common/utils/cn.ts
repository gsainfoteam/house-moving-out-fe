import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

export const twMergeConfig = {
  classGroups: {
    'font-size': ['text-h1', 'text-h2', 'text-body', 'text-caption'],
    'font-weight': ['text-h1', 'text-h2', 'text-body', 'text-caption'],
  },
};

const customTwMerge = extendTailwindMerge({
  override: { ...twMergeConfig },
});

export function cn(...classes: ClassValue[]) {
  return customTwMerge(clsx(classes));
}
