import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { last } from 'es-toolkit/array';

import { lockScroll, unlockScroll } from './use-lock-scroll';
import {
  OverlayStackContext,
  type OverlayEntry,
  type OverlayId,
  type OverlayStackAPI,
} from './use-overlay-stack';

const BASE_Z_INDEX = 1000;
const Z_INDEX_STEP = 10;

const normalizeEntries = (entries: OverlayEntry[]) =>
  entries.map((entry, index) => ({
    ...entry,
    zIndex: BASE_Z_INDEX + index * Z_INDEX_STEP,
  }));

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<OverlayEntry[]>([]);
  const entriesRef = useRef<OverlayEntry[]>(entries);
  const nextIdRef = useRef(1);

  useEffect(() => {
    entriesRef.current = entries;
  }, [entries]);

  useEffect(() => {
    const shouldLock = entries.some((entry) => entry.lockScroll);
    if (shouldLock) lockScroll();
    else unlockScroll();
  }, [entries]);

  const register = useCallback<OverlayStackAPI['register']>((opts) => {
    const id = opts?.id ?? nextIdRef.current++;
    const lock = opts?.lockScroll ?? true;

    const entry: OverlayEntry = {
      id,
      zIndex: BASE_Z_INDEX,
      onEscape: opts?.onEscape,
      lockScroll: lock,
    };

    setEntries((prev) => normalizeEntries([...prev, entry]));

    const unregister = () => {
      setEntries((prev) => normalizeEntries(prev.filter((e) => e.id !== id)));
    };

    return { id, unregister };
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
      top?.onEscape?.();
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
