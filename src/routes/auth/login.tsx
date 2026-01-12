import { createFileRoute } from '@tanstack/react-router';

import { LoginFrame } from '@/features/auth';

export const Route = createFileRoute('/auth/login')({
  component: LoginFrame,
});
