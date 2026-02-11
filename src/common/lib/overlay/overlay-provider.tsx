import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { last } from 'es-toolkit/array';

import {
  BASE_Z_INDEX,
  OverlayStackContext,
  type OverlayEntry,
  type OverlayId,
  type OverlayStackAPI,
} from './overlay-stack-context';
import { lockScroll, unlockScroll } from './scroll-lock';

const Z_INDEX_STEP = 10;

const normalizeEntries = (entries: OverlayEntry[]) =>
  entries.map((entry, index) => ({
    ...entry,
    zIndex: BASE_Z_INDEX + index * Z_INDEX_STEP,
  }));

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<OverlayEntry[]>([]);
  const entriesRef = useRef<OverlayEntry[]>(entries);

  useEffect(() => {
    entriesRef.current = entries;
  }, [entries]);

  useEffect(() => {
    const shouldLock = entries.some((entry) => entry.lockScroll);
    if (shouldLock) lockScroll();
    else unlockScroll();
  }, [entries]);

  const register = useCallback<OverlayStackAPI['register']>((opts) => {
    setEntries((prev) => {
      const entry: OverlayEntry = {
        zIndex: BASE_Z_INDEX + prev.length * Z_INDEX_STEP,
        ...opts,
      };

      return [...prev, entry];
    });

    const unregister = () => {
      setEntries((prev) => normalizeEntries(prev.filter((e) => e.id !== opts.id)));
    };

    return { id: opts.id, unregister };
  }, []);

  const bringToFront = useCallback((id: OverlayId) => {
    setEntries((prev) => {
      const idx = prev.findIndex((entry) => entry.id === id);
      if (idx === -1 || idx === prev.length - 1) return prev;

      const next = [...prev];
      const [entry] = next.splice(idx, 1);
      next.push(entry);
      return normalizeEntries(next);
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const top = last(entriesRef.current);
      if (top && top.closeOnEscape) top.close();
    };

    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, []);

  const api = useMemo(
    () => ({ register, bringToFront, entries }),
    [register, bringToFront, entries],
  );

  return <OverlayStackContext.Provider value={api}>{children}</OverlayStackContext.Provider>;
}
