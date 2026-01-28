import { createContext, useContext } from 'react';

type OverlayId = number | string;

type RegisterOptions = {
  onEscape?: () => void;
  lockScroll?: boolean;
  id?: OverlayId;
};

type OverlayEntry = {
  id: OverlayId;
  zIndex: number;
} & RegisterOptions;

type OverlayStackAPI = {
  entries: OverlayEntry[];
  register: (opts?: RegisterOptions) => {
    id: OverlayId;
    unregister: () => void;
  };
  bringToFront: (id: OverlayId) => void;
};

export const OverlayStackContext = createContext<OverlayStackAPI | null>(null);

export function useOverlayStack() {
  const ctx = useContext(OverlayStackContext);
  if (!ctx) throw new Error('useOverlayStack must be used within OverlayProvider');
  return ctx;
}

export type { OverlayEntry, OverlayId, OverlayStackAPI, RegisterOptions };
