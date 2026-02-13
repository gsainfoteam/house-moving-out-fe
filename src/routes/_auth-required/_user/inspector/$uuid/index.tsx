import { createFileRoute } from '@tanstack/react-router';

import { InspectionFrame } from '@/features/inspector';

export const Route = createFileRoute('/_auth-required/_user/inspector/$uuid/')({
  component: InspectionFrame,
});
