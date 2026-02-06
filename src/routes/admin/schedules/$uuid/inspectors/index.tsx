import { createFileRoute } from '@tanstack/react-router';

import { InspectorsListFrame } from '@/features/admin';

export const Route = createFileRoute('/admin/schedules/$uuid/inspectors/')({
  component: InspectorsListFrame,
});
