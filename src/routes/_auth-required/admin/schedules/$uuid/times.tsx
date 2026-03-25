import { createFileRoute } from '@tanstack/react-router';

import { TimeListFrame } from '@/features/admin';

export const Route = createFileRoute('/_auth-required/admin/schedules/$uuid/times')({
  component: TimeListFrame,
});
