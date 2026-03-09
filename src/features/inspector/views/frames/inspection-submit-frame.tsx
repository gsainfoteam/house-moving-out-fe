import { useParams } from '@tanstack/react-router';

import { TypstDocument } from '@myriaddreamin/typst.react';
import { useTranslation } from 'react-i18next';

import { Button, LayoutCard } from '@/common/components';

import { useInspectionSubmitForm } from '../../viewmodels';

export function InspectionSubmitFrame() {
  const { t } = useTranslation('inspector');
  const { uuid } = useParams({ from: '/_auth-required/_user/inspector/$uuid/submit' });
  const { form, onSubmit, artifact, isAllChecked } = useInspectionSubmitForm(uuid);

  return (
    <LayoutCard.Root asChild>
      <form onSubmit={onSubmit}>
        <LayoutCard.Body className="w-full items-start">
          <div className="aspect-148/210 w-full overflow-hidden border">
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
            disabled={form.formState.isSubmitting}
          >
            {isAllChecked ? t('submit.submitPass') : t('submit.submitWithReinspection')}
          </Button>
        </LayoutCard.Footer>
      </form>
    </LayoutCard.Root>
  );
}
