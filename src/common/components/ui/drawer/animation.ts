import type { DrawerSide } from './context';
import type { Transition, Variants } from 'motion/react';

export const backdropAnimation: Variants = {
  closed: { opacity: 0, backdropFilter: 'blur(0px)' },
  open: { opacity: 1, backdropFilter: 'blur(4px)' },
};

export const backdropTransition: Transition = {
  duration: 0.4,
  ease: 'easeOut',
};

export const contentAnimationBySide: Record<DrawerSide, Variants> = {
  bottom: {
    closed: { opacity: 0, y: '100%' },
    open: { opacity: 1, y: '0%' },
  },
  top: {
    closed: { opacity: 0, y: '-100%' },
    open: { opacity: 1, y: '0%' },
  },
  left: {
    closed: { opacity: 0, x: '-100%' },
    open: { opacity: 1, x: '0%' },
  },
  right: {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: '0%' },
  },
};

export const contentTransition: Transition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1],
};
