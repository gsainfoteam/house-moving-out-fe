import { TypstDocument } from '@myriaddreamin/typst.react';
import { useTranslation } from 'react-i18next';

import { Button, LayoutCard } from '@/common/components';

export function InspectionSubmitView({
  artifact,
  isAllChecked,
  isSubmitting,
  onSubmit,
}: InspectionSubmitView.Props) {
  const { t } = useTranslation('inspector');

  return (
    <LayoutCard.Root asChild>
      <form onSubmit={onSubmit}>
        <LayoutCard.Body className="w-full items-start">
          <div className="aspect-148/210 w-full overflow-hidden rounded-lg border border-border">
            <div className="-mt-16 scale-125">
              <TypstDocument artifact={artifact} />
            </div>
          </div>
        </LayoutCard.Body>
        <LayoutCard.Footer>
          <Button
            type="submit"
            variant={isAllChecked ? 'default' : 'failed'}
            className="w-full"
            disabled={isSubmitting}
          >
            {isAllChecked ? t('submit.submitPass') : t('submit.submitWithReinspection')}
          </Button>
        </LayoutCard.Footer>
      </form>
    </LayoutCard.Root>
  );
}

export namespace InspectionSubmitView {
  export type Props = {
    artifact: Uint8Array;
    isAllChecked: boolean;
    isSubmitting: boolean;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
  };
}
