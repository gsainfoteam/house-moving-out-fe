import { createFileRoute } from '@tanstack/react-router';

import { ScheduleListFrame } from '@/features/admin';

export const Route = createFileRoute('/admin/schedules/')({
  component: ScheduleListFrame,
});
