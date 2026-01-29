import { createContext, useContext } from 'react';

import type { OverlayApi } from '@/common/lib';

export type DrawerSide = 'top' | 'right' | 'bottom' | 'left';

export type DrawerContextValue = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  overlay: OverlayApi;
  side: DrawerSide;
  titleId: string;
  descriptionId: string;
};

const DrawerContext = createContext<DrawerContextValue | null>(null);

export const useDrawerContext = (componentName: string) => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error(`${componentName} must be used within Drawer.Root`);
  }

  return context;
};

export default DrawerContext;
