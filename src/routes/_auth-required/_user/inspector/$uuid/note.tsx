import { createFileRoute } from '@tanstack/react-router';

import { InspectionNoteFrame } from '@/features/inspector';

export const Route = createFileRoute('/_auth-required/_user/inspector/$uuid/note')({
  component: InspectionNoteFrame,
});
