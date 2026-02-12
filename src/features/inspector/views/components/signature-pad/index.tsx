import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';

import SignatureCanvas from 'react-signature-canvas';

import { cn } from '@/common/utils';

import { resolveCssVarColor } from '../../../utils';
export namespace SignaturePad {
  export type Props = {
    className?: string;
    backgroundColor?: string;
    penColor?: string;
    lineWidth?: number;
    onChange?: (dataUrl: string) => void;
  };

  export type Handle = {
    clear: () => void;
    isEmpty: () => boolean;
    toDataURL: () => string;
  };
}

export const SignaturePad = forwardRef<SignaturePad.Handle, SignaturePad.Props>(
  (
    {
      className,
      backgroundColor = 'var(--color-bg-white)',
      penColor = 'var(--color-text-black)',
      lineWidth = 2,
      onChange,
    },
    ref,
  ) => {
    const internalRef = useRef<SignatureCanvas | null>(null);
    const resolvedBackground = useMemo(
      () => resolveCssVarColor(backgroundColor),
      [backgroundColor],
    );
    const resolvedPenColor = useMemo(() => resolveCssVarColor(penColor), [penColor]);

    useImperativeHandle(
      ref,
      () => ({
        clear: () => internalRef.current?.clear(),
        isEmpty: () => internalRef.current?.isEmpty() ?? true,
        toDataURL: () => internalRef.current?.toDataURL() ?? '',
      }),
      [],
    );

    return (
      <div
        className={cn(
          'bg-bg-white border-icon-light-gray relative rounded-2xl border shadow-sm',
          className,
        )}
      >
        <SignatureCanvas
          ref={internalRef}
          backgroundColor={resolvedBackground}
          penColor={resolvedPenColor}
          minWidth={lineWidth}
          maxWidth={lineWidth}
          throttle={8}
          onEnd={() => {
            if (!onChange || !internalRef.current) return;
            onChange(internalRef.current.toDataURL());
          }}
          canvasProps={{
            className: 'block h-30 w-full rounded-2xl bg-bg-white',
          }}
        />
      </div>
    );
  },
);

SignaturePad.displayName = 'SignaturePad';
