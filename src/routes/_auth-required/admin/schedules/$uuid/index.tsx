import { createFileRoute } from '@tanstack/react-router';

import { ScheduleDetailFrame } from '@/features/admin';

export const Route = createFileRoute('/_auth-required/admin/schedules/$uuid/')({
  component: ScheduleDetailFrame,
});
