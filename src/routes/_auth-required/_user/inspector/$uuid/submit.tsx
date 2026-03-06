import { createFileRoute } from '@tanstack/react-router';

import { InspectionSubmitFrame } from '@/features/inspector';

export const Route = createFileRoute('/_auth-required/_user/inspector/$uuid/submit')({
  component: InspectionSubmitFrame,
});
