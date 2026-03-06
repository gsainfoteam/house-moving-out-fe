import { partition } from 'es-toolkit';
import { useFormContext, useWatch } from 'react-hook-form';

import { useSubmitInspectionResult } from './queries';

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

  const onSubmit = form.handleSubmit(async (data) => {
    const [checkedItems, uncheckedItems] = partition(Object.entries(data.items), ([, v]) => v);
    const passed = checkedItems.map(([slug]) => slug);
    const failed = uncheckedItems.map(([slug]) => slug);

    const result = await submitInspectionResult({
      params: { path: { uuid } },
      body: {
        passed: passed.length > 0 ? passed : undefined,
        failed: failed.length > 0 ? failed : undefined,
        contentLength: 0,
      },
    });
    await fetch(result.presignedUrl, { method: 'PUT' });
  });

  return {
    form,
    onSubmit,
    items,
    inspectorSignature,
    targetSignature,
  };
};
