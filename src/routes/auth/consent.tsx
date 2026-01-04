import { createFileRoute } from '@tanstack/react-router';

import { ConsentFrame } from '@/features/auth';

export const Route = createFileRoute('/auth/consent')({
  component: ConsentFrame,
});
