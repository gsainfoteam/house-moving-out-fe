import { useEffect, useState, type PropsWithChildren } from 'react';

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
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const el = getElementById(rootId);
    queueMicrotask(() => setRoot(el));
  }, [rootId]);

  if (!root) return null;
  return createPortal(children, root);
}
