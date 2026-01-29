import { Loader2 } from 'lucide-react';

export function Loading({ fullScreen = true }: Loading.Props) {
  const loading = <Loader2 className="text-icon-gray size-12 animate-spin" />;
  if (fullScreen) {
    return <div className="flex h-dvh items-center justify-center">{loading}</div>;
  }
  return loading;
}

export namespace Loading {
  export type Props = { fullScreen?: boolean };
}
