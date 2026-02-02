import { createFileRoute } from '@tanstack/react-router';

import { ScheduleDetailFrame } from '@/features/admin';

export const Route = createFileRoute('/admin/schedules/$uuid/')({
  component: ScheduleDetailFrame,
});
