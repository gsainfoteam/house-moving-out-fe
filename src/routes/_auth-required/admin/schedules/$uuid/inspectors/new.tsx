import { createFileRoute } from '@tanstack/react-router';

import { CreateInspectorFrame } from '@/features/admin';

export const Route = createFileRoute('/_auth-required/admin/schedules/$uuid/inspectors/new')({
  component: CreateInspectorFrame,
});
