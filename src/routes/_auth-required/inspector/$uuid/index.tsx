import { createFileRoute } from '@tanstack/react-router';

import { InspectionFrame } from '@/features/inspector';

export const Route = createFileRoute('/_auth-required/inspector/$uuid/')({
  component: InspectionFrame,
});
