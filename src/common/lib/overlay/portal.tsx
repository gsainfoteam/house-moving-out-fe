import { useMemo, type PropsWithChildren } from 'react';

import { createPortal } from 'react-dom';

function getElementById(id: string) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('div');
    el.id = id;
    document.body.appendChild(el);
  }

  return el;
}

export function OverlayPortal({
  rootId = 'overlay-root',
  children,
}: PropsWithChildren<{ rootId?: string }>) {
  const root = useMemo(
    () => (typeof document === 'undefined' ? null : getElementById(rootId)),
    [rootId],
  );

  if (!root) return null;
  return createPortal(children, root);
}
