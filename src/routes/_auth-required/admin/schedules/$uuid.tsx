import { createFileRoute } from '@tanstack/react-router';

import { ScheduleLayoutFrame } from '@/features/admin';

export const Route = createFileRoute('/_auth-required/admin/schedules/$uuid')({
  component: ScheduleLayoutFrame,
});
