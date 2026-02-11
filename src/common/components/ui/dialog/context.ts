import { createContext, useContext } from 'react';

import type { BaseOverlayContextValue } from '@/common/lib';

export type DialogContextValue = BaseOverlayContextValue & {
  titleId: string;
  descriptionId: string;
};

const DialogContext = createContext<DialogContextValue | null>(null);

export const useDialogContext = (componentName: string) => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error(`${componentName} must be used within Dialog.Root`);
  }
  return context;
};

export default DialogContext;
