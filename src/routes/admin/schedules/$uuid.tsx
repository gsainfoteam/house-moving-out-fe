import { createFileRoute } from '@tanstack/react-router';

import { ScheduleLayoutFrame } from '@/features/admin';

export const Route = createFileRoute('/admin/schedules/$uuid')({
  component: ScheduleLayoutFrame,
});
