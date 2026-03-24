import { useInspectionNoteForm, useInspectionChecklistFile } from '../../viewmodels';

import { InspectionNoteView } from '../views/inspection-note-view';

export function InspectionNoteFrame() {
  const { form, onSubmit } = useInspectionNoteForm();
  const { artifact } = useInspectionChecklistFile('vector', true);

  return (
    <InspectionNoteView
      register={form.register}
      formState={form.formState}
      setValue={form.setValue}
      resetField={form.resetField}
      clearErrors={form.clearErrors}
      artifact={artifact}
      onSubmit={onSubmit}
    />
  );
}
