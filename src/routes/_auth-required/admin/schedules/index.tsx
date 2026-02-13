import { createFileRoute } from '@tanstack/react-router';

import { ScheduleListFrame } from '@/features/admin';

export const Route = createFileRoute('/_auth-required/admin/schedules/')({
  component: ScheduleListFrame,
});
