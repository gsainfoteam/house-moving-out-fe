import { createFileRoute } from '@tanstack/react-router';

import { TargetListFrame } from '@/features/admin';

export const Route = createFileRoute('/_auth-required/admin/schedules/$uuid/targets')({
  component: TargetListFrame,
});
