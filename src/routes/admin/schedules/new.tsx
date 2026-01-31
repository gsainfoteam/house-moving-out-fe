import { createFileRoute } from '@tanstack/react-router';

import { CreateScheduleFrame } from '@/features/admin';

export const Route = createFileRoute('/admin/schedules/new')({
  component: CreateScheduleFrame,
});
