import { createFileRoute } from '@tanstack/react-router';

import { TargetListFrame } from '@/features/admin';

export const Route = createFileRoute('/admin/schedules/$uuid/targets')({
  component: TargetListFrame,
});
