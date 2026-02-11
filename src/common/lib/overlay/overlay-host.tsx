import { useEffect } from 'react';

import { OverlayContext } from './overlay-context';
import { OverlayPortal } from './overlay-portal';
import { useOverlayStore } from './overlay-store';
import { lockScroll, unlockScroll } from './scroll-lock';

export function OverlayHost() {
  const entries = useOverlayStore((state) => state.entries);
  const close = useOverlayStore((state) => state.close);
  const unmount = useOverlayStore((state) => state.unmount);

  useEffect(() => {
    const hasOpen = entries.some((e) => e.isOpen);
    if (hasOpen) {
      lockScroll();
      return () => unlockScroll();
    }
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <OverlayPortal>
      {entries.map((entry) => {
        const payload = {
          overlayId: entry.id,
          isOpen: entry.isOpen,
          close: () => close(entry.id),
          unmount: () => unmount(entry.id),
        };
        return (
          <OverlayContext.Provider key={entry.id} value={payload}>
            {entry.controller(payload)}
          </OverlayContext.Provider>
        );
      })}
    </OverlayPortal>
  );
}
