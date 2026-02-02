import { Loader2 } from 'lucide-react';

import { cn } from '@/common/utils';

export function Loading({ fullScreen = true, className }: Loading.Props) {
  const loading = <Loader2 className={cn('text-icon-gray size-12 animate-spin', className)} />;
  if (fullScreen) {
    return <div className={cn('flex h-dvh items-center justify-center', className)}>{loading}</div>;
  }
  return loading;
}

export namespace Loading {
  export type Props = { fullScreen?: boolean; className?: string };
}
