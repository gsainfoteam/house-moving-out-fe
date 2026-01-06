import { createFileRoute } from '@tanstack/react-router';

import { AdminLoginFrame } from '@/features/auth';

export const Route = createFileRoute('/admin/login')({
  component: AdminLoginFrame,
});

