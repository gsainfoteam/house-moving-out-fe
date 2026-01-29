import { useEffect } from 'react';

import { head, last } from 'es-toolkit/array';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  "[tabindex]:not([tabindex='-1'])",
].join(',');

export function useFocusTrap(ref: React.RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    const container = ref?.current;
    if (!enabled || !container) return;

    const prevFocused = document.activeElement as HTMLElement | null;
    const getFocusables = () => Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));
    const hadTabIndex = container.hasAttribute('tabindex');

    const focusFirst = () => {
      const focusables = getFocusables();
      const firstFocusable = head(focusables);

      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        if (!hadTabIndex) {
          container.setAttribute('tabindex', '-1');
        }
        container.focus();
      }
    };

    focusFirst();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusables = getFocusables();
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }

      const firstFocusable = head(focusables) ?? container;
      const lastFocusable = last(focusables) ?? firstFocusable;

      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    };

    container.addEventListener('keydown', onKeyDown);
    return () => {
      container.removeEventListener('keydown', onKeyDown);
      prevFocused?.focus();
      if (!hadTabIndex && container.hasAttribute('tabindex')) {
        container.removeAttribute('tabindex');
      }
    };
  }, [ref, enabled]);
}
