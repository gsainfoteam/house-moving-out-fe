import { createContext, useContext } from 'react';

import type { OverlayOptions } from './use-overlay';

export type OverlayId = string;

export type RegisterOptions = Required<OverlayOptions> & {
  close: () => void;
  id: OverlayId;
};

export type OverlayEntry = {
  id: OverlayId;
  zIndex: number;
} & RegisterOptions;

export type OverlayStackAPI = {
  entries: OverlayEntry[];
  register: (opts: RegisterOptions) => {
    id: OverlayId;
    unregister: () => void;
  };
  bringToFront: (id: OverlayId) => void;
};

export const OverlayStackContext = createContext<OverlayStackAPI | null>(null);

export function useOverlayStack(): OverlayStackAPI {
  const ctx = useContext(OverlayStackContext);
  if (!ctx) throw new Error('useOverlayStack must be used within OverlayProvider');
  return ctx;
}

export const BASE_Z_INDEX = 1000;
