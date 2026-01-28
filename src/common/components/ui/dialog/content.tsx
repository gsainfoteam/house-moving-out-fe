import type { HTMLAttributes } from 'react';

import { cn } from '@/common/utils';

import { useDialogContext } from './dialog-context';

/**
 * 다이얼로그 본문 컨테이너입니다.
 * @see Dialog.Header
 * @see Dialog.Footer
 */
export const Content = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & Content.Props) => {
  const { overlay, titleId, descriptionId } = useDialogContext('Dialog.Content');

  return (
    <overlay.Container>
      <overlay.Backdrop aria-label="Close dialog" />
      <overlay.FocusTrap>
        <div
          role="dialog"
          aria-modal="true"
          aria-label={props['aria-label']}
          aria-labelledby={props['aria-label'] ? undefined : titleId}
          aria-describedby={descriptionId}
          className={cn(
            'relative max-h-[80vh] w-[90vw] max-w-md overflow-auto rounded-2xl bg-white p-5 shadow-lg',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </overlay.FocusTrap>
    </overlay.Container>
  );
};

export namespace Content {
  export type Props = {
    children: React.ReactNode;
  };
}
