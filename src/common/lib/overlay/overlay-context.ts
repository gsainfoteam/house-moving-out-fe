import { createContext, useContext } from 'react';

export type OverlayContextValue = {
  isOpen: boolean;
  /** 닫기만 함. exit 애니메이션 재생 후 onExitComplete에서 unmount 호출. */
  close: () => void;
  /** 스택에서 제거. close() 후 애니메이션이 끝난 뒤 호출. */
  unmount: () => void;
};

export const OverlayContext = createContext<OverlayContextValue | null>(null);

export function useOverlayContext(): OverlayContextValue {
  const ctx = useContext(OverlayContext);
  if (!ctx) {
    throw new Error('useOverlayContext must be used within OverlayHost');
  }
  return ctx;
}
