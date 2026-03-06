import { useNavigate } from '@tanstack/react-router';

import { useInspectionChecklistContext } from './use-inspection-checklist-context';

export const useInspectionNoteForm = () => {
  const { items, form } = useInspectionChecklistContext();
  const navigate = useNavigate();

  const onSubmit = form.handleSubmit(() => {
    navigate({ to: '/inspector/$uuid/submit', from: '/inspector/$uuid/note' });
  });

  return {
    form,
    onSubmit,
    items,
  };
};
