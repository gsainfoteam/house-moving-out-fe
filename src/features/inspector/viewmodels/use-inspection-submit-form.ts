import { useMemo } from 'react';

import { useNavigate } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { partition } from 'es-toolkit';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { useSubmitInspectionResult } from './queries';
import { useVerifyInspectionDocument } from './queries/use-verify-inspection-document';
import { useInspectionChecklistFile } from './use-inspection-checklist-file';

import type { checklist } from '../models';

export const useInspectionSubmitForm = (uuid: string) => {
  const form = useFormContext<{
    items: Record<checklist.Item, boolean>;
    note: string;
    inspectorSignature: string;
    targetSignature: string;
  }>();

  const items = useWatch({ control: form.control, name: 'items' });
  const inspectorSignature = useWatch({ control: form.control, name: 'inspectorSignature' });
  const targetSignature = useWatch({ control: form.control, name: 'targetSignature' });
  const { mutateAsync: submitInspectionResult } = useSubmitInspectionResult();
  const { mutateAsync: verifyInspectionDocument } = useVerifyInspectionDocument();
  const { t } = useTranslation('inspector');
  const navigate = useNavigate();

  const option = useMemo(
    () =>
      ({
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
      }) as Parameters<typeof useInspectionChecklistFile>[0],
    [inspectorSignature, items, targetSignature],
  );
  const pdfOption = useMemo(
    () => ({ ...option, type: 'pdf' }) as Parameters<typeof useInspectionChecklistFile>[0],
    [option],
  );
  const { artifact } = useInspectionChecklistFile(option);
  const { artifact: pdfArtifact } = useInspectionChecklistFile(pdfOption);

  const onSubmit = form.handleSubmit(async (data) => {
    const [checkedItems, uncheckedItems] = partition(Object.entries(data.items), ([, v]) => v);
    const passed = checkedItems.map(([slug]) => slug);
    const failed = uncheckedItems.map(([slug]) => slug);

    const result = await submitInspectionResult({
      params: { path: { uuid } },
      body: {
        passed: passed.length > 0 ? passed : undefined,
        failed: failed.length > 0 ? failed : undefined,
        contentLength: pdfArtifact.length,
      },
    });
    await fetch(result.presignedUrl, {
      method: 'PUT',
      body: new Blob([new Uint8Array(pdfArtifact)], { type: 'application/pdf' }),
    });
    await verifyInspectionDocument({ params: { path: { uuid } } });
    toast.success(t('submit.success.inspectionSubmitted'));
    navigate({ to: '/inspector' });
  });

  return {
    form,
    onSubmit,
    items,
    inspectorSignature,
    targetSignature,
    artifact,
  };
};
