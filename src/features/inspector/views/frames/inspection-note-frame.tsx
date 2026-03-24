import { useInspectionNoteForm, useInspectionChecklistFile } from '../../viewmodels';
import { InspectionNoteScreen } from '../screens';

export function InspectionNoteFrame() {
  const { form, onSubmit } = useInspectionNoteForm();
  const { artifact } = useInspectionChecklistFile('vector', true);

  return (
    <InspectionNoteScreen
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
