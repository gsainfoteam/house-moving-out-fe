import { createFileRoute } from '@tanstack/react-router';

import { InspectionListFrame } from '@/features/inspector';

export const Route = createFileRoute('/_auth-required/inspector/')({
  component: InspectionListFrame,
});
