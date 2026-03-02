import { createFileRoute } from '@tanstack/react-router';

import { ApplicationListFrame } from '@/features/admin';

export const Route = createFileRoute('/_auth-required/admin/schedules/$uuid/applications')({
  component: ApplicationListFrame,
});
