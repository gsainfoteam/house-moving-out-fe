import { createFileRoute } from '@tanstack/react-router';

import { InspectorsListFrame } from '@/features/admin';

export const Route = createFileRoute('/_auth-required/admin/schedules/$uuid/inspectors/')({
  component: InspectorsListFrame,
});
