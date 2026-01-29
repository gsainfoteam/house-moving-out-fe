import type { DrawerSide } from './context';
import type { Transition, Variants } from 'motion/react';

export const backdropAnimation: Variants = {
  closed: { opacity: 0, backdropFilter: 'blur(0px)' },
  open: { opacity: 1, backdropFilter: 'blur(4px)' },
};

export const backdropTransition: Transition = {
  duration: 0.3,
  ease: 'easeOut',
};

const slideFromBottom: Variants = {
  closed: { opacity: 0, y: '100%' },
  open: { opacity: 1, y: '0%' },
};

const slideFromTop: Variants = {
  closed: { opacity: 0, y: '-100%' },
  open: { opacity: 1, y: '0%' },
};

const slideFromLeft: Variants = {
  closed: { opacity: 0, x: '-100%' },
  open: { opacity: 1, x: '0%' },
};

const slideFromRight: Variants = {
  closed: { opacity: 0, x: '100%' },
  open: { opacity: 1, x: '0%' },
};

const contentAnimationBySide: Record<DrawerSide, Variants> = {
  bottom: slideFromBottom,
  top: slideFromTop,
  left: slideFromLeft,
  right: slideFromRight,
};

export const getContentAnimation = (side: DrawerSide): Variants => contentAnimationBySide[side];

export const contentTransition: Transition = {
  duration: 0.35,
  ease: [0.16, 1, 0.3, 1],
};
