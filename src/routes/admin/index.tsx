import { createFileRoute } from '@tanstack/react-router';

import { AdminLandingFrame } from '@/features/admin';

export const Route = createFileRoute('/admin/')({
  component: AdminLandingFrame,
});
