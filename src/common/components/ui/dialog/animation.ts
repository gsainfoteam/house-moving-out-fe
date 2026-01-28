import type { Transition, Variants } from 'motion/react';

export const backdropAnimation: Variants = {
  closed: { opacity: 0, backdropFilter: 'blur(0px)' },
  open: { opacity: 1, backdropFilter: 'blur(4px)' },
};

export const backdropTransition: Transition = {
  duration: 0.3,
  ease: 'easeOut',
};

export const contentAnimation: Variants = {
  closed: { opacity: 0, y: 10, scale: 0.98 },
  open: { opacity: 1, y: 0, scale: 1 },
};

export const contentTransition: Transition = {
  duration: 0.4,
  ease: [0.16, 1, 0.3, 1],
};
