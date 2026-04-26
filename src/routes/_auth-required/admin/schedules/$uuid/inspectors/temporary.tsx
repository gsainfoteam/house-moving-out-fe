import { createFileRoute } from '@tanstack/react-router';

import { CreateTemporaryInspectorFrame } from '@/features/admin';

export const Route = createFileRoute('/_auth-required/admin/schedules/$uuid/inspectors/temporary')({
  component: CreateTemporaryInspectorFrame,
});
