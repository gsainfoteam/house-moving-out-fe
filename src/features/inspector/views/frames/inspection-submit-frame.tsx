import { useParams } from '@tanstack/react-router';

import { useInspectionSubmitForm } from '../../viewmodels';

import { InspectionSubmitView } from '../views';

export function InspectionSubmitFrame() {
  const { uuid } = useParams({ from: '/_auth-required/_user/inspector/$uuid/submit' });
  const { form, onSubmit, artifact, isAllChecked } = useInspectionSubmitForm(uuid);

  return (
    <InspectionSubmitView
      artifact={artifact}
      isAllChecked={isAllChecked}
      isSubmitting={form.formState.isSubmitting}
      onSubmit={onSubmit}
    />
  );
}
