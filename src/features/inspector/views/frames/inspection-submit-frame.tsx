import { useMemo } from 'react';

import { useParams } from '@tanstack/react-router';

import { TypstDocument } from '@myriaddreamin/typst.react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { Button, LayoutCard } from '@/common/components';

import { useInspectionChecklistFile, useInspectionSubmitForm } from '../../viewmodels';

import type { checklist } from '../../models';

export function InspectionSubmitFrame() {
  const { t } = useTranslation('inspector');
  const { uuid } = useParams({ from: '/_auth-required/_user/inspector/$uuid/submit' });
  const { form, items, onSubmit, inspectorSignature, targetSignature } =
    useInspectionSubmitForm(uuid);
  const { artifact } = useInspectionChecklistFile(
    useMemo(
      () => ({
        type: 'vector',
        roomNumber: 'asdf',
        inspectedAt: dayjs(),
        roomType: 'a2',
        inspectionCount: 1,
        checkedItems: Object.entries(items ?? {})
          .filter(([, v]) => v)
          .map(([slug]) => slug as checklist.Item),
        inspectorSignature,
        targetSignature,
      }),
      [inspectorSignature, items, targetSignature],
    ),
  );
  return (
    <LayoutCard.Root asChild>
      <form onSubmit={onSubmit}>
        <LayoutCard.Body className="w-full items-start">
          <div className="aspect-148/210 w-full overflow-hidden border">
            <div className="-mt-14 scale-125">
              <TypstDocument artifact={artifact} />
            </div>
          </div>
        </LayoutCard.Body>
        <LayoutCard.Footer>
          <Button
            type="submit"
            variant="failed"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {t('note.submitWithReinspection')}
          </Button>
        </LayoutCard.Footer>
      </form>
    </LayoutCard.Root>
  );
}
