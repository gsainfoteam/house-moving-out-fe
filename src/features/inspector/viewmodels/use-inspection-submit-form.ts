import { useNavigate } from '@tanstack/react-router';

import { partition } from 'es-toolkit';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { useSubmitInspectionResult } from './queries';
import { useVerifyInspectionDocument } from './queries/use-verify-inspection-document';
import { useInspectionChecklistContext } from './use-inspection-checklist-context';
import { useInspectionChecklistFile } from './use-inspection-checklist-file';

export const useInspectionSubmitForm = (uuid: string) => {
  const { form, isAllChecked } = useInspectionChecklistContext();

  const items = useWatch({ control: form.control, name: 'items' });
  const { mutateAsync: submitInspectionResult } = useSubmitInspectionResult();
  const { mutateAsync: verifyInspectionDocument } = useVerifyInspectionDocument();
  const { t } = useTranslation('inspector');
  const navigate = useNavigate();

  const { artifact } = useInspectionChecklistFile('vector');
  const { artifact: pdfArtifact } = useInspectionChecklistFile('pdf');

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
    artifact,
    isAllChecked,
  };
};
