import { useMemo } from 'react';
import type { PropsWithChildren, ReactNode } from 'react';

export function useList<T>(items: T[]) {
  const isEmpty = items.length === 0;

  return useMemo(
    () => ({
      Empty: ({ children }: PropsWithChildren) => (isEmpty ? <>{children}</> : null),
      Present: ({ children }: PropsWithChildren) => (!isEmpty ? <>{children}</> : null),
      Content: ({ children }: { children: (item: T, index: number) => ReactNode }) =>
        !isEmpty ? <>{items.map(children)}</> : null,
    }),
    [items, isEmpty],
  );
}
