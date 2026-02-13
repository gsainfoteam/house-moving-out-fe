import { createFileRoute } from '@tanstack/react-router';

import { CreateScheduleFrame } from '@/features/admin';

export const Route = createFileRoute('/_auth-required/admin/schedules/new')({
  component: CreateScheduleFrame,
});
